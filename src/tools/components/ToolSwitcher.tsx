import Link from "next/link";
import { tools, type Tool } from "@/tools/tools";

const categoryOrder: Tool["category"][] = [
  "Brainstorming",
  "Analysis",
  "Editing",
  "Planning",
];

export function ToolSwitcher({ currentSlug }: { currentSlug: string }) {
  const current = tools.find((t) => t.slug === currentSlug);
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    items: tools.filter((t) => t.category === cat),
  }));

  return (
    <details className="group mb-8">
      <summary className="cursor-pointer list-none inline-flex items-center gap-2 text-xs font-semibold text-ink-2 hover:text-oxblood transition-colors">
        <span className="text-pencil">Switch tool</span>
        {current && (
          <>
            <span className="text-pencil">·</span>
            <span className="text-ink">{current.shortTitle}</span>
          </>
        )}
        <span className="text-pencil group-open:rotate-180 transition-transform">▾</span>
      </summary>
      <div className="mt-4 rounded-2xl border border-hair bg-cream p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {grouped.map((g) => (
          <div key={g.category}>
            <p className="text-[10px] font-semibold text-oxblood uppercase tracking-widest mb-2">
              {g.category}
            </p>
            <ul className="space-y-0.5">
              {g.items.map((t) => {
                const active = t.slug === currentSlug;
                return (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className={
                        active
                          ? "block text-xs font-semibold text-oxblood py-1"
                          : "block text-xs text-ink-2 hover:text-oxblood py-1 transition-colors"
                      }
                    >
                      {t.shortTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}
