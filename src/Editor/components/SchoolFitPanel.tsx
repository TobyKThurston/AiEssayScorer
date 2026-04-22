"use client";

import { School } from "lucide-react";
import { SchoolFit } from "../types";
import { CollapsibleSection } from "./CollapsibleSection";
import { UpgradeGate } from "./UpgradeGate";

interface SchoolFitPanelProps {
  schoolFit: SchoolFit;
  targetSchools: string[];
  isPro: boolean;
}

function getSchoolFitColor(score: number) {
  if (score >= 8) return "text-[#10B981]";
  if (score >= 5) return "text-[#F59E0B]";
  return "text-[#EF4444]";
}

function getSchoolFitBarGradient(score: number) {
  if (score >= 8) return "from-[#10B981] to-[#059669]";
  if (score >= 5) return "from-[#F59E0B] to-[#D97706]";
  return "from-[#EF4444] to-[#DC2626]";
}

export function SchoolFitPanel({ schoolFit, targetSchools, isPro }: SchoolFitPanelProps) {
  const pct = Math.round((schoolFit.score / 10) * 100);

  const badge = (
    <span className={`text-xs font-bold ${getSchoolFitColor(schoolFit.score)}`}>
      {schoolFit.score}
      <span className="text-[10px] font-normal text-pencil">/10</span>
    </span>
  );

  return (
    <CollapsibleSection
      title={`School Fit${targetSchools.length > 0 ? `: ${targetSchools.join(", ")}` : ""}`}
      icon={<School className="w-3 h-3 text-[#8B5CF6]" />}
      iconBg="bg-[#EDE9FE]"
      defaultOpen={true}
      badge={badge}
    >
      <div className="mt-1 space-y-2">
        {/* Score bar */}
        <div>
          <div className="h-2 bg-paper-2 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getSchoolFitBarGradient(schoolFit.score)} rounded-full`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Feedback */}
        <p className="text-xs text-pencil leading-relaxed">{schoolFit.feedback}</p>

        {/* Tips, Pro only */}
        <UpgradeGate
          isLocked={!isPro}
          featureName="School-Specific Tips"
          description="Unlock targeted advice for each school"
        >
          <ul className="space-y-1.5 mt-1">
            {schoolFit.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-ink-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </UpgradeGate>
      </div>
    </CollapsibleSection>
  );
}
