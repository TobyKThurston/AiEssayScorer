import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import type { EssayPrompt } from "@/tools/prompts";
import PromptDeconstructor from "@/tools/components/PromptDeconstructor";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedPromptTools } from "@/tools/components/RelatedPromptTools";
import { FAQSection, SoftwareApplicationSchema } from "@/tools/components/ToolSchema";
import { faqsForDeconstructPrompt } from "@/tools/variantFaqs";
import { DeepDeconstructContent } from "@/tools/components/DeepVariantContent";

export function DeconstructPromptPage({ prompt }: { prompt: EssayPrompt }) {
  return (
    <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: `Deconstruct ${prompt.shortName}` },
        ]}
      />
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-oxblood hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug="prompt-deconstructor" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
          Prompt deconstructor
        </p>
        <h1
          className="mb-3 sm:mb-4 text-ink text-[26px] sm:text-[32px] md:text-[36px] leading-[1.15]" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          {prompt.shortName} Prompt Deconstructor
        </h1>
        <p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
          Break down the {prompt.displayName} into its hidden question, angles that work, traps that sink drafts, and signals admissions reads between the lines. Pre-loaded with the full prompt so you can go straight to the analysis.
        </p>
      </div>

      <div className="mb-8 rounded-2xl bg-cream border border-hair p-5 sm:p-6">
        <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-2">
          The full prompt
        </p>
        <p className="text-ink text-[15px] leading-relaxed italic">
          &quot;{prompt.fullPrompt}&quot;
        </p>
        <p className="text-xs text-pencil mt-3">Word limit: {prompt.wordLimit}</p>
      </div>

      <PromptDeconstructor defaultPromptText={prompt.fullPrompt} lockPromptText />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          What this tells you about the {prompt.shortName}
        </h2>
        <p className="text-ink-2 text-[15px] leading-relaxed">
          Running the {prompt.shortName} through the deconstructor reveals the gap between the literal prompt and what admissions is really evaluating. The literal question is rarely the real one. The real one is what makes a draft stand out or blur into the pile.
        </p>
      </section>

      <DeepDeconstructContent prompt={prompt} />

      <FAQSection
        faqs={faqsForDeconstructPrompt(prompt)}
        heading={`${prompt.shortName} deconstructor FAQ`}
      />

      <SoftwareApplicationSchema
        name={`${prompt.shortName} Prompt Deconstructor`}
        description={`Free AI breakdown of the ${prompt.displayName}.`}
        path={`/tools/deconstruct-${prompt.slug}`}
      />

      <RelatedPromptTools currentSlug={prompt.slug} />
    </div>
  );
}
