// src/app/api/score/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import sanitize from 'sanitize-html';
import { db } from '@/lib/firebaseAdmin';
import { openai } from '@/lib/openai';
import { ratelimit } from '@/lib/ratelimit';

/* NEW → prompt templates */
import { premiumPrompt } from '@/lib/prompts/premiumPrompt';
import { freePrompt }    from '@/lib/prompts/freePrompt';

// ─── helpers ───────────────────────────────────────────────────────────────────
const EssaySchema = z.object({
  school:   z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  prompt:   z.string().max(500).optional(),
  essay:    z.string().min(50, 'Essay too short').max(6500, 'Essay too long'),
  extra:    z.string().max(500).optional(),
});

const strip = (s?: string) =>
  s ? sanitize(s, { allowedTags: [], allowedAttributes: {} }).trim() : undefined;

const today = () => new Date().toISOString().slice(0, 10);
// ───────────────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  /* 1 ── Auth */
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  /* 1.5 ── Burst-limit (30 req/min) */
  const key = userId ?? req.headers.get('x-real-ip') ?? 'anon';
  const { success } = await ratelimit.limit(key);
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests — please wait a minute' },
      { status: 429 }
    );
  }

  /* 2 ── Validate & sanitise body */
  let body;
  try {
    body = EssaySchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json({ error: err.errors ?? 'Bad request' }, { status: 400 });
  }

  const essay = strip(body.essay)!; // required
  const context = {
    school:   strip(body.school),
    location: strip(body.location),
    prompt:   strip(body.prompt),
    extra:    strip(body.extra),
  } as const;

  /* 3 ── Credits & premium flag */
  const userSnap  = await db.collection('users').doc(userId).get();
  const isPremium = userSnap.exists && userSnap.data()?.premium === true; // ← unified key
  const limit     = isPremium ? 50 : 2;

  const keyDay    = `${userId}_${today()}`;
  const countRef  = db.collection('dailyCounts').doc(keyDay);
  const countSnap = await countRef.get();
  const usedToday = countSnap.exists ? (countSnap.data()!.count as number) : 0;

  if (usedToday >= limit) {
    return NextResponse.json({ error: 'Daily limit reached', limit }, { status: 403 });
  }

  /* 4 ── Choose prompt & inject variables */
  const template = isPremium ? premiumPrompt : freePrompt;
  const prompt   = template
    .replace('${essay}', essay)
    .replace(/\${context\.school}/g,   context.school   ?? '')
    .replace(/\${context\.location}/g, context.location ?? '')
    .replace(/\${context\.prompt}/g,   context.prompt   ?? '')
    .replace(/\${context\.extra}/g,    context.extra    ?? '');

  /* 5 ── Call OpenAI (JSON mode) */
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are “IvyAdmit AI,” a veteran U.S. admissions reader and writing coach.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
    });

    const parsed = JSON.parse(completion.choices[0].message.content!);

    /* 6 ── Persist usage only on success */
    await countRef.set({ count: usedToday + 1 }, { merge: true });

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('OpenAI error', err);
    return NextResponse.json({ error: 'AI failure' }, { status: 502 });
  }
}








