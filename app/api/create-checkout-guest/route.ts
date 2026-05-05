import { NextResponse } from "next/server";
import Stripe from "stripe";
import { adminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 },
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-10-29.clover",
    });

    const { email, calculationId, priceId } = (await request.json()) as {
      email?: string;
      calculationId?: string;
      priceId?: string;
    };

    const finalPriceId = priceId || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
    if (!finalPriceId) {
      return NextResponse.json(
        { error: "Price ID is missing. Set NEXT_PUBLIC_STRIPE_PRICE_ID." },
        { status: 400 },
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (calculationId) {
      const supabase = adminClient();
      const { data: row } = await supabase
        .from("odds_calculations")
        .select("id")
        .eq("id", calculationId)
        .maybeSingle();
      if (!row) {
        return NextResponse.json(
          { error: "Calculation not found" },
          { status: 404 },
        );
      }
      await supabase
        .from("odds_calculations")
        .update({ email })
        .eq("id", calculationId);
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const successUrl = calculationId
      ? `${siteUrl}/odds/result?id=${calculationId}&session_id={CHECKOUT_SESSION_ID}`
      : `${siteUrl}/auth/login?checkout=success&session_id={CHECKOUT_SESSION_ID}`;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: finalPriceId, quantity: 1 }],
      customer_email: email,
      success_url: successUrl,
      cancel_url: `${siteUrl}/odds?canceled=1`,
      metadata: {
        email,
        calculationId: calculationId ?? "",
        flow: "guest",
      },
      subscription_data: {
        metadata: {
          email,
          calculationId: calculationId ?? "",
          flow: "guest",
        },
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Checkout failed";
    console.error("create-checkout-guest error:", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
