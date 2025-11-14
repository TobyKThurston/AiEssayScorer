"use client";

import { Navigation } from "./components/Navigation";
import { FullApplicationView } from "./components/FullApplicationView";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">
      <Navigation />
      <FullApplicationView />
      <Footer />
    </div>
  );
}