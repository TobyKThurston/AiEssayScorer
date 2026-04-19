"use client";

import { useState } from "react";
import { Sparkles, Loader2, School, Layers, ListOrdered, AlertCircle } from "lucide-react";
import { PaywallBanner } from "./PaywallBanner";

interface Essay { prompt: string; wordLimit: string; difficulty: "easy" | "medium" | "hard"; }
interface SchoolPlan { school: string; essays: Essay[]; reuseFromOtherSchools: string; }
interface OverlapCluster { cluster: string; schools: string[]; oneDraftCoversAll: string; }
interface Result {
  totalEssayLoad: { personalStatement: number; longSupplementals: number; mediumSupplementals: number; shortSupplementals: number; totalNewEssays: number };
  bySchool: SchoolPlan[];
  overlapPlan: OverlapCluster[];
  hardestSchool: string;
  orderOfOperations: string[];
}

const DIFFICULTY: Record<string, string> = {
  easy: "bg-[#D1FAE5] text-[#065F46]",
  medium: "bg-[#FEF3C7] text-[#92400E]",
  hard: "bg-[#FEE2E2] text-[#B91C1C]",
};

export default function SupplementalPlanner() {
  const [collegeList, setCollegeList] = useState("");
  const [major, setMajor] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!collegeList.trim() || loading) return;
    setLoading(true); setError(null); setResult(null); setPaywall(false);
    try {
      const res = await fetch("/api/tools/supplemental-essay-planner", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ collegeList, major }),
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
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-7 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">Your college list</label>
          <textarea value={collegeList} onChange={(e) => setCollegeList(e.target.value)} placeholder="One school per line or comma-separated. e.g., Stanford, Harvard, UChicago, Duke, Northwestern, UMich, Pomona, UT Austin" rows={6} className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition resize-none" maxLength={1500} required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">Intended major <span className="font-normal text-[#94A3B8]">(optional)</span></label>
          <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="e.g., Computer Science, Philosophy, Molecular Biology" className="w-full rounded-xl border border-[#E2E8F0] bg-white/80 px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition" maxLength={200} />
        </div>
        <button type="submit" disabled={loading || !collegeList.trim()} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] text-white font-medium text-sm hover:bg-[#4F46E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Planning...</> : <><Sparkles className="w-4 h-4" /> Plan my supplementals</>}
        </button>
      </form>

      {error && <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-4 text-sm text-[#B91C1C]">{error}</div>}

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">Total essay load</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center mt-4">
              <Stat n={result.totalEssayLoad.personalStatement} label="Personal statement" />
              <Stat n={result.totalEssayLoad.longSupplementals} label="Long supps (300+)" />
              <Stat n={result.totalEssayLoad.mediumSupplementals} label="Med supps (100–300)" />
              <Stat n={result.totalEssayLoad.shortSupplementals} label="Short supps (<100)" />
              <Stat n={result.totalEssayLoad.totalNewEssays} label="Est. distinct drafts" highlight />
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#6D28D9]"><Layers className="w-4 h-4" /></span>
              <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Overlap clusters: one draft covers multiple schools</h3>
            </div>
            <div className="space-y-3">
              {result.overlapPlan.map((o, i) => (
                <div key={i} className="rounded-xl bg-[#F5F3FF] border border-[#E0E7FF] p-4">
                  <p className="font-semibold text-[#0F172A] mb-1">{o.cluster}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {o.schools.map((s) => <span key={s} className="text-xs font-medium px-2 py-0.5 rounded-full bg-white text-[#6366F1] border border-[#E0E7FF]">{s}</span>)}
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">{o.oneDraftCoversAll}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#DBEAFE] text-[#1D4ED8]"><School className="w-4 h-4" /></span>
              <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>By school</h3>
            </div>
            <div className="space-y-4">
              {result.bySchool.map((sp, i) => (
                <div key={i} className="border-l-2 border-[#E0E7FF] pl-4">
                  <p className="font-semibold text-[#0F172A] mb-2">{sp.school}</p>
                  <div className="space-y-1.5 mb-2">
                    {sp.essays.map((e, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm">
                        <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0 ${DIFFICULTY[e.difficulty] ?? DIFFICULTY.medium}`}>{e.difficulty}</span>
                        <span className="text-[#0F172A]"><span className="font-medium">{e.wordLimit}:</span> {e.prompt}</span>
                      </div>
                    ))}
                  </div>
                  {sp.reuseFromOtherSchools && <p className="text-xs text-[#64748B] italic">Reuse tip: {sp.reuseFromOtherSchools}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_2px_16px_rgba(99,102,241,0.06)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#D1FAE5] text-[#065F46]"><ListOrdered className="w-4 h-4" /></span>
              <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Order of operations</h3>
            </div>
            <ol className="space-y-2">
              {result.orderOfOperations.map((step, i) => (
                <li key={i} className="flex gap-2 text-[14.5px] text-[#0F172A] leading-relaxed">
                  <span className="font-semibold text-[#065F46]">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl bg-[#FEF2F2] border border-[#FECACA] p-5">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-[#B91C1C]" />
              <p className="text-xs font-semibold text-[#B91C1C] uppercase tracking-widest">Hardest school</p>
            </div>
            <p className="text-[14.5px] text-[#0F172A] leading-relaxed">{result.hardestSchool}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ n, label, highlight = false }: { n: number; label: string; highlight?: boolean }) {
  return (
    <div className={highlight ? "rounded-xl bg-white text-[#4F46E5] p-3" : ""}>
      <p className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-heading)" }}>{n}</p>
      <p className="text-[11px] opacity-90 mt-0.5">{label}</p>
    </div>
  );
}
