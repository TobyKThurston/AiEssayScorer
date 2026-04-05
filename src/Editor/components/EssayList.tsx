"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, Clock } from "lucide-react";
import { Essay } from "../types";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function EssayList() {
  const router = useRouter();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("/api/essays")
      .then((r) => r.json())
      .then((data) => setEssays(data.essays ?? []))
      .catch(() => setEssays([]))
      .finally(() => setLoading(false));
  }, []);

  const handleNew = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/essays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled Essay" }),
      });
      const data = await res.json();
      if (data.essay) {
        router.push(`/editor/${data.essay.id}`);
      }
    } catch {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-heading)" }}>
            My Essays
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Write, save, and analyze your college essays
          </p>
        </div>
        <button
          onClick={handleNew}
          disabled={creating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] text-white text-sm font-medium shadow-[0_2px_8px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.4)] transition-shadow disabled:opacity-70"
        >
          <Plus className="w-4 h-4" />
          {creating ? "Creating…" : "New Essay"}
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : essays.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-[#3B82F6]" />
          </div>
          <h2 className="text-lg font-semibold text-[#0F172A] mb-2">No essays yet</h2>
          <p className="text-sm text-[#64748B] mb-6">
            Create your first essay to get started
          </p>
          <button
            onClick={handleNew}
            disabled={creating}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] text-white text-sm font-medium shadow-[0_2px_8px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.4)] transition-shadow"
          >
            <Plus className="w-4 h-4" />
            New Essay
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {essays.map((essay) => (
            <button
              key={essay.id}
              onClick={() => router.push(`/editor/${essay.id}`)}
              className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(148,163,184,0.08)] hover:shadow-[0_4px_24px_rgba(148,163,184,0.15)] hover:border-[#3B82F6]/30 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors truncate">
                      {essay.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] flex-shrink-0 ml-3">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(essay.updated_at)}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
