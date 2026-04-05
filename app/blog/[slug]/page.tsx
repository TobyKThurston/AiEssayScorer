import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPost, formatDate } from "@/blog/posts";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

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
};

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ivyadmit.com";
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
    },
  };
}

const categoryColors: Record<string, string> = {
  "Writing Guides": "bg-[#EDE9FE] text-[#6D28D9]",
  "Common App": "bg-[#DBEAFE] text-[#1D4ED8]",
  "Supplemental Essays": "bg-[#FCE7F3] text-[#BE185D]",
  "Ivy League": "bg-[#D1FAE5] text-[#065F46]",
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const loader = contentMap[slug];
  if (!loader) notFound();
  const { default: Content } = await loader();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ivyadmit.com";
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

  // Adjacent posts for navigation
  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-[720px] mx-auto px-6 pt-28 md:pt-36 pb-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:text-[#4F46E5] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        {/* Post header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? "bg-slate-100 text-slate-600"}`}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
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

          <p className="text-[#64748B] text-sm">
            {formatDate(post.publishedAt)} · Ivy Admit
          </p>
        </div>

        {/* Article content */}
        <article className="prose mb-16">
          <Content />
        </article>

        {/* CTA box */}
        <div className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_8px_32px_rgba(99,102,241,0.10)] p-8 mb-14 text-center">
          <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-3">
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
          <p className="text-[#64748B] text-sm mb-6 max-w-md mx-auto">
            Upload your draft and get scored across content, structure, and voice — plus specific suggestions to raise every dimension.
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0F] text-white text-sm font-medium hover:bg-[#1e1e3f] transition-all"
          >
            Review your essay free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Post navigation */}
        {(prev || next) && (
          <div className="flex items-start justify-between gap-6 pt-8 border-t border-white/40">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex-1 group"
              >
                <p className="text-xs text-[#94A3B8] mb-1 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </p>
                <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#6366F1] transition-colors leading-snug">
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
                <p className="text-xs text-[#94A3B8] mb-1 flex items-center justify-end gap-1">
                  Next <ArrowRight className="w-3 h-3" />
                </p>
                <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#6366F1] transition-colors leading-snug">
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
