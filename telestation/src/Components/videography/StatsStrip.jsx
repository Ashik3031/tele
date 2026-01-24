// src/components/common/StatsStrip.jsx
import { motion } from "framer-motion";

const STATS = [
  { value: "300+", label: "Clients" },
  { value: "1000+", label: "Videos" },
  { value: "5+", label: "Global" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StatsStrip() {
  return (
    <section className="bg-black py-10">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/10 bg-black p-6 sm:p-8"
        >
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.45 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                variants={item}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="group relative pl-6"
              >
                {/* Divider (draw-in) */}
                <motion.span
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-0 top-1 h-full w-px origin-top bg-white/15"
                />

                {/* Value (pop-in) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.12 + idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                >
                  <span className="transition group-hover:text-[#D9F70D]">
                    {s.value}
                  </span>
                </motion.div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.18 + idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-1 text-sm text-slate-300"
                >
                  {s.label}
                </motion.div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -inset-3 rounded-2xl opacity-0 blur-2xl transition duration-300 group-hover:opacity-100"
                     style={{ background: "radial-gradient(circle at 30% 20%, rgba(217,247,13,0.22), transparent 60%)" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
