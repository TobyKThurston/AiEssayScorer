"use client";

import { EssayRating } from "../types";

interface ScoreHeaderProps {
  rating: EssayRating;
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-[#10B981]";
  if (score >= 70) return "text-[#F59E0B]";
  return "text-[#EF4444]";
}

function getScoreBg(score: number) {
  if (score >= 85) return "from-[#10B981] to-[#059669]";
  if (score >= 70) return "from-[#F59E0B] to-[#D97706]";
  return "from-[#EF4444] to-[#DC2626]";
}

function getScoreLabel(score: number) {
  if (score >= 92) return "Exceptional";
  if (score >= 85) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 65) return "Average";
  return "Needs Improvement";
}

function getPercentile(score: number) {
  return Math.max(1, Math.round(100 - score));
}

function getStandoutLevel(score: number): "High" | "Medium" | "Low" {
  if (score >= 85) return "High";
  if (score >= 70) return "Medium";
  return "Low";
}

export { getScoreColor, getScoreBg, getScoreLabel };

export function ScoreHeader({ rating }: ScoreHeaderProps) {
  const overallScore = rating.score;

  const categories = [
    {
      label: "Content",
      rawScore: rating.contentScore ?? Math.round(overallScore * 0.3),
      maxScore: 30,
    },
    {
      label: "Structure",
      rawScore: rating.structureScore ?? Math.round(overallScore * 0.25),
      maxScore: 25,
    },
    {
      label: "Style",
      rawScore: rating.styleScore ?? Math.round(overallScore * 0.25),
      maxScore: 25,
    },
    ...(rating.specificityScore !== undefined
      ? [{ label: "Specificity", rawScore: rating.specificityScore, maxScore: 10 }]
      : []),
    ...(rating.grammarScore !== undefined
      ? [{ label: "Grammar", rawScore: rating.grammarScore, maxScore: 10 }]
      : []),
  ];

  return (
    <div className="p-4 border-b border-hair bg-white">
      {/* Score row */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`text-4xl font-extrabold bg-gradient-to-br ${getScoreBg(overallScore)} bg-clip-text text-transparent`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {overallScore}
        </div>
        <div>
          <p className={`text-sm font-semibold ${getScoreColor(overallScore)}`}>
            {getScoreLabel(overallScore)}
          </p>
          <p className="text-xs text-pencil">Top {getPercentile(overallScore)}% of applicants</p>
          <span className={`mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            getStandoutLevel(overallScore) === "High" ? "bg-[#D1FAE5] text-[#065F46]" :
            getStandoutLevel(overallScore) === "Medium" ? "bg-[#FEF3C7] text-[#92400E]" :
            "bg-[#FEE2E2] text-[#991B1B]"
          }`}>
            Standout: {getStandoutLevel(overallScore)}
          </span>
        </div>
      </div>

      {/* Category bars */}
      <div className="space-y-2">
        {categories.map((cat) => {
          const pct = Math.round((cat.rawScore / cat.maxScore) * 100);
          return (
            <div key={cat.label}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs text-pencil">{cat.label}</span>
                <span className={`text-sm font-bold ${getScoreColor(pct)}`}>
                  {cat.rawScore}
                  <span className="text-xs font-normal text-pencil">/{cat.maxScore}</span>
                </span>
              </div>
              <div className="h-2 bg-paper-2 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreBg(pct)} rounded-full`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
