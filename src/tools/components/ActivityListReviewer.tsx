"use client";

import { useState } from "react";
import { Sparkles, Loader2, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface ReviewResult {
  story: string;
  topStrengths: string[];
  gaps: string[];
  weakest: { label: string; why: string; fix: string }[];
  overlap: string;
  oneChange: string;
}

export default function ActivityListReviewer() {
  const [activities, setActivities] = useState<string[]>(Array(10).fill(""));
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  function updateActivity(i: number, value: string) {
    setActivities((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const filled = activities.map((a) => a.trim()).filter(Boolean);
    if (filled.length === 0 || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaywall(false);
    try {
      const res = await fetch("/api/tools/activity-list-reviewer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ activities: filled }),
      });
      if (res.status === 402) {
        setPaywall(true);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {paywall && <PaywallBanner />}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-4"
      >
        <p className="text-sm text-[#64748B] leading-relaxed">
          Paste your 10 Common App activity descriptions (role + description, 150 characters each). You don&apos;t need to fill all 10 to get a review.
        </p>
        {activities.map((val, i) => (
          <div key={i}>
            <label className="block text-xs font-semibold text-[#64748B] mb-1">
              Activity {i + 1}
            </label>
            <input
              type="text"
              value={val}
              onChange={(e) => updateActivity(i, e.target.value)}
              placeholder={i === 0 ? "e.g., Debate team captain — Led weekly practices, coached novice team, took team to states for the first time in 7 years" : ""}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition"
              maxLength={500}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading || activities.every((a) => !a.trim())}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Reviewing...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Review my activity list</>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">The story your list tells</p>
            <p className="text-[15px] leading-relaxed">{result.story}</p>
          </div>

          <Panel title="Top strengths" icon={<CheckCircle2 className="w-4 h-4" />} accent="#065F46" accentBg="#D1FAE5">
            <ul className="space-y-2">
              {result.topStrengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-[#0F172A] text-[14.5px] leading-relaxed">
                  <span className="text-[#065F46]">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Gaps & overrepresented themes" icon={<AlertCircle className="w-4 h-4" />} accent="#BE185D" accentBg="#FCE7F3">
            <ul className="space-y-2">
              {result.gaps.map((g, i) => (
                <li key={i} className="flex gap-2 text-[#0F172A] text-[14.5px] leading-relaxed">
                  <span className="text-[#BE185D]">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14.5px] text-[#475569] leading-relaxed border-l-2 border-[#FCE7F3] pl-3">
              <span className="font-semibold text-[#0F172A]">Overlap: </span>{result.overlap}
            </p>
          </Panel>

          {result.weakest.length > 0 && (
            <Panel title="Weakest entries" icon={<AlertCircle className="w-4 h-4" />} accent="#92400E" accentBg="#FEF3C7">
              <div className="space-y-3">
                {result.weakest.map((w, i) => (
                  <div key={i} className="rounded-lg bg-white/60 p-3">
                    <p className="font-semibold text-[#0F172A] text-sm">{w.label}</p>
                    <p className="text-sm text-[#64748B] mt-1">{w.why}</p>
                    <p className="text-sm text-[#0F172A] mt-2"><span className="font-semibold">Fix:</span> {w.fix}</p>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          <div className="rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-[#92400E]" />
              <p className="text-xs font-semibold text-[#92400E] uppercase tracking-widest">
                The one change
              </p>
            </div>
            <p className="text-[15px] text-[#78350F] leading-relaxed">{result.oneChange}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Panel({
  title,
  icon,
  accent,
  accentBg,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg" style={{ backgroundColor: accentBg, color: accent }}>
          {icon}
        </span>
        <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
