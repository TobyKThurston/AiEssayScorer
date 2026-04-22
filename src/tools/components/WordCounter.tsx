"use client";

import { useMemo, useState } from "react";
import { FileText, Hash, AlignLeft, Clock } from "lucide-react";

const LIMITS = [
  { name: "Common App personal statement", words: 650 },
  { name: "UC Personal Insight Question", words: 350 },
  { name: "Stanford short 250s", words: 250 },
  { name: "Common App activity description", chars: 150 },
  { name: "Common App 'Additional Information'", words: 650 },
  { name: "UChicago Uncommon Essay (suggested)", words: 650 },
];

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
      : 0;
    const avgWordsPerSentence = sentences > 0 ? Math.round((words.length / sentences) * 10) / 10 : 0;
    const readingMinutes = Math.max(1, Math.round(words.length / 225));
    return { words: words.length, chars, charsNoSpaces, sentences, paragraphs, avgWordsPerSentence, readingMinutes };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7">
        <label className="block text-sm font-semibold text-ink mb-2">
          Paste or type your essay
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your draft here. Counts update live."
          rows={14}
          className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={<FileText className="w-4 h-4" />} label="Words" value={stats.words.toLocaleString()} />
        <StatCard icon={<Hash className="w-4 h-4" />} label="Characters" value={stats.chars.toLocaleString()} subLabel={`${stats.charsNoSpaces.toLocaleString()} without spaces`} />
        <StatCard icon={<AlignLeft className="w-4 h-4" />} label="Sentences" value={stats.sentences.toString()} subLabel={stats.avgWordsPerSentence ? `${stats.avgWordsPerSentence} avg/sentence` : undefined} />
        <StatCard icon={<Clock className="w-4 h-4" />} label="Read time" value={`${stats.readingMinutes} min`} subLabel={`${stats.paragraphs} paragraphs`} />
      </div>

      <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7">
        <h2
          className="text-lg font-extrabold text-ink mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
        >
          Common college essay limits
        </h2>
        <div className="space-y-3">
          {LIMITS.map((limit) => {
            const current = limit.words != null ? stats.words : stats.chars;
            const cap = limit.words ?? limit.chars ?? 0;
            const over = current > cap;
            const pct = Math.min(100, Math.round((current / cap) * 100));
            const unit = limit.words != null ? "words" : "chars";
            return (
              <div key={limit.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-ink-2">{limit.name}</span>
                  <span className={over ? "text-[#B91C1C] font-semibold" : "text-ink font-semibold"}>
                    {current}/{cap} {unit}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-paper-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${over ? "bg-[#DC2626]" : "bg-gradient-to-r from-oxblood to-[#8B5CF6]"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  subLabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subLabel?: string;
}) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-paper-2 text-oxblood">
          {icon}
        </span>
        <span className="text-xs font-semibold text-pencil uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
        {value}
      </p>
      {subLabel && <p className="text-xs text-pencil mt-1">{subLabel}</p>}
    </div>
  );
}
