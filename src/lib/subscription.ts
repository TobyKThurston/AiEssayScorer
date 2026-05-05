import { createClient } from "@/lib/supabase/server";

export interface SubscriptionState {
  userId: string | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
}

export async function getSubscriptionState(): Promise<SubscriptionState> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { userId: null, isAuthenticated: false, isSubscribed: false };
  }

  const { data } = await supabase
    .from("user_subscriptions")
    .select("status")
    .eq("user_id", session.user.id)
    .eq("status", "active")
    .maybeSingle();

  return {
    userId: session.user.id,
    isAuthenticated: true,
    isSubscribed: !!data,
  };
}

export async function requireSubscription() {
  const state = await getSubscriptionState();
  if (!state.isAuthenticated) {
    return { ok: false as const, reason: "unauthenticated" as const, state };
  }
  if (!state.isSubscribed) {
    return { ok: false as const, reason: "not_subscribed" as const, state };
  }
  return { ok: true as const, state };
}
