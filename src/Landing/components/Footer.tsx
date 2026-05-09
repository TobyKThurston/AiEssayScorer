import { Leaf } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const footerLinks: Record<string, { label: string; href: string }[]> = {
    Product: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "AI Essay Review", href: "/ai-essay-review" },
      { label: "Essay Checker", href: "/college-essay-checker" },
      { label: "Common App Help", href: "/common-app-essay-help" },
      { label: "Improve Your Essay", href: "/how-to-improve-college-essay" },
      { label: "Essay Examples", href: "/ivy-league-essay-examples" },
    ],
    Guides: [
      { label: "How to Write the Common App Essay", href: "/blog/how-to-write-common-app-essay" },
      { label: "Common App Prompts 2025–26", href: "/blog/common-app-essay-prompts-2025" },
      { label: "Why This College Essay", href: "/blog/why-this-college-essay" },
      { label: "What Ivy Admissions Look For", href: "/blog/ivy-league-essay-tips" },
      { label: "650-Word Essay Guide", href: "/blog/college-essay-word-limit" },
      { label: "Columbia Why Essay", href: "/blog/columbia-why-columbia-essay-core-curriculum" },
      { label: "Columbia List Essay", href: "/blog/columbia-list-essay-what-are-you-reading" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:support@getivyadmit.com" },
    ],
    Legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "#" },
    ],
  };

  return (
    <footer className="py-10 sm:py-12 md:py-16 border-t border-hair relative bg-gradient-to-b from-transparent to-white/30 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo and tagline */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-oxblood to-forest flex items-center justify-center">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-semibold text-ink">Ivy Admit</span>
            </div>
            <p className="text-pencil text-[14px] sm:text-base max-w-xs">
              Admit smarter. The most strategic AI for getting in.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3 sm:mb-4 text-[13px] sm:text-sm font-medium text-ink">{category}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("mailto:") || item.href === "#" ? (
                      <a
                        href={item.href}
                        className="text-pencil hover:text-ink transition-colors block py-0.5 text-[13px] sm:text-[13.5px]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-pencil hover:text-ink transition-colors block py-0.5 text-[13px] sm:text-[13.5px]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 md:pt-8 border-t border-hair flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <small className="text-pencil text-[12px] sm:text-[13px] text-center md:text-left">
            © 2026 Ivy Admit AI. All rights reserved.
          </small>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link href="/terms" className="text-pencil hover:text-ink transition-colors text-[12px] sm:text-[13px]">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-pencil hover:text-ink transition-colors text-[12px] sm:text-[13px]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
