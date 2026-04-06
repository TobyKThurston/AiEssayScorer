"use client";

import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/Landing/components/ui/resizable";
import { EssayRating } from "../types";
import { EssayTextPanel } from "./EssayTextPanel";
import { FeedbackPanel } from "./FeedbackPanel";
import { WritingGuide } from "./WritingGuide";
import { EssayRewritePanel } from "./EssayRewritePanel";

interface EditorShellProps {
  mode: "edit" | "preview";
  content: string;
  essayType: string;
  targetSchools: string[];
  essayPrompt: string;
  rating: EssayRating | null;
  activeHighlightIndex: number | null;
  isPro: boolean;
  rewriteCount: number;
  rewriteResults: Record<number, { rewritten: string; explanation: string }>;
  rewritingIndex: number | null;
  showRewritePanel: boolean;
  isRewritingEssay: boolean;
  essayRewriteResult: { rewritten?: string; hookPreview: string } | null;
  isRegenHooks: boolean;
  onContentChange: (value: string) => void;
  onMetadataChange: (fields: {
    essayType?: string;
    targetSchools?: string[];
    essayPrompt?: string;
  }) => void;
  onHighlightHover: (index: number) => void;
  onHighlightLeave: () => void;
  onHighlightLock: (index: number) => void;
  onSwitchToEdit: () => void;
  onSwitchToPreview: () => void;
  onRewrite: (index: number, original: string, suggestion: string, reason: string) => void;
  onCloseRewritePanel: () => void;
  onApplyRewrite: (text: string) => void;
  onRegenHooks: () => void;
}

export function EditorShell({
  mode,
  content,
  essayType,
  targetSchools,
  essayPrompt,
  rating,
  activeHighlightIndex,
  isPro,
  rewriteCount,
  rewriteResults,
  rewritingIndex,
  showRewritePanel,
  isRewritingEssay,
  essayRewriteResult,
  isRegenHooks,
  onContentChange,
  onMetadataChange,
  onHighlightHover,
  onHighlightLeave,
  onHighlightLock,
  onSwitchToEdit,
  onSwitchToPreview,
  onRewrite,
  onCloseRewritePanel,
  onApplyRewrite,
  onRegenHooks,
}: EditorShellProps) {
  const [openMetadata, setOpenMetadata] = useState(false);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const leftPanel = (
    <EssayTextPanel
      mode={mode}
      content={content}
      essayType={essayType}
      targetSchools={targetSchools}
      essayPrompt={essayPrompt}
      rating={rating}
      activeHighlightIndex={activeHighlightIndex}
      openMetadata={openMetadata}
      onContentChange={onContentChange}
      onMetadataChange={onMetadataChange}
      onHighlightHover={onHighlightHover}
      onHighlightLeave={onHighlightLeave}
      onHighlightLock={onHighlightLock}
      onSwitchToEdit={onSwitchToEdit}
      onSwitchToPreview={onSwitchToPreview}
      onMetadataForceHandled={() => setOpenMetadata(false)}
    />
  );

  const rightPanel = rating ? (
    <div className="relative h-full">
      <FeedbackPanel
        rating={rating}
        activeHighlightIndex={activeHighlightIndex}
        isPro={isPro}
        rewriteCount={rewriteCount}
        rewriteResults={rewriteResults}
        rewritingIndex={rewritingIndex}
        onHoverEnter={onHighlightHover}
        onHoverLeave={onHighlightLeave}
        onLock={onHighlightLock}
        onRewrite={onRewrite}
        onRegenHooks={onRegenHooks}
        isRegenHooks={isRegenHooks}
      />
      <EssayRewritePanel
        isOpen={showRewritePanel}
        onClose={onCloseRewritePanel}
        isLoading={isRewritingEssay}
        result={essayRewriteResult}
        isPro={isPro}
        onApply={onApplyRewrite}
      />
    </div>
  ) : (
    <WritingGuide
      wordCount={wordCount}
      essayType={essayType}
      essayPrompt={essayPrompt}
      targetSchools={targetSchools}
      onEditContext={() => setOpenMetadata(true)}
    />
  );

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={60} minSize={38}>
        {leftPanel}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={26}>
        {rightPanel}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
