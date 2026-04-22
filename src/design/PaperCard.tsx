import type { ReactNode } from "react";

export function PaperCard({
  children,
  className = "",
  padding = "p-7",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  padding?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag className={`paper-card ${padding} ${className}`}>{children}</Tag>
  );
}
