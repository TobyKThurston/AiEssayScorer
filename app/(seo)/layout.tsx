import { Navigation } from "@/Landing/components/Navigation";
import { Footer } from "@/Landing/components/Footer";

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#EFF6FF] to-[#F0FDFF] text-[#0F172A] overflow-x-hidden relative">
      <div className="fixed top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[#C4B5FD]/30 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#BAE6FD]/25 blur-[100px] pointer-events-none z-0" />
      <Navigation />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
