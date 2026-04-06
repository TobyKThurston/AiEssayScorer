"use client";

import { useState, useEffect } from "react";
import { Essay, EssayRating, EssayVersion } from "./types";
import { useEssay } from "./hooks/useEssay";
import { useHighlight } from "./hooks/useHighlight";
import { EditorNavigation } from "./components/EditorNavigation";
import { EditorShell } from "./components/EditorShell";
import { VersionHistory } from "./components/VersionHistory";
import { AnalyzingOverlay } from "./components/AnalyzingOverlay";

interface EditorPageProps {
  essayId: string;
}

export function EditorPage({ essayId }: EditorPageProps) {
  const { essay: loadedEssay, latestVersion, loading } = useEssay(essayId);

  // Core document state
  const [essay, setEssay] = useState<Essay | null>(null);
  const [currentVersion, setCurrentVersion] = useState<EssayVersion | null>(null);
  const [content, setContent] = useState("");
  const [essayType, setEssayType] = useState("");
  const [targetSchools, setTargetSchools] = useState<string[]>([]);
  const [essayPrompt, setEssayPrompt] = useState("");
  const [rating, setRating] = useState<EssayRating | null>(null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  // UI state
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayDone, setOverlayDone] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<number | null>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // Pro + rewrite state
  const [isPro, setIsPro] = useState(false);
  const [rewriteCount, setRewriteCount] = useState(0);
  const [rewriteResults, setRewriteResults] = useState<Record<number, { rewritten: string; explanation: string }>>({});
  const [rewritingIndex, setRewritingIndex] = useState<number | null>(null);
  const [isRewritingEssay, setIsRewritingEssay] = useState(false);
  const [essayRewriteResult, setEssayRewriteResult] = useState<{ rewritten?: string; hookPreview: string } | null>(null);
  const [showRewritePanel, setShowRewritePanel] = useState(false);
  const [isRegenHooks, setIsRegenHooks] = useState(false);

  const { activeHighlightIndex, handleHover, handleLock } = useHighlight();

  // Populate state when essay loads
  useEffect(() => {
    if (loadedEssay) setEssay(loadedEssay);
    if (latestVersion) {
      setCurrentVersion(latestVersion);
      setContent(latestVersion.content);
      setEssayType(latestVersion.essay_type);
      setTargetSchools(latestVersion.target_schools);
      setEssayPrompt(latestVersion.essay_prompt);
      if (latestVersion.analysis) {
        setRating(latestVersion.analysis);
        setMode("preview");
      }
    }
  }, [loadedEssay?.id, latestVersion?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch token count
  useEffect(() => {
    fetch("/api/tokens")
      .then((r) => r.json())
      .then((d) => setTokens(d.tokens ?? 0))
      .catch(() => setTokens(0));
  }, []);

  // Fetch subscription status
  useEffect(() => {
    fetch("/api/subscription-status")
      .then((r) => r.json())
      .then((d) => setIsPro(d.isActive === true))
      .catch(() => {});
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
    setIsDirty(true);
  };

  const handleMetadataChange = (fields: {
    essayType?: string;
    targetSchools?: string[];
    essayPrompt?: string;
  }) => {
    if (fields.essayType !== undefined) setEssayType(fields.essayType);
    if (fields.targetSchools !== undefined) setTargetSchools(fields.targetSchools);
    if (fields.essayPrompt !== undefined) setEssayPrompt(fields.essayPrompt);
    setIsDirty(true);
  };

  const saveDraft = async () => {
    if (!essay) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/essay-versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          essayId: essay.id,
          content,
          essayType,
          targetSchools,
          essayPrompt,
          analysis: rating,
          label: null,
        }),
      });
      const data = await res.json();
      if (data.version) {
        setCurrentVersion(data.version);
        setIsDirty(false);
      }
    } catch {
      // silent fail
    } finally {
      setIsSaving(false);
    }
  };

  const analyze = async () => {
    if (!essay || !content.trim()) return;
    setIsAnalyzing(true);
    setAnalyzeError(null);
    setShowOverlay(true);
    setOverlayDone(false);
    // Reset rewrite state on new analysis
    setRewriteResults({});
    setRewriteCount(0);

    try {
      const res = await fetch("/api/rate-essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          essay: content,
          targetSchools,
          prompt: essayPrompt,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");

      const newRating: EssayRating = data.rating;

      // Auto-save the analyzed version
      const saveRes = await fetch("/api/essay-versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          essayId: essay.id,
          content,
          essayType,
          targetSchools,
          essayPrompt,
          analysis: newRating,
          label: null,
        }),
      });
      const saveData = await saveRes.json();
      if (saveData.version) {
        setCurrentVersion(saveData.version);
        setIsDirty(false);
      }

      // Refresh token count
      fetch("/api/tokens")
        .then((r) => r.json())
        .then((d) => setTokens(d.tokens ?? 0))
        .catch(() => {});

      // Signal overlay that API is done; it will call onAnimationComplete when ready
      setRating(newRating);
      setOverlayDone(true);
    } catch (err: unknown) {
      setShowOverlay(false);
      setOverlayDone(false);
      setAnalyzeError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOverlayComplete = () => {
    setShowOverlay(false);
    setOverlayDone(false);
    setMode("preview");
  };

  const handleRestore = (version: EssayVersion) => {
    setContent(version.content);
    setEssayType(version.essay_type);
    setTargetSchools(version.target_schools);
    setEssayPrompt(version.essay_prompt);
    if (version.analysis) {
      setRating(version.analysis);
      setMode("preview");
    } else {
      setMode("edit");
    }
    setCurrentVersion(version);
    setIsDirty(true);
  };

  const handleRewrite = async (index: number, original: string, suggestion: string, reason: string) => {
    setRewritingIndex(index);
    try {
      const res = await fetch("/api/rewrite-line", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original, suggestion, reason, essayContext: content.slice(0, 600) }),
      });
      const data = await res.json();
      setRewriteResults((prev) => ({ ...prev, [index]: data }));
      setRewriteCount((c) => c + 1);
    } finally {
      setRewritingIndex(null);
    }
  };

  const handleRewriteEssay = async () => {
    setIsRewritingEssay(true);
    setShowRewritePanel(true);
    try {
      const res = await fetch("/api/rewrite-essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay: content, essayType, essayPrompt, targetSchools }),
      });
      const data = await res.json();
      setEssayRewriteResult(data);
    } finally {
      setIsRewritingEssay(false);
    }
  };

  const handleApplyRewrite = (text: string) => {
    setContent(text);
    setIsDirty(true);
    setShowRewritePanel(false);
    setEssayRewriteResult(null);
    setMode("edit");
  };

  const handleRegenHooks = async () => {
    if (!rating || !content.trim()) return;
    setIsRegenHooks(true);
    try {
      const res = await fetch("/api/generate-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay: content, essayType, essayPrompt }),
      });
      const data = await res.json();
      setRating((prev) => prev ? { ...prev, hooks: { ...prev.hooks, ...data } } : prev);
    } finally {
      setIsRegenHooks(false);
    }
  };

  // Suppress unused variable warning for currentVersion
  void currentVersion;

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-[#F8FAFC]">
      <EditorNavigation
        essay={essay}
        isDirty={isDirty}
        isSaving={isSaving}
        isAnalyzing={isAnalyzing}
        tokens={tokens}
        analyzeError={analyzeError}
        hasContent={content.trim().length > 0}
        rating={rating}
        isRewritingEssay={isRewritingEssay}
        onSave={saveDraft}
        onAnalyze={analyze}
        onShowVersionHistory={() => setShowVersionHistory(true)}
        onRewriteEssay={handleRewriteEssay}
      />

      <div className="flex-1 overflow-hidden mt-14">
        <EditorShell
          mode={mode}
          content={content}
          essayType={essayType}
          targetSchools={targetSchools}
          essayPrompt={essayPrompt}
          rating={rating}
          activeHighlightIndex={activeHighlightIndex}
          isPro={isPro}
          rewriteCount={rewriteCount}
          rewriteResults={rewriteResults}
          rewritingIndex={rewritingIndex}
          showRewritePanel={showRewritePanel}
          isRewritingEssay={isRewritingEssay}
          essayRewriteResult={essayRewriteResult}
          isRegenHooks={isRegenHooks}
          onContentChange={handleContentChange}
          onMetadataChange={handleMetadataChange}
          onHighlightHover={handleHover}
          onHighlightLeave={() => handleHover(null)}
          onHighlightLock={handleLock}
          onSwitchToEdit={() => setMode("edit")}
          onSwitchToPreview={() => setMode("preview")}
          onRewrite={handleRewrite}
          onCloseRewritePanel={() => setShowRewritePanel(false)}
          onApplyRewrite={handleApplyRewrite}
          onRegenHooks={handleRegenHooks}
        />
      </div>

      <VersionHistory
        essayId={essayId}
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        onRestore={handleRestore}
      />

      <AnalyzingOverlay
        isOpen={showOverlay}
        isDone={overlayDone}
        onAnimationComplete={handleOverlayComplete}
      />
    </div>
  );
}
