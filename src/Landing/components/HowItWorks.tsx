import { Container } from "@/design/Container";
import { SectionHead } from "@/design/SectionHead";

const STEPS = [
  {
    num: "01",
    title: "Paste your draft.",
    body:
      "Drop in any version — first draft or final polish. We accept Common App essays, supplementals, and short answers from 50 to 2,000 words.",
  },
  {
    num: "02",
    title: "Get scored on a real rubric.",
    body:
      "Content, structure, voice, school fit, and mechanics. The same rubric trained on thousands of accepted applications.",
  },
  {
    num: "03",
    title: "Fix what matters most.",
    body:
      "Line-by-line edits, risk flags, and one standout move. Accept what helps, ignore what doesn't. You stay the author.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-28 border-t border-hair">
      <Container>
        <SectionHead
          num="§03"
          eyebrow="How it works"
          title={<>From paste to <em className="italic text-oxblood">publishable</em> in three reads.</>}
          intro="The whole point is to close the gap between your draft and an admissions reader's view of it — fast."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.num} className="paper-card p-8">
              <p className="font-serif italic text-[56px] leading-none text-oxblood opacity-90 mb-5">
                {s.num}
              </p>
              <h3 className="font-serif text-[22px] leading-[1.2] text-ink mb-3">{s.title}</h3>
              <p className="text-[14.5px] text-ink-2 leading-[1.6]">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
