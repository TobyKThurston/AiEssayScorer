"use client";

import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/Landing/components/ui/resizable";
import { EssayRating } from "../types";
import { EssayTextPanel } from "./EssayTextPanel";
import { FeedbackPanel } from "./FeedbackPanel";
import { WritingGuide } from "./WritingGuide";

interface EditorShellProps {
  mode: "edit" | "preview";
  content: string;
  essayType: string;
  targetSchools: string[];
  essayPrompt: string;
  rating: EssayRating | null;
  activeHighlightIndex: number | null;
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
}

export function EditorShell({
  mode,
  content,
  essayType,
  targetSchools,
  essayPrompt,
  rating,
  activeHighlightIndex,
  onContentChange,
  onMetadataChange,
  onHighlightHover,
  onHighlightLeave,
  onHighlightLock,
  onSwitchToEdit,
  onSwitchToPreview,
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
    <FeedbackPanel
      rating={rating}
      activeHighlightIndex={activeHighlightIndex}
      onHoverEnter={onHighlightHover}
      onHoverLeave={onHighlightLeave}
      onLock={onHighlightLock}
    />
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
