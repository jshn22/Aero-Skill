import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Sparkles, ShieldCheck } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative w-full py-24 px-6 bg-slate-50 dark:bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[35%] h-[45%] bg-[#6DACE7]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111418] p-8 md:p-12 lg:p-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-[1px] w-8 bg-[#6DACE7]" />
                <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
                  Ready to Begin?
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-tight text-[#171710] dark:text-white">
                Do not just pass.
                <br />
                Learn to{" "}
                <span className="italic font-serif text-[#6DACE7]">
                  think and build.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                For students who want deep understanding, practical confidence,
                and skills they can use long after exams. Join AeroSkill and
                start building today.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#171710] dark:bg-white text-white dark:text-black font-black text-sm shadow-xl hover:bg-[#6DACE7] dark:hover:bg-[#6DACE7] dark:hover:text-white transition-all"
                >
                  <Rocket size={18} />
                  Get Started
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 text-[#171710] dark:text-white font-black text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                >
                  <Sparkles size={18} className="text-[#6DACE7]" />
                  Explore Curriculum
                </a>
              </div>
            </div>

            {/* Next batch card */}
            <div className="lg:col-span-4">
              <div className="rounded-[2rem] bg-[#171710] dark:bg-white p-6 md:p-7 text-white dark:text-black min-h-[240px] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#6DACE7]/25 blur-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 dark:bg-black/10 flex items-center justify-center mb-5">
                    <ShieldCheck size={24} className="text-[#6DACE7]" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-300 dark:text-slate-600">
                    Next Batch
                  </p>
                  <h3 className="text-3xl font-black mt-2">
                    {new Date().toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 dark:text-slate-600 leading-relaxed">
                    Seats open for learners ready to build with mentorship and
                    real project execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
