import { motion } from "motion/react";
import { Button } from "./Button";
import { FormData } from "./EssayReviewFlow";
import { GraduationCap, FileQuestion, Target } from "lucide-react";

interface QuestionsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const essayTypes = [
  "Common App Personal Statement",
  "UC Personal Insight Question",
  "Coalition App Essay",
  "Supplemental Essay",
  "Scholarship Essay",
  "Other"
];

const targetSchools = [
  "Harvard",
  "Yale",
  "Princeton",
  "Stanford",
  "MIT",
  "Columbia",
  "UPenn",
  "Brown",
  "Dartmouth",
  "Cornell"
];

export function QuestionsStep({ formData, updateFormData, onNext, onBack }: QuestionsStepProps) {
  const toggleSchool = (school: string) => {
    const schools = formData.targetSchools.includes(school)
      ? formData.targetSchools.filter(s => s !== school)
      : [...formData.targetSchools, school];
    updateFormData({ targetSchools: schools });
  };

  const canProceed = formData.essayType && formData.targetSchools.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h1 className="mb-3">Tell us more</h1>
        <p className="text-[#64748B]">
          Help us provide better feedback for your essay
        </p>
      </div>

      {/* Essay Type */}
      <motion.div
        className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
            <FileQuestion className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <h3>Essay type</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {essayTypes.map((type) => (
            <motion.button
              key={type}
              onClick={() => updateFormData({ essayType: type })}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                formData.essayType === type
                  ? "border-[#3B82F6] bg-[#DBEAFE]/20 shadow-[0_4px_16px_rgba(59,130,246,0.15)]"
                  : "border-slate-200 hover:border-[#3B82F6]/30 hover:bg-slate-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={formData.essayType === type ? "text-[#3B82F6]" : "text-[#475569]"}>
                {type}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Target Schools */}
      <motion.div
        className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <h3>Target schools</h3>
        </div>
        <p className="text-[#64748B] mb-4">
          <small>Select all that apply for regional tailoring</small>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {targetSchools.map((school) => (
            <motion.button
              key={school}
              onClick={() => toggleSchool(school)}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                formData.targetSchools.includes(school)
                  ? "border-[#3B82F6] bg-[#DBEAFE]/20 shadow-[0_4px_16px_rgba(59,130,246,0.15)]"
                  : "border-slate-200 hover:border-[#3B82F6]/30 hover:bg-slate-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={formData.targetSchools.includes(school) ? "text-[#3B82F6]" : "text-[#475569]"}>
                {school}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Essay Prompt (Optional) */}
      <motion.div
        className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_24px_rgba(148,163,184,0.12)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
            <Target className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <h3>Essay prompt <span className="text-[#94A3B8]">(optional)</span></h3>
        </div>
        <textarea
          className="w-full min-h-[100px] p-4 bg-[#F8FAFC] border border-slate-200 rounded-xl outline-none resize-none text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#3B82F6] focus:bg-white transition-all"
          placeholder="Paste the essay prompt here for context..."
          value={formData.prompt}
          onChange={(e) => updateFormData({ prompt: e.target.value })}
        />
      </motion.div>

      {/* Navigation */}
      <motion.div
        className="flex justify-between pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          className={!canProceed ? "opacity-50 cursor-not-allowed" : ""}
        >
          Analyze Essay
        </Button>
      </motion.div>
    </motion.div>
  );
}
