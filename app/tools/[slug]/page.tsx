import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTool, tools } from "@/tools/tools";
import EssayHookGenerator from "@/tools/components/EssayHookGenerator";
import PromptDeconstructor from "@/tools/components/PromptDeconstructor";
import ActivityRewriter from "@/tools/components/ActivityRewriter";
import ShowDontTell from "@/tools/components/ShowDontTell";
import ClicheDetector from "@/tools/components/ClicheDetector";
import WhyCollegeBrainstormer from "@/tools/components/WhyCollegeBrainstormer";
import EssayTopicGenerator from "@/tools/components/EssayTopicGenerator";
import { RelatedTools } from "@/tools/components/RelatedTools";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: tool.title,
      description: tool.seoDescription,
      url: `/tools/${tool.slug}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: tool.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      images: ["/og-image.png"],
    },
  };
}

const toolComponents: Record<string, React.ComponentType> = {
  "essay-hook-generator": EssayHookGenerator,
  "prompt-deconstructor": PromptDeconstructor,
  "activity-rewriter": ActivityRewriter,
  "show-dont-tell": ShowDontTell,
  "cliche-detector": ClicheDetector,
  "why-college-brainstormer": WhyCollegeBrainstormer,
  "essay-topic-generator": EssayTopicGenerator,
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const Component = toolComponents[tool.slug];
  if (!Component) notFound();

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-16 pt-28 md:pt-36 pb-20">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:gap-2 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <ToolSwitcher currentSlug={tool.slug} />

      <div className="mb-10">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3">
          {tool.category}
        </p>
        <h1
          className="mb-4 text-[#0F172A]"
          style={{ fontSize: "36px", lineHeight: "44px", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          {tool.title}
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          {tool.description}
        </p>
      </div>

      <Component />

      <div className="mt-16 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-2">
          Want real feedback on your draft?
        </p>
        <h2
          className="text-xl font-extrabold text-[#0F172A] mb-3"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Get your essay scored by AI trained on Ivy acceptances.
        </h2>
        <p className="text-[#64748B] text-sm leading-relaxed mb-5">
          Paste your draft, get line-by-line feedback, a rubric score, and suggested rewrites in under 60 seconds.
        </p>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors"
        >
          Score your essay
        </Link>
      </div>

      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
