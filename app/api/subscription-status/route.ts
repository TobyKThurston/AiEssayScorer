import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ isSubscribed: false });
    }

    // Check if user has an active subscription
    // For now, we'll check a subscriptions table or user metadata
    // You'll need to create this table or use Stripe webhooks to sync subscription status
    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("status, stripe_subscription_id")
      .eq("user_id", session.user.id)
      .eq("status", "active")
      .single();

    return NextResponse.json({
      isSubscribed: !!subscription,
      subscriptionId: subscription?.stripe_subscription_id || null,
    });
  } catch (error: any) {
    console.error("Error checking subscription status:", error);
    return NextResponse.json({ isSubscribed: false });
  }
}

