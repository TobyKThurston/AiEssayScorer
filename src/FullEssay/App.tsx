"use client";

import { Suspense } from "react";
import { Navigation } from "./components/Navigation";
import { FullApplicationView } from "./components/FullApplicationView";
import { Footer } from "./components/Footer";

function FullApplicationViewWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 flex items-center justify-center">
        <div className="text-[#64748B]">Loading...</div>
      </div>
    }>
      <FullApplicationView />
    </Suspense>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">
      <Navigation />
      <FullApplicationViewWrapper />
      <Footer />
    </div>
  );
}