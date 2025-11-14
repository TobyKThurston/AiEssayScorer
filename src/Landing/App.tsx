"use client";

import React from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { ValueProps } from "./components/ValueProps";
import { HowItWorks } from "./components/HowItWorks";
import { ProofStrip } from "./components/ProofStrip";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
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
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">
      <Navigation />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <ProofStrip />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
