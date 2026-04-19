import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "short-supplement-distiller";

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
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content: `Given a student's longer college essay, produce three versions at progressively shorter word limits. Output format:

=== 150 words ===
[A version at roughly 150 words that keeps the essay's spine: one concrete scene, one reflection beat, one landing.]

=== 100 words ===
[A version at roughly 100 words that strips to the most necessary scene beat plus the core insight.]

=== 50 words ===
[A version at roughly 50 words that is essentially the essay's thesis and its single strongest concrete detail.]

Rules:
- Each version preserves the student's voice.
- Never invent new content. Only compress existing material.
- 50-word version can be a single striking paragraph or an image. It does not have to follow standard essay structure.
- Keep the student's strongest details at every length.
- Output all three versions, separated by the markers above.`,
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
