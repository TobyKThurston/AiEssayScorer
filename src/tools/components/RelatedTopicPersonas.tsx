import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { topicPersonas } from "@/tools/topicPersonas";

export function RelatedTopicPersonas({ currentSlug }: { currentSlug: string }) {
  const others = topicPersonas.filter((p) => p.slug !== currentSlug).slice(0, 6);
  return (
    <section className="mt-16">
      <h2
        className="text-xl font-extrabold text-[#0F172A] mb-5"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        Topic generators for other types of applicants
      </h2>
      <div className="grid md:grid-cols-2 gap-3">
        {others.map((p) => (
          <Link
            key={p.slug}
            href={`/tools/topics-for-${p.slug}`}
            className="flex items-center justify-between rounded-xl bg-white/60 backdrop-blur-xl border border-white/70 px-4 py-3 hover:bg-white/80 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all group"
          >
            <p className="text-[#0F172A] font-semibold text-sm group-hover:text-[#6366F1] transition-colors">
              Topics for {p.shortName}
            </p>
            <ArrowRight className="w-4 h-4 text-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
}
