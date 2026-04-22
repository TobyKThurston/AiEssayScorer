type IvyMarkProps = {
  size?: number;
  className?: string;
};

export function IvyMark({ size = 26, className }: IvyMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 28 C16 22, 16 18, 16 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 8 C10 8, 6 12, 6 17 C6 19, 7.5 20, 10 20 C14 20, 16 15, 16 8Z" fill="currentColor" />
      <path d="M16 13 C21.5 13, 25.5 16.5, 25.5 21 C25.5 23, 24 24, 21.5 24 C17.5 24, 16 19.5, 16 13Z" fill="currentColor" opacity="0.85" />
      <path d="M16 18 C12 18, 9 21, 9 25 C9 26.5, 10 27.5, 12 27.5 C15 27.5, 16 23, 16 18Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-ink">
      <IvyMark size={Math.round(size * 1.18)} />
      <span
        className="font-serif"
        style={{ fontSize: size, fontWeight: 500, letterSpacing: "-0.015em" }}
      >
        Ivy <span className="italic text-oxblood">Admit</span>
      </span>
    </span>
  );
}
