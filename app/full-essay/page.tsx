import FullEssayApp from "@/FullEssay/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // "Full" + "That Worked" + "Annotated" differentiate this from
  // /ivy-league-essay-examples (which shows excerpts). This page shows a
  // complete essay end-to-end.
  title: "Full College Essay That Worked: Real Ivy Acceptance, Annotated",
  description:
    "A complete, accepted college application essay from start to finish, annotated to show exactly why each paragraph works. Plus the patterns that recur across Ivy admits.",
  openGraph: {
    title: "Full College Essay That Worked: Real Ivy Acceptance, Annotated",
    description: "A complete accepted essay, annotated paragraph by paragraph. Plus the patterns that recur across Ivy admits.",
    url: "/full-essay",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Full annotated college essay from a real Ivy League acceptance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full College Essay That Worked (Annotated)",
    description: "A complete accepted Ivy League essay, annotated paragraph by paragraph.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/full-essay",
  },
};

export default function FullEssayPage() {
  return <FullEssayApp />;
}
