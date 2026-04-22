interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-full border border-[#3B82F6]/20 bg-paper-2/40 text-ink ${className}`}>
      <small>{children}</small>
    </div>
  );
}
