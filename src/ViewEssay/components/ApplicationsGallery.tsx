"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ChevronDown, GraduationCap, BookOpen, Award, FileText, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./Button";

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
    logo: "",
    applications: [
      {
        id: "h1",
        name: "Sarah C.",
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
        name: "Michael R.",
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
    id: "columbia",
    name: "Columbia University",
    logo: "",
    applications: [
      {
        id: "c1",
        name: "Jessica T.",
        year: "Class of 2024",
        major: "Political Science",
        sat: 1550,
        gpa: 3.97,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Share an essay on any topic of your choice.",
            excerpt: "The subway car rumbled beneath Times Square as I clutched my notebook, observing the mosaic of humanity around me. New York wasn't just a city—it was a living laboratory of human interaction..."
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's Core Curriculum represents everything I believe education should be: challenging, diverse, and deeply humanistic. In a world increasingly divided, studying the great works alongside students from every background..."
          }
        ]
      },
      {
        id: "c2",
        name: "David K.",
        year: "Class of 2025",
        major: "Neuroscience",
        sat: 1570,
        gpa: 4.0,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Reflect on a time when you questioned or challenged a belief or idea.",
            excerpt: "When my younger brother was diagnosed with autism, I began questioning everything I thought I knew about intelligence, communication, and what it means to be 'normal'..."
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "The intersection of Columbia's neuroscience program and its location in New York City offers unparalleled opportunities to study the human mind while being surrounded by millions of unique examples..."
          }
        ]
      },
      {
        id: "c3",
        name: "Priya S.",
        year: "Class of 2024",
        major: "English Literature",
        sat: 1530,
        gpa: 3.99,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Discuss an accomplishment, event, or realization that sparked a period of personal growth.",
            excerpt: "The first time I performed my poetry at an open mic, my hands shook so badly I could barely read my own handwriting. But somewhere between the first stanza and the last, I found my voice..."
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's literary tradition, from the Beats to contemporary voices, combined with the Core's emphasis on close reading and critical thinking, creates the perfect environment for a writer who wants to understand..."
          }
        ]
      },
      {
        id: "c4",
        name: "Marcus W.",
        year: "Class of 2023",
        major: "Civil Engineering",
        sat: 1520,
        gpa: 3.94,
        essays: [
          {
            title: "Common App Essay",
            prompt: "The lessons we take from obstacles we encounter can be fundamental to later success.",
            excerpt: "After Hurricane Maria devastated my family's hometown in Puerto Rico, I spent my summer break there, not on vacation, but helping rebuild. Infrastructure isn't just about bridges and roads..."
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's Earth Institute and its focus on sustainable infrastructure in urban environments aligns perfectly with my goal of creating resilient systems for vulnerable communities..."
          }
        ]
      },
      {
        id: "c5",
        name: "Aisha M.",
        year: "Class of 2025",
        major: "Film Studies",
        sat: 1540,
        gpa: 3.96,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time.",
            excerpt: "There's a specific quality of light that appears just before sunset—cinematographers call it the golden hour. I call it magic. With my camera, I chase these moments, trying to capture stories that words cannot tell..."
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Being in New York City, the backdrop of countless iconic films, while studying at Columbia's Film program means learning from both the masters of cinema and the city itself..."
          }
        ]
      },
      {
        id: "c6",
        name: "Ryan L.",
        year: "Class of 2024",
        major: "Mathematics",
        sat: 1600,
        gpa: 4.0,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Share an essay on any topic of your choice.",
            excerpt: "To most people, math is about finding the right answer. To me, it's about discovering elegant questions. The beauty isn't in solving for x—it's in understanding why x matters..."
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's math department, with its emphasis on both pure theory and real-world applications, offers the perfect balance between abstract beauty and practical impact..."
          }
        ]
      },
      {
        id: "c7",
        name: "Sophie H.",
        year: "Class of 2023",
        major: "Environmental Science",
        sat: 1560,
        gpa: 3.98,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Reflect on something that someone has done for you that has made you happy or thankful.",
            excerpt: "My environmental science teacher didn't just teach us about climate change—she took us to the local river every week to test water quality. Those muddy mornings taught me that environmental action starts local..."
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "The Earth Institute at Columbia represents the forefront of environmental research and policy. I want to be part of developing solutions that are both scientifically sound and politically viable..."
          }
        ]
      },
      {
        id: "c8",
        name: "Ethan P.",
        year: "Class of 2025",
        major: "History",
        sat: 1510,
        gpa: 3.93,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Reflect on a time when you questioned or challenged a belief or idea.",
            excerpt: "My AP History textbook presented the Civil Rights Movement as a neat narrative with a clear beginning and end. But when I interviewed my grandmother, who lived through it, I learned that history is never that simple..."
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's Core Curriculum, particularly Contemporary Civilization, offers exactly what I'm looking for: the chance to grapple with difficult questions about power, justice, and human nature..."
          }
        ]
      }
    ]
  },
  {
    id: "stanford",
    name: "Stanford University",
    logo: "",
    applications: [
      {
        id: "s1",
        name: "Emily P.",
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
        name: "James L.",
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
    logo: "",
    applications: [
      {
        id: "m1",
        name: "Alex T.",
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
    logo: "",
    applications: [
      {
        id: "y1",
        name: "Olivia M.",
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
  },
  {
    id: "princeton",
    name: "Princeton University",
    logo: "",
    applications: [
      {
        id: "p1",
        name: "Benjamin F.",
        year: "Class of 2024",
        major: "Physics",
        sat: 1590,
        gpa: 4.0,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time.",
            excerpt: "Quantum mechanics defies intuition. Particles exist in multiple states simultaneously until observed. This fundamental weirdness of reality captivates me endlessly..."
          },
          {
            title: "Why Princeton",
            prompt: "Princeton values community and encourages students to engage with one another.",
            excerpt: "Princeton's undergraduate focus means unprecedented access to world-class faculty and cutting-edge research, while maintaining the tight-knit intellectual community I'm seeking..."
          }
        ]
      },
      {
        id: "p2",
        name: "Natalie G.",
        year: "Class of 2025",
        major: "Public Policy",
        sat: 1540,
        gpa: 3.97,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Reflect on a time when you questioned or challenged a belief or idea.",
            excerpt: "When I advocated for funding our school's mental health resources, I learned that effective policy isn't about being right—it's about building coalitions and finding common ground..."
          },
          {
            title: "Why Princeton",
            prompt: "Princeton values community and encourages students to engage with one another.",
            excerpt: "The Woodrow Wilson School's combination of rigorous quantitative training and real-world policy experience aligns perfectly with my goal of creating evidence-based solutions to social challenges..."
          }
        ]
      }
    ]
  },
  {
    id: "upenn",
    name: "University of Pennsylvania",
    logo: "",
    applications: [
      {
        id: "up1",
        name: "Jordan B.",
        year: "Class of 2024",
        major: "Business (Wharton)",
        sat: 1550,
        gpa: 3.98,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Share an essay on any topic of your choice.",
            excerpt: "I started selling custom sneakers in middle school. What began as a side hustle taught me more about entrepreneurship, supply chains, and customer relationships than any textbook could..."
          },
          {
            title: "Why Penn",
            prompt: "How will you explore your intellectual and academic interests at Penn?",
            excerpt: "Wharton's emphasis on social impact entrepreneurship perfectly aligns with my belief that business should be a force for positive change, not just profit maximization..."
          }
        ]
      }
    ]
  },
  {
    id: "brown",
    name: "Brown University",
    logo: "",
    applications: [
      {
        id: "b1",
        name: "Isabella N.",
        year: "Class of 2025",
        major: "Anthropology",
        sat: 1530,
        gpa: 3.96,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Discuss an accomplishment, event, or realization that sparked a period of personal growth.",
            excerpt: "Volunteering at a refugee resettlement center, I realized that understanding different cultures isn't about cataloging differences—it's about recognizing our shared humanity..."
          },
          {
            title: "Why Brown",
            prompt: "Why are you drawn to the area(s) of study you indicated?",
            excerpt: "Brown's Open Curriculum allows me to explore the connections between anthropology, public health, and creative writing without artificial barriers between disciplines..."
          }
        ]
      }
    ]
  },
  {
    id: "cornell",
    name: "Cornell University",
    logo: "",
    applications: [
      {
        id: "co1",
        name: "Andrew Z.",
        year: "Class of 2024",
        major: "Agricultural Sciences",
        sat: 1500,
        gpa: 3.92,
        essays: [
          {
            title: "Common App Essay",
            prompt: "The lessons we take from obstacles we encounter can be fundamental to later success.",
            excerpt: "When drought destroyed our family farm's corn crop, I started researching climate-resistant agriculture. That devastating season sparked my passion for sustainable farming practices..."
          },
          {
            title: "Why Cornell",
            prompt: "What is it about Cornell and your intended major that resonates with you?",
            excerpt: "Cornell's College of Agriculture and Life Sciences offers the unique combination of Ivy League academics and hands-on agricultural research that I need to develop sustainable solutions for small farms..."
          }
        ]
      }
    ]
  },
  {
    id: "dartmouth",
    name: "Dartmouth College",
    logo: "",
    applications: [
      {
        id: "d1",
        name: "Emma V.",
        year: "Class of 2023",
        major: "Environmental Studies",
        sat: 1540,
        gpa: 3.95,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time.",
            excerpt: "Hiking the Appalachian Trail last summer, I became obsessed with understanding forest ecosystems. Every plant, insect, and soil microbe plays a crucial role in an intricate web of life..."
          },
          {
            title: "Why Dartmouth",
            prompt: "What excites you about Dartmouth?",
            excerpt: "Dartmouth's location and commitment to environmental stewardship means learning doesn't stop at the classroom door. The mountains, forests, and rivers are my laboratory..."
          }
        ]
      }
    ]
  },
  {
    id: "duke",
    name: "Duke University",
    logo: "",
    applications: [
      {
        id: "du1",
        name: "Carlos R.",
        year: "Class of 2024",
        major: "Biomedical Engineering",
        sat: 1560,
        gpa: 3.99,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Reflect on something that someone has done for you that has made you happy or thankful.",
            excerpt: "When my little sister was born with a heart defect, the pediatric surgeon who saved her life showed me the power of engineering applied to medicine. That moment defined my path..."
          },
          {
            title: "Why Duke",
            prompt: "What is your sense of Duke as a university and a community?",
            excerpt: "Duke's collaboration between the Pratt School of Engineering and the School of Medicine creates unparalleled opportunities for biomedical innovation with real clinical impact..."
          }
        ]
      }
    ]
  },
  {
    id: "northwestern",
    name: "Northwestern University",
    logo: "",
    applications: [
      {
        id: "nw1",
        name: "Maya K.",
        year: "Class of 2025",
        major: "Journalism",
        sat: 1520,
        gpa: 3.94,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Reflect on a time when you questioned or challenged a belief or idea.",
            excerpt: "Running my school newspaper, I learned that journalism isn't about confirming what people already believe—it's about asking uncomfortable questions and seeking truth even when it's inconvenient..."
          },
          {
            title: "Why Northwestern",
            prompt: "What are the unique qualities of Northwestern that make you want to attend?",
            excerpt: "Medill's reputation for producing top journalists, combined with Northwestern's emphasis on hands-on experience in Chicago, offers the perfect training ground for a future investigative reporter..."
          }
        ]
      }
    ]
  },
  {
    id: "uchicago",
    name: "University of Chicago",
    logo: "",
    applications: [
      {
        id: "uc1",
        name: "Daniel W.",
        year: "Class of 2024",
        major: "Philosophy",
        sat: 1580,
        gpa: 3.97,
        essays: [
          {
            title: "Common App Essay",
            prompt: "Share an essay on any topic of your choice.",
            excerpt: "What if the question mark is the most powerful punctuation? Every great discovery, every revolution, every breakthrough begins with someone questioning the status quo..."
          },
          {
            title: "UChicago Supplement",
            prompt: "What's so odd about odd numbers?",
            excerpt: "Odd numbers refuse to be divided equally. They resist symmetry, embrace asymmetry, and in their stubbornness, reveal something fundamental about the nature of infinity and indivisibility..."
          }
        ]
      }
    ]
  }
];

export function ApplicationsGallery() {
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null);
  // Temporarily disabled subscription check for testing
  const [isSubscribed, setIsSubscribed] = useState(true); // Set to true to bypass blocking
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Temporarily disabled subscription check
  // useEffect(() => {
  //   if (user) {
  //     fetch("/api/subscription-status")
  //       .then(res => res.json())
  //       .then(data => {
  //         setIsSubscribed(data.isSubscribed || false);
  //         setLoading(false);
  //       })
  //       .catch(() => {
  //         setIsSubscribed(false);
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // }, [user]);

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("Failed to start checkout. Please try again.");
    }
  };

  const toggleSchool = (schoolId: string) => {
    if (!isSubscribed && !user) {
      return;
    }
    setExpandedSchool(expandedSchool === schoolId ? null : schoolId);
    setExpandedApplication(null);
  };

  const toggleApplication = (appId: string) => {
    if (!isSubscribed && !user) {
      return;
    }
    setExpandedApplication(expandedApplication === appId ? null : appId);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative">
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

        {/* Subscription Overlay */}
        {!isSubscribed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-md z-40 flex items-center justify-center rounded-2xl"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md mx-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-center border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Subscribe for Access</h2>
              <p className="text-[#64748B] mb-6">
                Get unlimited access to view successful college applications and learn from real essays that got students into top universities.
              </p>
              <Button variant="primary" onClick={handleSubscribe} className="w-full">
                Subscribe Now
              </Button>
            </div>
          </motion.div>
        )}

        {/* Schools List */}
        <div className={`space-y-4 ${!isSubscribed ? "blur-sm pointer-events-none select-none" : ""}`}>
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
                      <GraduationCap className="w-7 h-7 text-white" />
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
                                      <Link 
                                        href={`/full-essay?school=${encodeURIComponent(school.name)}&student=${encodeURIComponent(app.name)}&year=${encodeURIComponent(app.year)}&major=${encodeURIComponent(app.major)}&sat=${app.sat}&gpa=${app.gpa}&essayTitle=${encodeURIComponent(essay.title)}&prompt=${encodeURIComponent(essay.prompt)}&content=${encodeURIComponent(essay.excerpt)}`}
                                        className="mt-3 text-[#3B82F6] hover:text-[#0EA5E9] transition-colors inline-block"
                                      >
                                        Read full essay →
                                      </Link>
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