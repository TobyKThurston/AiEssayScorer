"use client";

import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";
import { Button } from "./Button";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
  badge?: string;
  delay?: number;
  onClick?: () => void;
  href?: string;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  ctaText,
  highlighted = false,
  badge,
  delay = 0,
  onClick,
  href,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col ${
        highlighted
          ? "bg-gradient-to-b from-[#1D4ED8] to-[#1E40AF] border-[#3B82F6] shadow-[0_16px_48px_rgba(29,78,216,0.3)] text-white"
          : "bg-white border-hair shadow-[0_4px_24px_rgba(148,163,184,0.1)] hover:shadow-[0_12px_40px_rgba(148,163,184,0.18)] hover:border-slate-300"
      }`}
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white text-xs font-semibold shadow-md">
            <Zap className="w-3 h-3" />
            {badge}
          </div>
        </div>
      )}

      <div className="mb-6">
        <p
          className={`text-sm font-semibold uppercase tracking-widest mb-2 ${
            highlighted ? "text-blue-200" : "text-pencil"
          }`}
        >
          {title}
        </p>
        <div className="flex items-end gap-2 mb-2">
          <span
            className={`text-5xl font-extrabold ${
              highlighted ? "text-white" : "text-ink"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {price}
          </span>
          {period && (
            <span
              className={`mb-2 text-sm ${highlighted ? "text-blue-200" : "text-pencil"}`}
            >
              {period}
            </span>
          )}
        </div>
        {description && (
          <p
            className={`text-sm ${highlighted ? "text-blue-100" : "text-pencil"}`}
          >
            {description}
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                highlighted ? "bg-white/20" : "bg-paper-2"
              }`}
            >
              <Check
                className={`w-3 h-3 ${highlighted ? "text-white" : "text-oxblood"}`}
              />
            </div>
            <span
              className={`text-sm ${highlighted ? "text-blue-50" : "text-ink-2"}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? "secondary" : "secondary"}
        className={`w-full ${
          highlighted
            ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            : ""
        }`}
        onClick={onClick}
        href={href}
      >
        {ctaText}
      </Button>
    </motion.div>
  );
}
