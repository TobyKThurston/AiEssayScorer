import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools, hasRichContent, type School } from "@/tools/schools";
import {
  getStats,
  formatPct,
  formatMoney,
  type CollegeStat,
} from "@/colleges/collegeStats";
import { extraColleges, extraStats, type ExtraCollege } from "@/colleges/extraColleges";
import {
  getScorecard,
  formatPctSafe,
  formatMoneySafe,
  localeLabel,
  type ScorecardData,
} from "@/colleges/scorecard";

type Props = { params: Promise<{ slug: string }> };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

// Stable build-time timestamps for article schema. ISO date avoids
// drift on every redeploy (which can flag dateModified as suspicious).
const ARTICLE_PUBLISHED = "2026-05-04";
const ARTICLE_MODIFIED = process.env.NEXT_PUBLIC_BUILD_DATE ?? "2026-05-09";

function findSchool(slug: string): School | null {
  const main = schools.find((s) => s.slug === slug);
  if (main) return main;
  const extra: ExtraCollege | undefined = extraColleges.find((s) => s.slug === slug);
  if (!extra) return null;
  return {
    slug: extra.slug,
    name: extra.name,
    shortName: extra.shortName,
    location: extra.location,
    state: extra.state,
    type: extra.type,
    category: extra.category,
    knownFor: extra.knownFor,
  };
}

function findStats(slug: string): CollegeStat | null {
  const curated = getStats(slug);
  if (curated) return curated;
  const extra = extraStats[slug];
  if (!extra) return null;
  return extra as CollegeStat;
}

export function generateStaticParams() {
  return [...schools.map((s) => s.slug), ...extraColleges.map((s) => s.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const school = findSchool(slug);
  if (!school) return {};
  const stat = findStats(slug);
  const sc = getScorecard(slug);
  const rate = stat?.acceptanceRate ?? sc?.admitRate;

  const title = `${school.name} Admissions: Acceptance Rate, SAT, GPA, Cost & Your Odds`;
  const description = rate
    ? `${school.name} accepts ${formatPctSafe(rate)} of applicants. Real SAT/ACT ranges, financial aid by income, demographics, outcomes, and a calculator that tells you your personal odds.`
    : `${school.name} admissions guide: acceptance rate, SAT/GPA, cost, demographics, outcomes, and how to estimate your real odds.`;

  return {
    title,
    description,
    keywords: [
      `${school.shortName} acceptance rate`,
      `${school.shortName} admissions`,
      `${school.shortName} SAT scores`,
      `${school.shortName} GPA`,
      `${school.shortName} cost`,
      `${school.shortName} financial aid`,
      `how to get into ${school.shortName}`,
      `${school.shortName} demographics`,
      `is ${school.shortName} hard to get into`,
    ],
    alternates: { canonical: `/colleges/${slug}` },
    openGraph: {
      title: `${school.name}: Admissions Stats and Your Odds`,
      description,
      url: `/colleges/${slug}`,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${school.name} admissions stats` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${school.name} Admissions Stats`,
      images: ["/og-image.png"],
    },
  };
}

function difficultyLabel(rate: number | undefined): { label: string; tier: string } {
  if (rate === undefined) return { label: "Selective", tier: "selective" };
  const pct = rate * 100;
  if (pct < 7) return { label: "Most selective in the country", tier: "extremely-difficult" };
  if (pct < 12) return { label: "Extremely selective", tier: "very-difficult" };
  if (pct < 20) return { label: "Highly selective", tier: "difficult" };
  if (pct < 35) return { label: "Selective", tier: "selective" };
  if (pct < 60) return { label: "Moderately selective", tier: "moderate" };
  return { label: "Open admission", tier: "open" };
}

export default async function CollegePage({ params }: Props) {
  const { slug } = await params;
  const school = findSchool(slug);
  if (!school) return notFound();

  const stat = findStats(slug);
  const sc = getScorecard(slug);
  const hasRich = hasRichContent(school);
  const url = `${baseUrl}/colleges/${slug}`;

  // Combine data sources — scorecard wins for richer fields, curated stats wins for ED data
  const admitRate = stat?.acceptanceRate ?? sc?.admitRate;
  const sat25 = stat?.sat?.p25 ?? sc?.sat25;
  const sat75 = stat?.sat?.p75 ?? sc?.sat75;
  const act25 = stat?.act?.p25 ?? sc?.act25;
  const act75 = stat?.act?.p75 ?? sc?.act75;
  const coa = stat?.coa ?? sc?.coa;
  const enrollment = stat?.undergradEnrollment ?? sc?.undergradEnrollment;
  const difficulty = difficultyLabel(admitRate);

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

  const peers = allSchools
    .filter((s) => s.category === school.category && s.slug !== school.slug)
    .slice(0, 6);

  // === JSON-LD ===
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
      { "@type": "ListItem", position: 3, name: school.name, item: url },
    ],
  };

  const collegeSchema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${url}#college`,
    name: school.name,
    url,
    sameAs: sc?.website ? [`https://${sc.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}`] : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: school.location,
      addressRegion: school.state,
      addressCountry: "US",
    },
    foundingDate: stat?.founded ? String(stat.founded) : undefined,
    numberOfStudents: enrollment,
  };

  // Article schema for E-E-A-T
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: `${school.name} Admissions: Acceptance Rate, SAT, GPA, Cost & Your Odds`,
    description: admitRate
      ? `${school.name} accepts ${formatPctSafe(admitRate)} of applicants. Complete admissions data and odds calculator.`
      : `${school.name} admissions guide.`,
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/og-image.png`,
      width: 1200,
      height: 630,
    },
    datePublished: ARTICLE_PUBLISHED,
    dateModified: ARTICLE_MODIFIED,
    author: {
      "@type": "Person",
      name: "Ivy Admit Editorial Team",
      url: `${baseUrl}/about`,
      jobTitle: "Editorial Team",
      description:
        "Editors at Ivy Admit covering selective US college admissions, application strategy, and essay craft.",
      worksFor: { "@id": `${baseUrl}/#organization` },
    },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    about: { "@id": `${url}#college` },
  };

  // FAQ schema — combines auto-generated factual Q&A with rich content if available
  const autoFaqs: { question: string; answer: string }[] = [];
  if (admitRate !== undefined) {
    autoFaqs.push({
      question: `How hard is it to get into ${school.shortName}?`,
      answer: `${school.shortName} is ${difficulty.label.toLowerCase()}. The most recently published acceptance rate is ${formatPctSafe(admitRate)}. ${sat25 && sat75 ? `Admitted students score in the ${sat25}–${sat75} SAT range. ` : ""}Test scores are necessary but not sufficient. Holistic review weighs essays, activities, recommendations, and demographic context.`,
    });
  }
  if (sat25 && sat75) {
    autoFaqs.push({
      question: `What SAT score do I need for ${school.shortName}?`,
      answer: `Admitted students at ${school.shortName} typically score between ${sat25} and ${sat75} on the SAT. A quarter of admits scored above ${sat75}, and a quarter scored below ${sat25}. Scores in this range are competitive but do not guarantee admission.`,
    });
  }
  if (sc?.avgNetPrice) {
    autoFaqs.push({
      question: `How much does ${school.shortName} cost?`,
      answer: `The published cost of attendance at ${school.shortName} is ${formatMoneySafe(coa)} per year before financial aid. The average net price after grants and scholarships is ${formatMoneySafe(sc.avgNetPrice)}. Most highly selective schools meet 100% of demonstrated need for families below specific income thresholds.`,
    });
  }
  if (sc?.completion4yr) {
    autoFaqs.push({
      question: `What is the graduation rate at ${school.shortName}?`,
      answer: `${formatPctSafe(sc.completion4yr)} of students at ${school.shortName} graduate within 6 years (the standard federal graduation rate metric).`,
    });
  }

  const richFaqs = hasRich && school.rich ? school.rich.faq : [];
  const allFaqs = [...autoFaqs, ...richFaqs];
  const faqSchema = allFaqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        })),
      }
    : null;

  const websiteUrl = sc?.website
    ? `https://${sc.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
    : null;

  return (
    <article className="pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Colleges", href: "/colleges" },
            { label: school.shortName },
          ]}
        />

        {/* Hero */}
        <header className="text-center mt-5 sm:mt-6 mb-10 sm:mb-12">
          <p className="text-[10.5px] sm:text-[11px] font-semibold text-oxblood uppercase tracking-[0.16em] sm:tracking-[0.18em] mb-3 sm:mb-4">
            {school.category} · {school.location}
          </p>
          <h1
            className="text-ink mb-4 sm:mb-5 mx-auto max-w-2xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 52px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
            }}
          >
            {school.name}
          </h1>
          {admitRate !== undefined && (
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-ink-2 mb-5 sm:mb-7 max-w-xl mx-auto leading-snug">
              {difficulty.label}. {formatPctSafe(admitRate)} acceptance rate.
            </p>
          )}
          <Link
            href="/try"
            className="inline-block px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-ink !text-white !no-underline font-medium text-[14px] sm:text-base hover:bg-oxblood hover:!text-white transition-all"
          >
            Calculate your {school.shortName} odds
          </Link>
        </header>

        {/* Featured-snippet Q&A */}
        {admitRate !== undefined && (
          <section className="not-prose mb-10 sm:mb-12 rounded-2xl border border-hair bg-cream px-5 sm:px-7 py-5 sm:py-6">
            <h2
              className="text-ink mb-2 text-[18px] sm:text-[20px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                letterSpacing: "-0.005em",
              }}
            >
              How hard is it to get into {school.shortName}?
            </h2>
            <p className="text-ink-2 leading-relaxed">
              {school.shortName} is <strong className="text-ink">{difficulty.label.toLowerCase()}</strong>, with a{" "}
              <strong className="text-ink">{formatPctSafe(admitRate)} acceptance rate</strong>
              {sat25 && sat75
                ? `. Admitted students typically score ${sat25}–${sat75} on the SAT`
                : ""}
              {act25 && act75 ? ` and ${act25}–${act75} on the ACT` : ""}
              . The application is read holistically, so essays, recommendations, activities, and demographic context all factor into the decision alongside test scores and GPA.
            </p>
          </section>
        )}

        {/* Quick Facts table — featured snippet bait */}
        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Quick Facts
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <table className="w-full text-sm">
              <tbody>
                <FactRow label="Acceptance rate" value={formatPctSafe(admitRate)} emphasized />
                {sat25 && sat75 && <FactRow label="SAT (mid-50%)" value={`${sat25}–${sat75}`} />}
                {act25 && act75 && <FactRow label="ACT (mid-50%)" value={`${act25}–${act75}`} />}
                {coa !== undefined && <FactRow label="Cost of attendance" value={formatMoneySafe(coa)} />}
                {sc?.avgNetPrice !== undefined && (
                  <FactRow label="Average net price (after aid)" value={formatMoneySafe(sc.avgNetPrice)} />
                )}
                {enrollment !== undefined && (
                  <FactRow label="Undergraduate enrollment" value={enrollment.toLocaleString()} />
                )}
                {sc?.completion4yr !== undefined && (
                  <FactRow label="6-year graduation rate" value={formatPctSafe(sc.completion4yr)} />
                )}
                {sc?.earnings10yr !== undefined && (
                  <FactRow label="Median earnings (10 yrs after entry)" value={formatMoneySafe(sc.earnings10yr)} />
                )}
                <FactRow label="Type" value={`${school.type} · ${school.category}`} />
                <FactRow label="Setting" value={localeLabel(sc?.locale)} last />
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-pencil mt-3 text-center">
            Source: U.S. Department of Education College Scorecard. Last verified {LAST_VERIFIED}.
          </p>
        </section>

        <div className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-14 [&>h2]:mb-6 [&>h3]:mt-8 [&>h3]:mb-3">
          {/* Getting in */}
          <h2>Getting In</h2>
          {admitRate !== undefined ? (
            <>
              <p>
                {school.shortName}&apos;s {formatPctSafe(admitRate)} acceptance rate
                {stat?.totalApplicants && stat?.totalAdmits
                  ? ` reflects ${stat.totalAdmits.toLocaleString()} admits from ${stat.totalApplicants.toLocaleString()} applications.`
                  : ` puts it in the ${difficulty.label.toLowerCase()} tier.`}{" "}
                {sat25 && sat75 && (
                  <>
                    The mid-50% SAT range of {sat25}&ndash;{sat75} means a quarter of admitted students scored above {sat75}, and a quarter scored below {sat25}.{" "}
                  </>
                )}
                Scores in that range don&apos;t guarantee admission. Scores outside it don&apos;t rule it out. The application is read holistically.
              </p>
              <p>
                That number doesn&apos;t tell you your odds. A 1550 SAT and a 4.0 GPA put you in the academic conversation. They don&apos;t put you in the admit pile. Your actual probability depends on your full profile: coursework rigor, activities, recommendations, demographic context, and what your essays accomplish. The pool average is a starting point, not a forecast.
              </p>
            </>
          ) : (
            <p>
              {school.name} is among the most selective institutions in the country. The application is read holistically. Test scores and GPA establish baseline academic credibility but rarely drive the final decision. The rest of the application (activities, recommendations, and especially essays) reveals who you are and what you would add to the community.
            </p>
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
              What are your actual odds at {school.shortName}?
            </p>
            <p className="text-pencil text-base mb-6">
              Enter your SAT/ACT, GPA, activities, and target schools. Get a probability calibrated to real admit data, not a headline acceptance rate.
            </p>
            <Link
              href="/try"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink !text-white !no-underline text-sm font-medium hover:bg-oxblood hover:!text-white transition-all"
            >
              Run the calculator
            </Link>
          </div>

          {/* SAT detail (if available) */}
          {sc?.satReading25 && sc?.satMath25 && (
            <>
              <h2>{school.shortName} Test Score Profile</h2>
              <p>
                Admitted students score in the following ranges across SAT sections:
              </p>
              <div className="not-prose grid grid-cols-2 gap-3 my-6">
                <SubStatBox title="SAT Reading" value={`${sc.satReading25}–${sc.satReading75}`} sub="25th–75th percentile" />
                <SubStatBox title="SAT Math" value={`${sc.satMath25}–${sc.satMath75}`} sub="25th–75th percentile" />
              </div>
              <p>
                Strong applicants tend to score above the 75th percentile in their stronger section and at or above the 25th percentile in their weaker one. Both numbers are descriptive, not prescriptive. Plenty of admitted students score below the 25th percentile in one section, especially with strong context elsewhere.
              </p>
            </>
          )}

          {/* What the school looks for */}
          <h2>Beyond the Numbers</h2>
          <p>
            {school.shortName} is best known for {school.knownFor}. Admissions readers are looking for applicants whose specific interests and ways of working would actually thrive in that environment. Not generic &ldquo;passion.&rdquo; Concrete curiosity that already shows up in what you do.
          </p>
          {hasRich && school.rich && (
            <p>{school.rich.admitContext}</p>
          )}

          {/* Class profile / demographics */}
          {sc && (sc.demoWomen || sc.demoAsian || sc.demoIntl) && (
            <>
              <h2>Class Profile</h2>
              <p>
                The undergraduate population at {school.shortName} breaks down as follows according to federal IPEDS data:
              </p>
              <div className="not-prose space-y-1 my-6 max-w-xl mx-auto">
                {sc.demoWomen !== undefined && (
                  <DemoBar label="Women" value={sc.demoWomen} />
                )}
                {sc.demoMen !== undefined && (
                  <DemoBar label="Men" value={sc.demoMen} />
                )}
                {sc.demoIntl !== undefined && (
                  <DemoBar label="International" value={sc.demoIntl} />
                )}
              </div>
              <h3>Race &amp; ethnicity</h3>
              <div className="not-prose space-y-1 my-6 max-w-xl mx-auto">
                {sc.demoWhite !== undefined && <DemoBar label="White" value={sc.demoWhite} />}
                {sc.demoAsian !== undefined && <DemoBar label="Asian" value={sc.demoAsian} />}
                {sc.demoHispanic !== undefined && <DemoBar label="Hispanic" value={sc.demoHispanic} />}
                {sc.demoBlack !== undefined && <DemoBar label="Black" value={sc.demoBlack} />}
                {sc.demoTwoOrMore !== undefined && <DemoBar label="Two or more races" value={sc.demoTwoOrMore} />}
                {sc.demoAian !== undefined && sc.demoAian > 0.001 && (
                  <DemoBar label="American Indian / Alaska Native" value={sc.demoAian} />
                )}
              </div>
              <p>
                These percentages reflect the enrolled student body, not the applicant pool. Admit rates by demographic differ from the headline rate, and the school&apos;s composition is the result of its full holistic review process.
              </p>
            </>
          )}

          {/* Financial aid */}
          {sc?.avgNetPrice !== undefined && (
            <>
              <h2>Cost &amp; Financial Aid</h2>
              <p>
                The published cost of attendance at {school.shortName} is{" "}
                <strong>{formatMoneySafe(coa)}</strong> per year before aid. After grants and scholarships, the average student pays{" "}
                <strong>{formatMoneySafe(sc.avgNetPrice)}</strong> per year. The sticker price isn&apos;t the number that matters for most families.
              </p>
              {(sc.netPrice0to30k || sc.netPrice30to48k || sc.netPrice48to75k || sc.netPrice75to110k || sc.netPrice110kPlus) && (
                <>
                  <h3>Net price by family income</h3>
                  <p>What the average student actually pays per year, after grants:</p>
                  <div className="not-prose rounded-xl border border-hair overflow-hidden bg-cream my-6">
                    <table className="w-full text-sm">
                      <tbody>
                        {sc.netPrice0to30k !== undefined && (
                          <FactRow label="Family income $0–30K" value={formatMoneySafe(sc.netPrice0to30k)} />
                        )}
                        {sc.netPrice30to48k !== undefined && (
                          <FactRow label="Family income $30K–48K" value={formatMoneySafe(sc.netPrice30to48k)} />
                        )}
                        {sc.netPrice48to75k !== undefined && (
                          <FactRow label="Family income $48K–75K" value={formatMoneySafe(sc.netPrice48to75k)} />
                        )}
                        {sc.netPrice75to110k !== undefined && (
                          <FactRow label="Family income $75K–110K" value={formatMoneySafe(sc.netPrice75to110k)} />
                        )}
                        {sc.netPrice110kPlus !== undefined && (
                          <FactRow label="Family income $110K+" value={formatMoneySafe(sc.netPrice110kPlus)} last />
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p>
                    Highly selective private universities tend to meet 100% of demonstrated financial need, often without loans, for families below specific income thresholds. The number that matters for your family is your net price, which can be estimated using the school&apos;s own net price calculator before applying.
                  </p>
                </>
              )}
            </>
          )}

          {/* Outcomes */}
          {sc && (sc.completion4yr || sc.earnings10yr || sc.medianDebt) && (
            <>
              <h2>Outcomes</h2>
              <p>
                Federal data on what happens after enrollment at {school.shortName}:
              </p>
              <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                {sc.completion4yr !== undefined && (
                  <SubStatBox
                    title="Graduation rate"
                    value={formatPctSafe(sc.completion4yr)}
                    sub="6-year (federal IPEDS)"
                  />
                )}
                {sc.earnings10yr !== undefined && (
                  <SubStatBox
                    title="Median earnings"
                    value={formatMoneySafe(sc.earnings10yr)}
                    sub="10 yrs after entry"
                  />
                )}
                {sc.medianDebt !== undefined && (
                  <SubStatBox
                    title="Median debt"
                    value={formatMoneySafe(sc.medianDebt)}
                    sub="Among completers"
                  />
                )}
              </div>
              {sc.pellRate !== undefined && (
                <p>
                  {formatPctSafe(sc.pellRate)} of students receive a Pell Grant (federal need-based aid), and {formatPctSafe(sc.federalLoanRate)} take federal loans. These rates are useful proxies for the school&apos;s socioeconomic mix and how much most families end up borrowing.
                </p>
              )}
            </>
          )}

          {/* Supplemental essays */}
          {hasRich && school.rich && (
            <>
              <h2>{school.shortName} Supplemental Essays</h2>
              <p>
                {school.shortName} requires supplemental essays beyond the Common App personal statement. The most recent prompts include:
              </p>
              <ul>
                {school.rich.currentPrompts.slice(0, 4).map((prompt, i) => (
                  <li key={i}><em>&ldquo;{prompt}&rdquo;</em></li>
                ))}
              </ul>
              {school.whyUsWordLimit && (
                <p>
                  The &ldquo;Why {school.shortName}&rdquo; supplemental is capped at roughly{" "}
                  <strong>{school.whyUsWordLimit} words</strong>. At that length, every sentence has to do real work. List-making and adjective-stacking get cut by readers in the first pass.
                </p>
              )}

              <h3>What tends to go wrong</h3>
              <ul>
                {school.rich.commonMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>

              <h3>Stronger ways to open</h3>
              <ul>
                {school.rich.openingAngles.map((angle, i) => (
                  <li key={i}>{angle}</li>
                ))}
              </ul>
            </>
          )}

          {/* Application timeline */}
          {stat?.applicationDeadline && (
            <>
              <h2>Application Timeline</h2>
              <ul>
                {stat.earlyDeadline && stat.earlyDecisionType && (
                  <li>
                    <strong>{stat.earlyDecisionType} deadline:</strong> {stat.earlyDeadline}
                    {stat.earlyAcceptanceRate !== undefined && (
                      <>. Historically {formatPct(stat.earlyAcceptanceRate)} acceptance rate.</>
                    )}
                  </li>
                )}
                <li><strong>Regular Decision deadline:</strong> {stat.applicationDeadline}</li>
                {stat.testPolicy === "required" ? (
                  <li><strong>Testing:</strong> SAT or ACT scores required.</li>
                ) : stat.testPolicy === "optional" ? (
                  <li><strong>Testing:</strong> SAT/ACT optional. Submit if your scores fall within or above the mid-50% range.</li>
                ) : (
                  <li><strong>Testing:</strong> Test-blind. Scores will not be considered.</li>
                )}
              </ul>
            </>
          )}

          {/* Tools CTA */}
          <div className="not-prose my-12 text-center max-w-xl mx-auto rounded-2xl bg-[#FAEEEA] border border-[#E8C9C2] py-8 px-7">
            <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-2">
              {school.shortName} essay tools
            </p>
            <p className="text-ink text-base mb-5">
              Score, brainstorm, or revise {school.shortName} essays with tools tuned to {school.shortName}&apos;s prompts.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href={`/tools/why-${school.slug}-essay`}
                className="px-4 py-2 rounded-full bg-ink !text-white !no-underline text-sm font-medium hover:bg-oxblood hover:!text-white transition-all"
              >
                Why {school.shortName} essay
              </Link>
              <Link
                href={`/tools/score-${school.slug}-essay`}
                className="px-4 py-2 rounded-full border border-ink !text-ink !no-underline text-sm hover:bg-ink hover:!text-white transition-all bg-cream"
              >
                Score a {school.shortName} essay
              </Link>
            </div>
          </div>

          {/* Comparison table */}
          {peers.length > 0 && (
            <>
              <h2>{school.shortName} vs. Peer Schools</h2>
              <p className="text-center max-w-xl mx-auto">
                Side-by-side comparison with similar {school.category} schools applicants typically consider.
              </p>
              <div className="not-prose overflow-x-auto my-8">
                <table className="w-full text-sm border border-hair rounded-xl overflow-hidden bg-cream min-w-[480px]">
                  <thead className="bg-[#FAEEEA]">
                    <tr>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">School</th>
                      <th className="text-right px-4 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Accept</th>
                      <th className="text-right px-4 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">SAT mid-50</th>
                      <th className="text-right px-4 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Net price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ComparisonRow
                      slug={school.slug}
                      name={school.shortName}
                      admitRate={admitRate}
                      sat25={sat25}
                      sat75={sat75}
                      netPrice={sc?.avgNetPrice}
                      isSelf
                    />
                    {peers.slice(0, 5).map((p) => {
                      const peerSc = getScorecard(p.slug);
                      const peerStat = findStats(p.slug);
                      return (
                        <ComparisonRow
                          key={p.slug}
                          slug={p.slug}
                          name={p.shortName}
                          admitRate={peerStat?.acceptanceRate ?? peerSc?.admitRate}
                          sat25={peerStat?.sat?.p25 ?? peerSc?.sat25}
                          sat75={peerStat?.sat?.p75 ?? peerSc?.sat75}
                          netPrice={peerSc?.avgNetPrice}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* FAQ */}
          {allFaqs.length > 0 && (
            <>
              <h2>FAQ</h2>
              <div className="not-prose space-y-3 max-w-2xl mx-auto">
                {allFaqs.map((q) => (
                  <details
                    key={q.question}
                    className="border border-hair rounded-xl px-5 py-4 bg-cream"
                  >
                    <summary className="font-medium text-ink cursor-pointer">
                      {q.question}
                    </summary>
                    <p className="mt-3 text-ink-2 text-sm leading-relaxed">{q.answer}</p>
                  </details>
                ))}
              </div>
            </>
          )}

          {/* Sources cited — E-E-A-T signal */}
          <h2>Sources</h2>
          <p>
            All numerical data on this page is sourced from official, primary sources. Admissions stats reflect the most recent publicly published cycle. Verify current figures with {school.shortName}&apos;s admissions office before applying.
          </p>
          <ul>
            <li>
              <a
                href="https://collegescorecard.ed.gov/"
                rel="noopener nofollow"
                target="_blank"
              >
                U.S. Department of Education College Scorecard
              </a>{" "}
              — federally maintained dataset on admissions, cost, demographics, and post-graduation outcomes (IPEDS-derived).
            </li>
            <li>
              <a
                href="https://nces.ed.gov/ipeds/"
                rel="noopener nofollow"
                target="_blank"
              >
                IPEDS (Integrated Postsecondary Education Data System)
              </a>{" "}
              — the underlying federal data collection that all U.S. accredited institutions report into annually.
            </li>
            {websiteUrl && (
              <li>
                <a href={websiteUrl} rel="noopener nofollow" target="_blank">
                  {school.name} official admissions site
                </a>{" "}
                — for the most current published figures and application requirements.
              </li>
            )}
            <li>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(school.name + " common data set")}`}
                rel="noopener nofollow"
                target="_blank"
              >
                {school.shortName} Common Data Set
              </a>{" "}
              — the standardized annual data document published by the school.
            </li>
          </ul>

          {/* Footer note */}
          <p className="text-center text-xs text-pencil mt-10 italic">
            Last verified {LAST_VERIFIED}. Stats reflect {school.shortName}&apos;s most recent publicly published admit cycle.
          </p>

          {/* Continue reading */}
          <div className="not-prose mt-14 pt-8 border-t border-hair text-center">
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
                href="/colleges"
                className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
              >
                All colleges
              </Link>
              <Link
                href="/colleges/most-selective"
                className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
              >
                Most selective
              </Link>
              <Link
                href="/colleges/best-financial-aid"
                className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
              >
                Best financial aid
              </Link>
              <Link
                href="/ivy-league-essay-examples"
                className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream"
              >
                Ivy essay examples
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
      </div>
    </article>
  );
}

function FactRow({
  label,
  value,
  emphasized,
  last,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
  last?: boolean;
}) {
  return (
    <tr className={last ? "" : "border-b border-hair"}>
      <td className="px-5 py-3.5 text-pencil">{label}</td>
      <td
        className={`px-5 py-3.5 text-right tabular-nums font-bold ${
          emphasized ? "text-oxblood text-base" : "text-ink"
        }`}
      >
        {value}
      </td>
    </tr>
  );
}

function SubStatBox({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-hair bg-cream px-4 py-4 text-center">
      <p className="text-[10px] font-semibold text-pencil uppercase tracking-[0.15em] mb-2">
        {title}
      </p>
      <p
        className="tabular-nums font-bold text-ink leading-none"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "20px",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-pencil mt-2">{sub}</p>}
    </div>
  );
}

function DemoBar({ label, value }: { label: string; value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-44 shrink-0 text-ink-2">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-hair overflow-hidden">
        <div
          className="h-full bg-oxblood"
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right tabular-nums text-ink font-semibold">{pct}%</span>
    </div>
  );
}

function ComparisonRow({
  slug,
  name,
  admitRate,
  sat25,
  sat75,
  netPrice,
  isSelf,
}: {
  slug: string;
  name: string;
  admitRate?: number;
  sat25?: number;
  sat75?: number;
  netPrice?: number;
  isSelf?: boolean;
}) {
  return (
    <tr className={`border-t border-hair ${isSelf ? "bg-[#FAEEEA]/50" : ""}`}>
      <td className="px-4 py-3 font-medium text-ink">
        {isSelf ? (
          <span>{name} <span className="text-[10px] text-oxblood font-semibold uppercase tracking-wider ml-1">This page</span></span>
        ) : (
          <Link href={`/colleges/${slug}`} className="!text-ink !no-underline hover:!text-oxblood">
            {name}
          </Link>
        )}
      </td>
      <td className="px-4 py-3 text-right tabular-nums font-semibold text-ink">
        {admitRate !== undefined ? formatPctSafe(admitRate) : "—"}
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-ink-2">
        {sat25 && sat75 ? `${sat25}–${sat75}` : "—"}
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-ink-2">
        {netPrice !== undefined ? formatMoneySafe(netPrice) : "—"}
      </td>
    </tr>
  );
}
