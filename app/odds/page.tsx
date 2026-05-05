import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";
import { OddsFlow } from "@/Odds/OddsFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Admissions Odds Calculator – Ivy Admit",
  description:
    "Get your real chance of admission at top colleges. Enter your SAT, GPA, location, schools, and activities - see a per-school admit % and tier (Reach / Match / Safety).",
  alternates: { canonical: "/odds" },
  openGraph: {
    title: "College Admissions Odds Calculator – Ivy Admit",
    description:
      "Real admit chance at top colleges. Per-school % and tier based on your SAT, GPA, activities, and profile.",
    url: "/odds",
    type: "website",
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
