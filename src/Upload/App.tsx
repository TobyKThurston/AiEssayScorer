"use client";

import { Navigation } from "./components/Navigation";
import { EssayReviewFlow } from "./components/EssayReviewFlow";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">
      <Navigation />
      <EssayReviewFlow />
      <Footer />
    </div>
  );
}