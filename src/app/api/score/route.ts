// src/app/api/score/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import sanitize from 'sanitize-html';
import { db } from '../../../lib/firebaseAdmin';
import { openai } from '../../../lib/openai';
import { ratelimit } from '../../../lib/ratelimit';

// ─── helpers ───────────────────────────────────────────────────────────────────
const EssaySchema = z.object({
  school:   z.string().max(100).optional(),
  location: z.string().max(100).optional(),   // applicant location
  prompt:   z.string().max(500).optional(),
  essay:    z.string().min(50, 'Essay too short').max(6500, 'Essay too long'),
  extra:    z.string().max(500).optional(),
});

const strip = (s?: string) =>
  s ? sanitize(s, { allowedTags: [], allowedAttributes: {} }).trim() : undefined;

const today = () => new Date().toISOString().slice(0, 10);
// ───────────────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  /* 1 ─── Auth */
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  /* 1.5 ─── Burst‑limit (30 req/min) */
  const key = userId ?? req.headers.get('x-real-ip') ?? 'anon';
  const { success } = await ratelimit.limit(key);
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests — please wait a minute' },
      { status: 429 }
    );
  }

  /* 2 ─── Validate & sanitise body */
  let body;
  try {
    body = EssaySchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json({ error: err.errors ?? 'Bad request' }, { status: 400 });
  }

  const essay = strip(body.essay)!; // required, so non‑null
  const context = {
    school:   strip(body.school),          // target school name
    location: strip(body.location),        // applicant location (may double as school loc)
    prompt:   strip(body.prompt),          // essay prompt text
    extra:    strip(body.extra),
  } as const;

  /* 3 ─── Credits */
  const userSnap  = await db.collection('users').doc(userId).get();
  const isPremium = userSnap.exists && userSnap.data()!.isPremium === true;
  const limit     = isPremium ? 50 : 2;

  const keyDay    = `${userId}_${today()}`;
  const countRef  = db.collection('dailyCounts').doc(keyDay);
  const countSnap = await countRef.get();
  const usedToday = countSnap.exists ? (countSnap.data()!.count as number) : 0;

  if (usedToday >= limit) {
    return NextResponse.json({ error: 'Daily limit reached', limit }, { status: 403 });
  }

  /* 4 ─── Call OpenAI (JSON mode) */
  const prompt = `\n### INPUT\nEssay:               """${essay}"""\nTargetSchool:        ${context.school || 'Unknown'}\nSchoolLocation:      ${context.location || 'Unknown'}\nApplicantLocation:   ${context.location || 'Unknown'}\nEssayPrompt:         ${context.prompt || 'None provided'}\nExtraContext:        ${context.extra || '—'}\n\n### TASK\nReturn pure JSON only—no Markdown, headings, or extra keys. If anything besides valid JSON appears, the response is invalid.\n\nSchema (double quotes, no trailing commas):\n{\n  "clarity": <integer 1-10>,\n  "structure": <integer 1-10>,\n  "grammar": <integer 1-10>,\n  "creativity": <integer 1-10>,\n  "tone": <integer 1-10>,\n  "feedback": "<≤150 words, second-person>",\n  "suggestions": [\n    "<≥40-word bullet 1>",\n    "<≥40-word bullet 2>",\n    "... 4–6 total bullets ..."\n  ]\n}\n\n### SCORING GUIDELINES\n• 10 = publish‑ready; 1 = severely lacking – use the full scale, avoid 7‑9 clumping.\n\n### CONTENT GUIDELINES\nfeedback (≤150 words):\n – Hook / first‑impression clarity\n – Voice authenticity comment\n – Biggest strength (1 sentence)\n – Biggest opportunity (1 sentence)\n – Supportive yet candid tone\n\nsuggestions (4–6 bullets, ≥40 words each; escape inner quotes):\n1. Content & School Fit — concretely link experiences to ${context.school || 'the target school'} and resources in ${context.location || 'its location'}.\n2. Personal Narrative Deep‑dive — propose vivid anecdotes rooted in the applicant's background.\n3. Voice & Confidence — flag hedge words / passive voice; offer stronger rewrites.\n4. Grammar & Style — quote exact sentences needing fixes; supply corrected versions.\n5. Admissions‑Officer Lens (<50 words) — advocate, wait‑list, or deny with reason.\n6. Ethical Flags (<30 words) — “None” or note plagiarism/exaggeration.\n\nDo not repeat points between feedback and suggestions. Encourage but never invent facts.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are “IvyAdmit AI,” a veteran U.S. admissions reader and writing coach.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 800,
    });

    const parsed = JSON.parse(completion.choices[0].message.content!);

    /* 5 ─── Persist usage only on success */
    await countRef.set({ count: usedToday + 1 }, { merge: true });

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('OpenAI error', err);
    return NextResponse.json({ error: 'AI failure' }, { status: 502 });
  }
}







