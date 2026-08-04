import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const teamMembers = [
  {
    name: "Vikas Patel",
    role: "Founder & volunteer",
    avatarBg: "linear-gradient(135deg, #378ADD, #e6f1fb)",
    details: [
      "B.Tech, NIT Raipur (IT branch)",
      "Ex-PhysicsWallah",
      "Ex-Kunduz",
      "Ex-AB InBev",
      "Worked with Navgurukul",
      "Mentored 500+ students",
      "Worked at Tata Elxsi",
    ],
  },
  {
    name: "Lav Shashank",
    role: "Volunteer",
    avatarBg: "linear-gradient(135deg, #1D9E75, #e1f5ee)",
    details: [
      "B.Tech, NIT Raipur (IT branch)",
      "Founder & CEO of Aerodip",
      "Ex-Webfino",
      "Worked at Tata Elxsi",
      "Worked at AMR Finance",
    ],
  },
  {
    name: "Manoj Saroj",
    role: "Volunteer",
    avatarBg: "linear-gradient(135deg, #BA7517, #faeeda)",
    details: [
      "B.Tech, NIT Raipur (IT branch)",
      "Tech team, Aerodip",
      "Specializes in AI & computer vision",
      "Builds intelligent problem-solving tools",
    ],
  },
];

const roadmapPhases = [
  {
    title: "Phase 1 · Ignite",
    description: "Free workshops for government school students. Build awareness and trust.",
    number: "01",
  },
  {
    title: "Phase 2 · Expand",
    description: "Structured cohorts, standardized curriculum across grade bands.",
    number: "02",
  },
  {
    title: "Phase 3 · Build",
    description: "Village-level student innovation incubators and full platform.",
    number: "03",
  },
];

// ── Animation Variants ──────────────────────────────────────────────────────

const letterAnimation = {
  hidden: { y: -70, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.06,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
};

// Stagger container — children animate in sequence
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// Team card entrance: drop from above with spring bounce
const teamCardVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
  exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
};

// Roadmap card entrance: slide from below + scale
const roadmapCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 15 },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
};

// Tab wrapper entrance / exit
const tabVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
  exit:   { opacity: 0, y: -16, transition: { duration: 0.2, ease: "easeIn" } },
};

// ─────────────────────────────────────────────────────────────────────────────

const About = () => {
  const [activeTab, setActiveTab] = useState("us");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const titleText = "AEROSKILL";

  return (
    <div className="w-full bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 min-h-screen pt-24 pb-16">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6DACE7]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#378ADD]/3 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Animated title ────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-widest mb-12 flex justify-center">
            {isMounted &&
              titleText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={letterAnimation}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            {!isMounted && <span>{titleText}</span>}
          </h1>

          {/* ── Tab buttons ── */}
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { key: "us", label: "Know about us" },
              { key: "program", label: "Know about program" },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all border ${
                  activeTab === tab.key
                    ? "bg-[#171710] dark:bg-white text-white dark:text-black border-transparent shadow-lg"
                    : "bg-transparent text-[#171710] dark:text-white border-slate-200 dark:border-white/20 hover:border-[#171710] dark:hover:border-white"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ───────────────────────────────────────────────── */}
        <div className="mt-8">
          <AnimatePresence mode="wait">

            {/* ── Team Tab ── */}
            {activeTab === "us" && (
              <motion.div
                key="us"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      variants={teamCardVariants}
                      whileHover={{
                        y: -10,
                        scale: 1.02,
                        boxShadow: "0 20px 50px rgba(109,172,231,0.18)",
                        borderColor: "rgba(109,172,231,0.35)",
                        transition: { type: "spring", stiffness: 260, damping: 20 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-2xl p-8 text-center flex flex-col items-center cursor-default"
                    >
                      {/* Floating avatar */}
                      <motion.div
                        className="w-24 h-24 rounded-full mb-6 shadow-xl"
                        style={{ background: member.avatarBg }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      />

                      <h4 className="text-xl font-bold text-[#171710] dark:text-white mb-2">
                        {member.name}
                      </h4>
                      <span className="inline-block text-[11px] font-bold text-[#6DACE7] bg-[#6DACE7]/10 rounded-full px-3 py-1 mb-6 uppercase tracking-wider">
                        {member.role}
                      </span>

                      <ul className="text-left text-sm text-slate-500 dark:text-slate-400 space-y-3 w-full">
                        {member.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + i * 0.06 + 0.3 }}
                          >
                            <Check size={16} className="text-[#6DACE7] mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* ── Program Tab ── */}
            {activeTab === "program" && (
              <motion.div
                key="program"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mb-10 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <div className="h-[1px] w-8 bg-[#6DACE7]" />
                    <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
                      Three-Phase Roadmap
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#171710] dark:text-white">
                    How We&apos;re <span className="italic font-serif text-[#6DACE7]">Scaling.</span>
                  </h2>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {roadmapPhases.map((phase, index) => (
                    <motion.div
                      key={index}
                      variants={roadmapCardVariants}
                      whileHover={{
                        y: -8,
                        scale: 1.03,
                        boxShadow: "0 16px 40px rgba(109,172,231,0.15)",
                        borderColor: "rgba(109,172,231,0.4)",
                        transition: { type: "spring", stiffness: 280, damping: 22 },
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="relative bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-2xl p-8 overflow-hidden cursor-default group"
                    >
                      {/* Large muted phase number in background */}
                      <span className="absolute top-4 right-5 text-7xl font-black text-slate-100 dark:text-white/5 select-none pointer-events-none leading-none">
                        {phase.number}
                      </span>

                      <motion.div
                        className="w-2 h-2 rounded-full bg-[#6DACE7] mb-5"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                      />

                      <h3 className="text-lg font-bold text-[#6DACE7] mb-3 relative z-10">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">
                        {phase.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default About;
