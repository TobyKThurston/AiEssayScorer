"use client";

import { Suspense } from "react";
import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";
import { FullApplicationView } from "./components/FullApplicationView";

function FullApplicationViewWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="text-pencil">Loading…</div>
      </div>
    }>
      <FullApplicationView />
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      {/* Static header rendered outside the Suspense boundary so it lands in
          the initial HTML (the annotated essay below loads client-side from
          search params and would otherwise leave crawlers with no content). */}
      <header className="max-w-3xl mx-auto px-5 sm:px-6 pt-20 sm:pt-24 pb-2 text-center">
        <p className="text-[11px] sm:text-xs font-semibold text-oxblood uppercase tracking-widest mb-3">
          Annotated, start to finish
        </p>
        <h1
          className="text-ink mb-4 mx-auto text-[27px] sm:text-[34px] md:text-[40px] leading-[1.12]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          A full college essay that worked, annotated
        </h1>
        <p className="text-ink-2 text-[15px] sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          A complete college application essay from a real acceptance, read end to end with notes on
          why each paragraph earns its place — the opening scene, the turn, the evidence, and the
          close — plus the patterns that recur across admitted essays.
        </p>
      </header>
      <FullApplicationViewWrapper />
      <Footer />
    </>
  );
}
