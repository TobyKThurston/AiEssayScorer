import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { EssayPrompt } from "@/tools/prompts";
import EssayHookGenerator from "@/tools/components/EssayHookGenerator";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedPromptTools } from "@/tools/components/RelatedPromptTools";

export function HookPromptPage({ prompt }: { prompt: EssayPrompt }) {
  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-16 pt-28 md:pt-36 pb-20">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug="essay-hook-generator" />

      <div className="mb-10">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3">
          Hook generator for {prompt.family}
        </p>
        <h1
          className="mb-4 text-[#0F172A]"
          style={{ fontSize: "36px", lineHeight: "44px", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          Hook Generator for {prompt.shortName}
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          Get 5 original opening lines for the {prompt.displayName.toLowerCase()}. Each hook is tailored to your essay topic in a different style: narrative, reflective, bold statement, dialogue, and sensory detail. {prompt.wordLimit}-word prompts demand a tight opener, so these are kept under 40 words each.
        </p>
      </div>

      <div className="mb-8 rounded-2xl bg-[#F5F3FF] border border-[#E0E7FF] p-6">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">
          The full prompt
        </p>
        <p className="text-[#0F172A] text-[15px] leading-relaxed italic">
          &quot;{prompt.fullPrompt}&quot;
        </p>
        <p className="text-xs text-[#64748B] mt-3">Word limit: {prompt.wordLimit}</p>
      </div>

      <EssayHookGenerator defaultPrompt={prompt.fullPrompt} lockPrompt />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          How to pick the right hook for {prompt.shortName}
        </h2>
        <ol className="space-y-3 text-[#475569] text-[15px] leading-relaxed">
          <li><span className="font-semibold text-[#0F172A]">1.</span> Read all 5 hooks once without judging. The one you feel a twinge about is often the right one.</li>
          <li><span className="font-semibold text-[#0F172A]">2.</span> Reject any hook that could open someone else&apos;s essay. If it could, it&apos;s too generic.</li>
          <li><span className="font-semibold text-[#0F172A]">3.</span> Read the hook aloud. If you stumble, it&apos;s too clever. If your parents would write it, it&apos;s too safe.</li>
          <li><span className="font-semibold text-[#0F172A]">4.</span> The hook doesn&apos;t have to be your first paragraph in the final draft. Use it to find the voice, then keep writing.</li>
        </ol>
      </section>

      <RelatedPromptTools currentSlug={prompt.slug} />
    </div>
  );
}
