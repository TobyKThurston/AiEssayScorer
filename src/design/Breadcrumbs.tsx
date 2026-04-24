import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-pencil">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-oxblood transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-ink" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="text-oxblood/70 select-none">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <hr className="rule mt-3" />
    </nav>
  );
}
