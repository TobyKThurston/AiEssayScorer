import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "recommendation-brag-sheet";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let subject = "";
  let teacher = "";
  let stories = "";
  try {
    const body = await request.json();
    subject = String(body.subject ?? "").slice(0, 300).trim();
    teacher = String(body.teacher ?? "").slice(0, 300).trim();
    stories = String(body.stories ?? "").slice(0, 3000).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!stories) {
    return NextResponse.json({ error: "Please describe some experiences or stories." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You help a student prepare a brag sheet for a teacher writing their college recommendation letter. Return JSON:

{
  "greeting": string,                                // 1-2 sentence personal opener to the teacher, warm and specific if context is given
  "intellectualStrengths": [                         // 2-3 entries
    { "label": string, "storyOrDetail": string }     // the quality + a specific moment that shows it
  ],
  "characterStrengths": [                            // 2-3 entries
    { "label": string, "storyOrDetail": string }
  ],
  "classroomMoments": string[],                      // 2-3 specific moments in this teacher's class the letter could reference
  "beyondClass": string[],                           // 2-3 things the teacher might not know about: extracurriculars, jobs, independent projects
  "whatColleges": string[],                          // 2-3 colleges or types of colleges this letter will go to
  "anglesToEmphasize": string[],                     // 2-3 specific qualities this student wants the letter to highlight
  "closing": string                                  // 1-2 sentences thanking the teacher and offering to answer questions
}

Rules:
- Use ONLY the experiences the student provides. Never invent stories, classes, or qualities.
- 'Moments' should be specific actions the teacher witnessed (a question asked in class, a paper topic, a conversation), not abstract traits.
- Avoid generic 'I am a hard worker' language. Pull concrete moments from the student's input.
- The brag sheet is organized for the teacher's convenience: short, scannable, quote-ready.`,
        },
        {
          role: "user",
          content: `Student's subject/interest: ${subject || "(not specified)"}\nTeacher context: ${teacher || "(not specified)"}\nStories, experiences, and things I want the teacher to know:\n${stories}`,
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
