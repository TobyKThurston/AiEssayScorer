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

    const { essay, targetSchools, prompt } = await request.json();

    if (!essay || typeof essay !== "string" || essay.trim().length === 0) {
      return NextResponse.json({ error: "Essay text is required" }, { status: 400 });
    }

    let userPrompt = `Provide 8-10 line suggestions for this essay:`;
    if (targetSchools?.length) userPrompt += `\n\nTarget schools: ${targetSchools.join(", ")}`;
    if (prompt?.trim()) userPrompt += `\n\nEssay prompt: ${prompt}`;
    userPrompt += `\n\n${essay}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert college essay line editor. Find 8-10 specific sentences or phrases that are weak, generic, clichéd, or could be made more vivid and compelling. Use exact quotes for "original". Return JSON: { "lineSuggestions": [{ "original": string, "suggestion": string, "reason": string }] }',
        },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const data = JSON.parse(completion.choices[0].message.content ?? "{}");

    return NextResponse.json({ lineSuggestions: data.lineSuggestions ?? [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate line suggestions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
