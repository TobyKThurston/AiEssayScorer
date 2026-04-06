"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  FileText,
  Clock,
  ChevronRight,
  Zap,
  Target,
  BookOpen,
  Layers,
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Essay } from "../types";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const VALUE_PILLS = [
  { icon: Zap, label: "AI Feedback", color: "text-[#3B82F6]", bg: "bg-[#EFF6FF]" },
  { icon: Layers, label: "Structure Analysis", color: "text-[#8B5CF6]", bg: "bg-[#F5F3FF]" },
  { icon: Target, label: "Clarity Review", color: "text-[#10B981]", bg: "bg-[#ECFDF5]" },
  { icon: Star, label: "Ivy-Level Insights", color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]" },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Write or paste your draft",
    desc: "Start fresh or paste an existing essay into the editor.",
  },
  {
    step: "2",
    title: "Get instant AI feedback",
    desc: "Scores on content, structure, clarity, and school fit.",
  },
  {
    step: "3",
    title: "Apply targeted improvements",
    desc: "Line-level rewrites and suggestions you can apply in one click.",
  },
];

const CARD_COLORS = [
  { bg: "bg-[#EFF6FF]", icon: "text-[#3B82F6]" },
  { bg: "bg-[#F5F3FF]", icon: "text-[#8B5CF6]" },
  { bg: "bg-[#ECFDF5]", icon: "text-[#10B981]" },
];

export function EssayList() {
  const router = useRouter();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/essays")
      .then((r) => r.json())
      .then((data) => setEssays(data.essays ?? []))
      .catch(() => setEssays([]))
      .finally(() => setLoading(false));
  }, []);

  const handleNew = async () => {
    setCreating(true);
    setCreateError(null);
    try {
      const res = await fetch("/api/essays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled Essay" }),
      });
      const data = await res.json();
      if (data.essay) {
        router.push(`/editor/${data.essay.id}`);
        return;
      }
      setCreateError(
        data.error || "Failed to create essay. Have you run the database migration?"
      );
    } catch {
      setCreateError("Failed to create essay. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-7 h-7 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1080px] mx-auto px-6 py-10">
      {createError && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {createError}
        </div>
      )}

      {essays.length === 0 ? (
        <EmptyState onNew={handleNew} creating={creating} />
      ) : (
        <FilledLayout
          essays={essays}
          onNew={handleNew}
          creating={creating}
          onOpen={(id) => router.push(`/editor/${id}`)}
        />
      )}
    </div>
  );
}

/* ─── Empty state ─── */

function EmptyState({ onNew, creating }: { onNew: () => void; creating: boolean }) {
  return (
    <div className="max-w-[640px] mx-auto">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#3B82F6] text-xs font-medium mb-5">
          <Sparkles className="w-3 h-3" />
          AI-powered essay review
        </div>
        <h1
          className="text-3xl font-bold text-[#0F172A] mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Write, review, and strengthen your college essays
        </h1>
        <p className="text-[#64748B] text-base mb-7 leading-relaxed">
          Get instant feedback on clarity, structure, and impact. Trusted by applicants
          targeting top schools.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onNew}
            disabled={creating}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] text-white text-sm font-semibold shadow-[0_2px_16px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_24px_rgba(59,130,246,0.45)] hover:-translate-y-px transition-all duration-200 disabled:opacity-70"
          >
            <Plus className="w-4 h-4" />
            {creating ? "Creating…" : "Start Writing"}
          </button>
          <a
            href="/upload"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-[#475569] text-sm font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            Quick Review
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Value pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {VALUE_PILLS.map(({ icon: Icon, label, color, bg }) => (
          <div
            key={label}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${bg} text-xs font-medium ${color}`}
          >
            <Icon className="w-3 h-3" />
            {label}
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_16px_rgba(148,163,184,0.07)]">
        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-5">
          How it works
        </p>
        <div className="grid grid-cols-3 gap-5">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step}>
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] flex items-center justify-center text-xs font-bold text-[#3B82F6] mb-3">
                {step}
              </div>
              <p className="text-sm font-semibold text-[#0F172A] mb-1">{title}</p>
              <p className="text-xs text-[#64748B] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Filled layout (1+ essays) ─── */

function FilledLayout({
  essays,
  onNew,
  creating,
  onOpen,
}: {
  essays: Essay[];
  onNew: () => void;
  creating: boolean;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="flex gap-7 items-start">
      {/* Left — essay list */}
      <div className="flex-1 min-w-0">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1
              className="text-xl font-bold text-[#0F172A]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              My Essays
            </h1>
            <p className="text-sm text-[#94A3B8] mt-0.5">
              {essays.length} {essays.length === 1 ? "essay" : "essays"}
            </p>
          </div>
          <button
            onClick={onNew}
            disabled={creating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] text-white text-sm font-semibold shadow-[0_2px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_18px_rgba(59,130,246,0.4)] hover:-translate-y-px transition-all duration-200 disabled:opacity-70"
          >
            <Plus className="w-4 h-4" />
            {creating ? "Creating…" : "New Essay"}
          </button>
        </div>

        <div className="space-y-2.5">
          {essays.map((essay, i) => (
            <EssayCard key={essay.id} essay={essay} colorIndex={i % 3} onOpen={onOpen} />
          ))}
        </div>
      </div>

      {/* Right — sidebar */}
      <div className="w-[260px] flex-shrink-0 space-y-4">
        <NextStepCard onNew={onNew} creating={creating} />
        <WhatYouGetCard />
        <HowItWorksCard />
      </div>
    </div>
  );
}

/* ─── Essay card ─── */

function EssayCard({
  essay,
  colorIndex,
  onOpen,
}: {
  essay: Essay;
  colorIndex: number;
  onOpen: (id: string) => void;
}) {
  const { bg, icon } = CARD_COLORS[colorIndex];

  return (
    <button
      onClick={() => onOpen(essay.id)}
      className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-slate-200 shadow-[0_1px_8px_rgba(148,163,184,0.07)] hover:shadow-[0_4px_20px_rgba(148,163,184,0.13)] hover:border-[#3B82F6]/20 transition-all duration-200 group"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
        >
          <FileText className={`w-4 h-4 ${icon}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors truncate">
              {essay.title}
            </p>
            <span className="flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-[#64748B]">
              Draft
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
            <Clock className="w-3 h-3" />
            <span>{formatDate(essay.updated_at)}</span>
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#3B82F6] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
      </div>
    </button>
  );
}

/* ─── Sidebar panels ─── */

function NextStepCard({ onNew, creating }: { onNew: () => void; creating: boolean }) {
  return (
    <div className="bg-gradient-to-br from-[#1D4ED8] to-[#0EA5E9] rounded-2xl p-5 text-white">
      <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2">
        Next step
      </p>
      <p className="text-sm font-semibold mb-1.5 leading-snug">
        Get AI feedback on your draft
      </p>
      <p className="text-xs text-white/65 mb-4 leading-relaxed">
        Open any essay to get scores on structure, clarity, and school fit in seconds.
      </p>
      <button
        onClick={onNew}
        disabled={creating}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-[#1D4ED8] text-xs font-semibold hover:bg-white/90 transition-colors disabled:opacity-70"
      >
        <Plus className="w-3.5 h-3.5" />
        {creating ? "Creating…" : "New essay"}
      </button>
    </div>
  );
}

function WhatYouGetCard() {
  const features = [
    { icon: Zap, label: "Line-by-line AI suggestions", color: "text-[#3B82F6]" },
    { icon: Target, label: "Clarity and structure scores", color: "text-[#10B981]" },
    { icon: BookOpen, label: "School fit analysis", color: "text-[#8B5CF6]" },
    { icon: Star, label: "Admissions officer view", color: "text-[#F59E0B]" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_1px_8px_rgba(148,163,184,0.06)]">
      <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-3.5">
        What you get
      </p>
      <ul className="space-y-2.5">
        {features.map(({ icon: Icon, label, color }) => (
          <li key={label} className="flex items-center gap-2.5">
            <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${color}`} />
            <span className="text-xs text-[#475569]">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorksCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_1px_8px_rgba(148,163,184,0.06)]">
      <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-3.5">
        How it works
      </p>
      <div className="space-y-3.5">
        {HOW_IT_WORKS.map(({ step, title, desc }) => (
          <div key={step} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[10px] font-bold text-[#3B82F6] flex-shrink-0 mt-0.5">
              {step}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0F172A]">{title}</p>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
