"use client";

import Link from "next/link";
import { Navigation } from "./components/Navigation";
import { EssayReviewFlow } from "./components/EssayReviewFlow";
import { Footer } from "./components/Footer";
import { useAuth } from "@/contexts/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">
      <Navigation />
      {user && (
        <div className="fixed top-16 left-0 right-0 z-40 flex items-center justify-center gap-3 bg-[#EFF6FF] border-b border-[#BFDBFE] px-4 py-2 text-xs text-[#1E40AF]">
          <span>Want to save and revisit your essays over time?</span>
          <Link
            href="/editor"
            className="font-semibold underline underline-offset-2 hover:text-[#1D4ED8] transition-colors"
          >
            Try My Essays →
          </Link>
        </div>
      )}
      <EssayReviewFlow />
      <Footer />
    </div>
  );
}