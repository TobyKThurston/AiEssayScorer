import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTool, tools } from "@/tools/tools";
import { getSchool, schools } from "@/tools/schools";
import { getPrompt, prompts } from "@/tools/prompts";
import { getEssayType, essayTypes } from "@/tools/essayTypes";
import { getRewriter, rewriters } from "@/tools/rewriters";
import EssayHookGenerator from "@/tools/components/EssayHookGenerator";
import PromptDeconstructor from "@/tools/components/PromptDeconstructor";
import ActivityRewriter from "@/tools/components/ActivityRewriter";
import ShowDontTell from "@/tools/components/ShowDontTell";
import ClicheDetector from "@/tools/components/ClicheDetector";
import WhyCollegeBrainstormer from "@/tools/components/WhyCollegeBrainstormer";
import EssayTopicGenerator from "@/tools/components/EssayTopicGenerator";
import { RelatedTools } from "@/tools/components/RelatedTools";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";
import { WhySchoolPage } from "@/tools/components/WhySchoolPage";
import { ScoreSchoolPage } from "@/tools/components/ScoreSchoolPage";
import { HookPromptPage } from "@/tools/components/HookPromptPage";
import { EssayTypeScorerPage } from "@/tools/components/EssayTypeScorerPage";
import { RewriterPage } from "@/tools/components/RewriterPage";

type VariantMatch =
  | { kind: "base"; toolSlug: string }
  | { kind: "why-school"; schoolSlug: string }
  | { kind: "score-school"; schoolSlug: string }
  | { kind: "hook-prompt"; promptSlug: string }
  | { kind: "essay-type-scorer"; essayTypeSlug: string }
  | { kind: "rewriter"; rewriterSlug: string }
  | { kind: "none" };

function resolveSlug(slug: string): VariantMatch {
  const whyMatch = slug.match(/^why-(.+)-essay$/);
  if (whyMatch && getSchool(whyMatch[1])) {
    return { kind: "why-school", schoolSlug: whyMatch[1] };
  }
  const scoreMatch = slug.match(/^score-(.+)-essay$/);
  if (scoreMatch && getSchool(scoreMatch[1])) {
    return { kind: "score-school", schoolSlug: scoreMatch[1] };
  }
  const hookMatch = slug.match(/^hook-(.+)$/);
  if (hookMatch && getPrompt(hookMatch[1])) {
    return { kind: "hook-prompt", promptSlug: hookMatch[1] };
  }
  const typeMatch = slug.match(/^(.+)-essay-scorer$/);
  if (typeMatch && getEssayType(typeMatch[1])) {
    return { kind: "essay-type-scorer", essayTypeSlug: typeMatch[1] };
  }
  if (getRewriter(slug)) return { kind: "rewriter", rewriterSlug: slug };
  if (getTool(slug)) return { kind: "base", toolSlug: slug };
  return { kind: "none" };
}

export async function generateStaticParams() {
  return [
    ...tools.map((t) => ({ slug: t.slug })),
    ...schools.map((s) => ({ slug: `why-${s.slug}-essay` })),
    ...schools.map((s) => ({ slug: `score-${s.slug}-essay` })),
    ...prompts.map((p) => ({ slug: `hook-${p.slug}` })),
    ...essayTypes.map((t) => ({ slug: `${t.slug}-essay-scorer` })),
    ...rewriters.map((r) => ({ slug: r.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = resolveSlug(slug);

  if (match.kind === "why-school") {
    const school = getSchool(match.schoolSlug)!;
    const title = `"Why ${school.shortName}" Essay Brainstormer (Free AI Tool)`;
    const description = `Free AI brainstormer for the Why ${school.shortName} supplemental essay. Get specific professors, courses, programs, and ${school.shortName}-specific angles tied to your intended major.`;
    return {
      title,
      description,
      keywords: [
        `why ${school.shortName} essay`,
        `why ${school.name} essay`,
        `${school.shortName} supplemental essay`,
        `${school.shortName} why us essay examples`,
        `${school.shortName} essay brainstormer`,
      ],
      alternates: { canonical: `/tools/why-${school.slug}-essay` },
      openGraph: {
        title,
        description,
        url: `/tools/why-${school.slug}-essay`,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
      twitter: { card: "summary_large_image", title, images: ["/og-image.png"] },
    };
  }

  if (match.kind === "hook-prompt") {
    const prompt = getPrompt(match.promptSlug)!;
    const title = `Hook Generator for ${prompt.shortName} (Free AI Tool)`;
    const description = `Free AI hook generator for the ${prompt.displayName}. Get 5 original opening lines in different styles, tuned for this ${prompt.wordLimit}-word prompt.`;
    return {
      title,
      description,
      keywords: prompt.seoKeywords,
      alternates: { canonical: `/tools/hook-${prompt.slug}` },
      openGraph: {
        title,
        description,
        url: `/tools/hook-${prompt.slug}`,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
      twitter: { card: "summary_large_image", title, images: ["/og-image.png"] },
    };
  }

  if (match.kind === "essay-type-scorer") {
    const type = getEssayType(match.essayTypeSlug)!;
    const title = `${type.displayName} (Free AI Review)`;
    const description = `Free AI scorer tuned for ${type.shortName.toLowerCase()} essays. Rubric-based feedback on content, structure, voice, and specificity in under a minute.`;
    return {
      title,
      description,
      keywords: type.seoKeywords,
      alternates: { canonical: `/tools/${type.slug}-essay-scorer` },
      openGraph: {
        title,
        description,
        url: `/tools/${type.slug}-essay-scorer`,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
      twitter: { card: "summary_large_image", title, images: ["/og-image.png"] },
    };
  }

  if (match.kind === "rewriter") {
    const r = getRewriter(match.rewriterSlug)!;
    return {
      title: `${r.displayName} (Free AI Tool)`,
      description: r.seoDescription,
      keywords: r.seoKeywords,
      alternates: { canonical: `/tools/${r.slug}` },
      openGraph: {
        title: r.displayName,
        description: r.seoDescription,
        url: `/tools/${r.slug}`,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: r.displayName }],
      },
      twitter: { card: "summary_large_image", title: r.displayName, images: ["/og-image.png"] },
    };
  }

  if (match.kind === "score-school") {
    const school = getSchool(match.schoolSlug)!;
    const title = `${school.shortName} Essay Scorer (Free AI Review)`;
    const description = `Free AI scorer for your ${school.shortName} supplemental or personal statement. Get a rubric-based score, strengths, and the one change that would make your ${school.shortName} essay stand out.`;
    return {
      title,
      description,
      keywords: [
        `${school.shortName} essay scorer`,
        `${school.shortName} essay review`,
        `${school.shortName} essay feedback`,
        `${school.name} essay grader`,
        `score my ${school.shortName} essay`,
      ],
      alternates: { canonical: `/tools/score-${school.slug}-essay` },
      openGraph: {
        title,
        description,
        url: `/tools/score-${school.slug}-essay`,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
      twitter: { card: "summary_large_image", title, images: ["/og-image.png"] },
    };
  }

  if (match.kind === "base") {
    const tool = getTool(match.toolSlug)!;
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
      twitter: { card: "summary_large_image", title: tool.title, images: ["/og-image.png"] },
    };
  }

  return {};
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
  const match = resolveSlug(slug);

  if (match.kind === "why-school") {
    const school = getSchool(match.schoolSlug)!;
    return <WhySchoolPage school={school} />;
  }

  if (match.kind === "score-school") {
    const school = getSchool(match.schoolSlug)!;
    return <ScoreSchoolPage school={school} />;
  }

  if (match.kind === "hook-prompt") {
    const prompt = getPrompt(match.promptSlug)!;
    return <HookPromptPage prompt={prompt} />;
  }

  if (match.kind === "essay-type-scorer") {
    const essayType = getEssayType(match.essayTypeSlug)!;
    return <EssayTypeScorerPage essayType={essayType} />;
  }

  if (match.kind === "rewriter") {
    const rewriter = getRewriter(match.rewriterSlug)!;
    return <RewriterPage rewriter={rewriter} />;
  }

  if (match.kind === "none") notFound();

  const tool = getTool(match.toolSlug)!;
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
          href="/try"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors"
        >
          Score your essay
        </Link>
      </div>

      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
