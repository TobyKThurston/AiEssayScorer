import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools, type School } from "@/tools/schools";
import { getStats, formatPct, type CollegeStat } from "@/colleges/collegeStats";
import { extraStats } from "@/colleges/extraColleges";
import { getScorecard, formatMoneySafe } from "@/colleges/scorecard";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

const IVY_SLUGS = [
  "harvard", "yale", "princeton", "columbia", "upenn", "cornell", "brown", "dartmouth",
];

export const metadata: Metadata = {
  title: "Easiest Ivy League School to Get Into (2026 Acceptance Rates Compared)",
  description:
    "All 8 Ivy League schools ranked by acceptance rate from easiest to hardest. Real published admit rates with SAT ranges, financial aid, and a calculator that estimates your odds at each.",
  alternates: { canonical: "/colleges/easiest-ivies" },
  openGraph: {
    title: "Easiest Ivy League School to Get Into",
    description: "All 8 Ivies ranked by acceptance rate. Real data with personal odds calculator.",
    url: "/colleges/easiest-ivies",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Easiest Ivies ranked" }],
  },
};

function lookupStats(slug: string): CollegeStat | null {
  const curated = getStats(slug);
  if (curated) return curated;
  const extra = extraStats[slug];
  if (!extra) return null;
  return extra as CollegeStat;
}

export default function EasiestIviesPage() {
  const ivies = IVY_SLUGS
    .map((slug) => {
      const school = schools.find((s) => s.slug === slug);
      if (!school) return null;
      const stat = lookupStats(slug);
      const sc = getScorecard(slug);
      const rate = stat?.acceptanceRate ?? sc?.admitRate;
      if (rate === undefined) return null;
      return {
        school,
        stat,
        sc,
        rate,
        sat25: stat?.sat?.p25 ?? sc?.sat25,
        sat75: stat?.sat?.p75 ?? sc?.sat75,
        netPrice: sc?.avgNetPrice,
        earlyType: stat?.earlyDecisionType,
        earlyRate: stat?.earlyAcceptanceRate,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.rate - a.rate); // EASIEST first (highest rate)

  const easiest = ivies[0];
  const hardest = ivies[ivies.length - 1];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
      { "@type": "ListItem", position: 3, name: "Easiest Ivies", item: `${baseUrl}/colleges/easiest-ivies` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ivy League Schools Ranked by Acceptance Rate (Easiest First)",
    numberOfItems: ivies.length,
    itemListElement: ivies.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.school.name,
      url: `${baseUrl}/colleges/${r.school.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the easiest Ivy League school to get into?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Among the 8 Ivy League schools, ${easiest.school.name} currently has the highest published acceptance rate at ${formatPct(easiest.rate)}. That makes it statistically the easiest Ivy to be admitted to, though all 8 remain extremely selective.`,
        },
      },
      {
        "@type": "Question",
        name: "What is the hardest Ivy League school to get into?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${hardest.school.name} has the lowest published acceptance rate among the Ivies at ${formatPct(hardest.rate)}.`,
        },
      },
      {
        "@type": "Question",
        name: "What's the average Ivy League acceptance rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Across all 8 Ivy League schools, the average published acceptance rate is approximately ${formatPct(ivies.reduce((s, i) => s + i.rate, 0) / ivies.length)}. The range spans roughly ${formatPct(easiest.rate)} (${easiest.school.shortName}) to ${formatPct(hardest.rate)} (${hardest.school.shortName}).`,
        },
      },
    ],
  };

  return (
    <article className="pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Colleges", href: "/colleges" }, { label: "Easiest Ivies" }]} />

        <header className="text-center mt-6 mb-12">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            All 8 Ivy League schools, ranked
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: "1.05", letterSpacing: "-0.02em" }}
          >
            The Easiest Ivy League School to Get Into
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            Ranked easiest to hardest by published acceptance rate.
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your odds at all 8
          </Link>
        </header>

        <section className="not-prose mb-12 rounded-2xl border border-hair bg-cream px-7 py-6">
          <h2 className="text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}>
            What is the easiest Ivy League school to get into?
          </h2>
          <p className="text-ink-2 leading-relaxed">
            By published acceptance rate,{" "}
            <Link href={`/colleges/${easiest.school.slug}`} className="!text-oxblood !no-underline font-semibold hover:!text-ink">
              {easiest.school.name}
            </Link>{" "}
            is currently the easiest Ivy to get into at <strong className="text-ink">{formatPct(easiest.rate)}</strong>. The hardest is{" "}
            <Link href={`/colleges/${hardest.school.slug}`} className="!text-oxblood !no-underline font-semibold hover:!text-ink">
              {hardest.school.name}
            </Link>{" "}
            at <strong className="text-ink">{formatPct(hardest.rate)}</strong>. All 8 Ivies remain extraordinarily selective. &ldquo;Easier&rdquo; is relative.
          </p>
        </section>

        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Easiest to Hardest
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <table className="w-full text-sm">
              <thead className="bg-[#FAEEEA]">
                <tr>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em] w-10">#</th>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">School</th>
                  <th className="text-right px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Accept</th>
                  <th className="hidden sm:table-cell text-right px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">SAT</th>
                  <th className="hidden md:table-cell text-right px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Early</th>
                </tr>
              </thead>
              <tbody>
                {ivies.map((r, i) => (
                  <tr key={r.school.slug} className={i === ivies.length - 1 ? "" : "border-b border-hair"}>
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
                      {r.sat25 && r.sat75 ? `${r.sat25}–${r.sat75}` : "—"}
                    </td>
                    <td className="hidden md:table-cell px-5 py-3.5 text-right tabular-nums text-ink-2 text-xs">
                      {r.earlyType
                        ? `${r.earlyType}${r.earlyRate ? ` ${formatPct(r.earlyRate)}` : ""}`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-pencil mt-3 text-center">
            Sources: school-published admit cycle data and U.S. Department of Education College Scorecard. Last verified {LAST_VERIFIED}.
          </p>
        </section>

        <section className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-12 [&>h2]:mb-5">
          <h2>Why &ldquo;easiest&rdquo; is misleading</h2>
          <p>
            The easiest-Ivy ranking is real but misleading taken alone. {easiest.school.shortName}&apos;s headline acceptance rate of {formatPct(easiest.rate)} sounds dramatically more accessible than {hardest.school.shortName}&apos;s {formatPct(hardest.rate)}, but the gap closes when you look at the applicant pools. {easiest.school.shortName} draws a slightly less self-selected pool than {hardest.school.shortName}, which inflates the headline rate without making admission proportionally easier for any individual applicant.
          </p>
          <p>
            For an unhooked applicant with strong-but-not-extraordinary credentials, all 8 Ivies fall in roughly the same odds range. The differentiator is fit and how the application reads, not which Ivy you target. Apply to whichever 1–3 Ivies you genuinely like and that match your interests, then calibrate the rest of your list with target and safety schools at lower rejection rates.
          </p>

          <h2>The early decision boost</h2>
          <p>
            Most Ivies offer a binding Early Decision (Brown, Columbia, Cornell, Penn, Dartmouth) or non-binding Single-Choice Early Action (Harvard, Yale, Princeton). Early-round acceptance rates run roughly 2–4× higher than regular decision rates, but the gap is mostly composition rather than a real admit boost. ED pools concentrate recruited athletes, legacies, and other hooked applicants. The unhooked-applicant boost is real but smaller than the published rate suggests.
          </p>

          <h2>FAQ</h2>
          <div className="not-prose space-y-3 max-w-2xl mx-auto">
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">What is the easiest Ivy League school to get into in 2026?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                {easiest.school.name} currently has the highest published acceptance rate among Ivies at {formatPct(easiest.rate)}, making it statistically the easiest. Cornell typically ranks at or near the top of this list cycle to cycle because its larger applicant pool relative to class size produces a higher rate than other Ivies, though &ldquo;easier&rdquo; remains a relative term in this group.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">What is the hardest Ivy League school to get into?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                {hardest.school.name} has the lowest published acceptance rate among Ivies at {formatPct(hardest.rate)}. Harvard, Princeton, Yale, and Columbia all swap positions cycle to cycle within a narrow band, all admitting fewer than 5% of applicants in most recent cycles.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Should I apply to the easiest Ivy because my odds are better?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Only if you actually want to attend. ED to a school you wouldn&apos;t happily attend is a bad strategy. The acceptance-rate spread among Ivies is much smaller than it looks once you adjust for hooked applicants. Apply where you&apos;d genuinely thrive and where your essays will read as authentic.
              </p>
            </details>
            <details className="border border-hair rounded-xl px-5 py-4 bg-cream">
              <summary className="font-medium text-ink cursor-pointer">Are the &ldquo;Ivy Plus&rdquo; schools (Stanford, MIT, Duke) easier or harder than the actual Ivies?</summary>
              <p className="mt-3 text-ink-2 text-sm leading-relaxed">
                Generally similar or harder. Stanford and MIT typically have lower acceptance rates than most Ivies. Duke, Northwestern, and other &ldquo;Ivy Plus&rdquo; schools fall in roughly the same range. Selectivity at the top of U.S. higher education has compressed substantially over the past decade.
              </p>
            </details>
          </div>
        </section>

        <div className="text-center mt-14 pt-8 border-t border-hair">
          <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Get a real probability, not a guess
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your Ivy odds
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
            <Link href="/ivy-league-essay-examples" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Ivy essay examples
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
