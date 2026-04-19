import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "college-essay-title-generator";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let essay = "";
  try {
    const body = await request.json();
    essay = String(body.essay ?? "").slice(0, 6000).trim();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 });
  }
  if (!essay) {
    return new Response(JSON.stringify({ error: "Essay is required." }), { status: 400 });
  }

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.85,
    messages: [
      {
        role: "system",
        content: `You generate 5 title options for a college essay. Each should capture the essay without giving away the ending. Output in this exact format:

1. [concrete] A 3-5 word title using a specific object, place, or image from the essay.
2. [evocative] A 4-6 word title with a small mystery or tension.
3. [question] A title phrased as a question the essay answers indirectly.
4. [fragment] A single striking phrase or fragment pulled from the essay.
5. [dialogue] A short quote, overheard line, or direct address used as a title.

Rules:
- Titles must come from what's actually in the essay (don't invent).
- Short wins: 3 to 7 words ideal.
- No colons-plus-subtitle structures ('The Kitchen: A Story of Family'). One line only.
- No generic titles ('My Story', 'A Life Lesson').`,
      },
      { role: "user", content: essay },
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
