import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free AI Essay Review for College Apps (60-Second Feedback)",
  description:
    "Paste your college essay, get content, structure and voice scores plus line-by-line edits in under 60 seconds. Trained on real accepted Ivy League applications. No signup.",
  alternates: {
    canonical: "/ai-essay-review",
  },
  openGraph: {
    title: "Free AI Essay Review for College Apps (60-Second Feedback)",
    description:
      "Content, structure and voice scores plus line-by-line edits in under 60 seconds. Trained on real Ivy League acceptances. Free, no signup.",
    url: "/ai-essay-review",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Free AI essay review for college applications, 60-second feedback" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Essay Review for College Apps (60-Second Feedback)",
    description: "Scores, line-by-line edits. Free, no signup.",
    images: ["/og-image.png"],
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "AI Essay Review", item: `${baseUrl}/ai-essay-review` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How accurate is AI essay review for college applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ivy Admit's AI is trained on patterns from successful applications to highly selective schools. It reliably identifies structural weaknesses, vague evidence, and tone mismatches. Use it as a precise coaching layer, not a guarantee of admission.",
      },
    },
    {
      "@type": "Question",
      name: "How fast does AI essay review work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most analyses complete in under a minute. Deep rewrite suggestions for a standard 650-word essay typically return within two minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Does AI essay review write the essay for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Ivy Admit analyzes your existing draft and suggests specific edits. You approve every change. The essay remains entirely your work and voice.",
      },
    },
    {
      "@type": "Question",
      name: "What score should I aim for before submitting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Essays scoring above 80 in all three categories, content, structure, and voice, tend to read clearly and distinctively. Use the breakdown to identify your weakest dimension and focus revision there.",
      },
    },
  ],
};

export default function AIEssayReviewPage() {
  return (
    <article className="pt-14 sm:pt-20 md:pt-28 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
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
            { label: "AI Essay Review" },
          ]}
        />

        {/* Hero */}
        <header className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink leading-tight mb-3 sm:mb-4">
            Free AI Essay Review for College Applications
          </h1>
          <p className="text-base sm:text-lg text-ink-2 mb-5 sm:mb-6">
            Most essay feedback is vague: "sounds generic," "needs more voice." AI essay review is
            different, it scores your draft across three measurable dimensions and points to the
            exact sentences dragging down each score. Upload your draft and get results in under
            60 seconds.
          </p>
          <Link
            href="/editor"
            className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-ink text-white font-medium text-[14px] sm:text-base hover:bg-oxblood transition-all"
          >
            Review your essay free →
          </Link>
        </header>

        <div className="prose prose-slate max-w-none">
          {/* Section 1 */}
          <h2>How AI Reads Your Essay Differently Than a Human</h2>
          <p>
            Admissions officers read hundreds of essays per day. They form an impression within
            the first two paragraphs, and they read with implicit pattern recognition, not
            conscious rubrics. AI essay review works differently: it scores every sentence against
            measurable features drawn from thousands of accepted drafts.
          </p>
          <p>
            That means AI catches things humans miss on a first read: passive constructions in
            pivotal sentences, claims that state a quality ("I am passionate about science") without
            anchoring it to a specific moment, or paragraph transitions that restart the same idea
            without advancing it. These patterns consistently lower essay effectiveness even when the
            underlying story is strong.
          </p>
          <p>
            Human readers bring warmth and intuition. AI brings consistency and recall. The most
            effective revision process uses both: AI to identify structural and evidentiary gaps,
            then a trusted reader to confirm the emotional landing.
          </p>

          {/* Section 2 */}
          <h2>What Gets Scored: Content, Structure, and Voice</h2>
          <p>
            Ivy Admit scores three dimensions, each on a 0–100 scale calibrated against accepted
            application patterns:
          </p>
          <ul>
            <li>
              <strong>Content</strong> measures the specificity and uniqueness of your evidence.
              Generic claims, "I learned to persevere", score low. Specific scenes with sensory
              detail and named outcomes score high.
            </li>
            <li>
              <strong>Structure</strong> measures narrative arc: whether the essay opens with a
              clear scene, develops tension or transformation, and closes with a forward-looking
              insight rather than a summary.
            </li>
            <li>
              <strong>Voice</strong> measures distinctiveness and consistency. Does the essay sound
              like a person or a template? Are sentences varied? Does the word choice reflect a
              specific sensibility?
            </li>
          </ul>
          <p>
            Each dimension is scored independently because they fail independently. A structurally
            tight essay can still score poorly on content if the evidence is vague. Knowing which
            dimension is weakest tells you exactly where to spend your revision time.
          </p>

          {/* Section 3 */}
          <h2>How Scores Map to Admissions Outcomes</h2>
          <p>
            Essays are one signal among many in a holistic review. A high essay score does not
            guarantee admission, and a lower score does not preclude it. What scores do predict is
            whether your essay is doing its job: differentiating you from applicants with similar
            grades and test scores.
          </p>
          <p>
            In our analysis of accepted application patterns, essays that scored above 80 across all
            three dimensions were consistently described by readers as "memorable" or "distinctive."
            Essays scoring below 60 on Content, regardless of Structure or Voice, were often
            described as "safe" or "could be anyone."
          </p>
          <p>
            The practical implication: prioritize Content. A structurally imperfect essay with vivid,
            specific evidence tends to be more memorable than a polished essay built on generic claims.
          </p>

          {/* Section 4 */}
          <h2>How to Act on AI Feedback</h2>
          <p>
            After your first review, focus on the lowest-scoring dimension. If Content is low, make a
            list of the three most specific moments from the experience you are writing about, scenes
            you could draw from memory. Replace each vague claim in your essay with the most specific
            of these.
          </p>
          <p>
            If Structure is low, check your opening sentence. Does it drop the reader into a scene or
            a moment? If it begins with "Ever since I was young" or "I have always believed," rewrite
            the opening to start mid-action. Then check your final paragraph: does it look backward
            (summarize what happened) or forward (project how this shaped what you are becoming)?
          </p>
          <p>
            Re-upload after each revision pass. Scores update in real time and the line-level
            suggestions shift as you improve. Most students see meaningful score gains within two to
            three revision cycles.
          </p>

          {/* Section 5 */}
          <h2>Limits of AI Essay Review</h2>
          <p>
            AI review is precise where language is measurable and limited where it is not. It cannot
            evaluate whether your story is the right story for a given school's culture, whether your
            topic is overrepresented in a particular applicant pool, or whether the emotional weight
            of your experience will resonate with a specific reader.
          </p>
          <p>
            Use AI review for what it does well: identifying structural patterns, flagging vague
            evidence, and maintaining consistent voice. Use a counselor, teacher, or trusted adult for
            topic strategy and emotional resonance checks. The combination produces better essays than
            either alone.
          </p>

          {/* Mid-page CTA */}
          <div className="not-prose my-10 rounded-2xl bg-cream border border-[#C4B5FD]/50 p-7 text-center">
            <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-2">Try it now, free</p>
            <p className="text-ink font-bold text-lg mb-3">See your essay's scores in under 60 seconds</p>
            <p className="text-pencil text-sm mb-5 max-w-md mx-auto">Upload any draft, personal statement or supplement, and get Content, Structure, and Voice scores with line-level suggestions.</p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-sm font-medium hover:bg-oxblood transition-all"
            >
              Review your essay free →
            </Link>
          </div>

          {/* Before / After */}
          <h2>Before and After: Opening Sentence</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-[#FAEEEA] border border-[#E8C9C2] rounded-xl p-5">
              <p className="text-xs font-semibold text-oxblood uppercase tracking-wide mb-2">Before</p>
              <p className="text-ink text-sm">
                "Science has always been my passion. Growing up, I was the kid who stayed after class
                to ask questions and spent summers reading about how things worked."
              </p>
              <p className="text-xs text-oxblood-2 mt-2">Content score: 38, three generic claims, no specific evidence</p>
            </div>
            <div className="bg-[#EAF2E8] border border-[#C6D6BC] rounded-xl p-5">
              <p className="text-xs font-semibold text-forest uppercase tracking-wide mb-2">After</p>
              <p className="text-ink text-sm">
                "The mass spectrometer printout showed a peak I hadn't expected. I had run the soil
                sample from my backyard three times, and each time, the same anomaly, a trace of
                barium that shouldn't have been there."
              </p>
              <p className="text-xs text-forest mt-2">Content score: 84, specific scene, named detail, implies a question</p>
            </div>
          </div>

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
                Review your essay
              </Link>
              <Link href="/college-essay-checker" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                College Essay Checker
              </Link>
              <Link href="/how-to-improve-college-essay" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                How to Improve Your Essay
              </Link>
              <Link href="/common-app-essay-help" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Common App Essay Help
              </Link>
              <Link href="/ivy-league-essay-examples" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Ivy League Essay Examples
              </Link>
              <Link href="/blog" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Blog
              </Link>
              <Link href="/tools" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                All Free Tools
              </Link>
              <Link href="/tools/essay-outline-generator" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Essay Outline Generator
              </Link>
              <Link href="/tools/essay-word-repetition-finder" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Word Repetition Finder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
