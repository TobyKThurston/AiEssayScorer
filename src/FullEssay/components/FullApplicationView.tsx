"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { GraduationCap, Award, BookOpen, FileText, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function FullApplicationView() {
  const searchParams = useSearchParams();
  
  // Get data from URL params or use defaults
  const studentProfile = useMemo(() => ({
    name: searchParams.get("student") || "Sarah Chen",
    year: searchParams.get("year") || "Class of 2024",
    major: searchParams.get("major") || "Computer Science",
    school: searchParams.get("school") || "Harvard University",
    sat: parseInt(searchParams.get("sat") || "1580"),
    gpa: parseFloat(searchParams.get("gpa") || "4.0"),
  }), [searchParams]);

  const essay = useMemo(() => ({
    type: searchParams.get("essayTitle") || "Common App Essay",
    prompt: searchParams.get("prompt") || "The lessons we take from obstacles we encounter can be fundamental to later success.",
    content: searchParams.get("content") || "When my robotics team's main controller failed two days before the regional competition, I learned that true engineering isn't about perfect execution, it's about creative problem-solving under pressure..."
  }), [searchParams]);
  return (
    <div className="min-h-screen bg-paper pt-14 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
      <div className="max-w-[900px] mx-auto px-5 sm:px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/ivy-league-essay-examples"
            className="flex items-center gap-2 text-pencil hover:text-oxblood transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all applications</span>
          </Link>
        </motion.div>

        {/* Student Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-5 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-6 sm:mb-8"
        >
          <div className="flex items-start gap-4 sm:gap-6 mb-5 sm:mb-6">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-oxblood to-forest flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <span className="text-lg sm:text-2xl">{studentProfile.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="mb-2 text-2xl sm:text-3xl">{studentProfile.name}</h1>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-pencil text-[13px] sm:text-base">
                <span>{studentProfile.year}</span>
                <span>•</span>
                <span>{studentProfile.major}</span>
                <span>•</span>
                <span className="text-oxblood font-medium">{studentProfile.school}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="bg-paper rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-oxblood" />
                <span className="text-pencil text-[11px] sm:text-sm">SAT</span>
              </div>
              <p className="text-ink text-[14px] sm:text-base">{studentProfile.sat}</p>
            </div>
            <div className="bg-paper rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-oxblood" />
                <span className="text-pencil text-[11px] sm:text-sm">GPA</span>
              </div>
              <p className="text-ink text-[14px] sm:text-base">{studentProfile.gpa.toFixed(2)}</p>
            </div>
            <div className="bg-paper rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-oxblood" />
                <span className="text-pencil text-[11px] sm:text-sm">Major</span>
              </div>
              <p className="text-ink text-[13px] sm:text-base truncate">{studentProfile.major}</p>
            </div>
            <div className="bg-paper rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-oxblood" />
                <span className="text-pencil text-[11px] sm:text-sm">School</span>
              </div>
              <p className="text-ink text-[12px] sm:text-sm truncate">{studentProfile.school}</p>
            </div>
          </div>
        </motion.div>

        {/* Essay Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-ink mb-6">Essay</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            {/* Essay Header */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oxblood to-forest flex items-center justify-center flex-shrink-0 shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-ink mb-2">{essay.type}</h3>
                <p className="text-pencil italic leading-relaxed">{essay.prompt}</p>
              </div>
            </div>

            {/* Essay Content */}
            <div className="prose prose-slate max-w-none">
              {essay.content.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="text-ink-2 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
