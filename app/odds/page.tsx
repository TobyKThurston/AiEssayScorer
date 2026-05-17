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

export default function OddsPage() {
  return (
    <>
      <Nav />
      <main>
        <OddsFlow />
      </main>
      <Footer />
    </>
  );
}
