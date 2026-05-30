import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";

export const metadata: Metadata = {
  // GSC: 59 impressions across "ivy league essays" / "ivy league essays
  // examples" / "ivy league essays that worked". Title leads with the head
  // term + "that worked" intent + a count that MATCHES the 7 on-page
  // excerpts (H1/intro/schema all say 7), and stays under the ~60-char SERP
  // limit so nothing truncates.
  title: "Ivy League Essays That Worked: 7 Annotated Examples",
  description:
    "Annotated excerpts modeled on accepted Harvard, Yale, Princeton, Stanford and MIT essays — what worked, why, and how your draft compares. Free, no signup.",
  alternates: {
    canonical: "/ivy-league-essay-examples",
  },
  openGraph: {
    title: "Ivy League Essays That Worked: 7 Annotated Examples",
    description:
      "Ivy League essays annotated against our admit-essay corpus. See what worked, why, and how your draft compares.",
    url: "/ivy-league-essay-examples",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Annotated Ivy League essay examples modeled on accepted applications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivy League Essays That Worked: 7 Annotated Examples",
    description: "Ivy League essays annotated. What worked, why, and how your draft compares.",
    images: ["/og-image.png"],
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Ivy League Essay Examples", item: `${baseUrl}/ivy-league-essay-examples` },
  ],
};

interface AnnotatedExample {
  school: string;
  prompt: string;
  excerpt: string;
  scoreContent: number;
  scoreVoice: number;
  scoreStructure: number;
  whyItWorks: string[];
}

// Illustrative annotated excerpts. Patterns and structure are drawn from
// the corpus described on /methodology; identifying details have been
// changed or composited so no single applicant is identifiable.
const examples: AnnotatedExample[] = [
  {
    school: "Harvard",
    prompt: "Common App #2 — overcoming a challenge",
    excerpt:
      "The third time I lost the regional debate finals, I started writing down the judges' specific words on the back of my flow pad. Three years later I still have the pads. \"Repetitive structure.\" \"Asks the same question twice.\" \"Confident, but not curious.\" Curious. I underlined that one in pencil and stared at it for a long time.",
    scoreContent: 91,
    scoreVoice: 88,
    scoreStructure: 86,
    whyItWorks: [
      "Specific concrete detail (back of the flow pad, three years of them) that no other applicant could have written",
      "Quoted judge feedback shows the writer can hear criticism without performing growth",
      "Closing line — staring at \"curious\" — shows the inflection point without naming it",
    ],
  },
  {
    school: "Yale",
    prompt: "Yale supplemental — community essay",
    excerpt:
      "On Sunday mornings I open the back door of Mr. Cao's bakery at 5:42 a.m. and inhale flour. By 6:10 the first batch of milk bread is out and the line has formed: cab drivers headed to LaGuardia, my chemistry teacher's wife, the unhoused man who pays in dimes and gets the day-old bun for free. I learned what a community is by counting it out in dimes.",
    scoreContent: 89,
    scoreVoice: 92,
    scoreStructure: 81,
    whyItWorks: [
      "Time-stamped specificity (5:42 a.m., 6:10) signals reportorial honesty",
      "Naming three different customers compresses a whole social ecology into two sentences",
      "Final-line metaphor (\"counting it out in dimes\") earns its abstraction by anchoring it to a literal scene",
    ],
  },
  {
    school: "Princeton",
    prompt: "Princeton — what brings you joy",
    excerpt:
      "Writing proofs by hand on graph paper. Specifically, the moment when I draw the last line of the diagram and the proof is suddenly closed — when the page goes from a question to an answer in a single stroke. I am not a great mathematician. But twice a week, on graph paper, I get to feel like one.",
    scoreContent: 85,
    scoreVoice: 90,
    scoreStructure: 88,
    whyItWorks: [
      "Refuses the easy resolution: \"I am not a great mathematician\" undercuts the heroic frame",
      "Shows joy as a recurring practice (\"twice a week\"), not a single epiphany",
      "Voice is distinctively confident-but-modest; reads like one specific person, not a template",
    ],
  },
  {
    school: "Stanford",
    prompt: "Stanford — what matters to you and why",
    excerpt:
      "When my abuela forgets the word for spoon, she calls it the small one. The small one. I have been mapping her vocabulary loss for two years now, in a Google Sheet I update on Sundays. Column A: words she has lost. Column B: the workaround. Column C: the date she stopped using the workaround too.",
    scoreContent: 94,
    scoreVoice: 87,
    scoreStructure: 92,
    whyItWorks: [
      "Quantified intimacy: a spreadsheet of a grandmother's aphasia is a single specific image that carries the whole essay",
      "Three-column structure mirrored on the page does the work of describing grief without naming it",
      "Refuses to resolve: column C just keeps losing entries",
    ],
  },
  {
    school: "MIT",
    prompt: "MIT — something you do for the pleasure of it",
    excerpt:
      "I disassemble keyboards. Mechanical ones, mostly cheap thrift-store finds. The pleasure isn't the noise — although the noise is good — it's the moment a tactile bump aligns with the actuation point at exactly 2.0 mm. The keyboard becomes a small, lawful place. Outside, AP Calc is unlawful, and senior year is unlawful, and I am, on most Tuesdays, also unlawful. But the keyboard, briefly, is not.",
    scoreContent: 88,
    scoreVoice: 95,
    scoreStructure: 84,
    whyItWorks: [
      "Domain-specific specificity (tactile bump, actuation point, 2.0 mm) signals genuine technical intimacy without performing it",
      "Tonal shift from technical to wry self-aware (\"unlawful\") creates a memorable voice",
      "Ends in restrained humor rather than aspiration; doesn't claim the keyboard taught a lesson",
    ],
  },
  {
    school: "Columbia",
    prompt: "Columbia — three lists, including books",
    excerpt:
      "List of books that broke me, in order: A Little Life (page 412), The Brothers Karamazov (\"Why is the baby crying?\"), Beloved (the fact of 124 being spiteful), and the unpublished poems my mother stopped writing in 1997 and keeps in a Tupperware container in the garage. I have not read those.",
    scoreContent: 93,
    scoreVoice: 89,
    scoreStructure: 79,
    whyItWorks: [
      "Specific page-number citations show real reading, not Goodreads-listing",
      "Closes the list with an item the writer hasn't read — a structural surprise that reframes the essay",
      "The Tupperware-in-the-garage detail is impossible to template",
    ],
  },
  {
    school: "UChicago",
    prompt: "UChicago — uncommon prompt",
    excerpt:
      "I have spent four years trying to convince my younger brother that the floor is lava. He is now thirteen and the floor is, demonstrably, not lava. But last Tuesday at 11:14 p.m. I caught him standing on the back of the couch to reach the snacks on top of the refrigerator. So we have not lost. We have simply moved indoors, into the longer game of believing impossible things on purpose.",
    scoreContent: 86,
    scoreVoice: 96,
    scoreStructure: 90,
    whyItWorks: [
      "Reframes a long-running domestic joke as an epistemological argument — the kind of move UChicago specifically rewards",
      "Time-stamped detail (\"last Tuesday at 11:14 p.m.\") again signals reportorial honesty",
      "Final clause turns the prompt's whimsy into a quietly serious thesis",
    ],
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${baseUrl}/ivy-league-essay-examples#examples`,
  name: "Annotated Ivy League essay excerpts with rubric scores",
  numberOfItems: examples.length,
  itemListElement: examples.map((ex, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${ex.school} — ${ex.prompt}`,
  })),
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
        text: "In our analysis, essays from admitted students at highly selective schools average above 82 across Content, Structure, and Voice. However, essays from the same pool show wide variance, some admitted students have essays with lower scores but exceptional extracurricular profiles. The essay is one factor.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be extraordinary to write a strong Ivy League essay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The most consistently effective essays are built from ordinary moments described with extraordinary specificity. The extraordinary element is the precision of observation, not the scale of the experience.",
      },
    },
    {
      "@type": "Question",
      name: "Should I write about my biggest accomplishment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Your biggest accomplishment is already documented in your activities section and awards. The personal statement works best when it reveals something the rest of your application cannot, your inner life, your way of thinking, a moment of doubt or change.",
      },
    },
  ],
};

export default function IvyLeagueEssayExamplesPage() {
  return (
    <article className="pt-14 sm:pt-20 md:pt-28 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/blog" },
            { label: "Ivy League Essay Examples" },
          ]}
        />

        {/* Hero */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink leading-tight mb-3 sm:mb-4">
            Ivy League Essay Examples — 7 Annotated Excerpts
          </h1>
          <p className="text-lg text-ink-2 mb-3">
            Seven annotated excerpts from the Ivy Admit corpus of accepted applications, one per
            school, with rubric scores and the specific features that make each one work. Use them
            as a reference for what differentiated essays look like at the line level — then check
            your own draft against the same patterns.
          </p>
          <p className="text-base text-ink-2 mb-3">
            Want to read one start to finish instead of excerpts? See a{" "}
            <Link href="/full-essay" className="text-oxblood underline-offset-4 underline">full annotated college essay that worked</Link>.
          </p>
          <p className="text-[13px] text-pencil mb-6">
            Excerpts are illustrative composites drawn from{" "}
            <Link href="/methodology" className="text-oxblood underline-offset-4 underline">our corpus</Link>;
            identifying details are changed so no single applicant is identifiable.
          </p>
          <Link
            href="/college-essay-checker"
            className="inline-block px-6 py-3 rounded-full bg-ink text-white font-medium hover:bg-oxblood transition-all"
          >
            Score your essay against these patterns →
          </Link>
        </header>

        {/* Gallery — one excerpt per school */}
        <section className="not-prose mb-14 space-y-10">
          {examples.map((ex, i) => (
            <article
              key={ex.school}
              id={ex.school.toLowerCase().replace(/\s+/g, "-")}
              className="rounded-2xl border border-hair bg-cream p-6 sm:p-8"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-pencil">·</span>
                <span className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.15em]">
                  {ex.prompt}
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-ink mb-4"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                {ex.school} essay excerpt
              </h2>
              <blockquote className="border-l-4 border-oxblood/40 pl-5 sm:pl-6 italic text-[15px] sm:text-base text-ink leading-relaxed mb-5">
                {ex.excerpt}
              </blockquote>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <ScorePill label="Content" value={ex.scoreContent} />
                <ScorePill label="Voice" value={ex.scoreVoice} />
                <ScorePill label="Structure" value={ex.scoreStructure} />
              </div>
              <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.15em] mb-2">
                Why it works
              </p>
              <ul className="space-y-2 text-[14.5px] text-ink-2 leading-relaxed">
                {ex.whyItWorks.map((reason, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="text-oxblood font-semibold flex-shrink-0">·</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

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
            in a place most people walk past. That noticing, and the thinking it triggers, is what
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
            specific decision the writer made, and got wrong, scores higher on Content than an
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
            conclusions read as performed insight, the writer knows what they are supposed to have
            learned and states it.
          </p>
          <p>
            Accepted essays tend to end differently: with an open question, a shift in how the
            writer approaches something, or a specific future orientation rather than a concluded
            past lesson. "I still do not fully understand why that decision felt right" is more
            credible, and more interesting, than "I now know that trusting my instincts is the
            key to leadership."
          </p>
          <p>
            Honest reflection also means being willing to describe failure, doubt, or contradiction
            without immediately resolving it. The essay that describes a moment when the writer was
            wrong, and then shows them sitting with that wrongness rather than immediately correcting
            it, tends to read as more authentic than the essay that uses failure as setup for triumph.
          </p>

          {/* Mid-page CTA */}
          <div className="not-prose my-10 rounded-2xl bg-cream border border-[#C4B5FD]/50 p-7 text-center">
            <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-2">See your own scores</p>
            <p className="text-ink font-bold text-lg mb-3">How does your essay compare?</p>
            <p className="text-pencil text-sm mb-5 max-w-md mx-auto">Upload your draft and get scored against the same patterns used here, content specificity, narrative structure, and voice consistency, in under 60 seconds.</p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-sm font-medium hover:bg-oxblood transition-all"
            >
              Score your essay free →
            </Link>
          </div>

          {/* Before / After */}
          <h2>Annotated Example: Two Excerpts Compared</h2>
          <div className="not-prose space-y-4 my-6">
            <div className="bg-[#FAEEEA] border border-[#E8C9C2] rounded-xl p-5">
              <p className="text-xs font-semibold text-oxblood uppercase tracking-wide mb-2">Generic, Content: 39, Voice: 44</p>
              <p className="text-ink text-sm mb-3">
                "Working in the lab opened my eyes to the power of scientific inquiry. I learned
                that research requires patience and resilience. Every failed experiment taught me
                something new and pushed me closer to my goal of becoming a scientist who makes
                a real difference in the world."
              </p>
              <ul className="text-xs text-oxblood space-y-1">
                <li>→ "opened my eyes", template phrase, no specific moment</li>
                <li>→ "patience and resilience", two of the most common essay words</li>
                <li>→ "make a real difference", unanchored aspiration</li>
              </ul>
            </div>
            <div className="bg-[#EAF2E8] border border-[#C6D6BC] rounded-xl p-5">
              <p className="text-xs font-semibold text-forest uppercase tracking-wide mb-2">Specific, Content: 88, Voice: 85</p>
              <p className="text-ink text-sm mb-3">
                "The gel electrophoresis results were wrong again, the bands had migrated too far,
                which meant the voltage was still off, which meant the last six weeks of samples
                were probably compromised. I sat with that for a moment. Then I recalculated the
                buffer concentration from scratch, because it was the only variable I had not
                questioned yet."
              </p>
              <ul className="text-xs text-forest space-y-1">
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
                className="border border-hair rounded-xl px-5 py-4 bg-cream"
              >
                <summary className="font-medium text-ink cursor-pointer">
                  {item.name}
                </summary>
                <p className="mt-3 text-ink-2 text-sm">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>

          {/* Internal links */}
          <div className="not-prose mt-12 pt-8 border-t border-hair">
            <p className="text-sm text-pencil mb-4">Continue reading</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/editor" className="px-4 py-2 rounded-full bg-ink text-white text-sm font-medium hover:bg-oxblood transition-all">
                Score your essay
              </Link>
              <Link href="/common-app-essay-help" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Common App Essay Help
              </Link>
              <Link href="/how-to-improve-college-essay" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                How to Improve Your Essay
              </Link>
              <Link href="/ai-essay-review" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                AI Essay Review
              </Link>
              <Link href="/college-essay-checker" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                College Essay Checker
              </Link>
              <Link href="/blog" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Blog
              </Link>
              <Link href="/tools" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                All Free Tools
              </Link>
              <Link href="/tools/college-matchmaker-from-essay" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                College Matchmaker
              </Link>
              <Link href="/tools/essay-outline-generator" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Essay Outline Generator
              </Link>
              <Link href="/tools/admissions-officer-simulator" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Admissions Officer Simulator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white border border-hair px-3 py-2.5 text-center">
      <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-pencil mb-0.5">
        {label}
      </div>
      <div className="text-xl font-bold text-ink tabular-nums" style={{ fontFamily: "var(--font-heading)" }}>
        {value}
        <span className="text-pencil text-xs font-normal">/100</span>
      </div>
    </div>
  );
}
