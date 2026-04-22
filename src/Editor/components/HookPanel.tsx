"use client";

import { useState } from "react";
import { Sparkles, Clipboard, Check, RefreshCw } from "lucide-react";
import { EssayRating } from "../types";
import { UpgradeGate } from "./UpgradeGate";

type HookType = "narrative" | "boldStatement" | "reflective";

interface HookPanelProps {
  hooks: EssayRating["hooks"];
  isPro: boolean;
  isGenerating: boolean;
  onRegenerate: () => void;
}

const TAB_LABELS: { key: HookType; label: string }[] = [
  { key: "narrative", label: "Narrative" },
  { key: "boldStatement", label: "Bold Statement" },
  { key: "reflective", label: "Reflective" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-[10px] text-pencil hover:text-ink transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-3 h-3 text-[#10B981]" />
      ) : (
        <Clipboard className="w-3 h-3" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function HookPanel({ hooks, isPro, isGenerating, onRegenerate }: HookPanelProps) {
  const [activeTab, setActiveTab] = useState<HookType>("narrative");
  const [isOpen, setIsOpen] = useState(true);

  if (!hooks) return null;

  const activeHookText = hooks[activeTab];

  return (
    <div className="rounded-xl bg-white border border-hair overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#EDE9FE] flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-oxblood" />
          </div>
          <span className="text-xs font-semibold text-ink-2">Alternative Hooks</span>
        </div>
        <span className="text-[10px] text-pencil">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="px-3 pb-3">
          {/* Tabs */}
          <div className="flex gap-1 mb-2.5">
            {TAB_LABELS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 text-[10px] font-medium py-1 rounded-md transition-colors ${
                  activeTab === key
                    ? "bg-oxblood text-white"
                    : "bg-paper-2 text-pencil hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "narrative" ? (
            <div className="space-y-1.5">
              <p className="text-xs text-ink leading-relaxed">{hooks.narrative}</p>
              <div className="flex justify-end">
                <CopyButton text={hooks.narrative} />
              </div>
            </div>
          ) : (
            <UpgradeGate
              isLocked={!isPro}
              featureName="More Hooks"
              description="Unlock Bold Statement and Reflective hooks"
            >
              <div className="space-y-1.5">
                <p className="text-xs text-ink leading-relaxed">
                  {activeHookText ?? "Hook not available"}
                </p>
                <div className="flex justify-end">
                  {activeHookText && <CopyButton text={activeHookText} />}
                </div>
              </div>
            </UpgradeGate>
          )}

          {/* Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-end">
            <button
              onClick={onRegenerate}
              disabled={isGenerating}
              className="flex items-center gap-1 text-[10px] font-medium text-oxblood hover:underline disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Regenerating..." : "Regenerate"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
