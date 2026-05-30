import type { Metadata } from "next";
import Link from "next/link";
import PublicScorer from "@/PublicScorer/PublicScorer";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";

export const metadata: Metadata = {
  // "Grade My College Essay" matches the imperative search phrase users
  // type. 60-second + no-signup hit the two top frictions.
  title: "Grade My College Essay: Free AI Score in 60 Seconds (No Signup)",
  description:
    "Paste your college essay and get an instant AI grade with content, structure and voice scores. Trained on real Ivy League acceptances. Free, no signup required.",
  alternates: { canonical: "/essay-grader" },
  openGraph: {
    title: "Grade My College Essay: Free AI Score in 60 Seconds (No Signup)",
    description:
      "Instant content, structure and voice scores on your draft. Trained on real Ivy League acceptances. Free.",
    url: "/essay-grader",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Free AI college essay grader, instant score in 60 seconds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grade My College Essay: Free AI Score in 60 Seconds",
    description: "Instant scores on content, structure and voice. Free.",
    images: ["/og-image.png"],
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Essay Grader", item: `${baseUrl}/essay-grader` },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${baseUrl}/essay-grader#software`,
  name: "Ivy Admit Essay Grader",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: `${baseUrl}/essay-grader`,
  description:
    "Free AI college essay grader that scores your draft 0–100 on content, structure, and voice, flags red lines, and names the top improvements that would raise your score most.",
  publisher: { "@id": `${baseUrl}/#organization` },
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "0–100 content specificity score",
    "0–100 structure / narrative-arc score",
    "0–100 voice distinctiveness score",
    "Top 3 highest-impact improvements",
    "Red-flag detection (clichés, vagueness, weak openings)",
    "One free graded review per day, no signup",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the AI essay grader work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your personal statement or supplemental essay and the grader scores it on three orthogonal dimensions — Content (specificity and evidence), Structure (narrative arc), and Voice (distinctiveness) — each 0–100, against patterns learned from accepted applications. You get the scores plus the three changes that would raise them most, in about 60 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good college essay score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scores at or above 80 in all three dimensions indicate an essay that is structurally sound and evidence-specific; above 90 signals strong differentiation. The score is one signal — grades, activities, recommendations, and school fit all matter — so treat it as a revision guide, not a verdict on your odds.",
      },
    },
    {
      "@type": "Question",
      name: "Is the essay grader really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get one full graded review per day with no signup and no email required. The Pro plan ($7/month) adds unlimited reviews, line-by-line edits, school-specific feedback, and draft-over-draft progress tracking.",
      },
    },
    {
      "@type": "Question",
      name: "Will an AI essay grader rewrite my essay for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The grader reviews and scores your writing and tells you what to improve — it does not ghostwrite. You stay the author and decide which suggestions to apply, which keeps the essay authentically yours.",
      },
    },
  ],
};

export default function EssayGraderPage() {
  return (
    <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-24 pb-12 sm:pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mb-8 sm:mb-10">
        <p className="text-[11px] sm:text-xs font-semibold text-oxblood uppercase tracking-widest mb-2 sm:mb-3">
          Free AI essay grader
        </p>
        <h1
          className="mb-3 sm:mb-4 text-ink text-[28px] sm:text-[34px] md:text-[40px] leading-[1.15]"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          Grade your essay in 60 seconds. No signup.
        </h1>
        <p className="text-ink-2 text-[15px] sm:text-base md:text-lg leading-relaxed max-w-2xl">
          Paste your personal statement or supplemental and get a rubric-based grade plus your top strengths and improvements. One free grade per day, no account needed.
        </p>
        <p className="mt-4 sm:mt-5 text-[13px] text-pencil">
          Want your real <Link href="/odds" className="text-oxblood hover:text-oxblood-2 underline-offset-4 underline">admit chance at top schools?</Link>
        </p>
      </div>

      <PublicScorer />

      {/* Cross-sell into the primary funnel — the essay score is one signal;
          the odds calculator is the full read on where they stand. */}
      <aside className="mt-10 sm:mt-12 border border-oxblood/30 bg-[#FAEEEA] rounded-[10px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-oxblood mb-2">
            The bigger question
          </p>
          <h2
            className="text-ink text-[20px] sm:text-[23px] leading-[1.2] !mt-0 !mb-1.5"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600, letterSpacing: "-0.015em" }}
          >
            A great essay helps. But what are your <em className="italic text-oxblood">actual odds</em>?
          </h2>
          <p className="text-ink-2 text-[14px] leading-relaxed max-w-[52ch]">
            Get your real admit % and Reach/Match/Safety tier for every school on your list — in about a minute, free to start.
          </p>
        </div>
        <Link
          href="/odds"
          className="btn btn-brand font-semibold shrink-0 justify-center px-6 py-3.5"
        >
          Calculate my odds →
        </Link>
      </aside>

      {/* Supporting content — gives the page rankable depth for
          "ai essay grader / grade my college essay" beyond the widget */}
      <section className="mt-14 sm:mt-20 prose prose-slate max-w-none">
        <h2
          className="text-[22px] sm:text-[26px] !mb-4"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "-0.015em" }}
        >
          What the grader scores
        </h2>
        <p>
          Strong college essays are not graded on grammar. Ours scores the three things admissions readers actually react to, each on a 0–100 scale, and they never compensate for one another:
        </p>
        <ul>
          <li>
            <strong>Content — specificity &amp; evidence.</strong> Does the essay show concrete, particular detail only you could write, or does it lean on generalities and abstractions a thousand other applicants could claim?
          </li>
          <li>
            <strong>Structure — narrative arc.</strong> Does it open on a scene, move with intention, and close on a forward-looking insight — or wander and summarize?
          </li>
          <li>
            <strong>Voice — distinctiveness.</strong> Does it sound like a real, specific person, with a consistent register, or like an essay engineered to sound &ldquo;impressive&rdquo;?
          </li>
        </ul>

        <h2
          className="text-[22px] sm:text-[26px] !mb-4"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "-0.015em" }}
        >
          How it works
        </h2>
        <ol>
          <li>Paste your draft — personal statement or any supplemental.</li>
          <li>Get a 0–100 grade on content, structure, and voice in about 60 seconds.</li>
          <li>See the top three changes that would raise your score most, plus any red flags (clichés, vague evidence, weak openings).</li>
          <li>Revise and re-grade. Most drafts gain the most on a second pass.</li>
        </ol>
        <p>
          The rubric is built from patterns across accepted applications to Harvard, Yale, Princeton, Stanford, MIT, and peer schools. It is a review tool, like a sharp English teacher — not a ghostwriter. You stay the author.
        </p>

        <h2
          className="text-[22px] sm:text-[26px] !mb-4"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "-0.015em" }}
        >
          Frequently asked questions
        </h2>
        <div className="not-prose space-y-3 max-w-2xl">
          {faqSchema.mainEntity.map((q) => (
            <details key={q.name} className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">{q.name}</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 sm:mt-16">
        <h2
          className="text-lg sm:text-xl font-extrabold text-ink mb-4 sm:mb-5"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Or try one of our free tools
        </h2>
        <ToolSwitcher currentSlug="" />
      </section>
    </div>
  );
}
