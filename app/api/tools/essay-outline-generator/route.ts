import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "essay-outline-generator";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let topic = "";
  let prompt = "";
  let wordLimit = 650;
  try {
    const body = await request.json();
    topic = String(body.topic ?? "").slice(0, 500).trim();
    prompt = String(body.prompt ?? "").slice(0, 1500).trim();
    const parsed = Number(body.wordLimit);
    if (Number.isFinite(parsed) && parsed > 0) {
      wordLimit = Math.min(1000, Math.max(100, Math.floor(parsed)));
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!topic) {
    return NextResponse.json({ error: "Topic is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You outline college admissions essays. Given a student's topic, the prompt, and a word limit, return a structured 4-beat outline in JSON:

{
  "hook": string,                   // 1-2 sentence opener suggestion, specific and concrete
  "sceneBeats": string[],           // 3 specific scene beats that set the narrative, each 1-2 sentences
  "reflectionPoints": string[],     // 2-3 reflection beats showing what the scene reveals
  "landingLine": string,            // 1 sentence closing suggestion
  "wordAllocation": {               // roughly how many words to spend on each section
    "hook": number,
    "scene": number,
    "reflection": number,
    "landing": number
  },
  "craftNotes": string[]            // 2-3 short notes on pacing, voice, or structural pitfalls
}

Rules:
- The outline must be specific to the student's topic, not generic.
- Word allocations should add up to roughly the provided word limit.
- Craft notes should call out traps for this specific essay (e.g., "don't explain the metaphor", "open mid-scene not mid-explanation").
- Never invent details not implied by the topic.
- No preamble outside the JSON.`,
        },
        {
          role: "user",
          content: `Topic: ${topic}\nPrompt: ${prompt || "(not specified)"}\nWord limit: ${wordLimit}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to outline.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
