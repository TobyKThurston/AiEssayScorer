"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Target,
  FileText,
  TrendingUp,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { EssayRating } from "../types";
import { ScoreHeader } from "./ScoreHeader";
import { FeedbackCard } from "./FeedbackCard";
import { HookPanel } from "./HookPanel";
import { AdmissionsOfficerView } from "./AdmissionsOfficerView";
import { CollapsibleSection } from "./CollapsibleSection";
import { SchoolFitPanel } from "./SchoolFitPanel";
import { UpgradeGate } from "./UpgradeGate";

interface FeedbackPanelProps {
  rating: EssayRating;
  activeHighlightIndex: number | null;
  isPro: boolean;
  rewriteCount: number;
  rewriteResults: Record<number, { rewritten: string; explanation: string }>;
  rewritingIndex: number | null;
  targetSchools: string[];
  extendedLineSuggestions: Array<{ original: string; suggestion: string; reason: string }>;
  isLoadingLineSuggestions: boolean;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
  onLock: (index: number) => void;
  onRewrite: (index: number, original: string, suggestion: string, reason: string) => void;
  onRegenHooks: () => void;
  isRegenHooks: boolean;
}

const FREE_LIMIT = 2;

export function FeedbackPanel({
  rating,
  activeHighlightIndex,
  isPro,
  rewriteCount,
  rewriteResults,
  rewritingIndex,
  targetSchools,
  extendedLineSuggestions,
  isLoadingLineSuggestions,
  onHoverEnter,
  onHoverLeave,
  onLock,
  onRewrite,
  onRegenHooks,
  isRegenHooks,
}: FeedbackPanelProps) {
  const baseSuggestions = rating.lineSuggestions ?? [];
  const totalCount = baseSuggestions.length + extendedLineSuggestions.length;
  const visibleExtended = extendedLineSuggestions.slice(0, FREE_LIMIT);
  const lockedExtended = extendedLineSuggestions.slice(FREE_LIMIT);

  const suggestionBadge =
    totalCount > 0 ? (
      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-[#64748B]">
        {isLoadingLineSuggestions ? baseSuggestions.length : totalCount}
      </span>
    ) : null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      {/* Score header */}
      <ScoreHeader rating={rating} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">

        {/* 1. Line Suggestions */}
        {(baseSuggestions.length > 0 || isLoadingLineSuggestions) && (
          <CollapsibleSection
            title="Line Suggestions"
            icon={<Lightbulb className="w-3 h-3 text-[#3B82F6]" />}
            iconBg="bg-[#DBEAFE]"
            defaultOpen={true}
            badge={suggestionBadge}
          >
            <div className="space-y-2 mt-1">
              {/* Base suggestions (always visible) */}
              {baseSuggestions.map((item, i) => (
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

              {/* Loading spinner */}
              {isLoadingLineSuggestions && (
                <div className="flex items-center gap-2 py-2 px-1 text-xs text-[#94A3B8]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Finding more suggestions…</span>
                </div>
              )}

              {/* First FREE_LIMIT extended suggestions — always visible */}
              {visibleExtended.map((item, i) => (
                <FeedbackCard
                  key={`ext-${i}`}
                  index={baseSuggestions.length + i}
                  original={item.original}
                  suggestion={item.suggestion}
                  reason={item.reason}
                  isActive={false}
                  isPro={isPro}
                  rewriteCount={rewriteCount}
                  rewriteResult={rewriteResults[baseSuggestions.length + i]}
                  isRewriting={rewritingIndex === baseSuggestions.length + i}
                  onHoverEnter={onHoverEnter}
                  onHoverLeave={onHoverLeave}
                  onLock={onLock}
                  onRewrite={onRewrite}
                />
              ))}

              {/* Remaining extended — blurred for free users */}
              {lockedExtended.length > 0 && (
                <UpgradeGate
                  isLocked={!isPro}
                  featureName="More Line Suggestions"
                  description={`Unlock ${lockedExtended.length} more targeted line edits`}
                >
                  <div className="space-y-2">
                    {lockedExtended.map((item, i) => (
                      <FeedbackCard
                        key={`locked-${i}`}
                        index={baseSuggestions.length + FREE_LIMIT + i}
                        original={item.original}
                        suggestion={item.suggestion}
                        reason={item.reason}
                        isActive={false}
                        isPro={isPro}
                        rewriteCount={rewriteCount}
                        rewriteResult={rewriteResults[baseSuggestions.length + FREE_LIMIT + i]}
                        isRewriting={rewritingIndex === baseSuggestions.length + FREE_LIMIT + i}
                        onHoverEnter={onHoverEnter}
                        onHoverLeave={onHoverLeave}
                        onLock={onLock}
                        onRewrite={onRewrite}
                      />
                    ))}
                  </div>
                </UpgradeGate>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* 2. Areas for Improvement */}
        {rating.improvements.length > 0 && (
          <CollapsibleSection
            title="Areas for Improvement"
            icon={<AlertTriangle className="w-3 h-3 text-[#F59E0B]" />}
            iconBg="bg-[#FEF3C7]"
            defaultOpen={true}
          >
            <ul className="space-y-1.5 mt-1">
              {rating.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-[#475569]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {/* 3. School Fit */}
        {rating.schoolFit && targetSchools.length > 0 && (
          <SchoolFitPanel
            schoolFit={rating.schoolFit}
            targetSchools={targetSchools}
            isPro={isPro}
          />
        )}

        {/* 4. Detailed Feedback */}
        <CollapsibleSection
          title="Detailed Feedback"
          icon={<FileText className="w-3 h-3 text-[#3B82F6]" />}
          iconBg="bg-[#DBEAFE]"
          defaultOpen={true}
        >
          <div className="space-y-3 mt-1">
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
        </CollapsibleSection>

        {/* 5. Strengths */}
        {rating.strengths.length > 0 && (
          <CollapsibleSection
            title="Strengths"
            icon={<TrendingUp className="w-3 h-3 text-[#10B981]" />}
            iconBg="bg-[#D1FAE5]"
            defaultOpen={true}
          >
            <ul className="space-y-1.5 mt-1">
              {rating.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-[#475569]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {/* 6. Hook Panel — self-managed collapse */}
        {rating.hooks && (
          <HookPanel
            hooks={rating.hooks}
            isPro={isPro}
            isGenerating={isRegenHooks}
            onRegenerate={onRegenHooks}
          />
        )}

        {/* 7. Admissions Officer View — self-managed collapse */}
        <AdmissionsOfficerView admissionsView={rating.admissionsView} isPro={isPro} />

        {/* 8. Recommendation — collapsed by default */}
        <CollapsibleSection
          title="Recommendation"
          icon={<Target className="w-3 h-3 text-[#3B82F6]" />}
          iconBg="bg-[#DBEAFE]"
          defaultOpen={false}
        >
          <p className="text-xs text-[#475569] leading-relaxed mt-1">{rating.recommendation}</p>
        </CollapsibleSection>
      </div>
    </div>
  );
}
