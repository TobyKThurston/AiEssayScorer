import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { essay } = await request.json();

    if (!essay || typeof essay !== "string" || essay.trim().length === 0) {
      return NextResponse.json(
        { error: "Essay text is required" },
        { status: 400 }
      );
    }

    // Check user tokens
    const { data: userTokens, error: tokenError } = await supabase
      .from("user_tokens")
      .select("tokens")
      .eq("user_id", session.user.id)
      .single();

    if (tokenError || !userTokens || userTokens.tokens < 1) {
      return NextResponse.json(
        { error: "Insufficient tokens. You need at least 1 token to rate an essay." },
        { status: 403 }
      );
    }

    // Call OpenAI to rate the essay
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert college admissions essay reviewer. Analyze the essay and provide:
1. Overall score (out of 10)
2. Strengths (3-5 bullet points)
3. Areas for improvement (3-5 bullet points)
4. Specific feedback on:
   - Content and message
   - Structure and organization
   - Writing style and voice
   - Grammar and mechanics (if applicable)
5. Final recommendation

Format your response as JSON with the following structure:
{
  "score": number,
  "strengths": string[],
  "improvements": string[],
  "contentFeedback": string,
  "structureFeedback": string,
  "styleFeedback": string,
  "recommendation": string
}`,
        },
        {
          role: "user",
          content: `Please rate this college admissions essay:\n\n${essay}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const rating = JSON.parse(completion.choices[0].message.content || "{}");

    // Deduct token
    await supabase
      .from("user_tokens")
      .update({ tokens: userTokens.tokens - 1 })
      .eq("user_id", session.user.id);

    return NextResponse.json({ rating });
  } catch (error: any) {
    console.error("Error rating essay:", error);
    return NextResponse.json(
      { error: error.message || "Failed to rate essay" },
      { status: 500 }
    );
  }
}

