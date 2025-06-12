// src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebaseAdmin';
import { clerkClient as rawClerkClient } from '@clerk/nextjs/server';

/* ────────── Stripe setup ──────────
   Let the SDK use whatever apiVersion it ships with;
   avoids “Type … is not assignable” errors. */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/* ────────── Clerk (optional mirror) ────────── */
const clerkClient: any = rawClerkClient; // older SDK typings workaround

/* ────────── Next.js route config ────────── */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ────────── Helper: write premium flag ───── */
async function setPremium(
  uid: string,
  active: boolean,
  sub?: Stripe.Subscription | null
) {
  /* current_period_end & customer are hidden in beta typings → cast to any */
  const periodEnd = (sub as any)?.current_period_end
    ? (sub as any).current_period_end * 1000
    : null;

  await db.doc(`users/${uid}`).set(
    {
      premium: active,                              // ← single source of truth
      stripeCustomerId: (sub as any)?.customer ?? null,
      stripeSubscriptionId: sub?.id ?? null,
      currentPeriodEnd: periodEnd,
    },
    { merge: true }
  );

  /* Mirror into Clerk (safe to ignore errors) */
  try {
    await clerkClient.users.updateUser(uid, {
      publicMetadata: { premium: active },
    });
  } catch (err) {
    console.warn('Clerk mirror failed — continuing', err);
  }
}

/* ────────── Webhook handler ────────── */
export async function POST(req: NextRequest) {
  /* 1 ── verify Stripe signature */
  const sig = req.headers.get('stripe-signature')!;
  const rawBody = Buffer.from(await req.arrayBuffer()).toString('utf8');

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Bad signature', err);
    return new NextResponse('Signature error', { status: 400 });
  }

  /* 2 ── handle the events we care about */
  switch (event.type) {
    /* ——— subscription became active via Checkout ——— */
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const uid = session.metadata?.userId as string | undefined;
      if (!uid) break;

      const sub = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      await setPremium(uid, true, sub);
      break;
    }

    /* ——— subscription cancelled or payment failed ——— */
    case 'customer.subscription.deleted':
    case 'invoice.payment_failed': {
      const sub = event.data.object as Stripe.Subscription;
      const uid = sub.metadata?.userId as string | undefined;
      if (!uid) break;

      await setPremium(uid, false, sub);
      break;
    }

    default:
      // ignore all other event types
      break;
  }

  return NextResponse.json({ received: true });
}



