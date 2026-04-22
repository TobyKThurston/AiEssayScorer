export function Rule({ thick = false, className = "" }: { thick?: boolean; className?: string }) {
  return <hr className={`${thick ? "rule-thick" : "rule"} ${className}`} />;
}
