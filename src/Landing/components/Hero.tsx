"use client";

import Link from "next/link";
import { Container } from "@/design/Container";

const SCHOOL_RATES: { name: string; rate: string; oneIn: number }[] = [
  { name: "Harvard", rate: "3.6%", oneIn: 28 },
  { name: "Stanford", rate: "3.7%", oneIn: 27 },
  { name: "Columbia", rate: "3.9%", oneIn: 26 },
  { name: "MIT", rate: "4.5%", oneIn: 22 },
  { name: "Princeton", rate: "4.6%", oneIn: 22 },
  { name: "Yale", rate: "4.6%", oneIn: 22 },
];

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-3 h-3 border-oxblood";
  const map = {
    tl: "top-2 left-2 border-l border-t",
    tr: "top-2 right-2 border-r border-t",
    bl: "bottom-2 left-2 border-l border-b",
    br: "bottom-2 right-2 border-r border-b",
  };
  return <span aria-hidden className={`${base} ${map[position]}`} />;
}

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
        {/* Masthead row */}
        <div className="relative flex items-center justify-between gap-4 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
          <span>Vol. IV · The Admit Forecast · 2026</span>
          <span className="hidden md:inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-oxblood" />
            Updated for the 2025–26 cycle
          </span>
          <span className="hidden md:inline">No. 001 · Front Page</span>
        </div>
        <hr className="rule" />
        {/* Ornamental sub-rule */}
        <div className="relative flex items-center pt-2.5">
          <div className="flex-1 border-t border-hair" />
          <span className="px-3 font-mono text-[10px] tracking-[0.3em] text-oxblood/70">
            ◆ ◆ ◆
          </span>
          <div className="flex-1 border-t border-hair" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 pt-12 md:pt-16 items-start">
          {/* LEFT: editorial splash */}
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-oxblood" aria-hidden />
              The Question Every Applicant Asks
            </p>
            <h1 className="font-serif text-[52px] md:text-[78px] lg:text-[92px] leading-[0.92] tracking-[-0.025em] text-ink">
              What are{" "}
              <em className="italic text-oxblood relative inline-block">
                my
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full text-oxblood/70"
                  height="7"
                  viewBox="0 0 100 7"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 1 4 Q 25 1 50 4 T 99 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </em>
              <br />
              real chances?
            </h1>

            <p className="mt-8 text-[17px] md:text-[19px] leading-[1.5] text-ink-2 max-w-[44ch]">
              Get an honest admit % for every school on your list — in under a minute.
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
                or grade my essay — free
              </Link>
            </div>

            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
              Takes ≈ 90 seconds · No essay needed · Cancel anytime
            </p>
          </div>

          {/* RIGHT: editorial sidebar - "By The Numbers" infobox */}
          <aside className="lg:pt-2 space-y-7">
            <div className="border-l-2 border-oxblood pl-6 md:pl-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-oxblood mb-2">
                The Sidebar
              </p>
              <p className="font-serif text-[19px] leading-[1.35] text-ink">
                Last cycle, the most selective US universities admitted under{" "}
                <em className="italic text-oxblood">5%</em>.
              </p>
              <p className="mt-2 text-[13.5px] text-ink-2 leading-[1.5]">
                Yours could be <em className="italic">half</em> that. Or{" "}
                <em className="italic">six times</em> it. Worth knowing.
              </p>
            </div>

            <div className="paper-card relative p-7 md:p-8">
              <CornerBracket position="tl" />
              <CornerBracket position="tr" />
              <CornerBracket position="bl" />
              <CornerBracket position="br" />

              {/* Header */}
              <div className="flex items-center justify-center gap-3 pb-1">
                <span className="h-px w-6 bg-pencil/40" />
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-pencil">
                  By the Numbers
                </p>
                <span className="h-px w-6 bg-pencil/40" />
              </div>

              {/* Hero stat */}
              <div className="text-center pt-3 pb-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-pencil">
                  About one in
                </p>
                <p className="font-serif text-oxblood leading-none tracking-[-0.05em] text-[112px] md:text-[136px] mt-1">
                  28
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-pencil mt-1">
                  Applicants admitted to Harvard
                </p>
              </div>

              {/* School list with dotted leaders */}
              <div className="mt-5 pt-5 border-t border-hair">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-pencil mb-3 flex items-center justify-between">
                  <span>Class of 2028</span>
                  <span>Reported · 1 in N</span>
                </p>
                <ul className="space-y-2">
                  {SCHOOL_RATES.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-baseline gap-2 group"
                    >
                      <span className="font-serif text-[15px] text-ink whitespace-nowrap">
                        {s.name}
                      </span>
                      <span
                        aria-hidden
                        className="flex-1 mx-1 mb-[3px] border-b border-dotted border-pencil/45 group-hover:border-oxblood/60 transition-colors"
                      />
                      <span className="font-serif text-[15px] text-oxblood tabular-nums whitespace-nowrap">
                        {s.rate}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pencil whitespace-nowrap tabular-nums w-[58px] text-right">
                        1 / {s.oneIn}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 pt-4 border-t border-hair font-mono text-[10px] uppercase tracking-[0.22em] text-pencil text-center">
                Where do <span className="text-oxblood">you</span> stand?
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
