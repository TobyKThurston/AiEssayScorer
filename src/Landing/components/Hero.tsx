"use client";

import Link from "next/link";
import { Container } from "@/design/Container";

const SCHOOL_RATES: { name: string; rate: string }[] = [
  { name: "Harvard", rate: "3.6%" },
  { name: "Stanford", rate: "3.7%" },
  { name: "MIT", rate: "4.5%" },
  { name: "Princeton", rate: "4.6%" },
  { name: "Yale", rate: "4.6%" },
  { name: "Columbia", rate: "3.9%" },
];

export function Hero() {
  return (
    <section className="relative pt-10 md:pt-14 pb-20 md:pb-28 border-b border-hair overflow-hidden">
      {/* faint grain layer for editorial paper feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, #1a1a1a 99%, transparent 100%), radial-gradient(1px 1px at 70% 80%, #1a1a1a 99%, transparent 100%), radial-gradient(1px 1px at 40% 70%, #1a1a1a 99%, transparent 100%)",
          backgroundSize: "120px 120px, 80px 80px, 100px 100px",
        }}
      />

      <Container>
        <div className="relative flex items-center justify-between gap-4 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
          <span>Vol. IV · The Admit Forecast · 2026</span>
          <span className="hidden md:inline">No. 001 · Front Page</span>
        </div>
        <hr className="rule" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 pt-12 md:pt-20 items-start">
          {/* LEFT: editorial splash */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood mb-6">
              The Question Every Applicant Asks
            </p>
            <h1 className="font-serif text-[52px] md:text-[78px] lg:text-[92px] leading-[0.92] tracking-[-0.025em] text-ink">
              What are{" "}
              <em className="italic text-oxblood">my</em>
              <br />
              real chances?
            </h1>

            <p className="mt-8 text-[17px] md:text-[19px] leading-[1.5] text-ink-2 max-w-[44ch]">
              Get an honest admit % for every school on your list - in under a minute.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
              <Link
                href="/odds"
                className="btn btn-brand group w-full sm:w-auto justify-center text-[18px] md:text-[19px] font-semibold px-9 py-5 md:px-11 md:py-6 shadow-[0_8px_24px_-8px_rgba(124,28,28,0.45)] hover:shadow-[0_14px_36px_-10px_rgba(124,28,28,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Calculate my odds
                <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/essay-grader"
                className="text-[14px] text-ink-2 hover:text-oxblood underline-offset-4 hover:underline whitespace-nowrap"
              >
                or grade my essay - free
              </Link>
            </div>

            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
              Takes ≈ 90 seconds · No essay needed · Cancel anytime
            </p>
          </div>

          {/* RIGHT: editorial sidebar - admit rates table */}
          <aside className="lg:pt-2">
            <div className="border-l-2 border-oxblood pl-6 md:pl-8 mb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-oxblood mb-2">
                The Sidebar
              </p>
              <p className="font-serif text-[19px] leading-[1.35] text-ink">
                Last cycle, the most selective US universities admitted under <em className="italic text-oxblood">5%</em>.
              </p>
              <p className="mt-2 text-[13.5px] text-ink-2 leading-[1.5]">
                Yours could be <em className="italic">half</em> that. Or <em className="italic">six times</em> it. Worth knowing.
              </p>
            </div>

            <div className="paper-card p-6">
              <div className="flex items-center justify-between pb-3 border-b border-hair">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-pencil">
                  Class of 2028 · Admit Rate
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-pencil">
                  Reported
                </span>
              </div>
              <ul>
                {SCHOOL_RATES.map((s, i) => (
                  <li
                    key={s.name}
                    className={`flex items-baseline justify-between py-2.5 ${
                      i === SCHOOL_RATES.length - 1 ? "" : "border-b border-hair"
                    }`}
                  >
                    <span className="font-serif text-[16px] text-ink">{s.name}</span>
                    <span className="font-serif text-[20px] text-oxblood tabular-nums">
                      {s.rate}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 pt-3 border-t border-hair font-mono text-[10px] uppercase tracking-[0.18em] text-pencil text-center">
                Where do <span className="text-oxblood">you</span> stand?
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
