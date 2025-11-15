import App from "@/ViewEssay/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Successful College Application Essays",
  description: "Explore real college application essays from students admitted to Harvard, Yale, Princeton, Columbia, and other top universities. Learn from successful essays, stats, and strategies.",
  keywords: [
    "college essay examples",
    "successful college essays",
    "Harvard essay examples",
    "Yale essay examples",
    "Ivy League essay examples",
    "college application examples",
    "admission essay samples",
    "winning college essays"
  ],
  openGraph: {
    title: "View Successful College Application Essays | Ivy Admit",
    description: "Explore real college application essays from students admitted to Harvard, Yale, Princeton, and other top universities.",
    url: "/view-essay",
    type: "website",
  },
  alternates: {
    canonical: "/view-essay",
  },
};

export default function ViewEssayPage() {
  return <App />;
}
