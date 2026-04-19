import Link from "next/link";
import { tools } from "@/tools/tools";

export function ToolSwitcher({ currentSlug }: { currentSlug: string }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {tools.map((tool) => {
        const active = tool.slug === currentSlug;
        return (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className={
              active
                ? "text-xs font-semibold px-3 py-1.5 rounded-full bg-[#6366F1] text-white"
                : "text-xs font-medium px-3 py-1.5 rounded-full bg-white/70 text-[#475569] border border-white/70 hover:bg-white hover:text-[#0F172A] transition-colors"
            }
          >
            {tool.shortTitle}
          </Link>
        );
      })}
    </div>
  );
}
