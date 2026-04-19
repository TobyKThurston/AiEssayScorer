import { createClient } from "@/lib/supabase/server";
import { createHash } from "crypto";
import { NextResponse } from "next/server";

export const TOOL_LIMITS = {
  freePerToolPerDay: 1,
  proPerToolPerDay: 200,
} as const;

function hashIp(ip: string): string {
  return createHash("sha256")
    .update(ip + (process.env.RATE_LIMIT_SALT ?? "ivyadmit-tools"))
    .digest("hex")
    .slice(0, 32);
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

export type ToolGateResult =
  | { ok: true; isPro: boolean }
  | { ok: false; paywall: boolean; isPro: boolean; remaining: 0 };

export async function checkToolGate(
  request: Request,
  toolSlug: string
): Promise<ToolGateResult> {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let isPro = false;
  if (session) {
    const { data: sub } = await supabase
      .from("user_subscriptions")
      .select("status")
      .eq("user_id", session.user.id)
      .eq("status", "active")
      .maybeSingle();
    isPro = !!sub;
  }

  const ip = getClientIp(request.headers);
  const ipHash = hashIp(ip);
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count } = await supabase
    .from("tool_usage")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .eq("tool_slug", toolSlug)
    .gte("created_at", dayAgo);

  const used = count ?? 0;
  const cap = isPro ? TOOL_LIMITS.proPerToolPerDay : TOOL_LIMITS.freePerToolPerDay;

  if (used >= cap) {
    return { ok: false, paywall: !isPro, isPro, remaining: 0 };
  }

  await supabase.from("tool_usage").insert({ ip_hash: ipHash, tool_slug: toolSlug });
  return { ok: true, isPro };
}

export function paywallResponse(result: Extract<ToolGateResult, { ok: false }>) {
  if (result.paywall) {
    return NextResponse.json(
      {
        error:
          "You've used your free run of this tool. Upgrade to Pro for unlimited access, full essay scoring, and line-by-line feedback.",
        paywall: true,
        upgradeUrl: "/editor",
      },
      { status: 402 }
    );
  }
  return NextResponse.json(
    {
      error: "Daily limit reached. Try again tomorrow.",
      paywall: false,
    },
    { status: 429 }
  );
}
