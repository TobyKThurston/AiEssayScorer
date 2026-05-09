import { Container } from "@/design/Container";

const STATS = [
  { value: "20,417", suffix: ".", label: "Essays reviewed since 2023" },
  { value: "+18", suffix: " pts", label: "Average draft score lift" },
  { value: "< 60", suffix: "s", label: "Median time to first score" },
];

export function Stats() {
  return (
    <section className="border-t border-b border-ink">
      <Container>
        <div className="py-12 sm:py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="md:border-l md:first:border-l-0 md:border-hair md:pl-8 first:md:pl-0">
              <p className="font-serif text-[44px] sm:text-[56px] md:text-[80px] lg:text-[88px] leading-[0.95] tracking-[-0.02em] text-ink">
                {s.value}
                <em className="italic text-oxblood">{s.suffix}</em>
              </p>
              <p className="mt-2 sm:mt-3 font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.16em] text-pencil max-w-[28ch]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
