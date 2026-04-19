"use client";

import { useState } from "react";
import { Sparkles, Loader2, Lightbulb } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface Topic {
  title: string;
  pitch: string;
  bestPromptFit: string;
  whyItWorks: string;
}

export default function EssayTopicGenerator({
  personaContext = "",
}: {
  personaContext?: string;
} = {}) {
  const [background, setBackground] = useState("");
  const [quirks, setQuirks] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!background.trim() || loading) return;
    setLoading(true);
    setError(null);
    setTopics([]);
    setPaywall(false);

    try {
      const res = await fetch("/api/tools/essay-topic-generator", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ background, quirks, personaContext }),
      });
      if (res.status === 402) {
        setPaywall(true);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setTopics(data.topics ?? []);
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
            Your background, activities, and interests
          </label>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="e.g., I'm a first-gen student, I work 15 hrs/week at my family's restaurant, I'm on math team, I teach myself Korean..."
            rows={5}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition resize-none"
            maxLength={1500}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Quirks, small obsessions, or specific moments <span className="font-normal text-[#94A3B8]">(the good stuff)</span>
          </label>
          <textarea
            value={quirks}
            onChange={(e) => setQuirks(e.target.value)}
            placeholder="e.g., I collect receipts from every restaurant I eat at, I reread the same book every summer, I argued with my grandma for two years about sourdough..."
            rows={3}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition resize-none"
            maxLength={800}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !background.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Thinking...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Generate 5 topic ideas</>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {topics.length > 0 && (
        <div className="space-y-4">
          {topics.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#D1FAE5] text-[#065F46]">
                  <Lightbulb className="w-4 h-4" />
                </span>
                <h3 className="text-[17px] font-extrabold text-[#0F172A]" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}>
                  {t.title}
                </h3>
              </div>
              <p className="text-[#0F172A] text-[14.5px] leading-relaxed mb-3">{t.pitch}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1D4ED8]">
                  Best fit: {t.bestPromptFit}
                </span>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed border-l-2 border-[#E0E7FF] pl-3">
                <span className="font-semibold text-[#0F172A]">Why it works: </span>
                {t.whyItWorks}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
