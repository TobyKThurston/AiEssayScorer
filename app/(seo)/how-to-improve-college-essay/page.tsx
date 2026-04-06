import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Improve Your College Essay: A Step-by-Step Revision Guide",
  description:
    "A practical revision guide for college essays. Learn the score → identify → edit → re-score loop, how to improve each dimension, and when your essay is ready to submit.",
  alternates: {
    canonical: "/how-to-improve-college-essay",
  },
  openGraph: {
    title: "How to Improve Your College Essay: A Step-by-Step Revision Guide | Ivy Admit",
    description:
      "A practical revision guide for college essays. Learn the score → identify → edit → re-score loop, how to improve each dimension, and when your essay is ready to submit.",
    url: "/how-to-improve-college-essay",
    type: "website",
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "How to Improve Your College Essay", item: `${baseUrl}/how-to-improve-college-essay` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many drafts should a college essay go through?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most essays reach a strong state in three to five revision cycles. The first draft surfaces the story. The second draft fixes structure. The third and fourth drafts sharpen evidence and voice. Avoid revising beyond the point where changes are improvements — over-editing strips out authentic voice.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know when my college essay is done?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your essay is ready when: all three dimension scores are above 75, you cannot find a sentence that makes an unsupported claim, a trusted reader can describe the essay's central insight in one sentence, and reading it aloud feels natural rather than effortful.",
      },
    },
    {
      "@type": "Question",
      name: "Should I hire a college counselor to improve my essay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good counselor adds value for topic strategy, school-fit assessment, and emotional resonance checks. AI review adds value for structural and evidentiary analysis. The two are complementary — use AI for measurable dimensions and a counselor for judgment calls a score cannot capture.",
      },
    },
    {
      "@type": "Question",
      name: "My essay feels authentic but scores low — what should I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Authenticity and specificity are different things. An essay can feel true to the writer while still lacking the specific details that make it legible to a reader who does not know you. Low Content scores usually mean your evidence needs more concrete grounding — not that your story is wrong.",
      },
    },
  ],
};

export default function HowToImproveCollegeEssayPage() {
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
            How to Improve Your College Essay: A Step-by-Step Revision Guide
          </h1>
          <p className="text-lg text-[#475569] mb-6">
            Revision is where most essays are won or lost. A first draft captures the story; revision
            makes it legible, specific, and memorable. This guide walks through a repeatable revision
            loop that improves essays systematically — without stripping out your voice.
          </p>
          <Link
            href="/editor"
            className="inline-block px-6 py-3 rounded-full bg-[#0A0A0F] text-white font-medium hover:bg-[#1a1a2e] transition-all"
          >
            Score your current draft →
          </Link>
        </header>

        <div className="prose prose-slate max-w-none">
          {/* Section 1 */}
          <h2>The Revision Loop: Score → Identify → Edit → Re-Score</h2>
          <p>
            Most students revise by feel — they read the essay, sense that something is off, change
            words, and repeat. This produces diminishing returns quickly because the same intuitions
            that produced the first draft produce the same kinds of edits.
          </p>
          <p>
            A structured loop breaks that cycle. First, score the essay to get an objective
            breakdown across Content, Structure, and Voice. Second, identify the weakest dimension
            — the one furthest below 80. Third, make targeted edits to that dimension only. Fourth,
            re-score to confirm improvement before moving to the next dimension.
          </p>
          <p>
            The key discipline is working on one dimension at a time. Changing Content, Structure,
            and Voice simultaneously makes it impossible to know what improved the score and what
            made it worse. Sequential revision is slower per session but faster overall because each
            change is legible.
          </p>

          {/* Section 2 */}
          <h2>Improving Your Content Score</h2>
          <p>
            A low Content score means your evidence is not specific enough. The fix is consistent:
            find every sentence that states a quality ("I am curious," "I worked hard," "I became
            more empathetic") and replace it with the specific moment that produced that quality.
          </p>
          <p>
            Practical technique: read your draft and underline every sentence that could have been
            written by any applicant writing about a similar topic. For each underlined sentence,
            ask: what is the specific moment, object, person, or observation behind this claim?
            Then write that specific thing instead of the claim.
          </p>
          <p>
            Content improves fastest when you add specificity at the word level, not the sentence
            level. "I was nervous" becomes "My hands were cold." "The experiment worked" becomes
            "The pH reading matched the model's prediction to two decimal places." Each specific
            substitution raises the Content score without changing the essay's structure or voice.
          </p>

          {/* Section 3 */}
          <h2>Improving Your Structure Score</h2>
          <p>
            Structure problems almost always live in the opening and closing. The middle of an
            essay — the development section — is usually fine because writers naturally include
            narrative momentum when describing events in sequence. The opening and closing are
            where templates creep in.
          </p>
          <p>
            To fix a low Structure score, rewrite your opening sentence first. It should drop the
            reader into a scene — a specific action, observation, or moment in progress. If your
            opening currently begins with "I have always," "Growing up," "Ever since," or a quote,
            rewrite it to start mid-action. This single change often raises the Structure score by
            15–20 points.
          </p>
          <p>
            Then rewrite your final paragraph. It should project forward rather than look backward.
            Instead of summarizing what happened or naming the lesson learned, show how this
            experience has changed how you approach something specific — a discipline, a
            relationship, a question you are still working on. Forward-looking closes score higher
            on Structure because they suggest continuity: the story is not over.
          </p>

          {/* Section 4 */}
          <h2>Improving Your Voice Score</h2>
          <p>
            Voice is the hardest dimension to improve because the instinct to fix it is often to
            add distinctive word choices — unusual vocabulary, literary devices, stylistic
            flourishes. This usually makes things worse. Performed distinctiveness reads as trying
            to sound distinctive, which is the opposite of having a voice.
          </p>
          <p>
            The more reliable technique is subtraction. Find your three longest sentences and cut
            them in half. Find phrases that modify claims without adding information ("truly
            remarkable," "deeply meaningful," "incredibly complex") and delete the modifier.
            Find sentences in passive voice and make them active.
          </p>
          <p>
            After each of these edits, read the revised passage aloud. If it sounds more like
            something you would say in a conversation, the Voice score will improve. Voice is
            not about elevated language — it is about language that sounds like a specific person.
            The specific person the essay should sound like is you, in a considered moment.
          </p>

          {/* Section 5 */}
          <h2>When to Stop Revising</h2>
          <p>
            Over-revision is a real risk. After four or five revision cycles, continued editing
            tends to flatten voice rather than sharpen it. You can identify the point of diminishing
            returns when: re-scoring after revisions shows score changes of less than 3 points per
            dimension, each new edit feels like a substitution of one adequate phrase for another
            adequate phrase, and reading the draft aloud no longer produces the urge to change
            anything.
          </p>
          <p>
            At that point, submit. The time spent on a sixth revision cycle is better spent on
            supplement essays, which are shorter, more targeted, and often more decisive for
            specific schools.
          </p>
          <p>
            The goal of revision is not perfection. It is clarity, specificity, and authenticity —
            an essay that communicates who you are to someone who has never met you. When a trusted
            reader who does not know you well can describe your essay's central insight in one
            sentence, you have achieved that goal.
          </p>

          {/* Before / After */}
          <h2>Before and After: Essay Conclusion</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Before — backward-looking close</p>
              <p className="text-[#0F172A] text-sm">
                "This experience changed the way I see the world. I learned that hard work and
                dedication can overcome any obstacle, and I will carry these lessons with me as
                I pursue my future goals in college and beyond."
              </p>
              <p className="text-xs text-red-500 mt-2">Structure score: 48 — summarizes the past, closes with generic aspiration</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">After — forward-looking close</p>
              <p className="text-[#0F172A] text-sm">
                "I still think about that morning when the numbers finally lined up. Not because
                it proved I was right — I had been wrong six different ways before that — but
                because it showed me what a question looks like when you are close enough to it
                to feel its edges. I am still looking for that feeling in other rooms."
              </p>
              <p className="text-xs text-green-600 mt-2">Structure score: 93 — anchored in a specific moment, projects forward without resolving</p>
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
                Start revising now
              </Link>
              <Link href="/ai-essay-review" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                AI Essay Review
              </Link>
              <Link href="/college-essay-checker" className="px-4 py-2 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60">
                College Essay Checker
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
