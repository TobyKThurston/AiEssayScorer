"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, History, Wand2, Zap } from "lucide-react";
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
  const canAnalyze =
    hasContent && !outOfTokens && (tokens === null || tokens >= 1) && !isAnalyzing;

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
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-hair flex items-center gap-1.5 sm:gap-3 px-2 sm:px-5"
        style={{
          background: "rgba(245,240,230,0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Link
          href="/editor"
          className="flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-[0.16em] text-ink-2 hover:text-oxblood transition-colors shrink-0"
          aria-label="Back to My Essays"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Essays</span>
        </Link>

        <span aria-hidden="true" className="text-oxblood/60 font-mono text-xs shrink-0">
          /
        </span>

        <input
          className="flex-1 min-w-0 font-serif text-[15px] sm:text-[17px] md:text-[18px] text-ink bg-transparent outline-none placeholder:text-pencil truncate"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Untitled essay"
          aria-label="Essay title"
        />

        {tokens !== null ? (
          <span
            className={`hidden md:inline shrink-0 font-mono text-[10.5px] uppercase tracking-[0.16em] ${
              outOfTokens ? "text-oxblood" : "text-pencil"
            }`}
          >
            {tokens} token{tokens !== 1 ? "s" : ""}
          </span>
        ) : null}

        {!isPro ? (
          <button
            onClick={handleUpgrade}
            className="hidden md:inline-flex shrink-0 items-center gap-1.5 btn btn-sm btn-brand"
          >
            <Zap className="w-3 h-3" />
            Upgrade
          </button>
        ) : null}

        <button
          onClick={onShowVersionHistory}
          className="shrink-0 p-2 rounded-md text-pencil hover:text-ink hover:bg-paper-2 transition-colors"
          title="Version history"
          aria-label="Version history"
        >
          <History className="w-4 h-4" />
        </button>

        <button
          onClick={onSave}
          disabled={!isDirty || isSaving}
          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
            isDirty && !isSaving
              ? "bg-paper-2 text-ink hover:bg-paper-3"
              : "text-pencil/60 cursor-default"
          }`}
          aria-label="Save"
        >
          <Save className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isSaving ? "Saving…" : "Save"}</span>
        </button>

        {rating ? (
          <button
            onClick={onRewriteEssay}
            disabled={isRewritingEssay}
            className="shrink-0 btn btn-sm btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Rewrite essay"
          >
            <Wand2 className="w-3.5 h-3.5 mr-1.5 inline-block" />
            <span className="hidden sm:inline">
              {isRewritingEssay ? "Rewriting…" : "Rewrite"}
            </span>
          </button>
        ) : null}

        {outOfTokens ? (
          <button
            onClick={handleUpgrade}
            className="shrink-0 btn btn-sm btn-brand"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5 inline-block" />
            <span className="hidden sm:inline">Upgrade to analyze</span>
            <span className="sm:hidden">Upgrade</span>
          </button>
        ) : (
          <button
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className={`shrink-0 btn btn-sm transition-all ${
              canAnalyze
                ? "btn-ink"
                : "bg-paper-2 text-pencil/60 border border-hair cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block" />
            {isAnalyzing ? "Analyzing…" : "Analyze"}
          </button>
        )}
      </nav>

      {analyzeError ? (
        <div className="fixed top-14 left-0 right-0 z-40 border-b border-oxblood/30 bg-oxblood/5 px-4 py-2 text-[13px] text-oxblood text-center">
          {analyzeError}
        </div>
      ) : null}
    </>
  );
}
