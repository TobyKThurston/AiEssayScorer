import Link from "next/link";
import { Wordmark } from "./Brand";

type Column = {
  heading: string;
  links: { label: string; href: string }[];
};

const COLUMNS: Column[] = [
  {
    heading: "Product",
    links: [
      { label: "Score my essay", href: "/try" },
      { label: "Essay tools", href: "/tools" },
      { label: "AI Essay Review", href: "/ai-essay-review" },
      { label: "Essay Checker", href: "/college-essay-checker" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Common App Guide", href: "/blog/how-to-write-common-app-essay" },
      { label: "Common App Prompts 2025–26", href: "/blog/common-app-essay-prompts-2025" },
      { label: "Why This College", href: "/blog/why-this-college-essay" },
      { label: "Ivy Essay Tips", href: "/blog/ivy-league-essay-tips" },
      { label: "650-Word Guide", href: "/blog/college-essay-word-limit" },
      { label: "Essay Examples", href: "/ivy-league-essay-examples" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "mailto:support@getivyadmit.com" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hair bg-paper">
      <div className="container-editorial py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-[1.2fr_1fr_1.6fr_0.8fr_0.8fr] gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Wordmark />
            <p className="mt-5 font-serif italic text-[17px] leading-[1.45] text-ink-2 max-w-[280px]">
              Admit smarter. Your essay, louder.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="eyebrow mb-4">{col.heading}</h2>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("mailto:") ? (
                      <a
                        href={l.href}
                        className="text-[14px] text-ink-2 hover:text-oxblood transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-[14px] text-ink-2 hover:text-oxblood transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-hair flex flex-col md:flex-row justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-pencil">
            © {new Date().getFullYear()} Ivy Admit AI · Not affiliated with any college or university
          </p>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-pencil">
            <Link href="/terms" className="hover:text-oxblood transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-oxblood transition-colors">Privacy</Link>
            <a href="mailto:support@getivyadmit.com" className="hover:text-oxblood transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
