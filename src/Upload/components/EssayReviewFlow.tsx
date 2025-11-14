import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadStep } from "./UploadStep";
import { QuestionsStep } from "./QuestionsStep";
import { ResultsStep } from "./ResultsStep";
import { useAuth } from "@/contexts/AuthContext";

export type FormData = {
  essayText: string;
  essayType: string;
  targetSchools: string[];
  wordCount: number;
  prompt: string;
};

export type EssayRating = {
  score: number;
  strengths: string[];
  improvements: string[];
  contentFeedback: string;
  structureFeedback: string;
  styleFeedback: string;
  recommendation: string;
};

export function EssayReviewFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    essayText: "",
    essayType: "",
    targetSchools: [],
    wordCount: 0,
    prompt: ""
  });
  const [rating, setRating] = useState<EssayRating | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<number | null>(null);
  const [showBriefLoading, setShowBriefLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch user tokens
    if (user) {
      fetch("/api/tokens")
        .then(res => res.json())
        .then(data => setTokens(data.tokens))
        .catch(() => setTokens(0));
    }
  }, [user]);

  // Auto-advance to results if rating completes while on step 2 and brief loading is shown
  useEffect(() => {
    if (rating && showBriefLoading && currentStep === 2) {
      // Rating just completed, move to results
      setTimeout(() => {
        setShowBriefLoading(false);
        setCurrentStep(3);
      }, 500); // Small delay to show completion
    }
  }, [rating, showBriefLoading, currentStep]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      // Start rating in background when Continue is clicked
      setCurrentStep(2); // Move to questions step
      rateEssay(); // Start rating in background (don't await)
    } else if (currentStep === 2) {
      // If rating is already done, move to results immediately
      if (rating) {
        setCurrentStep(3);
      } else {
        // Rating still in progress, show brief loading screen
        setShowBriefLoading(true);
        // Wait a bit for rating to complete, then move to results
        setTimeout(() => {
          setShowBriefLoading(false);
          setCurrentStep(3);
        }, 2000); // Show loading for 2 seconds
      }
    }
  };

  const rateEssay = async () => {
    if (!formData.essayText.trim()) {
      setError("Please paste your essay first");
      return;
    }

    // Don't start another rating if one is already in progress
    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/rate-essay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          essay: formData.essayText,
          targetSchools: formData.targetSchools,
          prompt: formData.prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to rate essay");
      }

      setRating(data.rating);
      // Don't automatically move to results - wait for user to click Continue on step 2
      // Refresh tokens
      const tokenRes = await fetch("/api/tokens");
      const tokenData = await tokenRes.json();
      setTokens(tokenData.tokens);
    } catch (err: any) {
      setError(err.message || "Failed to rate essay. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Progress indicator */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step
                      ? "bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
                      : "bg-white border-2 border-slate-200 text-[#94A3B8]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-semibold text-sm md:text-base">{step}</span>
                </motion.div>
                {step < 3 && (
                  <div className={`w-16 md:w-56 h-1 mx-2 md:mx-4 rounded-full transition-all duration-500 ${
                    currentStep > step ? "bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9]" : "bg-slate-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 md:gap-64">
            <div className="text-center w-16 md:w-24">
              <small className={`text-xs md:text-sm ${currentStep >= 1 ? "text-[#3B82F6]" : "text-[#94A3B8]"}`}>Upload Essay</small>
            </div>
            <div className="text-center w-16 md:w-24">
              <small className={`text-xs md:text-sm ${currentStep >= 2 ? "text-[#3B82F6]" : "text-[#94A3B8]"}`}>Answer Questions</small>
            </div>
            <div className="text-center w-16 md:w-24">
              <small className={`text-xs md:text-sm ${currentStep >= 3 ? "text-[#3B82F6]" : "text-[#94A3B8]"}`}>View Results</small>
            </div>
          </div>
        </motion.div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <UploadStep
              key="upload"
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <>
              {showBriefLoading ? (
                <motion.div
                  key="brief-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
              ) : (
                <QuestionsStep
                  key="questions"
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                  loading={loading}
                  error={error}
                  tokens={tokens}
                />
              )}
            </>
          )}
          {currentStep === 3 && (
            <ResultsStep
              key="results"
              formData={formData}
              rating={rating}
              onBack={prevStep}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}