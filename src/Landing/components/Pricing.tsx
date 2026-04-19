"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PricingCard } from "./PricingCard";

export function Pricing() {
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setUpgradeError(null);
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
        setUpgradeError(data.error);
      }
    } catch {
      setUpgradeError("Failed to start checkout. Please try again.");
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2>Simple, transparent pricing</h2>
          <p className="text-[#64748B] mt-3 max-w-md mx-auto">
            Start for free. Upgrade when you're ready to go deeper.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <PricingCard
            title="Starter"
            price="Free"
            description="Perfect for getting started."
            features={[
              "1 essay review",
              "Structure score",
              "Basic edits",
              "Access to your essay score",
            ]}
            ctaText="Start free"
            highlighted={false}
            delay={0}
            href="/try"
          />
          <PricingCard
            title="Pro"
            price="$7"
            period="/ month"
            description="Everything you need to get in."
            features={[
              "Unlimited reviews",
              "Regional tailoring",
              "Line-by-line edits",
              "Accepted-app pattern analysis",
              "Risk guardrails",
              "Access to other essays",
            ]}
            ctaText="Upgrade to Pro"
            highlighted
            badge="Most Popular"
            delay={0.1}
            onClick={handleUpgrade}
          />
        </div>

        {upgradeError && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-6 text-sm text-red-600"
          >
            {upgradeError}
          </motion.p>
        )}

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