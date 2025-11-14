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

    const { essay, targetSchools, prompt } = await request.json();

    if (!essay || typeof essay !== "string" || essay.trim().length === 0) {
      return NextResponse.json(
        { error: "Essay text is required" },
        { status: 400 }
      );
    }

    // Build context for the AI
    let contextInfo = "";
    if (targetSchools && Array.isArray(targetSchools) && targetSchools.length > 0) {
      contextInfo += `\n\nTarget schools: ${targetSchools.join(", ")}`;
    }
    if (prompt && typeof prompt === "string" && prompt.trim().length > 0) {
      contextInfo += `\n\nEssay prompt: ${prompt}`;
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
    // Use gpt-4o or gpt-4-turbo which support JSON mode, fallback to gpt-4 with manual parsing
    const systemPrompt = `You are an expert college admissions essay reviewer. Analyze the essay and provide a detailed review.

CRITICAL: You MUST respond with ONLY valid JSON, no additional text or markdown formatting. Use this exact structure:
{
  "score": <number between 0-10>,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "contentFeedback": "<detailed feedback on content and message>",
  "structureFeedback": "<detailed feedback on structure and organization>",
  "styleFeedback": "<detailed feedback on writing style and voice>",
  "recommendation": "<final recommendation>"
}`;

    // Call OpenAI - using gpt-4 with JSON parsing (works with all models)
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Please rate this college admissions essay:${contextInfo}\n\n${essay}`,
        },
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content || "{}";
    
    // Extract JSON from the response (handle markdown code blocks or plain JSON)
    let jsonText = responseText.trim();
    
    // Remove markdown code blocks if present
    const jsonMatch = jsonText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    } else {
      // Try to find JSON object in the text (find the first { to the last })
      const braceMatch = jsonText.match(/\{[\s\S]*\}/);
      if (braceMatch) {
        jsonText = braceMatch[0];
      }
    }

    const rating = JSON.parse(jsonText);

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

