import FullEssayApp from "@/FullEssay/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Essay Example — Real Ivy League Acceptance",
  description: "Read a successful college application essay example. Learn from real essays that got students into Harvard, Yale, Princeton, and other top universities.",
  openGraph: {
    title: "College Essay Example — Real Ivy League Acceptance",
    description: "Read a successful college application essay example. Learn from real essays that got students into Harvard, Yale, Princeton, and other top universities.",
    url: "/full-essay",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Successful Ivy League college essay example" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Essay Example — Real Ivy League Acceptance",
    description: "Read a successful college application essay example that got students into top universities.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/full-essay",
  },
};

export default function FullEssayPage() {
  return <FullEssayApp />;
}
