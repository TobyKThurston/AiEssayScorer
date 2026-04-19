import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tools, type Tool } from "@/tools/tools";

const categoryColors: Record<string, string> = {
  Brainstorming: "bg-[#EDE9FE] text-[#6D28D9]",
  Analysis: "bg-[#DBEAFE] text-[#1D4ED8]",
  Editing: "bg-[#FCE7F3] text-[#BE185D]",
  Planning: "bg-[#D1FAE5] text-[#065F46]",
};

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const others: Tool[] = tools.filter((t) => t.slug !== currentSlug).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <section className="mt-16">
      <h2
        className="text-xl font-extrabold text-[#0F172A] mb-5"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        Other free tools you might like
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {others.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 hover:bg-white/75 hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span
              className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 ${categoryColors[tool.category] ?? "bg-slate-100 text-slate-600"}`}
            >
              {tool.category}
            </span>
            <h3
              className="text-base font-extrabold text-[#0F172A] mb-2 group-hover:text-[#6366F1] transition-colors leading-snug"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
            >
              {tool.shortTitle}
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed line-clamp-2 mb-3">
              {tool.description}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#6366F1] group-hover:gap-2 transition-all">
              Open <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
