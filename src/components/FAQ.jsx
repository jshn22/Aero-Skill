import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What makes AeroSkill different?",
    answer:
      "80% practice, 20% theory. Every module ends in something built, not just watched. We focus on real execution, not passive consumption.",
  },
  {
    question: "Do I need a laptop?",
    answer:
      "No — every module is designed to run on a smartphone alone. We built AeroSkill mobile-first so students anywhere can access quality learning without expensive hardware.",
  },
  {
    question: "Is it free for government school students?",
    answer:
      "Yes. Awareness sessions and government school cohorts are completely free. We believe quality education should be accessible to everyone, regardless of background or resources.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative w-full py-24 px-6 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-[#6DACE7]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <HelpCircle className="text-[#6DACE7]" size={18} />
            <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
              Questions?
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-[#171710] dark:text-white leading-[0.95] tracking-tighter">
            Frequently Asked{" "}
            <span className="italic font-serif text-slate-400 dark:text-slate-600">
              Questions.
            </span>
          </h2>
        </div>

        {/* FAQ card (inverted theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full rounded-[2.5rem] p-8 md:p-12 shadow-2xl bg-[#171710] text-white dark:bg-white dark:text-[#171710] border border-white/10 dark:border-black/5"
        >
          <div className="divide-y divide-white/10 dark:divide-black/5">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-2">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full py-6 flex items-center justify-between gap-6 text-left focus:outline-none group"
                  >
                    <span className="text-lg md:text-xl font-black tracking-tight group-hover:text-[#6DACE7] transition-colors">
                      {item.question}
                    </span>
                    <div
                      className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-[#6DACE7] text-[#171710] rotate-45"
                          : "bg-white/5 dark:bg-black/5 text-[#6DACE7]"
                      }`}
                    >
                      <Plus size={24} strokeWidth={3} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-gray-400 dark:text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
