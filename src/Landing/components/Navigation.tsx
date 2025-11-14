"use client";

import { useState, useEffect } from "react";
import { Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";
import { useAuth } from "@/contexts/AuthContext";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Features", "How it works", "Pricing", "FAQ"];

  const handleLogout = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm" : "bg-white/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-[#0F172A]">Ivy Admit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                {link}
              </a>
            ))}
            {!loading && (
              <>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/auth/login" className="text-[#475569] hover:text-[#0F172A] transition-colors">
                    Login
                  </Link>
                )}
              </>
            )}
            <Button variant="primary" href="/upload">Review your essay</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#0F172A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#475569] hover:text-[#0F172A] transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              {!loading && (
                <>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="text-[#475569] hover:text-[#0F172A] transition-colors py-2 text-left"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="text-[#475569] hover:text-[#0F172A] transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </>
              )}
              <Button variant="primary" href="/upload" className="w-full mt-2">
                Review your essay
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
