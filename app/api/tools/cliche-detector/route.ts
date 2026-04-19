import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "cliche-detector";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let essay = "";
  try {
    const body = await request.json();
    essay = String(body.essay ?? "").slice(0, 6000).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!essay) {
    return NextResponse.json({ error: "Essay is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You scan college admissions essays for clichés. Clichés include:
- Worn openings: "Ever since I was young", "I have always been passionate about", "It was a cold winter morning", "In today's society", dictionary definitions.
- Tired tropes: mission trip / service trip epiphanies that recenter the writer, the "dead grandparent lesson", the sports injury comeback, the "aha moment" where one event changes everything, the "I realized how privileged I am" conclusion.
- Overused phrases: "passion for helping others", "think outside the box", "make a difference", "change the world", "stepped out of my comfort zone", "little did I know", "diverse perspectives", "lifelong learner".
- Generic virtues stated without scene: "I am driven / curious / resilient / compassionate".

Return JSON only:
{
  "overallTake": string,              // 2 sentence verdict on how cliché-heavy the essay is
  "findings": [
    {
      "phrase": string,                // exact quote from the essay, 10 words max
      "location": string,              // e.g., "opening sentence", "paragraph 2", "conclusion"
      "whyItsACliche": string,         // 1 sentence
      "suggestedReplacement": string   // 1 to 2 sentence rewrite that is specific to this essay
    }
  ]
}

Rules:
- Up to 6 findings. Prefer the most damaging ones.
- If the essay is clean, return an empty findings array and say so in overallTake.
- Replacements must use details from the essay itself. Do not invent facts.`,
        },
        { role: "user", content: essay },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to scan.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
