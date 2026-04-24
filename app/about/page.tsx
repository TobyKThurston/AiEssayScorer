import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/design/Container";
import { Eyebrow } from "@/design/Eyebrow";
import { Rule } from "@/design/Rule";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

export const metadata: Metadata = {
  title: "About Ivy Admit, AI College Essay Review",
  description:
    "Ivy Admit is an AI-powered college essay review tool built by students admitted to Harvard, Yale, and Princeton. Learn how it works and why we built it.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Ivy Admit, AI College Essay Review",
    description:
      "Ivy Admit is an AI-powered college essay review tool built by students admitted to Harvard, Yale, and Princeton. Learn how it works and why we built it.",
    url: "/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Ivy Admit — AI College Essay Review" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ivy Admit, AI College Essay Review",
    description:
      "AI-powered college essay review built by students admitted to Harvard, Yale, and Princeton.",
    images: ["/og-image.png"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${baseUrl}/about#aboutpage`,
  url: `${baseUrl}/about`,
  name: "About Ivy Admit",
  description:
    "Ivy Admit is an AI-powered college essay review tool built by students admitted to Harvard, Yale, and Princeton.",
  mainEntity: { "@id": `${baseUrl}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${baseUrl}/about` },
  ],
};

export default function AboutPage() {
  return (
    <Container className="pt-20 md:pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-[720px]">
        <Eyebrow num="§01">About</Eyebrow>
        <h1 className="mt-4 font-serif text-[48px] md:text-[72px] leading-[1] tracking-[-0.025em] text-ink">
          Why we built <em className="italic text-oxblood">Ivy Admit</em>.
        </h1>
        <p className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-ink-2">
          An AI-powered essay review tool built by students who went through the same process, and
          wanted a faster, more honest way to get feedback.
        </p>

        <div className="mt-14 space-y-12">
          <Section heading="Why we built it">
            <p>
              College essay feedback is scarce and unevenly distributed. Students with access to
              college counselors, private advisors, and alumni networks get dozens of revision
              cycles. Students without that access submit their first or second draft.
            </p>
            <p>
              Ivy Admit exists to close that gap. We trained on patterns from successful
              applications — essays that earned admission to Harvard, Yale, Princeton, MIT, and
              fifty other selective schools — and built a scoring and feedback engine that gives
              every student access to the same quality of structural analysis that a good counselor
              provides.
            </p>
            <p>We do not write essays for you. We help you write a better one yourself.</p>
          </Section>

          <Section heading="How it works">
            <p>
              Upload your draft. Our model scores it across three dimensions — content, structure,
              and voice — on a 0–100 scale calibrated against accepted-application patterns. Each
              score comes with a breakdown of which specific sentences or paragraphs are dragging
              it down and why.
            </p>
            <p>
              <em className="italic text-oxblood">Content</em> measures specificity and evidence.{" "}
              <em className="italic text-oxblood">Structure</em> measures narrative arc — whether
              the essay moves forward or restates itself.{" "}
              <em className="italic text-oxblood">Voice</em> measures distinctiveness and
              consistency. Each can fail independently, so the scores tell you exactly where to
              focus your revision.
            </p>
            <p>
              Re-upload after each revision pass. Scores update in real time. Most students see
              meaningful improvement within two to three cycles.
            </p>
          </Section>

          <Section heading="Privacy and integrity">
            <p>
              Your essays are private to your account, stored securely, and never sold or shared.
              You can delete any document and its associated data at any time from settings.
            </p>
            <p>
              Ivy Admit is a coaching and editing tool. Every suggestion is a recommendation — you
              approve or reject every change. The essay you submit is yours. We are not a
              ghostwriting service, and the feedback we provide is designed to strengthen your
              writing, not replace it.
            </p>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-hair">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil mb-4">
            Ready to improve your essay?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/try" className="btn btn-lg btn-brand">
              Score my essay — free
            </Link>
            <Link href="/blog" className="btn btn-lg btn-ghost">
              Read the blog
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-[28px] md:text-[34px] leading-[1.15] tracking-[-0.015em] text-ink mb-4">
        {heading}
      </h2>
      <Rule />
      <div className="mt-5 text-[16px] md:text-[17px] leading-[1.7] text-ink-2 space-y-4">
        {children}
      </div>
    </section>
  );
}
