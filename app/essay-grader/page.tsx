import type { Metadata } from "next";
import Link from "next/link";
import PublicScorer from "@/PublicScorer/PublicScorer";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";

export const metadata: Metadata = {
  title: "Free AI College Essay Grader – Ivy Admit",
  description:
    "Paste your college essay and get an instant AI grade trained on Ivy League acceptances. Free, no signup required for your first review.",
  alternates: { canonical: "/essay-grader" },
  openGraph: {
    title: "Free AI College Essay Grader",
    description:
      "Paste your college essay and get an instant AI grade trained on Ivy League acceptances. Free, no signup required.",
    url: "/essay-grader",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Free AI Essay Grader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI College Essay Grader",
    images: ["/og-image.png"],
  },
};

export default function EssayGraderPage() {
  return (
    <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-20">
      <div className="mb-8 sm:mb-10">
        <p className="text-[11px] sm:text-xs font-semibold text-oxblood uppercase tracking-widest mb-2 sm:mb-3">
          Free AI essay grader
        </p>
        <h1
          className="mb-3 sm:mb-4 text-ink text-[28px] sm:text-[34px] md:text-[40px] leading-[1.15]"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          Grade your essay in 60 seconds. No signup.
        </h1>
        <p className="text-ink-2 text-[15px] sm:text-base md:text-lg leading-relaxed max-w-2xl">
          Paste your personal statement or supplemental and get a rubric-based grade plus your top strengths and improvements. One free grade per day, no account needed.
        </p>
        <p className="mt-4 sm:mt-5 text-[13px] text-pencil">
          Want your real <Link href="/odds" className="text-oxblood hover:text-oxblood-2 underline-offset-4 underline">admit chance at top schools?</Link>
        </p>
      </div>

      <PublicScorer />

      <section className="mt-12 sm:mt-16">
        <h2
          className="text-lg sm:text-xl font-extrabold text-ink mb-4 sm:mb-5"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Or try one of our free tools
        </h2>
        <ToolSwitcher currentSlug="" />
      </section>
    </div>
  );
}
