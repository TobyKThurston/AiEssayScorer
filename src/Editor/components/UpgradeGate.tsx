"use client";

interface UpgradeGateProps {
  isLocked: boolean;
  featureName: string;
  description: string;
  children: React.ReactNode;
}

export function UpgradeGate({ isLocked, featureName, description, children }: UpgradeGateProps) {
  const handleUpgrade = async () => {
    const res = await fetch("/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="blur-[3px] pointer-events-none select-none">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-xl backdrop-blur-sm">
        <p className="text-xs font-semibold text-ink mb-0.5">{featureName}</p>
        <p className="text-[10px] text-pencil mb-2.5 text-center px-3">{description}</p>
        <button
          onClick={handleUpgrade}
          className="px-4 py-1.5 rounded-full bg-ink text-white text-xs font-medium hover:bg-[#1e1e3f] transition-all"
        >
          Unlock Pro
        </button>
      </div>
    </div>
  );
}
