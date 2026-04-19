import Link from "next/link";
import { Sparkles, Check } from "lucide-react";

export function PaywallBanner() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#6366F1] via-[#7C3AED] to-[#8B5CF6] p-7 text-white shadow-[0_8px_32px_rgba(99,102,241,0.3)]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4" />
        <p className="text-xs font-semibold uppercase tracking-widest opacity-90">
          You&apos;ve used your free run today
        </p>
      </div>
      <h3
        className="text-2xl font-extrabold mb-3"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        Unlimited tool runs with Ivy Admit Pro
      </h3>
      <ul className="space-y-2 text-sm opacity-95 mb-6">
        {[
          "Unlimited runs of every tool, every day",
          "Full essay scoring with line-by-line feedback",
          "Unlimited hook and rewrite suggestions",
          "Trained on 500+ Ivy League accepted essays",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/editor"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#6366F1] font-semibold text-sm hover:bg-white/95 transition-colors"
      >
        Upgrade to Pro
      </Link>
    </div>
  );
}
