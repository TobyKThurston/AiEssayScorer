import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools, type School } from "@/tools/schools";
import { extraColleges } from "@/colleges/extraColleges";
import { getScorecard, formatMoneySafe, formatPctSafe } from "@/colleges/scorecard";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

export const metadata: Metadata = {
  title: "Best Colleges for Financial Aid (Lowest Net Price)",
  description:
    "Ranked list of selective U.S. colleges by lowest average net price after grants and scholarships. Real federal data on what students actually pay after aid.",
  alternates: { canonical: "/colleges/best-financial-aid" },
  openGraph: {
    title: "Best Colleges for Financial Aid (Lowest Net Price)",
    description: "Selective U.S. colleges ranked by lowest average net price after aid.",
    url: "/colleges/best-financial-aid",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Best financial aid colleges" }],
  },
};

const allSchools: School[] = [
  ...schools,
  ...extraColleges.map((e) => ({
    slug: e.slug, name: e.name, shortName: e.shortName, location: e.location,
    state: e.state, type: e.type, category: e.category, knownFor: e.knownFor,
  })),
];

export default function BestFinancialAidPage() {
  const ranked = allSchools
    .map((s) => {
      const sc = getScorecard(s.slug);
      return { school: s, sc, netPrice: sc?.avgNetPrice };
    })
    .filter((x): x is { school: School; sc: ReturnType<typeof getScorecard>; netPrice: number } => x.netPrice !== undefined && x.netPrice >= 0)
    .sort((a, b) => a.netPrice - b.netPrice)
    .slice(0, 25);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
      { "@type": "ListItem", position: 3, name: "Best Financial Aid", item: `${baseUrl}/colleges/best-financial-aid` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Colleges for Financial Aid",
    numberOfItems: ranked.length,
    itemListElement: ranked.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.school.name,
      url: `${baseUrl}/colleges/${r.school.slug}`,
    })),
  };

  return (
    <article className="pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Colleges", href: "/colleges" }, { label: "Best Financial Aid" }]} />

        <header className="text-center mt-6 mb-12">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            Lowest net price after grants
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: "1.05", letterSpacing: "-0.02em" }}
          >
            Best Colleges for Financial Aid
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            Real average net price, federal data. The number families actually pay.
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your odds
          </Link>
        </header>

        <section className="not-prose mb-12 rounded-2xl border border-hair bg-cream px-7 py-6">
          <h2 className="text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}>
            Which selective colleges have the best financial aid?
          </h2>
          <p className="text-ink-2 leading-relaxed">
            By <strong className="text-ink">average net price</strong> (cost of attendance minus grants and scholarships, federal IPEDS data),{" "}
            <Link href={`/colleges/${ranked[0].school.slug}`} className="!text-oxblood !no-underline font-semibold hover:!text-ink">
              {ranked[0].school.name}
            </Link>{" "}
            has the lowest average net price at <strong className="text-ink">{formatMoneySafe(ranked[0].netPrice)}</strong> per year. Most highly selective private universities meet 100% of demonstrated need for families below specific income thresholds, often without loans.
          </p>
        </section>

        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Ranked by Average Net Price
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <table className="w-full text-sm">
              <thead className="bg-[#FAEEEA]">
                <tr>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em] w-10">#</th>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">School</th>
                  <th className="text-right px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Net price</th>
                  <th className="hidden sm:table-cell text-right px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">COA</th>
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
                      {formatMoneySafe(r.netPrice)}
                    </td>
                    <td className="hidden sm:table-cell px-5 py-3.5 text-right tabular-nums text-ink-2 text-xs">
                      {r.sc?.coa ? formatMoneySafe(r.sc.coa) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-pencil mt-3 text-center">
            Source: U.S. Department of Education College Scorecard (IPEDS). Last verified {LAST_VERIFIED}.
          </p>
        </section>

        <section className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-12 [&>h2]:mb-5">
          <h2>What &ldquo;net price&rdquo; actually means</h2>
          <p>
            Net price is the cost of attendance minus all grants and scholarships, averaged across all aid recipients at the school. It&apos;s the most honest cost number a school can publish because it accounts for the financial aid most students receive. Federal IPEDS data calculates this annually for every Title IV institution.
          </p>
          <p>
            What it doesn&apos;t capture: your <em>specific</em> family situation. Two students attending the same school with similar costs of attendance can pay very different amounts based on income, assets, family size, and other factors. Use the school&apos;s own net price calculator (every Title IV school is required to have one) for a personalized estimate before applying.
          </p>

          <h2>Why elite schools often cost less than state schools</h2>
          <p>
            It&apos;s counterintuitive but consistent: highly selective private universities frequently have lower <em>net</em> prices than flagship state universities for middle- and lower-income families. The mechanism is simple. Top private schools have enormous endowments and generous aid policies (Harvard, Princeton, Stanford, MIT, Yale all have no-loan financial aid for families below specific income thresholds). State schools have lower sticker prices but smaller aid budgets per student.
          </p>
          <p>
            For a family earning under $80,000, attending Harvard can cost less than attending the in-state flagship. This is a real, repeatable pattern. The catch: you have to be admitted, which is the actual hard part.
          </p>

          <h2>FAQ</h2>
          <div className="not-prose space-y-3 max-w-2xl mx-auto">
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Which colleges meet 100% of demonstrated financial need?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Roughly 70 U.S. colleges publicly commit to meeting 100% of demonstrated financial need. The full list overlaps heavily with the most selective schools (all 8 Ivies, MIT, Stanford, Caltech, Duke, Notre Dame, Vanderbilt, and most top liberal arts colleges). Some go further with no-loan policies for incomes under defined thresholds.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Are these need-based or merit-based numbers?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Net price reflects all institutional aid (need-based grants, merit scholarships, federal grants like Pell). Most top private universities give predominantly need-based aid. Some highly-ranked schools (Vanderbilt, USC, Notre Dame, Boston College) also offer significant merit scholarships.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Should I apply early decision to get better aid?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Generally no. ED is binding and removes your ability to compare aid offers. If finances are a serious factor, apply Regular Decision so you can negotiate. Single-Choice Early Action (Harvard, Stanford, Yale, Princeton, Notre Dame) is non-binding and doesn&apos;t have this problem.
              </p>
            </details>
          </div>
        </section>

        <div className="text-center mt-14 pt-8 border-t border-hair">
          <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Find your odds
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
            <Link href="/colleges/highest-earnings" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Highest earnings
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
