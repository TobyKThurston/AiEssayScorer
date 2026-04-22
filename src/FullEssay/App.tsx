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
      <FullApplicationViewWrapper />
      <Footer />
    </>
  );
}
