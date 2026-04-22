import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "@/blog/posts";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "College Essay Blog, Guides, Tips & Strategy",
  description:
    "In-depth guides on writing Common App essays, supplemental essays, and Ivy League applications. Written for students who want actionable advice, not generic tips.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "College Essay Blog, Guides, Tips & Strategy",
    description:
      "In-depth guides on writing Common App essays, supplemental essays, and Ivy League applications. Written for students who want actionable advice, not generic tips.",
    url: "/blog",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ivy Admit College Essay Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Essay Blog, Guides, Tips & Strategy",
    images: ["/og-image.png"],
  },
};

const categoryColors: Record<string, string> = {
  "Writing Guides": "bg-paper-2 text-oxblood",
  "Common App": "bg-paper-2 text-oxblood",
  "Supplemental Essays": "bg-paper-2 text-oxblood",
  "Ivy League": "bg-paper-2 text-forest",
};

export default function BlogIndex() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const [featured, ...rest] = sorted;

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-16 pt-28 md:pt-36 pb-20">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
          Blog
        </p>
        <h1 className="mb-4" style={{ fontSize: "40px", lineHeight: "48px" }}>
          College Admissions Guides
        </h1>
        <p className="text-ink-2 text-lg leading-relaxed">
          Practical advice on essays, applications, and strategy, written for students who want to understand what actually works.
        </p>
      </div>

      {/* Featured post */}
      <Link
        href={`/blog/${featured.slug}`}
        className="block mb-10 rounded-2xl bg-cream border border-hair shadow-[0_8px_32px_rgba(99,102,241,0.08)] p-8 hover:bg-cream hover:shadow-[0_12px_40px_rgba(99,102,241,0.14)] transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[featured.category] ?? "bg-paper-2 text-ink-2"}`}
          >
            {featured.category}
          </span>
          <span className="text-xs text-pencil">Featured</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-ink mb-3 group-hover:text-oxblood transition-colors" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em", lineHeight: "1.25" }}>
          {featured.title}
        </h2>
        <p className="text-ink-2 leading-relaxed mb-5 max-w-2xl">{featured.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-pencil">
            <span>{formatDate(featured.publishedAt)}</span>
            <span>·</span>
            <span>{featured.readTime}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-oxblood group-hover:gap-2 transition-all">
            Read article <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Rest of posts */}
      <div className="grid md:grid-cols-2 gap-5">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl bg-cream backdrop-blur-md border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6 hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <span
              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${categoryColors[post.category] ?? "bg-paper-2 text-ink-2"}`}
            >
              {post.category}
            </span>
            <h3
              className="text-lg font-extrabold text-ink mb-2 group-hover:text-oxblood transition-colors leading-snug"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
            >
              {post.title}
            </h3>
            <p className="text-pencil text-sm leading-relaxed mb-4 line-clamp-2">
              {post.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-pencil">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-oxblood opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
