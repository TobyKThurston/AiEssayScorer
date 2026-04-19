"use client";

import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  const handleUpgrade = async () => {
    setCheckoutError(null);
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        setCheckoutError(data.error);
      }
    } catch {
      setCheckoutError("Failed to start checkout. Please try again.");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#6366F1]" />
              </div>
              <span className="font-semibold text-slate-900">Ivy Admit</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link href="/editor" className="text-sm text-slate-600 hover:text-slate-900">
                        My Essays
                      </Link>
                      <Button variant="outline" size="sm" onClick={handleUpgrade}>
                        Upgrade to Pro
                      </Button>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-slate-600 hover:text-slate-900"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/auth/login" className="text-sm text-slate-600 hover:text-slate-900">
                      Login
                    </Link>
                  )}
                </>
              )}
              <Button size="sm" asChild>
                <Link href="/ivy-league-essay-examples">View other essays</Link>
              </Button>
            </div>

            <button
              className="lg:hidden p-2 text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 pt-2 border-t border-slate-200">
              <div className="flex flex-col gap-1">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <Link
                          href="/editor"
                          className="text-slate-700 hover:text-slate-900 py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          My Essays
                        </Link>
                        <Button variant="outline" onClick={handleUpgrade} className="w-full mt-2">
                          Upgrade to Pro
                        </Button>
                        <button
                          onClick={handleLogout}
                          className="text-slate-700 hover:text-slate-900 py-2 text-left"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/auth/login"
                        className="text-slate-700 hover:text-slate-900 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    )}
                  </>
                )}
                <Button asChild className="w-full mt-2">
                  <Link href="/ivy-league-essay-examples" onClick={() => setIsMobileMenuOpen(false)}>
                    View other essays
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
      {checkoutError && (
        <div className="fixed top-16 left-0 right-0 z-40 flex justify-center px-4 pt-2 pointer-events-none">
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg shadow-sm pointer-events-auto">
            {checkoutError}
            <button onClick={() => setCheckoutError(null)} className="ml-3 font-semibold hover:text-red-900">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
