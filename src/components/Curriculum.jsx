import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, Target, BookOpenCheck } from "lucide-react";

const modules = [
  {
    id: "m1",
    label: "Module 1",
    duration: "2 weeks",
    title: "Foundation Module",
    desc: "Digital basics, safe internet habits, and first steps with a smartphone as a learning tool.",
    topics: [
      "Internet & digital safety",
      "Basic navigation & typing",
      "Intro to AI",
      "Curiosity-building activities",
    ],
    chapters: [
      {
        title: "What is Technology?",
        topics: [
          "Definition & evolution of technology",
          "Technology in everyday life",
          "Hardware vs Software",
          "Tool User vs Tool Creator",
        ],
      },
      {
        title: "Understanding the Internet",
        topics: [
          "What is the Internet & how data travels",
          "Communication-based internet services",
          "Mobile networking (2G → 5G)",
          "Web App vs Mobile App",
          "Server, Client, Browser, Cloud, Database",
        ],
      },
      {
        title: "Cyber Security & Digital Etiquette",
        topics: [
          "Strong passwords & 2FA",
          "Phishing, scams & personal data awareness",
          "Responsible communication & anti-plagiarism",
          "Cyberbullying awareness",
        ],
      },
    ],
  },
  {
    id: "m2",
    label: "Module 2",
    duration: "2 weeks",
    title: "Communication Module",
    desc: "Speak clearly, write well, and present with confidence.",
    topics: [
      "Public speaking",
      "Email & written etiquette",
      "Presentation skills",
      "Storytelling",
    ],
    chapters: [
      {
        title: "Device Basics & Google Workspace",
        topics: [
          "Google Account, Drive, Docs, Sheets, Slides",
          "Gmail management & Google Meet",
          "Google Forms, Calendar & Keep",
          "Storage management & device security",
        ],
      },
      {
        title: "Introduction to AI Platforms",
        topics: [
          "ChatGPT, Gemini, Claude, Perplexity",
          "Image & video generation tools",
          "Prompt engineering basics",
          "Responsible & ethical AI usage",
        ],
      },
    ],
  },
  {
    id: "m3",
    label: "Module 3",
    duration: "2 weeks",
    title: "Business Understanding Module",
    desc: "Think like an entrepreneur — spot problems, validate ideas, pitch with clarity.",
    topics: [
      "Business model basics",
      "Market & customer thinking",
      "Pitching ideas",
      "Financial literacy basics",
    ],
    chapters: [
      {
        title: "Entrepreneurial Thinking",
        topics: [
          "Problem identification & validation",
          "Business model canvas basics",
          "Customer empathy & market research",
          "Simple financial literacy",
        ],
      },
      {
        title: "Pitching & Communication",
        topics: [
          "Structuring a pitch",
          "Visual storytelling",
          "Handling Q&A confidently",
        ],
      },
    ],
  },
  {
    id: "m4",
    label: "Module 4",
    duration: "3 weeks",
    title: "Fundamentals of Coding Module",
    desc: "Build logical thinking through code, from block-based programming to first projects.",
    topics: [
      "Scratch & Code.org",
      "Logic building",
      "Intro to programming",
      "Problem-solving with code",
    ],
    chapters: [
      {
        title: "Coding & Programming Basics",
        topics: [
          "What is coding & programming?",
          "Overview of programming languages",
          "Logic & algorithms",
          "Introduction to syntax & errors",
        ],
      },
      {
        title: "Website Basics",
        topics: [
          "Static vs dynamic websites",
          "Domain, hosting & servers",
          "Intro to UI/UX basics",
          "Website security (SSL, HTTPS)",
        ],
      },
      {
        title: "No-Code & Low-Code Development",
        topics: [
          "Prompt-based / vibe coding (Replit AI, Bubble)",
          "Drag-and-drop builders (Google Sites, Canva, Wix)",
          "App basics with Scratch & MIT App Inventor",
        ],
      },
    ],
  },
  {
    id: "m5",
    label: "Module 5",
    duration: "2 weeks",
    title: "Tech & AI Fluency Module",
    desc: "Use AI tools productively for research, content, and everyday automation.",
    topics: [
      "AI tools & prompting",
      "Research & content creation",
      "Automation basics",
      "Career awareness",
    ],
    chapters: [
      {
        title: "AI in the Real World",
        topics: [
          "How AI works: neural networks & machine learning",
          "AI pros, cons & ethics",
          "AI agents & automation tools",
          "Using AI for daily productivity",
        ],
      },
      {
        title: "Prompt Engineering",
        topics: [
          "Writing effective prompts",
          "Verifying AI outputs",
          "Content creation with AI",
          "Research workflows with Perplexity & Gemini",
        ],
      },
    ],
  },
  {
    id: "m6",
    label: "Module 6",
    duration: "2 weeks",
    title: "Digital Productivity & Tools Module",
    desc: "Master the everyday tools that power modern work and collaboration.",
    topics: [
      "Docs, sheets & slides",
      "Email & calendar management",
      "Cloud collaboration",
      "Time management",
    ],
    chapters: [
      {
        title: "Productivity Mastery",
        topics: [
          "Advanced Google Docs & Sheets",
          "Collaborative workflows on Drive",
          "Task & calendar management (Google Tasks, Calendar)",
          "Focus techniques & time-blocking",
        ],
      },
      {
        title: "Professional Communication",
        topics: [
          "Email etiquette & templates",
          "Meeting management with Google Meet",
          "Asynchronous collaboration best practices",
        ],
      },
    ],
  },
  {
    id: "m7",
    label: "Module 7",
    duration: "2 weeks",
    title: "Creative Technology & Design Module",
    desc: "Explore design thinking and creative tools to bring ideas to life visually.",
    topics: [
      "Design thinking basics",
      "Creative tools",
      "Visual storytelling",
      "Ideation techniques",
    ],
    chapters: [
      {
        title: "Design Fundamentals",
        topics: [
          "Color theory & typography basics",
          "Layout & composition principles",
          "Canva for posters, posts & presentations",
          "Branding basics",
        ],
      },
      {
        title: "Creative & Visual Storytelling",
        topics: [
          "Video editing basics (InShot, Filmora)",
          "Digital storytelling concepts",
          "Film-making & animation logic",
          "Building a personal creative portfolio",
        ],
      },
    ],
  },
  {
    id: "m8",
    label: "Module 8",
    duration: "2 weeks",
    title: "Problem Solving & Critical Thinking Module",
    desc: "Sharpen the reasoning skills needed to tackle any real-world challenge.",
    topics: [
      "Logical reasoning",
      "Case study analysis",
      "Decision-making frameworks",
      "Structured thinking",
    ],
    chapters: [
      {
        title: "Reasoning Frameworks",
        topics: [
          "First-principles thinking",
          "Root-cause analysis",
          "Structured problem-solving (5 Whys, HMW)",
          "Mental models for decision-making",
        ],
      },
      {
        title: "Applied Critical Thinking",
        topics: [
          "Real-world case study breakdowns",
          "Group problem-solving simulations",
          "Bias recognition & logical fallacies",
        ],
      },
    ],
  },
  {
    id: "m9",
    label: "Module 9",
    duration: "2 weeks",
    title: "Capstone & Career Module",
    desc: "Turn everything learned into a portfolio, resume, and placement-ready profile.",
    topics: [
      "Real project building",
      "Portfolio & resume",
      "Interview readiness",
      "Final presentation",
    ],
    chapters: [
      {
        title: "Capstone Project",
        topics: [
          "Ideate, build & deploy a real project",
          "Document the process & outcomes",
          "Present to mentors & peers",
        ],
      },
      {
        title: "Career Launch",
        topics: [
          "Resume writing & LinkedIn setup",
          "Portfolio curation & publishing",
          "Mock interviews & feedback",
          "Next-step planning & career paths",
        ],
      },
    ],
  },
];

const Curriculum = () => {
  const [openId, setOpenId] = useState("");

  return (
    <section
      id="curriculum"
      className="relative w-full py-24 px-6 bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-12%] left-[-10%] w-[38%] h-[38%] bg-[#6DACE7]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-yellow-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[1px] w-8 bg-[#6DACE7]" />
              <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
                The Learning Path
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-[#171710] dark:text-white">
              Explore the{" "}
              <span className="italic font-serif text-[#6DACE7]">
                Curriculum.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed border-l border-slate-200 dark:border-slate-800 pl-6">
            A standardized module path — from digital basics to job-ready
            portfolios. No hidden curriculum.
          </p>
        </div>

        {/* Trust markers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { Icon: ShieldCheck, label: "Trust Marker", val: "Mentor-reviewed structure" },
            { Icon: Target, label: "Outcome Clarity", val: "Clear objectives per module" },
            { Icon: BookOpenCheck, label: "Structure", val: "9 progressive modules" },
          ].map(({ Icon, label, val }) => (
            <div
              key={label}
              className="rounded-2xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 p-5 flex items-start gap-3"
            >
              <Icon size={18} className="text-[#6DACE7] mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="text-sm font-bold mt-1 text-[#171710] dark:text-white">
                  {val}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Module accordions */}
        <div className="space-y-4">
          {modules.map((mod) => {
            const isOpen = openId === mod.id;
            return (
              <motion.article
                key={mod.id}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group/card rounded-[2rem] bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:border-[#6DACE7] hover:shadow-[0_8px_30px_rgba(109,172,231,0.15)] dark:hover:bg-[#6DACE7]/5"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : mod.id)}
                  className="w-full p-6 md:p-8 text-left flex items-start justify-between gap-5 group"
                >
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6DACE7]">
                      {mod.label} · {mod.duration}
                    </p>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight mt-2 text-[#171710] dark:text-white group-hover/card:text-[#6DACE7] transition-colors duration-300">
                      {mod.title}
                    </h3>
                    <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
                      {mod.desc}
                    </p>
                    {/* Topic tags */}
                    {!isOpen && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {mod.topics.map((t) => (
                          <span
                            key={t}
                            className="text-xs bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1 text-slate-600 dark:text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <ChevronDown
                    size={20}
                    className={`mt-1 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#6DACE7]" : "text-slate-400"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Learning Objectives */}
                        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <Target size={15} className="text-[#6DACE7]" />
                            <p className="text-xs uppercase tracking-[0.15em] font-bold text-slate-500 dark:text-slate-400">
                              Key Topics
                            </p>
                          </div>
                          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            {mod.topics.map((t) => (
                              <li key={t} className="flex gap-2">
                                <span className="text-[#6DACE7] shrink-0">–</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Chapter breakdown */}
                        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <BookOpenCheck size={15} className="text-[#6DACE7]" />
                            <p className="text-xs uppercase tracking-[0.15em] font-bold text-slate-500 dark:text-slate-400">
                              Chapter Breakdown
                            </p>
                          </div>
                          <div className="space-y-4">
                            {mod.chapters.map((ch) => (
                              <div key={ch.title}>
                                <p className="text-sm font-bold text-[#171710] dark:text-white mb-1">
                                  {ch.title}
                                </p>
                                <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                  {ch.topics.map((t) => (
                                    <li key={t} className="flex gap-2">
                                      <span className="text-[#6DACE7] shrink-0">–</span>
                                      <span>{t}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
