"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export function CollapsibleSection({
  title,
  icon,
  iconBg,
  defaultOpen = true,
  badge,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-md ${iconBg} flex items-center justify-center flex-shrink-0`}
          >
            {icon}
          </div>
          <span className="text-xs font-semibold text-[#475569]">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge}
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isOpen && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}
