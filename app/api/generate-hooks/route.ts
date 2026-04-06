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

    const { essay, essayType, essayPrompt } = await request.json();

    if (!essay) {
      return NextResponse.json({ error: "essay is required" }, { status: 400 });
    }

    // Check subscription status
    const { data: sub } = await supabase
      .from("user_subscriptions")
      .select("status")
      .eq("user_id", session.user.id)
      .eq("status", "active")
      .single();

    const isPro = !!sub;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'Generate 3 alternative opening hooks for this college essay. Return JSON: { "narrative": string, "boldStatement": string, "reflective": string }. Each hook max 45 words. Be specific to this essay\'s actual content.',
        },
        {
          role: "user",
          content: `Essay type: ${essayType ?? "personal statement"}\nPrompt: ${essayPrompt ?? ""}\n\n${essay}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const hooks = JSON.parse(completion.choices[0].message.content ?? "{}");

    if (isPro) {
      return NextResponse.json(hooks);
    }

    // Free users only get the narrative hook
    return NextResponse.json({ narrative: hooks.narrative });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate hooks";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
