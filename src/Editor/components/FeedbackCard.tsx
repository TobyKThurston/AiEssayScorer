"use client";

import { useEffect, useRef } from "react";
import { Lightbulb } from "lucide-react";

interface FeedbackCardProps {
  index: number;
  original: string;
  suggestion: string;
  reason: string;
  isActive: boolean;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
  onLock: (index: number) => void;
}

export function FeedbackCard({
  index,
  original,
  suggestion,
  reason,
  isActive,
  onHoverEnter,
  onHoverLeave,
  onLock,
}: FeedbackCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isActive]);

  return (
    <div
      ref={ref}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
        isActive
          ? "border-[#3B82F6] bg-[#EFF6FF] shadow-[0_4px_16px_rgba(59,130,246,0.15)]"
          : "border-slate-200 bg-white hover:border-[#3B82F6]/40 hover:bg-slate-50"
      }`}
      onMouseEnter={() => onHoverEnter(index)}
      onMouseLeave={onHoverLeave}
      onClick={() => onLock(index)}
    >
      <div className="flex items-start gap-2.5 mb-3">
        <div
          className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
            isActive ? "bg-[#DBEAFE]" : "bg-slate-100"
          }`}
        >
          <Lightbulb
            className={`w-3.5 h-3.5 ${isActive ? "text-[#3B82F6]" : "text-[#94A3B8]"}`}
          />
        </div>
        <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mt-1">
          Line {index + 1}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-xs text-[#94A3B8] block mb-0.5">Original</span>
          <p className="text-[#64748B] italic leading-snug line-clamp-3">{original}</p>
        </div>
        <div>
          <span className="text-xs text-[#3B82F6] block mb-0.5">Suggested</span>
          <p className="text-[#0F172A] leading-snug">{suggestion}</p>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs text-[#64748B] leading-snug">{reason}</p>
        </div>
      </div>
    </div>
  );
}
