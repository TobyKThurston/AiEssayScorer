import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "activity-list-reviewer";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let activities: string[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body.activities)) {
      activities = body.activities
        .map((a: unknown) => String(a ?? "").slice(0, 500).trim())
        .filter((a: string) => a.length > 0)
        .slice(0, 10);
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (activities.length === 0) {
    return NextResponse.json({ error: "At least one activity is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You review a complete Common App activities list as a single artifact and return structured JSON. Return JSON exactly:

{
  "story": string,                        // 2 to 3 sentences describing the story this activity list tells an admissions officer
  "topStrengths": string[],               // 3 specific strengths of the overall list
  "gaps": string[],                       // 2 to 3 gaps or overrepresented themes
  "weakest": [
    {
      "label": string,                    // brief name of the weakest activity in the list
      "why": string,                      // 1 sentence on why it is the weakest
      "fix": string                       // 1 sentence on the specific rewrite or reframing that would help
    }
  ],
  "overlap": string,                      // 1 to 2 sentences on which activities overlap too much thematically
  "oneChange": string                     // 1 sentence: the single change that would most improve the list
}

Rules:
- Read the list as a whole. The story is the pattern, not any one entry.
- Never invent activities or numbers not present in the input.
- Weakest entries are usually generic, verb-light, or duplicate other entries.
- Gaps are themes the list is missing (e.g., "no evidence of independent initiative outside structured programs").
- Do not recommend lying or exaggerating.`,
        },
        {
          role: "user",
          content: activities
            .map((a, i) => `Activity ${i + 1}:\n${a}`)
            .join("\n\n"),
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to review list.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
