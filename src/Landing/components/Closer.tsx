import Link from "next/link";
import { Container } from "@/design/Container";

export function Closer() {
  return (
    <section className="bg-ink text-paper border-t border-b border-hair">
      <Container>
        <div className="pt-28 md:pt-36 pb-20 md:pb-24 text-center relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper-3">
            <span className="text-oxblood mr-2">§07</span>The Forecast
          </p>
          <h2 className="mt-7 font-serif text-[56px] md:text-[88px] lg:text-[112px] leading-[0.92] tracking-[-0.03em] text-paper max-w-[14ch] mx-auto">
            Stop <em className="italic text-gold">guessing</em>.
          </h2>
          <p className="mt-7 font-serif text-[19px] md:text-[21px] leading-[1.4] text-paper-3 max-w-[34ch] mx-auto">
            One short form. One honest number. For every school on your list.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/odds"
              className="btn btn-brand text-[18px] md:text-[19px] font-semibold px-10 py-5 md:px-12 md:py-6 shadow-[0_14px_40px_-10px_rgba(124,28,28,0.7)] hover:-translate-y-0.5 [transition-property:transform,background-color,color,border-color,box-shadow] [transition-duration:200ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]"
            >
              Calculate my odds →
            </Link>
          </div>
          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-3">
            $7 / month · Cancel anytime · Includes the per-school essay reviewer
          </p>
        </div>
      </Container>
    </section>
  );
}
