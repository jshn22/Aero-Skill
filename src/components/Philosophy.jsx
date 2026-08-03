import { motion } from "framer-motion";
import { Wrench, Brain, HandshakeIcon, Smartphone } from "lucide-react";

const cards = [
  {
    icon: Wrench,
    title: "Build-first learning",
    desc: "80% practice, 20% theory. Every module ends with something real you built.",
  },
  {
    icon: Brain,
    title: "Founder's thinking",
    desc: "Learn to see problems and create solutions, not just consume information.",
  },
  {
    icon: HandshakeIcon,
    title: "Real mentors",
    desc: "Guidance from working professionals, not scripted bots or generic videos.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first, reach for all",
    desc: "No laptop required. Built to work on any smartphone, anywhere.",
  },
];

const Philosophy = () => {
  return (
    <section className="relative w-full py-24 px-6 bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6DACE7]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-yellow-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[1px] w-8 bg-[#6DACE7]" />
            <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
              Our Philosophy
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-[#171710] dark:text-white"
            >
              Beyond the Classroom.{" "}
              <br className="hidden md:block" />
              Into the{" "}
              <span className="italic font-serif text-[#6DACE7]">
                Real World.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-sm text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed border-l border-slate-200 dark:border-slate-800 pl-6 shrink-0"
            >
              AeroSkill is the bridge between academic theory and industry
              execution. We build the builders of tomorrow.
            </motion.p>
          </div>
        </div>

        {/* 2×2 Card Grid — matching v4 layout exactly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotate: i % 2 === 0 ? 1 : -1,
                  y: -5
                }}
                className="group rounded-[2rem] bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 p-8 transition-all duration-300 hover:border-[#6DACE7] hover:shadow-[0_8px_30px_rgba(109,172,231,0.15)] dark:hover:bg-[#6DACE7]/5"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 bg-[#6DACE7]/12 dark:bg-[#6DACE7]/10 group-hover:bg-[#6DACE7] transition-colors duration-300">
                  <Icon size={20} className="text-[#6DACE7] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-base font-black mb-3 text-[#171710] dark:text-white group-hover:text-[#6DACE7] transition-colors duration-300">
                  {card.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
