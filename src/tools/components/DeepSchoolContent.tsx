import type { School } from "@/tools/schools";
import Link from "next/link";

type Variant = "why" | "score";

function wordLimitBucket(limit: number | undefined): "micro" | "short" | "medium" | "long" | "unknown" {
  if (!limit) return "unknown";
  if (limit <= 100) return "micro";
  if (limit <= 175) return "short";
  if (limit <= 300) return "medium";
  return "long";
}

function structuralBreakdown(school: School): { label: string; words: string; purpose: string }[] {
  const limit = school.whyUsWordLimit;
  const bucket = wordLimitBucket(limit);

  if (bucket === "micro") {
    return [
      { label: "Opening", words: "one sentence (~15 words)", purpose: `A specific scene, question, or artifact from your life. No setup. ${school.shortName} readers skim fast — earn the second sentence.` },
      { label: "Bridge", words: "one sentence (~15 words)", purpose: `Pivot the specific detail toward something at ${school.shortName}. This is the hinge that turns a personal sentence into a fit sentence.` },
      { label: "Specific evidence", words: "two sentences (~50 words)", purpose: `Name something real at ${school.shortName} — a course, professor, program, tradition — and explain what you would actually do with it.` },
      { label: "Close", words: "one sentence (~20 words)", purpose: `A forward-looking beat that connects your evidence to who you'd be on campus. Avoid restating the opening.` },
    ];
  }
  if (bucket === "short") {
    return [
      { label: "Scene opening", words: "30–40 words", purpose: `Drop into a concrete moment from your life. A physics lab, a kitchen prep line, a bus ride. Let the reader infer the rest of you.` },
      { label: "Interest bridge", words: "25–35 words", purpose: `Name what the scene reveals about how you think, then pivot to the version of that thinking you'd pursue at ${school.shortName}.` },
      { label: "Specific fit", words: "50–70 words", purpose: `Two ${school.shortName} specifics — a professor's research line, a course, a cross-registration option, a student group. Explain what you'd do with them.` },
      { label: "Close", words: "20–30 words", purpose: `One forward-looking beat that sounds like a sentence only you could write. Avoid the "I cannot wait" cliche.` },
    ];
  }
  if (bucket === "medium") {
    return [
      { label: "Scene opening", words: "60–90 words", purpose: `Start inside an action or object that is already specific. Trust the reader to catch up. ${school.shortName} readers see thousands of "ever since I was young" openings a week.` },
      { label: "Reflective bridge", words: "50–70 words", purpose: `What the scene taught you about how you work or what you want to understand. Keep it concrete — no abstract "this shaped me" claims.` },
      { label: "${school.shortName} evidence", words: "80–110 words", purpose: `Two to three specifics from ${school.shortName}. Name a professor, course, or program. Explain not just that it exists but what you'd do with it — a question you'd bring to office hours, a project you'd pitch.` },
      { label: "Close", words: "30–50 words", purpose: `Tie the opening scene and the ${school.shortName} evidence together. The close should sound like it could only apply to you at ${school.shortName}.` },
    ];
  }
  if (bucket === "long") {
    return [
      { label: "Scene opening", words: "~90 words", purpose: `One extended specific moment. Not three things you care about — one thing rendered in detail. Long essays die when they try to do too much.` },
      { label: "Reflective middle", words: "~100 words", purpose: `The meaning of the scene and how it connects to your intellectual pattern. Earn the reflection by showing the work that produced it.` },
      { label: "${school.shortName} specificity", words: "~120 words", purpose: `Three specifics from ${school.shortName}, with a clear throughline. Why would these particular things pull you — not just any elite school?` },
      { label: "Close", words: "~40 words", purpose: `A forward-looking image, not a summary. The reader should close the essay seeing you on ${school.shortName}'s campus doing something specific.` },
    ];
  }
  return [
    { label: "Scene opening", words: "roughly 20% of your word count", purpose: `A specific moment that shows how you think. Read it aloud — if it could open another applicant's essay, rewrite it.` },
    { label: "Reflective bridge", words: "roughly 20% of your word count", purpose: `What the scene taught you. Concrete, not abstract.` },
    { label: "${school.shortName} evidence", words: "roughly 40% of your word count", purpose: `Named programs, professors, courses, or traditions at ${school.shortName}, with explicit reasoning about how you'd use them.` },
    { label: "Close", words: "roughly 20% of your word count", purpose: `Forward-looking, specific to you at ${school.shortName}.` },
  ];
}

function categoryStrategy(school: School): { heading: string; body: string } {
  switch (school.category) {
    case "Ivy League":
      return {
        heading: `What ${school.shortName} readers weight differently from the rest of the Ivies`,
        body: `Ivy League admissions committees see applicants with near-identical academic profiles. By the time a ${school.shortName} reader reaches your supplementals, they've already confirmed you can do the work. What they're reading for is pattern — a coherent person across the Common App essay, the activities list, the ${school.shortName} supplemental, and the recommendations. A great ${school.shortName} draft doesn't introduce a new self; it reveals a specific version of the self already visible in your activities list, using detail only you could produce. Generic Ivy-league language ("rigorous academics," "intellectual community") is invisible noise at this tier.`,
      };
    case "Elite Private":
      return {
        heading: `What ${school.shortName} looks for that differs from the Ivies`,
        body: `${school.shortName} is one of the most selective private universities in the country, but readers here tend to weight specificity and fit more explicitly than their Ivy peers. The essay is often the deciding document between two academically qualified candidates. ${school.shortName} readers are looking for evidence that you have engaged with the specific culture of ${school.shortName} — not just ranked-school prestige — and that you understand what ${school.knownFor} actually means in practice. Drafts that name two concrete ${school.shortName} things with honest personal reasoning beat drafts that name five with thin connective tissue.`,
      };
    case "Top Public":
      return {
        heading: `Reading ${school.shortName}'s scale into your draft`,
        body: `${school.shortName} receives tens of thousands of applications across a wide pool. Readers move fast, and your essay has to do its work quickly. Unlike at small private schools, ${school.shortName} readers are not imagining you at a specific residential college or seminar — they're scanning for evidence that you'd contribute to a large research university where most of the learning happens in labs, clubs, and study groups rather than in small rooms. Strong ${school.shortName} drafts show independence, initiative, and a clear idea of what you'd actually do on a campus that doesn't hold your hand.`,
      };
    case "Liberal Arts":
      return {
        heading: `What liberal-arts readers at ${school.shortName} weigh`,
        body: `At ${school.shortName}, admissions readers are shaping a small class where every student is visible. That changes how they read supplementals. Voice matters more than credentials. How you think matters more than what you've accomplished. Your ${school.shortName} draft should sound like the seminar contribution you'd make in week three of a class — curious, specific, slightly surprising. Liberal arts readers are skeptical of pre-professional framing and reward intellectual openness. ${school.knownFor.split(",")[0]} is a strong thread to pull on if it genuinely reflects how you work.`,
      };
    case "Top Tech / STEM":
      return {
        heading: `What ${school.shortName} weights in STEM-heavy admissions`,
        body: `${school.shortName} admissions committees read for evidence of making, breaking, and iterating — not just strong math scores. Your supplemental should show a specific technical or creative project in detail: what you built, what you broke, what you figured out when the first three approaches failed. Generic enthusiasm about technology is a tell. ${school.shortName} readers have seen thousands of "I've always loved science" openings. The drafts that work are the ones where you can describe a specific debugging session, lab setup, or unresolved problem in a way that reveals how you actually think under pressure.`,
      };
    case "Selective Private":
      return {
        heading: `What ${school.shortName} admissions weight`,
        body: `${school.shortName} is a competitive private university where the essay does real work in the decision. Readers are looking for a coherent, specific picture of who you are and why this school in particular. Name-dropping rankings, prestige, or weather is an obvious tell that you haven't engaged with the school itself. Strong drafts name specific ${school.shortName} classes, professors, traditions, or student groups — not because ${school.shortName} requires it, but because specificity is evidence of sincere interest. ${school.knownFor.split(",")[0]} is a natural anchor if it connects to something you've actually done.`,
      };
    default:
      return {
        heading: `What ${school.shortName} looks for`,
        body: `Selective admissions at this tier reward drafts that show specific, verifiable engagement with ${school.shortName} and a coherent picture of who the applicant is beyond their stats.`,
      };
  }
}

function locationAngle(school: School): { heading: string; body: string } {
  const stateAngles: Record<string, string> = {
    Massachusetts: `${school.shortName} sits inside a dense Boston/Cambridge academic corridor — cross-registration, shared libraries, and research partnerships with neighboring institutions are real levers. A draft that references access to this ecosystem (by name, not as a vague benefit) stands out.`,
    California: `${school.location} places ${school.shortName} inside an unusually active intellectual and industry ecosystem. Applicants who reference specific California-based labs, startups, or field-work opportunities they'd pursue — not just "the weather" or "Silicon Valley" — demonstrate actual research into ${school.shortName}.`,
    "New York": `${school.location} gives ${school.shortName} applicants an unusual structural advantage: internship pipelines, off-campus research affiliations, and a commuting academic culture. Referencing how you'd use the city as a learning environment — specifically, not generally — is a stronger fit signal than naming the campus itself.`,
    Connecticut: `${school.shortName}'s setting in ${school.location} shapes the community essay prompts. A strong draft understands the difference between a residential campus town and an urban university, and references specifics (a lab, a museum, a program) that only exist at ${school.shortName}.`,
    "New Jersey": `${school.shortName} in ${school.location} runs on a residential campus model where small seminars and a strong preceptor system do a lot of the teaching. Applicants who reference this structure by name — not just "small class sizes" — signal that they've looked past the rankings.`,
    Pennsylvania: `${school.location} places ${school.shortName} in a dense undergraduate and professional-school environment. Cross-school registration and professional-school access are real levers that most applicants miss. Name them.`,
    "North Carolina": `${school.shortName}'s setting in ${school.location} and its Research Triangle proximity shape the research opportunities available to undergraduates. Mentioning a specific Triangle-adjacent lab, field site, or cross-institutional program is a stronger fit signal than weather.`,
    "Rhode Island": `${school.shortName}'s location in ${school.location} supports its open-curriculum and studio culture. Applicants who name specific cross-disciplinary courses or studio collaborations signal that they've read past the rankings.`,
  };
  const fallback = `${school.location} shapes daily life at ${school.shortName} in ways that most applicants don't reference. If your draft names a local context — a city lab, a field site, an urban/rural asymmetry — that specificity is rare enough to stand out. Avoid generic references to weather, food, or "diverse culture."`;
  return {
    heading: `Location-specific angles most ${school.shortName} applicants miss`,
    body: stateAngles[school.state] ?? fallback,
  };
}

function atAGlance(school: School): { label: string; value: string }[] {
  return [
    { label: "Type", value: `${school.type} · ${school.category}` },
    { label: "Location", value: school.location },
    { label: "Known for", value: school.knownFor },
    { label: "Why-essay word limit", value: school.whyUsWordLimit ? `${school.whyUsWordLimit} words` : "Changes annually — verify on the official application" },
  ];
}

export function DeepSchoolContent({ school, variant }: { school: School; variant: Variant }) {
  const breakdown = structuralBreakdown(school);
  const strategy = categoryStrategy(school);
  const location = locationAngle(school);
  const facts = atAGlance(school);
  const limitLabel = school.whyUsWordLimit ? `${school.whyUsWordLimit}-word` : "supplemental";

  return (
    <>
      <section className="mt-16">
        <h2
          className="text-2xl font-extrabold text-ink mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          {school.shortName} at a glance
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {facts.map((f) => (
            <div
              key={f.label}
              className="rounded-xl bg-cream border border-hair p-4"
            >
              <dt className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-1">
                {f.label}
              </dt>
              <dd className="text-ink text-[14.5px] leading-relaxed">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Structural template for a {limitLabel} &quot;Why {school.shortName}&quot; draft
        </h2>
        <p className="text-ink-2 text-[15px] leading-relaxed mb-5 max-w-2xl">
          Word count is the hardest constraint in the &quot;Why {school.shortName}&quot; essay. Here&apos;s how a strong draft at this length distributes its budget.
        </p>
        <div className="space-y-3">
          {breakdown.map((b) => (
            <div
              key={b.label}
              className="rounded-xl bg-cream border border-hair p-5"
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <span className="text-ink font-semibold text-[15px]">{b.label.replace("${school.shortName}", school.shortName)}</span>
                <span className="text-xs font-semibold text-oxblood uppercase tracking-widest">{b.words}</span>
              </div>
              <p className="text-ink-2 text-[14.5px] leading-relaxed">{b.purpose.replace(/\$\{school\.shortName\}/g, school.shortName)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          {strategy.heading}
        </h2>
        <p className="text-ink-2 text-[15px] leading-relaxed max-w-2xl">{strategy.body}</p>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          {location.heading}
        </h2>
        <p className="text-ink-2 text-[15px] leading-relaxed max-w-2xl">{location.body}</p>
      </section>

      <section className="mt-12">
        <h2
          className="text-2xl font-extrabold text-ink mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          More {school.shortName} resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href={variant === "why" ? `/tools/score-${school.slug}-essay` : `/tools/why-${school.slug}-essay`}
            className="rounded-xl bg-cream border border-hair p-4 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all"
          >
            <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-1">
              {variant === "why" ? "Score" : "Brainstorm"}
            </p>
            <p className="text-ink text-[14.5px] font-semibold">
              {variant === "why" ? `${school.shortName} Essay Scorer` : `Why ${school.shortName} Brainstormer`}
            </p>
          </Link>
          <Link
            href="/tools/essay-hook-generator"
            className="rounded-xl bg-cream border border-hair p-4 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all"
          >
            <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-1">Tool</p>
            <p className="text-ink text-[14.5px] font-semibold">Essay Hook Generator</p>
          </Link>
          <Link
            href="/tools/cliche-detector"
            className="rounded-xl bg-cream border border-hair p-4 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all"
          >
            <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-1">Tool</p>
            <p className="text-ink text-[14.5px] font-semibold">Cliche Detector</p>
          </Link>
          <Link
            href="/blog/why-this-college-essay"
            className="rounded-xl bg-cream border border-hair p-4 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all"
          >
            <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-1">Guide</p>
            <p className="text-ink text-[14.5px] font-semibold">How to Write the &quot;Why This College&quot; Essay</p>
          </Link>
        </div>
      </section>
    </>
  );
}
