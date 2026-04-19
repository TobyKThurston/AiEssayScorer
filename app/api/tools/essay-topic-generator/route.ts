import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "essay-topic-generator";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let background = "";
  let quirks = "";
  try {
    const body = await request.json();
    background = String(body.background ?? "").slice(0, 1500).trim();
    quirks = String(body.quirks ?? "").slice(0, 800).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!background) {
    return NextResponse.json({ error: "Background is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.85,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a college admissions essay coach. Given a student's background and quirks, return 5 distinct, specific personal statement topic ideas as JSON:

{
  "topics": [
    {
      "title": string,            // 4 to 8 words, hook-style
      "pitch": string,             // 2 to 3 sentences describing the angle
      "bestPromptFit": string,     // which of Common App prompt 1 through 7 fits best, e.g., "Common App #5"
      "whyItWorks": string         // 1 to 2 sentences on why this beats a generic version
    }
  ]
}

Rules:
- Each topic must use a specific detail from the student's input. No generic ideas.
- Favor small, concrete moments over big life events. A student arguing with grandma about sourdough beats "my hardship story".
- Never suggest the student lie or invent experiences.
- Avoid the 5 deadliest clichés: the mission trip epiphany, the sports injury comeback, the dead grandparent lesson, "ever since I was young", the "realized I was privileged" arc.
- Each topic should lead to a different emotional register if possible (funny, tender, intellectual, uncomfortable, quiet).`,
        },
        {
          role: "user",
          content: `Background: ${background}\nQuirks: ${quirks || "(none given)"}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to generate topics.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
