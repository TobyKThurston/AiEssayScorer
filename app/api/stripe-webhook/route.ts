import { NextResponse } from "next/server";
import Stripe from "stripe";
import { adminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 500 },
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-10-29.clover",
  });

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: `Webhook signature error: ${msg}` }, { status: 400 });
  }

  const supabase = adminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const sessionObj = event.data.object as Stripe.Checkout.Session;
        const email = sessionObj.customer_email || sessionObj.metadata?.email;
        const calculationId = sessionObj.metadata?.calculationId || null;
        const subscriptionId =
          typeof sessionObj.subscription === "string" ? sessionObj.subscription : sessionObj.subscription?.id;
        const customerId =
          typeof sessionObj.customer === "string" ? sessionObj.customer : sessionObj.customer?.id;
        const userIdMeta = sessionObj.metadata?.userId || null;

        if (calculationId) {
          await supabase
            .from("odds_calculations")
            .update({
              paid_session_id: sessionObj.id,
              stripe_customer_id: customerId ?? null,
              email: email ?? null,
            })
            .eq("id", calculationId);
        }

        if (subscriptionId && email) {
          if (userIdMeta) {
            await supabase
              .from("user_subscriptions")
              .upsert(
                {
                  user_id: userIdMeta,
                  stripe_subscription_id: subscriptionId,
                  stripe_customer_id: customerId ?? null,
                  status: "active",
                  price_id: sessionObj.metadata?.priceId ?? null,
                },
                { onConflict: "stripe_subscription_id" },
              );
          } else {
            await supabase
              .from("pending_subscriptions")
              .upsert(
                {
                  email,
                  stripe_customer_id: customerId ?? null,
                  stripe_subscription_id: subscriptionId,
                  status: "active",
                  calculation_id: calculationId,
                },
                { onConflict: "stripe_subscription_id" },
              );
          }
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const subAny = sub as unknown as {
          current_period_start?: number;
          current_period_end?: number;
        };
        const update = {
          status: sub.status,
          current_period_start: subAny.current_period_start
            ? new Date(subAny.current_period_start * 1000).toISOString()
            : null,
          current_period_end: subAny.current_period_end
            ? new Date(subAny.current_period_end * 1000).toISOString()
            : null,
          updated_at: new Date().toISOString(),
        };

        await supabase
          .from("user_subscriptions")
          .update(update)
          .eq("stripe_subscription_id", sub.id);
        await supabase
          .from("pending_subscriptions")
          .update(update)
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("stripe-webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
