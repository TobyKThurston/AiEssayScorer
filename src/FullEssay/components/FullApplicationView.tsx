"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { GraduationCap, Award, BookOpen, FileText, ArrowLeft } from "lucide-react";

const studentProfile = {
  name: "Sarah Chen",
  year: "Class of 2024",
  major: "Computer Science",
  school: "Harvard University",
  sat: 1580,
  gpa: 4.0,
  essayCount: 5
};

const essays = [
  {
    type: "Common Application Essay",
    prompt: "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
    content: `When my robotics team's main controller failed two days before the regional competition, I learned that true engineering isn't about perfect execution—it's about creative problem-solving under pressure.

It was 11 PM on a Thursday when our robot suddenly stopped responding. We had spent six months designing, building, and programming our competition robot, and with the regional championships just 48 hours away, disaster struck. The main microcontroller—the brain of our entire system—had fried during a routine test run.

My first instinct was panic. As team captain, I felt the weight of my teammates' disappointed faces. We had already qualified for nationals, and this competition was supposed to be our victory lap, our chance to refine our strategy before the big event. But instead of giving up, I gathered the team for an emergency meeting.

We made a decision that night that changed everything: instead of trying to replace the controller with an identical model (which would require completely reprogramming everything), we would retrofit the robot with a different controller we had from a previous project. This meant rewriting most of our code and redesigning several mechanical systems—in less than two days.

The next 40 hours were a blur of coffee, code, and collaboration. I divided the team into pairs, assigning each group a specific subsystem to tackle. I took on the most complex task myself: rewriting the autonomous navigation code. By Friday evening, we had a working prototype. It wasn't pretty, and it wasn't what we had originally planned, but it worked.

At the competition, our robot performed flawlessly. More importantly, our team's ability to adapt and overcome became a story that inspired other teams. We didn't just win the competition—we won the Innovation Award for our creative problem-solving.

This experience taught me that engineering is as much about resilience and adaptability as it is about technical skill. The best solutions don't always come from perfect planning; they come from the ability to think creatively when plans fall apart. Now, whenever I face a setback in my work—whether it's a failed experiment in my internship or a bug in my code—I remember that night and the lesson it taught me: obstacles aren't roadblocks, they're opportunities to innovate.`
  },
  {
    type: "Harvard Supplemental - Extracurricular Activity",
    prompt: "Briefly elaborate on one of your extracurricular activities, a job you hold, or responsibilities you have for your family.",
    content: `As founder and president of Code for Community, I transformed a small after-school coding club into a nonprofit organization that has taught programming to over 300 underserved middle school students across five schools in our district.

What started as informal tutoring sessions in the school library evolved into structured workshops covering Python, web development, and computational thinking. I designed a curriculum that makes coding accessible and relevant, using projects like creating personal websites, building simple games, and analyzing real-world data sets.

The most rewarding aspect isn't just teaching syntax and algorithms—it's watching students discover that technology is something they can create, not just consume. Last year, one of our seventh-grade students built a website to help her mother's small business reach more customers. Another created a program to help his younger siblings practice multiplication. These moments remind me why I started this initiative.

Running Code for Community has taught me as much as it has taught my students. I've learned to communicate complex concepts in simple terms, to manage a team of volunteer instructors, to write grant proposals for equipment funding, and to build partnerships with school administrators. I've discovered that the most meaningful technology projects aren't always the most technically sophisticated—they're the ones that solve real problems for real people.

This experience solidified my commitment to using computer science as a tool for social impact, a mission I want to continue at Harvard through initiatives like CS50 for high schools and collaborations with the Center for Public Interest Technology.`
  },
  {
    type: "Harvard Supplemental - Intellectual Experience",
    prompt: "Briefly describe an intellectual experience that was important to you.",
    content: `Reading "The Master Algorithm" by Pedro Domingos during my sophomore year fundamentally changed how I think about the relationship between humans and artificial intelligence.

I picked up the book expecting a technical overview of machine learning algorithms. Instead, I found a philosophical exploration of how different approaches to AI reflect different assumptions about the nature of learning, knowledge, and intelligence itself. Domingos argues that symbolists, connectionists, evolutionaries, Bayesians, and analogizers each have partial answers to the puzzle of machine learning, and that the future lies in synthesizing these perspectives.

This idea—that the most powerful solutions come from combining different frameworks rather than declaring one approach superior—resonated deeply with me. It made me rethink my own work in robotics and programming. I had always approached problems looking for the "right" solution, but Domingos showed me the value of hybrid approaches.

I tested this insight in my own projects. For my robotics team's navigation system, instead of relying solely on computer vision (a connectionist approach), I integrated it with symbolic rules and probabilistic modeling. The result was more robust than any single-method approach.

Beyond the technical insights, the book sparked questions that continue to drive my intellectual curiosity: How do we build AI systems that augment rather than replace human capabilities? What ethical frameworks should guide the development of increasingly autonomous systems? How can we ensure that the benefits of AI are distributed equitably?

These questions led me to start a reading group at school focused on AI ethics, to intern at a research lab studying human-AI collaboration, and to develop a deep interest in the intersection of computer science, philosophy, and public policy—an intersection I'm eager to explore at Harvard through courses like "Ethical and Social Issues in AI" and research opportunities at the Berkman Klein Center.`
  },
  {
    type: "Harvard Supplemental - Why Harvard",
    prompt: "Harvard has long recognized the importance of enrolling a diverse student body. How will the life experiences that shape who you are today enable you to contribute to Harvard?",
    content: `As the daughter of immigrants who came to America with advanced degrees but had to start over in service jobs, I've learned to see opportunity in unexpected places and to build bridges between different worlds.

My parents arrived from China with engineering degrees and big dreams, but language barriers and credential recognition issues meant my father drove for Uber while my mother worked at a nail salon. Watching them rebuild their careers—my father eventually becoming a software engineer, my mother now managing her own salon—taught me that persistence and adaptability matter more than credentials.

Growing up in this environment gave me a unique perspective that I bring to every space I enter. At school, I'm the student who can explain technical concepts to non-technical audiences because I spent years translating between my parents' world and my teachers' expectations. I'm the team member who notices when someone is struggling to speak up because I remember my mother's hesitation to use English in professional settings.

This background has shaped my approach to technology and education. When I founded Code for Community to teach programming to underserved students, I designed the curriculum around the principle that everyone brings valuable perspectives to problem-solving, regardless of their background. I recruited instructors who spoke multiple languages and understood cultural barriers to STEM participation.

At Harvard, I want to continue bridging worlds. I'm excited to contribute to the Harvard College China Forum, where I can help facilitate dialogue between Chinese and American students. I want to join the Harvard College Women in Computer Science group to support other women in tech. I'm eager to work with Professor Finale Doshi-Velez on research that makes AI systems more interpretable and accessible to non-experts.

My parents taught me that diversity isn't just about representation—it's about bringing different ways of thinking to shared challenges. At Harvard, I'll bring the perspective of someone who has navigated between cultures, economic circumstances, and academic worlds, always looking for ways to make opportunities more accessible to others.`
  },
  {
    type: "Harvard Supplemental - What You'd Like to Know",
    prompt: "Top 3 things your roommate might like to know about you.",
    content: `1. I'm a terrible cook but an excellent baker. I stress-bake when I have problem sets due, which means our room will smell like fresh cookies during exam season. I promise to share (and I take requests—my chocolate chip cookies have won over many skeptics).

2. I debate monetary policy as a hobby. I'll argue the merits of different Federal Reserve strategies over breakfast and get genuinely excited about economic data releases. If this sounds boring, don't worry—I'm equally passionate about bad reality TV and will absolutely get invested in whatever show you're watching.

3. I'm an early bird with headphones. I do my best work between 6-8 AM, but I'm religious about not disrupting others' sleep. You'll never know I'm up unless you wake up to the smell of coffee (which I'm always happy to share).`
  }
];

export function FullApplicationView() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/view-essay"
            className="flex items-center gap-2 text-[#64748B] hover:text-[#3B82F6] transition-colors mb-8 group"
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
          className="bg-white rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-8"
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <span className="text-2xl">{studentProfile.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div className="flex-1">
              <h1 className="mb-2">{studentProfile.name}</h1>
              <div className="flex flex-wrap items-center gap-2 text-[#64748B]">
                <span>{studentProfile.year}</span>
                <span>•</span>
                <span>{studentProfile.major}</span>
                <span>•</span>
                <span className="text-[#3B82F6] font-medium">{studentProfile.school}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-[#64748B]">SAT Score</span>
              </div>
              <p className="text-[#0F172A]">{studentProfile.sat}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-[#64748B]">GPA</span>
              </div>
              <p className="text-[#0F172A]">{studentProfile.gpa.toFixed(2)}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-[#64748B]">Major</span>
              </div>
              <p className="text-[#0F172A]">{studentProfile.major}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-[#64748B]">Essays</span>
              </div>
              <p className="text-[#0F172A]">{studentProfile.essayCount}</p>
            </div>
          </div>
        </motion.div>

        {/* Essays Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-[#0F172A] mb-6">Application Essays</h2>
          
          {essays.map((essay, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            >
              {/* Essay Header */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center flex-shrink-0 shadow-md">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0F172A] mb-2">{essay.type}</h3>
                  <p className="text-[#64748B] italic leading-relaxed">{essay.prompt}</p>
                </div>
              </div>

              {/* Essay Content */}
              <div className="prose prose-slate max-w-none">
                {essay.content.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[#475569] leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
