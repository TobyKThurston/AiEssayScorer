// src/app/api/score/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "../../../lib/firebaseAdmin";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

/** Returns today’s date in YYYY-MM-DD format */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  // 1. Authenticate
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  // 2. Enforce 3-essays-per-day limit
  const key = `${userId}_${today()}`;
  const docRef = db.collection("dailyCounts").doc(key);
  const snap = await docRef.get();
  const count = snap.exists ? (snap.data()!.count as number) : 0;

  if (count >= 3) {
    return NextResponse.json({ limit: true }, { status: 403 });
  }
  await docRef.set({ count: count + 1 }, { merge: true });

  // 3. Read the essay from the request
  const { essay } = await req.json();

  // 4. Call OpenAI GPT-4 for scoring
  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a college admissions officer. Return ONLY this JSON:
{
  "structure": 1-10,
  "clarity": 1-10,
  "creativity": 1-10,
  "tone": 1-10,
  "overall": 1-10,
  "feedback": "…paragraph of feedback…"
}`
        },
        { role: "user", content: essay },
      ],
    });

    const raw = chat.choices[0].message.content || "";
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Invalid AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}



