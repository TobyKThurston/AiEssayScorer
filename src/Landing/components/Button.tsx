"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: boolean;
}

export function Button({ 
  variant = "primary", 
  children, 
  onClick, 
  href,
  className = "",
  icon = false 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 transition-all duration-200 font-medium";
  
  const variants = {
    primary: "px-6 py-3 rounded-2xl bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-white hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 active:translate-y-0",
    secondary: "px-6 py-3 rounded-2xl border-2 border-[#3B82F6]/20 text-[#0F172A] hover:bg-[#DBEAFE]/30 hover:border-[#3B82F6]/40",
    tertiary: "text-[#3B82F6] hover:text-[#2563EB]"
  };

  const buttonContent = (
    <>
      {children}
      {icon && variant === "tertiary" && <ArrowRight className="w-4 h-4" />}
    </>
  );

  const motionProps = {
    className: `${baseClasses} ${variants[variant]} ${className}`,
    whileHover: { scale: variant === "primary" || variant === "secondary" ? 1.02 : 1 },
    whileTap: { scale: 0.98 }
  };

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link href={href} className="inline-flex items-center justify-center gap-2 w-full h-full">
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  if (variant === "primary") {
    return (
      <motion.button
        {...motionProps}
        onClick={onClick}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
    >
      {buttonContent}
    </motion.button>
  );
}
