"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Wordmark } from "@/design/Brand";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const next = searchParams.get("next") || searchParams.get("redirect") || "/editor";
        router.push(next);
      }
    });
  }, [router, searchParams, supabase]);

  const handleGoogleSignIn = async () => {
    setError(null);
    if (!supabase) {
      setError("Authentication is not configured. Please try again later.");
      return;
    }
    setLoading(true);

    try {
      // Use environment variable for production, fallback to window.location.origin for development
      let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      
      // Ensure siteUrl is a full URL with protocol (handle cases where env var might be missing protocol)
      if (!siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
        siteUrl = `https://${siteUrl}`;
      }
      
      // Ensure we have the full callback URL
      const fullCallbackUrl = `${siteUrl}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: fullCallbackUrl,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 sm:px-6 py-12 sm:py-16">
      <div className="max-w-[440px] w-full">
        <Link href="/" className="inline-flex items-center justify-center w-full mb-8 sm:mb-10">
          <Wordmark />
        </Link>

        <div className="text-center mb-8 sm:mb-10">
          <p className="eyebrow justify-center inline-flex mb-3 sm:mb-4">
            <span className="num">§</span> Sign in
          </p>
          <h1 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] leading-[1.05] tracking-[-0.02em] text-ink mb-3">
            Welcome <em className="italic text-oxblood">back</em>.
          </h1>
          <p className="text-[14px] sm:text-[15px] text-ink-2 leading-relaxed max-w-[36ch] mx-auto">
            Continue with your Google account to pick up where your drafts left off.
          </p>
        </div>

        {error ? (
          <div className="mb-5 px-4 py-3 border border-oxblood/30 bg-oxblood/5 text-[13px] text-oxblood">
            {error}
          </div>
        ) : null}

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-[2px] border border-hair bg-cream text-ink hover:border-ink hover:bg-white transition-all duration-200 font-medium text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-oxblood"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Signing in…</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <p className="mt-8 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-pencil">
          <Link href="/" className="hover:text-oxblood transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-oxblood border-t-transparent" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
