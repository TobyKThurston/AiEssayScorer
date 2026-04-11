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
  const presetTarget = WORD_TARGETS[essayType] ?? DEFAULT_TARGET;

  const [customMax, setCustomMax] = useState<number | null>(null);
  const [editingLimit, setEditingLimit] = useState(false);
  const [limitInput, setLimitInput] = useState("");

  const effectiveMax = customMax ?? presetTarget.max;

  type WCStatus = "empty" | "short" | "good" | "over";
  const wcStatus: WCStatus =
    wordCount === 0
      ? "empty"
      : wordCount < presetTarget.min
      ? "short"
      : wordCount <= effectiveMax
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

  const startEditingLimit = () => {
    setLimitInput(String(effectiveMax));
    setEditingLimit(true);
  };

  const commitLimit = () => {
    const parsed = parseInt(limitInput, 10);
    if (!isNaN(parsed) && parsed > 0) setCustomMax(parsed);
    else setCustomMax(null);
    setEditingLimit(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#EEF2F7]">
      {/* Mode toggle, only when analysis exists */}
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

      {/* Document area, fills remaining space, no outer scroll */}
      <div className="flex-1 min-h-0 flex flex-col px-3 sm:px-6 py-4 sm:py-6">
        <div className="flex-1 min-h-0 flex flex-col max-w-[700px] w-full mx-auto">

          {/* Paper card */}
          <div className="flex-1 min-h-0 flex flex-col bg-white rounded-2xl shadow-[0_4px_24px_rgba(148,163,184,0.18)] border border-slate-200/60 overflow-hidden">

            {/* Prompt banner (if set) */}
            {essayPrompt && (
              <div className="px-5 sm:px-8 py-3 sm:py-4 bg-[#EFF6FF] border-b border-[#BFDBFE] flex-shrink-0">
                <p className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest mb-1">
                  Prompt
                </p>
                <p className="text-sm text-[#1E40AF] leading-relaxed">{essayPrompt}</p>
              </div>
            )}

            {/* Essay type badge row */}
            {(essayType || targetSchools.length > 0) && (
              <div className="flex items-center gap-2 px-5 sm:px-8 py-2.5 border-b border-slate-100 flex-shrink-0 flex-wrap">
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

            {/* Writing area, fills remaining card space */}
            <div className="flex-1 min-h-0 flex flex-col">
              {mode === "edit" ? (
                <textarea
                  className="flex-1 min-h-0 w-full px-5 sm:px-8 py-5 sm:py-7 text-[15px] text-[#0F172A] bg-transparent outline-none resize-none leading-[1.85] placeholder:text-[#CBD5E1] font-[Georgia,serif]"
                  placeholder={"Begin your essay here...\n\nTip: the best essays open with a specific moment or image, not a broad statement."}
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  spellCheck
                />
              ) : (
                <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-8 py-5 sm:py-7 font-[Georgia,serif] text-[15px] leading-[1.85]">
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
            <div className="px-5 sm:px-8 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/60 flex-shrink-0">
              <span className={`text-xs font-medium ${wcColor}`}>
                {wordCount} word{wordCount !== 1 ? "s" : ""}
                {wcStatus === "over" && (
                  <span className="ml-1.5 text-[#EF4444]">({wordCount - effectiveMax} over)</span>
                )}
                {wcStatus === "short" && wordCount > 0 && (
                  <span className="ml-1.5 text-[#94A3B8]">({presetTarget.min - wordCount} to go)</span>
                )}
                {wcStatus === "good" && wordCount > 0 && (
                  <span className="ml-1.5 text-[#10B981]">(within limit)</span>
                )}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <span>Limit:</span>
                {editingLimit ? (
                  <input
                    type="number"
                    className="w-16 text-xs text-[#475569] bg-white border border-[#3B82F6] rounded px-1.5 py-0.5 outline-none"
                    value={limitInput}
                    onChange={(e) => setLimitInput(e.target.value)}
                    onBlur={commitLimit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitLimit();
                      if (e.key === "Escape") setEditingLimit(false);
                    }}
                    autoFocus
                  />
                ) : (
                  <button
                    onClick={startEditingLimit}
                    className="text-[#475569] font-medium hover:text-[#3B82F6] transition-colors underline decoration-dotted underline-offset-2"
                    title="Click to set word limit"
                  >
                    {effectiveMax}
                  </button>
                )}
              </span>
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
