import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { School } from "@/tools/schools";
import PublicScorer from "@/PublicScorer/PublicScorer";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedSchoolTools } from "@/tools/components/RelatedSchoolTools";
import { SchoolRichSections } from "@/tools/components/SchoolRichContent";
import { SoftwareApplicationSchema } from "@/tools/components/ToolSchema";

export function ScoreSchoolPage({ school }: { school: School }) {
  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-16 pt-28 md:pt-36 pb-20">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug="" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3">
          {school.shortName} essay scorer
        </p>
        <h1
          className="mb-4 text-[#0F172A]"
          style={{ fontSize: "36px", lineHeight: "44px", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          Score your {school.shortName} essay in 60 seconds.
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          {school.name} reviewers in {school.location} read for specificity and fit: does this essay show that you&apos;d thrive with {school.knownFor}? Paste your draft and our free AI scorer will break down your content, structure, voice, and {school.shortName}-specific fit on a transparent rubric.
        </p>
      </div>

      <PublicScorer defaultSchools={school.name} lockSchools />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          What gets graded for your {school.shortName} draft
        </h2>
        <ul className="space-y-2 text-[#475569] text-[15px] leading-relaxed">
          <li><span className="font-semibold text-[#0F172A]">Content & message (30 pts):</span> depth, reflection, concrete detail.</li>
          <li><span className="font-semibold text-[#0F172A]">Structure (25 pts):</span> flow, transitions, purposeful paragraphs.</li>
          <li><span className="font-semibold text-[#0F172A]">Voice & style (25 pts):</span> distinctiveness, sentence variety.</li>
          <li><span className="font-semibold text-[#0F172A]">Specificity & {school.shortName} fit (10 pts):</span> do you sound like you&apos;ve actually been on that campus or talked to students?</li>
          <li><span className="font-semibold text-[#0F172A]">Grammar & mechanics (10 pts).</span></li>
        </ul>
      </section>

      <div className="mt-14 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">
          Still brainstorming?
        </p>
        <h2
          className="text-xl font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Need angles for your Why {school.shortName} essay?
        </h2>
        <p className="text-[#64748B] text-sm leading-relaxed mb-5">
          Get specific professors, courses, programs, and campus details tailored to your major. Free, no signup.
        </p>
        <Link
          href={`/tools/why-${school.slug}-essay`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors"
        >
          Brainstorm my Why {school.shortName} essay
        </Link>
      </div>

      <SchoolRichSections school={school} variant="score" />

      <SoftwareApplicationSchema
        name={`${school.shortName} Essay Scorer`}
        description={`Free AI scorer for your ${school.shortName} supplemental or personal statement.`}
        path={`/tools/score-${school.slug}-essay`}
      />

      <RelatedSchoolTools currentSlug={school.slug} variant="score" />
    </div>
  );
}
