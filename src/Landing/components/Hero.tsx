import Link from "next/link";
import { Container } from "@/design/Container";

export function Hero() {
  return (
    <section className="relative pt-20 md:pt-28 pb-24 md:pb-32 border-b border-hair overflow-hidden">
      <Container>
        <div className="relative max-w-[920px] mx-auto text-center">
          {/* eyebrow — symmetric rule with oxblood mark */}
          <p
            className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-pencil flex items-center justify-center gap-3 hero-fade"
            style={{ animationDelay: "0ms" }}
          >
            <span aria-hidden className="inline-block flex-1 max-w-[80px] h-px bg-hair" />
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full bg-oxblood"
            />
            The Admit Forecast · No. 001
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full bg-oxblood"
            />
            <span aria-hidden className="inline-block flex-1 max-w-[80px] h-px bg-hair" />
          </p>

          {/* headline — Fraunces, centered, oversized */}
          <h1
            className="mt-10 md:mt-14 font-serif text-[64px] md:text-[112px] lg:text-[136px] leading-[0.92] tracking-[-0.03em] text-ink hero-fade"
            style={{ animationDelay: "120ms" }}
          >
            Get your odds
            <br />
            for{" "}
            <em className="italic text-oxblood relative inline-block pencil-write">
              <span className="pencil-write__text" aria-hidden>any school</span>
              <span className="sr-only">any school</span>
              <svg
                aria-hidden
                className="absolute left-0 -bottom-3 md:-bottom-4 w-full text-oxblood/65 pencil-underline"
                height="9"
                viewBox="0 0 100 9"
                preserveAspectRatio="none"
              >
                <path
                  d="M 1 5 Q 18 1 37 4 T 73 4 T 99 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  pathLength={1}
                />
              </svg>
            </em>
          </h1>

          {/* sub-line */}
          <p
            className="mt-10 md:mt-12 text-[17px] md:text-[19px] leading-[1.45] text-ink-2 max-w-[42ch] mx-auto hero-fade"
            style={{ animationDelay: "240ms" }}
          >
            A 60-second prediction, trained on real outcomes.
          </p>

          {/* CTA row — centered */}
          <div
            className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 hero-fade"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              href="/odds"
              className="group inline-flex items-center justify-center gap-3 bg-ink text-paper text-[16px] md:text-[17px] font-medium tracking-[-0.005em] px-8 py-4 md:px-10 md:py-5 rounded-full transition-[background-color,transform,box-shadow] duration-300 ease-out hover:bg-oxblood hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.45)] hover:shadow-[0_1px_0_0_rgba(124,28,28,0.2),0_18px_36px_-14px_rgba(124,28,28,0.55)]"
            >
              Calculate my odds
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/essay-grader"
              className="inline-flex items-center min-h-10 px-2 text-[14px] text-ink-2 hover:text-oxblood underline-offset-[6px] decoration-pencil/30 hover:decoration-oxblood/50 underline transition-[color,text-decoration-color] duration-200 whitespace-nowrap"
            >
              or grade an essay
            </Link>
          </div>

          {/* trust line — symmetric rules */}
          <div
            className="mt-14 md:mt-20 flex items-center justify-center gap-4 hero-fade"
            style={{ animationDelay: "480ms" }}
          >
            <span aria-hidden className="h-px flex-1 max-w-[120px] bg-hair" />
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-pencil whitespace-nowrap">
              90 seconds · No essay needed · Cancel anytime
            </p>
            <span aria-hidden className="h-px flex-1 max-w-[120px] bg-hair" />
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes heroFade {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-fade {
          opacity: 0;
          animation: heroFade 700ms cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }

        /* Pencil-writing reveal — text emerges left-to-right as if hand-written */
        .pencil-write__text {
          display: inline-block;
          padding-right: 0.08em; /* room for italic overshoot on trailing letter */
          clip-path: inset(0 100% -0.15em 0);
          animation: pencilWrite 1400ms cubic-bezier(0.45, 0.05, 0.4, 1) 700ms forwards;
          /* graphite-pencil tip: subtle texture + slight smudge on the leading edge */
          filter: url(#pencil-grain);
          will-change: clip-path;
        }
        @keyframes pencilWrite {
          0% {
            clip-path: inset(0 100% -0.15em 0);
          }
          100% {
            clip-path: inset(0 -0.2em -0.15em 0);
          }
        }

        .pencil-underline path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: pencilDraw 700ms cubic-bezier(0.4, 0, 0.2, 1) 2000ms forwards;
        }
        @keyframes pencilDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade {
            opacity: 1;
            animation: none;
            transform: none;
          }
          .pencil-write__text {
            clip-path: none;
            animation: none;
          }
          .pencil-underline path {
            stroke-dashoffset: 0;
            animation: none;
          }
        }
      `}</style>

      {/* SVG filter — adds pencil-graphite grain to the writing */}
      <svg aria-hidden width="0" height="0" className="absolute" style={{ position: "absolute" }}>
        <filter id="pencil-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="0.6" />
        </filter>
      </svg>
    </section>
  );
}
