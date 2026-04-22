import type { ReactNode } from "react";

export function Eyebrow({
  num,
  children,
  className = "",
}: {
  num?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`eyebrow ${className}`}>
      {num ? <span className="num">{num}</span> : null}
      {children}
    </div>
  );
}
