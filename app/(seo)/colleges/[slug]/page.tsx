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

type Props = { params: Promise<{ slug: string }> };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

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

  const title = `${school.name} Admissions: Acceptance Rate, SAT, GPA & Your Odds`;
  const description = stat
    ? `${school.name} accepts ${formatPct(stat.acceptanceRate)} of applicants. See SAT (${stat.sat?.p25}–${stat.sat?.p75}), cost, deadlines, and what makes essays work. Then calculate your real admission odds.`
    : `${school.name} admissions guide: acceptance rate, SAT/GPA ranges, supplemental essays, and how to estimate your real chances of getting in.`;

  return {
    title,
    description,
    keywords: [
      `${school.shortName} acceptance rate`,
      `${school.shortName} admissions`,
      `${school.shortName} SAT scores`,
      `${school.shortName} GPA`,
      `how to get into ${school.shortName}`,
      `${school.shortName} essay`,
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

export default async function CollegePage({ params }: Props) {
  const { slug } = await params;
  const school = findSchool(slug);
  if (!school) return notFound();

  const stat = findStats(slug);
  const hasRich = hasRichContent(school);
  const url = `${baseUrl}/colleges/${slug}`;

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
    .slice(0, 8);

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
    name: school.name,
    url,
    address: { "@type": "PostalAddress", addressLocality: school.location, addressCountry: "US" },
    foundingDate: stat?.founded ? String(stat.founded) : undefined,
    numberOfStudents: stat?.undergradEnrollment,
  };

  const faqSchema = hasRich && school.rich
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: school.rich.faq.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        })),
      }
    : null;

  return (
    <article className="pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
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

        {/* Hero — centered */}
        <header className="text-center mt-6 mb-14">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            {school.category} · {school.location}
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
            {school.name}
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            {stat
              ? `Acceptance rate of ${formatPct(stat.acceptanceRate)}. The rest of the picture is below.`
              : `Admissions guide. The full picture is below.`}
          </p>
          <Link
            href="/try"
            className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all"
          >
            Calculate your {school.shortName} odds
          </Link>
        </header>

        {/* Stats grid — centered, polished */}
        {stat && (
          <section className="not-prose mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-hair rounded-2xl overflow-hidden border border-hair">
              <StatCell
                label="Acceptance"
                value={formatPct(stat.acceptanceRate)}
                sub={stat.acceptanceRateLabel}
                emphasized
              />
              {stat.sat && (
                <StatCell
                  label="SAT (mid-50%)"
                  value={`${stat.sat.p25}–${stat.sat.p75}`}
                  sub="Composite"
                />
              )}
              {stat.act && (
                <StatCell
                  label="ACT (mid-50%)"
                  value={`${stat.act.p25}–${stat.act.p75}`}
                  sub="Composite"
                />
              )}
              {stat.usnewsRank !== undefined && (
                <StatCell
                  label="U.S. News"
                  value={`#${stat.usnewsRank}`}
                  sub="National"
                />
              )}
              {stat.coa !== undefined && (
                <StatCell
                  label="Cost / year"
                  value={formatMoney(stat.coa)}
                  sub="Before aid"
                />
              )}
              {stat.undergradEnrollment !== undefined && (
                <StatCell
                  label="Undergrads"
                  value={stat.undergradEnrollment.toLocaleString()}
                  sub={school.type}
                />
              )}
              {stat.earlyAcceptanceRate !== undefined && (
                <StatCell
                  label={`Early ${stat.earlyDecisionType ?? "EA/ED"}`}
                  value={formatPct(stat.earlyAcceptanceRate)}
                  sub="Restricted pool"
                />
              )}
              {stat.testPolicy && (
                <StatCell
                  label="Testing"
                  value={
                    stat.testPolicy === "required"
                      ? "Required"
                      : stat.testPolicy === "optional"
                        ? "Optional"
                        : "Test-blind"
                  }
                  sub="Latest cycle"
                />
              )}
              {stat.applicationDeadline && (
                <StatCell
                  label="RD deadline"
                  value={stat.applicationDeadline}
                  sub={stat.earlyDeadline ? `Early ${stat.earlyDeadline}` : undefined}
                />
              )}
            </div>
          </section>
        )}

        <div className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-14 [&>h2]:mb-6 [&>h3]:mt-8 [&>h3]:mb-3">
          {/* Getting in */}
          <h2>Getting In</h2>
          {stat ? (
            <>
              <p>
                {school.shortName}&apos;s {formatPct(stat.acceptanceRate)} acceptance rate
                {stat.totalApplicants && stat.totalAdmits
                  ? ` reflects ${stat.totalAdmits.toLocaleString()} admits from ${stat.totalApplicants.toLocaleString()} applications.`
                  : ` puts it among the most selective universities in the country.`}{" "}
                The mid-50% SAT range of {stat.sat?.p25}&ndash;{stat.sat?.p75} means a quarter of admitted students scored above {stat.sat?.p75}, and a quarter scored below {stat.sat?.p25}. Scores in that range don&apos;t guarantee admission. Scores outside it don&apos;t rule it out. The application is read holistically.
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

          {/* What the school looks for */}
          <h2>Beyond the Numbers</h2>
          <p>
            {school.shortName} is best known for {school.knownFor}. Admissions readers are looking for applicants whose specific interests and ways of working would actually thrive in that environment. Not generic &ldquo;passion.&rdquo; Concrete curiosity that already shows up in what you do.
          </p>
          {hasRich && school.rich && (
            <p>{school.rich.admitContext}</p>
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

          {/* Tools CTA — centered */}
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

          {/* Peer schools */}
          {peers.length > 0 && (
            <>
              <h2>Compare to Other {school.category} Schools</h2>
              <p className="text-center max-w-xl mx-auto">
                Applicants who consider {school.shortName} usually apply to several similar schools. Your odds at one are often a strong signal of your odds at the others.
              </p>
              <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-8">
                {peers.map((p) => {
                  const peerStat = findStats(p.slug);
                  return (
                    <Link
                      key={p.slug}
                      href={`/colleges/${p.slug}`}
                      className="block rounded-xl border border-hair bg-cream p-4 !no-underline hover:border-ink hover:shadow-sm transition-all"
                    >
                      <p className="text-[10px] font-semibold text-pencil uppercase tracking-[0.15em] mb-1">
                        {p.location}
                      </p>
                      <p className="text-sm font-bold !text-ink mb-1.5">{p.name}</p>
                      <div className="flex flex-wrap gap-x-3 text-xs !text-ink-2 tabular-nums">
                        {peerStat && (
                          <span>
                            <span className="!text-oxblood font-semibold">
                              {formatPct(peerStat.acceptanceRate)}
                            </span>{" "}
                            accept
                          </span>
                        )}
                        {peerStat?.sat && (
                          <span>
                            SAT {peerStat.sat.p25}&ndash;{peerStat.sat.p75}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* FAQ */}
          {hasRich && school.rich && (
            <>
              <h2>FAQ</h2>
              <div className="not-prose space-y-3 max-w-2xl mx-auto">
                {school.rich.faq.map((q) => (
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

          {/* Footer note */}
          <p className="text-center text-xs text-pencil mt-10 italic">
            Stats reflect {school.shortName}&apos;s most recent publicly published admit cycle. Verify current figures with {school.shortName}&apos;s admissions office.
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

function StatCell({
  label,
  value,
  sub,
  emphasized,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={`text-center px-4 py-5 ${
        emphasized ? "bg-[#FAEEEA]" : "bg-cream"
      }`}
    >
      <p className="text-[10px] font-semibold text-pencil uppercase tracking-[0.15em] mb-2">
        {label}
      </p>
      <p
        className={`tabular-nums font-bold leading-none ${
          emphasized ? "text-2xl text-oxblood" : "text-xl text-ink"
        }`}
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-pencil mt-2">{sub}</p>}
    </div>
  );
}
