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
        className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7 space-y-4 sm:space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Your background, activities, and interests
          </label>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="e.g., I'm a first-gen student, I work 15 hrs/week at my family's restaurant, I'm on math team, I teach myself Korean..."
            rows={5}
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none"
            maxLength={1500}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Quirks, small obsessions, or specific moments <span className="font-normal text-pencil">(the good stuff)</span>
          </label>
          <textarea
            value={quirks}
            onChange={(e) => setQuirks(e.target.value)}
            placeholder="e.g., I collect receipts from every restaurant I eat at, I reread the same book every summer, I argued with my grandma for two years about sourdough..."
            rows={3}
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none"
            maxLength={800}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !background.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Thinking...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Generate 5 topic ideas</>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {topics.length > 0 && (
        <div className="space-y-4">
          {topics.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-forest">
                  <Lightbulb className="w-4 h-4" />
                </span>
                <h3 className="text-[17px] font-extrabold text-ink" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}>
                  {t.title}
                </h3>
              </div>
              <p className="text-ink text-[14.5px] leading-relaxed mb-3">{t.pitch}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-paper-2 text-oxblood">
                  Best fit: {t.bestPromptFit}
                </span>
              </div>
              <p className="text-sm text-ink-2 leading-relaxed border-l-2 border-hair pl-3">
                <span className="font-semibold text-ink">Why it works: </span>
                {t.whyItWorks}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
