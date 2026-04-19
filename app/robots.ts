import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/_next/",
          "/admin/",
          "/editor",
          "/editor/",
          "/upload",
          "/view-essay",
          "/account",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/editor",
          "/editor/",
          "/upload",
          "/view-essay",
          "/account",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

