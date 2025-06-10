// src/app/api/stripe/checkout/route.ts
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // no apiVersion

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}?checkout=success`,
    cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}?checkout=cancel`,
    metadata: { userId },
  });

  return NextResponse.json({ url: session.url });
}


