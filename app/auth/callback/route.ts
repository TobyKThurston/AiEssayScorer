import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/editor";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.session) {
      const userId = data.session.user.id;
      const userEmail = data.session.user.email;

      const { data: existingUser, error: checkError } = await supabase
        .from("user_tokens")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (!existingUser && !checkError) {
        const { error: insertError } = await supabase.from("user_tokens").insert({
          user_id: userId,
          tokens: 1,
        });
        if (insertError) console.error("Error initializing user tokens:", insertError);
      }

      if (userEmail) {
        await claimPendingSubscriptions(userId, userEmail);
        await claimPendingCalculations(userId, userEmail);
      }

      const redirectUrl = new URL(next, siteUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }

  const errorUrl = new URL("/auth/login", siteUrl);
  errorUrl.searchParams.set("error", "Could not authenticate");
  return NextResponse.redirect(errorUrl);
}

async function claimPendingSubscriptions(userId: string, email: string) {
  try {
    const admin = adminClient();
    const { data: pending } = await admin
      .from("pending_subscriptions")
      .select("*")
      .eq("email", email)
      .is("claimed_at", null);

    if (!pending || pending.length === 0) return;

    for (const row of pending) {
      await admin
        .from("user_subscriptions")
        .upsert(
          {
            user_id: userId,
            stripe_subscription_id: row.stripe_subscription_id,
            stripe_customer_id: row.stripe_customer_id,
            status: row.status,
            price_id: row.price_id,
            current_period_start: row.current_period_start,
            current_period_end: row.current_period_end,
          },
          { onConflict: "stripe_subscription_id" },
        );
      await admin
        .from("pending_subscriptions")
        .update({ claimed_at: new Date().toISOString() })
        .eq("id", row.id);
    }
  } catch (err) {
    console.error("claimPendingSubscriptions failed:", err);
  }
}

async function claimPendingCalculations(userId: string, email: string) {
  try {
    const admin = adminClient();
    await admin
      .from("odds_calculations")
      .update({ user_id: userId })
      .eq("email", email)
      .is("user_id", null);
  } catch (err) {
    console.error("claimPendingCalculations failed:", err);
  }
}
