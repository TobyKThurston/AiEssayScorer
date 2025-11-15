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
    fullContent?: string;
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
            excerpt: "When my robotics team's main controller failed two days before the regional competition, I learned that true engineering isn't about perfect execution. It's about creative problem-solving under pressure...",
            fullContent: `It was 11:47 PM on a Thursday when our robot died. Not dramatically, not with sparks or smoke. Just a quiet refusal to respond. The main controller, the brain we'd spent six months programming, had simply stopped working during a routine test run. Two days before regionals. Forty-eight hours before we were supposed to compete.

My first thought wasn't panic, though it should have been. Instead, I felt this strange calm settle over me. As team captain, I'd spent months preparing for every possible scenario: battery failures, sensor malfunctions, code bugs. But this? A complete controller failure? This wasn't in the playbook.

I called an emergency team meeting. At midnight. In my garage, surrounded by half-finished prototypes and spare parts from three years of competitions. My teammates arrived bleary-eyed but ready. That's when I knew we'd figure it out.

Instead of trying to replace the controller with an identical model, which would mean reprogramming everything from scratch, we made a decision that changed how I think about engineering: we'd retrofit the robot with a different controller from an old project. Different architecture, different capabilities, different everything. It meant rewriting most of our code. Redesigning mechanical systems. Rebuilding trust in our own abilities.

The next 40 hours blurred together. Coffee and code. Pizza at 3 AM. Me, hunched over my laptop, rewriting the autonomous navigation system while Maya rebuilt the sensor array and James redesigned the mechanical arm. We worked in shifts, slept in shifts, debugged in shifts. By Friday evening, we had something that worked. It wasn't pretty. It wasn't what we'd planned. But it moved. It responded. It was ours.

At the competition, our robot performed flawlessly. More than that, we won the Innovation Award for creative problem-solving. But the real victory wasn't the trophy. It was understanding that engineering isn't about having perfect plans. It's about having the resilience to rebuild when plans fall apart.

That experience taught me something I carry into every project now: obstacles aren't roadblocks. They're invitations to innovate. When my code breaks, when my experiments fail, when nothing goes according to plan, I remember that midnight in my garage. I remember that sometimes the best solutions come from the most unexpected places. And I remember that true engineering isn't about avoiding failure. It's about learning to rebuild, better, from whatever breaks.`
          },
          {
            title: "Why Harvard",
            prompt: "Harvard has long recognized the importance of enrolling a diverse student body.",
            excerpt: "Harvard's unique combination of cutting-edge AI research and commitment to ethical technology development perfectly aligns with my vision of creating accessible solutions...",
            fullContent: `My grandmother doesn't speak English. She's lived in America for twenty years, but she's never needed to learn it. Not really. She runs a small grocery store in our neighborhood, knows every customer by name, manages inventory, handles money, solves problems. All in Mandarin. All without ever touching a computer.

When I started learning to code, I thought about her constantly. Here I was, building apps and websites, creating systems that could connect people across continents. But my own grandmother couldn't use any of them. Not because she wasn't capable. Not because she wasn't smart. But because nobody had built technology that worked for her.

That realization changed everything. I stopped building projects that looked impressive and started building things that actually mattered. A translation app that worked offline. A grocery inventory system that used voice commands instead of typing. A video call interface so simple my grandmother could use it without asking for help.

Harvard's commitment to diversity isn't just about representation. It's about building technology that serves everyone. The AI research happening at Harvard isn't just cutting-edge. It's ethical. It's accessible. It's designed with people like my grandmother in mind.

I want to study computer science at Harvard because I want to be part of building the future. But a future that includes everyone. The research opportunities at the Berkman Klein Center, the collaboration with the Center for Public Interest Technology, the chance to work with professors who understand that innovation means nothing if it leaves people behind. That's what I'm looking for.

My grandmother taught me that technology is only as powerful as the people it serves. At Harvard, I'll learn to build systems that serve everyone. Not just the people who speak English. Not just the people who can afford the latest devices. Everyone.`
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
            excerpt: "Growing up in a family of immigrants, I was taught that financial stability meant a stable job. But when I started my school's first microfinance club, I discovered that true economic empowerment...",
            fullContent: `My father worked three jobs. Not because he wanted to. Because he had to. When we immigrated from Nigeria, his engineering degree didn't transfer. So he drove for Uber during the day, worked security at night, and on weekends, he fixed computers for neighbors. Three jobs. Seventy hours a week. All so we could have what he called "stability."

Stability, in our house, meant a steady paycheck. It meant never taking risks. It meant working yourself to exhaustion because that's what responsible people did. That's what I believed, too, until I met Mrs. Chen.

Mrs. Chen ran a small bakery out of her apartment. She made the most incredible pastries. Flaky croissants, delicate macarons, cakes that looked like art. But she couldn't get a loan. Not from a bank. Not with her credit history. Not with her income. So she stayed small. Stayed in her apartment. Stayed stuck.

I started my school's first microfinance club because of Mrs. Chen. Not because I thought I could change the world. But because I thought maybe I could help one person. We pooled our lunch money, our allowance, our part-time job earnings. We made small loans. Fifty dollars here. A hundred there. To people like Mrs. Chen who just needed a chance.

Mrs. Chen used her loan to buy a commercial oven. Six months later, she had a storefront. A year later, she was hiring employees. Two years later, she was teaching other immigrant women how to start their own businesses.

That's when I realized my father was wrong. Not about hard work. He was right about that. But about stability. True stability isn't about avoiding risk. It's about creating opportunities. It's about building systems that let people like Mrs. Chen, people like my father, turn their skills into something more.

I want to study economics because I want to understand how to build those systems. How to create financial structures that don't just preserve wealth, but create it. How to design policies that don't just protect the stable, but help the ambitious become stable.

My father taught me to work hard. Mrs. Chen taught me to work smart. At Harvard, I'll learn to build systems that let everyone do both.`
          },
          {
            title: "Why Harvard",
            prompt: "What would you want your future college roommate to know about you?",
            excerpt: "I'm the person who will debate monetary policy over late-night pizza, organize community service trips during breaks, and always have a spare charger when you need one...",
            fullContent: `Three things you should know about me:

First, I will absolutely debate monetary policy at 2 AM. I can't help it. When the Federal Reserve releases new data, I get genuinely excited. I'll wake you up to discuss quantitative easing. I'll argue about inflation rates over breakfast. I know this sounds annoying, but here's the thing: I also make really good pancakes. So if you're willing to listen to me explain why the Phillips curve is oversimplified, I'll feed you. Fair trade.

Second, I'm the person who organizes things. Not in a controlling way. In a "someone has to do it" way. I'll plan the study groups, coordinate the group projects, remember everyone's birthdays. I'll be the one who knows where the best late-night food is, who has the notes from the class you missed, who remembers to bring snacks to the library. I'm basically the mom friend, but with better memes.

Third, and most importantly: I believe in second chances. Not just for people. For ideas. For systems. For everything. I think the best solutions come from being willing to try again, differently. So if you're struggling with something, if you need help, if you want to try something new, I'm your person. I'll help you figure it out. I'll help you try again.

Also, I have a spare charger. Always. For every device. You're welcome.`
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
            excerpt: "The subway car rumbled beneath Times Square as I clutched my notebook, observing the mosaic of humanity around me. New York wasn't just a city—it was a living laboratory of human interaction...",
            fullContent: `The 1 train rumbles beneath Times Square, and I'm pressed against a window, notebook in hand. A woman in a business suit argues on her phone in Spanish. A teenager with headphones taps his foot to a beat only he can hear. An elderly man reads a newspaper in what looks like Arabic. A couple holds hands, not speaking, just existing together in this moving metal box.

I write it all down. Not because I'm nosy. Though maybe I am. But because I'm trying to understand something. How do all these people, with all their different lives, all their different stories, coexist in this one space? How do we share oxygen without sharing language? How do we respect each other's boundaries while being literally pressed against each other?

New York isn't just a city to me. It's a living laboratory of human interaction. Every subway ride is a masterclass in empathy. Every street corner is a lesson in coexistence. Every conversation overheard on the bus is a reminder that everyone has a story, and most of them are more interesting than mine.

I started writing because I wanted to capture these moments. Not the big moments. The graduations, the awards, the achievements. The small ones. The way a barista remembers someone's order. The way strangers help each other carry strollers up subway stairs. The way a city of millions can feel like a community when you know how to look.

Political science, to me, is just applied empathy. It's understanding how systems work, yes. But more importantly, understanding how people work within those systems. How do we create structures that let everyone thrive? How do we build institutions that respect individual stories while serving collective needs?

Columbia's Core Curriculum gets this. Reading the same texts, having the same conversations, but bringing different perspectives. That's what I want. Not to find the right answer, but to understand all the questions. Not to solve everything, but to learn how to ask better questions.

The subway taught me that we're all just trying to get somewhere. Columbia will teach me how to make sure everyone can.`
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's Core Curriculum represents everything I believe education should be: challenging, diverse, and deeply humanistic. In a world increasingly divided, studying the great works alongside students from every background...",
            fullContent: `There's something powerful about reading the same book as someone else. Not just reading it. Really reading it. Discussing it. Arguing about it. Finding yourself in it, even when it was written centuries ago, in a language you don't speak, by someone who lived a life you can't imagine.

Columbia's Core Curriculum does this. It forces you to sit in a room with people who see the world completely differently than you do, and it makes you all read the same words. Then it makes you talk about what those words mean. Not what they meant to the author. What they mean to you. What they mean to the person sitting next to you. What they mean to the person who disagrees with everything you just said.

That's what I want. Not just to learn about political systems, but to understand how different people experience those systems. Not just to study policy, but to debate it with people who've lived its consequences. Not just to read theory, but to see how it plays out in practice, in a city where theory meets reality every single day.

Columbia isn't just in New York. It's of New York. The city becomes your classroom. The subway becomes your study group. The diversity of the city becomes the diversity of your education. You're not just learning about the world. You're learning in it.

I want to study political science at Columbia because I want to understand how systems work. But more than that, I want to understand how people work within those systems. How do we create structures that serve everyone? How do we build institutions that respect individual stories while addressing collective needs?

The Core Curriculum teaches you to think critically. New York teaches you to think practically. Together, they teach you to think differently. That's what I'm looking for.`
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
            excerpt: "When my younger brother was diagnosed with autism, I began questioning everything I thought I knew about intelligence, communication, and what it means to be 'normal'...",
            fullContent: `My brother Jake doesn't make eye contact. He flaps his hands when he's excited. He can recite every line from every Pixar movie but can't tell you how his day at school was. When he was diagnosed with autism at age four, my parents cried. I was eight, and I didn't understand why. Jake was still Jake. He still laughed at the same jokes. He still wanted me to read him stories before bed. Nothing had changed.

But everything had changed. Suddenly, there were therapists in our house every day. There were charts on the wall tracking his progress. There were conversations about "normal" and "different" that I wasn't supposed to hear but did anyway. I started noticing how other kids looked at Jake at the playground. How parents pulled their children away when he got too close. How people spoke to him like he was broken.

I began to question what I'd always believed: that intelligence meant being able to answer questions quickly, that communication meant using words, that being normal meant fitting in. Jake challenged all of that. He could solve puzzles that would stump most adults. He communicated through his art, through his music, through the way he'd gently tap my shoulder when he wanted my attention. And normal? What even is that?

In high school, I started volunteering at a center for kids with autism. I watched as these incredible children, each with their own way of seeing the world, struggled in a system designed for neurotypical minds. I saw how Jake's teachers, despite their best intentions, tried to make him fit into their mold instead of adapting to his.

That's when I realized I wanted to study neuroscience. Not to "fix" people like Jake, but to understand them. To understand how different brains process information differently. To help create systems that accommodate all kinds of minds, not just the ones that fit neatly into categories.

Columbia's neuroscience program, combined with its location in New York City, offers me the chance to study the human mind while being surrounded by millions of unique examples. Every person on the subway, every interaction, every moment is a reminder that there's no such thing as a normal brain. There are just different ways of experiencing the world.

Jake taught me that intelligence isn't about fitting in. It's about being yourself, fully and completely. At Columbia, I'll learn to understand how brains like his work, and how to build a world that celebrates all kinds of minds.`
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "The intersection of Columbia's neuroscience program and its location in New York City offers unparalleled opportunities to study the human mind while being surrounded by millions of unique examples...",
            fullContent: `I want to study neuroscience because I believe understanding how brains work differently is the key to building a more inclusive world. Columbia's neuroscience program offers exactly what I'm looking for: rigorous research opportunities combined with a commitment to understanding neurodiversity.

But what really draws me to Columbia is its location. New York City is a living laboratory of human behavior. Every subway ride, every street corner, every interaction is a chance to observe how different minds navigate the world. The diversity of the city mirrors the diversity of human neurology. No two brains are the same, and no two people experience the city the same way.

Columbia's research in autism and neurodevelopmental disorders aligns perfectly with my goals. I want to work with professors who understand that studying the brain isn't about finding what's "wrong" with people. It's about understanding how different neurological profiles create different strengths and challenges.

The opportunity to conduct research while being immersed in a city of eight million people, each with their own unique way of thinking, is unparalleled. At Columbia, I won't just study neuroscience in a lab. I'll study it in the world, where it matters most.`
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
            excerpt: "The first time I performed my poetry at an open mic, my hands shook so badly I could barely read my own handwriting. But somewhere between the first stanza and the last, I found my voice...",
            fullContent: `The microphone felt heavier than I expected. My hands were shaking so badly I could barely hold the paper. The coffee shop was packed, and everyone was looking at me. Waiting. I had written this poem three months ago, tucked it away in a notebook, never thinking I'd actually read it out loud. But here I was, standing in front of strangers, about to share the most vulnerable thing I'd ever written.

I cleared my throat. The first line came out as a whisper. I could barely hear myself. But then something happened. As I read the second line, then the third, my voice got stronger. The words stopped being just words on a page. They became real. They became mine.

The poem was about my grandmother, who passed away the year before. About how she used to tell me stories in Hindi, stories I only half understood but completely felt. About how language isn't just about words. It's about the spaces between them. The things we can't say but still communicate.

When I finished, there was silence. Then applause. But more than that, there was understanding. People came up to me afterward, sharing their own stories about loss, about language, about the things we carry with us even when we can't name them.

That night changed everything. I realized that writing isn't about being perfect. It's about being honest. About finding the words for feelings that don't have names. About connecting with people through the things we're all afraid to say out loud.

I started going to open mics every week. I started a writing group at my school. I started submitting my work to literary magazines. Some got rejected. Some got accepted. But more importantly, I kept writing. I kept sharing. I kept finding my voice, one poem at a time.

Now, writing isn't just something I do. It's who I am. It's how I process the world. How I connect with people. How I make sense of experiences that don't make sense. That first open mic taught me that vulnerability isn't weakness. It's strength. And that finding your voice isn't about speaking perfectly. It's about speaking truthfully.`
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's literary tradition, from the Beats to contemporary voices, combined with the Core's emphasis on close reading and critical thinking, creates the perfect environment for a writer who wants to understand...",
            fullContent: `I want to study English literature at Columbia because I believe that understanding how stories work is the key to understanding how people work. Columbia's literary tradition, from the Beats to contemporary voices, shows me that this is a place where writing matters. Where it's taken seriously. Where it's seen as essential, not just decorative.

But what really draws me to Columbia is the Core Curriculum. The idea that everyone, regardless of their major, reads the same foundational texts. That we all grapple with the same questions about what it means to be human. That we all learn to read closely, think critically, and write clearly.

As a writer, I know that the best writing comes from deep reading. From understanding how other writers have used language to explore the human experience. The Core will give me that foundation. It will force me to read texts I might never pick up on my own. To engage with ideas that challenge my assumptions. To see how the questions we're asking today are the same questions people have been asking for centuries.

Columbia's location in New York City is also crucial. This is a city of stories. Every person has one. Every street corner has history. Every subway ride is a character study. I want to write in a place where stories are everywhere, where I can observe human nature in all its complexity, where I can find material in the everyday moments that most people overlook.

At Columbia, I'll learn to read like a writer and write like a reader. I'll study the great works while being surrounded by the living, breathing material of New York City. I'll develop the critical thinking skills that will make me a better writer, and the writing skills that will help me understand the world more deeply.`
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
            excerpt: "After Hurricane Maria devastated my family's hometown in Puerto Rico, I spent my summer break there, not on vacation, but helping rebuild. Infrastructure isn't just about bridges and roads...",
            fullContent: `The first thing I noticed when I got to my grandmother's house was the silence. No generators humming. No cars on the road. No electricity anywhere. Just silence, broken by the sound of people helping each other. That's what I remember most about the summer after Hurricane Maria. Not the destruction, though there was plenty of that. But the way people came together.

I was supposed to spend that summer at a pre-college engineering program. Instead, I spent it in Aguadilla, helping my family and neighbors rebuild. My grandmother's roof was gone. The bridge to town was washed out. The water system was contaminated. Everything we took for granted was gone.

At first, I felt useless. What could a seventeen-year-old from New Jersey do? But then I started paying attention. I watched as my uncle rigged up a solar panel system using parts from old electronics. I helped my cousin design a rainwater collection system. I saw how people were solving problems with whatever they had, because they had to.

That's when I realized what engineering really is. It's not about having the right tools or the perfect materials. It's about understanding what people need and finding a way to make it happen. Infrastructure isn't just about bridges and roads. It's about systems that let people live their lives. That let communities function. That let people feel safe.

I spent that summer learning from people who had been engineers their whole lives without ever calling themselves that. My grandmother knew exactly how to position her house to catch the breeze. My neighbor understood how to read the land to know where water would flow. These weren't academic concepts. They were survival skills.

When I came back to New Jersey, I saw everything differently. I saw how fragile our systems are. How dependent we are on things working perfectly. How unprepared we are when they don't. I realized that good engineering isn't about building things that work when everything is perfect. It's about building things that work when everything falls apart.

That summer taught me that obstacles aren't setbacks. They're teachers. They show you what really matters. They force you to be creative. They make you stronger. Now, when I think about what kind of engineer I want to be, I think about that summer. About building systems that serve people. That are resilient. That can weather any storm.`
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's Earth Institute and its focus on sustainable infrastructure in urban environments aligns perfectly with my goal of creating resilient systems for vulnerable communities...",
            fullContent: `After spending a summer helping rebuild after Hurricane Maria, I realized that the future of engineering isn't just about building things. It's about building things that can survive. That can adapt. That serve communities, not just individuals.

Columbia's Earth Institute represents exactly what I'm looking for: a commitment to sustainable infrastructure that considers both the technical and the human. The focus on urban environments is crucial because that's where most people live, and where the challenges are most complex.

What draws me to Columbia specifically is the interdisciplinary approach. Engineering doesn't exist in a vacuum. It intersects with policy, with economics, with social justice. The Earth Institute understands that. It brings together engineers, scientists, policymakers, and community leaders to solve problems holistically.

I want to study civil engineering at Columbia because I want to learn how to build infrastructure that's not just functional, but resilient. That doesn't just serve the present, but anticipates the future. That considers climate change, population growth, and resource scarcity as design constraints, not afterthoughts.

Columbia's location in New York City is also important. This is a city that's constantly rebuilding itself. That's dealing with the challenges of density, of climate, of aging infrastructure. It's a living laboratory for the kind of engineering I want to do.

At Columbia, I'll learn from professors who understand that engineering is a social science as much as it is a technical one. Who know that the best solutions come from understanding both the physics and the people. Who believe that infrastructure should serve communities, not the other way around.`
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
            excerpt: "There's a specific quality of light that appears just before sunset. Cinematographers call it the golden hour. I call it magic. With my camera, I chase these moments, trying to capture stories that words cannot tell...",
            fullContent: `There's a moment, right before the sun sets, when everything glows. Cinematographers call it the golden hour. I call it magic. When I'm behind my camera during those moments, I lose track of everything. Time stops. The world narrows to what I can see through the viewfinder.

I started filming when I was fourteen, mostly because I was terrible at writing. I had all these feelings, all these observations about the world, but I couldn't put them into words. Then I got a camera for my birthday, and everything changed. Suddenly, I could tell stories without sentences. I could capture emotions without adjectives. I could show people what I saw, exactly as I saw it.

My first real project was a short film about my neighborhood. I spent every afternoon for three months just walking around, filming. The way the light hit the fire escape at 4 PM. The way Mrs. Chen arranged her fruit stand every morning. The way kids played basketball in the street until the streetlights came on. I didn't have a script. I didn't have a plan. I just filmed what felt important.

When I edited it together, something happened. All those random moments became a story. About community. About the small things that make a place feel like home. About the way ordinary moments can be extraordinary if you pay attention.

That's what I love about film. It's about paying attention. About noticing the details that everyone else misses. About finding the story in the everyday. When I'm filming, I see the world differently. I notice how people's faces change when they think no one's watching. How light transforms ordinary spaces into something beautiful. How a single moment can contain an entire story.

I've made dozens of short films since then. Documentaries about my friends. Experimental pieces about memory. Narrative films about things that never happened but feel true anyway. Each one teaches me something new about how to tell a story. How to use light. How to use sound. How to use silence.

Film isn't just what I do. It's how I think. How I process the world. How I connect with people. When I'm behind the camera, I'm not just recording what's happening. I'm interpreting it. Finding the meaning in the moment. Telling a story that might not exist until I frame it.

That's why I lose track of time. Because filmmaking isn't about the clock. It's about the moment. And some moments are worth all the time in the world.`
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Being in New York City, the backdrop of countless iconic films, while studying at Columbia's Film program means learning from both the masters of cinema and the city itself...",
            fullContent: `I want to study film at Columbia because I believe that the best filmmakers are also the best observers. And there's no better place to observe human nature than New York City. This is a city of stories. Every person has one. Every street corner has history. Every subway ride is a character study.

Columbia's Film program understands that. It's not just about learning technique. It's about learning to see. To notice. To understand how stories work in the real world before you try to tell them on screen.

What draws me to Columbia specifically is the balance between theory and practice. I'll study film history, learn about the masters who came before, understand the language of cinema. But I'll also be making films constantly. Learning by doing. Experimenting. Finding my voice.

The location is everything. New York has been the backdrop for countless iconic films, but more than that, it's a living, breathing character. The energy of the city. The diversity of the people. The constant motion. All of that will inform my work. I'll be learning from professors who've made films here, who understand how to capture the city's essence, who know that New York isn't just a setting. It's a collaborator.

I also appreciate Columbia's emphasis on independent filmmaking. This isn't a program that's trying to churn out Hollywood directors. It's trying to develop artists. People who have something to say and know how to say it visually. People who understand that film is an art form, not just entertainment.

At Columbia, I'll learn from filmmakers who've made their mark on independent cinema. Who understand that the best stories often come from the margins. Who know that filmmaking is about more than just making movies. It's about understanding the world and sharing that understanding with others.`
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
            excerpt: "To most people, math is about finding the right answer. To me, it's about discovering elegant questions. The beauty isn't in solving for x—it's in understanding why x matters...",
            fullContent: `Most people think math is about finding answers. I think it's about finding questions. The most beautiful math problems aren't the ones with neat solutions. They're the ones that make you think differently. That reveal something about how the world works. That make you see patterns you never noticed before.

I fell in love with math in seventh grade, when my teacher showed us how to prove that the square root of two is irrational. Not because it was useful. Not because it would help me solve real-world problems. But because it was beautiful. Because it showed me that there are truths in the world that exist independently of us. That math isn't something humans invented. It's something we discovered.

Since then, I've spent countless hours exploring mathematical concepts that have no practical application whatsoever. I've read about infinity. About topology. About number theory. Not because I think I'll use these things in my career. But because they're fascinating. Because they make my brain work in ways that feel good. Because understanding them feels like understanding something fundamental about reality.

But here's the thing: the more I study pure math, the more I see it everywhere. The Fibonacci sequence in flower petals. The golden ratio in architecture. The way probability theory explains everything from genetics to finance. Math isn't separate from the world. It's the language the world speaks.

That's what I love about mathematics. It exists in this perfect space between the abstract and the concrete. Between pure thought and practical application. Between questions that have no answers and answers that raise new questions.

I want to study math because I want to understand this language better. To speak it more fluently. To see the patterns that connect seemingly unrelated things. To appreciate the beauty of elegant proofs and elegant problems.

But I also want to use math to solve real problems. To model climate change. To optimize systems. To understand data. Because the best math isn't just beautiful. It's also useful. And the most useful math is often the most beautiful.

At Columbia, I'll study pure mathematics because I love it. But I'll also see how it applies to everything else. How it connects to physics, to economics, to computer science. How abstract theory becomes practical tool. How elegant questions lead to important answers.`
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's math department, with its emphasis on both pure theory and real-world applications, offers the perfect balance between abstract beauty and practical impact...",
            fullContent: `I want to study mathematics at Columbia because I believe that the best mathematicians understand both pure theory and real-world application. Columbia's math department offers exactly that balance. I'll study abstract concepts because they're beautiful and fascinating. But I'll also see how those concepts apply to everything from physics to finance to computer science.

What draws me to Columbia specifically is the interdisciplinary approach. Math doesn't exist in isolation. It's the foundation for understanding everything else. At Columbia, I'll be able to explore how mathematics connects to other fields. How number theory relates to cryptography. How differential equations model physical systems. How statistics helps us understand data.

The location in New York City is also important. This is a city that runs on math. From Wall Street to tech startups to research institutions, mathematics is everywhere. I'll be learning in an environment where math isn't just an academic subject. It's a tool that people use every day to solve real problems.

Columbia's emphasis on research is also crucial. I want to work with professors who are pushing the boundaries of mathematical knowledge. Who are asking questions that haven't been asked before. Who understand that mathematics is a living, evolving field, not just a collection of facts to memorize.

At Columbia, I'll develop the rigorous thinking skills that come from studying pure mathematics. But I'll also learn how to apply those skills to real-world problems. How to see the math in everything. How to use abstract concepts to solve concrete challenges. That combination is what I'm looking for.`
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
            excerpt: "My environmental science teacher didn't just teach us about climate change—she took us to the local river every week to test water quality. Those muddy mornings taught me that environmental action starts local...",
            fullContent: `Every Tuesday morning at 7 AM, rain or shine, my environmental science teacher Ms. Rodriguez would meet us at the river. Not the clean, pretty river in the state park. The one that runs behind our school. The one that smells like industrial runoff and collects shopping carts in its bends.

Most teachers would have shown us pictures of pristine rivers and told us about water quality from a textbook. Ms. Rodriguez made us test it ourselves. We'd put on waders that were too big, carry equipment that was heavier than it looked, and spend two hours collecting samples, measuring pH levels, counting macroinvertebrates. Getting muddy. Getting cold. Getting frustrated when our data didn't make sense.

But here's what happened: we started to care. Not because she told us to. But because we saw it ourselves. We saw how the pH changed after heavy rain. How the macroinvertebrate count dropped near the industrial area. How the water quality directly correlated with what was happening upstream.

Ms. Rodriguez didn't just teach us about environmental science. She taught us that science isn't something that happens in a lab. It happens in the world. That data isn't abstract numbers. It's real consequences. That understanding a problem is the first step to solving it.

Those Tuesday mornings changed everything for me. I stopped thinking of environmental issues as distant problems that other people would solve. I started seeing them everywhere. In the river behind my school. In the air quality in my neighborhood. In the way my city handles waste.

I started a water quality monitoring program at three other schools. I organized a community cleanup of the river. I wrote a report on industrial runoff that got presented to the city council. Not because I thought I could save the world. But because Ms. Rodriguez showed me that you don't have to. You just have to care about your corner of it.

She taught me that environmental action doesn't start with big gestures. It starts with showing up. With paying attention. With doing the work, even when it's muddy and cold and nobody's watching. That lesson has shaped everything I've done since.`
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "The Earth Institute at Columbia represents the forefront of environmental research and policy. I want to be part of developing solutions that are both scientifically sound and politically viable...",
            fullContent: `I want to study environmental science at Columbia because I believe that solving environmental challenges requires both scientific rigor and policy understanding. The Earth Institute represents exactly that combination. It brings together scientists, policymakers, and practitioners to develop solutions that are both scientifically sound and politically viable.

What draws me to Columbia specifically is the emphasis on interdisciplinary work. Environmental problems don't fit neatly into academic categories. They require understanding science, yes, but also economics, policy, social justice, and human behavior. The Earth Institute gets that. It creates spaces where experts from different fields work together to solve complex problems.

The location in New York City is also crucial. This is a city that's dealing with the environmental challenges of the future right now. Sea level rise. Air quality. Urban heat islands. Water management. At Columbia, I won't just be studying these problems in theory. I'll be seeing them in practice. Working on solutions that could actually be implemented.

I also appreciate Columbia's commitment to both research and action. This isn't just about understanding environmental problems. It's about solving them. The Earth Institute works directly with communities, with governments, with organizations to implement solutions. That's what I want to do.

At Columbia, I'll develop the scientific skills to understand environmental systems. But I'll also learn how to communicate that understanding to policymakers. How to work with communities. How to turn research into action. That combination is what the world needs right now.`
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
            excerpt: "My AP History textbook presented the Civil Rights Movement as a neat narrative with a clear beginning and end. But when I interviewed my grandmother, who lived through it, I learned that history is never that simple...",
            fullContent: `My AP History textbook had a chapter on the Civil Rights Movement. It was clean. Organized. It had a beginning (Brown v. Board), a middle (the March on Washington), and an end (the Civil Rights Act). It made it sound like a story that was already finished. Like something that happened in the past and was now resolved.

Then I interviewed my grandmother for a school project. She was seventeen in 1963, living in Birmingham. She told me about things that weren't in the textbook. About the fear. About how it wasn't just about laws changing. It was about people changing. About how slow it was. How messy. How it's still happening.

She told me about her friend who got fired from her job for trying to register to vote. About her uncle who moved north because he couldn't find work. About how "the movement" wasn't one thing. It was thousands of individual acts of courage. Some big. Most small. All necessary.

That conversation changed how I think about history. I realized that textbooks tell stories, but people live experiences. That history isn't a series of events with clear causes and effects. It's complicated. It's ongoing. It's personal.

I started questioning everything I'd learned. Not because I thought it was wrong, but because I realized it was incomplete. History isn't just what happened. It's who tells the story. It's what gets remembered and what gets forgotten. It's whose perspective matters and whose doesn't.

Now, when I study history, I'm not just memorizing facts. I'm asking questions. Who wrote this? What were they trying to say? What were they leaving out? Whose voices are missing? History isn't about finding the right answer. It's about asking better questions.

That's what I want to study at Columbia. Not just history as it's been told, but history as it was lived. The complicated, messy, ongoing story of how we got here and where we're going.`
          },
          {
            title: "Why Columbia",
            prompt: "Why are you interested in attending Columbia University?",
            excerpt: "Columbia's Core Curriculum, particularly Contemporary Civilization, offers exactly what I'm looking for: the chance to grapple with difficult questions about power, justice, and human nature...",
            fullContent: `I want to study history at Columbia because I believe that understanding the past is essential to understanding the present. But more than that, I believe that history isn't just about what happened. It's about how we tell stories about what happened. About whose voices get heard and whose don't. About how the past shapes the present in ways we don't always recognize.

Columbia's Core Curriculum, particularly Contemporary Civilization, offers exactly what I'm looking for. It forces you to grapple with difficult questions about power, justice, and human nature. To read texts that challenge your assumptions. To engage with ideas that make you uncomfortable. To see how the questions we're asking today are the same questions people have been asking for centuries.

What draws me to Columbia specifically is the emphasis on primary sources. Not just reading about history, but reading the actual documents, the actual texts, the actual voices of people who lived it. That's how you understand history as it was experienced, not just as it's been interpreted.

The location in New York City is also important. This is a city with layers of history everywhere you look. From the tenement museums to the financial district to the neighborhoods that have been home to wave after wave of immigrants. At Columbia, I'll be studying history in a place where it's visible, where it's present, where it's still being made.

I also appreciate Columbia's commitment to diverse perspectives. This isn't just about Western history or American history. It's about understanding how different people, in different places, at different times, have grappled with the same fundamental questions about how to live together, how to organize society, how to pursue justice.

At Columbia, I'll learn to read critically, think historically, and write clearly. But more than that, I'll learn to question narratives, to seek out missing voices, to understand that history is always being rewritten. That's what I'm looking for.`
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
            excerpt: "Watching my grandmother struggle with Parkinson's disease transformed my abstract interest in biology into a concrete mission to develop accessible medical technologies...",
            fullContent: `My grandmother's hands shook. Not dramatically. Just a little tremor when she tried to pour her tea. At first, we thought it was just age. Then it got worse. Then she got the diagnosis: Parkinson's disease.

I was fifteen, and I didn't understand what that meant. I thought it was just about shaking. But it's so much more than that. It's about losing control of your own body. About your brain betraying you. About watching yourself slowly disappear.

My grandmother was a teacher for forty years. She loved reading, loved writing, loved sharing stories. But Parkinson's made it hard for her to hold a book. Made her handwriting illegible. Made her voice so quiet you had to lean in to hear her.

I watched her struggle with things that used to be effortless. Buttoning her shirt. Tying her shoes. Writing a letter. And I realized that the technology that could help her didn't exist. Or if it did, it was too expensive. Too complicated. Too designed for people who didn't need it.

That's when I knew what I wanted to do. Not just study biology. Not just understand how the body works. But develop technologies that actually help people. That are accessible. That are designed with the people who need them in mind.

I started researching assistive technologies. I learned about voice amplifiers, about weighted utensils, about apps that help with medication management. But I also learned about how expensive these things are. How complicated. How they're designed for the "average" patient, not for real people with real needs.

I started a project at my school to develop low-cost assistive devices. I worked with local seniors to understand what they actually needed. Not what engineers thought they needed. What they actually needed. The result was a series of simple, affordable tools that made a real difference in people's daily lives.

That experience taught me that innovation without empathy is just invention. That the best technology isn't the most advanced. It's the most useful. The most accessible. The most human.

At Stanford, I want to bridge that gap. Between cutting-edge biomedical research and the patients who need it. Between what's possible and what's practical. Between innovation and impact.`
          },
          {
            title: "What Matters to You",
            prompt: "The Stanford community is deeply curious and driven to learn in and out of the classroom.",
            excerpt: "Innovation without empathy is just invention. At Stanford, I want to bridge the gap between cutting-edge biomedical research and the patients who need it most...",
            fullContent: `What matters to me is making sure that the incredible advances in biomedical research actually reach the people who need them. Too often, there's a gap between what's possible in a lab and what's available to patients. Between innovation and impact.

I've seen this gap firsthand. My grandmother has Parkinson's disease, and I've watched her struggle with technologies that are either too expensive, too complicated, or too designed for someone else. The research exists. The solutions exist. But they're not reaching the people who need them.

That's what drives me. Not just understanding how the body works, but making sure that understanding translates into tools that actually help people. That are accessible. That are designed with empathy, not just efficiency.

At Stanford, I want to be part of a community that understands that innovation isn't just about what's new. It's about what's needed. That the best research isn't just published in journals. It's implemented in communities. That curiosity isn't just about asking questions. It's about finding answers that matter.

I want to work with professors who understand that bioengineering isn't just about building things. It's about building things that serve people. Who know that the most elegant solution isn't always the most complex. Sometimes it's the simplest. The most accessible. The most human.

Stanford's culture of collaboration, of interdisciplinary work, of thinking big but starting small, aligns perfectly with what I want to do. I want to be part of a community that's driven not just by curiosity, but by compassion. That sees research as a means to an end, not an end in itself.`
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
            excerpt: "The chess board in front of me wasn't just a game—it was a conversation about strategy, patience, and the beauty of finding patterns in chaos...",
            fullContent: `The chess board in front of me wasn't just a game. It was a conversation. A negotiation. A dance between possibility and constraint. Every move opened some doors and closed others. Every decision had consequences I couldn't fully predict.

I started playing chess when I was ten, mostly because my older brother was good at it and I wanted to beat him. But somewhere along the way, chess stopped being about winning and started being about thinking. About seeing patterns. About understanding how small decisions create big outcomes.

What fascinates me about chess is how it exists in this perfect space between logic and intuition. There are rules. There are patterns. There are strategies that work. But there's also creativity. Surprise. The ability to see something no one else sees. To find a solution that shouldn't exist but does.

I've spent thousands of hours studying chess. Learning openings. Analyzing endgames. Understanding the theory. But the moments I love most are the ones that aren't in the books. When I see a move that breaks all the rules but somehow works. When I find a pattern that connects seemingly unrelated positions. When I understand something about the game that I've never read anywhere.

That's what draws me to the intersection of human cognition and artificial intelligence. Chess is a perfect example of this intersection. Computers can now beat the best human players. They can calculate millions of positions per second. They can see patterns humans miss.

But humans still bring something unique. Intuition. Creativity. The ability to understand context. To see the bigger picture. To make decisions based on things that can't be quantified.

I want to study symbolic systems because I want to understand how we can build AI systems that complement human thinking rather than replace it. That enhance our abilities rather than just replicate them. That understand not just what we do, but why we do it.

Chess taught me that the best solutions often come from combining logic and intuition. From following the rules and breaking them. From understanding the theory and then transcending it. That's what I want to bring to AI.`
          },
          {
            title: "Intellectual Vitality",
            prompt: "Tell us about an idea or an experience you find intellectually engaging.",
            excerpt: "I'm fascinated by the intersection of human cognition and artificial intelligence. How can we build systems that complement rather than replace human thinking?...",
            fullContent: `I'm fascinated by the question of how we can build artificial intelligence systems that complement human thinking rather than replace it. This isn't just a technical question. It's a philosophical one. What makes human cognition unique? What can machines do better? What should they do better?

I've been exploring this question through chess. Computers can now beat the best human players. They can calculate millions of positions per second. They can see patterns humans miss. But humans still bring something unique. Intuition. Creativity. The ability to understand context in ways that can't be quantified.

The most interesting chess games aren't the ones where a computer crushes a human. They're the ones where humans and computers work together. Where human intuition guides computer calculation. Where the combination creates something neither could achieve alone.

That's what I want to understand. How can we design AI systems that enhance human abilities rather than just replicate them? That understand not just what we do, but why we do it? That can handle the routine tasks so we can focus on the creative ones?

This question connects everything I'm interested in. Psychology. Computer science. Philosophy. Cognitive science. It requires understanding how humans think, how machines think, and how they can work together.

At Stanford, I want to explore this intersection. To work with professors who are thinking about AI not just as a tool, but as a partner. Who understand that the future isn't about humans versus machines. It's about humans with machines. Working together to solve problems neither could solve alone.`
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
            excerpt: "There's something magical about the moment when a design transitions from sketch to prototype. In my garage workshop, hours disappear as I iterate on sustainable energy solutions...",
            fullContent: `There's a moment when an idea stops being abstract and becomes real. When a sketch on paper becomes a physical object you can hold. When theory becomes practice. That moment is what makes me lose track of time.

I spend most of my free time in my garage workshop, building things. Not because I have to. Because I want to. Because there's something deeply satisfying about taking an idea and making it real. About solving problems with your hands. About creating something that didn't exist before.

My current project is a small wind turbine. I've been working on it for months. Iterating. Testing. Failing. Learning. Each version is slightly better than the last. Each failure teaches me something new. Each success makes me want to push further.

What I love about building things is how it forces you to think in three dimensions. To consider not just what something should do, but how it will actually work. To understand materials. Forces. Constraints. To solve problems you didn't even know existed until you tried to build it.

But more than that, I love building things that matter. That solve real problems. That make a difference. My wind turbine project started because I wanted to understand renewable energy better. But it's become something more. It's become a way to think about how we can build a more sustainable future.

When I'm in my workshop, hours disappear. Not because I'm avoiding something, but because I'm fully engaged. Because I'm in that state where time doesn't matter. Where the only thing that matters is the problem in front of me and how to solve it.

That's what I want to do at MIT. Not just learn about engineering. But actually engineer things. To take ideas and make them real. To solve problems that matter. To build things that make a difference.`
          },
          {
            title: "MIT Culture",
            prompt: "We know you lead a busy life, full of activities, many of which are required of you.",
            excerpt: "What truly excites me isn't just building things—it's building things that matter. At MIT, I want to join a community where 'because we can' meets 'because we should'...",
            fullContent: `What excites me isn't just building things. It's building things that matter. That solve real problems. That make a difference. At MIT, I want to join a community where "because we can" meets "because we should." Where technical excellence serves a purpose. Where innovation is driven by impact, not just by possibility.

I've spent countless hours in my garage workshop, building things. Wind turbines. Solar panels. Water filtration systems. Not because they were assigned. Because I wanted to understand how they work. Because I wanted to solve problems that matter.

But what I've learned is that building things isn't enough. You have to build the right things. Things that serve people. Things that address real needs. Things that make the world better, not just more complicated.

At MIT, I want to be part of a community that understands that. That values not just technical skill, but also purpose. That asks not just "can we build this?" but "should we build this?" That sees engineering as a means to an end, not an end in itself.

I'm drawn to MIT's culture of hands-on learning, of making things, of solving problems. But I'm also drawn to its commitment to using those skills for good. To addressing global challenges. To making a positive impact.

I want to be part of a community where people are driven by curiosity and compassion. Where technical excellence serves a higher purpose. Where "because we can" is always followed by "and here's why we should."`
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
            excerpt: "My debate coach didn't just teach me how to argue—she taught me how to listen. In a world of sound bites and echo chambers, that lesson changed everything...",
            fullContent: `My debate coach, Ms. Chen, didn't just teach me how to argue. She taught me how to listen. And in a world of sound bites and echo chambers, that lesson changed everything.

I joined debate because I liked arguing. I liked being right. I liked winning. But Ms. Chen showed me that the best debaters aren't the ones who talk the most. They're the ones who listen the hardest. Who understand their opponent's argument better than their opponent does. Who can find the weakness not by attacking, but by understanding.

She made us do this exercise where we had to argue the opposite side of whatever we believed. Not as a game. Seriously. We had to find the strongest arguments for positions we disagreed with. We had to understand why reasonable people might hold views we found unreasonable.

At first, I hated it. It felt like intellectual dishonesty. Like I was betraying my own beliefs. But then something happened. I started to see the nuance. The complexity. The ways in which reasonable people could disagree. I started to understand that most arguments aren't between right and wrong. They're between different perspectives, different values, different ways of seeing the world.

Ms. Chen taught me that listening isn't about agreeing. It's about understanding. About finding common ground. About recognizing that even when we disagree, we're usually trying to solve the same problems. We just have different ideas about how.

That lesson has shaped everything I've done since. In student government, I learned to listen to people I disagreed with. To find solutions that worked for everyone, not just for me. In my community work, I learned to listen to the people I was trying to help. To understand what they actually needed, not what I thought they needed.

Ms. Chen gave me a gift that I'm still unwrapping. The ability to listen deeply. To understand perspectives different from my own. To find solutions that work for everyone. In a world that seems increasingly divided, that feels like the most important skill I could have learned.`
          },
          {
            title: "Why Yale",
            prompt: "What is it about Yale that has led you to apply?",
            excerpt: "Yale's residential college system represents something I deeply value: the idea that intellectual growth happens not just in classrooms, but in dining halls, late-night conversations, and unexpected connections...",
            fullContent: `What draws me to Yale is the residential college system. The idea that intellectual growth happens not just in classrooms, but in dining halls, in late-night conversations, in unexpected connections. That learning isn't just about what you study, but who you study with. How you live together. How you challenge each other.

I've learned that the best ideas don't come from isolated thinking. They come from conversation. From disagreement. From being around people who see the world differently than you do. Who challenge your assumptions. Who make you think harder.

Yale's residential college system creates exactly that environment. You're not just living with people who share your interests. You're living with people who have completely different interests. Who will ask you questions you've never considered. Who will make connections you never would have made.

That's what I'm looking for. Not just a place to study political science, but a place to live it. To debate it. To experience it. To understand how ideas work in practice, not just in theory.

Yale's commitment to both academic excellence and community engagement also resonates with me. This isn't just about learning for learning's sake. It's about learning to make a difference. To use knowledge to solve problems. To serve something larger than yourself.

The residential college system embodies that. It's about creating a community where people support each other, challenge each other, and grow together. Where intellectual growth and personal growth happen simultaneously. Where you become not just smarter, but better.

That's what I want. A place where learning is collaborative, not competitive. Where ideas are debated, not just memorized. Where you're surrounded by people who will push you to be your best self. That's Yale.`
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
            excerpt: "Quantum mechanics defies intuition. Particles exist in multiple states simultaneously until observed. This fundamental weirdness of reality captivates me endlessly...",
            fullContent: `Quantum mechanics makes no sense. And that's why I love it. A particle can be in multiple places at once until you look at it. Two particles can be entangled across the universe, instantly affecting each other. Reality itself seems to depend on observation. None of this should be possible. But it is.

I first learned about quantum mechanics in my physics class, and I couldn't stop thinking about it. I spent hours reading about it. Watching videos. Trying to understand something that, by definition, defies understanding. The more I learned, the more fascinated I became.

What draws me to quantum mechanics is how it challenges everything we think we know about reality. We think objects exist in definite states. Quantum mechanics says they exist in superpositions until observed. We think cause and effect are local. Quantum mechanics says particles can be instantaneously connected across any distance. We think reality is objective. Quantum mechanics suggests it might be subjective.

But here's the thing: quantum mechanics isn't just weird. It's useful. It explains how atoms work. How light behaves. How computers can be built. It's the foundation of modern technology. The weirdest, most counterintuitive theory in physics is also the most practical.

That's what I find so engaging. The way quantum mechanics exists in this perfect space between the abstract and the concrete. Between philosophy and engineering. Between questions about the nature of reality and solutions to practical problems.

When I'm studying quantum mechanics, hours disappear. Not because it's easy. It's not. But because it's fascinating. Because every answer raises new questions. Because understanding it feels like understanding something fundamental about how the universe works.

I want to study physics because I want to understand these fundamental questions. But I also want to see how those questions lead to practical applications. How understanding quantum mechanics can lead to quantum computing. How understanding particles can lead to new technologies.

At Princeton, I'll have the chance to explore both. To study pure physics because it's fascinating. But also to see how that pure physics becomes applied physics. How understanding the universe helps us build things that matter.`
          },
          {
            title: "Why Princeton",
            prompt: "Princeton values community and encourages students to engage with one another.",
            excerpt: "Princeton's undergraduate focus means unprecedented access to world-class faculty and cutting-edge research, while maintaining the tight-knit intellectual community I'm seeking...",
            fullContent: `What draws me to Princeton is the balance between world-class research and undergraduate focus. At Princeton, I'll have access to professors who are pushing the boundaries of physics. Who are asking questions that haven't been asked before. Who are making discoveries that change how we understand the universe.

But I'll also be part of a tight-knit intellectual community. Where professors know your name. Where you're not just a number. Where you can have real conversations with people who are at the top of their field. Where undergraduate research isn't just encouraged. It's expected.

That combination is rare. Most research universities prioritize graduate students. Most small colleges don't have the resources for cutting-edge research. Princeton has both. World-class faculty who are accessible. Cutting-edge research that undergraduates can participate in. A community that's both intellectually rigorous and personally supportive.

I'm also drawn to Princeton's emphasis on community engagement. This isn't just about learning physics in isolation. It's about understanding how physics connects to the world. How research serves society. How knowledge becomes action.

Princeton's residential college system also appeals to me. The idea that learning happens everywhere. In classrooms, yes. But also in dining halls. In late-night conversations. In unexpected connections with people who study completely different things.

I want to be part of a community where people are driven by curiosity. Where intellectual growth happens through collaboration, not just competition. Where you're surrounded by people who will challenge you, support you, and help you become your best self.

That's Princeton. A place where you can study the most fundamental questions in physics while being part of a community that values both intellectual excellence and personal growth.`
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
            excerpt: "When I advocated for funding our school's mental health resources, I learned that effective policy isn't about being right—it's about building coalitions and finding common ground...",
            fullContent: `I thought I was right. Our school needed better mental health resources. We had one counselor for eight hundred students. Kids were struggling. Some were in crisis. The solution was obvious: hire more counselors. What could be simpler?

So I wrote a proposal. I gathered data. I made charts. I presented it to the school board. I was prepared. I was passionate. I was right.

And I got nowhere. The board listened politely. They asked questions. They said they'd consider it. But nothing happened. I was frustrated. How could they not see how important this was? How could they not act?

Then I talked to a teacher who'd been at the school for twenty years. She told me something I'll never forget: "Being right isn't enough. You have to get other people to want to be right with you."

She explained that the board wasn't against mental health resources. They were worried about the budget. About precedent. About how to explain it to taxpayers. They had their own concerns, their own constraints, their own perspectives.

So I went back. But this time, I didn't just present my solution. I listened. I asked questions. I tried to understand their concerns. I found common ground. I built a coalition. I worked with teachers, parents, students, administrators. I found ways to address their concerns while still achieving my goal.

It took six months. It required compromise. The final solution wasn't exactly what I'd proposed. But it worked. We got more mental health resources. Not because I was right. Because I learned to work with people who saw things differently.

That experience changed how I think about policy. It's not about being right. It's about building consensus. About finding solutions that work for everyone. About understanding that different people have different concerns, different values, different constraints. And that effective policy has to account for all of that.

Now, when I think about the policy challenges we face, I don't just think about what's right. I think about how to get there. How to build coalitions. How to find common ground. How to create solutions that work for everyone, not just for me.`
          },
          {
            title: "Why Princeton",
            prompt: "Princeton values community and encourages students to engage with one another.",
            excerpt: "The Woodrow Wilson School's combination of rigorous quantitative training and real-world policy experience aligns perfectly with my goal of creating evidence-based solutions to social challenges...",
            fullContent: `I want to study public policy at Princeton because I believe that effective policy requires both rigorous analysis and practical understanding. The Woodrow Wilson School offers exactly that combination. I'll learn the quantitative skills to analyze data, to evaluate programs, to understand what works and what doesn't.

But I'll also learn the practical skills to actually implement solutions. To work with stakeholders. To build coalitions. To navigate the messy reality of how policy actually gets made. To understand that being right isn't enough. You have to get other people to want to be right with you.

What draws me to Princeton specifically is the emphasis on both theory and practice. This isn't just about learning policy in the abstract. It's about understanding how policy works in the real world. How it gets made. How it gets implemented. How it affects people's lives.

Princeton's location also matters. You're close enough to Washington to understand how federal policy works. Close enough to New York to see how urban policy plays out. But also in a smaller community where you can see how policy affects real people in real ways.

I'm also drawn to Princeton's commitment to public service. This isn't just about learning policy for its own sake. It's about learning policy to make a difference. To serve communities. To solve problems that matter.

The residential college system also appeals to me. Policy doesn't exist in a vacuum. It intersects with everything. Economics. Psychology. History. Sociology. At Princeton, I'll be living and learning with people who study all of these things. Who will challenge my assumptions. Who will help me see policy from different perspectives.

At Princeton, I'll develop the analytical skills to understand what works. But I'll also develop the practical skills to make it happen. That combination is what I'm looking for.`
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
            excerpt: "I started selling custom sneakers in middle school. What began as a side hustle taught me more about entrepreneurship, supply chains, and customer relationships than any textbook could...",
            fullContent: `I started selling custom sneakers when I was thirteen. Not because I had a business plan. Not because I wanted to be an entrepreneur. Because I wanted a pair of expensive sneakers and my parents said no.

So I learned to make my own. I watched YouTube tutorials. I bought supplies. I practiced on old shoes. And then I started selling them. First to friends. Then to friends of friends. Then to strangers online.

What started as a way to get what I wanted became something else entirely. I learned about supply chains when I couldn't find the right materials. I learned about pricing when I realized I was losing money on every sale. I learned about marketing when I had to figure out how to reach customers. I learned about customer service when someone complained about quality.

But more than that, I learned about relationships. About trust. About building something that people actually wanted. About solving problems I didn't even know existed until I tried to solve them.

My sneaker business taught me that entrepreneurship isn't about having a great idea. It's about execution. About iteration. About learning from failure. About understanding what people actually need, not what you think they need.

It also taught me about social impact. As my business grew, I started thinking about where my materials came from. About the environmental impact. About whether I could use my business to do good, not just make money.

I started sourcing materials more responsibly. I donated a portion of profits to local youth programs. I started teaching other kids how to make their own sneakers. Not because it was good for business. Because it was the right thing to do.

That's when I realized what I wanted to study. Not just business. But business as a force for positive change. Business that serves communities, not just shareholders. Business that creates value in multiple ways, not just financial.

At Wharton, I want to learn how to build businesses that are both profitable and purposeful. That solve real problems. That make a difference. That prove that you don't have to choose between doing well and doing good.`
          },
          {
            title: "Why Penn",
            prompt: "How will you explore your intellectual and academic interests at Penn?",
            excerpt: "Wharton's emphasis on social impact entrepreneurship perfectly aligns with my belief that business should be a force for positive change, not just profit maximization...",
            fullContent: `At Penn, I want to explore how business can be a force for positive change. Wharton's emphasis on social impact entrepreneurship aligns perfectly with what I want to study. But I also want to explore how business intersects with other fields. How it connects to policy, to psychology, to technology, to social justice.

I'm particularly interested in how we can build businesses that create value in multiple ways. Not just financial value, but social value. Environmental value. Value for communities, not just shareholders. Wharton's focus on social impact shows me that this is a place where that kind of thinking is valued.

But I also want to explore other perspectives. I want to take classes in other schools. To understand how business connects to everything else. To see how different disciplines approach the same problems. To build a more holistic understanding of how the world works.

Penn's location in Philadelphia is also important. This is a city with real challenges and real opportunities. I want to learn business not just in the classroom, but in the community. To see how businesses actually operate. To understand how they affect people's lives. To work on projects that matter.

I'm also drawn to Penn's culture of collaboration. This isn't just about individual achievement. It's about working together to solve problems. About learning from each other. About building something together that's bigger than any individual contribution.

At Penn, I'll develop the business skills to build successful enterprises. But I'll also develop the perspective to build enterprises that serve a purpose beyond profit. That solve real problems. That make a difference. That's what I'm looking for.`
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
            excerpt: "Volunteering at a refugee resettlement center, I realized that understanding different cultures isn't about cataloging differences—it's about recognizing our shared humanity...",
            fullContent: `I started volunteering at a refugee resettlement center because I wanted to help. I thought I'd be teaching English, helping people fill out forms, doing the practical things that needed to be done. And I did do those things. But I also learned something I didn't expect.

I learned that understanding different cultures isn't about cataloging differences. It's about recognizing our shared humanity. About seeing that underneath all the differences in language, in customs, in experiences, we're all just people trying to make a life for ourselves and our families.

I worked with a family from Syria. The father was an engineer. The mother was a teacher. They had two kids. They'd lost everything. Their home. Their jobs. Their community. Everything they'd built over decades, gone.

But here's what struck me: they weren't defined by what they'd lost. They were defined by what they were building. By their resilience. By their hope. By their determination to create a new life in a new country.

I helped them with practical things. Filling out job applications. Navigating the school system. Understanding how things worked here. But they helped me understand things I'd never thought about. What it means to lose everything. What it means to start over. What it means to be resilient.

That experience changed how I think about anthropology. It's not just about studying other cultures. It's about understanding human experience. About recognizing that we're all part of the same human family, even when we come from different places, speak different languages, have different customs.

I also realized that anthropology connects to everything. To public health. To policy. To how we understand and address social problems. To how we build communities that work for everyone.

At Brown, I want to explore those connections. To study anthropology not in isolation, but in relation to everything else. To understand how culture shapes health, how it influences policy, how it affects how we live together. To see how different disciplines approach the same fundamental questions about what it means to be human.`
          },
          {
            title: "Why Brown",
            prompt: "Why are you drawn to the area(s) of study you indicated?",
            excerpt: "Brown's Open Curriculum allows me to explore the connections between anthropology, public health, and creative writing without artificial barriers between disciplines...",
            fullContent: `I'm drawn to anthropology because I believe that understanding human culture is essential to understanding human experience. But I'm also interested in how anthropology connects to other fields. How culture shapes health. How it influences policy. How it affects how we live together.

Brown's Open Curriculum allows me to explore those connections without artificial barriers. I can study anthropology, public health, and creative writing. Not as separate subjects, but as different ways of understanding the same fundamental questions about what it means to be human.

What draws me to Brown specifically is the emphasis on interdisciplinary thinking. The recognition that real problems don't fit neatly into academic categories. That understanding culture requires understanding health, policy, economics, psychology, everything. That the best insights come from connecting ideas across disciplines.

I'm also drawn to Brown's emphasis on both theory and practice. This isn't just about studying anthropology in the abstract. It's about understanding how it applies to real-world problems. How it can help us build better communities. How it can inform policy. How it can improve lives.

Brown's location in Providence is also important. This is a city with a diverse population, with real challenges and real opportunities. I'll be learning anthropology not just in the classroom, but in the community. Seeing how culture actually works. Understanding how it affects people's lives. Working on projects that matter.

I also appreciate Brown's culture of intellectual freedom. The Open Curriculum isn't just about taking whatever classes you want. It's about taking responsibility for your own education. About making connections. About building your own understanding of how the world works.

At Brown, I'll develop a deep understanding of anthropology. But I'll also see how it connects to everything else. How it informs other ways of understanding the world. How it helps us solve real problems. That's what I'm looking for.`
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
            excerpt: "When drought destroyed our family farm's corn crop, I started researching climate-resistant agriculture. That devastating season sparked my passion for sustainable farming practices...",
            fullContent: `The summer I was sixteen, we lost everything. Not dramatically. Not all at once. But slowly, day by day, as the rain didn't come and the corn didn't grow and the soil turned to dust. By August, we knew. The crop was gone. The income was gone. The farm that had been in our family for three generations was in danger.

I'd always planned to leave the farm. To go to college. To do something else. But that summer changed everything. Not because I decided to stay. But because I realized I couldn't leave. Not yet. Not until I understood how to make farming work in a changing climate.

So I started researching. Reading everything I could find about drought-resistant crops. About soil management. About water conservation. About how farmers in other parts of the world were adapting to climate change. I spent hours talking to extension agents. Visiting other farms. Experimenting with different techniques on a small plot.

What I learned was that the problem wasn't just the drought. It was how we farmed. How we'd been farming for decades. How we'd optimized for maximum yield without considering resilience. How we'd treated the soil like dirt instead of like a living system.

That summer taught me that obstacles aren't setbacks. They're teachers. They force you to question assumptions. To find new solutions. To adapt. The farm didn't just survive that summer. It got stronger. Because we learned. We changed. We adapted.

Now, when I think about what I want to study, I think about that summer. About how we need to develop farming practices that are both productive and resilient. That work in good years and bad. That can adapt to a changing climate. That can feed people while also protecting the land.

I want to study agricultural sciences because I want to help develop those solutions. Not just for our farm. For all farms. For the future of food. For how we're going to feed a growing population in a changing climate.`
          },
          {
            title: "Why Cornell",
            prompt: "What is it about Cornell and your intended major that resonates with you?",
            excerpt: "Cornell's College of Agriculture and Life Sciences offers the unique combination of Ivy League academics and hands-on agricultural research that I need to develop sustainable solutions for small farms...",
            fullContent: `What draws me to Cornell is the unique combination of Ivy League academics and hands-on agricultural research. At Cornell, I'll study agricultural sciences at the highest level. I'll learn from professors who are pushing the boundaries of what's possible. Who are developing new crops, new techniques, new solutions.

But I'll also be able to work on actual farms. To see how research translates to practice. To understand the real-world constraints that farmers face. To develop solutions that actually work, not just in theory, but in practice.

Cornell's College of Agriculture and Life Sciences offers exactly what I need. Rigorous academics combined with practical experience. Theory that's grounded in reality. Research that serves farmers, not just researchers.

I'm particularly interested in sustainable agriculture. In developing farming practices that are both productive and resilient. That can feed people while also protecting the land. That work in good years and bad. That can adapt to a changing climate.

Cornell's research in this area is exactly what I'm looking for. Work on drought-resistant crops. On soil health. On water conservation. On integrated pest management. On all the things that make farming sustainable in the long term.

But what really draws me to Cornell is the emphasis on serving farmers. This isn't just about academic research. It's about research that helps real farmers solve real problems. That develops solutions that are practical, not just theoretical.

Cornell's extension program also appeals to me. The idea that knowledge doesn't just stay in the university. It goes out to communities. To farmers. To people who can actually use it. That's what I want to be part of.

At Cornell, I'll develop the scientific skills to understand agricultural systems. But I'll also develop the practical skills to help farmers implement solutions. To bridge the gap between research and practice. That combination is what I'm looking for.`
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
            excerpt: "Hiking the Appalachian Trail last summer, I became obsessed with understanding forest ecosystems. Every plant, insect, and soil microbe plays a crucial role in an intricate web of life...",
            fullContent: `I spent last summer hiking the Appalachian Trail, and I became obsessed with understanding forest ecosystems. Not in an academic way. In a way that made me stop every few feet to examine something. A mushroom growing on a log. A beetle crawling on a leaf. The way moss covered rocks. The way trees communicated through their root systems.

What fascinates me is how everything is connected. How every plant, every insect, every soil microbe plays a crucial role in an intricate web of life. How removing one species can affect everything else. How the forest isn't just a collection of trees. It's a complex system where everything depends on everything else.

I spent hours reading about mycorrhizal networks. About how trees share nutrients through fungal connections. About how mother trees nurture their offspring. About how forests have their own intelligence, their own ways of communicating, their own ways of surviving.

But I also learned about the threats. Climate change. Invasive species. Deforestation. How these complex systems are fragile. How they can collapse. How we're losing forests faster than we can understand them.

That's what makes me lose track of time. Not just understanding how forests work, but figuring out how to protect them. How to restore them. How to work with these systems rather than against them. How to apply what we're learning about forest ecology to actually solve environmental problems.

When I'm studying forest ecosystems, hours disappear. Not because it's easy. It's not. But because it's fascinating. Because every answer raises new questions. Because understanding these systems feels like understanding something fundamental about how life works.

I want to study environmental studies because I want to understand these systems better. But I also want to protect them. To restore them. To work with them rather than against them. To apply what we're learning to actually solve environmental problems.`
          },
          {
            title: "Why Dartmouth",
            prompt: "What excites you about Dartmouth?",
            excerpt: "Dartmouth's location and commitment to environmental stewardship means learning doesn't stop at the classroom door. The mountains, forests, and rivers are my laboratory...",
            fullContent: `What excites me about Dartmouth is the location. The mountains, forests, and rivers aren't just nearby. They're your laboratory. Your classroom. Your inspiration. Learning doesn't stop at the classroom door. It continues on every trail, in every stream, in every moment you spend outside.

I've spent countless hours hiking, camping, exploring natural areas. But what I've realized is that understanding nature requires more than just being in it. It requires studying it. Understanding the science. The ecology. The systems. But it also requires experiencing it. Feeling it. Being part of it.

Dartmouth offers exactly that combination. Rigorous academics combined with hands-on experience. Theory that's grounded in the real world. Research that happens in actual forests, actual rivers, actual ecosystems.

I'm particularly interested in forest ecology. In understanding how these complex systems work. In figuring out how to protect them, restore them, work with them. Dartmouth's location in New Hampshire, surrounded by forests, offers unparalleled opportunities to study these systems firsthand.

But what really excites me about Dartmouth is the culture. The commitment to environmental stewardship isn't just talk. It's action. It's how the campus operates. How students live. How the community thinks about its relationship to the environment.

Dartmouth's emphasis on both academics and outdoor experience also appeals to me. This isn't just about studying environmental science in a lab. It's about understanding it in the field. About experiencing it. About becoming part of it.

I also appreciate Dartmouth's size. It's small enough that you're not just a number. That professors know your name. That you can have real conversations. That you can work closely with people who are at the top of their field.

At Dartmouth, I'll develop a deep understanding of environmental systems. But I'll also develop a deep connection to them. That combination is what I'm looking for.`
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
            excerpt: "When my little sister was born with a heart defect, the pediatric surgeon who saved her life showed me the power of engineering applied to medicine. That moment defined my path...",
            fullContent: `My little sister was born with a heart defect. Not a small one. A serious one. The kind that requires surgery. The kind that keeps you in the hospital for weeks. The kind that changes everything.

I was twelve, and I didn't understand what was happening. I just knew that my sister was sick, that she was in the hospital, that my parents were scared. I didn't understand the science. I didn't understand the engineering. I just understood that something was wrong and someone had to fix it.

Dr. Martinez was the pediatric surgeon who operated on my sister. She spent hours explaining things to us. Not in medical jargon. In terms we could understand. She showed us diagrams. She explained the procedure. She helped us understand what was happening and why.

But what really struck me was how she talked about the technology. The artificial valve. The surgical techniques. The monitoring equipment. She talked about these things not just as tools, but as solutions. As ways to solve problems. As ways to save lives.

That's when I realized what I wanted to do. Not just medicine. Not just engineering. But the intersection. Biomedical engineering. Using engineering to solve medical problems. Using technology to help people. Using innovation to save lives.

Dr. Martinez showed me that engineering isn't just about building things. It's about building things that matter. That solve real problems. That help real people. That the most important engineering isn't the most impressive. It's the most useful. The most accessible. The most human.

My sister is fine now. She's healthy. She's happy. She doesn't remember any of it. But I do. I remember Dr. Martinez. I remember how she used engineering to save my sister's life. And I remember that that's what I want to do. To use engineering to help people. To solve problems that matter. To make a difference.`
          },
          {
            title: "Why Duke",
            prompt: "What is your sense of Duke as a university and a community?",
            excerpt: "Duke's collaboration between the Pratt School of Engineering and the School of Medicine creates unparalleled opportunities for biomedical innovation with real clinical impact...",
            fullContent: `What draws me to Duke is the collaboration between the Pratt School of Engineering and the School of Medicine. At Duke, engineering and medicine aren't separate. They're integrated. Engineers work directly with doctors. Research happens in the context of actual patient care. Innovation has immediate clinical impact.

That's exactly what I'm looking for. I want to study biomedical engineering not in isolation, but in relation to actual medical problems. To work with doctors who understand what patients need. To develop solutions that are tested in real clinical settings. To see how engineering can actually help people, not just in theory, but in practice.

Duke's culture of collaboration also appeals to me. This isn't just about individual achievement. It's about working together to solve problems. About learning from each other. About building something together that's bigger than any individual contribution.

I'm particularly interested in medical devices. In developing technologies that can help patients. That can improve outcomes. That can make healthcare more accessible, more effective, more human. Duke's emphasis on translational research means that the work I do could actually reach patients. Could actually make a difference.

But what really draws me to Duke is the sense of community. This isn't just a place to study. It's a place to belong. To be part of something. To work with people who share your passion for using engineering to help people. Who understand that the best engineering serves a purpose beyond itself.

Duke's location in the Research Triangle is also important. You're surrounded by other universities, by research institutions, by companies that are actually developing medical technologies. You're part of an ecosystem of innovation. Of collaboration. Of impact.

At Duke, I'll develop the engineering skills to build medical devices. But I'll also develop the medical understanding to know what patients actually need. To work with doctors. To see how engineering can serve medicine. That combination is what I'm looking for.`
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
            excerpt: "Running my school newspaper, I learned that journalism isn't about confirming what people already believe—it's about asking uncomfortable questions and seeking truth even when it's inconvenient...",
            fullContent: `I thought journalism was about telling stories. About writing well. About getting the facts right. And it is all of those things. But it's also about something else. Something harder. Something more important.

I learned this when I was running my school newspaper and we decided to investigate the school's disciplinary policies. We'd heard rumors. We'd seen patterns. We wanted to understand what was really happening.

So we started digging. We filed public records requests. We interviewed students. We talked to administrators. We looked at the data. And what we found was uncomfortable. The disciplinary policies weren't being applied fairly. Some students were being punished more harshly than others. The system wasn't working the way it was supposed to.

We wrote the story. We published it. And the response was immediate. Some people were angry. Some people were defensive. Some people wanted us to retract it. But we stood by it. Because it was true. Because it mattered. Because that's what journalism is supposed to do.

That experience taught me that journalism isn't about confirming what people already believe. It's about asking uncomfortable questions. About seeking truth even when it's inconvenient. About holding power accountable. About giving voice to people who don't have one.

It also taught me that good journalism requires more than just writing skills. It requires persistence. Courage. The willingness to dig deeper, to ask harder questions, to follow the story wherever it leads, even when it's uncomfortable.

Now, when I think about what kind of journalist I want to be, I think about that story. About how journalism can make a difference. About how it can hold power accountable. About how it can give voice to people who don't have one. About how it can seek truth even when it's inconvenient.

That's what I want to do. Investigative journalism. Not because it's easy. Because it's important. Because the world needs people who are willing to ask uncomfortable questions and seek truth even when it's inconvenient.`
          },
          {
            title: "Why Northwestern",
            prompt: "What are the unique qualities of Northwestern that make you want to attend?",
            excerpt: "Medill's reputation for producing top journalists, combined with Northwestern's emphasis on hands-on experience in Chicago, offers the perfect training ground for a future investigative reporter...",
            fullContent: `What draws me to Northwestern is Medill's reputation for producing top journalists. But more than that, it's the emphasis on hands-on experience. At Medill, you're not just learning about journalism in the classroom. You're doing it. Reporting. Writing. Editing. Producing. From day one.

The location in Chicago is also crucial. This is a city with real stories. Real problems. Real opportunities for investigative journalism. You're not just studying journalism in the abstract. You're practicing it in a real news environment. With real editors. Real deadlines. Real impact.

Medill's emphasis on both skills and ethics also appeals to me. This isn't just about learning how to write or report. It's about understanding why journalism matters. About learning to ask the right questions. About developing the judgment to know what stories to pursue and how to pursue them.

I'm particularly interested in investigative journalism. In digging deeper. In asking uncomfortable questions. In seeking truth even when it's inconvenient. Medill's track record of producing investigative journalists shows me that this is a place where that kind of work is valued and supported.

But what really draws me to Northwestern is the culture. The commitment to excellence. The emphasis on both individual achievement and collaboration. The understanding that the best journalism comes from working together, from learning from each other, from pushing each other to be better.

Northwestern's location also matters. You're close enough to Chicago to understand urban journalism. But you're also in a smaller community where you can develop your skills, learn from mistakes, grow as a journalist before you're thrown into the deep end.

At Northwestern, I'll develop the skills to be a great journalist. But I'll also develop the judgment, the ethics, the understanding of why journalism matters. That combination is what I'm looking for.`
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
            excerpt: "What if the question mark is the most powerful punctuation? Every great discovery, every revolution, every breakthrough begins with someone questioning the status quo...",
            fullContent: `What if the question mark is the most powerful punctuation? Not the period, which ends things. Not the exclamation point, which asserts things. But the question mark, which opens things. Which creates possibility. Which invites exploration.

Every great discovery begins with a question. What if the earth revolves around the sun? What if we could fly? What if matter and energy are the same thing? Every revolution begins with a question. What if all people are created equal? What if women should have the right to vote? What if separate isn't equal? Every breakthrough begins with someone questioning the status quo.

I've always been drawn to questions. Not because I have answers. Because questions are more interesting than answers. Answers close things. Questions open them. Answers end exploration. Questions begin it.

In my philosophy class, we spent an entire semester on a single question: What is justice? We didn't find an answer. We probably never will. But the process of asking the question, of exploring it, of thinking about it from different angles, that was the point. That was the learning.

What I love about philosophy is how it teaches you to question everything. Not in a cynical way. In a curious way. To ask why. To dig deeper. To not accept things at face value. To understand that the most important questions don't have easy answers. Maybe they don't have answers at all.

But that's okay. Because the point isn't to find answers. It's to ask better questions. To think more deeply. To understand more fully. To see the world from different perspectives. To recognize that certainty is often the enemy of understanding.

At UChicago, I want to be part of a community that values questions. That sees uncertainty as a strength, not a weakness. That understands that the best thinking comes from asking hard questions, not from having easy answers. That recognizes that the question mark might just be the most powerful punctuation after all.`
          },
          {
            title: "UChicago Supplement",
            prompt: "What's so odd about odd numbers?",
            excerpt: "Odd numbers refuse to be divided equally. They resist symmetry, embrace asymmetry, and in their stubbornness, reveal something fundamental about the nature of infinity and indivisibility...",
            fullContent: `Odd numbers refuse to be divided equally. They resist symmetry. They embrace asymmetry. And in their stubbornness, they reveal something fundamental about the nature of things.

Think about it. Even numbers can be split perfectly. Four becomes two and two. Eight becomes four and four. There's balance. Symmetry. Order. But odd numbers? They resist. Five can't be divided equally. Seven can't. Eleven can't. They're indivisible in a way that even numbers aren't.

But here's what's interesting: that indivisibility isn't a flaw. It's a feature. Odd numbers have a kind of integrity that even numbers lack. They can't be broken down. They can't be simplified. They are what they are, completely and fully.

I think there's something profound about that. About how the things that can't be divided equally are often the most interesting. The most complex. The most real. Life isn't even. It's odd. It resists symmetry. It embraces asymmetry. And maybe that's what makes it beautiful.

Odd numbers also have a kind of unpredictability. With even numbers, you know what you're getting. They follow patterns. They're predictable. But odd numbers? They surprise you. They don't follow the same rules. They create their own.

Maybe that's what's so odd about odd numbers. Not that they're different. But that they remind us that different isn't wrong. That asymmetry isn't a flaw. That indivisibility isn't a problem. That sometimes the things that can't be divided equally are the most whole.

At UChicago, I want to explore these kinds of questions. Not just about numbers, but about everything. About how the things that resist easy categorization are often the most interesting. About how asymmetry creates beauty. About how indivisibility creates integrity. About how oddness might just be the most natural thing of all.`
          }
        ]
      }
    ]
  }
];

export function ApplicationsGallery() {
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [freeEssayViewed, setFreeEssayViewed] = useState<string | null>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const { user } = useAuth();

  // Check if user has viewed their free essay
  useEffect(() => {
    const viewedEssay = localStorage.getItem("freeEssayViewed");
    if (viewedEssay) {
      setFreeEssayViewed(viewedEssay);
    }
  }, []);

  // Check subscription status
  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch("/api/subscription-status")
        .then(res => res.json())
        .then(data => {
          setIsSubscribed(data.isSubscribed || false);
          setLoading(false);
        })
        .catch(() => {
          setIsSubscribed(false);
          setLoading(false);
        });
    } else {
      setIsSubscribed(false);
      setLoading(false);
    }
  }, [user]);

  // Check if user can access content (subscribed OR has free essay available)
  const canAccessContent = isSubscribed || freeEssayViewed !== null;

  // Filter schools - non-subscribed users can only see Harvard
  const visibleSchools = isSubscribed 
    ? mockSchools 
    : mockSchools.filter(school => school.id === "harvard");

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

  const handleSubscribeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await handleSubscribe();
  };

  const handleEssayView = (essayId: string) => {
    // If user hasn't viewed a free essay yet, mark this one as viewed
    if (!isSubscribed && !freeEssayViewed) {
      localStorage.setItem("freeEssayViewed", essayId);
      setFreeEssayViewed(essayId);
    }
  };

  const toggleSchool = (schoolId: string) => {
    // Allow browsing schools/applications, but restrict essay viewing
    setExpandedSchool(expandedSchool === schoolId ? null : schoolId);
    setExpandedApplication(null);
  };

  const toggleApplication = (appId: string) => {
    // Allow browsing schools/applications, but restrict essay viewing
    setExpandedApplication(expandedApplication === appId ? null : appId);
  };

  const canViewEssay = (essayId: string) => {
    // Subscribed users can view all essays
    if (isSubscribed) return true;
    // Non-subscribed users can view their free essay
    if (freeEssayViewed === essayId) return true;
    // Non-subscribed users can view one essay if they haven't used their free view yet
    if (!freeEssayViewed) return true;
    // Otherwise, they need to subscribe
    return false;
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

        {/* Subscription Modal - Show when user clicks on locked essay */}
        <AnimatePresence>
          {showSubscribeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowSubscribeModal(false);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-8 md:p-12 max-w-md mx-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-center border border-slate-200 relative"
              >
                <button
                  onClick={() => setShowSubscribeModal(false)}
                  className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                >
                  ✕
                </button>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#0EA5E9] flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Subscribe for Full Access</h2>
                <p className="text-[#64748B] mb-6">
                  Subscribe to get unlimited access to all successful college applications and learn from real essays that got students into top universities.
                </p>
                <Button variant="primary" onClick={handleSubscribe} className="w-full">
                  Subscribe Now
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Free Essay Banner */}
        {!isSubscribed && !freeEssayViewed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] rounded-xl p-4 text-white text-center"
          >
            <p className="text-sm md:text-base">
              <strong>Free Preview:</strong> View one essay for free! Click on any essay below to get started.
            </p>
          </motion.div>
        )}

        {/* Schools List */}
        <div className="space-y-4">
          {visibleSchools.map((school, index) => (
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
                                      {(() => {
                                        const essayId = `${app.id}-${essayIndex}`;
                                        const canView = canViewEssay(essayId);
                                        
                                        if (canView) {
                                          return (
                                            <Link 
                                              href={`/full-essay?school=${encodeURIComponent(school.name)}&student=${encodeURIComponent(app.name)}&year=${encodeURIComponent(app.year)}&major=${encodeURIComponent(app.major)}&sat=${app.sat}&gpa=${app.gpa}&essayTitle=${encodeURIComponent(essay.title)}&prompt=${encodeURIComponent(essay.prompt)}&content=${encodeURIComponent(essay.fullContent || essay.excerpt)}`}
                                              onClick={() => handleEssayView(essayId)}
                                              className="mt-3 text-[#3B82F6] hover:text-[#0EA5E9] transition-colors inline-block"
                                            >
                                              Read full essay →
                                            </Link>
                                          );
                                        } else {
                                          return (
                                            <div className="mt-3">
                                              {freeEssayViewed ? (
                                                <button
                                                  onClick={handleSubscribeClick}
                                                  className="flex items-center gap-2 text-[#3B82F6] hover:text-[#0EA5E9] transition-colors"
                                                >
                                                  <Lock className="w-4 h-4" />
                                                  <span className="text-sm">Subscribe to view more essays</span>
                                                </button>
                                              ) : (
                                                <Link
                                                  href={`/full-essay?school=${encodeURIComponent(school.name)}&student=${encodeURIComponent(app.name)}&year=${encodeURIComponent(app.year)}&major=${encodeURIComponent(app.major)}&sat=${app.sat}&gpa=${app.gpa}&essayTitle=${encodeURIComponent(essay.title)}&prompt=${encodeURIComponent(essay.prompt)}&content=${encodeURIComponent(essay.fullContent || essay.excerpt)}`}
                                                  onClick={() => handleEssayView(essayId)}
                                                  className="text-[#3B82F6] hover:text-[#0EA5E9] transition-colors inline-block"
                                                >
                                                  Read full essay →
                                                </Link>
                                              )}
                                            </div>
                                          );
                                        }
                                      })()}
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