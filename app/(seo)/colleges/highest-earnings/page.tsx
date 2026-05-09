import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools, type School } from "@/tools/schools";
import { extraColleges } from "@/colleges/extraColleges";
import { getScorecard, formatMoneySafe } from "@/colleges/scorecard";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

export const metadata: Metadata = {
  title: "Colleges with the Highest Post-Graduation Earnings",
  description:
    "Selective U.S. colleges ranked by median earnings 10 years after entry. Real federal data on actual graduate outcomes.",
  alternates: { canonical: "/colleges/highest-earnings" },
  openGraph: {
    title: "Colleges with the Highest Post-Graduation Earnings",
    description: "Selective U.S. colleges ranked by median earnings 10 years after entry.",
    url: "/colleges/highest-earnings",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Highest earnings colleges" }],
  },
};

const allSchools: School[] = [
  ...schools,
  ...extraColleges.map((e) => ({
    slug: e.slug, name: e.name, shortName: e.shortName, location: e.location,
    state: e.state, type: e.type, category: e.category, knownFor: e.knownFor,
  })),
];

export default function HighestEarningsPage() {
  const ranked = allSchools
    .map((s) => {
      const sc = getScorecard(s.slug);
      return { school: s, sc, earnings: sc?.earnings10yr };
    })
    .filter((x): x is { school: School; sc: ReturnType<typeof getScorecard>; earnings: number } => x.earnings !== undefined && x.earnings > 0)
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 25);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
      { "@type": "ListItem", position: 3, name: "Highest Earnings", item: `${baseUrl}/colleges/highest-earnings` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Colleges with Highest Post-Graduation Earnings",
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

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Colleges", href: "/colleges" }, { label: "Highest Earnings" }]} />

        <header className="text-center mt-6 mb-12">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            10 years after entry
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 52px)", lineHeight: "1.05", letterSpacing: "-0.02em" }}
          >
            Colleges with the Highest Post-Graduation Earnings
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            Median income, federal IPEDS data, ten years after first enrollment.
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your odds
          </Link>
        </header>

        <section className="not-prose mb-12 rounded-2xl border border-hair bg-cream px-7 py-6">
          <h2 className="text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}>
            Which colleges have the highest post-graduation earnings?
          </h2>
          <p className="text-ink-2 leading-relaxed">
            By <strong className="text-ink">median earnings 10 years after entry</strong> (federal data tracked via tax records),{" "}
            <Link href={`/colleges/${ranked[0].school.slug}`} className="!text-oxblood !no-underline font-semibold hover:!text-ink">
              {ranked[0].school.name}
            </Link>{" "}
            graduates earn a median of <strong className="text-ink">{formatMoneySafe(ranked[0].earnings)}</strong>. Earnings rankings reflect a mix of school quality, student selectivity, and major distribution. Engineering- and tech-heavy schools concentrate at the top.
          </p>
        </section>

        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Ranked by Median Earnings (10 years after entry)
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <div className="overflow-x-auto"><table className="w-full text-sm min-w-[460px]">
              <thead className="bg-[#FAEEEA]">
                <tr>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em] w-10">#</th>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">School</th>
                  <th className="text-right px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">10yr median</th>
                  <th className="hidden sm:table-cell text-right px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">6yr</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((r, i) => (
                  <tr key={r.school.slug} className={i === ranked.length - 1 ? "" : "border-b border-hair"}>
                    <td className="px-3 sm:px-5 py-3.5 text-pencil tabular-nums">{i + 1}</td>
                    <td className="px-3 sm:px-5 py-3.5">
                      <Link href={`/colleges/${r.school.slug}`} className="font-semibold !text-ink !no-underline hover:!text-oxblood">
                        {r.school.name}
                      </Link>
                      <span className="block text-[11px] text-pencil mt-0.5">{r.school.location}</span>
                    </td>
                    <td className="px-3 sm:px-5 py-3.5 text-right tabular-nums font-bold text-oxblood">
                      {formatMoneySafe(r.earnings)}
                    </td>
                    <td className="hidden sm:table-cell px-5 py-3.5 text-right tabular-nums text-ink-2 text-xs">
                      {r.sc?.earnings6yr ? formatMoneySafe(r.sc.earnings6yr) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div></div>
          <p className="text-[11px] text-pencil mt-3 text-center">
            Source: U.S. Department of Education College Scorecard. Last verified {LAST_VERIFIED}.
          </p>
        </section>

        <section className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-12 [&>h2]:mb-5">
          <h2>How earnings data is calculated</h2>
          <p>
            College Scorecard earnings come from federal tax records of students who received Title IV financial aid (about two-thirds of all undergraduates). It tracks earned income 6 and 10 years after a student first enrolled, regardless of whether they graduated. The data is the most reliable post-college earnings dataset available for U.S. universities, but has known caveats.
          </p>

          <h2>Why these rankings can mislead</h2>
          <p>
            The earnings ranking conflates three things: school quality, student selectivity, and major distribution. A school full of students who&apos;d be high earners regardless (because of admit selection) will rank high even if the school added little. Engineering and tech-focused schools (MIT, Caltech, Carnegie Mellon, Harvey Mudd) appear at the top largely because their students concentrate in computer science, electrical engineering, and finance, where starting salaries are highest.
          </p>
          <p>
            For a more useful comparison, look at earnings <em>by major</em> within a school, not the school average. The Scorecard publishes this granular breakdown for most schools, and the ranking changes substantially when you control for major.
          </p>

          <h2>FAQ</h2>
          <div className="not-prose space-y-3 max-w-2xl mx-auto">
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Does college choice actually affect earnings?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Research is mixed. Studies controlling for student characteristics (Dale &amp; Krueger; Chetty et al.) find that for most students, attending a more selective school adds modestly to earnings, and for some demographics has no effect at all. The school you attend matters less than your major, your grades, and your professional network. The Scorecard rankings reflect raw earnings, not value-added.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Why isn&apos;t Harvard #1?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Harvard&apos;s student body distributes across more majors than tech-focused schools, including humanities and social sciences with lower median earnings. Tech-heavy schools (MIT, Caltech, Stanford, Carnegie Mellon) typically rank above Harvard in raw earnings because of their major distribution, not because Harvard graduates earn less in comparable fields.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">How is the median calculated?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                The median is calculated across all students who received federal financial aid and were first enrolled at the school 10 years prior, including non-completers. Earnings are reported by IRS tax filings. Students who don&apos;t file (e.g., living abroad, not employed in the U.S.) aren&apos;t counted, which can skew downward at schools with high international or non-employment rates.
              </p>
            </details>
          </div>
        </section>

        <div className="text-center mt-14 pt-8 border-t border-hair">
          <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            See your odds
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your real odds
          </Link>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link href="/colleges" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              All colleges
            </Link>
            <Link href="/colleges/most-selective" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Most selective
            </Link>
            <Link href="/colleges/best-financial-aid" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Best financial aid
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
