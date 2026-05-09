import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tools, type Tool } from "@/tools/tools";

const categoryColors: Record<string, string> = {
  Brainstorming: "bg-paper-2 text-oxblood",
  Analysis: "bg-paper-2 text-oxblood",
  Editing: "bg-paper-2 text-oxblood",
  Planning: "bg-paper-2 text-forest",
};

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const others: Tool[] = tools.filter((t) => t.slug !== currentSlug).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-16">
      <h2
        className="text-lg sm:text-xl font-extrabold text-ink mb-4 sm:mb-5"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        Other free tools you might like
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {others.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 hover:bg-cream hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span
              className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 ${categoryColors[tool.category] ?? "bg-paper-2 text-ink-2"}`}
            >
              {tool.category}
            </span>
            <h3
              className="text-base font-extrabold text-ink mb-2 group-hover:text-oxblood transition-colors leading-snug"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
            >
              {tool.shortTitle}
            </h3>
            <p className="text-pencil text-[13px] leading-relaxed line-clamp-2 mb-3">
              {tool.description}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-oxblood group-hover:gap-2 transition-all">
              Open <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
