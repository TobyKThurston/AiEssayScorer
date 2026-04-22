"use client";

import { useState } from "react";
import { Sparkles, Loader2, Anchor, Film, MessageCircle, Flag } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface Outline {
  hook: string;
  sceneBeats: string[];
  reflectionPoints: string[];
  landingLine: string;
  wordAllocation: { hook: number; scene: number; reflection: number; landing: number };
  craftNotes: string[];
}

export default function OutlineGenerator() {
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [wordLimit, setWordLimit] = useState(650);
  const [result, setResult] = useState<Outline | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaywall(false);
    try {
      const res = await fetch("/api/tools/essay-outline-generator", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topic, prompt, wordLimit }),
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
          <label className="block text-sm font-semibold text-ink mb-2">Essay topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The year I rebuilt my grandfather's broken clocks"
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition"
            maxLength={500}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Essay prompt <span className="font-normal text-pencil">(optional)</span>
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Common App #5"
            rows={3}
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none"
            maxLength={1500}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Word limit: <span className="font-normal text-oxblood">{wordLimit}</span>
          </label>
          <input
            type="range"
            min={100}
            max={800}
            step={50}
            value={wordLimit}
            onChange={(e) => setWordLimit(Number(e.target.value))}
            className="w-full accent-[#6366F1]"
          />
          <div className="flex justify-between text-xs text-pencil mt-1">
            <span>100</span>
            <span>250 (supplemental)</span>
            <span>650 (Common App)</span>
            <span>800</span>
          </div>
        </div>
        <button type="submit" disabled={loading || !topic.trim()} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Outlining...</> : <><Sparkles className="w-4 h-4" /> Generate outline</>}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">{error}</div>
      )}

      {result && (
        <div className="space-y-4">
          <Block icon={<Anchor className="w-4 h-4" />} title="Hook" accent="#6D28D9" accentBg="#EDE9FE" words={result.wordAllocation?.hook}>
            <p className="text-ink text-[15px] leading-relaxed">{result.hook}</p>
          </Block>
          <Block icon={<Film className="w-4 h-4" />} title="Scene beats" accent="#1D4ED8" accentBg="#DBEAFE" words={result.wordAllocation?.scene}>
            <ol className="space-y-2">
              {result.sceneBeats.map((b, i) => (
                <li key={i} className="flex gap-2 text-ink text-[15px] leading-relaxed">
                  <span className="font-semibold text-oxblood">{i + 1}.</span>
                  <span>{b}</span>
                </li>
              ))}
            </ol>
          </Block>
          <Block icon={<MessageCircle className="w-4 h-4" />} title="Reflection points" accent="#065F46" accentBg="#D1FAE5" words={result.wordAllocation?.reflection}>
            <ul className="space-y-2">
              {result.reflectionPoints.map((r, i) => (
                <li key={i} className="flex gap-2 text-ink text-[15px] leading-relaxed">
                  <span className="text-forest">→</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block icon={<Flag className="w-4 h-4" />} title="Landing line" accent="#BE185D" accentBg="#FCE7F3" words={result.wordAllocation?.landing}>
            <p className="text-ink text-[15px] leading-relaxed">{result.landingLine}</p>
          </Block>
          <div className="rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] p-6">
            <p className="text-xs font-semibold text-[#92400E] uppercase tracking-widest mb-2">Craft notes</p>
            <ul className="space-y-2">
              {result.craftNotes.map((n, i) => (
                <li key={i} className="text-[14.5px] text-[#78350F] leading-relaxed">• {n}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function Block({ icon, title, accent, accentBg, words, children }: { icon: React.ReactNode; title: string; accent: string; accentBg: string; words?: number; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg" style={{ backgroundColor: accentBg, color: accent }}>{icon}</span>
          <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
        </div>
        {words != null && <span className="text-xs text-pencil">~{words} words</span>}
      </div>
      {children}
    </div>
  );
}
