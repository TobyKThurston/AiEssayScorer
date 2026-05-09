"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Loader2, Check, Lock, Gauge, ShieldCheck, Lightbulb } from "lucide-react";

interface Rating {
  score: number;
  contentScore: number;
  structureScore: number;
  styleScore: number;
  specificityScore: number;
  grammarScore: number;
  firstImpression: string;
  strengths: string[];
  improvements: string[];
  blendRisk: "Low" | "Medium" | "High";
  standoutMove: string;
}

export default function PublicScorer({
  defaultSchools = "",
  lockSchools = false,
}: {
  defaultSchools?: string;
  lockSchools?: boolean;
} = {}) {
  const [essay, setEssay] = useState("");
  const [prompt, setPrompt] = useState("");
  const [schools, setSchools] = useState(defaultSchools);
  const [rating, setRating] = useState<Rating | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gate, setGate] = useState<"login" | "pro" | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!essay.trim() || loading) return;
    setLoading(true);
    setError(null);
    setRating(null);
    setGate(null);

    try {
      const res = await fetch("/api/score-public", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          essay,
          prompt,
          targetSchools: schools
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });

      if (res.status === 402) {
        const data = await res.json().catch(() => ({}));
        setGate(data.gate ?? "login");
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setRating(data.rating);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (gate) {
    return <ScoreGate variant={gate} />;
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7 space-y-4 sm:space-y-5"
      >
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <label className="block text-sm font-semibold text-ink">
              Paste your essay draft
            </label>
            <button
              type="submit"
              disabled={loading || !essay.trim()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            >
              {loading ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Scoring…</>
              ) : (
                <><Sparkles className="w-3.5 h-3.5" /> Score</>
              )}
            </button>
          </div>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Paste your personal statement or supplemental essay here..."
            rows={10}
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono"
            maxLength={10000}
            required
          />
          <div className="text-xs text-pencil mt-2">{essay.length}/10,000 chars</div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Essay prompt <span className="font-normal text-pencil">(optional)</span>
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Common App #1, or the supplemental prompt"
              rows={2}
              className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none"
              maxLength={1500}
            />
          </div>
          {!lockSchools && (
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Target schools <span className="font-normal text-pencil">(comma separated, optional)</span>
              </label>
              <input
                type="text"
                value={schools}
                onChange={(e) => setSchools(e.target.value)}
                placeholder="e.g., Stanford, Duke, Pomona"
                className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition"
                maxLength={400}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !essay.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Scoring...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Score my essay free</>
          )}
        </button>
        <p className="text-xs text-pencil">
          Free. No signup required. 1 review per day, then log in for more.
        </p>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {rating && <RatingDisplay rating={rating} />}
    </div>
  );
}

function RatingDisplay({ rating }: { rating: Rating }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-oxblood to-oxblood-2 p-5 sm:p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">
          Overall score
        </p>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-6xl font-extrabold" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
            {rating.score}
          </span>
          <span className="text-xl opacity-80 pb-2">/ 100</span>
        </div>
        <p className="text-[15px] leading-relaxed opacity-95">{rating.firstImpression}</p>
      </div>

      <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-oxblood">
            <Gauge className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
            Rubric breakdown
          </h3>
        </div>
        <div className="space-y-3">
          <ScoreBar label="Content & message" score={rating.contentScore} max={30} />
          <ScoreBar label="Structure" score={rating.structureScore} max={25} />
          <ScoreBar label="Style & voice" score={rating.styleScore} max={25} />
          <ScoreBar label="Specificity" score={rating.specificityScore} max={10} />
          <ScoreBar label="Grammar" score={rating.grammarScore} max={10} />
        </div>
        <div className="mt-5 pt-5 border-t border-hair flex items-center justify-between">
          <span className="text-sm text-ink-2">Blend-in risk</span>
          <span
            className={
              rating.blendRisk === "Low"
                ? "text-xs font-semibold px-2.5 py-1 rounded-full bg-paper-2 text-forest"
                : rating.blendRisk === "High"
                ? "text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#B91C1C]"
                : "text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E]"
            }
          >
            {rating.blendRisk}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-forest">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
            Strengths
          </h3>
        </div>
        <ul className="space-y-2">
          {rating.strengths.map((s, i) => (
            <li key={i} className="flex gap-2 text-[14.5px] text-ink leading-relaxed">
              <Check className="w-4 h-4 text-forest flex-shrink-0 mt-1" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-oxblood">
            <Lightbulb className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
            Top improvements
          </h3>
        </div>
        <ol className="space-y-3">
          {rating.improvements.map((s, i) => (
            <li key={i} className="flex gap-2 text-[14.5px] text-ink leading-relaxed">
              <span className="font-semibold text-oxblood">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] p-6">
        <p className="text-xs font-semibold text-[#92400E] uppercase tracking-widest mb-2">
          The one change
        </p>
        <p className="text-[15px] text-[#78350F] leading-relaxed">{rating.standoutMove}</p>
      </div>

      <SignupTeaser />
    </div>
  );
}

function ScoreBar({ label, score, max }: { label: string; score: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-ink-2">{label}</span>
        <span className="font-semibold text-ink">
          {score}<span className="text-pencil">/{max}</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-paper-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-oxblood to-[#8B5CF6]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SignupTeaser() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-5 sm:p-7 text-white">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-4 h-4" />
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
          Unlock the full review
        </p>
      </div>
      <h3 className="text-2xl font-extrabold mb-4" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}>
        Create a free account to see what&apos;s hidden.
      </h3>
      <ul className="space-y-2 text-sm opacity-90 mb-6">
        {[
          "Line-by-line rewrites of your weakest sentences",
          "3 alternative opening hooks tailored to your draft",
          "Admissions-officer view: strengths, concerns, stand-out potential",
          "Save drafts, track versions, and review more essays",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/auth/login?next=/editor"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-ink font-semibold text-sm hover:bg-white/95 transition-colors"
        >
          Sign up free
        </Link>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-transparent text-white font-semibold text-sm border border-white/30 hover:bg-white/10 transition-colors"
        >
          Upgrade to Pro
        </Link>
      </div>
    </div>
  );
}

function ScoreGate({ variant }: { variant: "login" | "pro" }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-oxblood via-[#7C3AED] to-[#8B5CF6] p-8 text-white shadow-[0_8px_32px_rgba(99,102,241,0.3)]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4" />
        <p className="text-xs font-semibold uppercase tracking-widest opacity-90">
          {variant === "login" ? "You used your free review" : "You used your daily Pro trial"}
        </p>
      </div>
      <h3 className="text-2xl font-extrabold mb-3" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}>
        {variant === "login"
          ? "Create a free account for more free reviews"
          : "Upgrade to Pro for unlimited scoring"}
      </h3>
      <ul className="space-y-2 text-sm opacity-95 mb-6">
        {(variant === "login"
          ? [
              "2 more free essay reviews on the house",
              "Save and version your drafts",
              "Line-by-line rewrite suggestions",
              "Hook alternatives tailored to your draft",
            ]
          : [
              "Unlimited full essay reviews, every day",
              "Line-by-line rewrite suggestions",
              "Admissions-officer simulation",
              "Unlimited tool runs across every tool",
            ]
        ).map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <Link
          href={variant === "login" ? "/auth/login?next=/try" : "/editor"}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-oxblood font-semibold text-sm hover:bg-white/95 transition-colors"
        >
          {variant === "login" ? "Sign up free" : "Upgrade to Pro"}
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-transparent text-white font-semibold text-sm border border-hair hover:bg-white/10 transition-colors"
        >
          Try our free tools
        </Link>
      </div>
    </div>
  );
}
