"use client";

import { useState } from "react";
import { Eye, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import { AdmissionsView } from "../types";
import { UpgradeGate } from "./UpgradeGate";

interface AdmissionsOfficerViewProps {
  admissionsView: AdmissionsView | undefined;
  isPro: boolean;
}

export function AdmissionsOfficerView({ admissionsView, isPro }: AdmissionsOfficerViewProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!admissionsView) return null;

  const riskColor =
    admissionsView.blendRisk === "Low"
      ? "bg-[#D1FAE5] text-[#065F46]"
      : admissionsView.blendRisk === "Medium"
      ? "bg-[#FEF3C7] text-[#92400E]"
      : "bg-[#FEE2E2] text-[#991B1B]";

  return (
    <div className="rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white overflow-hidden">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-pencil" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Admissions Officer View
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-pencil transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-3 pb-3">
          <p className="text-xs text-[#CBD5E1] italic mb-3">"{admissionsView.firstImpression}"</p>

          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 inline-block ${riskColor}`}>
            Blend Risk: {admissionsView.blendRisk}
          </span>

          {/* Strengths, always visible */}
          <ul className="space-y-1 mb-3">
            {admissionsView.strengths.map((s, i) => (
              <li key={i} className="flex gap-1.5 text-xs text-[#CBD5E1]">
                <CheckCircle2 className="w-3 h-3 text-[#10B981] mt-0.5 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>

          {/* Concerns + standout, Pro only */}
          <UpgradeGate
            isLocked={!isPro}
            featureName="Full AO Analysis"
            description="See what's holding your essay back"
          >
            <div className="space-y-1">
              {admissionsView.concerns.map((c, i) => (
                <div key={i} className="flex gap-1.5 text-xs text-[#CBD5E1]">
                  <AlertTriangle className="w-3 h-3 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  {c}
                </div>
              ))}
              <p className="text-xs text-[#93C5FD] mt-2 italic">{admissionsView.standoutPotential}</p>
            </div>
          </UpgradeGate>
        </div>
      )}
    </div>
  );
}
