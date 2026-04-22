"use client";

import { useState } from "react";
import { Sparkles, Loader2, GraduationCap, BookOpen, Users, Building } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface BrainstormResult {
  professors: { name: string; why: string }[];
  courses: { name: string; why: string }[];
  programsAndClubs: { name: string; why: string }[];
  campusSpecifics: string[];
  openingAngle: string;
  researchTips: string[];
}

export default function WhyCollegeBrainstormer({
  defaultSchool = "",
  lockSchool = false,
}: {
  defaultSchool?: string;
  lockSchool?: boolean;
} = {}) {
  const [school, setSchool] = useState(defaultSchool);
  const [major, setMajor] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState<BrainstormResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!school.trim() || !major.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaywall(false);

    try {
      const res = await fetch("/api/tools/why-college-brainstormer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ school, major, interests }),
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
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-cream border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5"
      >
        <div className={lockSchool ? "" : "grid md:grid-cols-2 gap-4"}>
          {!lockSchool && (
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">School</label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g., Brown, Vanderbilt, USC"
                className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition"
                maxLength={100}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Intended major</label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g., Computer Science, Philosophy, Econ"
              className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition"
              maxLength={100}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Interests & context <span className="font-normal text-pencil">(optional but helps)</span>
          </label>
          <textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., I love the intersection of linguistics and CS, I want to study abroad in Japan, I do spoken-word poetry..."
            rows={3}
            className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none"
            maxLength={800}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !school.trim() || !major.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Researching...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Brainstorm specifics</>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-oxblood to-oxblood-2 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">
              Suggested opening angle
            </p>
            <p className="text-[15px] leading-relaxed">{result.openingAngle}</p>
          </div>

          <Section icon={<GraduationCap className="w-4 h-4" />} title="Professors to look up" items={result.professors} />
          <Section icon={<BookOpen className="w-4 h-4" />} title="Specific courses" items={result.courses} />
          <Section icon={<Users className="w-4 h-4" />} title="Programs & clubs" items={result.programsAndClubs} />

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-oxblood">
                <Building className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Campus-specific details
              </h3>
            </div>
            <ul className="space-y-2">
              {result.campusSpecifics.map((d, i) => (
                <li key={i} className="flex gap-2 text-[14.5px] text-ink leading-relaxed">
                  <span className="text-oxblood">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] p-6">
            <p className="text-xs font-semibold text-[#92400E] uppercase tracking-widest mb-3">
              Verify before you cite
            </p>
            <ul className="space-y-2">
              {result.researchTips.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-[#78350F] leading-relaxed">
                  <span>→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { name: string; why: string }[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-paper-2 text-oxblood">
          {icon}
        </span>
        <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i}>
            <p className="font-semibold text-ink text-[14.5px]">{item.name}</p>
            <p className="text-sm text-ink-2 leading-relaxed mt-0.5">{item.why}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
