import { MetadataRoute } from "next";
import { posts } from "@/blog/posts";
import { tools } from "@/tools/tools";
import { schools } from "@/tools/schools";
import { extraColleges } from "@/colleges/extraColleges";
import { getScorecard } from "@/colleges/scorecard";

// Sitemap priority tiers — relative-importance signals to crawlers.
// Sharp tiering helps Google focus crawl budget on the strongest pages.
//
// 1.00 — Homepage
// 0.95 — Primary conversion pages, top-level hubs
// 0.90 — High-volume SEO landings, ranking hubs, schools with full editorial content
// 0.80 — Substantial content (blog posts, schools with full data, functional tools)
// 0.70 — State landing pages
// 0.50 — Utility pages (about, methodology, etc.)
//
// changeFrequency intentionally omitted: Google ignores the hint, and including it
// inflates the file without affecting crawl behavior.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

  // === Tier 1 + 2: Homepage and primary hubs ===
  const tier1: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/essay-grader`, lastModified: new Date(), priority: 0.95 },
    { url: `${baseUrl}/colleges`, lastModified: new Date(), priority: 0.95 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.95 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), priority: 0.95 },
  ];

  // === Tier 2: High-volume SEO hubs (real query targets, ranking pages) ===
  const tier2: MetadataRoute.Sitemap = [
    // Editorial SEO landings (hand-written, deep)
    { url: `${baseUrl}/ivy-league-essay-examples`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/common-app-essay-help`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/college-essay-checker`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/ai-essay-review`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/how-to-improve-college-essay`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/common-app-essay-prompts-2026-2027`, lastModified: new Date(), priority: 0.92 },
    { url: `${baseUrl}/colleges/early-decision-vs-early-action`, lastModified: new Date(), priority: 0.92 },
    // Ranking hubs (high search volume, focused queries)
    { url: `${baseUrl}/colleges/easiest-ivies`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/colleges/most-selective`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/colleges/best-financial-aid`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/colleges/highest-earnings`, lastModified: new Date(), priority: 0.9 },
  ];

  // === Tier utility ===
  const utility: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/methodology`, lastModified: new Date(), priority: 0.5 },
  ];

  // === Blog posts ===
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.8,
  }));

  // === College detail pages — tier by data richness ===
  // Schools with rich essay content (admit context, prompts, FAQ, mistakes) = 0.9
  // Schools with full Scorecard data (demographics, aid, outcomes) = 0.8
  // Schools with basic data only = 0.7
  const collegeRoutes: MetadataRoute.Sitemap = [
    ...schools.map((school) => {
      const sc = getScorecard(school.slug);
      const hasRichEditorial = !!school.rich;
      const hasFullData =
        sc?.completion4yr !== undefined && sc?.earnings10yr !== undefined && sc?.demoAsian !== undefined;
      const priority = hasRichEditorial ? 0.9 : hasFullData ? 0.8 : 0.7;
      return {
        url: `${baseUrl}/colleges/${school.slug}`,
        lastModified: new Date(),
        priority,
      };
    }),
    ...extraColleges.map((college) => {
      const sc = getScorecard(college.slug);
      const hasFullData =
        sc?.completion4yr !== undefined && sc?.earnings10yr !== undefined && sc?.demoAsian !== undefined;
      return {
        url: `${baseUrl}/colleges/${college.slug}`,
        lastModified: new Date(),
        priority: hasFullData ? 0.8 : 0.7,
      };
    }),
  ];

  // === State landing pages (data-rich) ===
  const stateRoutes: MetadataRoute.Sitemap = [
    "ca","ny","ma","pa","va","tx","ct","il","dc","nc","fl","oh","ga","wa","me",
    "md","in","mi","nj","ri","nh","mn","ia","tn","mo","co","wi",
  ].map((s) => ({
    url: `${baseUrl}/colleges/by-state/${s}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  // === Functional tool pages (generic, hand-built) ===
  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  // School-specific tool pages — only include rich-content schools.
  // Non-rich schools get name-swap templates that are near-duplicates;
  // those are noindexed at the page level and excluded from the sitemap.
  const richSchools = schools.filter((s) => !!s.rich);
  const schoolWhyRoutes: MetadataRoute.Sitemap = richSchools.map((school) => ({
    url: `${baseUrl}/tools/why-${school.slug}-essay`,
    lastModified: new Date(),
    priority: 0.8,
  }));
  const schoolScoreRoutes: MetadataRoute.Sitemap = richSchools.map((school) => ({
    url: `${baseUrl}/tools/score-${school.slug}-essay`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  // NOTE: Programmatic compare pages (/colleges/compare/X-vs-Y), prompt-derived
  // hooks/deconstructs, essay-type scorers, rewriters, and topic-persona pages
  // are intentionally excluded from the sitemap. They are templated near-duplicates
  // that suppress indexation pressure on the strong long-form pages above.
  // Page-level metadata sets `robots: { index: false, follow: true }` for those.

  const all: MetadataRoute.Sitemap = [
    ...tier1,
    ...tier2,
    ...utility,
    ...blogRoutes,
    ...collegeRoutes,
    ...stateRoutes,
    ...toolRoutes,
    ...schoolWhyRoutes,
    ...schoolScoreRoutes,
  ];

  // Deduplicate by URL — when an entry appears in multiple source lists
  // (e.g. a slug exists in both `schools` and `extraColleges`), keep the
  // first occurrence so hand-curated tier-1/2 priorities win.
  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
