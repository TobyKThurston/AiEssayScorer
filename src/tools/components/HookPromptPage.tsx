import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import type { EssayPrompt } from "@/tools/prompts";
import EssayHookGenerator from "@/tools/components/EssayHookGenerator";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedPromptTools } from "@/tools/components/RelatedPromptTools";
import { FAQSection, SoftwareApplicationSchema } from "@/tools/components/ToolSchema";
import { faqsForHookPrompt } from "@/tools/variantFaqs";
import { DeepHookPromptContent } from "@/tools/components/DeepVariantContent";

export function HookPromptPage({ prompt }: { prompt: EssayPrompt }) {
  return (
    <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: `Hook for ${prompt.shortName}` },
        ]}
      />
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-oxblood hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug="essay-hook-generator" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
          Hook generator for {prompt.family}
        </p>
        <h1
          className="mb-3 sm:mb-4 text-ink text-[26px] sm:text-[32px] md:text-[36px] leading-[1.15]" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          Hook Generator for {prompt.shortName}
        </h1>
        <p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
          Get 5 original opening lines for the {prompt.displayName.toLowerCase()}. Each hook is tailored to your essay topic in a different style: narrative, reflective, bold statement, dialogue, and sensory detail. {prompt.wordLimit}-word prompts demand a tight opener, so these are kept under 40 words each.
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

      <EssayHookGenerator defaultPrompt={prompt.fullPrompt} lockPrompt />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-ink mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          How to pick the right hook for {prompt.shortName}
        </h2>
        <ol className="space-y-3 text-ink-2 text-[15px] leading-relaxed">
          <li><span className="font-semibold text-ink">1.</span> Read all 5 hooks once without judging. The one you feel a twinge about is often the right one.</li>
          <li><span className="font-semibold text-ink">2.</span> Reject any hook that could open someone else&apos;s essay. If it could, it&apos;s too generic.</li>
          <li><span className="font-semibold text-ink">3.</span> Read the hook aloud. If you stumble, it&apos;s too clever. If your parents would write it, it&apos;s too safe.</li>
          <li><span className="font-semibold text-ink">4.</span> The hook doesn&apos;t have to be your first paragraph in the final draft. Use it to find the voice, then keep writing.</li>
        </ol>
      </section>

      <DeepHookPromptContent prompt={prompt} />

      <FAQSection
        faqs={faqsForHookPrompt(prompt)}
        heading={`${prompt.shortName} hook generator FAQ`}
      />

      <SoftwareApplicationSchema
        name={`${prompt.shortName} Hook Generator`}
        description={`Free AI hook generator for the ${prompt.displayName}.`}
        path={`/tools/hook-${prompt.slug}`}
      />

      <RelatedPromptTools currentSlug={prompt.slug} />
    </div>
  );
}
