import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "We couldn't find the page you were looking for. Try our tools, blog, or start a free essay review.",
  robots: { index: false, follow: true },
};

const destinations: { label: string; href: string; note: string }[] = [
  { label: "Free AI essay tools", href: "/tools", note: "160+ free utilities" },
  { label: "College essay blog", href: "/blog", note: "Guides and strategy" },
  { label: "AI essay review", href: "/ai-essay-review", note: "Score in 60 seconds" },
  { label: "Ivy League essay examples", href: "/ivy-league-essay-examples", note: "Annotated excerpts" },
  { label: "About Ivy Admit", href: "/about", note: "Why we built it" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main className="container-editorial pt-12 sm:pt-20 md:pt-28 pb-16 sm:pb-24 md:pb-32">
        <div className="grid grid-cols-12 gap-4 md:gap-10">
          {/* Numeral column - editorial drop */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="flex items-baseline gap-4 md:block">
              <span className="eyebrow">
                <span className="num">§</span> Errata
              </span>
            </div>
            <div
              className="font-serif italic text-oxblood leading-[0.82] tracking-[-0.04em] mt-2 md:mt-4 select-none"
              style={{ fontSize: "clamp(6rem, 20vw, 16rem)" }}
              aria-hidden="true"
            >
              404
            </div>
            <hr className="rule-thick mt-3 sm:mt-4 w-20 sm:w-24 bg-oxblood" />
          </div>

          {/* Copy + destinations column */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <h1 className="font-serif text-[26px] sm:text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.02em] text-ink mb-4 sm:mb-5">
              This page is <em className="italic text-oxblood">missing from the issue</em>.
            </h1>
            <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-[1.6] text-ink-2 max-w-[52ch] mb-8 sm:mb-10">
              The address you followed may have changed, moved, or never existed in the first place. No
              shame in a wrong turn - below are the best places to pick the thread back up.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link href="/" className="btn btn-lg btn-ink">
                Back to home
              </Link>
              <Link href="/try" className="btn btn-lg btn-ghost">
                Score an essay - free
              </Link>
            </div>

            <div>
              <p className="eyebrow mb-3">
                <span className="num">◦</span> Destinations
              </p>
              <hr className="rule" />
              <ul className="divide-y divide-[color:var(--color-hair)]">
                {destinations.map((d) => (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      className="group flex items-baseline justify-between gap-3 sm:gap-6 py-3 sm:py-4 hover:bg-cream/60 -mx-2 sm:-mx-3 px-2 sm:px-3 transition-colors"
                    >
                      <span className="font-serif text-[16px] sm:text-[18px] md:text-[20px] text-ink group-hover:text-oxblood transition-colors">
                        {d.label}
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-pencil shrink-0 text-right">
                        <span className="hidden sm:inline">{d.note}</span>
                        <span className="ml-2 sm:ml-3 text-oxblood group-hover:translate-x-0.5 inline-block transition-transform">
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
