import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Ivy Admit — AI College Essay Review",
  description:
    "Ivy Admit is an AI-powered college essay review tool built by students admitted to Harvard, Yale, and Princeton. Learn how it works and why we built it.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Ivy Admit — AI College Essay Review",
    description:
      "Ivy Admit is an AI-powered college essay review tool built by students admitted to Harvard, Yale, and Princeton. Learn how it works and why we built it.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-6 pt-28 md:pt-36 pb-20">
      <h1
        className="mb-4"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(32px, 5vw, 48px)",
          lineHeight: "1.15",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#0F172A",
        }}
      >
        About Ivy Admit
      </h1>
      <p className="text-[#475569] text-lg leading-relaxed mb-14">
        An AI-powered essay review tool built by students who went through the same process — and
        wanted a faster, more honest way to get feedback.
      </p>

      <div className="space-y-12">
        {/* Mission */}
        <section>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#0F172A",
            }}
          >
            Why we built it
          </h2>
          <div className="prose prose-slate max-w-none">
            <p>
              College essay feedback is scarce and unevenly distributed. Students with access to
              college counselors, private advisors, and alumni networks get dozens of revision
              cycles. Students without that access submit their first or second draft.
            </p>
            <p>
              Ivy Admit exists to close that gap. We trained on patterns from successful
              applications — essays that earned admission to Harvard, Yale, Princeton, MIT, and 50+
              other selective schools — and built a scoring and feedback engine that gives every
              student access to the same quality of structural analysis that a good counselor
              provides.
            </p>
            <p>
              We do not write essays for you. We help you write a better one yourself.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#0F172A",
            }}
          >
            How it works
          </h2>
          <div className="prose prose-slate max-w-none">
            <p>
              Upload your draft. Our model scores it across three dimensions — Content, Structure,
              and Voice — on a 0–100 scale calibrated against accepted application patterns. Each
              score comes with a breakdown of which specific sentences or paragraphs are dragging
              it down and why.
            </p>
            <p>
              Content measures specificity and evidence. Structure measures narrative arc — whether
              the essay moves forward or restates itself. Voice measures distinctiveness and
              consistency. Each can fail independently, so the scores tell you exactly where to
              focus your revision.
            </p>
            <p>
              Re-upload after each revision pass. Scores update in real time. Most students see
              meaningful improvement within two to three cycles.
            </p>
          </div>
        </section>

        {/* Trust */}
        <section>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#0F172A",
            }}
          >
            Privacy and integrity
          </h2>
          <div className="prose prose-slate max-w-none">
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
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-16 pt-10 border-t border-white/40">
        <p className="text-sm text-[#64748B] mb-4">Ready to improve your essay?</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0F] text-white text-sm font-medium hover:bg-[#1e1e3f] transition-all"
          >
            Review your essay free
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 rounded-full border border-slate-200 text-sm text-[#475569] hover:text-[#0F172A] hover:border-slate-400 transition-all bg-white/60"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </div>
  );
}
