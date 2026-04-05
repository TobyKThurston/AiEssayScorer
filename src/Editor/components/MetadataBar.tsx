"use client";

import { useState } from "react";
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
}

export function MetadataBar({ essayType, targetSchools, essayPrompt, onChange }: MetadataBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSchool = (school: string) => {
    const updated = targetSchools.includes(school)
      ? targetSchools.filter((s) => s !== school)
      : [...targetSchools, school];
    onChange({ targetSchools: updated });
  };

  const summaryParts = [
    essayType || "No type",
    targetSchools.length > 0 ? targetSchools.slice(0, 2).join(", ") + (targetSchools.length > 2 ? ` +${targetSchools.length - 2}` : "") : "No schools",
  ];

  return (
    <div className="border-t border-slate-200 bg-[#F8FAFC]">
      <button
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-[#64748B] hover:bg-slate-100 transition-colors"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          <span className="font-medium text-[#475569]">Context:</span>
          <span>{summaryParts.join(" · ")}</span>
        </span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {/* Essay type */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileQuestion className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-xs font-medium text-[#475569]">Essay type</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {essayTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => onChange({ essayType: type })}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs text-left transition-all ${
                    essayType === type
                      ? "border-[#3B82F6] bg-[#DBEAFE]/30 text-[#3B82F6]"
                      : "border-slate-200 text-[#475569] hover:border-[#3B82F6]/30 hover:bg-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Target schools */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-xs font-medium text-[#475569]">Target schools</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SCHOOLS.map((school) => (
                <button
                  key={school}
                  onClick={() => toggleSchool(school)}
                  className={`px-2.5 py-1 rounded-full border text-xs transition-all ${
                    targetSchools.includes(school)
                      ? "border-[#3B82F6] bg-[#DBEAFE]/30 text-[#3B82F6]"
                      : "border-slate-200 text-[#475569] hover:border-[#3B82F6]/30 hover:bg-white"
                  }`}
                >
                  {school}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-xs font-medium text-[#475569]">
                Essay prompt <span className="text-[#94A3B8]">(optional)</span>
              </span>
            </div>
            <textarea
              className="w-full min-h-[72px] p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#3B82F6] resize-none transition-colors"
              placeholder="Paste the essay prompt for better analysis..."
              value={essayPrompt}
              onChange={(e) => onChange({ essayPrompt: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
