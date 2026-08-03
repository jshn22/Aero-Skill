import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    type: "count",
    target: 500,
    suffix: "+",
    label: "Students Mentored",
    desc: "So far, across pilot sessions.",
  },
  {
    type: "count",
    target: 2,
    suffix: "+",
    label: "Communities Impacted",
    desc: "And growing steadily.",
  },
];

function useCountUp(target, suffix, duration, active) {
  const [value, setValue] = useState("0" + suffix);

  useEffect(() => {
    if (!active) return;
    
    const controls = animate(0, target, {
      duration: duration / 1000,
      ease: "easeOut",
      onUpdate: (v) => {
        setValue(Math.floor(v) + suffix);
      },
    });

    return () => controls.stop();
  }, [active, target, suffix, duration]);

  return value;
}

const CountStat = ({ stat, index, active }) => {
  const val = useCountUp(stat.target, stat.suffix, 2500, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center group"
    >
      <div className="relative mb-3">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#6DACE7] transition-transform duration-500 group-hover:scale-110">
          {val}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + index * 0.15, duration: 0.8, ease: "easeOut" }}
          style={{ originX: 0 }}
          className="h-[3px] w-16 bg-[#6DACE7]/40 mt-1 rounded-full mx-auto"
        />
      </div>
      <h3 className="text-xs font-black uppercase tracking-widest mb-2 opacity-90">
        {stat.label}
      </h3>
      <p className="text-sm opacity-60 max-w-[200px] leading-relaxed">
        {stat.desc}
      </p>
    </motion.div>
  );
};

const TextStat = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center text-center group"
  >
    <div className="relative mb-3">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-6xl md:text-8xl font-black tracking-tighter text-[#6DACE7] transition-transform duration-500 group-hover:scale-110"
      >
        {stat.display}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 + index * 0.15, duration: 0.8, ease: "easeOut" }}
        style={{ originX: 0 }}
        className="h-[3px] w-16 bg-[#6DACE7]/40 mt-1 rounded-full mx-auto"
      />
    </div>
    <h3 className="text-xs font-black uppercase tracking-widest mb-2 opacity-90">
      {stat.label}
    </h3>
    <p className="text-sm opacity-60 max-w-[200px] leading-relaxed">
      {stat.desc}
    </p>
  </motion.div>
);

const ImpactStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full py-24 px-6 overflow-hidden bg-[#171710] text-white dark:bg-white dark:text-[#171710] transition-colors duration-500"
    >
      {/* Top + bottom accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6DACE7]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6DACE7]/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-[#6DACE7]" />
            <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
              Our Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">
            Building Real{" "}
            <span className="italic font-serif text-[#6DACE7]">Capability.</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 md:divide-x md:divide-white/10 dark:md:divide-black/10">
          {stats.map((stat, i) =>
            stat.type === "count" ? (
              <CountStat key={stat.label} stat={stat} index={i} active={inView} />
            ) : (
              <TextStat key={stat.label} stat={stat} index={i} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
