import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";
import { OddsFlow } from "@/Odds/OddsFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Differentiated from homepage with "Chance Me" framing — that's the
  // exact long-tail phrase students type ("chance me ivy league",
  // "chance me calculator"). Title leads with the imperative phrase.
  title: "Chance Me Calculator: Free College Admit Odds (Reach/Match/Safety)",
  description:
    "Real chance-me calculator. Enter your SAT, GPA, location and activities, get a per-school admit % and Reach/Match/Safety tier for every top US college. Free, 60 seconds.",
  alternates: { canonical: "/odds" },
  openGraph: {
    title: "Chance Me Calculator: Free College Admit Odds (Reach/Match/Safety)",
    description:
      "Per-school admit % and tier based on your SAT, GPA, activities and profile. Free, 60 seconds.",
    url: "/odds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chance Me Calculator: Free College Admit Odds",
    description: "Per-school admit % with Reach/Match/Safety. Free.",
    images: ["/og-image.png"],
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getivyadmit.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Chance Me Calculator", item: `${baseUrl}/odds` },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${baseUrl}/odds#software`,
  name: "Ivy Admit Chance Me Calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: `${baseUrl}/odds`,
  description:
    "Free chance-me calculator that estimates your admission probability at every top US college from your SAT/ACT, GPA, activities and profile, and sorts your list into Reach, Match, and Safety.",
  publisher: { "@id": `${baseUrl}/#organization` },
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function OddsPage() {
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <main>
        {/* Server-rendered intro so the page has a crawlable H1 + copy
            above the client calculator widget */}
        <header className="max-w-2xl mx-auto px-5 sm:px-6 pt-14 sm:pt-20 text-center">
          <p className="text-[11px] sm:text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
            Free chance-me calculator
          </p>
          <h1
            className="text-ink mb-4 mx-auto text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1]"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Chance me at every top US college
          </h1>
          <p className="text-ink-2 text-[15px] sm:text-base md:text-lg leading-relaxed">
            Enter your SAT or ACT, GPA, location, activities and target schools, and get a per-school
            admit probability calibrated to real admit data — sorted into Reach, Match, and Safety.
            Free, about 60 seconds, no signup to start.
          </p>
        </header>
        <OddsFlow />
      </main>
      <Footer />
    </>
  );
}
