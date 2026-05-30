import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { allSelectableSchools as ALL_SCHOOLS } from "@/Odds/allSchools";
import type { Profile, OddsResult, SchoolOdds, Tier } from "@/Odds/types";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `You are a senior college admissions consultant who has read thousands of admit and reject decisions at top US universities. You estimate a realistic admit probability for a single applicant at one school given their profile.

Inputs you will receive:
- Applicant profile (test scores, GPA scale + value, location, demographics, hooks, intended major)
- Activities list with self-rated tiers 1-4 (1 = national/international recognition; 4 = participation-level), plus role, hours/week, years involved, and a short description of what they actually did. Use the description to judge depth and authenticity, not just the tier.
- A target school with its known selectivity tier

Calibration (very important):
- Most applicants are not admitted to elite schools. Be honest, not flattering.
- Ivy / equivalent (HYPSM): typical strong applicant 3-12%, exceptional 15-30%, hooked 25-50%.
- Top 20 private (Penn, Duke, NYU, etc.): strong 8-25%, exceptional 30-55%.
- Top public flagship out-of-state (UCLA, UMich): 12-30% for strong students.
- Top public flagship in-state: 30-65% for strong students.
- Liberal arts (Williams, Amherst, Pomona): strong 10-25%, exceptional 25-45%.
- Less selective schools should hit 60-90% for solid academics.

Tier definitions:
- "Reach" if percent < 30
- "Match" if 30 <= percent <= 60
- "Safety" if percent > 60

Return JSON ONLY for one school:
{
  "percent": number,           // integer 1-99
  "tier": "Reach" | "Match" | "Safety",
  "factors": string[]          // 3 short factor bullets (each 8-15 words). Reference their actual data.
}

Rules:
- Never invent data the user did not give you.
- Be specific in factors (cite their GPA, score, tier-1 activities, geography).
- Do not flatter. If their profile is weak for a reach, say so.
- No preamble.`;

const TIER_FROM_PERCENT = (p: number): Tier =>
  p < 30 ? "Reach" : p <= 60 ? "Match" : "Safety";

interface ScoreOneResult {
  percent: number;
  tier: Tier;
  factors: string[];
}

async function scoreOneSchool(
  profile: Profile,
  schoolDescriptor: string,
): Promise<ScoreOneResult> {
  const userPrompt = `Applicant profile:
${JSON.stringify(profile, null, 2)}

Target school:
${schoolDescriptor}

Return JSON only.`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.4,
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(raw) as Partial<ScoreOneResult>;

  let percent = Math.round(Number(parsed.percent) || 0);
  if (!Number.isFinite(percent)) percent = 5;
  percent = Math.min(99, Math.max(1, percent));

  const tier: Tier =
    parsed.tier === "Reach" || parsed.tier === "Match" || parsed.tier === "Safety"
      ? parsed.tier
      : TIER_FROM_PERCENT(percent);

  const factors = Array.isArray(parsed.factors)
    ? parsed.factors.filter((f) => typeof f === "string").slice(0, 3)
    : [];

  return { percent, tier, factors };
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const { profile } = (await request.json()) as { profile: Profile };

    if (!profile || !Array.isArray(profile.schoolSlugs) || profile.schoolSlugs.length === 0) {
      return NextResponse.json(
        { error: "At least one school is required" },
        { status: 400 },
      );
    }
    if (profile.schoolSlugs.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 schools per calculation" },
        { status: 400 },
      );
    }

    const targetSchools = profile.schoolSlugs
      .map((slug) => ALL_SCHOOLS.find((s) => s.slug === slug))
      .filter((s): s is NonNullable<typeof s> => !!s);

    if (targetSchools.length === 0) {
      return NextResponse.json(
        { error: "No valid schools found" },
        { status: 400 },
      );
    }

    const scored: SchoolOdds[] = await Promise.all(
      targetSchools.map(async (school) => {
        const descriptor = `${school.name} (${school.shortName}) - ${school.type}, ${school.category}, located in ${school.location}. Known for: ${school.knownFor}.`;
        const r = await scoreOneSchool(profile, descriptor);
        return {
          slug: school.slug,
          name: school.name,
          percent: r.percent,
          tier: r.tier,
          factors: r.factors,
        };
      }),
    );

    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: inserted, error: insertErr } = await adminClient()
      .from("odds_calculations")
      .insert({
        profile,
        result: { schools: scored },
        user_id: session?.user.id ?? null,
      })
      .select("id, created_at")
      .single();

    if (insertErr || !inserted) {
      console.error("Failed to insert odds_calculation", insertErr);
      return NextResponse.json(
        { error: "Failed to save calculation" },
        { status: 500 },
      );
    }

    // LOCKED client payload. The real `percent` and the full per-factor
    // breakdown are the paid product — they are persisted to the database
    // above and revealed only post-payment on /odds/result. We must NOT send
    // the true percentage to the pre-payment client, or the paywall's blurred
    // number could be read straight out of the network response / DOM. The
    // paywall shows the honest tier + a single teaser factor; the exact % is
    // unlocked after checkout.
    const lockedSchools: SchoolOdds[] = scored.map((s) => ({
      slug: s.slug,
      name: s.name,
      tier: s.tier,
      factors: s.factors.slice(0, 1),
    }));

    const result: OddsResult = {
      calculationId: inserted.id,
      generatedAt: inserted.created_at,
      schools: lockedSchools,
    };

    return NextResponse.json({ result });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Calculation failed";
    console.error("calculate-odds error:", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
