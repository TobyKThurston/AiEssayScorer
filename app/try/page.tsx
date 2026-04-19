import type { Metadata } from "next";
import PublicScorer from "@/PublicScorer/PublicScorer";
import { ToolSwitcher } from "@/tools/components/ToolSwitcher";

export const metadata: Metadata = {
  title: "Free AI College Essay Score in 60 Seconds",
  description:
    "Paste your college essay and get an instant AI score trained on Ivy League acceptances. Free, no signup required for your first review.",
  alternates: { canonical: "/try" },
  openGraph: {
    title: "Free AI College Essay Score in 60 Seconds",
    description:
      "Paste your college essay and get an instant AI score trained on Ivy League acceptances. Free, no signup required for your first review.",
    url: "/try",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Free AI Essay Score" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI College Essay Score",
    images: ["/og-image.png"],
  },
};

export default function TryPage() {
  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-16 pt-28 md:pt-36 pb-20">
      <div className="mb-10">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3">
          Free AI essay score
        </p>
        <h1
          className="mb-4 text-[#0F172A]"
          style={{ fontSize: "40px", lineHeight: "48px", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          Get your essay scored in 60 seconds. No signup.
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          Paste your personal statement or supplemental essay and get a rubric-based score plus top strengths and improvements. One free review per day, no account needed.
        </p>
      </div>

      <PublicScorer />

      <section className="mt-16">
        <h2
          className="text-xl font-extrabold text-[#0F172A] mb-5"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Or try one of our free tools
        </h2>
        <ToolSwitcher currentSlug="" />
      </section>
    </div>
  );
}
