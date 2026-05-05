import Link from "next/link";
import { Wordmark } from "./Brand";

type LinkItem = { label: string; href: string };

const PRODUCT: LinkItem[] = [
  { label: "Score my essay", href: "/try" },
  { label: "Essay tools", href: "/tools" },
  { label: "AI Essay Review", href: "/ai-essay-review" },
  { label: "Essay Checker", href: "/college-essay-checker" },
  { label: "Pricing", href: "/#pricing" },
];

const RESOURCES: LinkItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "Common App Guide", href: "/blog/how-to-write-common-app-essay" },
  { label: "Common App Prompts 2025–26", href: "/blog/common-app-essay-prompts-2025" },
  { label: "Why This College", href: "/blog/why-this-college-essay" },
  { label: "Ivy Essay Tips", href: "/blog/ivy-league-essay-tips" },
  { label: "650-Word Guide", href: "/blog/college-essay-word-limit" },
  { label: "Essay Examples", href: "/ivy-league-essay-examples" },
];

const COMPANY: LinkItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:support@getivyadmit.com" },
];

const LEGAL: LinkItem[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

function FooterLink({ href, label }: LinkItem) {
  const cls = "text-[14px] text-ink-2 hover:text-oxblood transition-colors";
  return href.startsWith("mailto:") ? (
    <a href={href} className={cls}>{label}</a>
  ) : (
    <Link href={href} className={cls}>{label}</Link>
  );
}

function LinkList({ items }: { items: LinkItem[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((l) => (
        <li key={l.label}>
          <FooterLink {...l} />
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hair bg-paper">
      <div className="container-editorial py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 md:gap-x-10 gap-y-12">
          <div className="col-span-2 md:col-span-3">
            <Wordmark />
            <p className="mt-5 font-serif italic text-[17px] leading-[1.45] text-ink-2 max-w-[280px]">
              Admit smarter. Your essay, louder.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow mb-4">Product</h2>
            <LinkList items={PRODUCT} />
          </div>

          <div className="col-span-2 md:col-span-5">
            <h2 className="eyebrow mb-4">Resources</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {RESOURCES.map((l) => (
                <li key={l.label}>
                  <FooterLink {...l} />
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-y-8 gap-x-6">
            <div>
              <h2 className="eyebrow mb-4">Company</h2>
              <LinkList items={COMPANY} />
            </div>
            <div>
              <h2 className="eyebrow mb-4">Legal</h2>
              <LinkList items={LEGAL} />
            </div>
          </div>
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
