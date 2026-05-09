"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

export default function PolishPass() {
  const [essay, setEssay] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!essay.trim() || loading) return;
    setLoading(true);
    setError(null);
    setOutput("");
    setPaywall(false);
    try {
      const res = await fetch("/api/tools/essay-polish-pass", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ essay }),
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

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const origWords = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const newWords = output.trim() ? output.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      {paywall && <PaywallBanner />}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7 space-y-4 sm:space-y-5">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Paste your essay</label>
          <textarea value={essay} onChange={(e) => setEssay(e.target.value)} placeholder="Paste your draft here. The polish pass fixes grammar, tightens phrasing, replaces weak verbs, and cleans cliches in one go." rows={14} className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono" maxLength={6000} required />
          <div className="text-xs text-pencil mt-2">{origWords} words · {essay.length}/6000 chars</div>
        </div>
        <button type="submit" disabled={loading || !essay.trim()} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Polishing...</> : <><Sparkles className="w-4 h-4" /> Polish my essay</>}
        </button>
      </form>

      {error && <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">{error}</div>}

      {output && (
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-oxblood uppercase tracking-widest">Polished essay</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-pencil">{origWords} → {newWords} words</span>
              <button onClick={copyOutput} className="text-oxblood hover:text-oxblood-2 transition-colors" aria-label="Copy">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="text-ink text-[15px] leading-[1.75] whitespace-pre-wrap">{output}</div>
        </div>
      )}
    </div>
  );
}
