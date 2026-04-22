"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, TrendingDown, Repeat } from "lucide-react";

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "at", "by",
  "for", "with", "from", "as", "is", "was", "were", "be", "been", "being", "are",
  "am", "this", "that", "these", "those", "it", "its", "i", "me", "my", "myself",
  "we", "us", "our", "you", "your", "he", "him", "his", "she", "her", "they",
  "them", "their", "what", "which", "who", "whom", "where", "when", "why", "how",
  "not", "no", "so", "if", "than", "then", "too", "very", "just", "will", "would",
  "could", "should", "may", "might", "can", "do", "did", "does", "have", "has",
  "had", "about", "some", "any", "all", "each", "every", "one", "two",
]);

const WEAK_VERBS = [
  "was", "were", "is", "are", "am", "be", "been", "being",
  "have", "has", "had",
  "got", "get", "gets", "getting",
  "make", "made", "making",
  "do", "did", "does", "doing",
  "said", "say", "says",
  "went", "go", "goes",
  "came", "come", "comes",
  "took", "take", "takes",
];

const HEDGES = [
  "really", "very", "quite", "rather", "somewhat", "kind of", "sort of",
  "just", "perhaps", "maybe", "probably", "possibly",
  "a lot", "lots", "many", "much",
  "basically", "essentially", "literally", "actually",
  "in order to", "due to the fact", "it is important to note",
];

export default function WordRepetitionFinder() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return null;

    const lower = trimmed.toLowerCase();
    const words = lower.match(/\b[a-z']+\b/g) || [];
    const total = words.length;
    if (total === 0) return null;

    const freq: Record<string, number> = {};
    for (const w of words) {
      if (STOPWORDS.has(w)) continue;
      if (w.length < 4) continue;
      freq[w] = (freq[w] || 0) + 1;
    }
    const overused = Object.entries(freq)
      .filter(([, count]) => count >= 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    const weakVerbCounts: Record<string, number> = {};
    for (const v of WEAK_VERBS) {
      const regex = new RegExp(`\\b${v}\\b`, "gi");
      const matches = trimmed.match(regex);
      if (matches && matches.length > 0) weakVerbCounts[v] = matches.length;
    }
    const weakVerbsSorted = Object.entries(weakVerbCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({ word, count }));
    const totalWeakVerbs = Object.values(weakVerbCounts).reduce((a, b) => a + b, 0);

    const hedgeCounts: Record<string, number> = {};
    for (const h of HEDGES) {
      const regex = new RegExp(`\\b${h.replace(/ /g, "\\s+")}\\b`, "gi");
      const matches = trimmed.match(regex);
      if (matches && matches.length > 0) hedgeCounts[h] = matches.length;
    }
    const hedgesSorted = Object.entries(hedgeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([phrase, count]) => ({ phrase, count }));
    const totalHedges = Object.values(hedgeCounts).reduce((a, b) => a + b, 0);

    return {
      total,
      uniqueWords: Object.keys(freq).length,
      varietyPct: Math.round((Object.keys(freq).length / total) * 100),
      overused,
      weakVerbsSorted,
      totalWeakVerbs,
      weakVerbPct: Math.round((totalWeakVerbs / total) * 100),
      hedgesSorted,
      totalHedges,
    };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7">
        <label className="block text-sm font-semibold text-ink mb-2">Paste your essay</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your essay. Analysis runs entirely in your browser, live." rows={12} className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono" />
      </div>

      {analysis && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Metric label="Total words" value={analysis.total.toString()} />
            <Metric label="Unique words" value={analysis.uniqueWords.toString()} />
            <Metric label="Word variety" value={`${analysis.varietyPct}%`} sub={analysis.varietyPct >= 60 ? "Healthy" : analysis.varietyPct >= 45 ? "OK" : "Low variety"} />
          </div>

          <Section icon={<Repeat className="w-4 h-4" />} title="Top 10 overused words" empty={analysis.overused.length === 0 ? "No words used 3+ times. Strong variety." : null}>
            <div className="flex flex-wrap gap-2">
              {analysis.overused.map((o) => (
                <span key={o.word} className="text-sm px-3 py-1.5 rounded-full bg-paper-2 text-oxblood font-medium">
                  {o.word} <span className="opacity-70">×{o.count}</span>
                </span>
              ))}
            </div>
          </Section>

          <Section icon={<TrendingDown className="w-4 h-4" />} title={`Weak verbs (${analysis.weakVerbPct}% of your text)`} empty={analysis.weakVerbsSorted.length === 0 ? "No weak verbs detected. Nice active voice." : null}>
            <div className="flex flex-wrap gap-2">
              {analysis.weakVerbsSorted.map((w) => (
                <span key={w.word} className="text-sm px-3 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] font-medium">
                  {w.word} <span className="opacity-70">×{w.count}</span>
                </span>
              ))}
            </div>
            <p className="text-xs text-pencil mt-3 leading-relaxed">
              Weak verbs (was, had, made, got) flatten sentences. Replace them with specific verbs whenever the context allows: not &quot;I was nervous&quot; but &quot;my hand shook&quot;.
            </p>
          </Section>

          <Section icon={<AlertTriangle className="w-4 h-4" />} title={`Filler & hedges (${analysis.totalHedges} total)`} empty={analysis.hedgesSorted.length === 0 ? "No filler words or hedges. Tight writing." : null}>
            <div className="flex flex-wrap gap-2">
              {analysis.hedgesSorted.map((h) => (
                <span key={h.phrase} className="text-sm px-3 py-1.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] font-medium">
                  {h.phrase} <span className="opacity-70">×{h.count}</span>
                </span>
              ))}
            </div>
            <p className="text-xs text-pencil mt-3 leading-relaxed">
              Words like &quot;really,&quot; &quot;very,&quot; and &quot;just&quot; weaken claims. Cut them unless they're doing real work.
            </p>
          </Section>
        </>
      )}
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5">
      <p className="text-xs font-semibold text-pencil uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-extrabold text-ink" style={{ fontFamily: "var(--font-heading)" }}>{value}</p>
      {sub && <p className="text-xs text-pencil mt-0.5">{sub}</p>}
    </div>
  );
}

function Section({ icon, title, empty, children }: { icon: React.ReactNode; title: string; empty: string | null; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-oxblood">{icon}</span>
        <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
      </div>
      {empty ? <p className="text-sm text-forest">{empty}</p> : children}
    </div>
  );
}
