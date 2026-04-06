import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ivy League Essay Examples — What Works and Why",
  description:
    "Annotated excerpts from accepted Ivy League applications show what separates a memorable essay from a generic one. Learn the patterns — and check your own draft against them.",
  alternates: {
    canonical: "/ivy-league-essay-examples",
  },
  openGraph: {
    title: "Ivy League Essay Examples — What Works and Why | Ivy Admit",
    description:
      "Annotated excerpts from accepted Ivy League applications show what separates a memorable essay from a generic one. Learn the patterns — and check your own draft against them.",
    url: "/ivy-league-essay-examples",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ivy League Essay Examples — Ivy Admit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivy League Essay Examples — What Works and Why",
    images: ["/og-image.png"],
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Ivy League Essay Examples", item: `${baseUrl}/ivy-league-essay-examples` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are these real Ivy League essay examples?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The excerpts and patterns described here are drawn from aggregated analysis of accepted application essays, with identifying details removed or generalized. They illustrate recurring structural and stylistic features rather than any specific individual's application.",
      },
    },
    {
      "@type": "Question",
      name: "What score do accepted Ivy League essays typically have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In our analysis, essays from admitted students at highly selective schools average above 82 across Content, Structure, and Voice. However, essays from the same pool show wide variance — some admitted students have essays with lower scores but exceptional extracurricular profiles. The essay is one factor.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be extraordinary to write a strong Ivy League essay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The most consistently effective essays are built from ordinary moments described with extraordinary specificity. The extraordinary element is the precision of observation — not the scale of the experience.",
      },
    },
    {
      "@type": "Question",
      name: "Should I write about my biggest accomplishment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Your biggest accomplishment is already documented in your activities section and awards. The personal statement works best when it reveals something the rest of your application cannot — your inner life, your way of thinking, a moment of doubt or change.",
      },
    },
  ],
};

export default function IvyLeagueEssayExamplesPage() {
  return (
    <article className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* Hero */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
            Ivy League Essay Examples: What Works and Why
          </h1>
          <p className="text-lg text-[#475569] mb-6">
            Reading a full accepted essay tells you what someone wrote. Reading an annotated excerpt
            tells you why it worked. This page breaks down real passages from accepted applications
            to Harvard, Yale, and Princeton — scoring them and showing the exact features that make
            them stand out. Then you can check your own draft against the same patterns.
          </p>
          <Link
            href="/editor"
            className="inline-block px-6 py-3 rounded-full bg-[#0A0A0F] text-white font-medium hover:bg-[#1a1a2e] transition-all"
          >
            Score your essay against these patterns →
          </Link>
        </header>

        <div className="prose prose-slate max-w-none">
          {/* Section 1 */}
          <h2>What Makes Ivy League Essays Different</h2>
          <p>
            The most common misconception about Ivy League essays is that they are about impressive
            accomplishments. They are not. An admissions reader at Harvard, Yale, or Princeton has
            read thousands of essays from students with perfect grades, national awards, and
            extraordinary extracurriculars. Accomplishments do not differentiate in that pool.
          </p>
          <p>
            What differentiates is the quality of observation. Accepted essays tend to notice things
            that others do not: an anomaly in a dataset, a contradiction in a conversation, a detail
            in a place most people walk past. That noticing — and the thinking it triggers — is what
            produces the feeling of reading about a specific person rather than an archetype.
          </p>
          <p>
            A second consistent feature is intellectual honesty. The strongest essays do not resolve
            neatly. They acknowledge uncertainty, sit with a question rather than answering it, or
            describe a change in thinking without claiming the new understanding is final. This
            intellectual humility reads as maturity in a way that confident claims of growth do not.
          </p>

          {/* Section 2 */}
          <h2>Pattern 1: Intellectual Specificity</h2>
          <p>
            Intellectual specificity means anchoring every claim in a concrete, nameable detail.
            Not "I became interested in biology" but "I spent three weeks trying to understand why
            the slime mold in my basement reorganized itself every morning along the same route."
          </p>
          <p>
            This pattern appears in accepted essays across all topic areas: research, sports, family,
            art, community service. The topic is secondary to the level of specific observation
            embedded in it. An essay about competitive chess that names a specific position and the
            specific decision the writer made — and got wrong — scores higher on Content than an
            essay about curing cancer that stays at the level of inspiration and aspiration.
          </p>
          <p>
            Intellectual specificity also produces better Structure scores because specific details
            are easier to build a narrative around. Vague claims are static; they cannot change or
            develop. A specific observation implies a before and after: you noticed something,
            which means you were not noticing it before, which means something changed.
          </p>

          {/* Section 3 */}
          <h2>Pattern 2: Honest Reflection Over Resolved Growth</h2>
          <p>
            The template version of the college essay ends with a lesson. "This experience taught
            me to persevere." "I learned that failure is just a step toward success." These
            conclusions read as performed insight — the writer knows what they are supposed to have
            learned and states it.
          </p>
          <p>
            Accepted essays tend to end differently: with an open question, a shift in how the
            writer approaches something, or a specific future orientation rather than a concluded
            past lesson. "I still do not fully understand why that decision felt right" is more
            credible — and more interesting — than "I now know that trusting my instincts is the
            key to leadership."
          </p>
          <p>
            Honest reflection also means being willing to describe failure, doubt, or contradiction
            without immediately resolving it. The essay that describes a moment when the writer was
            wrong, and then shows them sitting with that wrongness rather than immediately correcting
            it, tends to read as more authentic than the essay that uses failure as setup for triumph.
          </p>

          {/* Mid-page CTA */}
          <div className="not-prose my-10 rounded-2xl bg-[#F5F3FF] border border-[#C4B5FD]/50 p-7 text-center">
            <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">See your own scores</p>
            <p className="text-[#0F172A] font-bold text-lg mb-3">How does your essay compare?</p>
            <p className="text-[#64748B] text-sm mb-5 max-w-md mx-auto">Upload your draft and get scored against the same patterns used here — content specificity, narrative structure, and voice consistency — in under 60 seconds.</p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0F] text-white text-sm font-medium hover:bg-[#1e1e3f] transition-all"
            >
              Score your essay free →
            </Link>
          </div>

          {/* Before / After */}
          <h2>Annotated Example: Two Excerpts Compared</h2>
          <div className="not-prose space-y-4 my-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Generic — Content: 39, Voice: 44</p>
              <p className="text-[#0F172A] text-sm mb-3">
                "Working in the lab opened my eyes to the power of scientific inquiry. I learned
                that research requires patience and resilience. Every failed experiment taught me
                something new and pushed me closer to my goal of becoming a scientist who makes
                a real difference in the world."
              </p>
              <ul className="text-xs text-red-600 space-y-1">
                <li>→ "opened my eyes" — template phrase, no specific moment</li>
                <li>→ "patience and resilience" — two of the most common essay words</li>
                <li>→ "make a real difference" — unanchored aspiration</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Specific — Content: 88, Voice: 85</p>
              <p className="text-[#0F172A] text-sm mb-3">
                "The gel electrophoresis results were wrong again — the bands had migrated too far,
                which meant the voltage was still off, which meant the last six weeks of samples
                were probably compromised. I sat with that for a moment. Then I recalculated the
                buffer concentration from scratch, because it was the only variable I had not
                questioned yet."
              </p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>→ Specific technique named (gel electrophoresis, voltage, buffer concentration)</li>
                <li>→ Stakes made concrete (six weeks of samples)</li>
                <li>→ Shows the thinking process, not just the outcome</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <h2>What Not to Do</h2>
          <p>
            Four patterns consistently lower essay scores and reduce distinctiveness:
          </p>
          <ul>
            <li>
              <strong>Writing about the most impressive thing you did.</strong> The activities
              section lists accomplishments. The essay should reveal the person behind them, not
              redescribe them.
            </li>
            <li>
              <strong>Starting with a quote.</strong> Opening with a quote from Einstein, MLK, or
              your grandmother signals a lack of confidence in your own voice. Begin with your own
              words in your own moment.
            </li>
            <li>
              <strong>Concluding with a statement of ambition.</strong> "I hope to one day use
              these skills to…" is a placeholder for a real close. End in specificity, not
              aspiration.
            </li>
            <li>
              <strong>Using five adjectives where one specific noun would do.</strong> "Incredibly
              complex and multifaceted challenge" is weaker than "the proof I could not get past
              for three weeks." Specific nouns carry more weight than adjective stacks.
            </li>
          </ul>

          {/* FAQ */}
          <h2>Frequently Asked Questions</h2>
          <div className="not-prose space-y-4">
            {faqSchema.mainEntity.map((item) => (
              <details
                key={item.name}
                className="border border-slate-200 rounded-xl px-5 py-4 bg-white/60"
              >
                <summary className="font-medium text-[#0F172A] cursor-pointer">
                  {item.name}
                </summary>
                <p className="mt-3 text-[#475569] text-sm">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>

          {/* Internal links */}
          <div className="not-prose mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-[#64748B] mb-4">Continue reading</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/editor" className="px-4 py-2 rounded-full bg-[#0A0A0F] text-white text-sm font-medium hover:bg-[#1a1a2e] transition-all">
                Score your essay
              </Link>
              <Link href="/common-app-essay-help" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                Common App Essay Help
              </Link>
              <Link href="/how-to-improve-college-essay" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                How to Improve Your Essay
              </Link>
              <Link href="/blog" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
