import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/tools/tools";
import { schools, type SchoolCategory } from "@/tools/schools";
import { prompts } from "@/tools/prompts";
import { essayTypes } from "@/tools/essayTypes";
import { rewriters } from "@/tools/rewriters";
import { topicPersonas } from "@/tools/topicPersonas";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI College Essay Tools",
  description:
    "160+ free AI tools for college essays: hook generators, prompt analyzers, per-school Why-Us brainstormers, and per-school essay scorers. No signup required.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free AI College Essay Tools",
    description:
      "160+ free AI tools for college essays: hook generators, prompt analyzers, per-school Why-Us brainstormers, and per-school essay scorers. No signup required.",
    url: "/tools",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ivy Admit College Essay Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI College Essay Tools",
    images: ["/og-image.png"],
  },
};

const categoryColors: Record<string, string> = {
  Brainstorming: "bg-paper-2 text-oxblood",
  Analysis: "bg-paper-2 text-oxblood",
  Editing: "bg-paper-2 text-oxblood",
  Planning: "bg-paper-2 text-forest",
};

const schoolCategoryOrder: SchoolCategory[] = [
  "Ivy League",
  "Elite Private",
  "Top Tech / STEM",
  "Liberal Arts",
  "Top Public",
  "Selective Private",
];

export default function ToolsIndex() {
  const grouped = schoolCategoryOrder.map((cat) => ({
    category: cat,
    schools: schools.filter((s) => s.category === cat),
  }));
  const promptFamilies = ["Common App", "UC PIQ", "Supplemental Type"] as const;
  const groupedPrompts = promptFamilies.map((fam) => ({
    family: fam,
    items: prompts.filter((p) => p.family === fam),
  }));
  const richSchools = schools.filter((s) => !!s.rich);
  const commonAppPrompts = prompts.filter((p) => p.family === "Common App");
  const totalTools =
    tools.length +
    richSchools.length * 2 +
    prompts.length +
    essayTypes.length +
    rewriters.length +
    topicPersonas.length +
    commonAppPrompts.length;

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-16 pt-28 md:pt-36 pb-20">
      <div className="mb-14 max-w-2xl">
        <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
          Tools
        </p>
        <h1 className="mb-4" style={{ fontSize: "40px", lineHeight: "48px" }}>
          Free AI College Essay Tools
        </h1>
        <p className="text-ink-2 text-lg leading-relaxed">
          {totalTools}+ free tools for every stage of the essay process. No signup. Built on the same AI we use to score essays for 20,000+ students.
        </p>
      </div>

      <section className="mb-16">
        <h2
          className="text-2xl font-extrabold text-ink mb-6"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Core tools
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 hover:bg-white/75 hover:shadow-[0_12px_40px_rgba(99,102,241,0.14)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[tool.category] ?? "bg-paper-2 text-ink-2"}`}
                >
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
              <p className="text-pencil text-sm leading-relaxed mb-5">
                {tool.description}
              </p>
              <span className="flex items-center gap-1 text-sm font-medium text-oxblood group-hover:gap-2 transition-all">
                Open tool <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Why-Us brainstormers by school
          </h2>
          <p className="text-sm text-pencil">
            {schools.length} schools. Each generates specific professors, courses, and programs.
          </p>
        </div>
        <div className="space-y-8">
          {grouped.map((group) =>
            group.schools.length === 0 ? null : (
              <div key={group.category}>
                <h3 className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
                  {group.category}
                </h3>
                <div className="grid md:grid-cols-3 gap-2">
                  {group.schools.map((school) => (
                    <Link
                      key={school.slug}
                      href={`/tools/why-${school.slug}-essay`}
                      className="block rounded-lg bg-cream backdrop-blur-sm border border-hair px-3 py-2.5 text-sm text-ink hover:bg-white/80 hover:text-oxblood hover:shadow-[0_2px_12px_rgba(99,102,241,0.08)] transition-all"
                    >
                      Why {school.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Essay scorers by school
          </h2>
          <p className="text-sm text-pencil">
            {schools.length} schools. Paste a draft, get rubric-based feedback.
          </p>
        </div>
        <div className="space-y-8">
          {grouped.map((group) =>
            group.schools.length === 0 ? null : (
              <div key={group.category}>
                <h3 className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
                  {group.category}
                </h3>
                <div className="grid md:grid-cols-3 gap-2">
                  {group.schools.map((school) => (
                    <Link
                      key={school.slug}
                      href={`/tools/score-${school.slug}-essay`}
                      className="block rounded-lg bg-cream backdrop-blur-sm border border-hair px-3 py-2.5 text-sm text-ink hover:bg-white/80 hover:text-oxblood hover:shadow-[0_2px_12px_rgba(99,102,241,0.08)] transition-all"
                    >
                      {school.shortName} scorer
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Hook generators by prompt
          </h2>
          <p className="text-sm text-pencil">
            {prompts.length} prompts. Pre-tuned hooks for Common App, UC, and supplementals.
          </p>
        </div>
        <div className="space-y-8">
          {groupedPrompts.map((group) =>
            group.items.length === 0 ? null : (
              <div key={group.family}>
                <h3 className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
                  {group.family}
                </h3>
                <div className="grid md:grid-cols-3 gap-2">
                  {group.items.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/tools/hook-${p.slug}`}
                      className="block rounded-lg bg-cream backdrop-blur-sm border border-hair px-3 py-2.5 text-sm text-ink hover:bg-white/80 hover:text-oxblood hover:shadow-[0_2px_12px_rgba(99,102,241,0.08)] transition-all"
                    >
                      {p.shortName} hook
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Essay-type scorers
          </h2>
          <p className="text-sm text-pencil">
            {essayTypes.length} essay types. Each tuned for the quirks of that format.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {essayTypes.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}-essay-scorer`}
              className="block rounded-lg bg-cream backdrop-blur-sm border border-hair px-3 py-2.5 text-sm text-ink hover:bg-white/80 hover:text-oxblood hover:shadow-[0_2px_12px_rgba(99,102,241,0.08)] transition-all"
            >
              {t.shortName} scorer
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Rewriters
          </h2>
          <p className="text-sm text-pencil">
            {rewriters.length} length and tone rewriters. Voice-preserving edits in one click.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {rewriters.map((r) => (
            <Link
              key={r.slug}
              href={`/tools/${r.slug}`}
              className="block rounded-lg bg-cream backdrop-blur-sm border border-hair px-3 py-2.5 text-sm text-ink hover:bg-white/80 hover:text-oxblood hover:shadow-[0_2px_12px_rgba(99,102,241,0.08)] transition-all"
            >
              {r.shortName}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Topic generators by applicant type
          </h2>
          <p className="text-sm text-pencil">
            {topicPersonas.length} persona-tuned generators. Each actively avoids the cliches of its group.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {topicPersonas.map((p) => (
            <Link
              key={p.slug}
              href={`/tools/topics-for-${p.slug}`}
              className="block rounded-lg bg-cream backdrop-blur-sm border border-hair px-3 py-2.5 text-sm text-ink hover:bg-white/80 hover:text-oxblood hover:shadow-[0_2px_12px_rgba(99,102,241,0.08)] transition-all"
            >
              Topics for {p.shortName}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <h2
            className="text-2xl font-extrabold text-ink"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Common App prompt deconstructors
          </h2>
          <p className="text-sm text-pencil">
            {commonAppPrompts.length} deep-dives into the hidden question behind each Common App prompt.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {commonAppPrompts.map((p) => (
            <Link
              key={p.slug}
              href={`/tools/deconstruct-${p.slug}`}
              className="block rounded-lg bg-cream backdrop-blur-sm border border-hair px-3 py-2.5 text-sm text-ink hover:bg-white/80 hover:text-oxblood hover:shadow-[0_2px_12px_rgba(99,102,241,0.08)] transition-all"
            >
              Deconstruct {p.shortName}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
