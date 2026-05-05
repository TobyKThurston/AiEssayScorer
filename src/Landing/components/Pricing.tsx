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
          title={<>One simple plan. Unlocks <em className="italic text-oxblood">everything</em>.</>}
          intro="Free tools to learn. $7 a month to see your real admit chance and unlock an essay reviewer tuned to every school on your list."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="paper-card p-8 md:p-10 flex flex-col">
            <h3 className="font-serif text-[26px] text-ink">Free</h3>
            <p className="mt-1 text-[14.5px] text-ink-2">Try the essay grader, no signup.</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-[64px] leading-none text-ink">Free</span>
            </div>

            <ul className="mt-6 space-y-3 text-[14.5px] text-ink-2">
              {[
                "1 essay graded per day",
                "Rubric score + first-impression",
                "Top 3 improvements",
                "Access to all 150+ free tools",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 border-b border-hair pb-3 last:border-b-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-oxblood mt-2" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/essay-grader" className="btn btn-ghost mt-7 justify-center">
              Grade my essay
            </Link>
          </div>

          <div className="relative rounded-[10px] p-8 md:p-10 flex flex-col bg-ink text-paper shadow-[0_30px_60px_-30px_rgba(60,30,10,0.45)]">
            <span className="absolute -top-3 left-6 bg-oxblood text-paper font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-[4px]">
              Most Popular
            </span>

            <h3 className="font-serif text-[26px] text-paper">Pro</h3>
            <p className="mt-1 text-[14.5px] text-paper-3">Everything you need to get in.</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-[64px] leading-none text-paper">
                <em className="italic text-gold">$</em>7
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-3">
                / month
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-[14.5px] text-paper-3">
              {[
                "Per-school admit % + tier (Reach/Match/Safety)",
                "Multi-school odds in one calculation",
                "Essay reviewer tuned to each school you applied to",
                "Unlimited essay grading + line edits",
                "Full editor with version history",
                "Every premium tool unlocked",
                "Cancel anytime",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 pb-3 last:border-b-0"
                  style={{ borderBottom: "1px solid rgba(245,240,230,0.12)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-oxblood mt-2" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/odds" className="btn btn-brand mt-7 justify-center">
              Calculate my odds
            </Link>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-3">
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
