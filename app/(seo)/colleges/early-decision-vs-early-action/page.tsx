import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";
import { schools } from "@/tools/schools";
import { getStats, formatPct } from "@/colleges/collegeStats";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
const LAST_VERIFIED = "May 2026";

export const metadata: Metadata = {
  title: "Early Decision vs Early Action: Which Should You Apply To? (2026-2027)",
  description:
    "ED vs EA vs REA vs SCEA explained. Lists of which schools offer each type, real published early acceptance rates, and how to decide which round to apply.",
  alternates: { canonical: "/colleges/early-decision-vs-early-action" },
  keywords: [
    "early decision vs early action",
    "ED vs EA",
    "restrictive early action",
    "single choice early action",
    "early decision schools",
    "early action schools",
    "binding early decision",
    "REA vs SCEA",
  ],
  openGraph: {
    title: "Early Decision vs Early Action: The Complete Guide",
    description: "ED vs EA vs REA vs SCEA fully explained with school lists and acceptance rates.",
    url: "/colleges/early-decision-vs-early-action",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Early Decision vs Early Action" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Colleges", item: `${baseUrl}/colleges` },
    { "@type": "ListItem", position: 3, name: "Early Decision vs Early Action", item: `${baseUrl}/colleges/early-decision-vs-early-action` },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Early Decision vs Early Action: Which Should You Apply To?",
  datePublished: "2026-05-09",
  dateModified: "2026-05-09",
  author: {
    "@type": "Person",
    name: "Ivy Admit Editorial Team",
    url: `${baseUrl}/about`,
    jobTitle: "Editorial Team",
    worksFor: { "@type": "Organization", name: "Ivy Admit", url: baseUrl },
    description:
      "Editors at Ivy Admit covering selective US college admissions, application strategy, and essay craft. Combined experience reviewing thousands of applications to Harvard, Yale, Princeton, Stanford, MIT, and other top schools.",
  },
  publisher: {
    "@type": "Organization",
    name: "Ivy Admit",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon-192.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/colleges/early-decision-vs-early-action` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between Early Decision and Early Action?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early Decision (ED) is binding: if admitted, you must enroll and withdraw all other applications. Early Action (EA) is non-binding: you get an early decision but can compare aid offers and choose any school until the May 1 reply deadline. The trade-off is that ED schools often offer higher acceptance rates than RD, but you give up your ability to compare financial aid offers.",
      },
    },
    {
      "@type": "Question",
      name: "Should I apply Early Decision?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apply ED only if (1) the school is genuinely your first choice, (2) you can afford to attend at the school's published net price calculator estimate without comparing aid offers, and (3) your application is your strongest by the November deadline. If financial aid is critical, ED removes your leverage. If you're not sure, apply RD or EA.",
      },
    },
    {
      "@type": "Question",
      name: "Is Early Decision easier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ED acceptance rates are typically 2 to 4 times higher than Regular Decision rates, but most of that gap is composition. ED pools concentrate recruited athletes, legacies, first-generation students, and other hooked applicants. The boost for an unhooked applicant is real but smaller than the published rate gap suggests, often closer to 1.5x to 2x.",
      },
    },
    {
      "@type": "Question",
      name: "What is REA / SCEA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Restrictive Early Action (REA) and Single-Choice Early Action (SCEA) are non-binding, but you can only apply to one private university in the early round. Public universities and ED II schools are usually still allowed. Harvard, Yale, Princeton, Stanford, and Notre Dame use this format. The acceptance rate is higher than RD but you don't have to commit if admitted.",
      },
    },
    {
      "@type": "Question",
      name: "Can I apply ED to multiple schools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Standard ED is binding to one school. ED I and ED II are different rounds at the same school (you can apply ED I to one school and ED II to another if you're rejected, deferred, or waitlisted from ED I). You cannot apply ED I to two different schools simultaneously.",
      },
    },
  ],
};

// Build school lists by decision type using curated data
const withStats = schools
  .map((s) => ({ school: s, stat: getStats(s.slug) }))
  .filter((x) => x.stat);

const edSchools = withStats.filter((x) => x.stat?.earlyDecisionType === "ED" || x.stat?.earlyDecisionType === "ED I/II");
const sceaSchools = withStats.filter((x) => x.stat?.earlyDecisionType === "SCEA");
const reaSchools = withStats.filter((x) => x.stat?.earlyDecisionType === "REA");
const eaSchools = withStats.filter((x) => x.stat?.earlyDecisionType === "EA");

export default function EDvsEAPage() {
  return (
    <article className="pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Colleges", href: "/colleges" }, { label: "ED vs EA" }]} />

        <header className="text-center mt-6 mb-12">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-4">
            Early application strategy
          </p>
          <h1
            className="text-ink mb-5 mx-auto max-w-2xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 52px)", lineHeight: "1.05", letterSpacing: "-0.02em" }}
          >
            Early Decision vs Early Action
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-2 mb-7 max-w-xl mx-auto leading-snug">
            ED, EA, REA, SCEA explained. Which schools offer each, and how to choose.
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your odds at any school
          </Link>
        </header>

        <section className="not-prose mb-12 rounded-2xl border border-hair bg-cream px-7 py-6">
          <h2 className="text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "20px" }}>
            What is the difference between Early Decision and Early Action?
          </h2>
          <p className="text-ink-2 leading-relaxed">
            <strong className="text-ink">Early Decision (ED)</strong> is a binding application option: if a college admits you in ED, you must enroll there and withdraw all other applications. <strong className="text-ink">Early Action (EA)</strong> is non-binding — you receive an admissions decision early, typically in mid-December, but you can still compare offers from other schools and decide by the standard May 1 reply deadline. The strategic difference is leverage: ED tells a college you will enroll if admitted, which is why ED admit rates run roughly 2 to 4 times higher than Regular Decision rates at most selective schools. EA carries no such commitment, so the admit-rate boost is smaller (often 1.2 to 1.5 times) but you keep the ability to compare financial aid offers. <strong className="text-ink">Restrictive Early Action (REA)</strong> and <strong className="text-ink">Single-Choice Early Action (SCEA)</strong> sit between the two — non-binding, but you can&apos;t apply ED elsewhere. Choose ED only if the school is your unambiguous first choice and you don&apos;t need to compare aid; otherwise EA, REA, or RD.
          </p>
        </section>

        {/* Comparison table */}
        <section className="not-prose mb-14">
          <p className="text-center text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            ED vs EA vs REA vs SCEA at a Glance
          </p>
          <div className="rounded-2xl border border-hair overflow-hidden bg-cream">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead className="bg-[#FAEEEA]">
                <tr>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Type</th>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Binding?</th>
                  <th className="text-left px-3 sm:px-5 py-3 text-[11px] font-semibold text-pencil uppercase tracking-[0.15em]">Apply elsewhere?</th>
                </tr>
              </thead>
              <tbody>
                <DefRow type="ED" binding="Yes" elsewhere="No, except non-binding rolling/EA publics" last={false} />
                <DefRow type="ED II" binding="Yes" elsewhere="No, except non-binding rolling/EA publics" last={false} />
                <DefRow type="EA" binding="No" elsewhere="Yes, anywhere" last={false} />
                <DefRow type="REA" binding="No" elsewhere="Limited (private universities restricted, publics OK)" last={false} />
                <DefRow type="SCEA" binding="No" elsewhere="Limited (private universities restricted, publics OK)" last />
              </tbody>
            </table>
            </div>
          </div>
        </section>

        <div className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-12 [&>h2]:mb-6">
          <h2>The Real Trade-Off: Acceptance Rate vs Financial Flexibility</h2>
          <p>
            Early Decision schools typically admit at 2 to 4 times the rate of Regular Decision. The trap is assuming this represents your personal admit boost. Most of the gap is <em>composition</em>. ED pools concentrate recruited athletes (whose admit rates are above 80%), legacies (admit rates often 2-3x baseline), first-generation flagged applicants, and other hooked categories. Once you control for hooks, the unhooked-applicant ED boost is real but typically closer to 1.5x to 2x, not 4x.
          </p>
          <p>
            That doesn&apos;t mean ED is useless. A 1.5x boost on a 4% RD rate is a meaningful 6%, and at the margin every percentage point matters. But the cost is real too: you lose the ability to compare financial aid offers across schools. For families where net price is decision-determinative, that&apos;s a steep trade.
          </p>

          <h2>Should You Apply ED?</h2>
          <p>
            You should apply Early Decision only when the binding commitment is unambiguously the right trade for your situation. ED removes two things you might otherwise rely on: the ability to compare financial aid offers across multiple admits, and the ability to change your mind once you see all your options in March or April. In return, you get a meaningful admit-rate boost (typically 1.5 to 2 times for unhooked applicants once you control for athletes and legacies in the ED pool) and a faster, calmer senior winter. For families where net price is decision-determinative, that&apos;s rarely a fair trade. For students with one clear first choice and a stable family financial picture, it usually is. The decision test is a three-part filter: first choice, affordable at the published estimate, and ready by November. Apply ED if all three are true:
          </p>
          <ol>
            <li><strong>The school is genuinely your first choice.</strong> ED is binding. If you&apos;d be tempted to attend a different school for any reason, don&apos;t ED.</li>
            <li><strong>You can afford it.</strong> Run the school&apos;s net price calculator before applying. If the published estimate is workable for your family, ED is fine. If financial aid is uncertain, RD preserves your leverage.</li>
            <li><strong>Your application is at its strongest by the November deadline.</strong> Senior fall test scores, fall-semester grades, and revised essays should all be ready. ED with a half-finished application is malpractice.</li>
          </ol>
          <p>
            If any of those is false, apply RD. There&apos;s no shame in not having a single first choice or in needing to compare aid offers.
          </p>

          <h2>SCEA / REA: The Non-Binding Compromise</h2>
          <p>
            Single-Choice Early Action (Yale, Princeton) and Restrictive Early Action (Harvard, Stanford, Notre Dame) split the difference: you get an early answer at one private university, but the answer doesn&apos;t bind you. You can still compare aid offers from other RD schools, you just can&apos;t apply ED elsewhere. This is the strongest early-round strategy for unhooked applicants who want both the early-round boost and the ability to compare options. The trade-off is you can only use it at one private university.
          </p>
        </div>

        {/* School lists by decision type */}
        {sceaSchools.length > 0 && (
          <section className="not-prose mt-14">
            <p className="text-center text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-2">
              Single-Choice Early Action
            </p>
            <h2 className="text-center text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 3vw, 28px)", letterSpacing: "-0.01em" }}>
              SCEA Schools
            </h2>
            <p className="text-center text-pencil text-sm mb-6 max-w-xl mx-auto">
              Non-binding. Only one private university; publics and ED II schools usually OK.
            </p>
            <SchoolGrid schools={sceaSchools} />
          </section>
        )}

        {reaSchools.length > 0 && (
          <section className="not-prose mt-14">
            <p className="text-center text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-2">
              Restrictive Early Action
            </p>
            <h2 className="text-center text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 3vw, 28px)", letterSpacing: "-0.01em" }}>
              REA Schools
            </h2>
            <p className="text-center text-pencil text-sm mb-6 max-w-xl mx-auto">
              Non-binding. Restrictions on other early-round private applications.
            </p>
            <SchoolGrid schools={reaSchools} />
          </section>
        )}

        {edSchools.length > 0 && (
          <section className="not-prose mt-14">
            <p className="text-center text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-2">
              Early Decision (Binding)
            </p>
            <h2 className="text-center text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 3vw, 28px)", letterSpacing: "-0.01em" }}>
              ED Schools
            </h2>
            <p className="text-center text-pencil text-sm mb-6 max-w-xl mx-auto">
              Binding. If admitted, you must enroll and withdraw all other applications.
            </p>
            <SchoolGrid schools={edSchools} />
          </section>
        )}

        {eaSchools.length > 0 && (
          <section className="not-prose mt-14">
            <p className="text-center text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-2">
              Standard Early Action
            </p>
            <h2 className="text-center text-ink mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 3vw, 28px)", letterSpacing: "-0.01em" }}>
              EA Schools
            </h2>
            <p className="text-center text-pencil text-sm mb-6 max-w-xl mx-auto">
              Non-binding. Apply early elsewhere freely.
            </p>
            <SchoolGrid schools={eaSchools} />
          </section>
        )}

        <div className="prose prose-slate max-w-none [&>h2]:text-center [&>h2]:mt-14 [&>h2]:mb-5">
          <h2>FAQ</h2>
          <div className="not-prose space-y-3 max-w-2xl mx-auto">
            {faqSchema.mainEntity.map((q) => (
              <details key={q.name} className="border border-hair rounded-xl px-5 py-4 bg-cream">
                <summary className="font-medium text-ink cursor-pointer">{q.name}</summary>
                <p className="mt-3 text-ink-2 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-pencil mt-10 italic">
          Last verified {LAST_VERIFIED}. Always confirm each school&apos;s current early-round policies on their official admissions page before applying.
        </p>

        <div className="text-center mt-14 pt-8 border-t border-hair">
          <p className="text-[11px] font-semibold text-pencil uppercase tracking-[0.18em] mb-4">
            Pick the right round
          </p>
          <Link href="/try" className="inline-block px-7 py-3 rounded-full bg-ink !text-white !no-underline font-medium hover:bg-oxblood hover:!text-white transition-all">
            Calculate your odds
          </Link>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link href="/colleges" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              All colleges
            </Link>
            <Link href="/colleges/easiest-ivies" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Easiest Ivies
            </Link>
            <Link href="/common-app-essay-prompts-2026-2027" className="px-4 py-2 rounded-full border border-hair !text-ink-2 !no-underline text-sm hover:!text-ink hover:border-ink transition-all bg-cream">
              Common App prompts 2026-27
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function DefRow({ type, binding, elsewhere, last }: { type: string; binding: string; elsewhere: string; last: boolean }) {
  return (
    <tr className={last ? "" : "border-b border-hair"}>
      <td className="px-3 sm:px-5 py-3 text-ink font-semibold tabular-nums">{type}</td>
      <td className="px-3 sm:px-5 py-3 text-ink-2">{binding}</td>
      <td className="px-3 sm:px-5 py-3 text-ink-2">{elsewhere}</td>
    </tr>
  );
}

function SchoolGrid({ schools: list }: { schools: { school: { slug: string; name: string; shortName: string; location: string }; stat: { acceptanceRate: number; earlyAcceptanceRate?: number; earlyDeadline?: string } | null }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
      {list.map(({ school, stat }) => (
        <Link
          key={school.slug}
          href={`/colleges/${school.slug}`}
          className="block rounded-xl border border-hair bg-cream p-4 !no-underline hover:border-ink hover:shadow-sm transition-all"
        >
          <p className="text-base font-bold !text-ink mb-1">{school.name}</p>
          <div className="flex flex-wrap gap-x-3 text-xs !text-ink-2 tabular-nums">
            <span>
              <span className="!text-oxblood font-semibold">{formatPct(stat?.acceptanceRate ?? 0)}</span>{" "}RD
            </span>
            {stat?.earlyAcceptanceRate !== undefined && (
              <span>
                <span className="!text-oxblood font-semibold">{formatPct(stat.earlyAcceptanceRate)}</span>{" "}early
              </span>
            )}
            {stat?.earlyDeadline && <span>· {stat.earlyDeadline}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}
