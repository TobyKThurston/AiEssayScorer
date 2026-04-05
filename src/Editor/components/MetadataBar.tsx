"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, GraduationCap, FileQuestion, Target } from "lucide-react";

const essayTypes = [
  "Common App Personal Statement",
  "UC Personal Insight Question",
  "Coalition App Essay",
  "Supplemental Essay",
  "Scholarship Essay",
  "Other",
];

const SCHOOLS = [
  "Harvard",
  "Yale",
  "Princeton",
  "Stanford",
  "MIT",
  "Columbia",
  "UPenn",
  "Brown",
  "Dartmouth",
  "Cornell",
];

interface MetadataBarProps {
  essayType: string;
  targetSchools: string[];
  essayPrompt: string;
  onChange: (fields: { essayType?: string; targetSchools?: string[]; essayPrompt?: string }) => void;
  /** When true the bar opens and stays open until the user closes it */
  forceOpen?: boolean;
  onForceOpenHandled?: () => void;
}

export function MetadataBar({
  essayType,
  targetSchools,
  essayPrompt,
  onChange,
  forceOpen,
  onForceOpenHandled,
}: MetadataBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      onForceOpenHandled?.();
    }
  }, [forceOpen, onForceOpenHandled]);

  const toggleSchool = (school: string) => {
    const updated = targetSchools.includes(school)
      ? targetSchools.filter((s) => s !== school)
      : [...targetSchools, school];
    onChange({ targetSchools: updated });
  };

  const summaryParts = [
    essayType || "No type selected",
    targetSchools.length > 0
      ? targetSchools.slice(0, 2).join(", ") +
        (targetSchools.length > 2 ? ` +${targetSchools.length - 2}` : "")
      : "No schools",
  ];

  return (
    <div className="border-t border-slate-200 bg-white">
      <button
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-[#64748B] hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="font-semibold text-[#475569] flex-shrink-0">Essay context</span>
          <span className="truncate text-[#94A3B8]">{summaryParts.join(" · ")}</span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 flex-shrink-0 ml-2" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 ml-2" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-5 space-y-5 border-t border-slate-100">
          {/* Essay type */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-2.5">
              <FileQuestion className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-xs font-semibold text-[#475569]">Essay type</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {essayTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => onChange({ essayType: type })}
                  className={`px-2.5 py-2 rounded-lg border text-xs text-left transition-all leading-snug ${
                    essayType === type
                      ? "border-[#3B82F6] bg-[#EFF6FF] text-[#2563EB] font-medium"
                      : "border-slate-200 text-[#475569] hover:border-[#3B82F6]/40 hover:bg-slate-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Target schools */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-xs font-semibold text-[#475569]">Target schools</span>
              <span className="text-xs text-[#94A3B8]">(select all that apply)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SCHOOLS.map((school) => (
                <button
                  key={school}
                  onClick={() => toggleSchool(school)}
                  className={`px-2.5 py-1 rounded-full border text-xs transition-all ${
                    targetSchools.includes(school)
                      ? "border-[#3B82F6] bg-[#EFF6FF] text-[#2563EB] font-medium"
                      : "border-slate-200 text-[#475569] hover:border-[#3B82F6]/40 hover:bg-slate-50"
                  }`}
                >
                  {school}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Target className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-xs font-semibold text-[#475569]">Essay prompt</span>
              <span className="text-xs text-[#94A3B8]">(optional — improves analysis)</span>
            </div>
            <textarea
              className="w-full min-h-[80px] p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#3B82F6] focus:bg-white resize-none transition-colors"
              placeholder="Paste the essay prompt here for more targeted feedback..."
              value={essayPrompt}
              onChange={(e) => onChange({ essayPrompt: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
