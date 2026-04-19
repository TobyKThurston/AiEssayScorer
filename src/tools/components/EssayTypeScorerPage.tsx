import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { EssayType } from "@/tools/essayTypes";
import PublicScorer from "@/PublicScorer/PublicScorer";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedEssayTypeTools } from "@/tools/components/RelatedEssayTypeTools";

export function EssayTypeScorerPage({ essayType }: { essayType: EssayType }) {
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
          {essayType.shortName} essay scorer
        </p>
        <h1
          className="mb-4 text-[#0F172A]"
          style={{ fontSize: "36px", lineHeight: "44px", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          {essayType.displayName}
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          {essayType.description} This free AI scorer is tuned specifically for {essayType.shortName.toLowerCase()} essays and runs on a {essayType.typicalWordLimit} baseline. Get a rubric-based score, your 3 biggest strengths, and the single change that would move your draft up a tier.
        </p>
      </div>

      <PublicScorer defaultSchools="" lockSchools={false} />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          How to use this for your {essayType.shortName.toLowerCase()} draft
        </h2>
        <ul className="space-y-2 text-[#475569] text-[15px] leading-relaxed">
          <li><span className="font-semibold text-[#0F172A]">Typical length:</span> {essayType.typicalWordLimit}.</li>
          <li><span className="font-semibold text-[#0F172A]">Paste the full draft.</span> Partial drafts skew the score low because the scorer penalizes missing structure.</li>
          <li><span className="font-semibold text-[#0F172A]">Include the prompt.</span> Drop the exact prompt in the prompt field so the scorer can grade for relevance.</li>
          <li><span className="font-semibold text-[#0F172A]">Run it twice.</span> Once on the current draft, again after the one-thing change. Compare blend risk scores.</li>
        </ul>
      </section>

      <RelatedEssayTypeTools currentSlug={essayType.slug} />
    </div>
  );
}
