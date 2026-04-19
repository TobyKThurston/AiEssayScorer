import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/tools/tools";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI College Essay Tools",
  description:
    "Free AI-powered tools for writing college essays: hook generators, prompt analyzers, and more. No signup required.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free AI College Essay Tools",
    description:
      "Free AI-powered tools for writing college essays: hook generators, prompt analyzers, and more. No signup required.",
    url: "/tools",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ivy Admit College Essay Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI College Essay Tools",
    images: ["/og-image.png"],
  },
};

const categoryColors: Record<string, string> = {
  Brainstorming: "bg-[#EDE9FE] text-[#6D28D9]",
  Analysis: "bg-[#DBEAFE] text-[#1D4ED8]",
  Editing: "bg-[#FCE7F3] text-[#BE185D]",
  Planning: "bg-[#D1FAE5] text-[#065F46]",
};

export default function ToolsIndex() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-16 pt-28 md:pt-36 pb-20">
      <div className="mb-14 max-w-2xl">
        <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3">
          Tools
        </p>
        <h1 className="mb-4" style={{ fontSize: "40px", lineHeight: "48px" }}>
          Free AI College Essay Tools
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed">
          Quick, free tools for every stage of the essay process. No signup. Built on the same AI we use to score essays for 20,000+ students.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 hover:bg-white/75 hover:shadow-[0_12px_40px_rgba(99,102,241,0.14)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[tool.category] ?? "bg-slate-100 text-slate-600"}`}
              >
                {tool.category}
              </span>
              <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Free
              </span>
            </div>
            <h2
              className="text-xl font-extrabold text-[#0F172A] mb-2 group-hover:text-[#6366F1] transition-colors leading-snug"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
            >
              {tool.title}
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-5">
              {tool.description}
            </p>
            <span className="flex items-center gap-1 text-sm font-medium text-[#6366F1] group-hover:gap-2 transition-all">
              Open tool <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
