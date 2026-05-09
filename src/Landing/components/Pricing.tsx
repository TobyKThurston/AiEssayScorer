import Link from "next/link";
import { Container } from "@/design/Container";
import { SectionHead } from "@/design/SectionHead";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-28 border-t border-hair">
      <Container>
        <SectionHead
          num="§06"
          eyebrow="Pricing"
          title={<>Stop guessing if your essay is <em className="italic text-oxblood">actually</em> competitive.</>}
          intro="Most students score between 60–80 on their first draft. Find out where yours stands — and exactly what's keeping it from a 90+."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-ink-2">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-pencil">
            <span className="text-oxblood">●</span> Trusted by applicants
          </span>
          <span className="hidden md:inline text-hair">/</span>
          <span>Hundreds of essays reviewed</span>
          <span className="hidden md:inline text-hair">/</span>
          <span>Used by students applying to Ivy+ schools</span>
        </div>

        <figure className="mx-auto mt-6 max-w-[60ch] text-center">
          <blockquote className="font-serif italic text-[18px] md:text-[20px] leading-[1.5] text-ink">
            &ldquo;I thought my essay was amazing. It scored a 71.&rdquo;
          </blockquote>
          <figcaption className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-pencil">
            — Senior, applied to Cornell
          </figcaption>
        </figure>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">
          <div className="paper-card p-8 md:p-10 flex flex-col">
            <h3 className="font-serif text-[26px] text-ink">Free</h3>
            <p className="mt-1 text-[14.5px] text-ink-2">Get your real essay score.</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-[64px] leading-none text-ink">Free</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
                / $0
              </span>
            </div>
            <p className="mt-2 text-[13px] text-pencil italic">
              See how admissions officers would actually react.
            </p>

            <ul className="mt-6 space-y-3 text-[14.5px] text-ink-2">
              {[
                "1 essay review per day",
                "Realistic score out of 100",
                "First-impression analysis",
                "Biggest red flags hurting your essay",
                "Top 3 improvements to raise your score",
                "Compare against accepted-level essays",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 border-b border-hair pb-3 last:border-b-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-oxblood mt-2" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/essay-grader" className="btn btn-ghost mt-7 justify-center">
              Score my essay
            </Link>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-pencil">
              No signup required
            </p>
          </div>

          <div
            className="relative rounded-[10px] p-8 md:p-12 flex flex-col bg-ink text-paper md:-my-2 md:scale-[1.015] origin-center"
            style={{
              boxShadow:
                "0 0 0 1px rgba(196,154,72,0.35), 0 40px 80px -30px rgba(60,30,10,0.55), 0 18px 36px -18px rgba(60,30,10,0.45), 0 0 60px -20px rgba(196,154,72,0.25)",
            }}
          >
            <span className="absolute -top-3 left-6 bg-oxblood text-paper font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-[4px]">
              Most students choose Pro
            </span>

            <h3 className="font-serif text-[26px] text-paper">Pro</h3>
            <p className="mt-1 text-[14.5px] text-paper-3">Everything you need to maximize your chances.</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-[64px] leading-none text-paper tabular-nums">
                <em className="italic text-gold">$</em>7
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-3">
                / month
              </span>
            </div>
            <p className="mt-2 inline-flex items-center gap-2 text-[13px] text-gold">
              <span className="w-1 h-1 rounded-full bg-gold" />
              Average score improvement: <span className="font-mono tabular-nums">+11 points</span>
            </p>

            <ul className="mt-6 space-y-3 text-[14.5px] text-paper-3">
              {[
                "Unlimited essay reviews",
                "Line-by-line edits on every essay",
                "School-specific feedback",
                "Reach / Match / Safety analysis",
                "Multi-school admissions odds calculator",
                "Rewrite suggestions for weak sections",
                "Track improvements across drafts",
                "Access to every premium admissions tool",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 pb-3 last:border-b-0"
                  style={{ borderBottom: "1px solid rgba(245,240,230,0.12)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/odds" className="btn btn-brand mt-7 justify-center">
              Unlock full review
            </Link>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-paper-3">
              Cancel anytime · 30-day money-back guarantee
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
