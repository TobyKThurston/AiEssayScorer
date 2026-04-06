"use client";

import { X } from "lucide-react";
import { UpgradeGate } from "./UpgradeGate";

interface EssayRewritePanelProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: { rewritten?: string; hookPreview: string } | null;
  isPro: boolean;
  onApply: (text: string) => void;
}

export function EssayRewritePanel({
  isOpen,
  onClose,
  isLoading,
  result,
  isPro,
  onApply,
}: EssayRewritePanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-[380px] z-20 bg-white shadow-2xl flex flex-col border-l border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 flex-shrink-0">
        <span className="text-sm font-semibold text-[#0F172A]">Rewritten Essay</span>
        <div className="flex items-center gap-2">
          {isPro && result?.rewritten && (
            <button
              onClick={() => onApply(result.rewritten!)}
              className="px-3 py-1 rounded-lg bg-[#0F172A] text-white text-xs font-medium hover:bg-[#1E293B] transition-colors"
            >
              Apply this version
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#64748B]">Rewriting your essay...</p>
          </div>
        ) : result ? (
          <div>
            {isPro && result.rewritten ? (
              <p className="text-sm text-[#0F172A] leading-relaxed whitespace-pre-wrap">
                {result.rewritten}
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-[#0F172A] leading-relaxed">{result.hookPreview}</p>
                <UpgradeGate
                  isLocked={true}
                  featureName="Full Essay Rewrite"
                  description="Unlock the complete rewritten version"
                >
                  <div className="space-y-2">
                    <p className="text-sm text-[#0F172A] leading-relaxed opacity-60 select-none">
                      {Array(8)
                        .fill(
                          "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        )
                        .join(" ")}
                    </p>
                  </div>
                </UpgradeGate>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-[#94A3B8]">No result yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
