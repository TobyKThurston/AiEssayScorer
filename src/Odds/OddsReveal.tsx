"use client";

import { useEffect, useState } from "react";
import { PaperCard } from "@/design/PaperCard";
import { useCountUp } from "@/design/useCountUp";
import type { SchoolOdds } from "./types";

/**
 * Post-payment payoff. The blurred curiosity-gap numbers from the paywall now
 * dissolve to sharp and count up to the real percentage — the moment the user
 * paid for. Reserved strictly for /odds/result (the value is unlocked here, not
 * on the paywall).
 */
export function OddsReveal({ schools }: { schools: SchoolOdds[] }) {
  return (
    <div className="space-y-4">
      {schools.map((s, i) => (
        <RevealCard key={s.slug} odds={s} index={i} />
      ))}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Browser-only media query read on mount; cannot use a lazy initializer
    // because matchMedia is unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduce(m.matches);
    const handler = () => setReduce(m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);
  return reduce;
}

function RevealCard({ odds, index }: { odds: SchoolOdds; index: number }) {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 120 + index * 110);
    return () => clearTimeout(t);
  }, [index]);

  const target = odds.percent ?? 0;
  const counted = useCountUp(target, active && !reduce, 900);
  const value = reduce ? target : counted;
  const revealed = reduce || active;

  return (
    <div
      className="reveal-card"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <PaperCard>
        <div className="flex items-baseline justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-pencil">
              {odds.tier}
            </div>
            <h3 className="text-ink text-[18px] sm:text-[22px] font-serif mt-1 break-words">
              {odds.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <div
              className={`reveal-num text-[34px] sm:text-[44px] font-serif text-oxblood leading-none tabular-nums ${
                revealed ? "is-revealed" : ""
              }`}
            >
              {value}%
            </div>
            <div className="text-[10.5px] sm:text-[11px] text-pencil mt-1">admit chance</div>
          </div>
        </div>
        {odds.factors.length > 0 ? (
          <ul className="mt-4 pt-4 border-t border-hair space-y-1.5 text-[13px] sm:text-[14px] text-ink-2">
            {odds.factors.map((f, idx) => (
              <li key={idx}>· {f}</li>
            ))}
          </ul>
        ) : null}
      </PaperCard>

      <style jsx>{`
        .reveal-card {
          opacity: 0;
          transform: translateY(8px);
          animation: reveal-in 0.5s cubic-bezier(0.2, 0, 0, 1) forwards;
          will-change: transform, opacity;
        }
        @keyframes reveal-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .reveal-num {
          filter: blur(8px);
          transition: filter 800ms cubic-bezier(0.2, 0, 0, 1);
        }
        .reveal-num.is-revealed {
          filter: blur(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-card {
            opacity: 1;
            transform: none;
            animation: none;
          }
          .reveal-num,
          .reveal-num.is-revealed {
            filter: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
