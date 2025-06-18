/* app/api/check-subscription/route.ts */
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  /* Await the promise so we get the real object, not a Promise<…> */
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const snap = await db.doc(`users/${userId}`).get();

  if (!snap.exists || !snap.data()?.premium) {
    // treat as free plan → 404 so the frontend shows “Free plan” silently
    return NextResponse.json({ error: 'No active subscription' }, { status: 404 });
  }

  const data = snap.data() as {
    planName?: string;
    renewDateISO?: string;
    price?: string;
  };

  return NextResponse.json({
    planName:     data.planName     ?? 'Premium Monthly',
    renewDateISO: data.renewDateISO ?? '',
    price:        data.price        ?? '$5 / mo',
    isActive:     true,
  });
}


