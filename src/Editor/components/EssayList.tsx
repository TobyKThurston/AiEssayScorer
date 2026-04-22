"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  FileText,
  Clock,
  Zap,
  Target,
  BookOpen,
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles,
  BarChart2,
  AlertCircle,
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

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Write or paste your draft",
    desc: "Start fresh or drop in an existing essay.",
  },
  {
    step: "2",
    title: "Run an analysis",
    desc: "Scores on content, structure, clarity, and school fit.",
  },
  {
    step: "3",
    title: "Apply improvements",
    desc: "Line-level rewrites you can apply in one click.",
  },
];

const CARD_COLORS = [
  { bg: "bg-[#EFF6FF]", icon: "text-oxblood" },
  { bg: "bg-cream", icon: "text-[#8B5CF6]" },
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
        <div className="w-6 h-6 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
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
    <div className="max-w-[620px] mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-oxblood text-xs font-medium mb-5">
          <Sparkles className="w-3 h-3" />
          AI-powered essay review
        </div>
        <h1
          className="text-[1.625rem] sm:text-[2rem] font-bold text-ink mb-3 leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Write, review, and strengthen your college essays
        </h1>
        <p className="text-pencil text-sm sm:text-[15px] mb-6 sm:mb-7 leading-relaxed">
          Instant scores on clarity, structure, and admissions impact.
          Trusted by applicants targeting top schools.
        </p>
        <button
          onClick={onNew}
          disabled={creating}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] text-white text-sm font-semibold shadow-[0_2px_16px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_24px_rgba(59,130,246,0.45)] hover:-translate-y-px transition-all duration-200 disabled:opacity-70"
        >
          <Plus className="w-4 h-4" />
          {creating ? "Creating…" : "Start Writing"}
        </button>
        <p className="text-xs text-pencil mt-4">
          Top applicants revise their essays multiple times. Start now.
        </p>
      </div>

      {/* Feature row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {[
          { icon: Zap, label: "Line-by-line AI suggestions", color: "text-oxblood", bg: "bg-[#EFF6FF]" },
          { icon: Target, label: "Clarity and structure scores", color: "text-[#10B981]", bg: "bg-[#ECFDF5]" },
          { icon: BookOpen, label: "School fit analysis", color: "text-[#8B5CF6]", bg: "bg-cream" },
          { icon: Star, label: "Admissions officer perspective", color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]" },
        ].map(({ icon: Icon, label, color, bg }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-hair shadow-[0_1px_6px_rgba(148,163,184,0.07)]"
          >
            <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-3.5 h-3.5 ${color}`} />
            </div>
            <span className="text-xs font-medium text-ink-2">{label}</span>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-white border border-hair rounded-2xl p-5 sm:p-6 shadow-[0_1px_10px_rgba(148,163,184,0.07)]">
        <p className="text-[10px] font-semibold text-pencil uppercase tracking-wider mb-5">
          How it works
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step}>
              <div className="w-6 h-6 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[10px] font-bold text-oxblood mb-3">
                {step}
              </div>
              <p className="text-sm font-semibold text-ink mb-1 leading-snug">{title}</p>
              <p className="text-[11px] text-pencil leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Filled layout ─── */

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
    <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
      {/* Left */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h1
              className="text-xl font-bold text-ink tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              My Essays
            </h1>
            <p className="text-sm text-pencil mt-0.5">
              Write, review, and strengthen your application
            </p>
          </div>
          <button
            onClick={onNew}
            disabled={creating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] text-white text-sm font-semibold shadow-[0_2px_10px_rgba(59,130,246,0.28)] hover:shadow-[0_4px_18px_rgba(59,130,246,0.4)] hover:-translate-y-px transition-all duration-200 disabled:opacity-70 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            {creating ? "Creating…" : "Start Writing"}
          </button>
        </div>

        {/* Essay list */}
        <div className="space-y-2.5">
          {essays.map((essay, i) => (
            <EssayCard key={essay.id} essay={essay} colorIndex={i % 3} onOpen={onOpen} />
          ))}
        </div>

        {/* Below-list nudge */}
        <GetFeedbackNudge essays={essays} onOpen={onOpen} />

        {/* Credibility line */}
        <p className="text-[11px] text-[#CBD5E1] text-center mt-5">
          Small improvements to your essay can significantly impact admissions outcomes.
        </p>
      </div>

      {/* Right sidebar */}
      <div className="w-full lg:w-[256px] lg:flex-shrink-0 mt-8 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <ReviewEssayCard essays={essays} onOpen={onOpen} />
        </div>
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
      className="w-full text-left px-4 sm:px-5 py-4 rounded-2xl bg-white border border-hair shadow-[0_1px_6px_rgba(148,163,184,0.06)] hover:shadow-[0_4px_20px_rgba(148,163,184,0.12)] hover:border-[#3B82F6]/25 transition-all duration-200 group"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
          <FileText className={`w-4 h-4 ${icon}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
            <p className="text-sm font-semibold text-ink group-hover:text-oxblood transition-colors truncate max-w-full">
              {essay.title}
            </p>
            <span className="flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
              Not reviewed
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-pencil">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(essay.updated_at)}
            </span>
            <span className="text-[#CBD5E1] hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3 h-3" />
              No analysis yet
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-oxblood group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
      </div>
    </button>
  );
}

/* ─── Below-list nudge ─── */

function GetFeedbackNudge({
  essays,
  onOpen,
}: {
  essays: Essay[];
  onOpen: (id: string) => void;
}) {
  if (essays.length === 0) return null;
  const latest = essays[0];

  return (
    <div className="mt-4 px-4 sm:px-5 py-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-2">
            {essays.length === 1
              ? "Your essay hasn't been reviewed yet"
              : `${essays.length} essays haven't been reviewed yet`}
          </p>
          <p className="text-xs text-pencil mt-0.5">
            Open an essay and run an analysis to see how it scores.
          </p>
        </div>
      </div>
      <button
        onClick={() => onOpen(latest.id)}
        className="self-start sm:self-auto flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-hair text-xs font-semibold text-ink-2 hover:border-[#3B82F6]/40 hover:text-oxblood transition-all duration-200"
      >
        Get Feedback
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

/* ─── Sidebar panels ─── */

function ReviewEssayCard({
  essays,
  onOpen,
}: {
  essays: Essay[];
  onOpen: (id: string) => void;
}) {
  const latest = essays[0];

  return (
    <div className="rounded-2xl overflow-hidden border border-[#1E3A5F]/10 bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]">
      <div className="p-5">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2">
          Recommended
        </p>
        <p className="text-sm font-semibold text-white mb-1.5 leading-snug">
          See how strong your essay actually is
        </p>
        <p className="text-[11px] text-white/55 leading-relaxed mb-4">
          Instant scores on clarity, structure, and admissions impact.
        </p>
        <button
          onClick={() => onOpen(latest.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB] transition-colors"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Review Latest Essay
        </button>
      </div>
    </div>
  );
}

function WhatYouGetCard() {
  const features = [
    { icon: Zap, label: "Line-by-line AI suggestions", color: "text-oxblood" },
    { icon: Target, label: "Clarity and structure scores", color: "text-[#10B981]" },
    { icon: BookOpen, label: "School fit analysis", color: "text-[#8B5CF6]" },
    { icon: Star, label: "Admissions officer view", color: "text-[#F59E0B]" },
  ];

  return (
    <div className="bg-white border border-hair rounded-2xl p-5 shadow-[0_1px_6px_rgba(148,163,184,0.06)]">
      <p className="text-[10px] font-semibold text-pencil uppercase tracking-wider mb-4">
        What you get
      </p>
      <ul className="space-y-3">
        {features.map(({ icon: Icon, label, color }) => (
          <li key={label} className="flex items-center gap-2.5">
            <div className={`w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-3 h-3 ${color}`} />
            </div>
            <span className="text-xs text-ink-2 font-medium">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorksCard() {
  return (
    <div className="bg-white border border-hair rounded-2xl p-5 shadow-[0_1px_6px_rgba(148,163,184,0.06)]">
      <p className="text-[10px] font-semibold text-pencil uppercase tracking-wider mb-4">
        How it works
      </p>
      <div className="space-y-4">
        {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
          <div key={step} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[10px] font-bold text-oxblood flex-shrink-0 mt-0.5">
              {step}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#1E293B]">{title}</p>
              <p className="text-[11px] text-pencil leading-relaxed mt-0.5">{desc}</p>
            </div>
            {i < HOW_IT_WORKS.length - 1 && (
              <div className="absolute" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
