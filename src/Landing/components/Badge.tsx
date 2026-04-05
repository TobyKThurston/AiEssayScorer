interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-[#4F46E5] text-xs font-medium shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
