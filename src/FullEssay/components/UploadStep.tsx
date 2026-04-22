import { useState } from "react";
import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { Button } from "./Button";
import { FormData } from "./EssayReviewFlow";

interface UploadStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export function UploadStep({ formData, updateFormData, onNext }: UploadStepProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    updateFormData({ 
      essayText: text,
      wordCount: words 
    });
  };

  const canProceed = formData.essayText.trim().length > 0 && formData.wordCount >= 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="mb-3">Paste your essay</h1>
        <p className="text-pencil">
          Copy and paste your essay text below to get started
        </p>
      </div>

      <motion.div
        className="relative rounded-2xl border-2 bg-white border-slate-300 transition-all duration-300 focus-within:border-[#3B82F6] focus-within:shadow-[0_4px_24px_rgba(59,130,246,0.15)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <textarea
          className="w-full min-h-[400px] p-6 bg-transparent border-none outline-none resize-none text-ink placeholder:text-pencil"
          placeholder="Paste your essay here..."
          value={formData.essayText}
          onChange={handleTextChange}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </motion.div>

      {/* Word count indicator */}
      <motion.div
        className="flex items-center justify-between p-4 rounded-xl bg-white border border-hair"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-oxblood" />
          <small className="text-pencil">Word count</small>
        </div>
        <span className={`font-semibold ${
          formData.wordCount >= 50 ? "text-oxblood" : "text-pencil"
        }`}>
          {formData.wordCount} words
        </span>
      </motion.div>

      {formData.wordCount > 0 && formData.wordCount < 50 && (
        <motion.p
          className="text-sm text-gold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Please write at least 50 words to continue
        </motion.p>
      )}

      <motion.div
        className="flex justify-end pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="primary"
          onClick={onNext}
          className={!canProceed ? "opacity-50 cursor-not-allowed" : ""}
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}