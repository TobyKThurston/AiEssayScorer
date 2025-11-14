import { motion } from "motion/react";
import { StepCard } from "./StepCard";
import { Upload, Target, RefreshCw } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      step: "1",
      title: "Upload",
      description: "Drop in a draft, resume, or prompt."
    },
    {
      icon: Target,
      step: "2",
      title: "Assess",
      description: "Get a score with structure, evidence, and tone breakdown."
    },
    {
      icon: RefreshCw,
      step: "3",
      title: "Revise",
      description: "Apply line edits and track improvements."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2>Three steps to a stronger essay</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              step={step.step}
              title={step.title}
              description={step.description}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}