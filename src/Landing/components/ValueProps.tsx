import { Container } from "@/design/Container";
import { SectionHead } from "@/design/SectionHead";

const FEATURES = [
  {
    num: "01",
    title: "Regional tailoring",
    body:
      "Adjust tone and topic risk for your assigned reading region. An essay that lands in New England often misses in California.",
  },
  {
    num: "02",
    title: "Accepted-app patterns",
    body:
      "Compare against structural patterns from thousands of real Ivy and T20 acceptances - not generic best-practice advice.",
  },
  {
    num: "03",
    title: "Strategy library",
    body:
      "150+ free tools: prompt deconstructors, hook generators, cliche detectors, and school-specific brainstormers.",
  },
  {
    num: "04",
    title: "Line-by-line edits",
    body:
      "Specific rewrites with the original, the suggested change, and a one-line rationale - so you can accept or reject each one.",
  },
  {
    num: "05",
    title: "Evidence checklist",
    body:
      "Flags claims without backing. Readers want scenes, verbs, and artifacts - not adjectives.",
  },
  {
    num: "06",
    title: "Risk guardrails",
    body:
      "Blend risk, AI-voice detection, and topic flags. Know what admissions readers will notice before they do.",
  },
];

export function ValueProps() {
  return (
    <section id="features" className="py-24 md:py-28">
      <Container>
        <SectionHead
          num="§02"
          eyebrow="AI Essay Scoring"
          title={<>The craft of getting in, <em className="italic text-oxblood">without losing your voice.</em></>}
          intro="Six capabilities that make Ivy Admit different from generic AI essay tools. Built by students who actually got in."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-hair">
          {FEATURES.map((f) => (
            <div
              key={f.num}
              className="border-r border-b border-hair p-8 md:p-9 transition-colors hover:bg-cream"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil mb-5">
                Feature · {f.num}
              </p>
              <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.2] text-ink mb-3">
                {f.title}
              </h3>
              <p className="text-[14.5px] text-ink-2 leading-[1.6]">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
