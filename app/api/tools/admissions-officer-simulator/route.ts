import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "admissions-officer-simulator";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let essay = "";
  let school = "";
  try {
    const body = await request.json();
    essay = String(body.essay ?? "").slice(0, 6000).trim();
    school = String(body.school ?? "").slice(0, 100).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!essay) {
    return NextResponse.json({ error: "Essay is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.55,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are simulating an experienced college admissions officer reading an applicant's essay. You've read 8,000 applications this cycle. You're not cruel but you're honest. Return JSON:

{
  "firstImpression": string,            // 2 sentences written in the AO's internal voice when they see the first page
  "marginNotes": [                       // 4 to 6 specific reactions to specific lines/sections
    { "passage": string, "reaction": string }  // a short quote and the AO's margin note
  ],
  "gutCheck": string,                    // 2 sentences: how did this land overall, in plain human language
  "strongestMoment": string,             // 1 sentence naming the passage that actually stood out
  "wouldIShareWithCommittee": string,    // 1 sentence: "Yes, because..." or "No, because..."
  "finalNote": string                    // the 1-line summary an AO would write at the bottom for the committee
}

Rules:
- Write in an AO's actual voice: conversational, slightly worn, specific. Not corporate.
- Be honest about weaknesses. Boring is boring.
- Never invent application details the essay doesn't show.
- 'Margin notes' should quote specific short passages from the essay and react in 1-2 sentences each.
- If a school is specified, incorporate what that school's AO would specifically look for.`,
        },
        {
          role: "user",
          content: `School: ${school || "(general selective admissions)"}\n\nEssay:\n${essay}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
