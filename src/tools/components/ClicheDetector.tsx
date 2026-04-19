"use client";

import { useState } from "react";
import { Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface ClicheFinding {
  phrase: string;
  location: string;
  whyItsACliche: string;
  suggestedReplacement: string;
}

interface Result {
  overallTake: string;
  findings: ClicheFinding[];
}

export default function ClicheDetector() {
  const [essay, setEssay] = useState("");
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
      const res = await fetch("/api/tools/cliche-detector", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ essay }),
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
        className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Paste your essay draft
          </label>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Paste up to ~800 words here..."
            rows={12}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition resize-none font-mono"
            maxLength={6000}
            required
          />
          <div className="text-xs text-[#94A3B8] mt-2">{essay.length}/6000 chars</div>
        </div>
        <button
          type="submit"
          disabled={loading || !essay.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Scanning...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Scan for clichés</>
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
          <div className="rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">
              Overall take
            </p>
            <p className="text-[15px] leading-relaxed">{result.overallTake}</p>
          </div>

          {result.findings.length === 0 ? (
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 p-6 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#065F46]" />
              <p className="text-[#0F172A] text-sm">No clichés detected. Strong voice.</p>
            </div>
          ) : (
            result.findings.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-[#BE185D] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A] mb-1">"{f.phrase}"</p>
                    <p className="text-xs text-[#94A3B8]">{f.location}</p>
                  </div>
                </div>
                <p className="text-sm text-[#475569] mb-3 leading-relaxed">
                  <span className="font-semibold text-[#0F172A]">Why it reads as cliché: </span>
                  {f.whyItsACliche}
                </p>
                <div className="rounded-lg bg-[#F5F3FF] border border-[#E0E7FF] p-3">
                  <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-1">
                    Try instead
                  </p>
                  <p className="text-sm text-[#0F172A] leading-relaxed">{f.suggestedReplacement}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
