import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { School } from "@/tools/schools";
import WhyCollegeBrainstormer from "@/tools/components/WhyCollegeBrainstormer";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedSchoolTools } from "@/tools/components/RelatedSchoolTools";
import { SchoolRichSections } from "@/tools/components/SchoolRichContent";

export function WhySchoolPage({ school }: { school: School }) {
  const wordLimit = school.whyUsWordLimit
    ? `Most "Why ${school.shortName}" supplementals cap around ${school.whyUsWordLimit} words, so specificity matters more than eloquence.`
    : `The "Why ${school.shortName}" supplemental rewards specific, verifiable detail over generic praise.`;

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-16 pt-28 md:pt-36 pb-20">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug="why-college-brainstormer" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3">
          Brainstormer for {school.shortName}
        </p>
        <h1
          className="mb-4 text-[#0F172A]"
          style={{ fontSize: "36px", lineHeight: "44px", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          &quot;Why {school.shortName}&quot; Essay Brainstormer
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          {school.name} is a {school.type.toLowerCase()} {school.category.toLowerCase()} school in {school.location}, known for {school.knownFor}. {wordLimit} Enter your intended major and interests, and this free AI tool will surface specific programs, courses, and campus details you can weave into your draft.
        </p>
      </div>

      <WhyCollegeBrainstormer defaultSchool={school.name} lockSchool />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          How to use this for your {school.shortName} supplemental
        </h2>
        <ol className="space-y-3 text-[#475569] text-[15px] leading-relaxed">
          <li><span className="font-semibold text-[#0F172A]">1.</span> Enter your intended major and a short description of what you&apos;re actually curious about.</li>
          <li><span className="font-semibold text-[#0F172A]">2.</span> Review the generated professors, courses, and programs. <span className="font-semibold">Verify each one on {school.shortName}&apos;s official site before citing it.</span> AI can hallucinate course codes.</li>
          <li><span className="font-semibold text-[#0F172A]">3.</span> Pick 2 or 3 items that genuinely connect to your interests. One specific professor beats three generic program mentions.</li>
          <li><span className="font-semibold text-[#0F172A]">4.</span> Use the suggested opening angle as a starting point, then make it your own.</li>
        </ol>
      </section>

      <div className="mt-14 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">
          Already have a draft?
        </p>
        <h2
          className="text-xl font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Score your {school.shortName} essay instantly.
        </h2>
        <p className="text-[#64748B] text-sm leading-relaxed mb-5">
          Paste your Why {school.shortName} draft and get a rubric-based score with specificity, fit, and line-level feedback.
        </p>
        <Link
          href={`/tools/score-${school.slug}-essay`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors"
        >
          Score my {school.shortName} essay
        </Link>
      </div>

      <SchoolRichSections school={school} />

      <RelatedSchoolTools currentSlug={school.slug} variant="why" />
    </div>
  );
}
