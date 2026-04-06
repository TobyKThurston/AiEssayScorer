import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { original, suggestion, reason, essayContext } = await request.json();

    if (!original || !suggestion) {
      return NextResponse.json({ error: "original and suggestion are required" }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert college essay editor. Rewrite the sentence to be more specific, vivid, and compelling based on the suggestion. Return JSON: { \"rewritten\": string, \"explanation\": string }",
        },
        {
          role: "user",
          content: `Essay context (first 600 chars): ${essayContext ?? ""}\n\nOriginal sentence: "${original}"\nSuggestion: ${suggestion}\nReason: ${reason ?? ""}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content ?? "{}");
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to rewrite line";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
