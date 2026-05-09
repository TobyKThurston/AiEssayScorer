"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

export default function ShowDontTell() {
  const [sentence, setSentence] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sentence.trim() || loading) return;
    setLoading(true);
    setError(null);
    setOutput("");
    setPaywall(false);

    try {
      const res = await fetch("/api/tools/show-dont-tell", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sentence, context }),
      });
      if (res.status === 402) {
        setPaywall(true);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream.");
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
      }
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
        className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7 space-y-4 sm:space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            The sentence that tells
          </label>
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="e.g., I was really nervous before the audition."
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition"
            maxLength={300}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Context <span className="font-normal text-pencil">(optional, helps make it specific)</span>
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., It was the callback for my school's spring musical, standing outside the choir room..."
            rows={3}
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none"
            maxLength={500}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !sentence.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Rewriting...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Show, don't tell</>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {output && (
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7">
          <p className="text-xs font-semibold text-oxblood uppercase tracking-widest mb-4">
            Rewrites
          </p>
          <div className="text-ink text-[15px] leading-[1.75] whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
