// app/page.tsx
import App from "@/Landing/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered College Essay Review & Strategy Tool",
  description: "Get expert essay feedback from AI trained on successful Ivy League applications. Score your structure, evidence, and tone. Get line-by-line edits and strategic advice to improve your college admissions essays.",
  keywords: [
    "college essay review",
    "college application essay",
    "Ivy League essay",
    "essay editing",
    "college admissions",
    "essay feedback",
    "college essay help",
    "admissions essay",
    "essay scoring",
    "college essay advisor"
  ],
  openGraph: {
    title: "Ivy Admit - AI-Powered College Essay Review & Strategy Tool",
    description: "Get expert essay feedback from AI trained on successful Ivy League applications. Score your structure, evidence, and tone.",
    url: "/",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <App />;
}
