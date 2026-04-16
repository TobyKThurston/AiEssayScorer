// app/page.tsx
import App from "@/Landing/App";
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
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Ivy Admit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ivy Admit is an essay review and strategy tool for selective college admissions. You upload a draft or prompt, receive scores for structure, evidence, and tone, and get specific edit suggestions. It is built by students admitted to Ivy League schools and does not write essays for you.",
      },
    },
    {
      "@type": "Question",
      name: "How does it improve my application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It analyzes drafts against patterns in successful applications and returns a structure score, line-by-line suggestions, and an evidence checklist. Regional tailoring helps match style preferences of your assigned reading team.",
      },
    },
    {
      "@type": "Question",
      name: "Is it allowed and ethical?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Ivy Admit is an editing and coaching tool. You remain the author and approve every change. The tool avoids ghostwriting and focuses on clarity, structure, and evidence so your submission remains original.",
      },
    },
    {
      "@type": "Question",
      name: "Do you store or sell my data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your drafts are private to your account, stored securely, and never sold. You can delete documents and associated metadata at any time from settings.",
      },
    },
    {
      "@type": "Question",
      name: "How fast are reviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most first-pass analyses return in under a minute. Deep rewrite suggestions generate within a few minutes for standard-length drafts.",
      },
    },
    {
      "@type": "Question",
      name: "Pricing and cancellation",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter is free with limited reviews. Pro is a monthly plan with unlimited reviews, regional tailoring, and risk guardrails. You can cancel anytime from billing. First-time Pro purchases are refundable within 7 days if no more than one full review was used.",
      },
    },
    {
      "@type": "Question",
      name: "Counselor/teacher use",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Team seats support shared folders, role-based access, and comment threads so counselors can manage multiple students.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work beyond Ivy schools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The structure and evidence checks work for selective schools and scholarship essays. You can set a target school list to adjust tone and topic risk.",
      },
    },
  ],
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
