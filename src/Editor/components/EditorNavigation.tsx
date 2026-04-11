"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Save, Sparkles, History, Leaf, Wand2, Zap } from "lucide-react";
import Link from "next/link";
import { Essay, EssayRating } from "../types";

interface EditorNavigationProps {
  essay: Essay | null;
  isDirty: boolean;
  isSaving: boolean;
  isAnalyzing: boolean;
  tokens: number | null;
  analyzeError: string | null;
  hasContent: boolean;
  rating: EssayRating | null;
  isRewritingEssay: boolean;
  isPro: boolean;
  onSave: () => void;
  onAnalyze: () => void;
  onShowVersionHistory: () => void;
  onRewriteEssay: () => void;
}

export function EditorNavigation({
  essay,
  isDirty,
  isSaving,
  isAnalyzing,
  tokens,
  analyzeError,
  hasContent,
  rating,
  isRewritingEssay,
  isPro,
  onSave,
  onAnalyze,
  onShowVersionHistory,
  onRewriteEssay,
}: EditorNavigationProps) {
  const [title, setTitle] = useState(essay?.title ?? "Untitled Essay");
  const titleDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (essay?.title) setTitle(essay.title);
  }, [essay?.title]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!essay) return;
    if (titleDebounceRef.current) clearTimeout(titleDebounceRef.current);
    titleDebounceRef.current = setTimeout(() => {
      fetch(`/api/essays/${essay.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: value }),
      }).catch(() => {});
    }, 600);
  };

  const outOfTokens = tokens !== null && tokens < 1;
  const canAnalyze = hasContent && !outOfTokens && (tokens === null || tokens >= 1) && !isAnalyzing;

  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // silent fail
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-slate-200 flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4">
        {/* Logo + back */}
        <Link href="/editor" className="hidden sm:flex items-center gap-2 flex-shrink-0 mr-1">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center">
            <Leaf className="w-3.5 h-3.5 text-white" />
          </div>
        </Link>
        <Link
          href="/editor"
          className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F172A] transition-colors flex-shrink-0 p-1.5 sm:p-0"
          aria-label="Back to My Essays"
        >
          <ArrowLeft className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">My Essays</span>
        </Link>

        <div className="w-px h-5 bg-slate-200 flex-shrink-0 hidden sm:block" />

        {/* Title */}
        <input
          className="flex-1 min-w-0 text-sm font-medium text-[#0F172A] bg-transparent outline-none placeholder:text-[#94A3B8] truncate"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Untitled Essay"
          aria-label="Essay title"
        />

        {/* Token count */}
        {tokens !== null && (
          <span className={`hidden md:inline text-xs flex-shrink-0 ${outOfTokens ? "text-[#EF4444] font-medium" : "text-[#94A3B8]"}`}>
            {tokens} token{tokens !== 1 ? "s" : ""}
          </span>
        )}

        {/* Upgrade pill — always visible when not Pro */}
        {!isPro && (
          <button
            onClick={handleUpgrade}
            className="hidden md:flex flex-shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Zap className="w-3 h-3" />
            Upgrade
          </button>
        )}

        {/* Version history */}
        <button
          onClick={onShowVersionHistory}
          className="flex-shrink-0 p-1.5 rounded-lg text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
          title="Version history"
          aria-label="Version history"
        >
          <History className="w-4 h-4" />
        </button>

        {/* Save */}
        <button
          onClick={onSave}
          disabled={!isDirty || isSaving}
          className={`flex-shrink-0 flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isDirty && !isSaving
              ? "bg-slate-100 text-[#0F172A] hover:bg-slate-200"
              : "text-[#CBD5E1] cursor-default"
          }`}
          aria-label="Save"
        >
          <Save className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">{isSaving ? "Saving…" : "Save"}</span>
        </button>

        {/* Rewrite essay */}
        {rating && (
          <button
            onClick={onRewriteEssay}
            disabled={isRewritingEssay}
            className="flex-shrink-0 flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#6366F1] text-[#6366F1] text-xs font-medium hover:bg-[#EDE9FE] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Rewrite essay"
          >
            <Wand2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">{isRewritingEssay ? "Rewriting..." : "Rewrite essay"}</span>
          </button>
        )}

        {/* Analyze / Upgrade-to-analyze */}
        {outOfTokens ? (
          <button
            onClick={handleUpgrade}
            className="flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white hover:opacity-90 transition-opacity"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upgrade to Analyze</span>
            <span className="sm:hidden">Upgrade</span>
          </button>
        ) : (
          <button
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              canAnalyze
                ? "bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)]"
                : "bg-slate-100 text-[#CBD5E1] cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? "Analyzing…" : "Analyze"}</span>
          </button>
        )}
      </nav>

      {/* Analyze error banner */}
      {analyzeError && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-700 text-center">
          {analyzeError}
        </div>
      )}
    </>
  );
}
