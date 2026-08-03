import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import VikasMentor from "../assets/VikasMentor.jpeg";
import LavShashankTeam from "../assets/LavShashankTeam.jpeg";

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
  const mentors = [
    { name: "Vikas", image: VikasMentor },
    { name: "Lav Shashank", image: LavShashankTeam },
  ];

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

        {/* Mentor social proof */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 mt-6 pt-8 border-t border-slate-100 dark:border-white/5 w-full max-w-md"
        >
          <div className="flex -space-x-3">
            {mentors.map((m) => (
              <img
                key={m.name}
                src={m.image}
                alt={m.name}
                className="w-10 h-10 rounded-full border-4 border-white dark:border-[#050505] object-cover bg-slate-200"
              />
            ))}
            <div className="h-10 px-4 rounded-full border-4 border-white dark:border-[#050505] bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-black uppercase tracking-tighter text-[#171710] dark:text-white">
              +50 Mentors
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            Guided by{" "}
            <span className="text-[#171710] dark:text-white underline decoration-[#6DACE7] underline-offset-4">
              vetted industry professionals
            </span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
