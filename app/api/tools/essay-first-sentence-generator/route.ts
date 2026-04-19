import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "essay-first-sentence-generator";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let topic = "";
  let context = "";
  try {
    const body = await request.json();
    topic = String(body.topic ?? "").slice(0, 500).trim();
    context = String(body.context ?? "").slice(0, 1000).trim();
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
        content: `You generate college essay first sentences. Given the student's topic and context, write 7 opening lines, each under 25 words, in different registers:

1. [Specific object or image] A first line built around one concrete thing the essay will return to.
2. [Action mid-stream] Drop the reader into an action already happening.
3. [Declarative sentence] A direct, confident claim the essay will complicate.
4. [Question] A real question the essay will answer indirectly.
5. [Sensory detail] Sight, sound, smell, touch, or taste as the first thing.
6. [Dialogue or quote] Something heard, said, or overheard.
7. [Quiet and strange] Something small and unexpected that makes the reader tilt their head.

Rules:
- Each option must be grounded in the student's specific topic.
- Each must feel like it could be the real first line of a real essay this applicant would write.
- Avoid cliche openers: no 'ever since I was young', no dictionary definitions, no quotes from famous writers.
- Max 25 words per line. Shorter is usually better.
- Output exactly 7 lines, numbered, with the style tag in brackets.`,
      },
      { role: "user", content: `Topic: ${topic}\nContext: ${context || "(none)"}` },
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
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}
