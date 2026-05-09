import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools, type School } from "@/tools/schools";
import { extraColleges } from "@/colleges/extraColleges";
import { getStats, type CollegeStat } from "@/colleges/collegeStats";
import { extraStats } from "@/colleges/extraColleges";
import {
  getScorecard,
  formatPctSafe,
  formatMoneySafe,
  type ScorecardData,
} from "@/colleges/scorecard";
import { matchups, parseMatchupSlug } from "@/colleges/matchups";

type Props = { params: Promise<{ matchup: string }> };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

const allSchools: School[] = [
  ...schools,
  ...extraColleges.map((e) => ({
    slug: e.slug, name: e.name, shortName: e.shortName, location: e.location,
    state: e.state, type: e.type, category: e.category, knownFor: e.knownFor,
  })),
];

function findSchool(slug: string): School | null {
  return allSchools.find((s) => s.slug === slug) ?? null;
}

function findStats(slug: string): CollegeStat | null {
  const curated = getStats(slug);
  if (curated) return curated;
  const extra = extraStats[slug];
  if (!extra) return null;
  return extra as CollegeStat;
}

interface ResolvedSchool {
  school: School;
  stat: CollegeStat | null;
  sc: ScorecardData | null;
  admitRate?: number;
  sat25?: number;
  sat75?: number;
  act25?: number;
  act75?: number;
  coa?: number;
  netPrice?: number;
  enrollment?: number;
  completion?: number;
  earnings?: number;
}

function resolve(slug: string): ResolvedSchool | null {
  const school = findSchool(slug);
  if (!school) return null;
  const stat = findStats(slug);
  const sc = getScorecard(slug);
  return {
    school,
    stat,
    sc,
    admitRate: stat?.acceptanceRate ?? sc?.admitRate,
    sat25: stat?.sat?.p25 ?? sc?.sat25,
    sat75: stat?.sat?.p75 ?? sc?.sat75,
    act25: stat?.act?.p25 ?? sc?.act25,
    act75: stat?.act?.p75 ?? sc?.act75,
    coa: stat?.coa ?? sc?.coa,
    netPrice: sc?.avgNetPrice,
    enrollment: stat?.undergradEnrollment ?? sc?.undergradEnrollment,
    completion: sc?.completion4yr,
    earnings: sc?.earnings10yr,
  };
}

export function generateStaticParams() {
  return matchups.map(([a, b]) => ({ matchup: `${a}-vs-${b}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { matchup } = await params;
  const parsed = parseMatchupSlug(matchup);
  if (!parsed) return {};
  const [a, b] = parsed;
  const ra = resolve(a);
  const rb = resolve(b);
  if (!ra || !rb) return {};

  const aName = ra.school.shortName;
  const bName = rb.school.shortName;
  const title = `${aName} vs. ${bName}: Acceptance Rate, SAT, Cost & Outcomes Compared`;
  const description = `Side-by-side comparison of ${ra.school.name} and ${rb.school.name}. Real acceptance rates (${formatPctSafe(ra.admitRate)} vs ${formatPctSafe(rb.admitRate)}), SAT ranges, financial aid, and outcomes. Plus a calculator that estimates your odds at both.`;

  return {
    title,
    description,
    keywords: [
      `${aName} vs ${bName}`,
      `${bName} vs ${aName}`,
      `${aName} or ${bName}`,
      `${aName} ${bName} comparison`,
      `which is better ${aName} or ${bName}`,
      `${aName} ${bName} acceptance rate`,
    ],
    alternates: { canonical: `/colleges/compare/${matchup}` },
    openGraph: {
      title: `${aName} vs ${bName}: Real Stats Compared`,
      description,
      url: `/colleges/compare/${matchup}`,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${aName} vs ${bName} comparison` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${aName} vs ${bName}`,
      images: ["/og-image.png"],
    },
  };
}

function winner<T extends number | undefined>(
  a: T,
  b: T,
  preference: "lower" | "higher",
): "a" | "b" | "tie" | "unknown" {
  if (a === undefined || b === undefined) return "unknown";
  if (a === b) return "tie";
  if (preference === "lower") return a < b ? "a" : "b";
  return a > b ? "a" : "b";
}

export default async function CompareCollegePage({ params }: Props) {
  const { matchup } = await params;
  const parsed = parseMatchupSlug(matchup);
  if (!parsed) return notFound();
  const [a, b] = parsed;
  const ra = resolve(a);
  const rb = resolve(b);
  if (!ra || !rb) return notFound();

  const aName = ra.school.shortName;
  const bName = rb.school.shortName;

  // Determine winners across metrics for the headline
  const harderToGetIn = winner(ra.admitRate, rb.admitRate, "lower");
  const cheaperNet = winner(ra.netPrice, rb.netPrice, "lower");
  const higherEarnings = winner(ra.earnings, rb.earnings, "higher");
  const higherSAT = winner(ra.sat75, rb.sat75, "higher");
  const higherCompletion = winner(ra.completion, rb.completion, "higher");

  // Featured-snippet / AI-citation answer blocks (≈80–150 words, self-contained)
  const harderName = harderToGetIn === "a" ? aName : bName;
  const easierName = harderToGetIn === "a" ? bName : aName;
  const harderRate = harderToGetIn === "a" ? ra.admitRate : rb.admitRate;
  const easierRate = harderToGetIn === "a" ? rb.admitRate : ra.admitRate;
  const harderSAT75 = harderToGetIn === "a" ? ra.sat75 : rb.sat75;
  const easierSAT75 = harderToGetIn === "a" ? rb.sat75 : ra.sat75;
  const harderAnswer =
    harderToGetIn === "tie"
      ? `${aName} and ${bName} have similar acceptance rates of ${formatPctSafe(ra.admitRate)} and ${formatPctSafe(rb.admitRate)} respectively, so neither school is meaningfully harder to get into on the headline metric. The deciding factors come down to applicant strength signals beyond the rate itself: SAT 75th percentiles (${ra.sat75 ?? "n/a"} at ${aName} vs ${rb.sat75 ?? "n/a"} at ${bName}), six-year graduation rate (${ra.completion ? formatPctSafe(ra.completion) : "n/a"} vs ${rb.completion ? formatPctSafe(rb.completion) : "n/a"}), and how much each school's published rate is inflated by recruited athletes, legacies, and other hooked applicants in the pool.`
      : `${harderName} is harder to get into than ${easierName}. ${harderName}'s acceptance rate is ${formatPctSafe(harderRate)} compared with ${formatPctSafe(easierRate)} at ${easierName} — for every 100 applicants, roughly ${Math.round((harderRate ?? 0) * 100)} are admitted at ${harderName} versus ${Math.round((easierRate ?? 0) * 100)} at ${easierName}. Admitted-student test scores reinforce this: ${harderName}'s 75th percentile SAT is ${harderSAT75 ?? "n/a"}, compared with ${easierSAT75 ?? "n/a"} at ${easierName}. Note that published acceptance rates compress an important distinction — both pools concentrate hooked applicants (recruited athletes, legacies, first-generation), so the unhooked-applicant admit gap is typically smaller than the headline-rate difference suggests.`;

  const cheaperName = cheaperNet === "a" ? aName : bName;
  const pricierName = cheaperNet === "a" ? bName : aName;
  const cheaperPrice = cheaperNet === "a" ? ra.netPrice : rb.netPrice;
  const pricierPrice = cheaperNet === "a" ? rb.netPrice : ra.netPrice;
  const priceGap = Math.abs((pricierPrice ?? 0) - (cheaperPrice ?? 0));
  const cheaperAnswer =
    cheaperNet === "tie"
      ? `Average net prices at ${aName} (${formatMoneySafe(ra.netPrice)}) and ${bName} (${formatMoneySafe(rb.netPrice)}) are similar, but that headline number masks substantial variation by family income. Both schools' published averages combine students across income brackets, including those who pay full price. The actual price for a specific family depends on income, assets, and any merit aid offered. Run each school's official Net Price Calculator before letting cost drive the decision; the four-year out-of-pocket gap between two schools at the same family income often exceeds $40,000 even when published average net prices are nearly identical.`
      : `${cheaperName} costs less than ${pricierName} on average. After grants and scholarships, ${cheaperName}'s average net price is ${formatMoneySafe(cheaperPrice)} per year compared with ${formatMoneySafe(pricierPrice)} at ${pricierName} — a published gap of about ${formatMoneySafe(priceGap)} per year before any merit aid. The actual price for a specific family depends on income, assets, and merit awards, so always run each school's official Net Price Calculator before deciding. These figures cover tuition, fees, room, and board, and they assume on-campus residence with a standard meal plan, which is how most need-based aid packages are calibrated.`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
      { "@type": "ListItem", position: 3, name: `${aName} vs ${bName}`, item: `${baseUrl}/colleges/compare/${matchup}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${baseUrl}/colleges/compare/${matchup}#article`,
    headline: `${aName} vs. ${bName}: Real Stats Compared`,
    description: `Side-by-side comparison of ${ra.school.name} and ${rb.school.name}.`,
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/og-image.png`,
      width: 1200,
      height: 630,
    },
    datePublished: "2026-05-09",
    dateModified: "2026-05-09",
    author: {
      "@type": "Person",
      name: "Ivy Admit Editorial Team",
      url: `${baseUrl}/about`,
      jobTitle: "Editorial Team",
      worksFor: { "@type": "Organization", name: "Ivy Admit", url: baseUrl },
      description:
        "Editors at Ivy Admit covering selective US college admissions, application strategy, and essay craft.",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Ivy Admit",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/colleges/compare/${matchup}` },
    about: [
      { "@type": "CollegeOrUniversity", name: ra.school.name, url: `${baseUrl}/colleges/${a}` },
      { "@type": "CollegeOrUniversity", name: rb.school.name, url: `${baseUrl}/colleges/${b}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${aName} or ${bName} harder to get into?`,
        acceptedAnswer: { "@type": "Answer", text: harderAnswer },
      },
      {
        "@type": "Question",
        name: `Which is cheaper, ${aName} or ${bName}?`,
        acceptedAnswer: { "@type": "Answer", text: cheaperAnswer },
      },
      ra.earnings && rb.earnings
        ? {
            "@type": "Question",
            name: `Which has higher post-graduation earnings, ${aName} or ${bName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${higherEarnings === "a" ? aName : bName} graduates earn more on average. Median earnings 10 years after entry are ${formatMoneySafe(ra.earnings)} at ${aName} and ${formatMoneySafe(rb.earnings)} at ${bName}.`,
            },
          }
        : null,
    ].filter(Boolean),
  };

  return (
    <article className="pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Colleges", href: "/colleges" },
            { label: `${aName} vs ${bName}` },
          ]}
        />

        {/* Hero */}
        <header className="text-center mt-6 mb-10">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            Head-to-head comparison
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(26px, 5vw, 50px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
            }}
          >
            {ra.school.name} <span className="text-pencil font-normal italic">vs.</span> {rb.school.name}
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            Real published data on acceptance rates, cost, and outcomes. Side by side.
          </p>
          <Link
            href="/try"
            className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all"
          >
            Calculate your odds at both
          </Link>
        </header>

        {/* Featured-snippet Q&A blocks */}
        <section className="not-prose space-y-4 mb-12">
          <div className="rounded-2xl border border-hair bg-cream px-7 py-6">
            <h2
              className="text-ink mb-2"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}
            >
              Is {aName} or {bName} harder to get into?
            </h2>
            <p className="text-ink-2 leading-relaxed">{harderAnswer}</p>
          </div>
          <div className="rounded-2xl border border-hair bg-cream px-7 py-6">
            <h2
              className="text-ink mb-2"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}
            >
              Which is cheaper, {aName} or {bName}?
            </h2>
            <p className="text-ink-2 leading-relaxed">{cheaperAnswer}</p>
          </div>
          {ra.earnings && rb.earnings && (
            <div className="rounded-2xl border border-hair bg-cream px-7 py-6">
              <h2
                className="text-ink mb-2"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}
              >
                Which has higher post-graduation earnings?
              </h2>
              <p className="text-ink-2 leading-relaxed">
                {higherEarnings === "a" ? aName : bName} graduates earn more on average. Median earnings 10 years after entry are{" "}
                <strong className="text-ink">{formatMoneySafe(ra.earnings)}</strong> at {aName} and{" "}
                <strong className="text-ink">{formatMoneySafe(rb.earnings)}</strong> at {bName}.
              </p>
            </div>
          )}
        </section>

        {/* Side-by-side stats table */}
        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Full Comparison
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[420px]">
              <thead className="bg-[#FAEEEA]">
                <tr>
                  <th className="text-left px-3 sm:px-5 py-3.5 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Metric</th>
                  <th className="text-right px-3 sm:px-5 py-3.5 text-[11px] font-semibold text-ink uppercase tracking-[0.15em]">{aName}</th>
                  <th className="text-right px-3 sm:px-5 py-3.5 text-[11px] font-semibold text-ink uppercase tracking-[0.15em]">{bName}</th>
                </tr>
              </thead>
              <tbody>
                <CompareRow
                  metric="Acceptance rate"
                  va={formatPctSafe(ra.admitRate)}
                  vb={formatPctSafe(rb.admitRate)}
                  win={harderToGetIn}
                  preference="lower"
                />
                {ra.sat25 && ra.sat75 && rb.sat25 && rb.sat75 && (
                  <CompareRow
                    metric="SAT mid-50%"
                    va={`${ra.sat25}–${ra.sat75}`}
                    vb={`${rb.sat25}–${rb.sat75}`}
                    win={higherSAT}
                    preference="higher"
                  />
                )}
                {ra.act25 && ra.act75 && rb.act25 && rb.act75 && (
                  <CompareRow
                    metric="ACT mid-50%"
                    va={`${ra.act25}–${ra.act75}`}
                    vb={`${rb.act25}–${rb.act75}`}
                    win="unknown"
                  />
                )}
                {ra.coa !== undefined && rb.coa !== undefined && (
                  <CompareRow
                    metric="Cost of attendance"
                    va={formatMoneySafe(ra.coa)}
                    vb={formatMoneySafe(rb.coa)}
                    win={winner(ra.coa, rb.coa, "lower")}
                    preference="lower"
                  />
                )}
                {ra.netPrice !== undefined && rb.netPrice !== undefined && (
                  <CompareRow
                    metric="Avg net price (after aid)"
                    va={formatMoneySafe(ra.netPrice)}
                    vb={formatMoneySafe(rb.netPrice)}
                    win={cheaperNet}
                    preference="lower"
                  />
                )}
                {ra.enrollment !== undefined && rb.enrollment !== undefined && (
                  <CompareRow
                    metric="Undergrad enrollment"
                    va={ra.enrollment.toLocaleString()}
                    vb={rb.enrollment.toLocaleString()}
                    win="unknown"
                  />
                )}
                {ra.completion !== undefined && rb.completion !== undefined && (
                  <CompareRow
                    metric="6-yr graduation rate"
                    va={formatPctSafe(ra.completion)}
                    vb={formatPctSafe(rb.completion)}
                    win={higherCompletion}
                    preference="higher"
                  />
                )}
                {ra.earnings !== undefined && rb.earnings !== undefined && (
                  <CompareRow
                    metric="Median earnings (10yr)"
                    va={formatMoneySafe(ra.earnings)}
                    vb={formatMoneySafe(rb.earnings)}
                    win={higherEarnings}
                    preference="higher"
                  />
                )}
                <CompareRow
                  metric="Setting"
                  va={ra.school.location}
                  vb={rb.school.location}
                  win="unknown"
                  last
                />
              </tbody>
            </table>
            </div>
          </div>
          <p className="text-[11px] text-pencil mt-3 text-center">
            Sources: U.S. Department of Education College Scorecard (IPEDS) and school-published admit cycle data. Last verified {LAST_VERIFIED}.
          </p>
        </section>

        <div className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-12 [&>h2]:mb-5">
          {/* Auto-generated data-driven narrative */}
          <h2>The Real Differences</h2>
          {(() => {
            const points: string[] = [];

            // Selectivity gap
            if (ra.admitRate !== undefined && rb.admitRate !== undefined) {
              const gap = Math.abs(ra.admitRate - rb.admitRate) * 100;
              const harder = ra.admitRate < rb.admitRate ? aName : bName;
              const easier = ra.admitRate < rb.admitRate ? bName : aName;
              if (gap < 1) {
                points.push(
                  `**Selectivity is essentially the same.** ${aName}'s ${formatPctSafe(ra.admitRate)} acceptance rate and ${bName}'s ${formatPctSafe(rb.admitRate)} are within a percentage point of each other. For an unhooked applicant, the difference is statistical noise. Apply to whichever you genuinely prefer.`,
                );
              } else if (gap < 3) {
                points.push(
                  `**${harder} is modestly harder to get into.** The ${gap.toFixed(1)}-point gap matters at the margin but doesn't change the overall difficulty tier. Both schools draw similar applicant pools and admit similar profiles.`,
                );
              } else {
                points.push(
                  `**${harder} is meaningfully harder to get into.** A ${gap.toFixed(1)}-percentage-point gap between ${formatPctSafe(ra.admitRate)} (${aName}) and ${formatPctSafe(rb.admitRate)} (${bName}) reflects real selectivity differences. ${easier} is the more realistic target for a balanced college list.`,
                );
              }
            }

            // SAT gap
            if (ra.sat75 && rb.sat75) {
              const sat75Gap = Math.abs(ra.sat75 - rb.sat75);
              if (sat75Gap >= 30) {
                const higher = ra.sat75 > rb.sat75 ? aName : bName;
                points.push(
                  `**${higher} draws stronger test scores.** Mid-50% SAT range tops out at ${Math.max(ra.sat75, rb.sat75)} vs ${Math.min(ra.sat75, rb.sat75)} at the other school. Differences in test profile usually reflect a school's STEM-vs-humanities mix and the self-selection of applicants, not raw academic quality.`,
                );
              }
            }

            // Cost gap
            if (ra.netPrice !== undefined && rb.netPrice !== undefined) {
              const npGap = Math.abs(ra.netPrice - rb.netPrice);
              if (npGap >= 5000) {
                const cheaper = ra.netPrice < rb.netPrice ? aName : bName;
                points.push(
                  `**${cheaper} is significantly cheaper after aid.** The average net price gap is ${formatMoneySafe(npGap)} per year, ${formatMoneySafe(npGap * 4)} over four years. For most families that difference is the deciding factor when both schools admit you.`,
                );
              } else if (npGap < 2000) {
                points.push(
                  `**Net cost is essentially the same** at both schools after grants and scholarships, despite different sticker prices. Both schools meet most demonstrated need for in-range income brackets.`,
                );
              }
            }

            // Earnings gap
            if (ra.earnings && rb.earnings) {
              const eGap = Math.abs(ra.earnings - rb.earnings);
              if (eGap >= 8000) {
                const higher = ra.earnings > rb.earnings ? aName : bName;
                const lower = ra.earnings > rb.earnings ? bName : aName;
                points.push(
                  `**${higher} graduates earn ${formatMoneySafe(eGap)} more on average** at the 10-year mark. This usually reflects major distribution more than school quality — schools that concentrate in CS, engineering, and finance pull higher medians than schools with more humanities and social science graduates. ${lower} grads' earnings within the same major category are typically comparable.`,
                );
              }
            }

            // Size difference
            if (ra.enrollment !== undefined && rb.enrollment !== undefined) {
              const sizeRatio = Math.max(ra.enrollment, rb.enrollment) / Math.min(ra.enrollment, rb.enrollment);
              if (sizeRatio >= 1.5) {
                const bigger = ra.enrollment > rb.enrollment ? aName : bName;
                const smaller = ra.enrollment > rb.enrollment ? bName : aName;
                points.push(
                  `**${bigger} is substantially larger** with ${Math.max(ra.enrollment, rb.enrollment).toLocaleString()} undergrads vs ${Math.min(ra.enrollment, rb.enrollment).toLocaleString()} at ${smaller}. Bigger universities have more major options and broader research opportunities; smaller ones offer more access to faculty and tighter-knit communities.`,
                );
              }
            }

            // Geographic context
            if (ra.school.state !== rb.school.state) {
              points.push(
                `**Geographic difference matters more than the campus tour suggests.** ${aName} is in ${ra.school.location}; ${bName} is in ${rb.school.location}. Climate, cost-of-living, and proximity to job markets in your target field shape the four-year experience and post-grad pipeline more than most prospective students realize.`,
              );
            }

            // Demographics
            if (ra.sc?.demoIntl !== undefined && rb.sc?.demoIntl !== undefined) {
              const intlGap = Math.abs(ra.sc.demoIntl - rb.sc.demoIntl) * 100;
              if (intlGap >= 4) {
                const moreIntl = (ra.sc.demoIntl > rb.sc.demoIntl) ? aName : bName;
                points.push(
                  `**${moreIntl} has a more international student body** (${formatPctSafe(Math.max(ra.sc.demoIntl, rb.sc.demoIntl))} non-resident students vs ${formatPctSafe(Math.min(ra.sc.demoIntl, rb.sc.demoIntl))}). For applicants who value global exposure or have international academic interests, that mix shows up in classroom culture and alumni network.`,
                );
              }
            }

            // Graduation rate gap
            if (ra.completion !== undefined && rb.completion !== undefined) {
              const cGap = Math.abs(ra.completion - rb.completion) * 100;
              if (cGap >= 4) {
                const higher = ra.completion > rb.completion ? aName : bName;
                points.push(
                  `**${higher}'s graduation rate is meaningfully higher** (${formatPctSafe(Math.max(ra.completion, rb.completion))} vs ${formatPctSafe(Math.min(ra.completion, rb.completion))} 6-year completion). Graduation gaps at this level usually reflect support-system differences, financial aid adequacy, or degree-flexibility — worth verifying with each school's first-year retention and major-change policies.`,
                );
              }
            }

            return (
              <div className="space-y-4">
                {points.map((p, i) => {
                  const html = p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                  return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
                })}
              </div>
            );
          })()}

          {/* Demographics comparison if both have data */}
          {ra.sc?.demoAsian !== undefined && rb.sc?.demoAsian !== undefined && (
            <>
              <h2>Student Body Composition</h2>
              <p>
                The two schools have different student body compositions. {aName} is{" "}
                {formatPctSafe(ra.sc.demoWomen)} women, {formatPctSafe(ra.sc.demoIntl)} international,
                and {formatPctSafe(ra.sc.demoAsian)} Asian-American. {bName} is{" "}
                {formatPctSafe(rb.sc.demoWomen)} women, {formatPctSafe(rb.sc.demoIntl)} international,
                and {formatPctSafe(rb.sc.demoAsian)} Asian-American.
              </p>
              <div className="not-prose rounded-xl border border-hair overflow-hidden bg-cream my-6">
                <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[420px]">
                  <thead className="bg-[#FAEEEA]">
                    <tr>
                      <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Demographic</th>
                      <th className="text-right px-3 sm:px-5 py-3 text-[11px] font-semibold text-ink uppercase tracking-[0.15em]">{aName}</th>
                      <th className="text-right px-3 sm:px-5 py-3 text-[11px] font-semibold text-ink uppercase tracking-[0.15em]">{bName}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CompareRow metric="Women" va={formatPctSafe(ra.sc.demoWomen)} vb={formatPctSafe(rb.sc.demoWomen)} win="unknown" />
                    <CompareRow metric="International" va={formatPctSafe(ra.sc.demoIntl)} vb={formatPctSafe(rb.sc.demoIntl)} win="unknown" />
                    <CompareRow metric="White" va={formatPctSafe(ra.sc.demoWhite)} vb={formatPctSafe(rb.sc.demoWhite)} win="unknown" />
                    <CompareRow metric="Asian" va={formatPctSafe(ra.sc.demoAsian)} vb={formatPctSafe(rb.sc.demoAsian)} win="unknown" />
                    <CompareRow metric="Hispanic" va={formatPctSafe(ra.sc.demoHispanic)} vb={formatPctSafe(rb.sc.demoHispanic)} win="unknown" />
                    <CompareRow metric="Black" va={formatPctSafe(ra.sc.demoBlack)} vb={formatPctSafe(rb.sc.demoBlack)} win="unknown" last />
                  </tbody>
                </table>
                </div>
              </div>
            </>
          )}

          {/* Mid-page CTA */}
          <div className="not-prose my-12 text-center max-w-xl mx-auto">
            <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-3">
              Personalized estimate
            </p>
            <p
              className="text-ink font-bold mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(22px, 3vw, 28px)",
                lineHeight: "1.15",
                letterSpacing: "-0.01em",
              }}
            >
              What are your odds at {aName} vs. {bName}?
            </p>
            <p className="text-pencil text-base mb-6">
              Get a probability for both schools calibrated to your full profile, not the headline rate.
            </p>
            <Link
              href="/try"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink !text-white !no-underline text-sm font-medium hover:bg-oxblood hover:!text-white transition-all"
            >
              Run the calculator
            </Link>
          </div>

          {/* Verdict / pros and cons */}
          <h2>The Verdict</h2>
          <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
            <div className="rounded-xl border border-hair bg-cream p-5">
              <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.15em] mb-2">
                Pick {aName} if
              </p>
              <ul className="text-sm text-ink-2 space-y-1.5 list-disc pl-5">
                {harderToGetIn === "b" && (
                  <li>Your odds are realistic at {aName} (slightly easier admit)</li>
                )}
                {cheaperNet === "a" && (
                  <li>Net price matters: {aName} costs {formatMoneySafe((rb.netPrice ?? 0) - (ra.netPrice ?? 0))} less per year on average</li>
                )}
                {higherEarnings === "a" && (
                  <li>Higher median post-grad earnings ({formatMoneySafe(ra.earnings)} vs {formatMoneySafe(rb.earnings)})</li>
                )}
                {higherCompletion === "a" && (
                  <li>Higher 6-year graduation rate</li>
                )}
                <li>{ra.school.knownFor.split(",")[0]}</li>
              </ul>
            </div>
            <div className="rounded-xl border border-hair bg-cream p-5">
              <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.15em] mb-2">
                Pick {bName} if
              </p>
              <ul className="text-sm text-ink-2 space-y-1.5 list-disc pl-5">
                {harderToGetIn === "a" && (
                  <li>Your odds are realistic at {bName} (slightly easier admit)</li>
                )}
                {cheaperNet === "b" && (
                  <li>Net price matters: {bName} costs {formatMoneySafe((ra.netPrice ?? 0) - (rb.netPrice ?? 0))} less per year on average</li>
                )}
                {higherEarnings === "b" && (
                  <li>Higher median post-grad earnings ({formatMoneySafe(rb.earnings)} vs {formatMoneySafe(ra.earnings)})</li>
                )}
                {higherCompletion === "b" && (
                  <li>Higher 6-year graduation rate</li>
                )}
                <li>{rb.school.knownFor.split(",")[0]}</li>
              </ul>
            </div>
          </div>

          <p>
            Headline numbers favor one school or the other on each axis, but neither is unambiguously &ldquo;better.&rdquo; The right answer depends on your major fit, geographic preference, financial need, and personal odds at each. Most applicants who get into one of these schools also get into the other.
          </p>

          {/* Direct links to detail pages */}
          <h2>Full School Pages</h2>
          <p>For complete admissions data, supplemental essay strategy, and class profile breakdowns:</p>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
            <Link
              href={`/colleges/${a}`}
              className="block rounded-xl border border-hair bg-cream p-5 !no-underline hover:border-ink hover:shadow-sm transition-all"
            >
              <p className="text-[10px] font-semibold text-pencil uppercase tracking-[0.15em] mb-1">
                Full profile
              </p>
              <p className="text-base font-bold !text-ink mb-1.5">{ra.school.name}</p>
              <p className="text-xs !text-ink-2">
                <span className="!text-oxblood font-semibold">{formatPctSafe(ra.admitRate)}</span> accept · {ra.school.location}
              </p>
            </Link>
            <Link
              href={`/colleges/${b}`}
              className="block rounded-xl border border-hair bg-cream p-5 !no-underline hover:border-ink hover:shadow-sm transition-all"
            >
              <p className="text-[10px] font-semibold text-pencil uppercase tracking-[0.15em] mb-1">
                Full profile
              </p>
              <p className="text-base font-bold !text-ink mb-1.5">{rb.school.name}</p>
              <p className="text-xs !text-ink-2">
                <span className="!text-oxblood font-semibold">{formatPctSafe(rb.admitRate)}</span> accept · {rb.school.location}
              </p>
            </Link>
          </div>

          {/* Sources */}
          <h2>Sources</h2>
          <ul>
            <li>
              <a href="https://collegescorecard.ed.gov/" rel="noopener nofollow" target="_blank">U.S. Department of Education College Scorecard</a>{" "}
              for acceptance rates, test ranges, financial aid, demographics, completion, and earnings.
            </li>
            <li>
              <a href="https://nces.ed.gov/ipeds/" rel="noopener nofollow" target="_blank">IPEDS (Integrated Postsecondary Education Data System)</a>{" "}
              for the underlying federal data.
            </li>
            <li>Each school&apos;s most recent published Common Data Set for cycle-specific admissions stats.</li>
          </ul>

          <p className="text-center text-xs text-pencil mt-10 italic">
            Last verified {LAST_VERIFIED}. Stats reflect each school&apos;s most recent publicly published admit cycle.
          </p>

          {/* Continue */}
          <div className="not-prose mt-14 pt-8 border-t border-hair text-center">
            <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
              Keep going
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/try" className="px-4 py-2 rounded-full bg-ink !text-white !no-underline text-sm font-medium hover:bg-oxblood hover:!text-white transition-all">
                Calculate your odds
              </Link>
              <Link href="/colleges" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
                All colleges
              </Link>
              <Link href="/colleges/most-selective" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
                Most selective
              </Link>
              <Link href="/colleges/best-financial-aid" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
                Best financial aid
              </Link>
              <Link href="/colleges/highest-earnings" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
                Highest earnings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CompareRow({
  metric,
  va,
  vb,
  win,
  last,
}: {
  metric: string;
  va: string;
  vb: string;
  win: "a" | "b" | "tie" | "unknown";
  preference?: "higher" | "lower";
  last?: boolean;
}) {
  return (
    <tr className={last ? "" : "border-b border-hair"}>
      <td className="px-3 sm:px-5 py-3.5 text-pencil">{metric}</td>
      <td
        className={`px-3 sm:px-5 py-3.5 text-right tabular-nums ${
          win === "a" ? "font-bold text-oxblood" : "text-ink"
        }`}
      >
        {va}
      </td>
      <td
        className={`px-3 sm:px-5 py-3.5 text-right tabular-nums ${
          win === "b" ? "font-bold text-oxblood" : "text-ink"
        }`}
      >
        {vb}
      </td>
    </tr>
  );
}
