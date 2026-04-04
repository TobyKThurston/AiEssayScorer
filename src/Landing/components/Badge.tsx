interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 rounded-full border border-[#BFDBFE] bg-white text-[#1E40AF] text-xs font-medium shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
