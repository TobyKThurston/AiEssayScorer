import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPost, formatDate } from "@/blog/posts";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/design/Breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

const contentMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "how-to-write-common-app-essay": () =>
    import("@/blog/content/how-to-write-common-app-essay"),
  "common-app-essay-prompts-2025": () =>
    import("@/blog/content/common-app-essay-prompts-2025"),
  "why-this-college-essay": () =>
    import("@/blog/content/why-this-college-essay"),
  "ivy-league-essay-tips": () =>
    import("@/blog/content/ivy-league-essay-tips"),
  "college-essay-word-limit": () =>
    import("@/blog/content/college-essay-word-limit"),
  "columbia-why-columbia-essay-core-curriculum": () =>
    import("@/blog/content/columbia-why-columbia-essay-core-curriculum"),
  "columbia-list-essay-what-are-you-reading": () =>
    import("@/blog/content/columbia-list-essay-what-are-you-reading"),
  "harvard-intellectual-experience-essay": () =>
    import("@/blog/content/harvard-intellectual-experience-essay"),
  "harvard-roommate-essay-top-3-things": () =>
    import("@/blog/content/harvard-roommate-essay-top-3-things"),
  "harvard-how-use-education-future-essay": () =>
    import("@/blog/content/harvard-how-use-education-future-essay"),
  "yale-why-yale-essay-125-words": () =>
    import("@/blog/content/yale-why-yale-essay-125-words"),
  "yale-teach-a-course-essay": () =>
    import("@/blog/content/yale-teach-a-course-essay"),
  "yale-community-essay": () =>
    import("@/blog/content/yale-community-essay"),
  "dartmouth-why-dartmouth-100-words": () =>
    import("@/blog/content/dartmouth-why-dartmouth-100-words"),
  "dartmouth-let-your-life-speak-essay": () =>
    import("@/blog/content/dartmouth-let-your-life-speak-essay"),
  "dartmouth-dr-seuss-think-and-wonder-essay": () =>
    import("@/blog/content/dartmouth-dr-seuss-think-and-wonder-essay"),
  "princeton-why-princeton-essay": () =>
    import("@/blog/content/princeton-why-princeton-essay"),
  "princeton-what-brings-you-joy-essay": () =>
    import("@/blog/content/princeton-what-brings-you-joy-essay"),
  "upenn-why-penn-essay": () =>
    import("@/blog/content/upenn-why-penn-essay"),
  "upenn-wharton-essay-what-you-hope-to-gain": () =>
    import("@/blog/content/upenn-wharton-essay-what-you-hope-to-gain"),
  "upenn-community-essay": () =>
    import("@/blog/content/upenn-community-essay"),
  "brown-why-brown-open-curriculum-essay": () =>
    import("@/blog/content/brown-why-brown-open-curriculum-essay"),
  "cornell-why-cornell-essay": () =>
    import("@/blog/content/cornell-why-cornell-essay"),
  "stanford-what-matters-to-you-essay": () =>
    import("@/blog/content/stanford-what-matters-to-you-essay"),
  "mit-something-you-do-for-pleasure-essay": () =>
    import("@/blog/content/mit-something-you-do-for-pleasure-essay"),
  "duke-why-duke-essay": () =>
    import("@/blog/content/duke-why-duke-essay"),
  "northwestern-why-northwestern-essay": () =>
    import("@/blog/content/northwestern-why-northwestern-essay"),
  "stanford-intellectual-vitality-essay": () =>
    import("@/blog/content/stanford-intellectual-vitality-essay"),
  "stanford-roommate-letter-essay": () =>
    import("@/blog/content/stanford-roommate-letter-essay"),
  "uchicago-why-uchicago-essay": () =>
    import("@/blog/content/uchicago-why-uchicago-essay"),
  "uchicago-uncommon-essay-prompts": () =>
    import("@/blog/content/uchicago-uncommon-essay-prompts"),
  "johns-hopkins-collaboration-essay": () =>
    import("@/blog/content/johns-hopkins-collaboration-essay"),
  "georgetown-essay-prompts-guide": () =>
    import("@/blog/content/georgetown-essay-prompts-guide"),
  "rice-why-rice-residential-college-essay": () =>
    import("@/blog/content/rice-why-rice-residential-college-essay"),
  "how-to-start-a-college-essay": () =>
    import("@/blog/content/how-to-start-a-college-essay"),
  "college-essay-hooks-opening-lines": () =>
    import("@/blog/content/college-essay-hooks-opening-lines"),
  "college-essay-topics-to-avoid": () =>
    import("@/blog/content/college-essay-topics-to-avoid"),
  "common-app-additional-information-guide": () =>
    import("@/blog/content/common-app-additional-information-guide"),
  "mit-contribute-to-community-essay": () =>
    import("@/blog/content/mit-contribute-to-community-essay"),
  "mit-challenge-you-faced-essay": () =>
    import("@/blog/content/mit-challenge-you-faced-essay"),
  "caltech-stem-short-answers-essay": () =>
    import("@/blog/content/caltech-stem-short-answers-essay"),
  "vanderbilt-why-vanderbilt-essay": () =>
    import("@/blog/content/vanderbilt-why-vanderbilt-essay"),
  "tufts-why-tufts-essay": () =>
    import("@/blog/content/tufts-why-tufts-essay"),
  "usc-describe-yourself-three-words-essay": () =>
    import("@/blog/content/usc-describe-yourself-three-words-essay"),
  "princeton-song-soundtrack-essay": () =>
    import("@/blog/content/princeton-song-soundtrack-essay"),
  "princeton-new-skill-essay": () =>
    import("@/blog/content/princeton-new-skill-essay"),
  "stanford-short-takes-guide": () =>
    import("@/blog/content/stanford-short-takes-guide"),
  "harvard-extracurricular-activity-essay": () =>
    import("@/blog/content/harvard-extracurricular-activity-essay"),
  "uc-personal-insight-questions-guide": () =>
    import("@/blog/content/uc-personal-insight-questions-guide"),
  "brown-plme-essay-guide": () =>
    import("@/blog/content/brown-plme-essay-guide"),
  "duke-trinity-pratt-essay-difference": () =>
    import("@/blog/content/duke-trinity-pratt-essay-difference"),
  "cornell-engineering-essay-guide": () =>
    import("@/blog/content/cornell-engineering-essay-guide"),
  "nyu-why-nyu-essay": () =>
    import("@/blog/content/nyu-why-nyu-essay"),
  "cmu-why-cmu-essay": () =>
    import("@/blog/content/cmu-why-cmu-essay"),
  "emory-why-emory-essay": () =>
    import("@/blog/content/emory-why-emory-essay"),
  "washu-why-washu-essay": () =>
    import("@/blog/content/washu-why-washu-essay"),
  "swarthmore-why-swarthmore-essay": () =>
    import("@/blog/content/swarthmore-why-swarthmore-essay"),
  "pomona-why-pomona-essay": () =>
    import("@/blog/content/pomona-why-pomona-essay"),
  "williams-why-williams-essay": () =>
    import("@/blog/content/williams-why-williams-essay"),
  "boston-college-why-bc-essay": () =>
    import("@/blog/content/boston-college-why-bc-essay"),
  "columbia-intended-major-essay": () =>
    import("@/blog/content/columbia-intended-major-essay"),
  "umich-community-essay": () =>
    import("@/blog/content/umich-community-essay"),
  "uva-application-couldnt-capture-essay": () =>
    import("@/blog/content/uva-application-couldnt-capture-essay"),
  "barnard-why-womens-college-essay": () =>
    import("@/blog/content/barnard-why-womens-college-essay"),
};

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${baseUrl}/blog/${slug}`,
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

const categoryColors: Record<string, string> = {
  "Writing Guides": "bg-paper-2 text-oxblood",
  "Common App": "bg-paper-2 text-oxblood",
  "Supplemental Essays": "bg-paper-2 text-oxblood",
  "Ivy League": "bg-paper-2 text-forest",
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const loader = contentMap[slug];
  if (!loader) notFound();
  const { default: Content } = await loader();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "Ivy Admit" },
    publisher: {
      "@type": "Organization",
      name: "Ivy Admit",
      url: baseUrl,
    },
    url: `${baseUrl}/blog/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${baseUrl}/blog/${slug}` },
    ],
  };

  // Adjacent posts for navigation
  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;

  // Related posts by category (excluding current), fallback to most recent
  const sameCategory = posts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);
  const related =
    sameCategory.length >= 3
      ? sameCategory
      : [
          ...sameCategory,
          ...posts
            .filter((p) => p.slug !== slug && !sameCategory.some((s) => s.slug === p.slug))
            .slice(0, 3 - sameCategory.length),
        ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-[720px] mx-auto px-6 pt-28 md:pt-36 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-oxblood hover:text-oxblood-2 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        {/* Post header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? "bg-paper-2 text-ink-2"}`}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-pencil">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 5vw, 42px)",
              lineHeight: "1.2",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0F172A",
              marginBottom: "1rem",
            }}
          >
            {post.title}
          </h1>

          <p className="text-pencil text-sm">
            {formatDate(post.publishedAt)} · Ivy Admit
          </p>
        </div>

        {/* Article content */}
        <article className="prose mb-16">
          <Content />
        </article>

        {/* CTA box */}
        <div className="rounded-2xl bg-cream border border-hair shadow-[0_8px_32px_rgba(99,102,241,0.10)] p-8 mb-14 text-center">
          <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
            Ready to improve your essay?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#0F172A",
              marginBottom: "0.75rem",
            }}
          >
            Get a score and line-by-line edits in under a minute
          </h2>
          <p className="text-pencil text-sm mb-6 max-w-md mx-auto">
            Upload your draft and get scored across content, structure, and voice, plus specific suggestions to raise every dimension.
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-sm font-medium hover:bg-oxblood transition-all"
          >
            Review your essay free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related tools */}
        <section className="mb-14 pt-10 border-t border-hair">
          <p className="eyebrow mb-4">
            <span className="num">§</span> Free tools to keep going
          </p>
          <h2 className="font-serif text-[26px] md:text-[30px] leading-[1.15] tracking-[-0.015em] text-ink mb-6">
            Brainstorm, outline, or <em className="italic text-oxblood">polish</em> a draft.
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 font-serif text-[17px]">
            {[
              { href: "/tools/essay-outline-generator", label: "Essay Outline Generator" },
              { href: "/tools/essay-polish-pass", label: "Essay Polish Pass" },
              { href: "/tools/essay-word-repetition-finder", label: "Word Repetition Finder" },
              { href: "/tools/essay-first-sentence-generator", label: "First-Sentence Generator" },
              { href: "/tools", label: "All free tools" },
            ].map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="text-ink-2 hover:text-oxblood transition-colors underline underline-offset-[6px] decoration-[color:var(--color-hair)] hover:decoration-oxblood"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mb-14 pt-10 border-t border-hair">
            <p className="eyebrow mb-4">
              <span className="num">◦</span> Related reading
            </p>
            <ul className="divide-y divide-[color:var(--color-hair)]">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-5 -mx-3 px-3 hover:bg-cream/60 transition-colors"
                  >
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-oxblood/80 shrink-0 min-w-[84px]">
                      {r.category}
                    </span>
                    <p className="font-serif text-[18px] md:text-[20px] leading-[1.25] text-ink group-hover:text-oxblood transition-colors">
                      {r.title}
                    </p>
                    <span className="font-mono text-[11px] text-pencil group-hover:text-oxblood group-hover:translate-x-0.5 inline-block transition-all shrink-0">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Post navigation */}
        {(prev || next) && (
          <div className="flex items-start justify-between gap-6 pt-8 border-t border-hair">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex-1 group"
              >
                <p className="text-xs text-pencil mb-1 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </p>
                <p className="text-sm font-semibold text-ink group-hover:text-oxblood transition-colors leading-snug">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="flex-1 text-right group"
              >
                <p className="text-xs text-pencil mb-1 flex items-center justify-end gap-1">
                  Next <ArrowRight className="w-3 h-3" />
                </p>
                <p className="text-sm font-semibold text-ink group-hover:text-oxblood transition-colors leading-snug">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
