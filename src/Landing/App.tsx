"use client";

import React from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { ValueProps } from "./components/ValueProps";
import { HowItWorks } from "./components/HowItWorks";
import { ProofStrip } from "./components/ProofStrip";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

export default function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#EFF6FF] to-[#F0FDFF] text-[#0F172A] overflow-x-hidden relative">
      {/* Orb 1 — top left purple */}
      <div className="fixed top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[#C4B5FD]/30 blur-[120px] pointer-events-none z-0" />
      {/* Orb 2 — bottom right cyan */}
      <div className="fixed bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#BAE6FD]/25 blur-[100px] pointer-events-none z-0" />
      <Navigation />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <ProofStrip />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
