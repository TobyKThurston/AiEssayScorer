"use client";

import { useEffect, useRef } from "react";
import { AnnotatedSegment, EssayRating } from "../types";

interface HighlightedPreviewProps {
  content: string;
  lineSuggestions: EssayRating["lineSuggestions"];
  activeHighlightIndex: number | null;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
  onLock: (index: number) => void;
}

export function buildAnnotatedSegments(
  content: string,
  lineSuggestions: EssayRating["lineSuggestions"]
): AnnotatedSegment[] {
  if (!lineSuggestions || lineSuggestions.length === 0) {
    return [{ text: content }];
  }

  // Sort suggestions by their position in the content
  const sorted = lineSuggestions
    .map((s, i) => ({ ...s, index: i, pos: content.indexOf(s.original) }))
    .filter((s) => s.pos !== -1)
    .sort((a, b) => a.pos - b.pos);

  let segments: AnnotatedSegment[] = [{ text: content }];

  for (const s of sorted) {
    const newSegments: AnnotatedSegment[] = [];
    for (const seg of segments) {
      if (seg.highlightIndex !== undefined) {
        newSegments.push(seg);
        continue;
      }
      const idx = seg.text.indexOf(s.original);
      if (idx === -1) {
        newSegments.push(seg);
        continue;
      }
      if (idx > 0) newSegments.push({ text: seg.text.slice(0, idx) });
      newSegments.push({ text: s.original, highlightIndex: s.index });
      if (idx + s.original.length < seg.text.length) {
        newSegments.push({ text: seg.text.slice(idx + s.original.length) });
      }
    }
    segments = newSegments;
  }

  return segments.filter((s) => s.text.length > 0);
}

export function HighlightedPreview({
  content,
  lineSuggestions,
  activeHighlightIndex,
  onHoverEnter,
  onHoverLeave,
  onLock,
}: HighlightedPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const segments = buildAnnotatedSegments(content, lineSuggestions);

  // Scroll active mark into view when activeHighlightIndex changes
  useEffect(() => {
    if (activeHighlightIndex === null || !containerRef.current) return;
    const mark = containerRef.current.querySelector(
      `[data-segment-index="${activeHighlightIndex}"]`
    );
    if (mark) {
      mark.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeHighlightIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full p-4 text-ink text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-y-auto"
    >
      {segments.map((seg, i) => {
        if (seg.highlightIndex === undefined) {
          return <span key={i}>{seg.text}</span>;
        }
        const isActive = activeHighlightIndex === seg.highlightIndex;
        return (
          <mark
            key={i}
            data-segment-index={seg.highlightIndex}
            className={`cursor-pointer rounded-sm underline decoration-wavy transition-colors duration-150 ${
              isActive
                ? "bg-[#DBEAFE] decoration-[#3B82F6]"
                : "bg-[#FEF9C3] decoration-[#F59E0B]"
            }`}
            style={{ textDecorationLine: "underline" }}
            onMouseEnter={() => onHoverEnter(seg.highlightIndex!)}
            onMouseLeave={onHoverLeave}
            onClick={() => onLock(seg.highlightIndex!)}
          >
            {seg.text}
          </mark>
        );
      })}
    </div>
  );
}
