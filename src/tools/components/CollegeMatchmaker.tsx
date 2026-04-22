"use client";

import { useState } from "react";
import { Sparkles, Loader2, GraduationCap, AlertTriangle, Compass } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface Match {
  school: string;
  tier: "reach" | "target" | "likely";
  whyItFits: string;
}

interface Result {
  readingOfYou: string;
  matches: Match[];
  schoolsToAvoid: string[];
  essayAnchorForEveryWhyEssay: string;
}

const TIER_COLORS: Record<Match["tier"], { bg: string; text: string; label: string }> = {
  reach: { bg: "bg-[#FEE2E2]", text: "text-[#B91C1C]", label: "Reach" },
  target: { bg: "bg-paper-2", text: "text-oxblood", label: "Target" },
  likely: { bg: "bg-paper-2", text: "text-forest", label: "Likely" },
};

export default function CollegeMatchmaker() {
  const [essay, setEssay] = useState("");
  const [stats, setStats] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!essay.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaywall(false);
    try {
      const res = await fetch("/api/tools/college-matchmaker-from-essay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ essay, stats }),
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
      <form onSubmit={handleSubmit} className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Paste your personal statement</label>
          <textarea value={essay} onChange={(e) => setEssay(e.target.value)} placeholder="Paste your Common App personal statement..." rows={12} className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono" maxLength={6000} required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Stats & context <span className="font-normal text-pencil">(optional, helps with tiering)</span></label>
          <input type="text" value={stats} onChange={(e) => setStats(e.target.value)} placeholder="e.g., GPA 3.85, SAT 1480, intended major: English, NY public school" className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition" maxLength={500} />
        </div>
        <button type="submit" disabled={loading || !essay.trim()} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Matching...</> : <><Sparkles className="w-4 h-4" /> Match me to colleges</>}
        </button>
      </form>

      {error && <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">{error}</div>}

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-oxblood to-oxblood-2 p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">What your essay reveals about you</p>
            <p className="text-[15px] leading-relaxed">{result.readingOfYou}</p>
          </div>
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-oxblood"><GraduationCap className="w-4 h-4" /></span>
              <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>10 schools that fit your voice</h3>
            </div>
            <div className="space-y-3">
              {result.matches.map((m, i) => {
                const tier = TIER_COLORS[m.tier] ?? TIER_COLORS.target;
                return (
                  <div key={i} className="rounded-xl bg-cream border border-hair p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-semibold text-ink">{m.school}</p>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tier.bg} ${tier.text}`}>{tier.label}</span>
                    </div>
                    <p className="text-sm text-ink-2 leading-relaxed">{m.whyItFits}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-oxblood"><AlertTriangle className="w-4 h-4" /></span>
              <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Types of schools to avoid</h3>
            </div>
            <ul className="space-y-2">
              {result.schoolsToAvoid.map((s, i) => <li key={i} className="text-[14.5px] text-ink leading-relaxed">• {s}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#92400E]" />
              <p className="text-xs font-semibold text-[#92400E] uppercase tracking-widest">The thread for every Why essay</p>
            </div>
            <p className="text-[15px] text-[#78350F] leading-relaxed">{result.essayAnchorForEveryWhyEssay}</p>
          </div>
        </div>
      )}
    </div>
  );
}
