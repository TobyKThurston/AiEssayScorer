"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, signOut } = useAuth();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Close the mobile menu if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={false}
        animate={{
          paddingTop: scrolled ? 12 : 0,
          paddingLeft: scrolled ? 12 : 0,
          paddingRight: scrolled ? 12 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
      >
        <motion.nav
          className="relative pointer-events-auto w-full"
          initial={false}
          animate={{
            maxWidth: scrolled ? 980 : 1280,
            borderRadius: scrolled ? 20 : 0,
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.72)"
              : "rgba(255,255,255,0.55)",
            boxShadow: scrolled
              ? "0 10px 40px -12px rgba(30, 41, 89, 0.18), 0 2px 8px -2px rgba(30, 41, 89, 0.08), inset 0 1px 0 rgba(255,255,255,0.75)"
              : "0 1px 0 rgba(255,255,255,0.6)",
          }}
          style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            initial={false}
            animate={{
              borderColor: scrolled
                ? "rgba(255,255,255,0.85)"
                : "rgba(255,255,255,0.6)",
            }}
            style={{ border: "1px solid" }}
            transition={{ duration: 0.25 }}
          />
          {/* Top highlight shimmer */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12">
          <motion.div
            className="flex items-center justify-between"
            initial={false}
            animate={{ height: scrolled ? 56 : 72 }}
            transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <motion.div
                className="rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow"
                initial={false}
                animate={{
                  width: scrolled ? 32 : 36,
                  height: scrolled ? 32 : 36,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                <Leaf className="w-4 h-4 text-[#6366F1]" />
              </motion.div>
              <span className="font-semibold text-[#0F172A] tracking-tight">Ivy Admit</span>
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
              {user && !loading ? (
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
              ) : !user && !loading ? (
                <Link href="/auth/login" className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors">
                  Login
                </Link>
              ) : (
                <Link href="/auth/login" className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors">
                  Login
                </Link>
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
          </motion.div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 pt-2 border-t border-white/40">
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
                {user && !loading ? (
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
        </motion.nav>
      </motion.div>
      {checkoutError && (
        <div className="fixed top-20 left-0 right-0 z-40 flex justify-center px-4 pt-2 pointer-events-none">
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg shadow-sm pointer-events-auto">
            {checkoutError}
            <button onClick={() => setCheckoutError(null)} className="ml-3 font-semibold hover:text-red-900">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
