import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "college-matchmaker-from-essay";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let essay = "";
  let stats = "";
  try {
    const body = await request.json();
    essay = String(body.essay ?? "").slice(0, 6000).trim();
    stats = String(body.stats ?? "").slice(0, 500).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!essay) {
    return NextResponse.json({ error: "Essay is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a college counselor matching students to US colleges based on their personal statement. Read the essay carefully to infer: intellectual interests, voice, values, likely major area, and what culture the student would thrive in. Return JSON:

{
  "readingOfYou": string,                    // 2-3 sentences describing the student the essay reveals
  "matches": [                               // exactly 10 college matches in 3 tiers
    {
      "school": string,                      // school name
      "tier": "reach" | "target" | "likely", // best guess given the essay, adjustable by stats
      "whyItFits": string                    // 1-2 sentences connecting a specific feature of the school to the student's essay
    }
  ],
  "schoolsToAvoid": string[],                // 2-3 types of schools that would be a bad fit for this student (not actual school names, just categories)
  "essayAnchorForEveryWhyEssay": string      // 1 sentence: the single thread from this essay that should appear in every supplemental Why essay
}

Rules:
- Mix of national universities, LACs, and a public if the student's essay suggests public-flagship fit.
- Never promise admission. Tier is a rough guess based on the essay alone.
- If stats are provided, tier the list accordingly.
- Do not recommend a school the essay gives no evidence of fit for.
- 'Schools to avoid' should be descriptive (e.g., 'giant pre-professional pipelines,' 'greek-life-heavy schools,' 'small religious schools'), NOT naming actual schools.`,
        },
        {
          role: "user",
          content: `Essay:\n${essay}\n\nStats / context: ${stats || "(not given)"}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to match.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
