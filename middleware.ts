// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow home page and auth routes without authentication
  if (pathname === "/" || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // Check authentication for all other routes
  const { supabase, response } = await createClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Redirect to login with return URL
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
