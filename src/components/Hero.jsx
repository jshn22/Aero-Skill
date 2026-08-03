import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const typeContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.04,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const TypeText = ({ text, className }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <motion.span key={i} variants={charVariants}>
        {char}
      </motion.span>
    ))}
  </span>
);

const Hero = () => {

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#050505] px-6 py-20 transition-colors duration-500">
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[500px] bg-[#6DACE7]/10 blur-[120px] rounded-full opacity-60" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl text-center flex flex-col items-center gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm hover:border-[#6DACE7]/50 transition-all">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DACE7] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6DACE7]" />
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Stop Memorizing. Start Understanding.
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={typeContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter text-[#171710] dark:text-white"
        >
          <TypeText text="Turning " />
          <TypeText text="Theory" className="text-slate-400 dark:text-slate-600" />
          <br />
          <TypeText text="Into " />
          <TypeText text="Real World" className="italic font-serif text-[#6DACE7]" />
          <TypeText text=" Skills." />
        </motion.h1>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <a
            href="#curriculum"
            className="group relative flex items-center gap-3 bg-[#171710] dark:bg-white text-white dark:text-[#171710] px-8 py-4 rounded-2xl font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95 hover:bg-[#6DACE7]"
          >
            <BookOpen size={18} />
            Overview of Curriculum
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <Link
            to="/contact"
            className="flex items-center gap-3 bg-white dark:bg-[#0A0A0A] text-[#171710] dark:text-white border border-slate-200 dark:border-white/10 px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95 shadow-sm"
          >
            Feedback
          </Link>
        </motion.div>

        {/* 80/20 Approach Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mt-8 pt-8 border-t border-slate-200 dark:border-white/5 w-full max-w-md"
        >
          <div className="flex items-center gap-8 md:gap-16 text-center">
            {/* 80% Practical */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ y: -40, opacity: 0, rotateX: -90 }}
                whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  delay: 0.8
                }}
                className="text-4xl md:text-5xl font-black text-[#6DACE7] drop-shadow-md"
              >
                80%
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1 }}
                className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#171710] dark:text-white mt-2"
              >
                Practical
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div 
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.1 }}
              className="w-px h-12 bg-slate-300 dark:bg-white/10"
            />

            {/* 20% Theory */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ y: -40, opacity: 0, rotateX: -90 }}
                whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  delay: 0.95
                }}
                className="text-4xl md:text-5xl font-black text-slate-400 dark:text-slate-600"
              >
                20%
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.15 }}
                className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-500 mt-2"
              >
                Theory
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
