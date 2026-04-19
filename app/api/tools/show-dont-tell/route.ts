import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "show-dont-tell";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let sentence = "";
  let context = "";
  try {
    const body = await request.json();
    sentence = String(body.sentence ?? "").slice(0, 300).trim();
    context = String(body.context ?? "").slice(0, 500).trim();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 });
  }
  if (!sentence) {
    return new Response(JSON.stringify({ error: "Sentence is required." }), { status: 400 });
  }

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.85,
    messages: [
      {
        role: "system",
        content: `You rewrite "telling" sentences as "showing" scenes for college essays. Given a sentence that tells the reader how to feel (I was nervous, it was beautiful, she was kind), produce 3 rewrites in this format:

Rewrite 1 (sensory):
[2 to 4 sentences using sight, sound, touch, smell, or taste to let the reader feel the emotion without being told.]

Rewrite 2 (action):
[2 to 4 sentences showing the emotion through what the character does with their body or hands.]

Rewrite 3 (interior):
[2 to 4 sentences showing the thought that gives away the emotion, written as concrete interior monologue.]

Rules:
- Never reuse the word being "told" (nervous, beautiful, kind, etc.) in the rewrite.
- Use the provided context to ground details in a specific place and time.
- No purple prose. No clichés. Keep the voice like a thoughtful 17 year old.
- Separate the three rewrites with a blank line.`,
      },
      {
        role: "user",
        content: `Sentence: ${sentence}\n${context ? `Context: ${context}` : ""}`.trim(),
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
