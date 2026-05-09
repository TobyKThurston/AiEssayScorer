import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools, type School } from "@/tools/schools";
import { extraColleges } from "@/colleges/extraColleges";
import { getStats, formatPct, type CollegeStat } from "@/colleges/collegeStats";
import { extraStats } from "@/colleges/extraColleges";
import { getScorecard, formatPctSafe, formatMoneySafe } from "@/colleges/scorecard";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

type Props = { params: Promise<{ state: string }> };

const allSchools: School[] = [
  ...schools,
  ...extraColleges.map((e) => ({
    slug: e.slug, name: e.name, shortName: e.shortName, location: e.location,
    state: e.state, type: e.type, category: e.category, knownFor: e.knownFor,
  })),
];

const STATE_NAMES: Record<string, string> = {
  CA: "California", NY: "New York", MA: "Massachusetts", PA: "Pennsylvania",
  VA: "Virginia", TX: "Texas", CT: "Connecticut", IL: "Illinois", DC: "Washington, D.C.",
  NC: "North Carolina", FL: "Florida", OH: "Ohio", GA: "Georgia", WA: "Washington",
  ME: "Maine", MD: "Maryland", IN: "Indiana", MI: "Michigan", NJ: "New Jersey",
  RI: "Rhode Island", NH: "New Hampshire", MN: "Minnesota", IA: "Iowa", LA: "Louisiana",
  TN: "Tennessee", MO: "Missouri", CO: "Colorado", OR: "Oregon", AZ: "Arizona",
  AL: "Alabama", SC: "South Carolina", VT: "Vermont", NM: "New Mexico", WI: "Wisconsin",
};

const ELIGIBLE_STATES = [
  "ca","ny","ma","pa","va","tx","ct","il","dc","nc","fl","oh","ga","wa","me",
  "md","in","mi","nj","ri","nh","mn","ia","tn","mo","co","wi",
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

// State-name match handles "California" / "Massachusetts" form locations
function matchesState(school: School, code: string): boolean {
  const upperCode = code.toUpperCase();
  if (school.state === upperCode) return true;
  // Some entries use full names (e.g., "Massachusetts")
  const fullName = STATE_NAMES[upperCode];
  if (school.state === fullName) return true;
  return false;
}

export function generateStaticParams() {
  return ELIGIBLE_STATES.map((s) => ({ state: s }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const code = state.toUpperCase();
  const stateName = STATE_NAMES[code];
  if (!stateName) return {};
  const matched = allSchools.filter((s) => matchesState(s, code));

  return {
    title: `Best Colleges in ${stateName}: Acceptance Rates, SAT Scores & Cost`,
    description: `${matched.length} most selective universities and liberal arts colleges in ${stateName}, ranked by acceptance rate. Real published admissions data, financial aid, and outcomes.`,
    alternates: { canonical: `/colleges/by-state/${state.toLowerCase()}` },
    openGraph: {
      title: `Best Colleges in ${stateName}`,
      description: `Top selective colleges in ${stateName} ranked by acceptance rate, with real published admissions data.`,
      url: `/colleges/by-state/${state.toLowerCase()}`,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `Best colleges in ${stateName}` }],
    },
  };
}

export default async function StatePage({ params }: Props) {
  const { state } = await params;
  const code = state.toUpperCase();
  const stateName = STATE_NAMES[code];
  if (!stateName) return notFound();

  const inState = allSchools
    .filter((s) => matchesState(s, code))
    .map((s) => ({ school: s, rate: lookupAdmitRate(s.slug) }))
    .filter((x): x is { school: School; rate: number } => x.rate !== undefined)
    .sort((a, b) => a.rate - b.rate);

  if (inState.length === 0) return notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
      { "@type": "ListItem", position: 3, name: `${stateName} Colleges`, item: `${baseUrl}/colleges/by-state/${state.toLowerCase()}` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best Colleges in ${stateName}`,
    numberOfItems: inState.length,
    itemListElement: inState.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.school.name,
      url: `${baseUrl}/colleges/${r.school.slug}`,
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Best Colleges in ${stateName}`,
    datePublished: "2026-05-09",
    dateModified: "2026-05-09",
    author: { "@type": "Organization", name: "Ivy Admit", url: baseUrl },
    publisher: {
      "@type": "Organization",
      name: "Ivy Admit",
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/icon-192.png` },
    },
  };

  const mostSelective = inState[0];
  const easiest = inState[inState.length - 1];
  const avgRate = inState.reduce((sum, r) => sum + r.rate, 0) / inState.length;
  const publics = inState.filter((r) => r.school.type === "Public");
  const privates = inState.filter((r) => r.school.type === "Private");

  // Best value (lowest avg net price)
  const valueRanked = inState
    .map((r) => ({ ...r, sc: getScorecard(r.school.slug) }))
    .filter((r) => r.sc?.avgNetPrice !== undefined)
    .sort((a, b) => (a.sc!.avgNetPrice as number) - (b.sc!.avgNetPrice as number));
  const bestValue = valueRanked[0];

  // Highest earnings
  const earningsRanked = inState
    .map((r) => ({ ...r, sc: getScorecard(r.school.slug) }))
    .filter((r) => r.sc?.earnings10yr !== undefined)
    .sort((a, b) => (b.sc!.earnings10yr as number) - (a.sc!.earnings10yr as number));
  const topEarnings = earningsRanked[0];

  // State-specific aid programs (manual)
  const stateAidPrograms: Record<string, string> = {
    CA: "Cal Grant (need-based; up to ~$15K at private schools, full tuition at UCs/CSUs for eligible families)",
    NY: "Excelsior Scholarship (free SUNY/CUNY tuition for in-state families under specific income thresholds)",
    GA: "HOPE Scholarship and Zell Miller Scholarship (merit-based; covers tuition at in-state public universities)",
    FL: "Bright Futures Scholarship (merit-based; covers 75–100% of in-state tuition)",
    TX: "Texas Grant and TEXAS Grant (need-based; covers a portion of tuition at public universities)",
    NC: "North Carolina Need-Based Scholarship for in-state public university students",
    VA: "Virginia Tuition Assistance Grant (small but stackable for in-state students at private schools)",
    MA: "MASSGrant (need-based aid for in-state students at Massachusetts colleges)",
    PA: "PHEAA State Grant (need-based; in-state Pennsylvania residents)",
    NJ: "Tuition Aid Grant (TAG) (need-based; covers in-state tuition at NJ public/private)",
    IL: "Monetary Award Program (MAP) Grant (need-based; in-state Illinois students)",
    OH: "Ohio College Opportunity Grant (need-based for low-income in-state students)",
    MI: "Michigan Achievement Scholarship (need-based; in-state students at participating institutions)",
    WA: "Washington College Grant (formerly State Need Grant; covers full tuition for very low income)",
    MN: "Minnesota State Grant (need-based, in-state)",
    IN: "Indiana Frank O'Bannon Grant (need-based, in-state)",
    WI: "Wisconsin Grant (need-based, in-state)",
    MD: "Maryland Howard P. Rawlings Educational Assistance Grant (need-based)",
    CT: "Roberta B. Willis Need-Based Grant (in-state students)",
    LA: "TOPS (merit-based; covers tuition at Louisiana public universities)",
  };
  const aidProgram = stateAidPrograms[code];

  return (
    <article className="pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Colleges", href: "/colleges" },
            { label: stateName },
          ]}
        />

        <header className="text-center mt-6 mb-12">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            {inState.length} selective schools · {stateName}
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 52px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
            }}
          >
            Best Colleges in {stateName}
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            Ranked by acceptance rate. Real published data.
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your odds at any school
          </Link>
        </header>

        <section className="not-prose mb-12 rounded-2xl border border-hair bg-cream px-7 py-6">
          <h2 className="text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}>
            What is the most selective college in {stateName}?
          </h2>
          <p className="text-ink-2 leading-relaxed">
            <Link href={`/colleges/${mostSelective.school.slug}`} className="!text-oxblood !no-underline font-semibold hover:!text-ink">
              {mostSelective.school.name}
            </Link>{" "}
            currently has the lowest acceptance rate among selective {stateName} schools at{" "}
            <strong className="text-ink">{formatPct(mostSelective.rate)}</strong>. The average acceptance rate across these {inState.length} {stateName} institutions is <strong className="text-ink">{formatPct(avgRate)}</strong>.
          </p>
        </section>

        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Ranked by Acceptance Rate
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <table className="w-full text-sm">
              <thead className="bg-[#FAEEEA]">
                <tr>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em] w-10">#</th>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">School</th>
                  <th className="text-right px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Accept</th>
                  <th className="hidden sm:table-cell text-right px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">SAT</th>
                  <th className="hidden md:table-cell text-right px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Net price</th>
                </tr>
              </thead>
              <tbody>
                {inState.map((r, i) => {
                  const stat = lookupStats(r.school.slug);
                  const sc = getScorecard(r.school.slug);
                  const sat25 = stat?.sat?.p25 ?? sc?.sat25;
                  const sat75 = stat?.sat?.p75 ?? sc?.sat75;
                  return (
                    <tr key={r.school.slug} className={i === inState.length - 1 ? "" : "border-b border-hair"}>
                      <td className="px-3 sm:px-5 py-3.5 text-pencil tabular-nums">{i + 1}</td>
                      <td className="px-3 sm:px-5 py-3.5">
                        <Link href={`/colleges/${r.school.slug}`} className="font-semibold !text-ink !no-underline hover:!text-oxblood">
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
                      <td className="hidden md:table-cell px-5 py-3.5 text-right tabular-nums text-ink-2 text-xs">
                        {sc?.avgNetPrice !== undefined ? formatMoneySafe(sc.avgNetPrice) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-pencil mt-3 text-center">
            Source: U.S. Department of Education College Scorecard. Last verified {LAST_VERIFIED}.
          </p>
        </section>

        {/* Best of state highlight cards */}
        {(bestValue || topEarnings) && (
          <section className="not-prose mb-14">
            <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
              Standouts in {stateName}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bestValue && (
                <Link
                  href={`/colleges/${bestValue.school.slug}`}
                  className="block rounded-xl border border-hair bg-cream p-5 !no-underline hover:border-ink hover:shadow-sm transition-all"
                >
                  <p className="text-[10px] font-semibold text-oxblood uppercase tracking-[0.15em] mb-1">
                    Best value
                  </p>
                  <p className="text-base font-bold !text-ink mb-1">{bestValue.school.name}</p>
                  <p className="text-xs !text-ink-2">
                    Average net price: <span className="!text-oxblood font-semibold">{formatMoneySafe(bestValue.sc!.avgNetPrice)}</span>/yr after aid
                  </p>
                </Link>
              )}
              {topEarnings && (
                <Link
                  href={`/colleges/${topEarnings.school.slug}`}
                  className="block rounded-xl border border-hair bg-cream p-5 !no-underline hover:border-ink hover:shadow-sm transition-all"
                >
                  <p className="text-[10px] font-semibold text-oxblood uppercase tracking-[0.15em] mb-1">
                    Highest earnings
                  </p>
                  <p className="text-base font-bold !text-ink mb-1">{topEarnings.school.name}</p>
                  <p className="text-xs !text-ink-2">
                    10-yr median earnings: <span className="!text-oxblood font-semibold">{formatMoneySafe(topEarnings.sc!.earnings10yr)}</span>
                  </p>
                </Link>
              )}
            </div>
          </section>
        )}

        <section className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-12 [&>h2]:mb-5">
          <h2>The {stateName} Selective Landscape</h2>
          <p>
            {stateName} has {inState.length} selective universities and colleges in this dataset:{" "}
            {publics.length > 0 && `${publics.length} public ${publics.length === 1 ? "institution" : "institutions"}`}
            {publics.length > 0 && privates.length > 0 && " and "}
            {privates.length > 0 && `${privates.length} private ${privates.length === 1 ? "institution" : "institutions"}`}
            . Acceptance rates range from{" "}
            <strong>{formatPct(mostSelective.rate)}</strong> at {mostSelective.school.shortName} to{" "}
            <strong>{formatPct(easiest.rate)}</strong> at {easiest.school.shortName}, with a state average of{" "}
            <strong>{formatPct(avgRate)}</strong>. {publics.length >= 2 ? `For in-state students, the public options offer significantly lower net prices than out-of-state alternatives, often by ${formatMoneySafe(15000)} or more per year.` : ""}
          </p>

          <h2>In-State vs. Out-of-State: The Hidden Discount</h2>
          <p>
            Public university acceptance rates published nationally aggregate in-state and out-of-state applicants. The actual rates split substantially. Most {stateName} public flagships admit in-state residents at acceptance rates 10–25 percentage points higher than their published headline numbers. The reverse is also true: for out-of-state applicants, the effective acceptance rate at these schools is often well below the published figure.
          </p>
          <p>
            Tuition follows the same logic. {stateName} residents typically pay $20,000–$30,000 less per year at in-state public universities than non-residents. Combined with state-specific aid programs, that gap often makes a state flagship the highest-ROI option for in-state students even when private schools meet 100% of demonstrated need.
          </p>

          {aidProgram && (
            <>
              <h2>{stateName}-Specific Aid You Should Know</h2>
              <p>
                Beyond federal Pell Grants and institutional aid, {stateName} runs its own student aid program: <strong>{aidProgram}</strong>. Eligibility rules vary year to year. Always check the most recent state guidance and FAFSA requirements before counting on any specific dollar amount.
              </p>
            </>
          )}

          <h2>How to Use This List</h2>
          <p>
            Acceptance rate is the most direct selectivity signal but tells you nothing about your personal odds. Schools with similar admit rates can have very different admitted-student profiles. {stateName} has a mix of national-tier privates, in-state flagships (with substantially higher admit rates for residents than non-residents), and selective liberal arts colleges. Each plays a different role in a balanced college list.
          </p>
          <p>
            For most in-state {stateName} applicants, the right college list mixes one or two reach privates, a flagship public as a target with strong odds and low net price, and at least one safety. Use the calculator to estimate your personal odds at each before deciding which to ED.
          </p>

          <h2>FAQ</h2>
          <div className="not-prose space-y-3 max-w-2xl mx-auto">
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">What is the easiest college to get into in {stateName}?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Among selective {stateName} institutions tracked here, {inState[inState.length - 1].school.name} has the highest acceptance rate ({formatPct(inState[inState.length - 1].rate)}). For broader admissions options, the in-state community college and CSU/SUNY/state university systems offer significantly higher admit rates than these competitive schools.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Are in-state public schools easier to get into than the published rate?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Yes, often dramatically so. Public flagships report aggregate acceptance rates that mix in-state and out-of-state pools. In-state residents typically face acceptance rates 10–30 percentage points higher than the headline number. Out-of-state applicants face rates lower than the headline. Check each school&apos;s Common Data Set for the residency-split breakdown.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Should I apply to schools outside {stateName}?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Most students should apply to a mix. Private universities have no in-state preference (Harvard treats a {stateName} applicant the same as a Wyoming applicant). Out-of-state public flagships typically charge much higher tuition. The right balance depends on your odds, financial picture, and willingness to leave home.
              </p>
            </details>
          </div>
        </section>

        <div className="text-center mt-14 pt-8 border-t border-hair">
          <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            See your odds at any of these
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your odds
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
