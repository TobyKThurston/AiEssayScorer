import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { schools, type School } from "@/tools/schools";

export function RelatedSchoolTools({
  currentSlug,
  variant,
}: {
  currentSlug: string;
  variant: "why" | "score";
}) {
  const current = schools.find((s) => s.slug === currentSlug);
  if (!current) return null;

  const sameCategory = schools
    .filter((s) => s.slug !== currentSlug && s.category === current.category)
    .slice(0, 6);

  const others: School[] = sameCategory.length
    ? sameCategory
    : schools.filter((s) => s.slug !== currentSlug).slice(0, 6);

  const pathPrefix = variant === "why" ? "why-" : "score-";
  const label = variant === "why" ? "Brainstormer for" : "Scorer for";
  const headline =
    variant === "why"
      ? `Brainstormers for similar schools to ${current.shortName}`
      : `Essay scorers for similar schools to ${current.shortName}`;

  return (
    <section className="mt-16">
      <h2
        className="text-xl font-extrabold text-[#0F172A] mb-5"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        {headline}
      </h2>
      <div className="grid md:grid-cols-2 gap-3">
        {others.map((school) => (
          <Link
            key={school.slug}
            href={`/tools/${pathPrefix}${school.slug}-essay`}
            className="flex items-center justify-between rounded-xl bg-white/60 backdrop-blur-xl border border-white/70 px-4 py-3 hover:bg-white/80 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all group"
          >
            <div>
              <p className="text-[#0F172A] font-semibold text-sm group-hover:text-[#6366F1] transition-colors">
                {label} {school.shortName}
              </p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{school.location}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
      <div className="mt-5">
        <Link
          href="/tools"
          className="text-sm font-medium text-[#6366F1] hover:text-[#4F46E5] inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          See all school tools <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
