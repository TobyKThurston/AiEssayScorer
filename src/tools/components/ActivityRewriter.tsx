"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface Rewrite {
  text: string;
  characterCount: number;
  emphasis: string;
}

export default function ActivityRewriter() {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [rewrites, setRewrites] = useState<Rewrite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim() || loading) return;
    setLoading(true);
    setError(null);
    setRewrites([]);
    setPaywall(false);

    try {
      const res = await fetch("/api/tools/activity-rewriter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ role, description }),
      });
      if (res.status === 402) {
        setPaywall(true);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setRewrites(data.rewrites ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function copy(text: string, idx: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
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
            Role / activity name
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Debate Team Captain"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition"
            maxLength={150}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Describe what you did (any length, we'll compress it)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Led weekly practices, coached novice team, took the team to states for the first time in 7 years, raised $4k for travel..."
            rows={5}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition resize-none"
            maxLength={1500}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !description.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Rewriting...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Generate 3 rewrites</>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {rewrites.length > 0 && (
        <div className="space-y-3">
          {rewrites.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EDE9FE] text-[#6D28D9]">
                  {r.emphasis}
                </span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${r.characterCount <= 150 ? "text-[#065F46]" : "text-[#B91C1C]"}`}>
                    {r.characterCount}/150
                  </span>
                  <button
                    onClick={() => copy(r.text, i)}
                    className="text-[#6366F1] hover:text-[#4F46E5] transition-colors"
                    type="button"
                    aria-label="Copy"
                  >
                    {copiedIdx === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-[#0F172A] text-[15px] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
