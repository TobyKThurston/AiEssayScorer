// app/page.tsx
import App from "@/Landing/App";
import { FAQ_ITEMS } from "@/Landing/components/faqData";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

export const metadata: Metadata = {
  title: "College Admissions Odds Calculator – Ivy Admit",
  description: "Find your real chance of admission at top colleges. Enter SAT, GPA, location, schools, and activities. See per-school admit % and tier (Reach / Match / Safety). Plus a free AI essay grader.",
  keywords: [
    "college admissions calculator",
    "college odds calculator",
    "ivy league odds",
    "chance me calculator",
    "college acceptance calculator",
    "college admission chances",
    "college essay grader",
    "ai essay review",
    "college application",
    "Ivy League essay",
  ],
  openGraph: {
    title: "College Admissions Odds Calculator – Ivy Admit",
    description: "Real admit chance at top colleges. Per-school % and tier. Plus a free AI essay grader.",
    url: "/",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ivy Admit, College Admissions Odds Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Odds Calculator – Ivy Admit",
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
