// app/page.tsx
import App from "@/Landing/App";
import { FAQ_ITEMS } from "@/Landing/components/faqData";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

export const metadata: Metadata = {
  // Homepage SERP title — brand-first so we win "ivyadmit" / "ivy admit" branded
  // searches (GSC: 20+ branded impressions, position 18, 0 clicks → brand is not
  // the #1 result for its own name). Concrete benefit + free + speed for the
  // borderline "college admissions calculator" cluster.
  title: "Ivy Admit: Free Admit Odds Calculator + AI Essay Grader",
  description: "See your real chance of admission at every top US college in 60 seconds. Free, no signup. Per-school admit % with Reach/Match/Safety, plus an AI essay grader trained on real Ivy League acceptances.",
  keywords: [
    "ivy admit",
    "college admissions calculator",
    "college odds calculator",
    "chance me calculator",
    "ivy league odds calculator",
    "college acceptance calculator",
    "college admission chances",
    "college essay grader",
    "ai essay review",
    "free college essay review",
  ],
  openGraph: {
    title: "Ivy Admit: Free Admit Odds Calculator + AI Essay Grader",
    description: "Your real admit chance at every top US college in 60 seconds. Free, no signup. Per-school % and tier.",
    url: "/",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ivy Admit — free college admit odds calculator and AI essay grader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivy Admit: Free Admit Odds Calculator + AI Essay Grader",
    description: "Your real admit chance at every top US college in 60 seconds. Free, no signup.",
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

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${baseUrl}/#software`,
  name: "Ivy Admit",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: baseUrl,
  description: "AI-powered college essay review tool that provides structure scores, evidence analysis, and line-by-line editing suggestions, plus an admissions odds calculator.",
  publisher: { "@id": `${baseUrl}/#organization` },
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "One essay review per day, no signup required.",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "7.00",
      priceCurrency: "USD",
      description: "Unlimited reviews, line-by-line edits, school-specific feedback. Billed monthly.",
    },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <App />
    </>
  );
}
