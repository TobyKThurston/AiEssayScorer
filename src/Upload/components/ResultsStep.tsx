import { motion } from "motion/react";
import { Button } from "./Button";
import { FormData, EssayRating } from "./EssayReviewFlow";
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Target,
  Lightbulb,
  Download,
  RotateCcw
} from "lucide-react";
import { useState } from "react";

interface ResultsStepProps {
  formData: FormData;
  rating: EssayRating | null;
  onBack: () => void;
}

export function ResultsStep({ formData, rating, onBack }: ResultsStepProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "suggestions">("overview");

  if (!rating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <div className="text-center mb-8">
          <h1 className="mb-3">Almost there...</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <motion.div
            className="w-16 h-16 border-4 border-[#3B82F6] border-t-transparent rounded-full mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    );
  }

  const overallScore = rating.score;

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-[#10B981]";
    if (score >= 70) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "from-[#10B981] to-[#059669]";
    if (score >= 70) return "from-[#F59E0B] to-[#D97706]";
    return "from-[#EF4444] to-[#DC2626]";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 92) return "Exceptional";
    if (score >= 85) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 65) return "Average";
    return "Needs Improvement";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.div
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="mb-3">Analysis complete!</h1>
        <p className="text-[#64748B]">
          Here's your detailed essay review
        </p>
      </div>

      {/* Overall Score Card */}
      <motion.div
        className="p-8 rounded-2xl bg-gradient-to-br from-white to-[#F8FAFC] border border-[#3B82F6] shadow-[0_8px_32px_rgba(148,163,184,0.18)] text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <small className="text-[#64748B] uppercase tracking-wider">Overall Score</small>
        <div className={`text-7xl mt-2 mb-2 bg-gradient-to-br ${getScoreBg(overallScore)} bg-clip-text text-transparent`} style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
          {overallScore}
        </div>
        <p className="text-[#475569]">{getScoreLabel(overallScore)}</p>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { 
            label: "Content", 
            rawScore: rating.contentScore ?? Math.round(overallScore * 0.30), 
            maxScore: 30, 
            scaledScore: Math.round(((rating.contentScore ?? Math.round(overallScore * 0.30)) / 30) * 100),
            icon: FileText, 
            feedback: rating.contentFeedback 
          },
          { 
            label: "Structure", 
            rawScore: rating.structureScore ?? Math.round(overallScore * 0.25), 
            maxScore: 25, 
            scaledScore: Math.round(((rating.structureScore ?? Math.round(overallScore * 0.25)) / 25) * 100),
            icon: Target, 
            feedback: rating.structureFeedback 
          },
          { 
            label: "Style", 
            rawScore: rating.styleScore ?? Math.round(overallScore * 0.25), 
            maxScore: 25, 
            scaledScore: Math.round(((rating.styleScore ?? Math.round(overallScore * 0.25)) / 25) * 100),
            icon: TrendingUp, 
            feedback: rating.styleFeedback 
          }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)] hover:shadow-[0_8px_32px_rgba(148,163,184,0.18)] hover:border-[#3B82F6]/30 transition-all duration-300"
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <small className="text-[#64748B]">{item.label}</small>
              </div>
              <span className={`text-2xl ${getScoreColor(item.scaledScore)}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                {item.scaledScore}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${getScoreBg(item.scaledScore)} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${item.scaledScore}%` }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex gap-2 p-1 bg-white rounded-xl border border-slate-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
            activeTab === "overview"
              ? "bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
              : "text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("suggestions")}
          className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
            activeTab === "suggestions"
              ? "bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
              : "text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          Suggestions
        </button>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" ? (
          <div className="space-y-4">
            {/* Strengths */}
            <motion.div
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)]"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#10B981]" />
                </div>
                <h3>Strengths</h3>
              </div>
              <ul className="space-y-2">
                {rating.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#475569]">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Areas for Improvement */}
            <motion.div
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)]"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <h3>Areas for improvement</h3>
              </div>
              <ul className="space-y-2">
                {rating.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#475569]">
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Detailed Feedback */}
            <motion.div
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#3B82F6]" />
                Content Feedback
              </h3>
              <p className="text-[#475569] whitespace-pre-wrap">{rating.contentFeedback}</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#3B82F6]" />
                Structure Feedback
              </h3>
              <p className="text-[#475569] whitespace-pre-wrap">{rating.structureFeedback}</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
                Style Feedback
              </h3>
              <p className="text-[#475569] whitespace-pre-wrap">{rating.styleFeedback}</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-[0_4px_24px_rgba(59,130,246,0.15)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4 flex items-center gap-2 text-[#3B82F6]">
                <Target className="w-5 h-5" />
                Recommendation
              </h3>
              <p className="text-[#475569] whitespace-pre-wrap">{rating.recommendation}</p>
            </motion.div>

            {/* Line-by-line suggestions */}
            {rating.lineSuggestions && rating.lineSuggestions.length > 0 ? (
              rating.lineSuggestions.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)] hover:shadow-[0_8px_32px_rgba(148,163,184,0.18)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="flex-1">
                    <small className="text-[#64748B] uppercase tracking-wider">Line {index + 1}</small>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <small className="text-[#94A3B8]">Original:</small>
                    <p className="text-[#64748B] italic">{item.original}</p>
                  </div>
                  <div>
                    <small className="text-[#3B82F6]">Suggested:</small>
                    <p className="text-[#0F172A]">{item.suggestion}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <small className="text-[#64748B]">{item.reason}</small>
                  </div>
                </div>
              </motion.div>
              ))
            ) : null}
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button variant="secondary" onClick={onBack} className="flex-1">
          <RotateCcw className="w-4 h-4" />
          Review Another Essay
        </Button>
        <Button variant="primary" className="flex-1">
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </motion.div>
    </motion.div>
  );
}
