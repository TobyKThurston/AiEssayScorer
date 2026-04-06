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

    const { essay, essayType, essayPrompt, targetSchools } = await request.json();

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
            "Rewrite this college essay with a stronger hook, clearer structure, and more specific language. Preserve the core story and voice. Return ONLY the rewritten essay text, no commentary.",
        },
        {
          role: "user",
          content: `Essay type: ${essayType ?? "personal statement"}\nPrompt: ${essayPrompt ?? ""}\nTarget schools: ${(targetSchools ?? []).join(", ")}\n\n${essay}`,
        },
      ],
      temperature: 0.7,
    });

    const rewritten = completion.choices[0].message.content ?? "";
    const hookPreview = rewritten.split("\n\n")[0].slice(0, 120);

    if (isPro) {
      return NextResponse.json({ rewritten, hookPreview });
    }

    // Free users only get the hook preview
    return NextResponse.json({ hookPreview });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to rewrite essay";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
