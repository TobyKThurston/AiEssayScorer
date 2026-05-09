import { Container } from "@/design/Container";
import { SectionHead } from "@/design/SectionHead";

const ROWS: { capability: string; generic: string; ivy: string }[] = [
  {
    capability: "Trained on",
    generic: "Generic prose corpora",
    ivy: "Thousands of accepted applications",
  },
  {
    capability: "Scoring rubric",
    generic: "Grammar-first",
    ivy: "Content, structure, voice, school fit",
  },
  {
    capability: "Line edits",
    generic: "Blanket rewrites",
    ivy: "Specific, rationale-attached, optional",
  },
  {
    capability: "Regional tailoring",
    generic: "-",
    ivy: "Per-reader-pool adjustments",
  },
  {
    capability: "Voice preservation",
    generic: "Rewrites in AI voice",
    ivy: "Flags AI voice, keeps yours",
  },
  {
    capability: "Risk flags",
    generic: "-",
    ivy: "Topic, tone, AI-detection, blend risk",
  },
];

export function Compare() {
  return (
    <section className="py-24 md:py-28 border-t border-hair">
      <Container>
        <SectionHead
          num="§05"
          eyebrow="Side by side"
          title={<>What a <em className="italic text-oxblood">specialist</em> tool catches that generic AI misses.</>}
          intro="Every item below is something we've seen general-purpose AI fail on when grading college essays."
        />

        <div className="mt-10 sm:mt-12 paper-card overflow-hidden">
          {/* Header row — hidden on mobile, shown sm+ */}
          <div className="hidden sm:grid grid-cols-3 bg-paper-2 border-b border-hair">
            {["Capability", "Generic AI", "Ivy Admit"].map((h, i) => (
              <div key={h} className="p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.18em]">
                <span style={{ color: i === 2 ? "var(--color-oxblood)" : "var(--color-pencil)" }}>
                  {h}
                </span>
              </div>
            ))}
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.capability}
              className={`grid grid-cols-1 sm:grid-cols-3 ${i < ROWS.length - 1 ? "border-b border-hair" : ""}`}
            >
              <div className="px-4 pt-4 sm:p-4 md:p-5 font-serif text-[16px] sm:text-[15px] md:text-[17px] text-ink">
                {r.capability}
              </div>
              <div className="px-4 sm:p-4 md:p-5 text-[14px] md:text-[15px] text-ink-2 leading-[1.5]">
                <span className="sm:hidden font-mono text-[10px] uppercase tracking-[0.16em] text-pencil block mb-1">
                  Generic AI
                </span>
                {r.generic}
              </div>
              <div className="px-4 pb-4 sm:p-4 md:p-5 text-[14px] md:text-[15px] text-oxblood font-medium leading-[1.5]">
                <span className="sm:hidden font-mono text-[10px] uppercase tracking-[0.16em] text-oxblood block mb-1 mt-2">
                  Ivy Admit
                </span>
                {r.ivy}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
