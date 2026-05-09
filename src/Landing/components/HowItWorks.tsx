import Link from "next/link";
import { Container } from "@/design/Container";

const STEPS = [
  {
    num: "01",
    title: "Tell us about you.",
    body: "SAT, GPA, where you're from, your top activities. 90 seconds.",
  },
  {
    num: "02",
    title: "Pick your schools.",
    body: "Up to ten. We score your odds at each, individually.",
  },
  {
    num: "03",
    title: "See your number.",
    body: "An honest admit %, a Reach/Match/Safety tier, and why.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-16 sm:py-24 md:py-32 border-t border-hair">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16 items-start">
          <div>
            <p className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-oxblood mb-3 sm:mb-4">
              §02 · The Process
            </p>
            <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[52px] leading-[0.98] tracking-[-0.02em] text-ink">
              Three steps.
              <br />
              <em className="italic text-oxblood">One number.</em>
            </h2>
            <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-[1.55] text-ink-2 max-w-[36ch]">
              No essay required to start. The number you see is the one we'd give a counselor.
            </p>
            <Link
              href="/odds"
              className="inline-flex items-center gap-1 mt-5 sm:mt-6 text-[14px] text-oxblood hover:text-oxblood-2 underline-offset-4 hover:underline font-medium"
            >
              Begin →
            </Link>
          </div>

          <ol className="space-y-0 border-t border-hair">
            {STEPS.map((s) => (
              <li key={s.num} className="grid grid-cols-[auto_1fr] gap-5 sm:gap-6 md:gap-10 py-5 sm:py-7 border-b border-hair">
                <span className="font-serif italic text-[36px] sm:text-[44px] md:text-[52px] leading-none text-oxblood/80">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-serif text-[19px] sm:text-[22px] md:text-[24px] leading-[1.15] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-[14px] sm:text-[14.5px] text-ink-2 leading-[1.55] max-w-[44ch]">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
