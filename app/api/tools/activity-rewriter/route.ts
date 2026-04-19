import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "activity-rewriter";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let role = "";
  let description = "";
  try {
    const body = await request.json();
    role = String(body.role ?? "").slice(0, 150).trim();
    description = String(body.description ?? "").slice(0, 1500).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!description) {
    return NextResponse.json({ error: "Description is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You rewrite Common App activity descriptions. The Common App limits each activity description to 150 characters including spaces.

Return JSON only in this shape:
{
  "rewrites": [
    { "text": string, "characterCount": number, "emphasis": string },
    { "text": string, "characterCount": number, "emphasis": string },
    { "text": string, "characterCount": number, "emphasis": string }
  ]
}

Rules:
- Each "text" must be a single line, 150 characters or fewer including spaces.
- Use strong past-tense verbs (led, built, launched, coached, raised).
- Pack in concrete numbers (hours, dollars, people, percent) whenever the source gives them.
- No filler words (really, very, passionate, dedicated).
- No first-person pronouns if it saves characters.
- Three rewrites with different "emphasis" tags: "Impact & scale", "Leadership & initiative", "Craft & skill".
- Return the exact character count of each text as an integer.`,
        },
        {
          role: "user",
          content: `Role: ${role || "(not specified)"}\nDescription:\n${description}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to rewrite.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
