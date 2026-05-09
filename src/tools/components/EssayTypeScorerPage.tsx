import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import type { EssayType } from "@/tools/essayTypes";
import PublicScorer from "@/PublicScorer/PublicScorer";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedEssayTypeTools } from "@/tools/components/RelatedEssayTypeTools";
import { FAQSection, SoftwareApplicationSchema } from "@/tools/components/ToolSchema";
import { faqsForEssayType } from "@/tools/variantFaqs";
import { DeepEssayTypeContent } from "@/tools/components/DeepVariantContent";

export function EssayTypeScorerPage({ essayType }: { essayType: EssayType }) {
  return (
    <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: `${essayType.shortName} Scorer` },
        ]}
      />
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-oxblood hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug="" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
          {essayType.shortName} essay scorer
        </p>
        <h1
          className="mb-3 sm:mb-4 text-ink text-[26px] sm:text-[32px] md:text-[36px] leading-[1.15]" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          {essayType.displayName}
        </h1>
        <p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
          {essayType.description} This free AI scorer is tuned specifically for {essayType.shortName.toLowerCase()} essays and runs on a {essayType.typicalWordLimit} baseline. Get a rubric-based score, your 3 biggest strengths, and the single change that would move your draft up a tier.
        </p>
      </div>

      <PublicScorer defaultSchools="" lockSchools={false} />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          How to use this for your {essayType.shortName.toLowerCase()} draft
        </h2>
        <ul className="space-y-2 text-ink-2 text-[15px] leading-relaxed">
          <li><span className="font-semibold text-ink">Typical length:</span> {essayType.typicalWordLimit}.</li>
          <li><span className="font-semibold text-ink">Paste the full draft.</span> Partial drafts skew the score low because the scorer penalizes missing structure.</li>
          <li><span className="font-semibold text-ink">Include the prompt.</span> Drop the exact prompt in the prompt field so the scorer can grade for relevance.</li>
          <li><span className="font-semibold text-ink">Run it twice.</span> Once on the current draft, again after the one-thing change. Compare blend risk scores.</li>
        </ul>
      </section>

      <DeepEssayTypeContent essayType={essayType} />

      <FAQSection
        faqs={faqsForEssayType(essayType)}
        heading={`${essayType.shortName} scorer FAQ`}
      />

      <SoftwareApplicationSchema
        name={essayType.displayName}
        description={`Free AI scorer tuned for ${essayType.shortName.toLowerCase()} essays.`}
        path={`/tools/${essayType.slug}-essay-scorer`}
      />

      <RelatedEssayTypeTools currentSlug={essayType.slug} />
    </div>
  );
}
