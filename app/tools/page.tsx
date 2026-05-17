import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/tools/tools";
import { schools, type SchoolCategory } from "@/tools/schools";
import { prompts } from "@/tools/prompts";
import { essayTypes } from "@/tools/essayTypes";
import { rewriters } from "@/tools/rewriters";
import { topicPersonas } from "@/tools/topicPersonas";
import { ArrowRight, Sparkles, PencilLine, Search, Wand2, Target } from "lucide-react";
import { Breadcrumbs } from "@/design/Breadcrumbs";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

export const metadata: Metadata = {
  // Putting the "160+" number in the title itself gives a list/depth
  // signal the prior title was missing. "No Signup" addresses the
  // top friction objection on free-tool queries.
  title: "160+ Free AI College Essay Tools (No Signup, No Email)",
  description:
    "160+ free AI tools for college essays: hook generators, prompt deconstructors, Why-Us brainstormers for 50+ schools, and per-school essay scorers. No signup, no email.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "160+ Free AI College Essay Tools (No Signup, No Email)",
    description:
      "Hook generators, prompt deconstructors, Why-Us brainstormers for 50+ schools, per-school essay scorers. Free.",
    url: "/tools",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "160+ free AI college essay tools, no signup required" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "160+ Free AI College Essay Tools (No Signup)",
    description: "Hook generators, scorers, prompt deconstructors and more.",
    images: ["/og-image.png"],
  },
};

const schoolCategoryOrder: SchoolCategory[] = [
  "Ivy League",
  "Elite Private",
  "Top Tech / STEM",
  "Liberal Arts",
  "Top Public",
  "Selective Private",
];

const featuredSlugs = [
  "essay-hook-generator",
  "admissions-officer-simulator",
  "why-college-brainstormer",
  "essay-polish-pass",
];

const goalGroups = [
  {
    id: "start",
    title: "I need to start",
    subtitle: "Pick a topic, find an angle, write the first line.",
    icon: PencilLine,
    categories: ["Brainstorming", "Planning"] as const,
  },
  {
    id: "improve",
    title: "I have a draft",
    subtitle: "Score it, tighten it, cut the cliches.",
    icon: Wand2,
    categories: ["Analysis", "Editing"] as const,
  },
];

export default function ToolsIndex() {
  const grouped = schoolCategoryOrder.map((cat) => ({
    category: cat,
    schools: schools.filter((s) => s.category === cat),
  }));
  const commonAppPrompts = prompts.filter((p) => p.family === "Common App");
  const ucPrompts = prompts.filter((p) => p.family === "UC PIQ");
  const suppPrompts = prompts.filter((p) => p.family === "Supplemental Type");
  const richSchools = schools.filter((s) => !!s.rich);

  const totalTools =
    tools.length +
    richSchools.length * 2 +
    prompts.length +
    essayTypes.length +
    rewriters.length +
    topicPersonas.length +
    commonAppPrompts.length;

  const featured = featuredSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is (typeof tools)[number] => Boolean(t));
  const featuredSet = new Set(featuredSlugs);
  const restTools = tools.filter((t) => !featuredSet.has(t.slug));

  const toolsByGoal = goalGroups.map((g) => ({
    ...g,
    tools: restTools.filter((t) =>
      (g.categories as readonly string[]).includes(t.category)
    ),
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${baseUrl}/tools` },
    ],
  };

  // Featured tools as an ItemList (the four cards above the fold are what
  // we most want indexed and surfaced as sitelinks).
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/tools#itemlist`,
    name: "Featured Free AI College Essay Tools",
    numberOfItems: featured.length,
    itemListElement: featured.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/tools/${t.slug}`,
      name: t.title,
    })),
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/tools#collectionpage`,
    url: `${baseUrl}/tools`,
    name: "Free AI College Essay Tools",
    description:
      "160+ free AI tools for college essays: hook generators, prompt analyzers, per-school brainstormers, and essay scorers.",
    isPartOf: { "@id": `${baseUrl}/#website` },
    mainEntity: { "@id": `${baseUrl}/tools#itemlist` },
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />

      {/* Hero */}
      <section className="mb-10 sm:mb-14 grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-10 items-end">
        <div>
          <p className="text-[11px] sm:text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
            Free Tools · No signup
          </p>
          <h1 className="mb-3 sm:mb-4 text-[28px] sm:text-[36px] md:text-[44px] leading-[1.1] tracking-[-0.01em] font-serif">
            {totalTools}+ free AI tools for every stage of your college essay.
          </h1>
          <p className="text-ink-2 text-[15px] sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 max-w-xl">
            Pick a tool, paste your draft or topic, get feedback in seconds.
            Built on the same AI we use to score essays for 20,000+ students.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/try"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-ink text-cream font-semibold text-[13px] sm:text-sm hover:bg-oxblood transition-colors"
            >
              Score my full essay free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#start-here"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-hair bg-cream text-ink font-semibold text-[13px] sm:text-sm hover:bg-white transition-colors"
            >
              Browse tools
            </a>
          </div>
        </div>
        <aside className="rounded-2xl border border-hair bg-cream p-5 sm:p-6 text-sm text-ink-2 leading-relaxed">
          <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
            Not sure where to start?
          </p>
          <ul className="space-y-2.5">
            <li className="flex gap-2">
              <span className="text-oxblood font-bold">1.</span>
              <span>No topic yet? Try the <Link href="/tools/essay-topic-generator" className="underline hover:text-oxblood">Topic Generator</Link>.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-oxblood font-bold">2.</span>
              <span>Got a topic, stuck on the opener? <Link href="/tools/essay-hook-generator" className="underline hover:text-oxblood">Hook Generator</Link>.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-oxblood font-bold">3.</span>
              <span>Have a full draft? <Link href="/tools/admissions-officer-simulator" className="underline hover:text-oxblood">AO Simulator</Link>.</span>
            </li>
          </ul>
        </aside>
      </section>

      {/* Featured */}
      <section id="start-here" className="mb-16 scroll-mt-28">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-xl sm:text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Most popular tools
          </h2>
          <p className="text-sm text-pencil">Start here. These four cover 80% of use cases.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 hover:bg-white/75 hover:shadow-[0_12px_40px_rgba(99,102,241,0.14)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-paper-2 text-oxblood">
                  {tool.category}
                </span>
                <span className="text-xs text-pencil flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Free
                </span>
              </div>
              <h3
                className="text-xl font-extrabold text-ink mb-2 group-hover:text-oxblood transition-colors leading-snug"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
              >
                {tool.title}
              </h3>
              <p className="text-pencil text-sm leading-relaxed mb-5">{tool.description}</p>
              <span className="flex items-center gap-1 text-sm font-medium text-oxblood group-hover:gap-2 transition-all">
                Open tool <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* By goal */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-xl sm:text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Browse by goal
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {toolsByGoal.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.id}
                className="rounded-2xl border border-hair bg-cream p-6"
              >
                <div className="flex items-center gap-3 mb-1">
                  <Icon className="w-5 h-5 text-oxblood" />
                  <h3
                    className="text-lg font-extrabold text-ink"
                    style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
                  >
                    {g.title}
                  </h3>
                </div>
                <p className="text-sm text-pencil mb-4">{g.subtitle}</p>
                <ul className="space-y-1">
                  {g.tools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tools/${t.slug}`}
                        className="flex items-start justify-between gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-white/80 transition-colors group"
                      >
                        <span className="text-sm text-ink group-hover:text-oxblood font-medium">
                          {t.shortTitle}
                        </span>
                        <span className="text-[10px] font-semibold text-pencil uppercase tracking-wider mt-1 shrink-0">
                          {t.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rewriters + essay types + topics in one compact row */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-xl sm:text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Specialty tools
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <details className="group rounded-2xl border border-hair bg-cream p-6" open>
            <summary className="cursor-pointer list-none">
              <h3
                className="text-base font-extrabold text-ink mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Rewriters
              </h3>
              <p className="text-xs text-pencil mb-3">
                {rewriters.length} length and tone rewriters. Voice-preserving.
              </p>
            </summary>
            <ul className="space-y-1 mt-2">
              {rewriters.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/tools/${r.slug}`}
                    className="block text-sm text-ink hover:text-oxblood py-1"
                  >
                    {r.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <details className="group rounded-2xl border border-hair bg-cream p-6" open>
            <summary className="cursor-pointer list-none">
              <h3
                className="text-base font-extrabold text-ink mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Essay-type scorers
              </h3>
              <p className="text-xs text-pencil mb-3">
                {essayTypes.length} formats, each with its own rubric.
              </p>
            </summary>
            <ul className="space-y-1 mt-2">
              {essayTypes.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}-essay-scorer`}
                    className="block text-sm text-ink hover:text-oxblood py-1"
                  >
                    {t.shortName} scorer
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <details className="group rounded-2xl border border-hair bg-cream p-6" open>
            <summary className="cursor-pointer list-none">
              <h3
                className="text-base font-extrabold text-ink mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Topic generators
              </h3>
              <p className="text-xs text-pencil mb-3">
                {topicPersonas.length} applicant types. Each avoids the cliches of its group.
              </p>
            </summary>
            <ul className="space-y-1 mt-2">
              {topicPersonas.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/tools/topics-for-${p.slug}`}
                    className="block text-sm text-ink hover:text-oxblood py-1"
                  >
                    Topics for {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      {/* By prompt */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-xl sm:text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            By essay prompt
          </h2>
          <p className="text-sm text-pencil">
            Hook generators (and deconstructors for Common App) - pre-tuned to each prompt.
          </p>
        </div>
        <div className="space-y-8">
          {[
            { family: "Common App", items: commonAppPrompts, withDeconstruct: true },
            { family: "UC PIQ", items: ucPrompts, withDeconstruct: false },
            { family: "Supplemental Type", items: suppPrompts, withDeconstruct: false },
          ].map((group) =>
            group.items.length === 0 ? null : (
              <div key={group.family}>
                <h3 className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
                  {group.family}
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {group.items.map((p) => (
                    <div
                      key={p.slug}
                      className="flex items-center gap-2 rounded-lg bg-cream border border-hair px-3 py-2"
                    >
                      <span className="text-sm text-ink font-medium flex-1 truncate">
                        {p.shortName}
                      </span>
                      <Link
                        href={`/tools/hook-${p.slug}`}
                        className="text-xs font-semibold text-oxblood hover:text-ink px-2 py-1 rounded hover:bg-paper-2 transition-colors"
                      >
                        Hook
                      </Link>
                      {group.withDeconstruct && (
                        <Link
                          href={`/tools/deconstruct-${p.slug}`}
                          className="text-xs font-semibold text-oxblood hover:text-ink px-2 py-1 rounded hover:bg-paper-2 transition-colors"
                        >
                          Deconstruct
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* By school - one row per school, Why + Scorer on same line */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-xl sm:text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            By school
          </h2>
          <p className="text-sm text-pencil">
            {schools.length} schools. Each has a Why-Us brainstormer and an essay scorer.
          </p>
        </div>
        <div className="space-y-6">
          {grouped.map((group, i) =>
            group.schools.length === 0 ? null : (
              <details
                key={group.category}
                className="rounded-2xl border border-hair bg-cream overflow-hidden"
                open={i < 2}
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between hover:bg-white/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-oxblood" />
                    <h3 className="text-sm font-bold text-ink uppercase tracking-widest">
                      {group.category}
                    </h3>
                    <span className="text-xs text-pencil">({group.schools.length})</span>
                  </div>
                  <span className="text-xs text-pencil group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <div className="border-t border-hair divide-y divide-hair/60">
                  {group.schools.map((school) => (
                    <div
                      key={school.slug}
                      className="flex items-center justify-between gap-3 px-5 py-2.5 hover:bg-white/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-ink truncate">
                        {school.shortName}
                      </span>
                      <div className="flex gap-2 shrink-0">
                        <Link
                          href={`/tools/why-${school.slug}-essay`}
                          className="text-xs font-semibold text-oxblood hover:text-ink px-2.5 py-1 rounded hover:bg-paper-2 transition-colors"
                        >
                          Why-Us
                        </Link>
                        <Link
                          href={`/tools/score-${school.slug}-essay`}
                          className="text-xs font-semibold text-oxblood hover:text-ink px-2.5 py-1 rounded hover:bg-paper-2 transition-colors"
                        >
                          Scorer
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-oxblood via-[#7C3AED] to-[#8B5CF6] p-6 sm:p-8 md:p-12 text-white shadow-[0_8px_32px_rgba(99,102,241,0.3)]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4" />
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest opacity-90">
              One tool that does it all
            </p>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 leading-tight"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Skip the tool-hopping. Score your full essay in 60 seconds.
          </h2>
          <p className="text-sm sm:text-base opacity-95 mb-5 sm:mb-6 leading-relaxed">
            Ivy Admit&apos;s essay editor combines hooks, cliche detection, line-by-line
            scoring, and school-specific feedback in one place. Trained on 500+ Ivy
            League accepted essays.
          </p>
          <Link
            href="/try"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-oxblood font-semibold text-[13px] sm:text-sm hover:bg-white/95 transition-colors"
          >
            Score my essay free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
