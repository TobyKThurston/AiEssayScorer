import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools, type SchoolCategory, type School } from "@/tools/schools";
import { getStats, formatPct, type CollegeStat } from "@/colleges/collegeStats";
import { extraColleges, extraStats } from "@/colleges/extraColleges";

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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

export const metadata: Metadata = {
  title: "College Admissions Stats: Acceptance Rates, SAT, GPA & Your Odds",
  description:
    "Real admissions data for the most selective universities in the U.S. Acceptance rates, SAT and ACT ranges, costs, and a calculator that estimates your personal odds at each school.",
  alternates: { canonical: "/colleges" },
  openGraph: {
    title: "College Admissions Stats and Your Odds | Ivy Admit",
    description:
      "Real acceptance rates, SAT/ACT ranges, and admissions data for the most selective universities. Plus a calculator that estimates your personal odds.",
    url: "/colleges",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "College admissions stats" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Stats and Your Odds",
    images: ["/og-image.png"],
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "College Admissions Stats",
  url: `${baseUrl}/colleges`,
  description:
    "Acceptance rates, SAT and ACT ranges, costs, and admissions stats for the most selective universities in the United States.",
  hasPart: allSchools.map((s) => ({
    "@type": "CollegeOrUniversity",
    name: s.name,
    url: `${baseUrl}/colleges/${s.slug}`,
    address: { "@type": "PostalAddress", addressLocality: s.location, addressCountry: "US" },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
  ],
};

const CATEGORY_ORDER: SchoolCategory[] = [
  "Ivy League",
  "Elite Private",
  "Top Tech / STEM",
  "Selective Private",
  "Top Public",
  "Liberal Arts",
];

export default function CollegesIndexPage() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: allSchools
      .filter((s) => s.category === category)
      .sort((a, b) => {
        const sa = lookupStats(a.slug)?.acceptanceRate ?? 1;
        const sb = lookupStats(b.slug)?.acceptanceRate ?? 1;
        return sa - sb;
      }),
  })).filter((g) => g.items.length > 0);

  const totalSchools = allSchools.length;

  return (
    <article className="pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Colleges" },
          ]}
        />

        {/* Hero — centered */}
        <header className="text-center mt-6 mb-16">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            {totalSchools} schools · Real published data
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(38px, 5.5vw, 56px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
            }}
          >
            College admissions, by the numbers
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-8 max-w-xl mx-auto leading-snug">
            Acceptance rates and test scores you can verify. A way to find out where you actually stand.
          </p>
          <Link
            href="/try"
            className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all"
          >
            Calculate your odds
          </Link>
        </header>

        {/* Intro callout — centered */}
        <div className="not-prose max-w-xl mx-auto text-center mb-12">
          <p className="text-ink-2 text-base leading-relaxed">
            Acceptance rates tell you what percentage of applicants got in last cycle. They don&apos;t tell you your chances. The pool average bundles together legacy applicants, recruited athletes, first-generation students, and unhooked applicants. Each school below has the real published stats. The calculator estimates a probability that fits your profile.
          </p>
        </div>

        {/* Best-of category links */}
        <div className="not-prose mb-16">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-5">
            Browse by ranking
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            <Link
              href="/colleges/most-selective"
              className="block rounded-xl border border-hair bg-cream p-5 !no-underline hover:border-ink hover:shadow-sm transition-all text-center"
            >
              <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.15em] mb-1">Acceptance rate</p>
              <p className="text-base font-bold !text-ink">Most selective</p>
              <p className="text-xs text-pencil mt-1">Top 25 lowest admit rates</p>
            </Link>
            <Link
              href="/colleges/best-financial-aid"
              className="block rounded-xl border border-hair bg-cream p-5 !no-underline hover:border-ink hover:shadow-sm transition-all text-center"
            >
              <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.15em] mb-1">Net price</p>
              <p className="text-base font-bold !text-ink">Best financial aid</p>
              <p className="text-xs text-pencil mt-1">Lowest cost after aid</p>
            </Link>
            <Link
              href="/colleges/highest-earnings"
              className="block rounded-xl border border-hair bg-cream p-5 !no-underline hover:border-ink hover:shadow-sm transition-all text-center"
            >
              <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.15em] mb-1">Outcomes</p>
              <p className="text-base font-bold !text-ink">Highest earnings</p>
              <p className="text-xs text-pencil mt-1">Median pay 10yrs after</p>
            </Link>
          </div>
        </div>

        {grouped.map(({ category, items }) => (
          <section key={category} className="mt-16">
            <h2
              className="text-center text-ink mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 30px)",
                letterSpacing: "-0.01em",
              }}
            >
              {category}
            </h2>
            <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-7">
              {items.length} {items.length === 1 ? "school" : "schools"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((s) => {
                const stat = lookupStats(s.slug);
                return (
                  <Link
                    key={s.slug}
                    href={`/colleges/${s.slug}`}
                    className="block rounded-xl border border-hair bg-cream p-5 !no-underline hover:border-ink hover:shadow-sm transition-all"
                  >
                    <p className="text-[10px] font-semibold text-pencil uppercase tracking-[0.15em] mb-1">
                      {s.location}
                    </p>
                    <p className="text-base font-bold text-ink mb-2">{s.name}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2 tabular-nums">
                      {stat && (
                        <span>
                          <span className="text-oxblood font-semibold">
                            {formatPct(stat.acceptanceRate)}
                          </span>{" "}
                          accept
                        </span>
                      )}
                      {stat?.sat && (
                        <span>
                          SAT {stat.sat.p25}&ndash;{stat.sat.p75}
                        </span>
                      )}
                      {stat?.usnewsRank !== undefined && (
                        <span>#{stat.usnewsRank} U.S. News</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Reading guide — centered */}
        <section className="mt-20 max-w-xl mx-auto">
          <h2
            className="text-center text-ink mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 30px)",
              letterSpacing: "-0.01em",
            }}
          >
            How to read these numbers
          </h2>
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-8">
            What the headline rates actually mean
          </p>

          <div className="space-y-7 text-ink-2 leading-relaxed">
            <div>
              <p className="text-sm font-semibold text-ink mb-1.5 tracking-wide">Acceptance rate</p>
              <p>
                The percentage of applicants offered admission last cycle. A 5% rate does not mean every applicant had a 5% chance. Applicants with hooks (recruited athletes, legacies, first-generation status, development cases) admit at much higher rates. Unhooked applicants from over-represented demographics admit at lower rates than the headline number.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink mb-1.5 tracking-wide">SAT / ACT mid-50%</p>
              <p>
                A quarter of admitted students scored above the upper number. A quarter scored below the lower number. Scores in this range are necessary but not sufficient. Scores below are not disqualifying. Applicants get in below the 25th percentile every year, especially with strong context elsewhere.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink mb-1.5 tracking-wide">Early decision rates</p>
              <p>
                Typically 2 to 4 times higher than regular decision rates. Most of that difference is composition. ED pools contain more recruited athletes and legacies. The boost for an unhooked applicant is real but smaller than the published numbers suggest. Apply ED to a school you genuinely prefer, not just to chase the higher rate.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink mb-1.5 tracking-wide">Cost of attendance</p>
              <p>
                The published sticker price before financial aid. Most highly selective private universities meet 100% of demonstrated need without loans for families below specific income thresholds. The number that matters for your family is your net price, not the COA.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-20 pt-8 border-t border-hair text-center">
          <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Keep going
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/try"
              className="px-4 py-2 rounded-full bg-ink !text-white !no-underline text-sm font-medium hover:bg-oxblood hover:!text-white transition-all"
            >
              Calculate your odds
            </Link>
            <Link
              href="/ivy-league-essay-examples"
              className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
            >
              Ivy essay examples
            </Link>
            <Link
              href="/common-app-essay-help"
              className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
            >
              Common App help
            </Link>
            <Link
              href="/how-to-improve-college-essay"
              className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
            >
              Improve your essay
            </Link>
            <Link
              href="/tools"
              className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
            >
              All free tools
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
