import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "college-interview-prep-questions";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let materials = "";
  let school = "";
  try {
    const body = await request.json();
    materials = String(body.materials ?? "").slice(0, 6000).trim();
    school = String(body.school ?? "").slice(0, 100).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!materials) {
    return NextResponse.json({ error: "Please paste your application materials." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.55,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You generate college interview questions tailored to a specific applicant's materials. Interviewers read the application and ask questions that probe for depth, authenticity, and intellectual seriousness. Return JSON:

{
  "warmups": [                           // 2 questions: easy openers the interviewer uses to establish rapport
    { "question": string, "whyTheyAsk": string }
  ],
  "essayDeepDives": [                    // 3 questions probing the applicant's essays
    { "question": string, "whyTheyAsk": string, "strongAnswerApproach": string }
  ],
  "activityProbes": [                    // 3 questions probing the activities list
    { "question": string, "whyTheyAsk": string, "strongAnswerApproach": string }
  ],
  "intellectualQuestions": [             // 2 questions testing intellectual curiosity
    { "question": string, "whyTheyAsk": string, "strongAnswerApproach": string }
  ],
  "traps": string[],                     // 3 sentences on common traps in these interviews for this specific applicant
  "schoolSpecificAsk": string            // 1-2 sentences: the one question you should have a specific, well-prepared answer for at this school
}

Rules:
- Questions must be specific to the materials provided. Never generic 'tell me about yourself' unless phrased for rapport.
- 'Why they ask' should explain what the interviewer is actually evaluating.
- 'Strong answer approach' names the structure of a good response (e.g., 'Lead with the specific moment, then the lesson, then how it shows up now').
- Never invent application details not in the input.`,
        },
        {
          role: "user",
          content: `School: ${school || "(not specified)"}\n\nApplication materials (essays, activities, etc.):\n${materials}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to generate.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
