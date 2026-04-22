"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useCountUp } from "@/design/useCountUp";

const SAMPLE_ESSAY = `The radio came to me in three pieces. My grandmother had kept it in her closet since 1974, the year my grandfather stopped being able to tune it, and when she passed it to me it rattled like a handful of dice. I did not know what was inside. I knew only that her hands had trembled when she pressed it into mine, and that my parents expected me to throw it out.

I brought it upstairs. I watched a repair video, and then another. The first two evenings were a catalog of things I broke further. The third evening I found the cold-solder joint that had cost my grandfather a decade of baseball. When the voice of a Red Sox announcer crackled through the speaker, my grandmother was already asleep. I ran down the stairs anyway.

I did not fix the radio for my grandmother. I fixed it because I wanted to know what was inside. That distinction matters to me. When I chose mechanical engineering as my intended major, it was not because I wanted to build bridges or airplanes. It was because I had spent three evenings with a soldering iron in a room that smelled like dust and solder flux, and I had not wanted to stop.`;

type Rating = {
  score: number;
  contentScore: number;
  structureScore: number;
  styleScore: number;
  specificityScore: number;
  grammarScore: number;
  firstImpression?: string;
  strengths?: string[];
  improvements?: string[];
  standoutMove?: string;
};

type Mode = "paste" | "scoring" | "result" | "gated";

export function HeroDemo() {
  const [mode, setMode] = useState<Mode>("paste");
  const [text, setText] = useState("");
  const [rating, setRating] = useState<Rating | null>(null);
  const [gateMessage, setGateMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const wordCount = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).length,
    [text]
  );

  const handleSample = () => {
    setText(SAMPLE_ESSAY);
    setError("");
  };

  const handleScore = async () => {
    if (!text.trim()) return;
    setError("");
    setMode("scoring");
    try {
      const res = await fetch("/api/score-public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay: text }),
      });
      const data = await res.json();
      if (res.status === 402) {
        setGateMessage(data.error ?? "Daily free review used.");
        setMode("gated");
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "Could not score essay.");
        setMode("paste");
        return;
      }
      setRating(data.rating as Rating);
      setMode("result");
    } catch {
      setError("Network error. Please try again.");
      setMode("paste");
    }
  };

  const handleReset = () => {
    setRating(null);
    setMode("paste");
    setError("");
  };

  return (
    <div className="paper-card p-5 md:p-6">
      <DemoChrome />
      <DemoTabs mode={mode} />

      {mode === "paste" ? (
        <PasteState
          text={text}
          setText={setText}
          onSample={handleSample}
          onScore={handleScore}
          wordCount={wordCount}
          error={error}
        />
      ) : null}

      {mode === "scoring" ? <ScoringState /> : null}

      {mode === "result" && rating ? (
        <ResultState rating={rating} onReset={handleReset} />
      ) : null}

      {mode === "gated" ? <GatedState message={gateMessage} onReset={handleReset} /> : null}
    </div>
  );
}

function DemoChrome() {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-hair">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-hair" />
        <span className="w-2 h-2 rounded-full bg-hair" />
        <span className="w-2 h-2 rounded-full bg-hair" />
      </div>
      <p className="ml-3 font-mono text-[11px] uppercase tracking-[0.14em] text-pencil">
        ivyadmit.com / review / new-draft
      </p>
    </div>
  );
}

function DemoTabs({ mode }: { mode: Mode }) {
  const tabs: { id: Mode | "done"; label: string; match: Mode[] }[] = [
    { id: "paste", label: "01 — Paste", match: ["paste"] },
    { id: "scoring", label: "02 — Score", match: ["scoring"] },
    { id: "done", label: "03 — Result", match: ["result", "gated"] },
  ];
  return (
    <div className="flex gap-6 border-b border-hair">
      {tabs.map((t) => {
        const active = t.match.includes(mode);
        return (
          <span
            key={t.id}
            className="py-3 font-mono text-[11px] uppercase tracking-[0.14em] border-b-2 transition-colors"
            style={{
              color: active ? "var(--color-oxblood)" : "var(--color-pencil)",
              borderColor: active ? "var(--color-oxblood)" : "transparent",
            }}
          >
            {t.label}
          </span>
        );
      })}
    </div>
  );
}

function PasteState({
  text,
  setText,
  onSample,
  onScore,
  wordCount,
  error,
}: {
  text: string;
  setText: (v: string) => void;
  onSample: () => void;
  onScore: () => void;
  wordCount: number;
  error: string;
}) {
  return (
    <div className="pt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your college essay draft here…"
        className="w-full min-h-[180px] md:min-h-[220px] resize-y p-4 font-serif text-[15.5px] leading-[1.55] text-ink bg-paper border border-hair rounded-[4px] focus:outline-none focus:border-oxblood transition-colors placeholder:italic placeholder:text-pencil"
      />
      {error ? <p className="mt-3 text-[13px] text-oxblood">{error}</p> : null}
      <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-pencil">
          {wordCount} words
        </p>
        <div className="flex gap-2">
          <button onClick={onSample} className="btn btn-sm btn-ghost">
            Try a sample
          </button>
          <button
            onClick={onScore}
            disabled={!text.trim()}
            className="btn btn-sm btn-brand disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Score it <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoringState() {
  return (
    <div className="py-14 flex flex-col items-center gap-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
        Reading your draft…
      </p>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-oxblood"
            style={{
              animation: `pulse 1.1s ${i * 0.15}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.15); } }`}</style>
    </div>
  );
}

function ResultState({ rating, onReset }: { rating: Rating; onReset: () => void }) {
  const active = true;
  const overall = useCountUp(rating.score ?? 0, active, 1400);
  const content = useCountUp(rating.contentScore ?? 0, active, 1000);
  const structure = useCountUp(rating.structureScore ?? 0, active, 1100);
  const style = useCountUp(rating.styleScore ?? 0, active, 1200);

  const band =
    (rating.score ?? 0) >= 90
      ? "Excellent — top 8%"
      : (rating.score ?? 0) >= 82
        ? "Strong — top 25%"
        : (rating.score ?? 0) >= 72
          ? "Solid draft"
          : "Needs work";

  const improvements = (rating.improvements ?? []).slice(0, 4);

  const [revealed, setRevealed] = useState<number>(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    improvements.forEach((_, i) => {
      const t = setTimeout(() => setRevealed(i), 900 + i * 400);
      timers.current.push(t);
    });
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [improvements.length]);

  return (
    <div className="pt-5">
      <div className="flex flex-wrap items-end gap-5 pb-5 border-b border-hair">
        <span className="font-serif text-[72px] md:text-[86px] leading-none text-oxblood">
          {overall}
        </span>
        <div className="pb-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
            Overall essay score
          </p>
          <p className="font-serif italic text-[19px] text-ink mt-1">{band}</p>
          {rating.firstImpression ? (
            <p className="text-[13.5px] text-ink-2 mt-1 max-w-[42ch]">{rating.firstImpression}</p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <SubScore label="Content" value={content} max={30} />
        <SubScore label="Structure" value={structure} max={25} />
        <SubScore label="Style" value={style} max={25} />
      </div>

      {improvements.length ? (
        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-pencil mb-3">
            Suggestions to move this up a tier
          </p>
          <ul className="space-y-2.5">
            {improvements.map((s, i) => (
              <li
                key={i}
                className="flex gap-3 text-[14px] leading-[1.55] text-ink-2 transition-all duration-500"
                style={{
                  opacity: revealed >= i ? 1 : 0,
                  transform: revealed >= i ? "translateY(0)" : "translateY(6px)",
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-oxblood mt-1 shrink-0">
                  §{String(i + 1).padStart(2, "0")}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex gap-2 mt-6 pt-5 border-t border-hair">
        <button onClick={onReset} className="btn btn-sm btn-ghost">
          Try another draft
        </button>
        <Link href="/try" className="btn btn-sm btn-brand">
          Full line-by-line review
        </Link>
      </div>
    </div>
  );
}

function SubScore({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-pencil">{label}</p>
        <p className="font-serif text-[18px] text-ink">
          {value}
          <span className="text-pencil">/{max}</span>
        </p>
      </div>
      <div className="h-[3px] bg-paper-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-oxblood transition-[width] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function GatedState({ message, onReset }: { message: string; onReset: () => void }) {
  return (
    <div className="pt-6 pb-3">
      <p className="font-serif italic text-[18px] text-ink mb-2">
        You&apos;ve used your free review today.
      </p>
      <p className="text-[14.5px] text-ink-2 mb-5 leading-[1.55]">{message}</p>
      <div className="flex flex-wrap gap-2">
        <Link href="/auth/login?next=/try" className="btn btn-sm btn-brand">
          Create free account
        </Link>
        <button onClick={onReset} className="btn btn-sm btn-ghost">
          Back
        </button>
      </div>
    </div>
  );
}
