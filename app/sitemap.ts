import { MetadataRoute } from "next";
import { posts } from "@/blog/posts";
import { tools } from "@/tools/tools";
import { schools } from "@/tools/schools";
import { prompts } from "@/tools/prompts";
import { essayTypes } from "@/tools/essayTypes";
import { rewriters } from "@/tools/rewriters";
import { topicPersonas } from "@/tools/topicPersonas";
import { extraColleges } from "@/colleges/extraColleges";
import { matchups } from "@/colleges/matchups";
import { getScorecard } from "@/colleges/scorecard";

// Sitemap priority tiers — relative-importance signals to crawlers.
// Sharp tiering helps Google focus crawl budget on the strongest pages.
//
// 1.00 — Homepage
// 0.95 — Primary conversion pages, top-level hubs
// 0.90 — High-volume SEO landings, ranking hubs, schools with full editorial content
// 0.80 — Substantial content (blog posts, schools with full data, functional tools)
// 0.70 — Programmatic-but-data-rich pages (comparisons, state landings)
// 0.50 — Utility pages (about, etc.)

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

  // === Tier 1 + 2: Homepage and primary hubs ===
  const tier1: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/try`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/colleges`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
  ];

  // === Tier 2: High-volume SEO hubs (real query targets, ranking pages) ===
  const tier2: MetadataRoute.Sitemap = [
    // Editorial SEO landings (hand-written, deep)
    { url: `${baseUrl}/ivy-league-essay-examples`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/common-app-essay-help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/college-essay-checker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/ai-essay-review`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/how-to-improve-college-essay`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/common-app-essay-prompts-2026-2027`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.92 },
    { url: `${baseUrl}/colleges/early-decision-vs-early-action`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.92 },
    // Ranking hubs (high search volume, focused queries)
    { url: `${baseUrl}/colleges/easiest-ivies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/colleges/most-selective`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/colleges/best-financial-aid`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/colleges/highest-earnings`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  // === Tier utility ===
  const utility: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // === Blog posts ===
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
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
      const hasFullData = sc?.completion4yr !== undefined && sc?.earnings10yr !== undefined && sc?.demoAsian !== undefined;
      const priority = hasRichEditorial ? 0.9 : hasFullData ? 0.8 : 0.7;
      return {
        url: `${baseUrl}/colleges/${school.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
      };
    }),
    ...extraColleges.map((college) => {
      const sc = getScorecard(college.slug);
      const hasFullData = sc?.completion4yr !== undefined && sc?.earnings10yr !== undefined && sc?.demoAsian !== undefined;
      return {
        url: `${baseUrl}/colleges/${college.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: hasFullData ? 0.8 : 0.7,
      };
    }),
  ];

  // === Programmatic but data-rich: comparisons and states ===
  const compareRoutes: MetadataRoute.Sitemap = matchups.map(([a, b]) => ({
    url: `${baseUrl}/colleges/compare/${a}-vs-${b}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const stateRoutes: MetadataRoute.Sitemap = [
    "ca","ny","ma","pa","va","tx","ct","il","dc","nc","fl","oh","ga","wa","me",
    "md","in","mi","nj","ri","nh","mn","ia","tn","mo","co","wi",
  ].map((s) => ({
    url: `${baseUrl}/colleges/by-state/${s}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // === Functional tool pages ===
  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // School-specific tools — rich-content schools get higher priority
  const schoolWhyRoutes: MetadataRoute.Sitemap = schools.map((school) => ({
    url: `${baseUrl}/tools/why-${school.slug}-essay`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: school.rich ? 0.8 : 0.65,
  }));

  const schoolScoreRoutes: MetadataRoute.Sitemap = schools.map((school) => ({
    url: `${baseUrl}/tools/score-${school.slug}-essay`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: school.rich ? 0.8 : 0.65,
  }));

  // Programmatic prompt-derived tool pages
  const hookPromptRoutes: MetadataRoute.Sitemap = prompts.map((p) => ({
    url: `${baseUrl}/tools/hook-${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const essayTypeScorerRoutes: MetadataRoute.Sitemap = essayTypes.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}-essay-scorer`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const rewriterRoutes: MetadataRoute.Sitemap = rewriters.map((r) => ({
    url: `${baseUrl}/tools/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const topicPersonaRoutes: MetadataRoute.Sitemap = topicPersonas.map((p) => ({
    url: `${baseUrl}/tools/topics-for-${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const deconstructRoutes: MetadataRoute.Sitemap = prompts
    .filter((p) => p.family === "Common App")
    .map((p) => ({
      url: `${baseUrl}/tools/deconstruct-${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  return [
    ...tier1,
    ...tier2,
    ...utility,
    ...blogRoutes,
    ...collegeRoutes,
    ...compareRoutes,
    ...stateRoutes,
    ...toolRoutes,
    ...schoolWhyRoutes,
    ...schoolScoreRoutes,
    ...hookPromptRoutes,
    ...essayTypeScorerRoutes,
    ...rewriterRoutes,
    ...topicPersonaRoutes,
    ...deconstructRoutes,
  ];
}
