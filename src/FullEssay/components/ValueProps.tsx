import { motion } from "motion/react";
import { FeatureCard } from "./FeatureCard";
import { MapPin, Database, BookOpen, Edit3, ClipboardCheck, Shield } from "lucide-react";

export function ValueProps() {
  const features = [
    {
      icon: MapPin,
      title: "Regional tailoring",
      description: "Match the reading style of your region. Adjust tone, cadence, and emphasis for your assigned team."
    },
    {
      icon: Database,
      title: "Accepted-app patterns",
      description: "Mine linguistic and structural patterns from real admitted applications."
    },
    {
      icon: BookOpen,
      title: "Strategy library",
      description: "Battle-tested playbooks for narrative arcs, topic selection, and prestige signals."
    },
    {
      icon: Edit3,
      title: "Line-by-line edits",
      description: "Targeted rewrites with rationale. Keep your voice while raising clarity and impact."
    },
    {
      icon: ClipboardCheck,
      title: "Evidence checklist",
      description: "Turn claims into proof. Quantify outcomes and document achievements."
    },
    {
      icon: Shield,
      title: "Risk guardrails",
      description: "Flag tone risks and topic hazards before you submit."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2>Why students pick Ivy Admit</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}