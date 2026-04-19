import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";
import { getRewriter } from "@/tools/rewriters";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  let rewriterSlug = "";
  let essay = "";
  try {
    const body = await request.json();
    rewriterSlug = String(body.rewriterSlug ?? "").slice(0, 100).trim();
    essay = String(body.essay ?? "").slice(0, 6000).trim();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 });
  }

  const rewriter = getRewriter(rewriterSlug);
  if (!rewriter) {
    return new Response(JSON.stringify({ error: "Unknown rewriter." }), { status: 400 });
  }

  const gateSlug = `rewriter:${rewriter.slug}`;
  const gate = await checkToolGate(request, gateSlug);
  if (!gate.ok) return paywallResponse(gate);

  if (!essay) {
    return new Response(JSON.stringify({ error: "Essay is required." }), { status: 400 });
  }

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.55,
    messages: [
      {
        role: "system",
        content: `You rewrite college admissions essays on request. Follow the instruction exactly and preserve the student's voice. Never invent facts, activities, people, or experiences that are not in the original draft. If you cut, keep the emotional core and strongest details. If you expand, only draw out what is already implied. Output the rewritten essay only. Do not include preamble, word count, or commentary.\n\nInstruction: ${rewriter.instruction}`,
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
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
