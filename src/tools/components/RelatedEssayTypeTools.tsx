import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { essayTypes } from "@/tools/essayTypes";

export function RelatedEssayTypeTools({ currentSlug }: { currentSlug: string }) {
  const others = essayTypes.filter((t) => t.slug !== currentSlug).slice(0, 6);

  return (
    <section className="mt-16">
      <h2
        className="text-xl font-extrabold text-ink mb-5"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        Other essay-type scorers
      </h2>
      <div className="grid md:grid-cols-2 gap-3">
        {others.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}-essay-scorer`}
            className="flex items-center justify-between rounded-xl bg-cream border border-hair px-4 py-3 hover:bg-cream hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all group"
          >
            <div>
              <p className="text-ink font-semibold text-sm group-hover:text-oxblood transition-colors">
                {t.shortName} scorer
              </p>
              <p className="text-pencil text-xs mt-0.5">{t.typicalWordLimit}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-oxblood opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
}
