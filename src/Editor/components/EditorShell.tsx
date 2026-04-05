"use client";

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/Landing/components/ui/resizable";
import { EssayRating } from "../types";
import { EssayTextPanel } from "./EssayTextPanel";
import { FeedbackPanel } from "./FeedbackPanel";

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
  const textPanel = (
    <EssayTextPanel
      mode={mode}
      content={content}
      essayType={essayType}
      targetSchools={targetSchools}
      essayPrompt={essayPrompt}
      rating={rating}
      activeHighlightIndex={activeHighlightIndex}
      onContentChange={onContentChange}
      onMetadataChange={onMetadataChange}
      onHighlightHover={onHighlightHover}
      onHighlightLeave={onHighlightLeave}
      onHighlightLock={onHighlightLock}
      onSwitchToEdit={onSwitchToEdit}
      onSwitchToPreview={onSwitchToPreview}
    />
  );

  if (!rating) {
    return <div className="h-full">{textPanel}</div>;
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={58} minSize={35}>
        {textPanel}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={42} minSize={28}>
        <FeedbackPanel
          rating={rating}
          activeHighlightIndex={activeHighlightIndex}
          onHoverEnter={onHighlightHover}
          onHoverLeave={onHighlightLeave}
          onLock={onHighlightLock}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
