"use client";

import { CheckCircle2, AlertTriangle, Target, FileText, TrendingUp } from "lucide-react";
import { EssayRating } from "../types";
import { ScoreHeader } from "./ScoreHeader";
import { FeedbackCard } from "./FeedbackCard";
import { HookPanel } from "./HookPanel";
import { AdmissionsOfficerView } from "./AdmissionsOfficerView";

interface FeedbackPanelProps {
  rating: EssayRating;
  activeHighlightIndex: number | null;
  isPro: boolean;
  rewriteCount: number;
  rewriteResults: Record<number, { rewritten: string; explanation: string }>;
  rewritingIndex: number | null;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
  onLock: (index: number) => void;
  onRewrite: (index: number, original: string, suggestion: string, reason: string) => void;
  onRegenHooks: () => void;
  isRegenHooks: boolean;
}

export function FeedbackPanel({
  rating,
  activeHighlightIndex,
  isPro,
  rewriteCount,
  rewriteResults,
  rewritingIndex,
  onHoverEnter,
  onHoverLeave,
  onLock,
  onRewrite,
  onRegenHooks,
  isRegenHooks,
}: FeedbackPanelProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      {/* Score header */}
      <ScoreHeader rating={rating} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Hook panel — top */}
        {rating.hooks && (
          <HookPanel
            hooks={rating.hooks}
            isPro={isPro}
            isGenerating={isRegenHooks}
            onRegenerate={onRegenHooks}
          />
        )}

        {/* Line suggestions */}
        {rating.lineSuggestions && rating.lineSuggestions.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 px-1">
              Line Suggestions
            </p>
            <div className="space-y-2">
              {rating.lineSuggestions.map((item, i) => (
                <FeedbackCard
                  key={i}
                  index={i}
                  original={item.original}
                  suggestion={item.suggestion}
                  reason={item.reason}
                  isActive={activeHighlightIndex === i}
                  isPro={isPro}
                  rewriteCount={rewriteCount}
                  rewriteResult={rewriteResults[i]}
                  isRewriting={rewritingIndex === i}
                  onHoverEnter={onHoverEnter}
                  onHoverLeave={onHoverLeave}
                  onLock={onLock}
                  onRewrite={onRewrite}
                />
              ))}
            </div>
          </div>
        )}

        {/* Strengths */}
        {rating.strengths.length > 0 && (
          <div className="p-3 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-md bg-[#D1FAE5] flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-[#10B981]" />
              </div>
              <span className="text-xs font-semibold text-[#475569]">Strengths</span>
            </div>
            <ul className="space-y-1.5">
              {rating.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-[#475569]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {rating.improvements.length > 0 && (
          <div className="p-3 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-md bg-[#FEF3C7] flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
              </div>
              <span className="text-xs font-semibold text-[#475569]">Areas for Improvement</span>
            </div>
            <ul className="space-y-1.5">
              {rating.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-[#475569]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed feedback */}
        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-3">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
            Detailed Feedback
          </p>
          {[
            { label: "Content", icon: FileText, text: rating.contentFeedback },
            { label: "Structure", icon: Target, text: rating.structureFeedback },
            { label: "Style", icon: TrendingUp, text: rating.styleFeedback },
          ].map(({ label, icon: Icon, text }) => (
            <div key={label}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span className="text-xs font-medium text-[#475569]">{label}</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Admissions Officer View */}
        <AdmissionsOfficerView admissionsView={rating.admissionsView} isPro={isPro} />

        {/* Recommendation */}
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-xs font-medium text-[#3B82F6]">Recommendation</span>
          </div>
          <p className="text-xs text-[#475569] leading-relaxed">{rating.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
