import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "why-college-brainstormer";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let school = "";
  let major = "";
  let interests = "";
  try {
    const body = await request.json();
    school = String(body.school ?? "").slice(0, 100).trim();
    major = String(body.major ?? "").slice(0, 100).trim();
    interests = String(body.interests ?? "").slice(0, 800).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!school || !major) {
    return NextResponse.json({ error: "School and major are required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.55,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You help students brainstorm specific, verifiable details for "Why this college" essays. Given a school, intended major, and optional interests, return a JSON object in this exact shape:

{
  "openingAngle": string,               // 2 sentences suggesting a specific opening hook tied to the student's interests and this school
  "professors": [                       // 2 to 3 entries
    { "name": string, "why": string }
  ],
  "courses": [                          // 2 to 3 entries
    { "name": string, "why": string }
  ],
  "programsAndClubs": [                 // 2 to 3 entries
    { "name": string, "why": string }
  ],
  "campusSpecifics": string[],          // 3 to 4 concrete traditions, spaces, or cultural quirks unique to the school
  "researchTips": string[]              // 3 short instructions for verifying details before citing them
}

Rules:
- Only reference professors, courses, programs, and clubs you are confident exist at this school. If uncertain, give a general type and remind the student to verify.
- Every "why" should connect the item to the student's specific interests, not generic praise.
- Never fabricate a course code or specific class title if uncertain. Prefer accurate program names over invented course numbers.
- researchTips should always include: verify the professor is still at the school, check the course is offered this year, confirm the club is active.
- No preamble outside the JSON.`,
        },
        {
          role: "user",
          content: `School: ${school}\nIntended major: ${major}\nInterests: ${interests || "(not specified)"}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to brainstorm.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
