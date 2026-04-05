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
  ];

  return (
    <div className="p-4 border-b border-slate-200 bg-white">
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
          <p className="text-xs text-[#94A3B8]">Overall Score</p>
        </div>
      </div>

      {/* Category bars */}
      <div className="space-y-2">
        {categories.map((cat) => {
          const pct = Math.round((cat.rawScore / cat.maxScore) * 100);
          return (
            <div key={cat.label}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs text-[#64748B]">{cat.label}</span>
                <span className="text-xs font-semibold text-[#0F172A]">
                  {cat.rawScore}/{cat.maxScore}
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
