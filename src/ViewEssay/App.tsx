"use client";

import { Navigation } from "./components/Navigation";
import { ApplicationsGallery } from "./components/ApplicationsGallery";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">
      <Navigation />
      <ApplicationsGallery />
      <Footer />
    </div>
  );
}