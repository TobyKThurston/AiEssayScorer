"use client";

import { EssayRating } from "../types";
import { HighlightedPreview } from "./HighlightedPreview";
import { MetadataBar } from "./MetadataBar";

interface EssayTextPanelProps {
  mode: "edit" | "preview";
  content: string;
  essayType: string;
  targetSchools: string[];
  essayPrompt: string;
  rating: EssayRating | null;
  activeHighlightIndex: number | null;
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
}

export function EssayTextPanel({
  mode,
  content,
  essayType,
  targetSchools,
  essayPrompt,
  rating,
  activeHighlightIndex,
  onContentChange,
  onMetadataChange,
  onHighlightHover,
  onHighlightLeave,
  onHighlightLock,
  onSwitchToEdit,
  onSwitchToPreview,
}: EssayTextPanelProps) {
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Mode toggle bar */}
      {rating && (
        <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-200 bg-white">
          <button
            onClick={onSwitchToEdit}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === "edit"
                ? "bg-[#3B82F6] text-white"
                : "text-[#64748B] hover:bg-slate-100"
            }`}
          >
            Edit
          </button>
          <button
            onClick={onSwitchToPreview}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === "preview"
                ? "bg-[#3B82F6] text-white"
                : "text-[#64748B] hover:bg-slate-100"
            }`}
          >
            Preview
          </button>
          <span className="ml-auto text-xs text-[#94A3B8]">{wordCount} words</span>
        </div>
      )}

      {/* Text area or preview */}
      <div className="flex-1 overflow-hidden">
        {mode === "edit" ? (
          <div className="relative h-full">
            <textarea
              className="w-full h-full p-4 text-sm text-[#0F172A] bg-white outline-none resize-none leading-relaxed font-mono placeholder:text-[#94A3B8]"
              placeholder="Start writing your essay here..."
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              spellCheck
            />
            {!rating && (
              <div className="absolute bottom-3 right-3 text-xs text-[#CBD5E1]">
                {wordCount} words
              </div>
            )}
          </div>
        ) : (
          <HighlightedPreview
            content={content}
            lineSuggestions={rating?.lineSuggestions}
            activeHighlightIndex={activeHighlightIndex}
            onHoverEnter={onHighlightHover}
            onHoverLeave={onHighlightLeave}
            onLock={onHighlightLock}
          />
        )}
      </div>

      {/* Metadata bar */}
      <MetadataBar
        essayType={essayType}
        targetSchools={targetSchools}
        essayPrompt={essayPrompt}
        onChange={onMetadataChange}
      />
    </div>
  );
}
