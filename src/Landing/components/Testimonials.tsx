import { Container } from "@/design/Container";
import { SectionHead } from "@/design/SectionHead";

const QUOTES = [
  {
    body:
      "Everyone else was telling me my essay was fine. Ivy Admit showed me which three sentences were doing all the work - and which four were dragging it down. Cut them and the essay clicked.",
    name: "Sarah K.",
    school: "Admitted - Harvard '30",
    bg: "var(--color-oxblood)",
    initials: "SK",
  },
  {
    body:
      "The rubric score was demoralizing and exactly what I needed. My first draft was a 64. My final was an 89. Same story, different essay.",
    name: "Marcus J.",
    school: "Admitted - Stanford '30",
    bg: "var(--color-forest)",
    initials: "MJ",
  },
  {
    body:
      "I used the school-specific brainstormer for every one of my supplementals. It surfaced programs I hadn't found on the main site and gave me angles that actually felt like mine.",
    name: "Ava L.",
    school: "Admitted - Yale '30",
    bg: "var(--color-gold)",
    initials: "AL",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-28 border-t border-hair">
      <Container>
        <SectionHead
          num="§07"
          eyebrow="What students say"
          title={<>Honest feedback, <em className="italic text-oxblood">admits</em> included.</>}
          intro="Three students who used Ivy Admit as part of their application cycle."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map((q) => (
            <figure key={q.name} className="paper-card p-7">
              <blockquote className="font-serif text-[19px] leading-[1.45] text-ink">
                <span className="text-oxblood text-[28px] leading-none align-top mr-1">&ldquo;</span>
                {q.body}
                <span className="text-oxblood text-[28px] leading-none ml-1">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-hair flex items-center gap-3">
                <span
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-serif text-[14px] text-paper"
                  style={{ background: q.bg }}
                >
                  {q.initials}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">{q.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-oxblood">
                    {q.school}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
