"use client";

import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { user, loading, signOut } = useAuth();

  const navLinks = ["Features", "How it works", "Pricing", "FAQ"];

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/60">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm flex items-center justify-center">
                <Leaf className="w-4.5 h-4.5 text-[#6366F1]" />
              </div>
              <span className="font-semibold text-[#0F172A]">Ivy Admit</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`/#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
                >
                  {link}
                </a>
              ))}
              <Link href="/blog" className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors">
                Blog
              </Link>
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link href="/editor" className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors">
                        My Essays
                      </Link>
                      <button
                        onClick={handleUpgrade}
                        className="text-sm px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 text-[#0F172A] hover:bg-white/60 transition-all"
                      >
                        Upgrade to Pro
                      </button>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/auth/login" className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors">
                      Login
                    </Link>
                  )}
                </>
              )}
              <Link
                href="/editor"
                className="text-sm px-4 py-2 rounded-full bg-[#0A0A0F] text-white hover:bg-[#1a1a2e] transition-all font-medium"
              >
                Review your essay
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#0F172A]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/40">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`/#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-[#475569] hover:text-[#0F172A] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
                <Link
                  href="/blog"
                  className="text-[#475569] hover:text-[#0F172A] transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <Link
                          href="/editor"
                          className="text-[#475569] hover:text-[#0F172A] transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          My Essays
                        </Link>
                        <button
                          onClick={handleUpgrade}
                          className="px-4 py-2 rounded-full bg-white/40 border border-white/60 text-[#0F172A] hover:bg-white/60 transition-all w-full text-center"
                        >
                          Upgrade to Pro
                        </button>
                        <button
                          onClick={handleLogout}
                          className="text-[#475569] hover:text-[#0F172A] transition-colors py-2 text-left"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/auth/login"
                        className="text-[#475569] hover:text-[#0F172A] transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    )}
                  </>
                )}
                <Link
                  href="/editor"
                  className="mt-2 px-4 py-2.5 rounded-full bg-[#0A0A0F] text-white hover:bg-[#1a1a2e] transition-all font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Review your essay
                </Link>
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
