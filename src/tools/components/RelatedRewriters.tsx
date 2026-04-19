import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { rewriters } from "@/tools/rewriters";

export function RelatedRewriters({ currentSlug }: { currentSlug: string }) {
  const others = rewriters.filter((r) => r.slug !== currentSlug).slice(0, 6);

  return (
    <section className="mt-16">
      <h2
        className="text-xl font-extrabold text-[#0F172A] mb-5"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        Other rewriters
      </h2>
      <div className="grid md:grid-cols-2 gap-3">
        {others.map((r) => (
          <Link
            key={r.slug}
            href={`/tools/${r.slug}`}
            className="flex items-center justify-between rounded-xl bg-white/60 backdrop-blur-xl border border-white/70 px-4 py-3 hover:bg-white/80 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all group"
          >
            <p className="text-[#0F172A] font-semibold text-sm group-hover:text-[#6366F1] transition-colors">
              {r.shortName}
            </p>
            <ArrowRight className="w-4 h-4 text-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
}
