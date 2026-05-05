import type { School, SchoolRichContent as SchoolRichContentType } from "@/tools/schools";

type Variant = "why" | "score";

function toArticle(type: string): string {
  return type.toLowerCase() === "public" ? "a public" : "a private";
}

function fallbackAdmitContext(school: School): string {
  const sizeClue =
    school.category === "Liberal Arts"
      ? "Liberal arts readers at this size weigh voice and thought process more than credentials; the essay is where fit gets decided."
      : school.category === "Top Tech / STEM"
        ? "STEM-heavy admissions at this tier weigh evidence of making, breaking, and iterating more than polished prose."
        : school.category === "Ivy League"
          ? "Reviewers at this tier see tens of thousands of academically qualified applicants, so supplementals are where fit and character do the work."
          : school.category === "Top Public"
            ? "At a research-scale public flagship, the essays are where you differentiate yourself from thousands of similarly qualified applicants."
            : "Selective admissions at this tier weigh specificity and fit; supplementals are where applicants separate themselves from the pile.";
  return `${school.name} is ${toArticle(school.type)} ${school.category.toLowerCase()} school in ${school.location}, known for ${school.knownFor}. ${sizeClue}`;
}

function fallbackOpeningAngles(school: School): string[] {
  return [
    `Anchor your opening in a specific scene - a moment at work, a classroom argument, a family kitchen - that shows how you think. ${school.shortName} readers see thousands of generic openings; the specific one is the one they remember.`,
    `Start with a question you genuinely cannot stop thinking about, then pivot toward what drew you to ${school.shortName}'s ${school.knownFor.split(",")[0]}. An unanswered question is more interesting than a tidy conclusion.`,
    `Open with an object, routine, or place that only makes sense inside your life. Do not spend three lines explaining it - show yourself using it and trust the reader to catch up.`,
  ];
}

function fallbackCommonMistakes(school: School): string[] {
  return [
    `Reciting ${school.shortName}'s reputation, rankings, or history back to the admissions office. Reviewers wrote the brochure - they are looking for what is specific to you.`,
    `Naming programs, courses, or professors you have not actually engaged with. If you cite something, be ready to explain why it matters for your plan.`,
    `Writing about ${school.location} as if it is ${school.shortName}'s main pitch. The school is the subject; the city is the backdrop.`,
  ];
}

function fallbackFaq(school: School, variant: Variant): { question: string; answer: string }[] {
  const wordLimitAnswer = school.whyUsWordLimit
    ? `The most recent "Why ${school.shortName}" supplemental has run around ${school.whyUsWordLimit} words. Word limits can change each admissions cycle, so verify the cap on the official ${school.name} application before you finalize your draft.`
    : `"Why ${school.shortName}" word limits change each admissions cycle. Check the current ${school.name} application for the exact cap before finalizing your draft. Whatever the count, specificity and verifiable detail outperform length.`;

  const shared = [
    {
      question: `What is the word limit for the "Why ${school.shortName}" essay?`,
      answer: wordLimitAnswer,
    },
    {
      question: `What do ${school.shortName} admissions officers look for in the essays?`,
      answer: `${school.shortName} reviewers read for specificity, honest voice, and evidence you understand what ${school.shortName} is actually known for: ${school.knownFor}. Generic praise and rankings language rarely move the needle in a selective pool.`,
    },
    {
      question: `Do I need to name specific ${school.shortName} programs, professors, or courses?`,
      answer: `If you name them, make them real and relevant. Reviewers know the faculty list better than you do, so citing a professor or course works only if it connects to something specific in your experience. Generic program name-drops can hurt more than help.`,
    },
  ];

  if (variant === "why") {
    shared.push({
      question: `How do I start my "Why ${school.shortName}" essay?`,
      answer: `Skip the hook about ${school.shortName}'s history or motto. Start with a specific scene, question, or artifact from your own life, and let the ${school.shortName} fit emerge naturally. A good "Why" essay is really a "Why me at ${school.shortName}" essay.`,
    });
    shared.push({
      question: `Can I use AI to write my ${school.shortName} supplemental essay?`,
      answer: `Use AI to brainstorm, deconstruct prompts, and pressure-test your draft - but do not paste AI prose into your application. ${school.shortName} readers are fluent in AI voice and screen for it. Use tools like this brainstormer to find angles and programs, then write in your own voice.`,
    });
  } else {
    shared.push({
      question: `How does the ${school.shortName} essay scorer evaluate my draft?`,
      answer: `Your essay is graded on content and message (30), structure (25), voice and style (25), specificity and ${school.shortName} fit (10), and grammar and mechanics (10). You get line-level feedback, a rubric score, and the single change that would most improve your draft.`,
    });
    shared.push({
      question: `Is the ${school.shortName} essay scorer free?`,
      answer: `Yes. Paste your draft and get a full rubric-based score with ${school.shortName}-specific fit feedback in under 60 seconds. No signup required for a first pass.`,
    });
  }

  return shared;
}

function buildRichSource(school: School, variant: Variant): SchoolRichContentType {
  const hand = school.rich;
  return {
    admitContext: hand?.admitContext ?? fallbackAdmitContext(school),
    currentPrompts: hand?.currentPrompts ?? [],
    openingAngles:
      hand?.openingAngles && hand.openingAngles.length > 0
        ? hand.openingAngles
        : fallbackOpeningAngles(school),
    commonMistakes:
      hand?.commonMistakes && hand.commonMistakes.length > 0
        ? hand.commonMistakes
        : fallbackCommonMistakes(school),
    faq: hand?.faq && hand.faq.length > 0 ? hand.faq : fallbackFaq(school, variant),
  };
}

function buildBreadcrumbs(school: School, variant: Variant) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
  const pageName =
    variant === "why"
      ? `"Why ${school.shortName}" Essay Brainstormer`
      : `${school.shortName} Essay Scorer`;
  const pathSuffix = variant === "why" ? `why-${school.slug}-essay` : `score-${school.slug}-essay`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Free Essay Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: pageName, item: `${siteUrl}/tools/${pathSuffix}` },
    ],
  };
}

export function SchoolRichSections({
  school,
  variant = "why",
}: {
  school: School;
  variant?: Variant;
}) {
  const rich = buildRichSource(school, variant);
  const hasHandCuratedPrompts = (school.rich?.currentPrompts?.length ?? 0) > 0;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: rich.faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  const breadcrumbsJsonLd = buildBreadcrumbs(school, variant);

  const officialPromptsSearch = `https://www.google.com/search?q=${encodeURIComponent(
    `${school.name} supplemental essay prompts current year`,
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <section className="mt-16">
        <h2
          className="text-2xl font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Context on {school.shortName} admissions
        </h2>
        <p className="text-ink-2 text-[15px] leading-relaxed max-w-2xl">
          {rich.admitContext}
        </p>
      </section>

      {hasHandCuratedPrompts ? (
        <section className="mt-12">
          <h2
            className="text-2xl font-extrabold text-ink mb-4"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Current {school.shortName} supplemental prompts
          </h2>
          <p className="text-ink-2 text-sm leading-relaxed mb-4">
            These are the prompts {school.shortName} has recently used. Always verify against the official {school.shortName} application before submitting.
          </p>
          <div className="space-y-3">
            {rich.currentPrompts.map((p, i) => (
              <div
                key={i}
                className="rounded-xl bg-cream border border-hair p-5"
              >
                <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-2">
                  Prompt {i + 1}
                </p>
                <p className="text-ink text-[14.5px] leading-relaxed italic">&quot;{p}&quot;</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-12">
          <h2
            className="text-2xl font-extrabold text-ink mb-3"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Find the current {school.shortName} supplemental prompts
          </h2>
          <p className="text-ink-2 text-[15px] leading-relaxed max-w-2xl mb-4">
            {school.shortName} updates its supplemental prompts each admissions cycle. We do not publish a copy here because outdated prompts in your essay are a red flag to reviewers. Pull the current prompts straight from the official {school.name} application.
          </p>
          <a
            href={officialPromptsSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream border border-hair text-ink font-medium text-sm hover:bg-cream hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all"
          >
            Find this year&apos;s {school.shortName} prompts →
          </a>
        </section>
      )}

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-ink mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Three opening angles that work for {school.shortName}
        </h2>
        <ol className="space-y-3">
          {rich.openingAngles.map((a, i) => (
            <li
              key={i}
              className="rounded-xl bg-cream border border-hair p-5 text-ink text-[15px] leading-relaxed"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-paper-2 text-oxblood text-xs font-bold mr-2 align-text-top">
                {i + 1}
              </span>
              {a}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-ink mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Mistakes {school.shortName} reviewers see every year
        </h2>
        <ul className="space-y-2">
          {rich.commonMistakes.map((m, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-5"
            >
              <span className="text-[#B91C1C] font-bold flex-shrink-0">→</span>
              <span className="text-ink text-[15px] leading-relaxed">{m}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-ink mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          {school.shortName} essay FAQ
        </h2>
        <div className="space-y-4">
          {rich.faq.map((q, i) => (
            <details
              key={i}
              className="group rounded-xl bg-cream border border-hair p-5"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between text-ink font-semibold text-[15px]">
                {q.question}
                <span className="text-oxblood text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-ink-2 text-[14.5px] leading-relaxed mt-3">
                {q.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
