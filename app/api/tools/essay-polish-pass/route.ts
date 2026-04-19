import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "essay-polish-pass";

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
    temperature: 0.45,
    messages: [
      {
        role: "system",
        content: `You are a strict copy editor for college admissions essays. Perform a comprehensive polish pass on the student's draft:

1. Fix grammar, punctuation, and spelling.
2. Tighten redundant phrasing. Cut filler.
3. Replace weak verbs (was, had, got, made) with stronger specific verbs where the context allows.
4. Convert passive voice to active unless passive is doing real work.
5. Replace obvious cliches ('ever since I was young', 'passion for', 'think outside the box', 'change the world') with specific alternatives drawn from the draft's content.
6. Smooth transitions where paragraphs jerk.

Hard rules:
- Preserve the student's voice and core content. Never invent facts, scenes, people, or events.
- Preserve intentional stylistic choices (fragments, repetition, unusual punctuation) if they clearly serve the piece.
- Do not change the meaning or argument of any paragraph.
- Do not introduce new reflection that isn't implied by the draft.

Output the polished essay only. No preamble, no commentary, no track-changes markup.`,
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
