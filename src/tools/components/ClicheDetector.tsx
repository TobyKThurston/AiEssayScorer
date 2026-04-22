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
        className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Paste your essay draft
          </label>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Paste up to ~800 words here..."
            rows={12}
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono"
            maxLength={6000}
            required
          />
          <div className="text-xs text-pencil mt-2">{essay.length}/6000 chars</div>
        </div>
        <button
          type="submit"
          disabled={loading || !essay.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Scanning...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Scan for clichés</>
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
          <div className="rounded-2xl bg-gradient-to-br from-oxblood to-oxblood-2 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">
              Overall take
            </p>
            <p className="text-[15px] leading-relaxed">{result.overallTake}</p>
          </div>

          {result.findings.length === 0 ? (
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair p-6 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest" />
              <p className="text-ink text-sm">No clichés detected. Strong voice.</p>
            </div>
          ) : (
            result.findings.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-oxblood flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-ink mb-1">"{f.phrase}"</p>
                    <p className="text-xs text-pencil">{f.location}</p>
                  </div>
                </div>
                <p className="text-sm text-ink-2 mb-3 leading-relaxed">
                  <span className="font-semibold text-ink">Why it reads as cliché: </span>
                  {f.whyItsACliche}
                </p>
                <div className="rounded-lg bg-cream border border-hair p-3">
                  <p className="text-xs font-semibold text-oxblood uppercase tracking-wider mb-1">
                    Try instead
                  </p>
                  <p className="text-sm text-ink leading-relaxed">{f.suggestedReplacement}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
