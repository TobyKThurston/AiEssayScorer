"use client";

import { useState, useEffect } from "react";
import { Essay, EssayVersion } from "../types";

export function useEssay(essayId: string) {
  const [essay, setEssay] = useState<Essay | null>(null);
  const [latestVersion, setLatestVersion] = useState<EssayVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/essays/${essayId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setEssay(data.essay);
        setLatestVersion(data.latestVersion);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [essayId]);

  return { essay, latestVersion, loading, error };
}
