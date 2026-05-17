import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

export const metadata: Metadata = {
  // Title is already exact-match dominant for "common app essay prompts
  // 2026-2027". Adding "(+ Examples)" raises CTR by promising a
  // list/example payoff over competitors' generic "complete guide" titles.
  title: "Common App Essay Prompts 2026-2027: All 7 Explained (+ Examples)",
  description:
    "All 7 Common Application essay prompts for 2026-2027, broken down with strategy, mistakes to avoid, and real example angles for each. Free AI scorer for your draft.",
  alternates: { canonical: "/common-app-essay-prompts-2026-2027" },
  keywords: [
    "Common App essay prompts 2026",
    "Common App essay prompts 2027",
    "Common Application essay prompts",
    "Common App prompts",
    "Common App questions",
    "Common App essay topics",
    "Common App personal statement prompts",
  ],
  openGraph: {
    title: "Common App Essay Prompts 2026-2027: All 7 Prompts Explained",
    description: "Every Common App prompt for 2026-2027, explained with strategy and examples.",
    url: "/common-app-essay-prompts-2026-2027",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Common App essay prompts 2026-2027" }],
  },
};

interface Prompt {
  number: number;
  text: string;
  shortName: string;
  whoItsFor: string;
  strategy: string;
  commonMistakes: string[];
  exampleAngles: string[];
}

// 2026-2027 Common App essay prompts (same set as 2025-26 cycle; Common App typically holds prompts steady)
const PROMPTS: Prompt[] = [
  {
    number: 1,
    text: "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.",
    shortName: "Background, Identity, Interest, or Talent",
    whoItsFor: "Applicants whose central story can't be told through any other prompt. Most useful when you have a specific, distinctive identity or pursuit that genuinely defines how you spend your time and how you think.",
    strategy: "The strongest answers anchor in concrete daily detail rather than abstract identity statements. Don't say 'as a first-generation student'; show what 5 a.m. on a Sunday actually looks like at your kitchen table. Specificity > category. The reader needs to see the texture of your life, not its label.",
    commonMistakes: [
      "Treating it as a checkbox for diversity rather than a story prompt",
      "Listing multiple identities/interests in one essay instead of going deep on one",
      "Generic statements about 'overcoming obstacles' or 'embracing my heritage'",
      "Writing what you think the admissions reader wants to hear",
    ],
    exampleAngles: [
      "A specific tradition or ritual that only makes sense if the reader understands your family",
      "An interest you've pursued in a way that's slightly weird or self-directed (not just clubs you joined)",
      "A talent expressed through a single concrete moment rather than a list of achievements",
    ],
  },
  {
    number: 2,
    text: "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
    shortName: "Challenge or Failure",
    whoItsFor: "Applicants who can describe a specific moment of failure with intellectual honesty. Best when you can show the failure mattered AND that the lesson was earned, not assumed.",
    strategy: "The trap is the resolution arc: 'I failed, but I learned, and now I'm wiser.' That structure reads as performed insight. Real failure essays sit longer in the discomfort. The lesson should feel surprising, partial, or still in progress — not packaged. Show your thinking as it actually evolved.",
    commonMistakes: [
      "Writing about a 'failure' that's really a humblebrag (e.g., a B+ in AP Calc)",
      "The neat redemption arc where the lesson resolves everything",
      "Failure as setup for triumph instead of a real reckoning",
      "Generic life lessons ('learned the value of hard work')",
    ],
    exampleAngles: [
      "A moment when you were wrong, and you didn't immediately fix it",
      "A specific decision you'd make differently and why your reasoning has changed",
      "A failure that revealed something you didn't know about yourself",
    ],
  },
  {
    number: 3,
    text: "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?",
    shortName: "Questioned a Belief",
    whoItsFor: "Applicants who can describe genuine intellectual movement. The strongest answers describe a specific belief that you actually held, the moment it cracked, and what you think now (which may not be a clean conclusion).",
    strategy: "Avoid hot-button political topics unless you have unusual depth and personal stakes. The prompt rewards intellectual humility and specificity, not contrarianism. A small, well-thought belief shift beats a sweeping ideological statement. Show the reader how you actually think.",
    commonMistakes: [
      "Picking a topic for shock value rather than genuine reflection",
      "Pretending you challenged a belief you actually didn't",
      "Hedging into both-sides-ism instead of taking a real position",
      "Treating the prompt as 'tell me about a controversial topic' rather than your own thinking",
    ],
    exampleAngles: [
      "A small assumption from your family/community/peer group that you came to question",
      "A scientific or methodological belief you held that data revealed was wrong",
      "An ethical position you defended publicly that later evolved",
    ],
  },
  {
    number: 4,
    text: "Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?",
    shortName: "Gratitude",
    whoItsFor: "Applicants who can write about another person without making the essay about themselves. The strongest answers describe a specific act, a specific person, and the way that person changed your behavior — not just your feelings.",
    strategy: "The 'surprising' qualifier is doing real work. Don't write about your parents or coaches doing the obvious things they're supposed to do. Write about someone who didn't owe you anything and gave you something anyway. Show motivation in action — what you DO differently — not just affect.",
    commonMistakes: [
      "Generic gratitude essays about parents/teachers/coaches doing expected things",
      "Making the essay about you instead of the other person's specific act",
      "Stating the lesson without showing the behavior change",
      "Performative gratitude rather than specific, concrete recognition",
    ],
    exampleAngles: [
      "A small kindness from a stranger that changed how you treat strangers",
      "Something a peer did that you didn't realize was generous until later",
      "A teacher who pushed you in a way that hurt at the time",
    ],
  },
  {
    number: 5,
    text: "Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.",
    shortName: "Personal Growth",
    whoItsFor: "Applicants who can name a specific inflection point AND describe what changed in detail. Avoid this prompt if you're tempted toward generic 'growth' language.",
    strategy: "Anchor the essay in a single moment, not a long arc. The accomplishment or event is just the trigger; the real essay is the change in perception or behavior. Show the before and after with specific examples. 'I became more open-minded' is weak. 'I stopped responding to my mother in the way I had since I was twelve' is strong.",
    commonMistakes: [
      "Writing about an accomplishment without the realization it triggered",
      "Vague growth language ('I became a better person')",
      "Treating it as a resume essay (winning the competition, etc.)",
      "Failing to differentiate the before-state from the after-state with specificity",
    ],
    exampleAngles: [
      "A small realization that changed how you treat someone close to you",
      "A specific behavior you used to do that you no longer do, and why",
      "An event whose meaning you now understand differently than you did at the time",
    ],
  },
  {
    number: 6,
    text: "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?",
    shortName: "Intellectual Captivation",
    whoItsFor: "Applicants with a specific, narrow intellectual obsession that they actually pursue outside of school. This prompt is the strongest essay choice for academically driven students whose curiosity drives concrete behavior.",
    strategy: "Pick a topic narrow enough to go deep, weird enough to be memorable. 'I love reading' is dead on arrival. 'I've spent the last year reconstructing why slime molds reorganize themselves overnight along the same routes' is an essay. The reader has to feel the texture of your curiosity. What do you do when no one is grading you?",
    commonMistakes: [
      "Choosing a generic subject (history, science, music) without narrowing",
      "Talking about a topic without showing what you've done about it",
      "Writing about an interest you cultivated for the application",
      "Dropping name-brand books/papers without showing real engagement",
    ],
    exampleAngles: [
      "A specific question you've been chasing for months that you can't fully answer yet",
      "A subfield obscure enough that you have to explain it (and the explanation is the essay)",
      "A skill or method you teach yourself outside any class structure",
    ],
  },
  {
    number: 7,
    text: "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.",
    shortName: "Topic of Your Choice",
    whoItsFor: "Applicants whose essay genuinely doesn't fit the other six prompts. Use sparingly — choosing this prompt signals to readers that you've thought hard about why none of the structured prompts work for your story. If you're using it because the other prompts seem boring, that's the wrong reason.",
    strategy: "Treat it as a constraint rather than freedom. The strongest topic-of-your-choice essays are tightly focused, not sprawling. They earn the freedom by showing that the structure of the existing prompts couldn't contain what you needed to say. If your essay would fit prompt 1-6, use that prompt.",
    commonMistakes: [
      "Using it because you're trying to 'stand out' rather than because you have to",
      "Treating it as license to write a more abstract or experimental essay than your story warrants",
      "Submitting an essay that would have fit a structured prompt, signaling laziness",
      "Choosing a topic the reader will see hundreds of times anyway",
    ],
    exampleAngles: [
      "An essay that genuinely needs a different formal structure (e.g., letter, list, fragmented)",
      "A topic that crosses multiple prompts in a way none of them fully captures",
      "A piece of writing you've already published or workshopped that represents your voice at its best",
    ],
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Common App Essay Prompts 2026-2027", item: `${baseUrl}/common-app-essay-prompts-2026-2027` },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Common App Essay Prompts 2026-2027: All 7 Prompts Explained",
  description: "All 7 Common Application essay prompts for the 2026-2027 cycle, with strategy, common mistakes, and example angles for each.",
  datePublished: "2026-05-09",
  dateModified: "2026-05-09",
  author: {
    "@type": "Person",
    name: "Ivy Admit Editorial Team",
    url: `${baseUrl}/about`,
    jobTitle: "Editorial Team",
    worksFor: { "@type": "Organization", name: "Ivy Admit", url: baseUrl },
    description:
      "Editors at Ivy Admit covering selective US college admissions, application strategy, and essay craft. Combined experience reviewing thousands of applications to Harvard, Yale, Princeton, Stanford, MIT, and other top schools.",
  },
  publisher: {
    "@type": "Organization",
    name: "Ivy Admit",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon-192.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/common-app-essay-prompts-2026-2027` },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Choose and Write a Common App Essay (2026-2027)",
  description:
    "Step-by-step process for selecting a Common App prompt and producing a competitive 650-word personal statement under the 2026-2027 cycle requirements.",
  totalTime: "P14D",
  supply: [
    { "@type": "HowToSupply", name: "Common App account (free)" },
    { "@type": "HowToSupply", name: "Two to three rough story ideas" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Ivy Admit essay scorer", url: `${baseUrl}/try` },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Brainstorm before reading the prompts",
      text: "List 5 to 10 specific moments, scenes, or decisions from the last 4 years that you would actually want a stranger to know. Don't filter for a prompt yet — start from the raw material of your life.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Match your strongest story to a prompt",
      text: "Read all 7 Common App prompts. Pick the one that best fits the story you most want to tell, not the one that sounds most impressive. Prompt 7 (open topic) is fine if no structured prompt fits.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Draft to 800 words first",
      text: "Aim long on draft 1 — roughly 800 words — so you can cut. The 650-word limit will force discipline later. Don't self-edit while drafting.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Cut to 650 words by removing abstraction",
      text: "Delete every sentence that states a lesson, claims an emotion, or summarizes a category. Keep the concrete scenes, specific verbs, and the one or two reflective lines that emerged from real thinking.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Read aloud and revise for voice",
      text: "Read the full essay aloud. Any sentence that doesn't sound like you in conversation should be rewritten or cut. Voice consistency is the most common failure point in otherwise-strong drafts.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Score the draft against the rubric",
      text: "Run the draft through a rubric-based scorer (or a counselor/teacher) for content, structure, and voice feedback. Revise based on the lowest-scoring dimension first. Repeat until all three score above 80.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many Common App essay prompts are there for 2026-2027?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are 7 Common App essay prompts for the 2026-2027 cycle. You choose one and write a single 650-word personal statement in response.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Common App essay word limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Common App personal statement is capped at 650 words. The minimum is 250 words, but virtually all competitive applications come in between 600 and 650.",
      },
    },
    {
      "@type": "Question",
      name: "Did the Common App essay prompts change for 2026-2027?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Common App typically holds essay prompts steady year over year, with occasional minor edits. The 2026-2027 prompts are functionally the same as the 2025-2026 cycle's. Always verify on the official Common Application website before drafting.",
      },
    },
    {
      "@type": "Question",
      name: "Which Common App prompt is the easiest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no 'easy' prompt. Each prompt rewards different kinds of stories. The right prompt is the one that fits the essay you actually need to write. Picking based on perceived ease is a mistake; picking based on fit produces the strongest essays.",
      },
    },
    {
      "@type": "Question",
      name: "Do all colleges use the Common App?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most selective four-year U.S. universities use the Common Application. A handful (like the University of California system, Georgetown, and MIT) use their own application platform. Always check each school's specific application requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Should I write a different essay for each college that uses the Common App?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Common App personal statement is one essay sent to every Common App school. You can edit between cycles but the same essay is shared across all your Common App applications. School-specific supplements are separate.",
      },
    },
  ],
};

export default function CommonAppPromptsPage() {
  return (
    <article className="pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Common App Essay Prompts 2026-2027" }]} />

        <header className="text-center mt-6 mb-12">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            All 7 prompts · 650-word personal statement · 2026-2027 cycle
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 52px)", lineHeight: "1.05", letterSpacing: "-0.02em" }}
          >
            Common App Essay Prompts 2026-2027
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            All 7 prompts, explained one by one. Strategy, common mistakes, real angles.
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Score your draft against the rubric
          </Link>
        </header>

        <section className="not-prose mb-12 rounded-2xl border border-hair bg-cream px-7 py-6">
          <h2 className="text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}>
            How many Common App essay prompts are there for 2026-2027?
          </h2>
          <p className="text-ink-2 leading-relaxed">
            There are <strong className="text-ink">7 Common App essay prompts</strong> for the 2026-2027 admissions cycle. You choose exactly one and write a single <strong className="text-ink">650-word</strong> personal statement that the Common Application sends to every Common App school you apply to — you do not write a different essay for each college. The minimum length is 250 words, but virtually every competitive application lands between 600 and 650 words. The seven prompts cover background and identity, challenge or failure, questioned beliefs, gratitude, personal growth, an engaging topic, and an open-topic option (Prompt 7) where you can submit on any subject of your choice. The Common App typically holds prompts steady year over year, with the 2026-2027 set functionally identical to 2025-2026; always verify on the official Common Application website before drafting. Pick the prompt that fits the essay you most want to write, not the one that sounds most impressive.
          </p>
        </section>

        {/* Prompts at-a-glance comparison table */}
        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            All 7 Prompts at a Glance
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="bg-[#FAEEEA]">
                  <tr>
                    <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">#</th>
                    <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Theme</th>
                    <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {PROMPTS.map((p, i) => (
                    <tr key={p.number} className={i === PROMPTS.length - 1 ? "" : "border-b border-hair"}>
                      <td className="px-3 sm:px-5 py-3 text-ink font-semibold tabular-nums">{p.number}</td>
                      <td className="px-3 sm:px-5 py-3">
                        <a href={`#prompt-${p.number}`} className="!text-ink !no-underline hover:!text-oxblood font-medium">
                          {p.shortName}
                        </a>
                      </td>
                      <td className="px-3 sm:px-5 py-3 text-ink-2">{p.whoItsFor.split(".")[0]}.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-5">
            Quick Index
          </p>
          <ol className="space-y-1 max-w-2xl mx-auto pl-0 list-none">
            {PROMPTS.map((p) => (
              <li key={p.number} className="flex gap-3 items-baseline">
                <span className="text-[11px] font-semibold text-pencil tabular-nums w-8">#{p.number}</span>
                <a href={`#prompt-${p.number}`} className="!text-ink !no-underline hover:!text-oxblood font-medium">
                  {p.shortName}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <div className="prose prose-slate max-w-none [&>h2]:mt-12 [&>h2]:mb-3">
          <h2>The Foundational Question for All 7</h2>
          <p>
            Before strategy on any specific prompt, the prompts themselves are not what readers grade. They&apos;re scaffolding. The grade is on what your essay reveals about who you are and how you think. The prompt that produces your strongest essay is the prompt you should pick. Don&apos;t pick a prompt because it sounds intellectual or because you assume readers expect it. Pick the one that lets you write the truest version of an essay only you could write.
          </p>
        </div>

        {/* Each prompt as a deep section */}
        {PROMPTS.map((p) => (
          <section key={p.number} id={`prompt-${p.number}`} className="mt-16 scroll-mt-24">
            <p className="text-center text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-3">
              Prompt {p.number}
            </p>
            <h2
              className="text-center text-ink mb-5"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(24px, 3vw, 30px)", letterSpacing: "-0.01em" }}
            >
              {p.shortName}
            </h2>
            <blockquote className="text-center font-serif italic text-lg md:text-xl text-ink-2 leading-snug max-w-2xl mx-auto mb-8 px-4">
              &ldquo;{p.text}&rdquo;
            </blockquote>
            <div className="prose prose-slate max-w-none">
              <h3>Who this prompt is for</h3>
              <p>{p.whoItsFor}</p>
              <h3>How to approach it</h3>
              <p>{p.strategy}</p>
              <h3>Common mistakes</h3>
              <ul>
                {p.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
              <h3>Example angles</h3>
              <ul>
                {p.exampleAngles.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </section>
        ))}

        {/* Mid-page CTA */}
        <div className="not-prose my-14 text-center max-w-xl mx-auto rounded-2xl bg-[#FAEEEA] border border-[#E8C9C2] py-8 px-7">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-3">
            Score your draft
          </p>
          <p className="text-ink font-bold text-lg mb-4">
            How does your Common App essay actually score?
          </p>
          <p className="text-pencil text-sm mb-6">
            Paste your draft, get a rubric-based score on Content, Structure, Voice, and specificity, plus line-level feedback in 60 seconds.
          </p>
          <Link href="/editor" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink !text-white !no-underline text-sm font-medium hover:bg-oxblood hover:!text-white transition-all">
            Score my essay
          </Link>
        </div>

        <section className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-12 [&>h2]:mb-5">
          <h2>The 5 Things Every Common App Essay Needs</h2>
          <p>
            Independent of prompt, accepted essays at selective schools share a small set of features. The first is <strong>specificity</strong> — concrete observable detail rather than abstract claims. &ldquo;I learned to persevere&rdquo; loses to &ldquo;I recalculated the buffer concentration from scratch because it was the only variable I hadn&apos;t questioned yet.&rdquo;
          </p>
          <p>
            The second is <strong>intellectual honesty</strong>. The strongest essays don&apos;t resolve too neatly. They sit with discomfort, acknowledge uncertainty, or describe a change in thinking without claiming the new understanding is final. Readers are tired of growth arcs.
          </p>
          <p>
            The third is <strong>voice consistency</strong>. The essay should sound like you across all 650 words. If the opening is conversational and the closing is formal, the reader feels the seams. Read it aloud; the parts that don&apos;t sound like you should go.
          </p>
          <p>
            The fourth is <strong>active verbs and concrete nouns</strong>. Adjective stacks (&ldquo;incredibly complex and multifaceted challenge&rdquo;) lose to specific nouns (&ldquo;the proof I couldn&apos;t get past for three weeks&rdquo;). Most weak Common App essays are weak at the sentence level, not the structural level.
          </p>
          <p>
            The fifth is <strong>resisting the obvious move</strong>. The first idea you have for a prompt is the idea every other applicant also has. Sit with the prompt for a day. The second or third idea is usually the one worth writing.
          </p>

          <h2>FAQ</h2>
          <div className="not-prose space-y-3 max-w-2xl mx-auto">
            {faqSchema.mainEntity.map((q) => (
              <details key={q.name} className="border border-hair rounded-xl px-5 py-4 bg-cream">
                <summary className="font-medium text-ink cursor-pointer">{q.name}</summary>
                <p className="mt-3 text-ink-2 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-pencil mt-10 italic">
          Last verified {LAST_VERIFIED}. Always confirm prompts on the official Common Application website before drafting.
        </p>

        <div className="text-center mt-14 pt-8 border-t border-hair">
          <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Ready to draft?
          </p>
          <Link href="/editor" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Score your essay
          </Link>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link href="/ivy-league-essay-examples" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Ivy essay examples
            </Link>
            <Link href="/common-app-essay-help" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Common App help
            </Link>
            <Link href="/how-to-improve-college-essay" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              How to improve your essay
            </Link>
            <Link href="/blog" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
