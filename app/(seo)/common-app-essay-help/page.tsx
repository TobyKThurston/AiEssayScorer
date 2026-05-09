import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";

export const metadata: Metadata = {
  title: "Common App Essay Help, How to Write & Revise Your Draft",
  description:
    "Step-by-step common app essay help: which prompt to choose, how to find your story, how to structure 650 words, and how to use AI feedback to revise fast. Free tool included.",
  alternates: {
    canonical: "/common-app-essay-help",
  },
  openGraph: {
    title: "Common App Essay Help, How to Write & Revise Your Draft | Ivy Admit",
    description:
      "Step-by-step common app essay help: which prompt to choose, how to find your story, how to structure 650 words, and how to use AI feedback to revise fast.",
    url: "/common-app-essay-help",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Common App Essay Help, Ivy Admit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Common App Essay Help, How to Write & Revise Your Draft",
    images: ["/og-image.png"],
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Common App Essay Help", item: `${baseUrl}/common-app-essay-help` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should writing the Common App essay take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plan for four to six weeks if you start from scratch: one week for topic selection and brainstorming, one week for a rough draft, and two to four weeks for revision cycles. Starting earlier gives you more time to let drafts rest before revising.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my Common App essay for school supplements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reuse thematic material, but not the essay itself. Supplement prompts ask school-specific questions (Why us? Activity essay?) that require original answers. The personal statement provides the through-line; supplements add dimension.",
      },
    },
    {
      "@type": "Question",
      name: "Should I hit the 650-word limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Essays between 600 and 650 words tend to score highest on Structure. Significantly shorter essays (under 500 words) often lack evidence depth. Longer essays are truncated by the Common App. Aim for 620–650 words.",
      },
    },
    {
      "@type": "Question",
      name: "Which Common App prompt should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose the prompt that most naturally fits your story, not the one that sounds most impressive. Admissions officers read all seven prompt responses equally. The topic and execution matter far more than the prompt number.",
      },
    },
  ],
};

export default function CommonAppEssayHelpPage() {
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
            { label: "Common App Essay Help" },
          ]}
        />

        {/* Hero */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink leading-tight mb-3 sm:mb-4">
            Common App Essay Help: Prompts, Story, Structure & Revision
          </h1>
          <p className="text-lg text-ink-2 mb-6">
            The Common App personal statement is 650 words that contextualize everything else in
            your application. Most students struggle not because they lack a story, but because
            they pick the wrong one, or tell the right one poorly. This guide covers every stage:
            topic selection, first draft, structure, and revision.
          </p>
          <Link
            href="/editor"
            className="inline-block px-6 py-3 rounded-full bg-ink text-white font-medium hover:bg-oxblood transition-all"
          >
            Review your draft free →
          </Link>
        </header>

        <div className="prose prose-slate max-w-none">
          {/* Section 1 */}
          <h2>Choosing the Right Common App Prompt</h2>
          <p>
            The Common App offers seven prompts. Most applicants make the same mistake: they choose
            the prompt they think sounds most impressive and then try to force their story into it.
            The better approach is the reverse, identify the story you most want to tell, then find
            the prompt it fits.
          </p>
          <p>
            Prompts 1 (background and identity), 5 (accomplishment or event), and 7 (any topic of
            your choice) are used by more than 60% of applicants. That is not because they are
            better, it is because they are broadest. If a more specific prompt (like Prompt 3:
            challenging a belief, or Prompt 4: problem-solving) fits your story more precisely, use
            it. Specificity in the prompt often produces more focused essays.
          </p>
          <p>
            Avoid choosing a prompt because the label sounds meaningful. "Obstacle" essays that
            describe real obstacles are compelling. "Obstacle" essays that describe minor
            inconveniences framed as character-building tests are not. The story determines the
            quality, not the prompt category.
          </p>

          {/* Section 2 */}
          <h2>Finding Your Story</h2>
          <p>
            Most strong Common App essays are built from small, specific moments, not major
            accomplishments. The student who writes about the hour they spent calibrating a telescope
            is often more memorable than the student who writes about winning a national science
            competition, because the small moment carries more texture and specificity.
          </p>
          <p>
            To find your story, answer these three questions: What is a moment from the past four
            years that you have returned to mentally more than once? What do you know or think about
            that most people around you do not? What changed your mind about something you had
            previously assumed?
          </p>
          <p>
            The answers often point toward overlooked topics: a conversation, a failed project,
            an observation during an ordinary task. These are almost always better essay subjects
            than formal achievements, which the rest of the application already documents.
          </p>

          {/* Section 3 */}
          <h2>How to Structure 650 Words</h2>
          <p>
            The most effective structure for a 650-word personal statement follows a three-part arc:
          </p>
          <ul>
            <li>
              <strong>Opening scene (~150 words):</strong> Start mid-action in a specific moment.
              Not background, not context, the scene itself. The reader should be able to picture
              where you are and what is happening.
            </li>
            <li>
              <strong>Development (~350 words):</strong> Move through the moment: what you noticed,
              what complicated it, what you did or thought. Include one or two specific details that
              only you could know. Show a shift, in understanding, in approach, in what you care
              about.
            </li>
            <li>
              <strong>Close (~150 words):</strong> Project forward. Not "this experience taught me
              to persevere" but "this is how I now approach X" or "this is what I am still trying
              to figure out about Y." The best closes gesture toward the person you are becoming,
              not the lesson you learned.
            </li>
          </ul>
          <p>
            This is not the only structure that works, but it is the most reliable. Deviating from
            it requires strong intentionality, you need a good reason to start with reflection
            rather than scene, or to end with a summary rather than a projection.
          </p>

          {/* Section 4 */}
          <h2>What Admissions Officers Are Actually Looking For</h2>
          <p>
            Admissions readers describe the best essays they have read as essays that made them
            feel like they knew the applicant. Not essays about impressive accomplishments, not
            essays that demonstrate intellectual vocabulary, and not essays that argue a thesis about
            personal growth.
          </p>
          <p>
            What produces that feeling is specificity: the exact object, the specific person, the
            precise doubt. Vague claims about growth or passion or curiosity register as templates.
            Specific details register as a person.
          </p>
          <p>
            AOs also notice when an essay is written for them rather than from the writer's
            perspective. If your draft is full of phrases like "I believe this will help me succeed
            at your institution," it is performing rather than revealing. The personal statement
            works better when it is a window into how you think, not an argument for why you
            deserve admission.
          </p>

          {/* Section 5 */}
          <h2>Using AI Feedback to Revise Effectively</h2>
          <p>
            After a first draft, upload to Ivy Admit for a scored review before asking any human
            reader. The AI review identifies structural and evidentiary issues quickly, issues
            that human readers often mention only vaguely ("it feels generic") without being able
            to locate specifically.
          </p>
          <p>
            Act on the lowest-scoring dimension first. If Content is low, your evidence is not
            specific enough. If Structure is low, your opening or close is likely the problem.
            Revise that dimension, re-upload, and check again before soliciting human feedback.
          </p>
          <p>
            Once your scores are above 75 in all three dimensions, share with one trusted human
            reader for a resonance check. They should be able to describe the essay's central
            insight in one sentence. Combine their feedback with your scores to produce a final draft
            that is both technically strong and emotionally clear.
          </p>

          {/* Mid-page CTA */}
          <div className="not-prose my-10 rounded-2xl bg-cream border border-[#C4B5FD]/50 p-7 text-center">
            <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-2">Get feedback, free</p>
            <p className="text-ink font-bold text-lg mb-3">Already have a draft? Score it now</p>
            <p className="text-pencil text-sm mb-5 max-w-md mx-auto">Upload your Common App personal statement and get content, structure, and voice scores with specific line edits in under 60 seconds.</p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-sm font-medium hover:bg-oxblood transition-all"
            >
              Review your draft free →
            </Link>
          </div>

          {/* Before / After */}
          <h2>Before and After: Opening Hook</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-[#FAEEEA] border border-[#E8C9C2] rounded-xl p-5">
              <p className="text-xs font-semibold text-oxblood uppercase tracking-wide mb-2">Before</p>
              <p className="text-ink text-sm">
                "Growing up in a household where two languages were spoken, I always felt caught
                between two worlds. This experience shaped my identity and taught me the value of
                bridging cultural differences."
              </p>
              <p className="text-xs text-oxblood-2 mt-2">Structure score: 44, context before scene, closes with a template lesson</p>
            </div>
            <div className="bg-[#EAF2E8] border border-[#C6D6BC] rounded-xl p-5">
              <p className="text-xs font-semibold text-forest uppercase tracking-wide mb-2">After</p>
              <p className="text-ink text-sm">
                "My grandmother was mid-sentence when she switched from English to Tagalog, a
                signal I had learned to read. She was about to say something she did not want my
                father to understand."
              </p>
              <p className="text-xs text-forest mt-2">Structure score: 91, in-scene immediately, specific detail, implies tension</p>
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
                Review your draft
              </Link>
              <Link href="/ivy-league-essay-examples" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Ivy League Essay Examples
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
              <Link href="/tools/essay-outline-generator" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Essay Outline Generator
              </Link>
              <Link href="/tools/essay-first-sentence-generator" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                First-Sentence Generator
              </Link>
              <Link href="/tools/essay-conclusion-generator" className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream">
                Essay Conclusion Generator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
