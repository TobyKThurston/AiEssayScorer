import { Container } from "@/design/Container";

const AVATARS = [
  { bg: "var(--color-oxblood)", initials: "SK" },
  { bg: "var(--color-forest)", initials: "MJ" },
  { bg: "var(--color-gold)", initials: "AL" },
  { bg: "var(--color-ink)", initials: "DP" },
  { bg: "var(--color-oxblood-2)", initials: "JR" },
];

const STATS = [
  { value: "60+", label: "Top schools you can model" },
  { value: "< 60s", label: "To your first forecast" },
  { value: "Per-school", label: "Reach / Match / Safety" },
];

export function ProofStrip() {
  return (
    <section className="bg-paper-2 border-b border-hair">
      <Container>
        <div className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-5 sm:gap-6 md:gap-10 items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex">
              {AVATARS.map((a, i) => (
                <span
                  key={i}
                  className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-full border-2 border-paper-2 flex items-center justify-center font-serif text-[12px] sm:text-[13px] text-paper"
                  style={{
                    background: a.bg,
                    marginLeft: i === 0 ? 0 : -8,
                    zIndex: AVATARS.length - i,
                  }}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-gold text-sm leading-none">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-pencil">
                Built by people who got in
              </p>
            </div>
          </div>

          <hr className="hidden md:block rule" />

          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-[16px] sm:text-[20px] md:text-[22px] text-ink leading-none">
                  {s.value}
                </p>
                <p className="mt-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-pencil">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
