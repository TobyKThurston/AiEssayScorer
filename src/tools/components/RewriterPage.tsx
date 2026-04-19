import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Rewriter } from "@/tools/rewriters";
import RewriterClient from "@/tools/components/RewriterClient";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { RelatedRewriters } from "@/tools/components/RelatedRewriters";

export function RewriterPage({ rewriter }: { rewriter: Rewriter }) {
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
          Essay rewriter
        </p>
        <h1
          className="mb-4 text-[#0F172A]"
          style={{ fontSize: "36px", lineHeight: "44px", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          {rewriter.displayName}
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          {rewriter.seoDescription}
        </p>
      </div>

      <RewriterClient rewriterSlug={rewriter.slug} shortName={rewriter.shortName} />

      <section className="mt-14">
        <h2
          className="text-lg font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          What this rewriter does, and what it won&apos;t do
        </h2>
        <ul className="space-y-2 text-[#475569] text-[15px] leading-relaxed">
          <li><span className="font-semibold text-[#0F172A]">Does:</span> preserve your voice, keep your strongest details, and {rewriter.kind === "cut" ? "cut filler, adverbs, and redundant setup before touching scene." : rewriter.kind === "expand" ? "deepen scene and reflection without adding filler." : "improve the draft without inventing new facts."}</li>
          <li><span className="font-semibold text-[#0F172A]">Will not:</span> invent activities, names, or experiences. If the draft is too vague to work with, the tool flags what you need to add rather than making it up.</li>
          <li><span className="font-semibold text-[#0F172A]">Best used after:</span> you have a real first draft. Rewriting a paragraph of filler produces shorter filler.</li>
        </ul>
      </section>

      <div className="mt-14 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">
          After the rewrite
        </p>
        <h2
          className="text-xl font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Score the new draft
        </h2>
        <p className="text-[#64748B] text-sm leading-relaxed mb-5">
          Run the rewritten version through our free AI scorer to see if your edits actually moved the needle.
        </p>
        <Link
          href="/try"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors"
        >
          Score my rewritten essay
        </Link>
      </div>

      <RelatedRewriters currentSlug={rewriter.slug} />
    </div>
  );
}
