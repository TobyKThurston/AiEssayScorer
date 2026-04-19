import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkToolGate, paywallResponse } from "@/lib/rate-limit";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "supplemental-essay-planner";

export async function POST(request: Request) {
  const gate = await checkToolGate(request, SLUG);
  if (!gate.ok) return paywallResponse(gate);

  let collegeList = "";
  let major = "";
  try {
    const body = await request.json();
    collegeList = String(body.collegeList ?? "").slice(0, 1500).trim();
    major = String(body.major ?? "").slice(0, 200).trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!collegeList) {
    return NextResponse.json({ error: "College list is required." }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a college counselor planning an applicant's supplemental essay workload. Given the college list and intended major, return a JSON plan:

{
  "totalEssayLoad": {
    "personalStatement": number,      // almost always 1
    "longSupplementals": number,      // 300+ words
    "mediumSupplementals": number,    // 100 to 300 words
    "shortSupplementals": number,     // under 100 words
    "totalNewEssays": number          // rough estimate of distinct drafts needed
  },
  "bySchool": [                        // one entry per school in the list
    {
      "school": string,
      "essays": [                      // supplementals required
        { "prompt": string, "wordLimit": string, "difficulty": "easy" | "medium" | "hard" }
      ],
      "reuseFromOtherSchools": string  // 1 sentence: what can be adapted from drafts for other schools
    }
  ],
  "overlapPlan": [                     // 2 to 4 overlap clusters
    { "cluster": string, "schools": string[], "oneDraftCoversAll": string }
  ],
  "hardestSchool": string,             // 1 sentence on the school with the hardest writing load
  "orderOfOperations": string[]        // 4 to 6 step plan for drafting in a sensible order
}

Rules:
- Base prompts and word limits on the most recent public application cycle information for each school, but be honest when uncertain.
- Identify overlap (e.g., 3 schools all asking about community) so the student writes one base draft and adapts it.
- 'Order of operations' should start with the highest-leverage drafts (the ones that can be adapted for most schools).
- Never pretend to know prompts verbatim if you don't. Say "check current prompt" if uncertain.`,
        },
        {
          role: "user",
          content: `College list: ${collegeList}\nIntended major: ${major || "(not specified)"}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "{}";
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
