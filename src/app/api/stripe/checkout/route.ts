// src/app/api/stripe/checkout/route.ts
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Pin the exact API version that appears in your Stripe dashboard
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // update if Stripe shows a newer version in *Developers ▸ API version*
  apiVersion: "2025-05-28.basil" as Stripe.LatestApiVersion,
});

export async function POST(req: NextRequest) {
  /* ── 1)   Auth guard ─────────────────────────────────────────────────── */
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  /* ── 2)   Build absolute success / cancel URLs ───────────────────────── */
  const rawBase = (process.env.NEXT_PUBLIC_APP_URL ?? "").trim(); // strip \n/space

  if (!rawBase) {
    return NextResponse.json(
      { error: "server-misconfiguration", detail: "NEXT_PUBLIC_APP_URL missing" },
      { status: 500 },
    );
  }

  let base: string;
  try {
    // throws if protocol/host are missing or malformed
    base = new URL(rawBase).toString();
  } catch {
    return NextResponse.json(
      {
        error: "server-misconfiguration",
        detail: "NEXT_PUBLIC_APP_URL is not a valid https URL",
      },
      { status: 500 },
    );
  }

  const successUrl = `${base}?checkout=success`;
  const cancelUrl  = `${base}?checkout=cancel`;

  // 🔍 Leave this in while debugging, then delete.
  console.log("[stripe-debug]", JSON.stringify({ successUrl, cancelUrl }));

  /* ── 3)   Create the Checkout Session ───────────────────────────────── */
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!, // one subscription plan
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url:  cancelUrl,
      metadata:    { userId },
    });

    /* ── 4)   Return the URL to the client ─────────────────────────────── */
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("[stripe-error]", err);          // will show the Stripe error object
    return NextResponse.json({ error: "stripe-error" }, { status: 500 });
  }
}




