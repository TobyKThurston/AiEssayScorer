import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { essay } = await req.json();

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a college admissions officer. You will read a student's essay and return only a VALID JSON object with the following keys and nothing else. Do NOT include explanation or preface.

Format your response exactly like this:
{
  "structure": 1-10,
  "clarity": 1-10,
  "creativity": 1-10,
  "tone": 1-10,
  "overall": 1-10,
  "feedback": "a paragraph of honest, constructive feedback"
}

Respond ONLY with this JSON.`,
        },
        { role: "user", content: essay },
      ],
    });

    const raw = chat.choices[0].message.content || "";
    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("GPT did not return valid JSON:", raw);
      return NextResponse.json({ error: "Invalid response from AI." }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

