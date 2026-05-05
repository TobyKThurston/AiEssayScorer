"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Brand";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Odds Calculator", href: "/odds" },
  { label: "Essay Grader", href: "/essay-grader" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
  };

  const handleUpgrade = async () => {
    setCheckoutError(null);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else if (data.error) setCheckoutError(data.error);
    } catch {
      setCheckoutError("Failed to start checkout. Please try again.");
    }
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b border-hair"
        style={{
          background: "rgba(245,240,230,0.86)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-[66px]">
            <Link href="/" className="flex items-center">
              <Wordmark />
            </Link>

            <div className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[14px] text-ink-2 hover:text-oxblood transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {!loading && user ? (
                <>
                  <Link href="/editor" className="text-[14px] text-ink-2 hover:text-oxblood transition-colors">
                    My Essays
                  </Link>
                  <button onClick={handleUpgrade} className="btn btn-sm btn-ghost">
                    Upgrade to Pro
                  </button>
                  <button onClick={handleLogout} className="text-[14px] text-ink-2 hover:text-oxblood transition-colors">
                    Sign out
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="text-[14px] text-ink-2 hover:text-oxblood transition-colors">
                  Sign in
                </Link>
              )}
              <Link href="/odds" className="btn btn-sm btn-ink">
                Calculate my odds
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-ink"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {open ? (
            <div className="lg:hidden pb-4 pt-2 border-t border-hair">
              <div className="flex flex-col gap-1 py-2">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="py-2 text-[15px] text-ink-2 hover:text-oxblood"
                  >
                    {l.label}
                  </Link>
                ))}
                {!loading && user ? (
                  <>
                    <Link
                      href="/editor"
                      onClick={() => setOpen(false)}
                      className="py-2 text-[15px] text-ink-2 hover:text-oxblood"
                    >
                      My Essays
                    </Link>
                    <button
                      onClick={handleUpgrade}
                      className="py-2 text-left text-[15px] text-ink-2 hover:text-oxblood"
                    >
                      Upgrade to Pro
                    </button>
                    <button
                      onClick={handleLogout}
                      className="py-2 text-left text-[15px] text-ink-2 hover:text-oxblood"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="py-2 text-[15px] text-ink-2 hover:text-oxblood"
                  >
                    Sign in
                  </Link>
                )}
                <Link
                  href="/odds"
                  onClick={() => setOpen(false)}
                  className="btn btn-ink mt-3 w-full justify-center"
                >
                  Calculate my odds
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </nav>

      {checkoutError ? (
        <div className="fixed top-[72px] left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
          <div className="bg-[#FAEEEA] border border-[#E8C9C2] text-oxblood text-sm px-4 py-2 rounded-[4px] pointer-events-auto">
            {checkoutError}
            <button
              onClick={() => setCheckoutError(null)}
              className="ml-3 font-semibold hover:text-oxblood-2"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
