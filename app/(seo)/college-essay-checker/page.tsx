import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "College Essay Checker, Is Your Draft Ready to Submit?",
  description:
    "Check your college essay before you submit. Instant scores for content, structure, and voice. Catch vague evidence, weak openings, and template phrases before the deadline.",
  alternates: {
    canonical: "/college-essay-checker",
  },
  openGraph: {
    title: "College Essay Checker, Is Your Draft Ready to Submit? | Ivy Admit",
    description:
      "Check your college essay before you submit. Instant scores for content, structure, and voice. Catch vague evidence, weak openings, and template phrases before the deadline.",
    url: "/college-essay-checker",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "College Essay Checker, Ivy Admit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Essay Checker, Is Your Draft Ready to Submit?",
    images: ["/og-image.png"],
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "College Essay Checker", item: `${baseUrl}/college-essay-checker` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the college essay checker look for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It scores three dimensions: Content (specificity and uniqueness of evidence), Structure (narrative arc from opening scene to forward-looking close), and Voice (distinctiveness and consistency of your writing style). Each is scored 0–100 against patterns from accepted applications.",
      },
    },
    {
      "@type": "Question",
      name: "Is a score above 90 enough to submit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A score above 80 in all three dimensions generally indicates the essay is structurally sound and evidence-specific. Above 90 suggests strong differentiation. That said, essay score is one signal, school fit, extracurriculars, and grades all matter too.",
      },
    },
    {
      "@type": "Question",
      name: "Can I check multiple essays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Starter plan includes a limited number of reviews. The Pro plan includes unlimited reviews, which is useful if you're writing a Common App essay plus multiple supplements.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work for supplement essays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The checker works on any college essay, personal statement, Why School, activity essay, or short supplement. For shorter supplements, Content and Voice dimensions carry more weight than Structure.",
      },
    },
  ],
};

export default function CollegeEssayCheckerPage() {
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
            College Essay Checker: Is Your Draft Ready to Submit?
          </h1>
          <p className="text-lg text-[#475569] mb-6">
            Before you hit submit, run your essay through the same patterns that distinguish
            admitted applications from strong-but-generic ones. The college essay checker scores
            your draft on content, structure, and voice, and tells you specifically what to fix
            before the deadline.
          </p>
          <Link
            href="/editor"
            className="inline-block px-6 py-3 rounded-full bg-[#0A0A0F] text-white font-medium hover:bg-[#1a1a2e] transition-all"
          >
            Check your essay free →
          </Link>
        </header>

        <div className="prose prose-slate max-w-none">
          {/* Section 1 */}
          <h2>What a College Essay Checker Actually Looks At</h2>
          <p>
            A good essay checker does more than flag grammar. Grammar errors are easy to fix and
            rarely decide outcomes. The harder problems, vague evidence, weak narrative structure,
            generic voice, are what separate essays that are read carefully from essays that get
            skimmed.
          </p>
          <p>
            Ivy Admit's checker scores three dimensions that predict how admissions readers respond
            to an essay. Content measures whether your evidence is specific enough to be memorable.
            Structure measures whether the narrative moves, from an opening scene through a moment
            of change to a forward-looking close. Voice measures whether the essay sounds like a
            particular person rather than a template.
          </p>
          <p>
            Each dimension fails independently. An essay can be grammatically perfect and structurally
            logical while scoring low on Content because every claim is stated without supporting
            detail. The checker identifies which dimension to fix first.
          </p>

          {/* Section 2 */}
          <h2>Reading Your Score Breakdown</h2>
          <p>
            After uploading your essay, you see three scores (0–100) and a heat map of your text
            with color-coded annotations. Green highlights indicate passages that align with strong
            patterns. Orange highlights indicate opportunities for improvement. Red highlights
            indicate consistent weaknesses, repeated constructions that lower a dimension score.
          </p>
          <p>
            Each annotation includes a specific suggestion, not just a label. Rather than "vague
            evidence," you see "This sentence claims curiosity without showing a moment of it, try
            adding the specific observation or question that triggered it." This makes revision
            actionable rather than interpretive.
          </p>
          <p>
            The overall score is a weighted composite. For a 650-word personal statement, Content
            carries the most weight. For shorter supplements, Voice is weighted higher because less
            space means each word's distinctiveness matters more.
          </p>

          {/* Section 3 */}
          <h2>Common Errors the Checker Catches</h2>
          <p>
            Across thousands of essays, four patterns lower scores most consistently:
          </p>
          <ul>
            <li>
              <strong>Claim without scene:</strong> "I am a leader" without any specific moment that
              shows leadership. Content score drops below 60 when more than 30% of sentences make
              unsupported claims.
            </li>
            <li>
              <strong>Summary opening:</strong> Beginning with background ("I grew up in a small
              town where…") instead of a scene in progress. Structure score drops when the essay
              starts in narration rather than action.
            </li>
            <li>
              <strong>Template phrases:</strong> "Ever since I was young," "This experience taught
              me," "I realized that." These phrases appear in tens of thousands of essays and
              suppress Voice scores.
            </li>
            <li>
              <strong>Backward close:</strong> Ending with a summary of what happened rather than a
              forward projection. The strongest essays close by showing who you are becoming, not
              what you went through.
            </li>
          </ul>

          {/* Section 4 */}
          <h2>Revision Workflow After Checking</h2>
          <p>
            Check → identify weakest dimension → revise that dimension only → re-check. Changing
            multiple dimensions simultaneously makes it harder to know what improved the score.
          </p>
          <p>
            If Content is lowest: write a list of the five most specific details from the experience
            you are writing about. Replace each unsupported claim with the most specific detail that
            supports it. Re-upload and check Content again before moving to Structure or Voice.
          </p>
          <p>
            If Structure is lowest: read only your opening and closing sentences. They should form
            a coherent story arc on their own. If the opening is abstract and the closing is a
            summary, rewrite both before revising the middle.
          </p>
          <p>
            Most essays improve meaningfully within two to three revision cycles. Re-checking after
            each cycle keeps you from fixing problems you have already solved.
          </p>

          {/* Section 5 */}
          <h2>When You Are Done Revising</h2>
          <p>
            You are ready to submit when all three dimension scores are above 75 and you cannot
            find a sentence that states a claim without supporting it. A score above 85 across all
            dimensions indicates a distinctive, well-structured essay.
          </p>
          <p>
            At that point, read the essay aloud once. If any sentence is hard to say naturally, it
            is probably too long or syntactically complicated. College essays work best as spoken
            prose, the kind of thing you would say in a conversation, just more considered.
          </p>
          <p>
            Have one trusted person read the final version for emotional resonance. They should be
            able to describe your essay's central insight in one sentence. If they cannot, the core
            claim is not yet clear enough, and that is a Voice issue worth addressing before
            submission.
          </p>

          {/* Mid-page CTA */}
          <div className="not-prose my-10 rounded-2xl bg-[#F5F3FF] border border-[#C4B5FD]/50 p-7 text-center">
            <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">Run the check, free</p>
            <p className="text-[#0F172A] font-bold text-lg mb-3">Know if your essay is submission-ready</p>
            <p className="text-[#64748B] text-sm mb-5 max-w-md mx-auto">Paste your draft and get a scored pre-submission report in under 60 seconds. Works for personal statements, Why School essays, and short supplements.</p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0F] text-white text-sm font-medium hover:bg-[#1e1e3f] transition-all"
            >
              Check your essay free →
            </Link>
          </div>

          {/* Before / After */}
          <h2>Before and After: Evidence Specificity</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Before</p>
              <p className="text-[#0F172A] text-sm">
                "Volunteering at the hospital taught me how to connect with people from different
                backgrounds. I became more empathetic and learned that everyone has a story worth
                hearing."
              </p>
              <p className="text-xs text-red-500 mt-2">Content score: 41, two abstract lessons, no specific person or moment</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">After</p>
              <p className="text-[#0F172A] text-sm">
                "Mr. Torres was eighty-two and had been in room 14 for eleven days when I finally
                figured out he wasn't ignoring me, he was hard of hearing on his left side. After
                that, I always sat on his right."
              </p>
              <p className="text-xs text-green-600 mt-2">Content score: 89, specific person, specific detail, shows adjustment not just awareness</p>
            </div>
          </div>

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
                Check your essay
              </Link>
              <Link href="/ai-essay-review" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                AI Essay Review
              </Link>
              <Link href="/how-to-improve-college-essay" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                How to Improve Your Essay
              </Link>
              <Link href="/common-app-essay-help" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                Common App Essay Help
              </Link>
              <Link href="/ivy-league-essay-examples" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                Ivy League Essay Examples
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
