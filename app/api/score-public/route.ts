import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { createHash } from "crypto";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SLUG = "score-public";
const FREE_ANON_PER_DAY = 1;

function hashIp(ip: string): string {
  return createHash("sha256")
    .update(ip + (process.env.RATE_LIMIT_SALT ?? "ivyadmit-tools"))
    .digest("hex")
    .slice(0, 32);
}

function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

const systemPrompt = `You are a strict, expert college admissions essay reviewer. Score a draft on a 100-point rubric and return JSON only.

Rubric:
- contentScore /30: depth, unique perspective, self-reflection, concrete detail.
- structureScore /25: flow, transitions, purposeful paragraphs.
- styleScore /25: distinctive voice, varied sentences, vocabulary.
- specificityScore /10: concrete details and, if schools given, school-specific fit.
- grammarScore /10: mechanics.

Calibration: most essays score 60 to 85. 85 to 92 is excellent. 92 plus is rare.

Return JSON exactly:
{
  "score": number,              // sum of sub-scores
  "contentScore": number,
  "structureScore": number,
  "styleScore": number,
  "specificityScore": number,
  "grammarScore": number,
  "firstImpression": string,    // 1 sentence gut reaction of an AO opening this essay
  "strengths": string[],        // 3 concrete strengths, 1 sentence each
  "improvements": string[],     // 3 actionable improvements, 1 sentence each. Specific to this essay.
  "blendRisk": "Low" | "Medium" | "High",
  "standoutMove": string        // 1 sentence on the single change that would make this memorable
}

Rules:
- Never invent content that is not in the essay.
- Never recommend lying or exaggeration.
- No preamble.`;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let isPro = false;
  let loggedIn = false;
  if (session) {
    loggedIn = true;
    const { data: sub } = await supabase
      .from("user_subscriptions")
      .select("status")
      .eq("user_id", session.user.id)
      .eq("status", "active")
      .maybeSingle();
    isPro = !!sub;
  }

  const ip = getClientIp(request.headers);
  const ipHash = hashIp(ip);
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  if (!isPro) {
    const { count } = await supabase
      .from("tool_usage")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .eq("tool_slug", SLUG)
      .gte("created_at", dayAgo);

    const used = count ?? 0;
    if (used >= FREE_ANON_PER_DAY) {
      return NextResponse.json(
        {
          error:
            loggedIn
              ? "You've used your free review today. Upgrade to Pro for unlimited scoring plus line-by-line feedback, or save your drafts in the Editor."
              : "You've used your free review. Create a free account for more free reviews, or upgrade to Pro for unlimited.",
          gate: loggedIn ? "pro" : "login",
          upgradeUrl: loggedIn ? "/editor" : "/auth/login?next=/try",
        },
        { status: 402 }
      );
    }
  }

  let essay = "";
  let prompt = "";
  let targetSchools: string[] = [];
  try {
    const body = await request.json();
    essay = String(body.essay ?? "").slice(0, 10000).trim();
    prompt = String(body.prompt ?? "").slice(0, 1500).trim();
    if (Array.isArray(body.targetSchools)) {
      targetSchools = body.targetSchools
        .map((s: unknown) => String(s ?? "").slice(0, 80).trim())
        .filter((s: string) => s.length > 0)
        .slice(0, 5);
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!essay) {
    return NextResponse.json({ error: "Essay is required." }, { status: 400 });
  }

  try {
    let userPrompt = "Please score this college admissions essay draft:";
    if (targetSchools.length) userPrompt += `\n\nTarget schools: ${targetSchools.join(", ")}`;
    if (prompt) userPrompt += `\n\nEssay prompt: ${prompt}`;
    userPrompt += `\n\n${essay}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const rating = JSON.parse(completion.choices[0].message.content ?? "{}");

    if (!isPro) {
      await supabase.from("tool_usage").insert({ ip_hash: ipHash, tool_slug: SLUG });
    }

    return NextResponse.json({ rating, isPro, loggedIn });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to score essay.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
