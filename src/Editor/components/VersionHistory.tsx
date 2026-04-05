"use client";

import { useState, useEffect } from "react";
import { History, Clock, X } from "lucide-react";
import { EssayVersion } from "../types";

interface VersionHistoryProps {
  essayId: string;
  isOpen: boolean;
  onClose: () => void;
  onRestore: (version: EssayVersion) => void;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function VersionHistory({ essayId, isOpen, onClose, onRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<EssayVersion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch(`/api/essay-versions?essayId=${essayId}`)
      .then((r) => r.json())
      .then((data) => setVersions(data.versions ?? []))
      .catch(() => setVersions([]))
      .finally(() => setLoading(false));
  }, [isOpen, essayId]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-semibold text-[#0F172A]">Version History</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : versions.length === 0 ? (
            <div className="text-center py-10">
              <Clock className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
              <p className="text-sm text-[#94A3B8]">No saved versions yet.</p>
              <p className="text-xs text-[#CBD5E1] mt-1">Save a draft to create a version.</p>
            </div>
          ) : (
            versions.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  onRestore(v);
                  onClose();
                }}
                className="w-full text-left px-3 py-3 rounded-xl border border-slate-200 hover:border-[#3B82F6]/40 hover:bg-slate-50 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors">
                      Version {v.version_number}
                      {v.label && (
                        <span className="ml-1.5 text-[#94A3B8] font-normal">· {v.label}</span>
                      )}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{formatDate(v.created_at)}</p>
                    {v.analysis && (
                      <p className="text-xs text-[#10B981] mt-0.5">
                        Score: {v.analysis.score}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-[#94A3B8] mt-0.5 flex-shrink-0">
                    {v.content.trim().split(/\s+/).length} words
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
