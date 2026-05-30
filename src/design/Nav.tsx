"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Wordmark } from "./Brand";
import { useAuth } from "@/contexts/AuthContext";

// Primary action is the odds calculator. Everything else stays crawlable (SEO)
// but is demoted into a quiet "More" group so the top bar funnels attention.
const PRIMARY = { label: "Odds Calculator", href: "/odds" };
const MORE_LINKS: { label: string; href: string }[] = [
  { label: "Essay Grader", href: "/essay-grader" },
  { label: "Tools", href: "/tools" },
  { label: "Colleges", href: "/colleges" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/#pricing" },
];
const ALL_LINKS = [PRIMARY, ...MORE_LINKS];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
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
              <Link
                href={PRIMARY.href}
                className="text-[14px] font-medium text-ink hover:text-oxblood transition-colors"
              >
                {PRIMARY.label}
              </Link>

              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className="flex items-center gap-1 text-[14px] text-ink-2 hover:text-oxblood transition-colors"
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  More
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {moreOpen ? (
                  <div className="more-pop absolute left-0 top-full mt-2 min-w-[180px] bg-cream border border-hair rounded-[8px] shadow-[0_18px_40px_-18px_rgba(60,30,10,0.45)] py-1.5 z-50 origin-top-left">
                    {MORE_LINKS.map((l) => (
                      <Link
                        key={l.label}
                        href={l.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-2 text-[14px] text-ink-2 hover:text-oxblood hover:bg-paper-2/50 transition-colors"
                      >
                        {l.label}
                      </Link>
                    ))}
                    <style jsx>{`
                      .more-pop {
                        animation: more-pop 0.16s cubic-bezier(0.2, 0.6, 0.2, 1);
                      }
                      @keyframes more-pop {
                        from {
                          opacity: 0;
                          transform: translateY(-4px) scale(0.98);
                        }
                        to {
                          opacity: 1;
                          transform: translateY(0) scale(1);
                        }
                      }
                      @media (prefers-reduced-motion: reduce) {
                        .more-pop {
                          animation: none;
                        }
                      }
                    `}</style>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {!loading && user ? (
                <>
                  <Link href="/editor" className="text-[14px] text-ink-2 hover:text-oxblood transition-colors">
                    My Essays
                  </Link>
                  <button onClick={handleLogout} className="text-[14px] text-ink-2 hover:text-oxblood transition-colors">
                    Sign out
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="text-[14px] text-ink-2 hover:text-oxblood transition-colors">
                  Sign in
                </Link>
              )}
              <Link href="/odds" className="btn btn-sm btn-ink font-semibold">
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
            <div className="lg:hidden pb-4 pt-2 border-t border-hair max-h-[calc(100vh-66px)] overflow-y-auto">
              <div className="flex flex-col gap-1 py-2">
                {ALL_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="py-2.5 px-1 text-[15px] text-ink-2 hover:text-oxblood active:bg-paper-2/60 rounded"
                  >
                    {l.label}
                  </Link>
                ))}
                {!loading && user ? (
                  <>
                    <Link
                      href="/editor"
                      onClick={() => setOpen(false)}
                      className="py-2.5 px-1 text-[15px] text-ink-2 hover:text-oxblood active:bg-paper-2/60 rounded"
                    >
                      My Essays
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-2.5 px-1 text-left text-[15px] text-ink-2 hover:text-oxblood active:bg-paper-2/60 rounded"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="py-2.5 px-1 text-[15px] text-ink-2 hover:text-oxblood active:bg-paper-2/60 rounded"
                  >
                    Sign in
                  </Link>
                )}
                <Link
                  href="/odds"
                  onClick={() => setOpen(false)}
                  className="btn btn-ink font-semibold justify-center mt-3"
                >
                  Calculate my odds →
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
}
