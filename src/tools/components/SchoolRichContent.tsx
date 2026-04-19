import type { School } from "@/tools/schools";

export function SchoolRichSections({ school }: { school: School }) {
  const rich = school.rich;
  if (!rich) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: rich.faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="mt-16">
        <h2
          className="text-2xl font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Context on {school.shortName} admissions
        </h2>
        <p className="text-[#475569] text-[15px] leading-relaxed max-w-2xl">
          {rich.admitContext}
        </p>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-[#0F172A] mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Current {school.shortName} supplemental prompts
        </h2>
        <p className="text-[#475569] text-sm leading-relaxed mb-4">
          These are the prompts {school.shortName} has recently used. Always verify against the official {school.shortName} application before submitting.
        </p>
        <div className="space-y-3">
          {rich.currentPrompts.map((p, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/60 backdrop-blur-xl border border-white/70 p-5"
            >
              <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">
                Prompt {i + 1}
              </p>
              <p className="text-[#0F172A] text-[14.5px] leading-relaxed italic">&quot;{p}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-[#0F172A] mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Three opening angles that work for {school.shortName}
        </h2>
        <ol className="space-y-3">
          {rich.openingAngles.map((a, i) => (
            <li
              key={i}
              className="rounded-xl bg-white/60 backdrop-blur-xl border border-white/70 p-5 text-[#0F172A] text-[15px] leading-relaxed"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-xs font-bold mr-2 align-text-top">
                {i + 1}
              </span>
              {a}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-[#0F172A] mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Mistakes {school.shortName} reviewers see every year
        </h2>
        <ul className="space-y-2">
          {rich.commonMistakes.map((m, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-5"
            >
              <span className="text-[#B91C1C] font-bold flex-shrink-0">→</span>
              <span className="text-[#0F172A] text-[15px] leading-relaxed">{m}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-[#0F172A] mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          {school.shortName} essay FAQ
        </h2>
        <div className="space-y-4">
          {rich.faq.map((q, i) => (
            <details
              key={i}
              className="group rounded-xl bg-white/60 backdrop-blur-xl border border-white/70 p-5"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between text-[#0F172A] font-semibold text-[15px]">
                {q.question}
                <span className="text-[#6366F1] text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-[#475569] text-[14.5px] leading-relaxed mt-3">
                {q.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
