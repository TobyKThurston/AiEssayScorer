import { MetadataRoute } from "next";
import { posts } from "@/blog/posts";
import { tools } from "@/tools/tools";
import { schools } from "@/tools/schools";
import { prompts } from "@/tools/prompts";
import { essayTypes } from "@/tools/essayTypes";
import { rewriters } from "@/tools/rewriters";
import { topicPersonas } from "@/tools/topicPersonas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/try`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/ai-essay-review`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/college-essay-checker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/common-app-essay-help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/ivy-league-essay-examples`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/how-to-improve-college-essay`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const richSchools = schools.filter((s) => !!s.rich);

  const schoolWhyRoutes: MetadataRoute.Sitemap = richSchools.map((school) => ({
    url: `${baseUrl}/tools/why-${school.slug}-essay`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const schoolScoreRoutes: MetadataRoute.Sitemap = richSchools.map((school) => ({
    url: `${baseUrl}/tools/score-${school.slug}-essay`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const hookPromptRoutes: MetadataRoute.Sitemap = prompts.map((p) => ({
    url: `${baseUrl}/tools/hook-${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const essayTypeScorerRoutes: MetadataRoute.Sitemap = essayTypes.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}-essay-scorer`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const rewriterRoutes: MetadataRoute.Sitemap = rewriters.map((r) => ({
    url: `${baseUrl}/tools/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const topicPersonaRoutes: MetadataRoute.Sitemap = topicPersonas.map((p) => ({
    url: `${baseUrl}/tools/topics-for-${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const deconstructRoutes: MetadataRoute.Sitemap = prompts
    .filter((p) => p.family === "Common App")
    .map((p) => ({
      url: `${baseUrl}/tools/deconstruct-${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  return [
    ...staticRoutes,
    ...blogRoutes,
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
