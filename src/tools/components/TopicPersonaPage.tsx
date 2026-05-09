import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import type { TopicPersona } from "@/tools/topicPersonas";
import EssayTopicGenerator from "@/tools/components/EssayTopicGenerator";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedTopicPersonas } from "@/tools/components/RelatedTopicPersonas";
import { FAQSection, SoftwareApplicationSchema } from "@/tools/components/ToolSchema";
import { faqsForTopicPersona } from "@/tools/variantFaqs";
import { DeepTopicPersonaContent } from "@/tools/components/DeepVariantContent";

export function TopicPersonaPage({ persona }: { persona: TopicPersona }) {
  return (
    <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: `Topics for ${persona.shortName}` },
        ]}
      />
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-oxblood hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug="essay-topic-generator" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
          Topic generator for {persona.shortName.toLowerCase()}
        </p>
        <h1
          className="mb-3 sm:mb-4 text-ink text-[26px] sm:text-[32px] md:text-[36px] leading-[1.15]" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          {persona.displayName}
        </h1>
        <p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
          {persona.description}
        </p>
      </div>

      <EssayTopicGenerator personaContext={persona.contextForAi} />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Why generic topic generators don&apos;t work for {persona.shortName.toLowerCase()}
        </h2>
        <p className="text-ink-2 text-[15px] leading-relaxed">
          Most AI topic generators produce the same 5 ideas for everyone who types in their background. That&apos;s the opposite of what admissions reads for. This version is tuned with {persona.shortName.toLowerCase()}-specific guardrails: it actively steers away from cliches common to this group and pushes toward the kinds of small, honest specifics that actually make essays memorable.
        </p>
      </section>

      <DeepTopicPersonaContent persona={persona} />

      <FAQSection
        faqs={faqsForTopicPersona(persona)}
        heading={`Topics for ${persona.shortName.toLowerCase()} FAQ`}
      />

      <SoftwareApplicationSchema
        name={persona.displayName}
        description={persona.seoDescription}
        path={`/tools/topics-for-${persona.slug}`}
      />

      <RelatedTopicPersonas currentSlug={persona.slug} />
    </div>
  );
}
