"use client";

import { Leaf } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { EssayList } from "./components/EssayList";

export default function EditorApp() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-slate-200 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-[#0F172A]">Ivy Admit</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
<button
            onClick={() => signOut()}
            className="text-xs text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="pt-14">
        <EssayList />
      </div>
    </div>
  );
}
