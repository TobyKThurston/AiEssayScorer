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
    Company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:support@getivyadmit.com" },
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  };

  return (
    <footer className="py-12 md:py-16 border-t border-white/40 relative bg-gradient-to-b from-transparent to-white/30 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo and tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-[#0F172A]">Ivy Admit</span>
            </div>
            <p className="text-[#64748B] max-w-xs">
              Admit smarter. The most strategic AI for getting in.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-medium text-[#0F172A]">{category}</h3>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("mailto:") || item.href === "#" ? (
                      <a
                        href={item.href}
                        className="text-[#64748B] hover:text-[#0F172A] transition-colors"
                      >
                        <small>{item.label}</small>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[#64748B] hover:text-[#0F172A] transition-colors"
                      >
                        <small>{item.label}</small>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 md:pt-8 border-t border-white/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <small className="text-[#64748B]">
            © 2026 Ivy Admit AI. All rights reserved.
          </small>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <a href="#" className="text-[#64748B] hover:text-[#0F172A] transition-colors">
              <small>Terms of Service</small>
            </a>
            <a href="#" className="text-[#64748B] hover:text-[#0F172A] transition-colors">
              <small>Privacy Policy</small>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
