// src/lib/supabase/middleware.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars are missing, just continue without Supabase
  if (!url || !anonKey) {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get: (name) => request.cookies.get(name)?.value,
      set: (name, value, options) => {
        response.cookies.set(name, value, options as CookieOptions);
      },
      remove: (name, options) => {
        response.cookies.set(name, "", {
          ...options,
          maxAge: 0,
        } as CookieOptions);
      },
    },
  });

  // Touch auth to keep session fresh (optional)
  await supabase.auth.getSession();

  return response;
}
