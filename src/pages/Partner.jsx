import { motion } from "framer-motion";
import { School, UserPlus, Building2, Users } from "lucide-react";

const partners = [
  {
    title: "Schools",
    description: "Free awareness session, then structured cohorts if students want to continue.",
    icon: School,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    hoverGlow: "rgba(59,130,246,0.15)",
    hoverBorder: "rgba(59,130,246,0.35)",
  },
  {
    title: "Industry mentors",
    description: "Give 2-3 hours a month guiding student projects. We handle scheduling.",
    icon: UserPlus,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    hoverGlow: "rgba(16,185,129,0.15)",
    hoverBorder: "rgba(16,185,129,0.35)",
  },
  {
    title: "Corporate CSR",
    description: "Sponsor a cohort in your CSR city. We deliver, report impact, you get outcomes.",
    icon: Building2,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    hoverGlow: "rgba(139,92,246,0.15)",
    hoverBorder: "rgba(139,92,246,0.35)",
  },
  {
    title: "Societies & communities",
    description: "Host a free session for your members. We bring mentors and material.",
    icon: Users,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    hoverGlow: "rgba(245,158,11,0.15)",
    hoverBorder: "rgba(245,158,11,0.35)",
  },
];

// ── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

// Cards slide up from below with a spring
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

// Page header fades + slides in
const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─────────────────────────────────────────────────────────────────────────────

const Partner = () => {
  return (
    <section className="relative w-full min-h-screen pt-32 pb-24 px-6 bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[40%] h-[40%] bg-[#6DACE7]/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[25%] bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[1px] w-8 bg-[#6DACE7]" />
              <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
                Collaborate
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-[#171710] dark:text-white">
              Become a{" "}
              <span className="italic font-serif text-[#6DACE7]">
                Partner.
              </span>
            </h1>
          </div>
          <p className="max-w-sm text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed border-l border-slate-200 dark:border-slate-800 pl-6">
            Join forces with us to empower the next generation of builders. We work with schools, mentors, and organizations.
          </p>
        </motion.div>

        {/* ── Partner Cards Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: `0 20px 50px ${partner.hoverGlow}`,
                  borderColor: partner.hoverBorder,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                whileTap={{ scale: 0.97, y: -4 }}
                className="relative bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start cursor-default overflow-hidden group"
              >
                {/* Subtle background shimmer on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 20% 50%, ${partner.hoverGlow}, transparent 70%)`,
                  }}
                />

                {/* Icon container with bounce on hover */}
                <motion.div
                  className={`relative z-10 p-4 rounded-2xl ${partner.bg} ${partner.color} shrink-0`}
                  whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.4 } }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                >
                  <Icon size={32} />
                </motion.div>

                <div className="relative z-10 flex-1">
                  <h4 className="text-xl font-bold text-[#171710] dark:text-white mb-3">
                    {partner.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Partner;
