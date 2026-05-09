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
        className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7 space-y-4 sm:space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Role / activity name
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Debate Team Captain"
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition"
            maxLength={150}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Describe what you did (any length, we'll compress it)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Led weekly practices, coached novice team, took the team to states for the first time in 7 years, raised $4k for travel..."
            rows={5}
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none"
            maxLength={1500}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !description.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Rewriting...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Generate 3 rewrites</>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {rewrites.length > 0 && (
        <div className="space-y-3">
          {rewrites.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-paper-2 text-oxblood">
                  {r.emphasis}
                </span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${r.characterCount <= 150 ? "text-forest" : "text-[#B91C1C]"}`}>
                    {r.characterCount}/150
                  </span>
                  <button
                    onClick={() => copy(r.text, i)}
                    className="text-oxblood hover:text-oxblood-2 transition-colors"
                    type="button"
                    aria-label="Copy"
                  >
                    {copiedIdx === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-ink text-[15px] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
