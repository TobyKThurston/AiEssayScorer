import FullEssayApp from "@/FullEssay/App";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Essay Example",
  description: "Read a successful college application essay example. Learn from real essays that got students into top universities.",
  openGraph: {
    title: "College Essay Example | Ivy Admit",
    description: "Read a successful college application essay example. Learn from real essays that got students into top universities.",
    url: "/full-essay",
    type: "article",
  },
  alternates: {
    canonical: "/full-essay",
  },
};

export default function FullEssayPage() {
  return <FullEssayApp />;
}
