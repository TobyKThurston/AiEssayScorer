import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free AI Essay Review for College Applications",
  description:
    "Upload your college essay and get AI feedback in under 60 seconds, content score, structure score, voice score, and line-by-line edits trained on accepted Ivy League applications.",
  alternates: {
    canonical: "/ai-essay-review",
  },
  openGraph: {
    title: "Free AI Essay Review for College Applications | Ivy Admit",
    description:
      "Upload your college essay and get AI feedback in under 60 seconds, content score, structure score, voice score, and line-by-line edits trained on accepted applications.",
    url: "/ai-essay-review",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Essay Review for College Applications" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Essay Review for College Applications | Ivy Admit",
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
            Free AI Essay Review for College Applications
          </h1>
          <p className="text-lg text-[#475569] mb-6">
            Most essay feedback is vague: "sounds generic," "needs more voice." AI essay review is
            different, it scores your draft across three measurable dimensions and points to the
            exact sentences dragging down each score. Upload your draft and get results in under
            60 seconds.
          </p>
          <Link
            href="/editor"
            className="inline-block px-6 py-3 rounded-full bg-[#0A0A0F] text-white font-medium hover:bg-[#1a1a2e] transition-all"
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
          <div className="not-prose my-10 rounded-2xl bg-[#F5F3FF] border border-[#C4B5FD]/50 p-7 text-center">
            <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">Try it now, free</p>
            <p className="text-[#0F172A] font-bold text-lg mb-3">See your essay's scores in under 60 seconds</p>
            <p className="text-[#64748B] text-sm mb-5 max-w-md mx-auto">Upload any draft, personal statement or supplement, and get Content, Structure, and Voice scores with line-level suggestions.</p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0F] text-white text-sm font-medium hover:bg-[#1e1e3f] transition-all"
            >
              Review your essay free →
            </Link>
          </div>

          {/* Before / After */}
          <h2>Before and After: Opening Sentence</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Before</p>
              <p className="text-[#0F172A] text-sm">
                "Science has always been my passion. Growing up, I was the kid who stayed after class
                to ask questions and spent summers reading about how things worked."
              </p>
              <p className="text-xs text-red-500 mt-2">Content score: 38, three generic claims, no specific evidence</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">After</p>
              <p className="text-[#0F172A] text-sm">
                "The mass spectrometer printout showed a peak I hadn't expected. I had run the soil
                sample from my backyard three times, and each time, the same anomaly, a trace of
                barium that shouldn't have been there."
              </p>
              <p className="text-xs text-green-600 mt-2">Content score: 84, specific scene, named detail, implies a question</p>
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
                Review your essay
              </Link>
              <Link href="/college-essay-checker" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                College Essay Checker
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
