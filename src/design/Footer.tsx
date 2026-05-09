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
  { label: "All Colleges", href: "/colleges" },
  { label: "Essay Examples", href: "/ivy-league-essay-examples" },
  { label: "Common App Guide", href: "/blog/how-to-write-common-app-essay" },
  { label: "Common App Prompts 2025–26", href: "/blog/common-app-essay-prompts-2025" },
  { label: "Ivy Essay Tips", href: "/blog/ivy-league-essay-tips" },
];

const COLLEGES: LinkItem[] = [
  { label: "Harvard", href: "/colleges/harvard" },
  { label: "Stanford", href: "/colleges/stanford" },
  { label: "MIT", href: "/colleges/mit" },
  { label: "Yale", href: "/colleges/yale" },
  { label: "Princeton", href: "/colleges/princeton" },
  { label: "Columbia", href: "/colleges/columbia" },
  { label: "Penn", href: "/colleges/upenn" },
  { label: "Duke", href: "/colleges/duke" },
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
    <footer className="border-t border-hair bg-paper pt-40 md:pt-56 pb-14 md:pb-20">
      <div className="container-editorial">
        <div className="flex flex-col lg:flex-row gap-y-14 gap-x-20">
          <div className="lg:w-[260px] shrink-0">
            <Wordmark />
            <p className="mt-5 font-serif italic text-[17px] leading-[1.5] text-ink-2 max-w-[260px]">
              Admit smarter. Your essay, louder.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
            <div>
              <h2 className="eyebrow mb-5">Product</h2>
              <LinkList items={PRODUCT} />
            </div>
            <div>
              <h2 className="eyebrow mb-5">Resources</h2>
              <LinkList items={RESOURCES} />
            </div>
            <div>
              <h2 className="eyebrow mb-5">Colleges</h2>
              <LinkList items={COLLEGES} />
            </div>
            <div>
              <h2 className="eyebrow mb-5">Company</h2>
              <LinkList items={COMPANY} />
            </div>
            <div>
              <h2 className="eyebrow mb-5">Legal</h2>
              <LinkList items={LEGAL} />
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-8 border-t border-hair flex flex-col md:flex-row justify-between gap-4">
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
