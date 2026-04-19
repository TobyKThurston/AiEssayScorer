import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "essay-conclusion-generator";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let body_text = "";
  try {
    const body = await request.json();
    body_text = String(body.essay ?? "").slice(0, 6000).trim();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 });
  }
  if (!body_text) {
    return new Response(JSON.stringify({ error: "Essay is required." }), { status: 400 });
  }

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.8,
    messages: [
      {
        role: "system",
        content: `You write 3 conclusion options for a college admissions essay. Given the student's essay body, produce 3 closings in this format:

Option 1 (reflective):
[3-4 sentences of interior thought tying back to the essay's anchor image or moment.]

Option 2 (scene-based):
[3-4 sentences returning to a specific scene from the essay and letting the action close the loop.]

Option 3 (forward-looking):
[3-4 sentences pointing toward what the student will do with this understanding, without being generic about college.]

Rules:
- Each conclusion must tie back to specific details from the essay body.
- Never invent activities, people, or events not in the essay.
- Never write generic college-essay conclusions ('I cannot wait to see where this takes me').
- Keep the voice consistent with the body.
- Separate the three options with a blank line.`,
      },
      { role: "user", content: body_text },
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
