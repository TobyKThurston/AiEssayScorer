import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "@/blog/posts";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/design/Breadcrumbs";

export const metadata: Metadata = {
  // Index gets browse/return traffic, not search traffic. Title sets a
  // list expectation and signals the slant (written by people who got in)
  // to differentiate from rankings sites and generic counselor blogs.
  title: "College Essay Guides by Ivy League Admits (Blog)",
  description:
    "In-depth guides on Common App essays, supplemental essays, and Ivy League applications, written by students who actually got in. Specific, actionable, no generic tips.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "College Essay Guides by Ivy League Admits (Blog)",
    description:
      "Guides on Common App, supplementals, and Ivy League apps, written by students who actually got in.",
    url: "/blog",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "College essay guides written by Ivy League admits" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Essay Guides by Ivy League Admits (Blog)",
    description: "Common App, supplementals, Ivy League. By students who got in.",
    images: ["/og-image.png"],
  },
};

const categoryColors: Record<string, string> = {
  "Writing Guides": "bg-paper-2 text-oxblood",
  "Common App": "bg-paper-2 text-oxblood",
  "Supplemental Essays": "bg-paper-2 text-oxblood",
  "Ivy League": "bg-paper-2 text-forest",
  "Admissions Data": "bg-paper-2 text-forest",
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

export default function BlogIndex() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const [featured, ...rest] = sorted;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    url: `${baseUrl}/blog`,
    name: "Ivy Admit College Essay Blog",
    description:
      "Practical advice on essays, applications, and strategy for selective college admissions.",
    publisher: { "@id": `${baseUrl}/#organization` },
    blogPost: sorted.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      "@id": `${baseUrl}/blog/${post.slug}#blogposting`,
      headline: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: new Date(post.publishedAt).toISOString(),
      dateModified: new Date(post.publishedAt).toISOString(),
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
      author: {
        "@type": "Person",
        name: "Ivy Admit Editorial Team",
        url: `${baseUrl}/about`,
        worksFor: { "@id": `${baseUrl}/#organization` },
      },
      publisher: { "@id": `${baseUrl}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/blog/${post.slug}` },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    ],
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-16 pt-16 sm:pt-24 md:pt-24 pb-12 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      {/* Header */}
      <div className="mb-10 sm:mb-14 max-w-2xl">
        <p className="text-[11px] sm:text-xs font-semibold text-oxblood uppercase tracking-widest mb-2 sm:mb-3">
          Blog
        </p>
        <h1 className="mb-3 sm:mb-4 text-[28px] sm:text-[34px] md:text-[40px] leading-[1.15] sm:leading-[1.2]">
          College Admissions Guides
        </h1>
        <p className="text-ink-2 text-[15px] sm:text-base md:text-lg leading-relaxed">
          Practical advice on essays, applications, and strategy, written for students who want to understand what actually works.
        </p>
      </div>

      {/* Featured post */}
      <Link
        href={`/blog/${featured.slug}`}
        className="block mb-8 sm:mb-10 rounded-2xl bg-cream border border-hair shadow-[0_8px_32px_rgba(99,102,241,0.08)] p-5 sm:p-8 hover:bg-cream hover:shadow-[0_12px_40px_rgba(99,102,241,0.14)] transition-all duration-300 group"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
          <span
            className={`text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[featured.category] ?? "bg-paper-2 text-ink-2"}`}
          >
            {featured.category}
          </span>
          <span className="text-[11px] sm:text-xs text-pencil">Featured</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-ink mb-2 sm:mb-3 group-hover:text-oxblood transition-colors" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em", lineHeight: "1.25" }}>
          {featured.title}
        </h2>
        <p className="text-ink-2 text-[14px] sm:text-base leading-relaxed mb-4 sm:mb-5 max-w-2xl">{featured.description}</p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-pencil">
            <span>{formatDate(featured.publishedAt)}</span>
            <span>·</span>
            <span>{featured.readTime}</span>
          </div>
          <span className="flex items-center gap-1 text-[13px] sm:text-sm font-medium text-oxblood group-hover:gap-2 transition-all whitespace-nowrap">
            Read <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Rest of posts */}
      <h2 className="sr-only">More articles</h2>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl bg-cream backdrop-blur-md border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-6 hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:-translate-y-1 transition-all duration-300 group"
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

      <section className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-hair grid grid-cols-12 gap-4 md:gap-10">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow">
            <span className="num">§</span> The workshop
          </p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-serif text-[24px] sm:text-[30px] md:text-[42px] leading-[1.1] tracking-[-0.02em] text-ink mb-4 sm:mb-5">
            Words are <em className="italic text-oxblood">moved</em>, not written.
          </h2>
          <p className="text-ink-2 text-[15px] sm:text-[17px] leading-[1.6] max-w-[56ch] mb-6 sm:mb-8">
            Brainstorm, outline, polish, or score a draft. Every tool is free, no signup, tuned against the same patterns these guides are built from.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools" className="btn btn-lg btn-ink">
              Browse all free tools <ArrowRight className="w-4 h-4 ml-1 inline-block" />
            </Link>
            <Link href="/try" className="btn btn-lg btn-ghost">
              Score my essay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
