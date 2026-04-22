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
                ? "text-xs font-semibold px-3 py-1.5 rounded-full bg-oxblood text-white"
                : "text-xs font-medium px-3 py-1.5 rounded-full bg-white/70 text-ink-2 border border-hair hover:bg-white hover:text-ink transition-colors"
            }
          >
            {tool.shortTitle}
          </Link>
        );
      })}
    </div>
  );
}
