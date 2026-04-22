"use client";

import { useState } from "react";
import { Sparkles, Loader2, Eye, MessageSquare, Users, Award, Flag } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface MarginNote { passage: string; reaction: string; }
interface Result {
  firstImpression: string;
  marginNotes: MarginNote[];
  gutCheck: string;
  strongestMoment: string;
  wouldIShareWithCommittee: string;
  finalNote: string;
}

export default function AOSimulator() {
  const [essay, setEssay] = useState("");
  const [school, setSchool] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!essay.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaywall(false);
    try {
      const res = await fetch("/api/tools/admissions-officer-simulator", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ essay, school }),
      });
      if (res.status === 402) { setPaywall(true); return; }
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
          <label className="block text-sm font-semibold text-ink mb-2">School <span className="font-normal text-pencil">(optional — tunes the AO's lens)</span></label>
          <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="e.g., Stanford, Yale, UChicago" className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition" maxLength={100} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Paste your essay</label>
          <textarea value={essay} onChange={(e) => setEssay(e.target.value)} placeholder="Paste the essay you want read as an AO would read it..." rows={14} className="w-full rounded-xl border border-hair bg-cream px-4 py-3 text-sm text-ink placeholder:text-pencil focus:outline-none focus:border-oxblood focus:ring-2 focus:ring-oxblood/20 transition resize-none font-mono" maxLength={6000} required />
        </div>
        <button type="submit" disabled={loading || !essay.trim()} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn btn-sm btn-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Reading...</> : <><Sparkles className="w-4 h-4" /> Read as an AO</>}
        </button>
      </form>

      {error && <div className="rounded-xl bg-[#FAEEEA] border border-[#E8C9C2] p-4 text-sm text-[#B91C1C]">{error}</div>}

      {result && (
        <div className="space-y-4">
          <Panel icon={<Eye className="w-4 h-4" />} title="First impression" accent="#6D28D9" accentBg="#EDE9FE">
            <p className="text-ink text-[15px] leading-relaxed italic">&quot;{result.firstImpression}&quot;</p>
          </Panel>
          <Panel icon={<MessageSquare className="w-4 h-4" />} title="Margin notes" accent="#1D4ED8" accentBg="#DBEAFE">
            <div className="space-y-3">
              {result.marginNotes.map((n, i) => (
                <div key={i} className="border-l-2 border-hair pl-3">
                  <p className="text-[13px] text-pencil italic mb-1">&quot;{n.passage}&quot;</p>
                  <p className="text-[14.5px] text-ink leading-relaxed">{n.reaction}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel icon={<Award className="w-4 h-4" />} title="Strongest moment" accent="#065F46" accentBg="#D1FAE5">
            <p className="text-ink text-[15px] leading-relaxed">{result.strongestMoment}</p>
          </Panel>
          <Panel icon={<Users className="w-4 h-4" />} title="Would I share with committee?" accent="#BE185D" accentBg="#FCE7F3">
            <p className="text-ink text-[15px] leading-relaxed">{result.wouldIShareWithCommittee}</p>
          </Panel>
          <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-7 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="w-4 h-4" />
              <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Final note for the committee</p>
            </div>
            <p className="text-[15px] leading-relaxed italic">&quot;{result.finalNote}&quot;</p>
          </div>
          <div className="rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] p-5">
            <p className="text-sm text-[#78350F] leading-relaxed"><span className="font-semibold">Gut check:</span> {result.gutCheck}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Panel({ icon, title, accent, accentBg, children }: { icon: React.ReactNode; title: string; accent: string; accentBg: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-hair shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg" style={{ backgroundColor: accentBg, color: accent }}>{icon}</span>
        <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
