import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import type { School } from "@/tools/schools";
import WhyCollegeBrainstormer from "@/tools/components/WhyCollegeBrainstormer";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedSchoolTools } from "@/tools/components/RelatedSchoolTools";
import { SchoolRichSections } from "@/tools/components/SchoolRichContent";
import { DeepSchoolContent } from "@/tools/components/DeepSchoolContent";
import { SoftwareApplicationSchema } from "@/tools/components/ToolSchema";

export function WhySchoolPage({ school }: { school: School }) {
  const wordLimit = school.whyUsWordLimit
    ? `Most "Why ${school.shortName}" supplementals cap around ${school.whyUsWordLimit} words, so specificity matters more than eloquence.`
    : `The "Why ${school.shortName}" supplemental rewards specific, verifiable detail over generic praise.`;

  return (
    <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-24 pb-12 sm:pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: `Why ${school.shortName}` },
        ]}
      />
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-oxblood hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug="why-college-brainstormer" />

      <div className="mb-8 sm:mb-10">
        <p className="text-[11px] sm:text-xs font-semibold text-oxblood uppercase tracking-widest mb-2 sm:mb-3">
          Brainstormer for {school.shortName}
        </p>
        <h1
          className="mb-3 sm:mb-4 text-ink text-[26px] sm:text-[32px] md:text-[36px] leading-[1.15]"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          &quot;Why {school.shortName}&quot; Essay Brainstormer
        </h1>
        <p className="text-ink-2 text-[15px] sm:text-base md:text-lg leading-relaxed max-w-2xl">
          {school.name} is a {school.type.toLowerCase()} {school.category.toLowerCase()} school in {school.location}, known for {school.knownFor}. {wordLimit} Enter your intended major and interests, and this free AI tool will surface specific programs, courses, and campus details you can weave into your draft.
        </p>
        <Link
          href={`/colleges/${school.slug}`}
          className="inline-flex items-center gap-1.5 mt-4 text-sm text-oxblood hover:gap-2 transition-all"
        >
          See {school.shortName}&apos;s acceptance rate, SAT range &amp; admissions stats →
        </Link>
      </div>

      <WhyCollegeBrainstormer defaultSchool={school.name} lockSchool />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          How to use this for your {school.shortName} supplemental
        </h2>
        <ol className="space-y-3 text-ink-2 text-[15px] leading-relaxed">
          <li><span className="font-semibold text-ink">1.</span> Enter your intended major and a short description of what you&apos;re actually curious about.</li>
          <li><span className="font-semibold text-ink">2.</span> Review the generated professors, courses, and programs. <span className="font-semibold">Verify each one on {school.shortName}&apos;s official site before citing it.</span> AI can hallucinate course codes.</li>
          <li><span className="font-semibold text-ink">3.</span> Pick 2 or 3 items that genuinely connect to your interests. One specific professor beats three generic program mentions.</li>
          <li><span className="font-semibold text-ink">4.</span> Use the suggested opening angle as a starting point, then make it your own.</li>
        </ol>
      </section>

      <div className="mt-14 rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7">
        <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-2">
          Already have a draft?
        </p>
        <h2
          className="text-xl font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Score your {school.shortName} essay instantly.
        </h2>
        <p className="text-pencil text-sm leading-relaxed mb-5">
          Paste your Why {school.shortName} draft and get a rubric-based score with specificity, fit, and line-level feedback.
        </p>
        <Link
          href={`/tools/score-${school.slug}-essay`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn btn-sm btn-brand transition-colors"
        >
          Score my {school.shortName} essay
        </Link>
      </div>

      <DeepSchoolContent school={school} variant="why" />

      <SchoolRichSections school={school} variant="why" />

      <SoftwareApplicationSchema
        name={`Why ${school.shortName} Essay Brainstormer`}
        description={`Free AI brainstormer for the Why ${school.shortName} supplemental essay.`}
        path={`/tools/why-${school.slug}-essay`}
      />

      <RelatedSchoolTools currentSlug={school.slug} variant="why" />
    </div>
  );
}
