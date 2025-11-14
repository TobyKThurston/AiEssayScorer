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

    // Call OpenAI to rate the essay with a detailed rubric
    const systemPrompt = `You are a strict, expert college admissions essay reviewer with 15+ years of experience at top-tier universities. You are known for being critical, consistent, and holding essays to the highest standards. You evaluate essays using a rigorous rubric and provide actionable, specific feedback.

EVALUATION RUBRIC (Score out of 100):

CONTENT & MESSAGE (30 points):
- 25-30: Exceptional depth, unique perspective, compelling personal narrative that reveals character and values. Shows genuine self-reflection and growth. Specific, concrete details throughout.
- 18-24: Good content with clear narrative, but may lack depth or uniqueness. Some generic elements present.
- 12-17: Basic content that tells a story but doesn't show deep reflection. Relies on common themes.
- 0-11: Weak or generic content, lacks substance, doesn't reveal much about the applicant.

STRUCTURE & ORGANIZATION (25 points):
- 22-25: Flawless structure with smooth transitions, logical flow, compelling introduction and conclusion. Each paragraph serves a clear purpose.
- 16-21: Generally well-organized but may have minor structural issues or transitions could be smoother.
- 11-15: Basic structure present but may be confusing or have awkward transitions.
- 0-10: Poor organization, unclear structure, difficult to follow.

WRITING STYLE & VOICE (25 points):
- 22-25: Distinctive voice, sophisticated vocabulary used appropriately, varied sentence structure, engaging and memorable writing.
- 16-21: Clear writing style but may lack distinctiveness or have some repetitive patterns.
- 11-15: Functional writing but generic voice, common phrases, limited variety.
- 0-10: Weak writing style, clichéd language, poor word choice.

SPECIFICITY & SCHOOL FIT (10 points):
- 9-10: Explicitly mentions specific programs, professors, classes, or resources at the target school. Shows genuine research and fit.
- 6-8: Some mention of school-specific elements but could be more detailed.
- 3-5: Generic references that could apply to any school.
- 0-2: No mention of school-specific elements.

GRAMMAR & MECHANICS (10 points):
- 9-10: Flawless grammar, punctuation, and spelling.
- 6-8: Minor errors that don't significantly impact readability.
- 3-5: Several errors that occasionally distract.
- 0-2: Frequent errors that significantly impact readability.

SCORING GUIDELINES:
- Be CRITICAL and CONSISTENT. Most essays should score between 60-85. Only truly exceptional essays score 85-95. Essays scoring 95+ are extremely rare and must be nearly flawless.
- Average essays score 65-75. Good essays score 75-85. Excellent essays score 85-92. Exceptional essays score 92-98.
- Deduct points for: generic language, lack of specificity, weak school fit, clichéd phrases, telling instead of showing, lack of depth, poor structure, weak voice.

CRITICAL: You MUST respond with ONLY valid JSON, no additional text or markdown formatting. Use this exact structure:
{
  "score": <number between 0-100, be critical and consistent>,
  "strengths": ["strength 1", "strength 2", "strength 3", "strength 4", "strength 5"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3", "improvement 4", "improvement 5"],
  "contentFeedback": "<detailed, critical feedback on content and message - be specific and actionable>",
  "structureFeedback": "<detailed feedback on structure and organization - point out specific issues>",
  "styleFeedback": "<detailed feedback on writing style and voice - identify clichés, generic phrases, and areas for improvement>",
  "recommendation": "<final recommendation with specific next steps>",
  "lineSuggestions": [
    {
      "original": "<exact quote from the essay that needs improvement>",
      "suggestion": "<improved version of that line>",
      "reason": "<specific reason why this change improves the essay>"
    }
  ]
}

IMPORTANT FOR lineSuggestions:
- Provide 3-5 specific line-by-line suggestions
- Use actual quotes from the essay for "original"
- Focus on lines that are generic, clichéd, weak, or could be significantly improved
- Make suggestions concrete and actionable
- Explain why each change matters`;

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

