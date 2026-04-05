"use client";

import { useState } from "react";
import { EssayRating } from "../types";
import { HighlightedPreview } from "./HighlightedPreview";
import { MetadataBar } from "./MetadataBar";

const WORD_TARGETS: Record<string, { min: number; max: number }> = {
  "Common App Personal Statement": { min: 250, max: 650 },
  "UC Personal Insight Question": { min: 50, max: 350 },
  "Coalition App Essay": { min: 200, max: 550 },
  "Supplemental Essay": { min: 50, max: 500 },
  "Scholarship Essay": { min: 200, max: 600 },
};
const DEFAULT_TARGET = { min: 100, max: 650 };

interface EssayTextPanelProps {
  mode: "edit" | "preview";
  content: string;
  essayType: string;
  targetSchools: string[];
  essayPrompt: string;
  rating: EssayRating | null;
  activeHighlightIndex: number | null;
  openMetadata: boolean;
  onContentChange: (value: string) => void;
  onMetadataChange: (fields: {
    essayType?: string;
    targetSchools?: string[];
    essayPrompt?: string;
  }) => void;
  onHighlightHover: (index: number) => void;
  onHighlightLeave: () => void;
  onHighlightLock: (index: number) => void;
  onSwitchToEdit: () => void;
  onSwitchToPreview: () => void;
  onMetadataForceHandled: () => void;
}

export function EssayTextPanel({
  mode,
  content,
  essayType,
  targetSchools,
  essayPrompt,
  rating,
  activeHighlightIndex,
  openMetadata,
  onContentChange,
  onMetadataChange,
  onHighlightHover,
  onHighlightLeave,
  onHighlightLock,
  onSwitchToEdit,
  onSwitchToPreview,
  onMetadataForceHandled,
}: EssayTextPanelProps) {
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const target = WORD_TARGETS[essayType] ?? DEFAULT_TARGET;

  type WCStatus = "empty" | "short" | "good" | "over";
  const wcStatus: WCStatus =
    wordCount === 0
      ? "empty"
      : wordCount < target.min
      ? "short"
      : wordCount <= target.max
      ? "good"
      : "over";

  const wcColor =
    wcStatus === "good"
      ? "text-[#10B981]"
      : wcStatus === "over"
      ? "text-[#EF4444]"
      : wcStatus === "short"
      ? "text-[#F59E0B]"
      : "text-[#CBD5E1]";

  const [showPlaceholder] = useState(true);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#EEF2F7]">
      {/* Mode toggle — only when analysis exists */}
      {rating && (
        <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-slate-200 flex-shrink-0 z-10">
          {(["edit", "preview"] as const).map((m) => (
            <button
              key={m}
              onClick={m === "edit" ? onSwitchToEdit : onSwitchToPreview}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                mode === m
                  ? "bg-[#3B82F6] text-white"
                  : "text-[#64748B] hover:bg-slate-100"
              }`}
            >
              {m}
            </button>
          ))}
          <span className={`ml-auto text-xs font-medium ${wcColor}`}>
            {wordCount} words
          </span>
        </div>
      )}

      {/* Scrollable document area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-[700px] mx-auto flex flex-col min-h-[calc(100%-2rem)]">

          {/* Paper card */}
          <div className="flex-1 bg-white rounded-2xl shadow-[0_4px_24px_rgba(148,163,184,0.18)] border border-slate-200/60 overflow-hidden flex flex-col">

            {/* Prompt banner (if set) */}
            {essayPrompt && (
              <div className="px-8 py-4 bg-[#EFF6FF] border-b border-[#BFDBFE]">
                <p className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest mb-1">
                  Prompt
                </p>
                <p className="text-sm text-[#1E40AF] leading-relaxed">{essayPrompt}</p>
              </div>
            )}

            {/* Essay type badge row */}
            {(essayType || targetSchools.length > 0) && (
              <div className="flex items-center gap-2 px-8 py-2.5 border-b border-slate-100 flex-wrap">
                {essayType && (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#475569] text-xs font-medium">
                    {essayType}
                  </span>
                )}
                {targetSchools.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#475569] text-xs"
                  >
                    {s}
                  </span>
                ))}
                {targetSchools.length > 4 && (
                  <span className="text-xs text-[#94A3B8]">+{targetSchools.length - 4} more</span>
                )}
              </div>
            )}

            {/* Writing area */}
            <div className="flex-1 min-h-[480px]">
              {mode === "edit" ? (
                <textarea
                  className="w-full h-full min-h-[480px] px-8 py-7 text-[15px] text-[#0F172A] bg-transparent outline-none resize-none leading-[1.85] placeholder:text-[#CBD5E1] font-[Georgia,serif]"
                  placeholder={
                    showPlaceholder
                      ? "Begin your essay here…\n\nTip: the best essays open with a specific moment or image, not a broad statement."
                      : ""
                  }
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  spellCheck
                />
              ) : (
                <div className="px-8 py-7 min-h-[480px] font-[Georgia,serif] text-[15px] leading-[1.85]">
                  <HighlightedPreview
                    content={content}
                    lineSuggestions={rating?.lineSuggestions}
                    activeHighlightIndex={activeHighlightIndex}
                    onHoverEnter={onHighlightHover}
                    onHoverLeave={onHighlightLeave}
                    onLock={onHighlightLock}
                  />
                </div>
              )}
            </div>

            {/* Word count footer */}
            <div className="px-8 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/60">
              <span className={`text-xs font-medium ${wcColor}`}>
                {wordCount} word{wordCount !== 1 ? "s" : ""}
              </span>
              {wordCount > 0 && (
                <span className="text-xs text-[#94A3B8]">
                  {wcStatus === "good"
                    ? `within ${target.min}–${target.max} target`
                    : wcStatus === "over"
                    ? `${wordCount - target.max} over limit`
                    : wcStatus === "short"
                    ? `${target.min - wordCount} more to reach minimum`
                    : ""}
                </span>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Context / Metadata bar */}
      <MetadataBar
        essayType={essayType}
        targetSchools={targetSchools}
        essayPrompt={essayPrompt}
        onChange={onMetadataChange}
        forceOpen={openMetadata}
        onForceOpenHandled={onMetadataForceHandled}
      />
    </div>
  );
}
