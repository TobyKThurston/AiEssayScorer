import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebaseAdmin';
import { clerkClient as rawClerkClient } from '@clerk/nextjs/server';

// -------- Stripe setup --------
// (Omit apiVersion to use whatever your SDK ships with)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// If you prefer to pin it, use the newest literal the types allow:
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-05-28.basil' });

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Clerk may be typed as a function in older SDKs → coerce to any to access .users
const clerkClient: any = rawClerkClient;

/* ── Next.js-specific config ── */
export const runtime  = 'nodejs';
export const dynamic  = 'force-dynamic';

/* ── Handler ── */
export async function POST(req: NextRequest) {
  const sig      = req.headers.get('stripe-signature')!;
  const rawBody  = Buffer.from(await req.arrayBuffer()).toString('utf8');

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Bad signature', err);
    return new NextResponse('Signature error', { status: 400 });
  }

  // Helper that writes Firestore + (optionally) Clerk
  const setPremium = async (
    userId: string,
    active: boolean,
    sub?: Stripe.Subscription,   // <-- DeletedSubscription removed
  ) => {
    const periodEnd = (sub as any)?.current_period_end as number | undefined; // ← cast fixes TS error

    await db.doc(`users/${userId}`).set(
      {
        premium: active,
        stripeCustomerId: (sub as any)?.customer ?? null,
        stripeSubscriptionId: sub?.id ?? null,
        currentPeriodEnd: periodEnd ? periodEnd * 1000 : null,
      },
      { merge: true },
    );

    // Clerk mirror (safe to ignore if you don't rely on it)
    try {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { premium: active },
      });
    } catch (e) {
      console.warn('Clerk mirror failed — continuing', e);
    }
  };

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId  = session.metadata?.userId as string;
      if (!userId) break;

      const sub = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );
      await setPremium(userId, true, sub);
      break;
    }

    case 'customer.subscription.deleted':
    case 'invoice.payment_failed': {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId as string;
      if (!userId) break;
      await setPremium(userId, false, sub);
      break;
    }

    default:
      // ignore others
      break;
  }

  return NextResponse.json({ received: true });
}

