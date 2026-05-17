import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/design/Breadcrumbs";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

export const metadata: Metadata = {
  // Methodology page mostly carries E-E-A-T weight rather than capturing
  // search demand. Title leads with the trust hook ("How It Works")
  // instead of the abstract word "Methodology" so it actually gets
  // clicked when shown for branded queries.
  title: "How the Ivy Admit Essay Scorer Works (Methodology & Data)",
  description:
    "Inside the Ivy Admit AI essay scorer: training corpus, scoring rubric, validation against real admit outcomes, known limitations, and the federal data behind the admit-odds calculator.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "How the Ivy Admit Essay Scorer Works (Methodology & Data)",
    description:
      "Training corpus, rubric, validation, limitations and data sources behind the AI essay scorer and admit-odds calculator.",
    url: "/methodology",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "How the Ivy Admit AI essay scorer works and the data behind it" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How the Ivy Admit Essay Scorer Works (Methodology & Data)",
    description: "Corpus, rubric, validation, and data sources, in plain English.",
    images: ["/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Methodology", item: `${baseUrl}/methodology` },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${baseUrl}/methodology#article`,
  headline: "Ivy Admit Methodology",
  description:
    "How the Ivy Admit AI essay scorer was built: training corpus, scoring rubric, validation against admit outcomes, and known limitations.",
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
    description:
      "Admissions writers and editors. Members of the team applied to and were admitted to Harvard, Yale, Princeton, Stanford, MIT, and peer institutions.",
    worksFor: { "@id": `${baseUrl}/#organization` },
  },
  publisher: { "@id": `${baseUrl}/#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/methodology` },
};

export default function MethodologyPage() {
  return (
    <article className="pt-14 sm:pt-20 md:pt-28 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Methodology" },
          ]}
        />

        <header className="mb-10">
          <p className="text-[11px] font-semibold text-oxblood uppercase tracking-[0.18em] mb-3">
            Methodology
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink leading-tight mb-3">
            How the Ivy Admit essay scorer was built — and what it can and can&apos;t tell you
          </h1>
          <p className="text-lg text-ink-2">
            We built Ivy Admit to give every student access to the kind of structural feedback that
            normally requires a private counselor. This page documents the training corpus, the
            scoring rubric, validation against admit outcomes, and known limitations. We update it
            when the model or data changes.
          </p>
        </header>

        <div className="prose prose-slate max-w-none">
          <h2>The training corpus</h2>
          <p>
            The scorer is anchored on patterns observed across roughly{" "}
            <strong>500+ accepted personal statements</strong> and supplemental essays gathered from
            students who shared their applications publicly (anthologies, university-published
            samples, alumni archives) along with structurally-comparable rejected drafts. We do not
            redistribute the underlying essays. The model uses them only as alignment signal during
            evaluation — it reads patterns, not paragraphs.
          </p>
          <p>
            Schools represented in the corpus include Harvard, Yale, Princeton, Stanford, MIT,
            Columbia, UPenn, Brown, Dartmouth, Cornell, Duke, Northwestern, UChicago, Caltech,
            Johns Hopkins, Rice, Vanderbilt, Notre Dame, Georgetown, Williams, Amherst, Pomona,
            Swarthmore, Bowdoin, the UCs, and the Ivies&apos; peer set. The corpus skews toward
            humanities and social-science topics; STEM-leaning essays are validated separately
            against a smaller sample to catch evaluation drift.
          </p>

          <h2>The rubric</h2>
          <p>
            Every essay receives three orthogonal scores on a 0–100 scale:
          </p>
          <ul>
            <li>
              <strong>Content (specificity).</strong> Density of concrete, nameable detail relative
              to the essay&apos;s claims. Penalizes claim-without-scene, abstract aspirations, and
              sentences that could appear unchanged in another applicant&apos;s essay.
            </li>
            <li>
              <strong>Structure (narrative arc).</strong> Whether the essay moves: opening scene →
              moment of change → forward-looking close. Penalizes summary openings, midstream stall
              (no inflection point), and resolved-growth closes (&ldquo;this taught me&hellip;&rdquo;).
            </li>
            <li>
              <strong>Voice (distinctiveness).</strong> Lexical and syntactic distance from the
              modal college essay. Penalizes high-frequency template phrases, adjective stacks,
              cliché openings (quotes, &ldquo;ever since I was young&rdquo;), and overly uniform
              sentence rhythm.
            </li>
          </ul>
          <p>
            Composite scores are weighted by essay length: longer essays weight Content more
            heavily; shorter supplements weight Voice. Sub-scores never feed each other — Content
            failure cannot be compensated by Voice strength.
          </p>

          <h2>Validation</h2>
          <p>
            We validated rubric scores against admit-outcome buckets in two ways:
          </p>
          <ol>
            <li>
              <strong>Held-out admitted-vs-rejected pairs.</strong> On a held-out test set of
              admitted and rejected essays at peer schools (matched for academic profile),
              composite scores separated admitted essays from rejected ones at a meaningful but
              non-determinative rate. Essays from admitted students at highly selective schools
              average above 82 across the three dimensions; the spread is wide and includes
              admitted essays scoring in the 60s.
            </li>
            <li>
              <strong>Inter-rater agreement.</strong> A panel of former admissions readers and
              college counselors independently rated a sample of essays on the same rubric.
              Composite scores correlated with the panel&apos;s ranked order at roughly the same
              level that two human readers agree with each other on a single essay.
            </li>
          </ol>
          <p>
            We re-run validation when the model is updated. Recent results are available on
            request to{" "}
            <a href="mailto:support@getivyadmit.com" className="text-oxblood">
              support@getivyadmit.com
            </a>
            .
          </p>

          <h2>Known limitations</h2>
          <ul>
            <li>
              <strong>The essay is one signal.</strong> Admit decisions also weight grades, course
              rigor, recommendations, activities, demographic context, and institutional priorities
              the application can&apos;t see. A high score does not predict an admit; a low score
              does not predict a rejection.
            </li>
            <li>
              <strong>Topic-area drift.</strong> The corpus skews humanities. STEM essays
              (research-heavy, technical) are scored against a smaller calibration set and may
              under-weight a particular kind of intellectual specificity.
            </li>
            <li>
              <strong>Non-native-English drafts.</strong> Voice scoring is calibrated to native
              English prose patterns. We are working on a separate calibration for non-native
              writers; in the meantime, the Voice score is less reliable for essays where English
              is the writer&apos;s second or third language.
            </li>
            <li>
              <strong>School-specific fit.</strong> The scorer evaluates an essay against general
              accepted-application patterns, not against any one school&apos;s admit profile. A
              strong essay can still miss on school fit, prompt-specific strategy, or supplement
              sequencing.
            </li>
            <li>
              <strong>Hooks and institutional priorities.</strong> Recruited athletes, legacies,
              first-generation applicants, and applicants advancing institutional priorities are
              evaluated in a different pool. Headline acceptance rates compress these signals;
              published-rate comparisons (used in the odds calculator) are mathematically less
              meaningful for hooked applicants.
            </li>
          </ul>

          <h2>Data sources for the admit-odds calculator</h2>
          <p>
            The per-school admit-odds calculator uses publicly published data from:
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
              for acceptance rates, test-score ranges, financial aid, demographics, completion, and
              earnings.
            </li>
            <li>
              <a href="https://nces.ed.gov/ipeds/" rel="noopener nofollow" target="_blank">
                IPEDS (Integrated Postsecondary Education Data System)
              </a>{" "}
              for the underlying federal data — enrollment, retention, graduation, and outcomes.
            </li>
            <li>
              Each school&apos;s most recent published <strong>Common Data Set (2024–25)</strong>{" "}
              for cycle-specific admit-cycle stats and demographic breakdowns.
            </li>
            <li>
              School-published news releases for current-cycle acceptance rates where Common Data
              Set data is not yet released.
            </li>
          </ul>
          <p>
            Data is verified against source on a monthly review cycle. The footer of every
            comparison and college page lists the last verification date.
          </p>

          <h2>Privacy</h2>
          <p>
            Essays you submit through the free scorer are processed in-memory for evaluation and
            are not used to train models. Saved essays in your account are stored encrypted at
            rest and are private to your account; you can delete them at any time. We do not
            sell or share user-submitted essays under any circumstance.
          </p>

          <h2>Updates and corrections</h2>
          <p>
            Corrections, methodology questions, and data-source disputes:{" "}
            <a href="mailto:support@getivyadmit.com" className="text-oxblood">
              support@getivyadmit.com
            </a>
            . We publish material methodology changes in the changelog and update this page when
            the rubric, corpus, or data sources change.
          </p>

          <div className="not-prose mt-12 pt-8 border-t border-hair">
            <p className="text-sm text-pencil mb-4">Continue reading</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream"
              >
                About Ivy Admit
              </Link>
              <Link
                href="/college-essay-checker"
                className="px-4 py-2 rounded-full bg-ink text-white text-sm font-medium hover:bg-oxblood transition-all"
              >
                Try the essay checker
              </Link>
              <Link
                href="/colleges"
                className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream"
              >
                Browse colleges
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full border border-hair text-sm text-ink-2 hover:text-ink hover:border-ink transition-all bg-cream"
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
