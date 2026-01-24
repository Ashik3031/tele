// src/components/StatsRibbon.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiSmile, FiCheckCircle, FiGlobe } from "react-icons/fi";

const BRAND = "#D9F70D";

const STATS = [
  { label: "Happy Clients", value: "300", icon: FiSmile },
  { label: "Projects Completed", value: "300", icon: FiCheckCircle },
  { label: "Global Location", value: "5", icon: FiGlobe },
];

export default function StatsRibbon({ items = STATS }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const card = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="w-full bg-black py-6">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="relative overflow-hidden rounded-xl border border-black/10 bg-black"
        >
          {/* soft brand glow */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute -left-16 -top-24 h-64 w-64 rounded-full blur-3xl"
              style={{ background: `${BRAND}1A` }}
            />
            <div
              className="absolute -right-16 -bottom-24 h-64 w-64 rounded-full blur-3xl"
              style={{ background: `${BRAND}14` }}
            />
          </div>

          {/* 3 columns */}
          <div className="relative grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {items.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  variants={card}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group flex items-center gap-4 px-6 py-5"
                >
                  {/* icon badge */}
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5">
                    <Icon
                      className="text-lg transition group-hover:scale-110"
                      style={{ color: BRAND }}
                    />
                  </div>

                  {/* text */}
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-white/70">
                      {s.label}
                    </p>

                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-white">
                        {s.value}
                      </p>

                      {/* brand pulse dot */}
                      <span className="relative top-[1px] inline-flex h-2 w-2">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                          style={{ background: BRAND }}
                        />
                        <span
                          className="relative inline-flex h-2 w-2 rounded-full"
                          style={{ background: BRAND }}
                        />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
