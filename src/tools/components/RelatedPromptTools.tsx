import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prompts, type EssayPrompt } from "@/tools/prompts";

export function RelatedPromptTools({ currentSlug }: { currentSlug: string }) {
  const current = prompts.find((p) => p.slug === currentSlug);
  if (!current) return null;

  const sameFamily = prompts
    .filter((p) => p.slug !== currentSlug && p.family === current.family)
    .slice(0, 6);

  const others: EssayPrompt[] = sameFamily.length
    ? sameFamily
    : prompts.filter((p) => p.slug !== currentSlug).slice(0, 6);

  return (
    <section className="mt-16">
      <h2
        className="text-xl font-extrabold text-ink mb-5"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        Hook generators for similar prompts
      </h2>
      <div className="grid md:grid-cols-2 gap-3">
        {others.map((p) => (
          <Link
            key={p.slug}
            href={`/tools/hook-${p.slug}`}
            className="flex items-center justify-between rounded-xl bg-cream border border-hair px-4 py-3 hover:bg-cream hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all group"
          >
            <div>
              <p className="text-ink font-semibold text-sm group-hover:text-oxblood transition-colors">
                {p.shortName}
              </p>
              <p className="text-pencil text-xs mt-0.5">{p.family} · {p.wordLimit} words</p>
            </div>
            <ArrowRight className="w-4 h-4 text-oxblood opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
}
