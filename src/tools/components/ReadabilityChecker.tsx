"use client";

import { useMemo, useState } from "react";
import { Activity, Gauge, TrendingUp } from "lucide-react";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const cleaned = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");
  const matches = cleaned.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export default function ReadabilityChecker() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return null;

    const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const words = trimmed.split(/\s+/).filter(Boolean);
    const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
    const sentenceCount = Math.max(1, sentences.length);
    const wordCount = Math.max(1, words.length);

    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgSyllablesPerWord = syllables / wordCount;

    const fleschEase = Math.max(
      0,
      Math.min(100, 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord)
    );
    const fleschKincaidGrade = Math.max(
      0,
      0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59
    );

    const longSentences = sentences.filter((s) => s.trim().split(/\s+/).length > 25).length;
    const longWords = words.filter((w) => w.replace(/[^a-zA-Z]/g, "").length > 12).length;

    const passiveMarkers = /\b(was|were|been|being|is|are|be)\s+(\w+ed|\w+en|done|made|taken|given|written|seen|known|shown|said)\b/gi;
    const passiveMatches = trimmed.match(passiveMarkers) || [];
    const passiveRatio = (passiveMatches.length / sentenceCount) * 100;

    let band = "College-ready";
    let bandColor = "text-forest";
    let bandBg = "bg-paper-2";
    if (fleschKincaidGrade >= 14) {
      band = "Dense / graduate-level";
      bandColor = "text-[#92400E]";
      bandBg = "bg-[#FEF3C7]";
    } else if (fleschKincaidGrade >= 11) {
      band = "College-ready";
    } else if (fleschKincaidGrade >= 8) {
      band = "Accessible";
      bandColor = "text-oxblood";
      bandBg = "bg-paper-2";
    } else {
      band = "Too casual for admissions";
      bandColor = "text-[#B91C1C]";
      bandBg = "bg-[#FEE2E2]";
    }

    return {
      wordCount,
      sentenceCount,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
      fleschEase: Math.round(fleschEase * 10) / 10,
      fleschKincaidGrade: Math.round(fleschKincaidGrade * 10) / 10,
      longSentences,
      longWords,
      passiveRatio: Math.round(passiveRatio),
      band,
      bandColor,
      bandBg,
    };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-7">
        <label className="block text-sm font-semibold text-ink mb-2">
          Paste your essay draft
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your essay here. The analysis runs live."
          rows={12}
          className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono"
        />
      </div>

      {analysis && (
        <>
          <div className="rounded-2xl bg-gradient-to-br from-oxblood to-oxblood-2 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">
              Reading difficulty
            </p>
            <div className="flex items-end gap-4 mb-3">
              <span className="text-5xl font-extrabold" style={{ fontFamily: "var(--font-heading)" }}>
                Grade {analysis.fleschKincaidGrade}
              </span>
            </div>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${analysis.bandBg} ${analysis.bandColor}`}>
              {analysis.band}
            </span>
            <p className="text-[14px] leading-relaxed opacity-95 mt-4">
              Flesch-Kincaid grade level estimates the US school grade someone needs to comfortably read your essay. For college admissions, grade 11 to 13 usually lands best: sophisticated enough to sound adult, accessible enough that a tired admissions reader does not have to re-read.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Metric
              icon={<Gauge className="w-4 h-4" />}
              label="Flesch Reading Ease"
              value={analysis.fleschEase}
              max={100}
              note={analysis.fleschEase >= 60 ? "Easy to read" : analysis.fleschEase >= 30 ? "Standard for college essays" : "Dense; consider simplifying"}
            />
            <Metric
              icon={<Activity className="w-4 h-4" />}
              label="Avg words per sentence"
              value={analysis.avgWordsPerSentence}
              max={30}
              note={analysis.avgWordsPerSentence > 22 ? "Sentences are on the long side" : analysis.avgWordsPerSentence < 10 ? "Sentences may feel choppy" : "Balanced rhythm"}
            />
            <Metric
              icon={<TrendingUp className="w-4 h-4" />}
              label="Passive-voice ratio"
              value={analysis.passiveRatio}
              max={100}
              unit="%"
              note={analysis.passiveRatio > 25 ? "High passive-voice count reduces energy" : "Healthy active voice"}
            />
            <Metric
              icon={<Activity className="w-4 h-4" />}
              label="Long sentences (25+ words)"
              value={analysis.longSentences}
              max={analysis.sentenceCount || 1}
              note={analysis.longSentences > 3 ? "Several long sentences; mix in shorter beats" : "Sentence variety looks healthy"}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  max,
  unit = "",
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  max: number;
  unit?: string;
  note: string;
}) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-paper-2 text-oxblood">
          {icon}
        </span>
        <span className="text-xs font-semibold text-pencil uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-3xl font-extrabold text-ink mb-3" style={{ fontFamily: "var(--font-heading)" }}>
        {value}{unit}
      </p>
      <div className="h-1.5 rounded-full bg-paper-2 overflow-hidden mb-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-oxblood to-[#8B5CF6]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-pencil">{note}</p>
    </div>
  );
}
