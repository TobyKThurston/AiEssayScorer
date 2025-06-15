import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth, clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);   // ← 1) drop apiVersion

export async function POST() {
  /* 2) auth() is async in this Clerk version */
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  /* 3) clerkClient is a function → call it, then use .users */
  const clerk = await clerkClient();
  const user   = await clerk.users.getUser(userId);

  const customerId =
    user.privateMetadata.stripeCustomerId as string | undefined;
  if (!customerId) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 400 });
  }

  /* 4) create the one-time Customer-Portal session */
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}?portal=done`,
  });

  return NextResponse.json({ url: session.url });
}

