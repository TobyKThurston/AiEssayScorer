"use client";

import { useState } from "react";

export function useHighlight() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);

  const activeHighlightIndex = lockedIndex ?? hoveredIndex;

  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
  };

  const handleLock = (index: number | null) => {
    setLockedIndex((prev) => (prev === index ? null : index));
  };

  return { activeHighlightIndex, handleHover, handleLock };
}
