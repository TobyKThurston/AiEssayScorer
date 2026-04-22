"use client";

import { useState } from "react";
import { Sparkles, Loader2, Target, AlertTriangle, Compass, KeyRound } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface Breakdown {
  hiddenQuestion: string;
  whatToAvoid: string[];
  recommendedAngles: string[];
  keywordsToInclude: string[];
  onePieceOfAdvice: string;
}

export default function PromptDeconstructor({
  defaultPromptText = "",
  lockPromptText = false,
}: {
  defaultPromptText?: string;
  lockPromptText?: boolean;
} = {}) {
  const [school, setSchool] = useState("");
  const [promptText, setPromptText] = useState(defaultPromptText);
  const [result, setResult] = useState<Breakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!promptText.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaywall(false);

    try {
      const res = await fetch("/api/tools/prompt-deconstructor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ school, promptText }),
      });
      if (res.status === 402) {
        setPaywall(true);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Try again.");
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
        className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            School <span className="font-normal text-pencil">(optional)</span>
          </label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="e.g., Stanford, Duke, Columbia"
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition"
            maxLength={100}
          />
        </div>

        {!lockPromptText && (
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Paste the supplemental prompt
            </label>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g., Tell us about something that is meaningful to you and why. (250 words)"
              rows={5}
              className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none"
              maxLength={1500}
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !promptText.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Deconstruct prompt
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <ResultCard
            icon={<Target className="w-4 h-4" />}
            title="What they're really asking"
            accent="#6D28D9"
            accentBg="#EDE9FE"
          >
            <p className="text-ink leading-relaxed">{result.hiddenQuestion}</p>
          </ResultCard>

          <ResultCard
            icon={<Compass className="w-4 h-4" />}
            title="Angles that stand out"
            accent="#065F46"
            accentBg="#D1FAE5"
          >
            <ul className="space-y-2">
              {result.recommendedAngles.map((a, i) => (
                <li key={i} className="flex gap-2 text-ink leading-relaxed">
                  <span className="text-forest font-semibold">{i + 1}.</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </ResultCard>

          <ResultCard
            icon={<AlertTriangle className="w-4 h-4" />}
            title="What to avoid"
            accent="#BE185D"
            accentBg="#FCE7F3"
          >
            <ul className="space-y-2">
              {result.whatToAvoid.map((a, i) => (
                <li key={i} className="flex gap-2 text-ink leading-relaxed">
                  <span className="text-oxblood">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </ResultCard>

          <ResultCard
            icon={<KeyRound className="w-4 h-4" />}
            title="Signals to include"
            accent="#1D4ED8"
            accentBg="#DBEAFE"
          >
            <div className="flex flex-wrap gap-2">
              {result.keywordsToInclude.map((k, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-paper-2 text-oxblood"
                >
                  {k}
                </span>
              ))}
            </div>
          </ResultCard>

          <div className="rounded-2xl bg-gradient-to-br from-oxblood to-oxblood-2 p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">
              The one thing
            </p>
            <p className="text-[15px] leading-relaxed">{result.onePieceOfAdvice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultCard({
  icon,
  title,
  accent,
  accentBg,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  accentBg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ backgroundColor: accentBg, color: accent }}
        >
          {icon}
        </span>
        <h3
          className="text-sm font-extrabold text-ink uppercase tracking-wider"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
      </div>
      <div className="text-[14.5px]">{children}</div>
    </div>
  );
}
