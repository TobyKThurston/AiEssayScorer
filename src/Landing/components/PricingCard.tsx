import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "./Button";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
  delay?: number;
  onClick?: () => void;
  href?: string;
}

export function PricingCard({ 
  title, 
  price, 
  period, 
  features, 
  ctaText, 
  highlighted = false,
  delay = 0,
  onClick,
  href
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`p-8 rounded-2xl border shadow-[0_4px_24px_rgba(148,163,184,0.12)] hover:shadow-[0_12px_40px_rgba(148,163,184,0.2)] transition-all duration-300 ${
        highlighted 
          ? "bg-gradient-to-b from-white to-[#F8FAFC] border-[#3B82F6] ring-4 ring-[#3B82F6]/10 hover:ring-[#3B82F6]/20" 
          : "bg-white border-slate-200 hover:border-[#3B82F6]/20"
      }`}
    >
      <h3 className="mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-5xl text-[#0F172A]" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
          {price}
        </span>
        {period && <span className="text-[#64748B] ml-2">{period}</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
            <span className="text-[#475569]">{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        variant={highlighted ? "primary" : "secondary"} 
        className="w-full"
        onClick={onClick}
        href={href}
      >
        {ctaText}
      </Button>
    </motion.div>
  );
}