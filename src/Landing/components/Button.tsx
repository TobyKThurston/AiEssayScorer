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
    primary: "px-6 py-3 rounded-full bg-ink text-white hover:bg-oxblood shadow-md active:scale-[0.98]",
    secondary: "px-6 py-3 rounded-full bg-cream backdrop-blur-sm border border-white/60 text-ink hover:bg-cream",
    tertiary: "text-oxblood hover:text-oxblood-2"
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

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
    >
      {buttonContent}
    </motion.button>
  );
}
