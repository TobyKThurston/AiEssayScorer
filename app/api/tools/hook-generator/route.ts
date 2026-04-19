import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SLUG = "essay-hook-generator";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let topic = "";
  let prompt = "";
  try {
    const body = await request.json();
    topic = String(body.topic ?? "").slice(0, 300).trim();
    prompt = String(body.prompt ?? "").slice(0, 800).trim();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 });
  }

  if (!topic) {
    return new Response(JSON.stringify({ error: "Topic is required." }), { status: 400 });
  }

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.9,
    messages: [
      {
        role: "system",
        content: `You are a college admissions essay coach. Given a student's essay topic, generate 5 distinct opening hooks in this exact format:

1. [Narrative] A vivid, in-scene opening (1–2 sentences).
2. [Reflective] A thoughtful, introspective opening.
3. [Bold statement] A confident, surprising claim.
4. [Dialogue or quote] An opener using voice, overheard, said, or remembered.
5. [Sensory detail] A tight, specific image grounded in sight/sound/smell/touch.

Rules:
- Each hook must be 1–2 sentences, max 40 words.
- Each hook must feel specific to the student's topic. Never generic.
- Never explain the hook. No preamble. No labels beyond the bracketed style tag.
- Write in a voice that sounds like a thoughtful 17-year-old, not an ad.`,
      },
      {
        role: "user",
        content: `Topic: ${topic}\n${prompt ? `Essay prompt: ${prompt}` : ""}`.trim(),
      },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Stream error";
        controller.enqueue(encoder.encode(`\n\n[error: ${message}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
