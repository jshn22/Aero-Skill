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

const WhyCards = () => {
  return (
    <section className="relative w-full py-24 px-6 bg-slate-50 dark:bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[1px] w-8 bg-[#6DACE7]" />
            <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
              Our Focus
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-[#171710] dark:text-white"
          >
            How we build{" "}
            <span className="italic font-serif text-[#6DACE7]">
              real capability.
            </span>
          </motion.h2>
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isAccent = i === 0;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`rounded-[2rem] p-8 border transition-all ${
                  isAccent
                    ? "bg-[#6DACE7] border-transparent"
                    : "bg-white dark:bg-[#111418] border-slate-200 dark:border-white/10"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${
                    isAccent
                      ? "bg-white/20"
                      : "bg-[#6DACE7]/12 dark:bg-[#6DACE7]/10"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isAccent ? "text-[#171710]" : "text-[#6DACE7]"}
                  />
                </div>
                <h4
                  className={`text-lg font-black mb-3 ${
                    isAccent ? "text-[#171710]" : "text-[#171710] dark:text-white"
                  }`}
                >
                  {card.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed ${
                    isAccent
                      ? "text-[#171710]/75"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
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

export default WhyCards;
