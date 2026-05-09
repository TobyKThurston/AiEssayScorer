import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadStep } from "./UploadStep";
import { QuestionsStep } from "./QuestionsStep";
import { ResultsStep } from "./ResultsStep";

export type FormData = {
  essayText: string;
  essayType: string;
  targetSchools: string[];
  wordCount: number;
  prompt: string;
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

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-paper pt-14 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
      <div className="max-w-[900px] mx-auto px-5 sm:px-6">
        {/* Progress indicator */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step
                      ? "bg-gradient-to-br from-oxblood to-forest text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
                      : "bg-white border-2 border-hair text-pencil"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-semibold text-sm sm:text-base">{step}</span>
                </motion.div>
                {step < 3 && (
                  <div className={`w-12 sm:w-32 md:w-56 h-1 mx-2 sm:mx-3 md:mx-4 rounded-full transition-all duration-500 ${
                    currentStep > step ? "bg-gradient-to-r from-oxblood to-forest" : "bg-slate-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 sm:gap-32 md:gap-64">
            <div className="text-center w-20 sm:w-24">
              <small className={`text-[11px] sm:text-xs ${currentStep >= 1 ? "text-oxblood" : "text-pencil"}`}>Upload</small>
            </div>
            <div className="text-center w-20 sm:w-24">
              <small className={`text-[11px] sm:text-xs ${currentStep >= 2 ? "text-oxblood" : "text-pencil"}`}>Questions</small>
            </div>
            <div className="text-center w-20 sm:w-24">
              <small className={`text-[11px] sm:text-xs ${currentStep >= 3 ? "text-oxblood" : "text-pencil"}`}>Results</small>
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
            <QuestionsStep
              key="questions"
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <ResultsStep
              key="results"
              formData={formData}
              onBack={prevStep}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}