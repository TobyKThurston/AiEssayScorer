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
"score": 82,
"strengths": [
"Clear central narrative with a coherent personal story that gives the reader a sense of who you are beyond your resume",
"Good use of specific moments and anecdotes to show growth over time instead of only telling the reader that you have matured",
"Reflective tone that attempts to connect past experiences to future goals and hints at how you would contribute to a college campus"
],
"improvements": [
"You do not mention any concrete details about the specific school you are applying to, which makes the essay feel like it could be sent to any college",
"Your regional context is underused; you briefly mention where you are from but do not show how your city, high school, or region has shaped your perspective or opportunities",
"Several paragraphs summarize events instead of analyzing them, so the admissions reader learns what happened but not enough about how you think, what you value, or how you make decisions"
],
"contentFeedback": "Your essay succeeds at presenting a clear narrative arc: something challenged you, you responded, and you changed because of it. This gives the reader a basic but real sense of your character. The anecdotes you use are generally concrete enough that the reader can picture the scene, which is important. However, the essay is still operating at a generic level that many other applicants will also hit. You rarely move from description to deep interpretation. For example, you explain what you did in a particular activity, but you spend less time on why it mattered to you, what you learned that you could not have learned in a classroom, or how it changed how you view your community. Right now, the essay could be repurposed for multiple schools with almost no changes. You do not mention any specific programs, professors, classes, research opportunities, or campus resources at the college itself. You also do not connect your story to why this specific school is the right environment for the kind of growth you describe. Admissions officers want to see at least one or two sentences that make it clear you understand their institution and did not just paste the same essay everywhere. In addition, you mention your location and background only briefly. You could tailor this essay more to your region by explaining how your local context shaped your values, access to resources, or motivation. For example, highlight a challenge or opportunity that is typical of your region and then show how you navigated it in your own way. Finally, you could strengthen the ending by tying your experience, your region, and the school together: how will the mindset you developed in your specific hometown and high school allow you to contribute something distinct to this campus.",
"structureFeedback": "The structure is generally logical: introduction with a hook, body paragraphs that expand the story, and a conclusion that looks forward. The reader can follow the timeline without confusion. That said, the introduction takes a bit too long to get to the central point of the essay. Consider tightening the opening so that within the first three to four sentences the reader understands the main situation or tension your essay will explore. In the body, some paragraphs try to cover too much ground at once. You move quickly from one example to another without fully unpacking any single moment. It may be better to choose one or two key scenes and go deeper on those rather than listing several smaller examples. This will give you more space for reflection and insight. The transition into the final paragraph is functional but not very deliberate; it feels like you are running out of space and rushing to talk about the future. Instead, use a clear pivot sentence that connects your past experience to what you want to study, which communities you hope to join, or how you plan to use the college’s resources. You should also consider reserving one short paragraph specifically for school fit. In that paragraph, name one to three specific aspects of the college and explain how they connect to the story you have just told. This makes the structure feel intentional and tailored rather than generic.",
"styleFeedback": "Your writing style is clear, straightforward, and generally easy to read, which is a strength. Admissions officers read quickly, so clarity matters. You occasionally use vivid images or specific phrases that stand out, but many sentences still rely on common application essay language such as "pushed me out of my comfort zone," "taught me the value of hard work," or "shaped me into who I am today." These phrases are not wrong, but they are overused and do not distinguish you. Try replacing those abstractions with more concrete details and specific word choices that only you would use. For instance, instead of saying a challenge "taught you perseverance," show a moment where you stayed late, rewrote something multiple times, or took a risk when it was easier not to. Your tone is sincere and appropriate, but you can sharpen your voice by varying sentence length and rhythm. Right now, several sentences have a similar structure, which flattens the voice. Mix in a few shorter, punchier lines around longer, reflective sentences to keep the reader engaged. Also, be careful with filler phrases like "in conclusion" or "overall"; they are not necessary in a short personal essay and can be replaced with more purposeful transitions. Finally, if you mention a future major or academic interest, use at least one specific detail or term related to that field to show that your interest is informed and not just a label.",
"recommendation": "This essay is solid but not yet at a truly distinctive level. With revisions focused on specificity and fit, it could become a strong asset in your application. I would recommend that you: 1) Add one focused paragraph that explicitly connects your story to this particular college, naming specific programs, classes, or communities you would join; 2) Bring in at least one detail that anchors your experience in your region, showing how your local context influenced your perspective and how that perspective will show up on campus; and 3) Replace generic phrases with more concrete descriptions and deeper reflection so that the reader remembers you as an individual, not just as a type of applicant. If you implement these changes, this essay can move from good to genuinely compelling and help you stand out in a competitive pool."
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

