"use client";

import { motion } from "motion/react";
import { PricingCard } from "./PricingCard";

type Plan = {
  title: string;
  price: string;
  period?: string;
  features: string[];
  ctaText: string;
  highlighted: boolean;
  onClick?: () => void;
  href?: string;
};

export function Pricing() {
  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("Failed to start checkout. Please try again.");
    }
  };
  
  const plans: Plan[] = [
    {
      title: "Starter",
      price: "Free",
      features: [
        "1 essay review",
        "Structure score",
        "Basic edits",
        "Access to your essay score"
      ],
      ctaText: "Start free",
      highlighted: false,
      href: "/upload"
    },
    {
      title: "Pro",
      price: "$19",
      period: "per month",
      features: [
        "Unlimited reviews",
        "Regional tailoring",
        "Line-by-line edits",
        "Access to other essays"
      ],
      ctaText: "Upgrade to Pro",
      highlighted: true,
      onClick: handleUpgrade
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2>Simple, transparent pricing</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              ctaText={plan.ctaText}
              highlighted={plan.highlighted}
              delay={index * 0.1}
              onClick={plan.onClick}
              href={plan.href}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 text-[#64748B]"
        >
          <small>30-day money-back guarantee. Cancel anytime.</small>
        </motion.p>
      </div>
    </section>
  );
}