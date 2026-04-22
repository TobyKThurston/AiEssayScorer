// app/page.tsx
import App from "@/Landing/App";
import { FAQ_ITEMS } from "@/Landing/components/faqData";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

export const metadata: Metadata = {
  title: "Free AI College Essay Review in 60 Seconds – Ivy Admit",
  description: "★ 4.8/5 from 20,000+ students. Get instant scores, line-by-line edits, and admissions feedback on your college essay. Trained on real Ivy League acceptances. Free to start.",
  keywords: [
    "college essay review",
    "ai essay review",
    "college application essay",
    "Ivy League essay",
    "essay editing",
    "college admissions",
    "essay feedback",
    "college essay help",
    "admissions essay",
    "essay scoring",
  ],
  openGraph: {
    title: "Free AI College Essay Review, Scores & Line Edits",
    description: "AI feedback on your college essay in under 60 seconds. Content, structure, and voice scores with line-by-line edits trained on Ivy League applications.",
    url: "/",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ivy Admit, AI College Essay Review" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI College Essay Review, Scores & Line Edits",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "Ivy Admit",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${baseUrl}/icon-512.png`,
  description: "AI-powered college essay review and strategy tool for selective college admissions",
  sameAs: [
    "https://twitter.com/ivyadmit",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "support@getivyadmit.com",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ivy Admit",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
  },
  description: "AI-powered college essay review tool that provides structure scores, evidence analysis, and line-by-line editing suggestions",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: baseUrl,
  name: "Ivy Admit",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <App />
    </>
  );
}
