import Link from "next/link";
import { Container } from "@/design/Container";
import { SectionHead } from "@/design/SectionHead";

const FEATURES = [
  "Your exact admit % and Reach/Match/Safety tier for every school on your list",
  "A per-factor breakdown — what's helping, what's quietly hurting, what to fix first",
  "Re-run as your list and stats change, as often as you want",
  "Plus unlimited essay grading, line-by-line edits, and every admissions tool we ship",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-28 border-t border-hair">
      <Container>
        <SectionHead
          num="§06"
          eyebrow="Pricing"
          title={<>Stop guessing your odds. <em className="italic text-oxblood">See the real number.</em></>}
          intro="Generate your forecast free. Unlock the exact admit % for every school — and what to fix before you apply — for less than two coffees a month."
        />

        <figure className="mx-auto mt-8 sm:mt-10 max-w-[60ch] text-center">
          <blockquote className="font-serif italic text-[18px] md:text-[20px] leading-[1.5] text-ink">
            &ldquo;I assumed Cornell was a coin-flip for me. It wasn&rsquo;t — and seeing the real
            number changed which schools I actually applied to.&rdquo;
          </blockquote>
          <figcaption className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-pencil">
            — Senior, class of 2025
          </figcaption>
        </figure>

        <div className="mt-10 sm:mt-12 mx-auto max-w-[560px]">
          <div
            className="relative rounded-[10px] p-6 sm:p-8 md:p-10 flex flex-col bg-ink text-paper"
            style={{
              boxShadow:
                "0 0 0 1px rgba(196,154,72,0.35), 0 40px 80px -30px rgba(60,30,10,0.55), 0 18px 36px -18px rgba(60,30,10,0.45), 0 0 60px -20px rgba(196,154,72,0.25)",
            }}
          >
            <span className="absolute -top-3 left-4 sm:left-6 bg-oxblood text-paper font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] px-2.5 sm:px-3 py-1.5 rounded-[4px]">
              Most applicants choose Pro
            </span>

            <h3 className="font-serif text-[24px] sm:text-[26px] text-paper">Ivy Admit Pro</h3>
            <p className="mt-1 text-[14.5px] text-paper-3">
              The whole picture — your odds, your factors, every tool.
            </p>

            <div className="mt-5 sm:mt-6 flex items-baseline gap-2">
              <span className="font-serif text-[48px] sm:text-[64px] leading-none text-paper tabular-nums">
                <em className="italic text-gold">$</em>7
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-3">
                / month
              </span>
            </div>
            <p className="mt-2 inline-flex items-center gap-2 text-[13px] text-gold">
              <span className="w-1 h-1 rounded-full bg-gold" />
              A private counselor charges $150–300/hour. This is $7/mo.
            </p>

            <ul className="mt-6 space-y-3 text-[14.5px] text-paper-3">
              {FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 pb-3 last:border-b-0"
                  style={{ borderBottom: "1px solid rgba(245,240,230,0.12)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/odds" className="btn btn-brand mt-7 justify-center">
              Reveal your odds →
            </Link>
            <p className="mt-3 text-center text-[12.5px] text-gold/90">
              30-day money-back guarantee · Cancel anytime
            </p>
            <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-paper-3">
              Free to start · No signup to see your forecast
            </p>
          </div>

          <p className="mt-6 text-center text-[13px] text-ink-2">
            Just want a quick essay score?{" "}
            <Link
              href="/essay-grader"
              className="text-oxblood hover:text-oxblood-2 underline underline-offset-4"
            >
              Try the free grader →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
