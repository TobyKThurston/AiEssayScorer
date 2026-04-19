"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

export default function EssayHookGenerator() {
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim() || loading) return;
    setLoading(true);
    setError(null);
    setOutput("");
    setPaywall(false);

    try {
      const res = await fetch("/api/tools/hook-generator", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topic, prompt }),
      });

      if (res.status === 402) {
        setPaywall(true);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Try again.");
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
        className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            What's your essay about?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The summer I rebuilt my grandfather's cassette collection"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition"
            maxLength={300}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Essay prompt <span className="font-normal text-[#94A3B8]">(optional)</span>
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Common App #5: Discuss an accomplishment, event, or realization..."
            rows={3}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition resize-none"
            maxLength={800}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Generate 5 hooks
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {output && (
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7">
          <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest mb-4">
            Your hooks
          </p>
          <div className="text-[#0F172A] text-[15px] leading-[1.75] whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
