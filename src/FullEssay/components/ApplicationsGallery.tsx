import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, GraduationCap, BookOpen, Award, FileText } from "lucide-react";

type Application = {
  id: string;
  name: string;
  year: string;
  major: string;
  sat: number;
  gpa: number;
  essays: {
    title: string;
    prompt: string;
    excerpt: string;
  }[];
};

type School = {
  id: string;
  name: string;
  logo: string;
  applications: Application[];
};

const mockSchools: School[] = [
  {
    id: "harvard",
    name: "Harvard University",
    logo: "🎓",
    applications: [
      {
        id: "h1",
        name: "Sarah Chen",
        year: "Class of 2024",
        major: "Computer Science",
        sat: 1580,
        gpa: 4.0,
        essays: [
          {
            title: "Common App Essay",
            prompt: "The lessons we take from obstacles we encounter can be fundamental to later success.",
            excerpt: "When my robotics team's main controller failed two days before the regional competition, I learned that true engineering isn't about perfect execution—it's about creative problem-solving under pressure..."
          },
          {
            title: "Why Harvard",
            prompt: "Harvard has long recognized the importance of enrolling a diverse student body.",
            excerpt: "Harvard's unique combination of cutting-edge AI research and commitment to ethical technology development perfectly aligns with my vision of creating accessible solutions..."
          }
        ]
      },
      {
        id: "h2",
        name: "Michael Rodriguez",
        year: "Class of 2023",
        major: "Economics",
        sat: 1540,
        gpa: 3.98,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Reflect on a time when you questioned or challenged a belief or idea.",
            excerpt: "Growing up in a family of immigrants, I was taught that financial stability meant a stable job. But when I started my school's first microfinance club, I discovered that true economic empowerment..."
          },
          {
            title: "Why Harvard",
            prompt: "What would you want your future college roommate to know about you?",
            excerpt: "I'm the person who will debate monetary policy over late-night pizza, organize community service trips during breaks, and always have a spare charger when you need one..."
          }
        ]
      }
    ]
  },
  {
    id: "stanford",
    name: "Stanford University",
    logo: "🌲",
    applications: [
      {
        id: "s1",
        name: "Emily Park",
        year: "Class of 2024",
        major: "Bioengineering",
        sat: 1560,
        gpa: 4.0,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Discuss an accomplishment, event, or realization that sparked a period of personal growth.",
            excerpt: "Watching my grandmother struggle with Parkinson's disease transformed my abstract interest in biology into a concrete mission to develop accessible medical technologies..."
          },
          {
            title: "What Matters to You",
            prompt: "The Stanford community is deeply curious and driven to learn in and out of the classroom.",
            excerpt: "Innovation without empathy is just invention. At Stanford, I want to bridge the gap between cutting-edge biomedical research and the patients who need it most..."
          }
        ]
      },
      {
        id: "s2",
        name: "James Liu",
        year: "Class of 2025",
        major: "Symbolic Systems",
        sat: 1520,
        gpa: 3.95,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Share an essay on any topic of your choice.",
            excerpt: "The chess board in front of me wasn't just a game—it was a conversation about strategy, patience, and the beauty of finding patterns in chaos..."
          },
          {
            title: "Intellectual Vitality",
            prompt: "Tell us about an idea or an experience you find intellectually engaging.",
            excerpt: "I'm fascinated by the intersection of human cognition and artificial intelligence. How can we build systems that complement rather than replace human thinking?..."
          }
        ]
      }
    ]
  },
  {
    id: "mit",
    name: "MIT",
    logo: "⚛️",
    applications: [
      {
        id: "m1",
        name: "Alex Thompson",
        year: "Class of 2024",
        major: "Mechanical Engineering",
        sat: 1570,
        gpa: 3.99,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time.",
            excerpt: "There's something magical about the moment when a design transitions from sketch to prototype. In my garage workshop, hours disappear as I iterate on sustainable energy solutions..."
          },
          {
            title: "MIT Culture",
            prompt: "We know you lead a busy life, full of activities, many of which are required of you.",
            excerpt: "What truly excites me isn't just building things—it's building things that matter. At MIT, I want to join a community where 'because we can' meets 'because we should'..."
          }
        ]
      }
    ]
  },
  {
    id: "yale",
    name: "Yale University",
    logo: "🐶",
    applications: [
      {
        id: "y1",
        name: "Olivia Martinez",
        year: "Class of 2023",
        major: "Political Science",
        sat: 1550,
        gpa: 4.0,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Reflect on something that someone has done for you that has made you happy or thankful.",
            excerpt: "My debate coach didn't just teach me how to argue—she taught me how to listen. In a world of sound bites and echo chambers, that lesson changed everything..."
          },
          {
            title: "Why Yale",
            prompt: "What is it about Yale that has led you to apply?",
            excerpt: "Yale's residential college system represents something I deeply value: the idea that intellectual growth happens not just in classrooms, but in dining halls, late-night conversations, and unexpected connections..."
          }
        ]
      }
    ]
  }
];

export function ApplicationsGallery() {
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null);

  const toggleSchool = (schoolId: string) => {
    setExpandedSchool(expandedSchool === schoolId ? null : schoolId);
    setExpandedApplication(null);
  };

  const toggleApplication = (appId: string) => {
    setExpandedApplication(expandedApplication === appId ? null : appId);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent">
            Successful Applications
          </h1>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Explore real college applications from students who got accepted to top universities. Learn from their essays, stats, and strategies.
          </p>
        </motion.div>

        {/* Schools List */}
        <div className="space-y-4">
          {mockSchools.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* School Header */}
              <button
                onClick={() => toggleSchool(school.id)}
                className="w-full bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center shadow-lg">
                      <span className="text-3xl">{school.logo}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#0F172A] group-hover:text-[#3B82F6] transition-colors">
                        {school.name}
                      </h3>
                      <p className="text-[#64748B]">
                        {school.applications.length} {school.applications.length === 1 ? 'application' : 'applications'}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSchool === school.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
                  </motion.div>
                </div>
              </button>

              {/* Applications List */}
              <AnimatePresence>
                {expandedSchool === school.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 pl-4 md:pl-8">
                      {school.applications.map((app) => (
                        <div key={app.id}>
                          {/* Application Header */}
                          <button
                            onClick={() => toggleApplication(app.id)}
                            className="w-full bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 group"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center text-white shadow-md">
                                  <span className="font-semibold">{app.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div className="text-left">
                                  <h4 className="text-[#0F172A] group-hover:text-[#3B82F6] transition-colors">
                                    {app.name}
                                  </h4>
                                  <p className="text-[#64748B]">{app.year}</p>
                                </div>
                              </div>
                              <motion.div
                                animate={{ rotate: expandedApplication === app.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="w-5 h-5 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
                              </motion.div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="bg-[#F8FAFC] rounded-lg p-3 text-left">
                                <div className="flex items-center gap-2 mb-1">
                                  <GraduationCap className="w-4 h-4 text-[#3B82F6]" />
                                  <span className="text-[#64748B]">Major</span>
                                </div>
                                <p className="text-[#0F172A]">{app.major}</p>
                              </div>
                              <div className="bg-[#F8FAFC] rounded-lg p-3 text-left">
                                <div className="flex items-center gap-2 mb-1">
                                  <Award className="w-4 h-4 text-[#3B82F6]" />
                                  <span className="text-[#64748B]">SAT</span>
                                </div>
                                <p className="text-[#0F172A]">{app.sat}</p>
                              </div>
                              <div className="bg-[#F8FAFC] rounded-lg p-3 text-left">
                                <div className="flex items-center gap-2 mb-1">
                                  <BookOpen className="w-4 h-4 text-[#3B82F6]" />
                                  <span className="text-[#64748B]">GPA</span>
                                </div>
                                <p className="text-[#0F172A]">{app.gpa.toFixed(2)}</p>
                              </div>
                              <div className="bg-[#F8FAFC] rounded-lg p-3 text-left">
                                <div className="flex items-center gap-2 mb-1">
                                  <FileText className="w-4 h-4 text-[#3B82F6]" />
                                  <span className="text-[#64748B]">Essays</span>
                                </div>
                                <p className="text-[#0F172A]">{app.essays.length}</p>
                              </div>
                            </div>
                          </button>

                          {/* Essays */}
                          <AnimatePresence>
                            {expandedApplication === app.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 space-y-3 pl-4 md:pl-8">
                                  {app.essays.map((essay, essayIndex) => (
                                    <motion.div
                                      key={essayIndex}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: essayIndex * 0.1 }}
                                      className="bg-white rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100"
                                    >
                                      <div className="flex items-start gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                                          <FileText className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="text-[#0F172A] mb-1">{essay.title}</h5>
                                          <p className="text-[#94A3B8] italic">{essay.prompt}</p>
                                        </div>
                                      </div>
                                      <div className="bg-[#F8FAFC] rounded-lg p-4">
                                        <p className="text-[#475569] leading-relaxed">{essay.excerpt}</p>
                                      </div>
                                      <button className="mt-3 text-[#3B82F6] hover:text-[#0EA5E9] transition-colors">
                                        Read full essay →
                                      </button>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
