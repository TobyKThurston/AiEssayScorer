"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Wordmark } from "@/design/Brand";
import { EssayList } from "./components/EssayList";

export default function EditorApp() {
  const { signOut } = useAuth();
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    fetch("/api/subscription-status")
      .then((r) => r.json())
      .then((d) => setIsPro(d.isActive === true))
      .catch(() => {});
  }, []);

  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // silent fail
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <nav
        className="sticky top-0 z-50 border-b border-hair"
        style={{
          background: "rgba(245,240,230,0.86)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-[66px] gap-4">
            <Link href="/" className="flex items-center">
              <Wordmark />
            </Link>
            <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
              <span className="text-oxblood">◦</span>
              <span>My Essays</span>
            </div>
            <div className="flex items-center gap-3">
              {!isPro ? (
                <button onClick={handleUpgrade} className="btn btn-sm btn-brand">
                  Upgrade to Pro
                </button>
              ) : (
                <span className="hidden sm:inline font-mono text-[10.5px] uppercase tracking-[0.16em] text-forest">
                  ◦ Pro
                </span>
              )}
              <button
                onClick={() => signOut()}
                className="text-[14px] text-ink-2 hover:text-oxblood transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <EssayList />
    </div>
  );
}
