import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SLUG = "prompt-deconstructor";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let school = "";
  let promptText = "";
  try {
    const body = await request.json();
    school = String(body.school ?? "").slice(0, 100).trim();
    promptText = String(body.promptText ?? "").slice(0, 1500).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!promptText) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You deconstruct college supplemental essay prompts for applicants. Return JSON only, in this exact shape:
{
  "hiddenQuestion": string,          // 1–2 sentences: what the admissions office is ACTUALLY evaluating, beneath the literal prompt
  "whatToAvoid": string[],           // 3 concise bullets, each 1 sentence, specific pitfalls (not generic writing advice)
  "recommendedAngles": string[],     // 3 distinct, concrete angles a student could take. Each 1–2 sentences.
  "keywordsToInclude": string[],     // 4–6 short signals/values/themes the essay should subtly demonstrate. 1–3 words each.
  "onePieceOfAdvice": string         // 1 punchy sentence, the single most important thing to remember
}
Rules:
- Be specific to THIS prompt and school (if given). Never generic.
- Never recommend lying, exaggerating, or inventing experiences.
- No preamble outside the JSON object.`,
        },
        {
          role: "user",
          content: `School: ${school || "(not specified)"}\nPrompt:\n${promptText}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to analyze prompt.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
