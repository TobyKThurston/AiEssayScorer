import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  // Use environment variable for production, fallback to request origin
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.session) {
      // Initialize user tokens if this is their first login
      const userId = data.session.user.id;
      const { data: existingUser } = await supabase
        .from("user_tokens")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (!existingUser) {
        // Give new user 1 free token
        await supabase.from("user_tokens").insert({
          user_id: userId,
          tokens: 1,
        });
      }

      const redirectUrl = new URL(next, siteUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Return the user to an error page with instructions
  const errorUrl = new URL("/auth/login", siteUrl);
  errorUrl.searchParams.set("error", "Could not authenticate");
  return NextResponse.redirect(errorUrl);
}

