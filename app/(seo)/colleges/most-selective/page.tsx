import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools, type School } from "@/tools/schools";
import { extraColleges } from "@/colleges/extraColleges";
import { getStats, formatPct, type CollegeStat } from "@/colleges/collegeStats";
import { extraStats } from "@/colleges/extraColleges";
import { getScorecard, formatPctSafe, formatMoneySafe } from "@/colleges/scorecard";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

export const metadata: Metadata = {
  // Listicle title with year + superlative cue wins clicks against
  // generic "most selective colleges" results.
  title: "Most Selective Colleges in the US (2026): Ranked by Acceptance Rate",
  description:
    "Every top US college ranked by 2026 acceptance rate, hardest to easiest. Real published admit rates, SAT ranges, and a free calculator that estimates your odds at each.",
  alternates: { canonical: "/colleges/most-selective" },
  openGraph: {
    title: "Most Selective Colleges in the US (2026): Ranked by Acceptance Rate",
    description:
      "Top US colleges ranked by 2026 acceptance rate. Real published data, SAT ranges, and a free per-school odds calculator.",
    url: "/colleges/most-selective",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Most selective US colleges ranked by 2026 acceptance rate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Most Selective Colleges in the US (2026)",
    description: "Ranked by 2026 acceptance rate. Free odds calculator.",
    images: ["/og-image.png"],
  },
};

const allSchools: School[] = [
  ...schools,
  ...extraColleges.map((e) => ({
    slug: e.slug,
    name: e.name,
    shortName: e.shortName,
    location: e.location,
    state: e.state,
    type: e.type,
    category: e.category,
    knownFor: e.knownFor,
  })),
];

function lookupStats(slug: string): CollegeStat | null {
  const curated = getStats(slug);
  if (curated) return curated;
  const extra = extraStats[slug];
  if (!extra) return null;
  return extra as CollegeStat;
}

function lookupAdmitRate(slug: string): number | undefined {
  return lookupStats(slug)?.acceptanceRate ?? getScorecard(slug)?.admitRate;
}

export default function MostSelectivePage() {
  const ranked = allSchools
    .map((s) => ({ school: s, rate: lookupAdmitRate(s.slug) }))
    .filter((x): x is { school: School; rate: number } => x.rate !== undefined)
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 25);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
      { "@type": "ListItem", position: 3, name: "Most Selective", item: `${baseUrl}/colleges/most-selective` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Most Selective Colleges in the U.S.",
    numberOfItems: ranked.length,
    itemListElement: ranked.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.school.name,
      url: `${baseUrl}/colleges/${r.school.slug}`,
    })),
  };

  return (
    <article className="pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Colleges", href: "/colleges" },
            { label: "Most Selective" },
          ]}
        />

        <header className="text-center mt-6 mb-12">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            Ranked by acceptance rate
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 52px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
            }}
          >
            The 25 Most Selective Colleges in the U.S.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            Real published acceptance rates from the most recent admit cycle.
          </p>
          <Link
            href="/try"
            className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all"
          >
            Calculate your odds at all 25
          </Link>
        </header>

        {/* Featured-snippet intro */}
        <section className="not-prose mb-12 rounded-2xl border border-hair bg-cream px-7 py-6">
          <h2
            className="text-ink mb-2"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}
          >
            What is the most selective college in the U.S.?
          </h2>
          <p className="text-ink-2 leading-relaxed">
            By most recently published acceptance rate,{" "}
            <Link href={`/colleges/${ranked[0].school.slug}`} className="!text-oxblood !no-underline font-semibold hover:!text-ink">
              {ranked[0].school.name}
            </Link>{" "}
            is currently the most selective with a <strong className="text-ink">{formatPct(ranked[0].rate)}</strong> acceptance rate. The top 10 most selective universities all admit fewer than{" "}
            <strong className="text-ink">{formatPct(ranked[9]?.rate ?? 0.07)}</strong> of applicants. Holistic review means published rates are pool averages, not personal odds.
          </p>
        </section>

        {/* Ranked table */}
        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Ranked List
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <div className="overflow-x-auto"><table className="w-full text-sm min-w-[460px]">
              <thead className="bg-[#FAEEEA]">
                <tr>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em] w-10">#</th>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">School</th>
                  <th className="text-right px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Accept</th>
                  <th className="hidden sm:table-cell text-right px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">SAT</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((r, i) => {
                  const stat = lookupStats(r.school.slug);
                  const sc = getScorecard(r.school.slug);
                  const sat25 = stat?.sat?.p25 ?? sc?.sat25;
                  const sat75 = stat?.sat?.p75 ?? sc?.sat75;
                  return (
                    <tr key={r.school.slug} className={i === ranked.length - 1 ? "" : "border-b border-hair"}>
                      <td className="px-3 sm:px-5 py-3.5 text-pencil tabular-nums">{i + 1}</td>
                      <td className="px-3 sm:px-5 py-3.5">
                        <Link
                          href={`/colleges/${r.school.slug}`}
                          className="font-semibold !text-ink !no-underline hover:!text-oxblood"
                        >
                          {r.school.name}
                        </Link>
                        <span className="block text-[11px] text-pencil mt-0.5">{r.school.location}</span>
                      </td>
                      <td className="px-3 sm:px-5 py-3.5 text-right tabular-nums font-bold text-oxblood">
                        {formatPct(r.rate)}
                      </td>
                      <td className="hidden sm:table-cell px-5 py-3.5 text-right tabular-nums text-ink-2 text-xs">
                        {sat25 && sat75 ? `${sat25}–${sat75}` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table></div></div>
          <p className="text-[11px] text-pencil mt-3 text-center">
            Source: U.S. Department of Education College Scorecard. Last verified {LAST_VERIFIED}.
          </p>
        </section>

        <section className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-12 [&>h2]:mb-5">
          <h2>How to read selectivity numbers</h2>
          <p>
            An acceptance rate of 5% means the school admitted 5% of last year&apos;s applicants. It does <em>not</em> mean every applicant has a 5% chance. Pools include recruited athletes, legacies, first-generation students, and applicants with unique hooks who admit at much higher rates than the average. An unhooked applicant from an over-represented demographic faces a lower probability than the headline number.
          </p>
          <p>
            For schools at the top of this list, even applicants with perfect academics get rejected far more often than they&apos;re admitted. The differentiator is the rest of the application: essays, recommendations, activities, and demographic context that the admissions office reads holistically.
          </p>

          <h2>Why these acceptance rates keep falling</h2>
          <p>
            Acceptance rates at top schools have dropped steadily over the past two decades, driven primarily by application volume rather than capacity. The Common App has made it easier for any student to apply to 10+ schools, applicant pools have nearly doubled, and class sizes haven&apos;t grown to match. The result: rates that look apocalyptic on paper but reflect inflation in applications more than a real change in selectivity for any given applicant.
          </p>

          <h2>FAQ</h2>
          <div className="not-prose space-y-3 max-w-2xl mx-auto">
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">What is the lowest acceptance rate in the U.S.?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                The lowest published acceptance rate among major universities is currently {formatPct(ranked[0].rate)} at {ranked[0].school.name}. A handful of specialized programs (military service academies in some years, certain conservatories) report similarly low or lower rates.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Are these the same as the &ldquo;hardest&rdquo; colleges to get into?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Acceptance rate is one measure of difficulty, but not the only one. Schools with similar acceptance rates can have very different admitted-student profiles. A 5% rate at MIT (with 1530+ median SAT) means something different than a 5% rate at a school with broader demographic mixing. Use SAT/ACT ranges and yield rates alongside the acceptance rate when comparing.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Should I avoid applying to these schools?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                No — strong students should still apply to a few reach schools. Just balance them with target and safety schools. The personal odds calculator below tells you which tier each school falls into for your specific profile.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-14 pt-8 border-t border-hair">
          <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Stop guessing your odds
          </p>
          <Link
            href="/try"
            className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all"
          >
            Calculate your real odds
          </Link>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link href="/colleges" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              All colleges
            </Link>
            <Link href="/colleges/best-financial-aid" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Best financial aid
            </Link>
            <Link href="/colleges/highest-earnings" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Highest earnings
            </Link>
            <Link href="/ivy-league-essay-examples" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Ivy essay examples
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
