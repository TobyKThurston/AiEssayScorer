"use client";

import { useEffect, useRef } from "react";
import { Lightbulb, Wand2 } from "lucide-react";
import { UpgradeGate } from "./UpgradeGate";

interface FeedbackCardProps {
  index: number;
  original: string;
  suggestion: string;
  reason: string;
  isActive: boolean;
  isPro: boolean;
  rewriteCount: number;
  rewriteResult?: { rewritten: string; explanation: string };
  isRewriting?: boolean;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
  onLock: (index: number) => void;
  onRewrite: (index: number, original: string, suggestion: string, reason: string) => void;
}

export function FeedbackCard({
  index,
  original,
  suggestion,
  reason,
  isActive,
  isPro,
  rewriteCount,
  rewriteResult,
  isRewriting,
  onHoverEnter,
  onHoverLeave,
  onLock,
  onRewrite,
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
          : "border-hair bg-white hover:border-[#3B82F6]/40 hover:bg-slate-50"
      }`}
      onMouseEnter={() => onHoverEnter(index)}
      onMouseLeave={onHoverLeave}
      onClick={() => onLock(index)}
    >
      <div className="flex items-start gap-2.5 mb-3">
        <div
          className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
            isActive ? "bg-[#DBEAFE]" : "bg-paper-2"
          }`}
        >
          <Lightbulb
            className={`w-3.5 h-3.5 ${isActive ? "text-oxblood" : "text-pencil"}`}
          />
        </div>
        <span className="text-xs font-semibold text-pencil uppercase tracking-wider mt-1">
          Line {index + 1}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-xs text-pencil block mb-0.5">Original</span>
          <p className="text-pencil italic leading-snug line-clamp-3">{original}</p>
        </div>
        <div>
          <span className="text-xs text-oxblood block mb-0.5">Suggested</span>
          <p className="text-ink leading-snug">{suggestion}</p>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs text-pencil leading-snug">{reason}</p>
        </div>
      </div>

      {/* Rewrite button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRewrite(index, original, suggestion, reason);
        }}
        disabled={isRewriting}
        className="mt-3 flex items-center gap-1 text-[10px] font-medium text-oxblood hover:underline disabled:opacity-40"
      >
        <Wand2 className="w-3 h-3" />
        {isRewriting ? "Rewriting..." : "Rewrite this"}
      </button>

      {/* Rewrite result */}
      {rewriteResult && (
        <UpgradeGate
          isLocked={!isPro && rewriteCount > 3}
          featureName="Unlimited Rewrites"
          description="You've used your 3 free rewrites"
        >
          <div className="mt-2 p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
            <span className="text-[10px] font-semibold text-[#10B981] block mb-1">Rewritten</span>
            <p className="text-sm text-ink leading-snug">{rewriteResult.rewritten}</p>
            <p className="text-[10px] text-pencil mt-1 italic">{rewriteResult.explanation}</p>
          </div>
        </UpgradeGate>
      )}
    </div>
  );
}
