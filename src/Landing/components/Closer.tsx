import Link from "next/link";
import { Container } from "@/design/Container";

export function Closer() {
  return (
    <section className="bg-paper-2 border-t border-b border-hair">
      <Container>
        <div className="py-24 md:py-32 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
            <span className="text-oxblood mr-2.5">§09</span>Close the gap
          </p>
          <h2 className="mt-6 font-serif text-[48px] md:text-[80px] lg:text-[96px] leading-[0.98] tracking-[-0.025em] text-ink max-w-[20ch] mx-auto">
            Admit smarter. <em className="italic text-oxblood">Your</em> essay, louder.
          </h2>
          <p className="mt-7 text-[16.5px] md:text-[18px] leading-[1.55] text-ink-2 max-w-[56ch] mx-auto">
            Score your first draft in under 60 seconds, free. See exactly what a selective-admissions
            reader will notice — before they do.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/try" className="btn btn-lg btn-brand">
              Score my essay — free
            </Link>
            <Link href="/tools" className="btn btn-lg btn-ghost">
              Browse tools
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
