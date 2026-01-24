import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BRAND = {
  navy: "#0B2C73",
  primary: "#007399",
  mid: "#016389",
  accent: "#37C6D9",
};

const ease = [0.22, 1, 0.36, 1];

export default function TwoNationShowcase({
  heading = ["Agency Across", "Two Nations"],
  blurb = "From India’s creative hub to the heart of Dubai’s innovation district, our studios are where ideas turn into impact.",
  leftCard = {
    title: "India Office",
    subtitle: "Rooted in creativity, serving clients across the nation.",
    image: "/image/about1.jpg",
  },
  rightCard = {
    title: "Dubai Office",
    subtitle: "Rooted in creativity, serving clients across the nation.",
    image: "/image/about2.jpg",
  },
}) {
  const wrapRef = useRef(null);

  // scroll-synced entrance
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 80%", "end 35%"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.4], [18, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const leftX = useTransform(scrollYProgress, [0.1, 0.65], [-140, 0]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.65], [140, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const cardsScale = useTransform(scrollYProgress, [0.05, 0.65], [0.98, 1]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full bg-black py-16 sm:py-20 overflow-hidden"
    >
      {/* subtle background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${BRAND.accent} 1px, transparent 0)`,
            backgroundSize: "38px 38px",
          }}
        />
      </div>

      {/* brand glows */}
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: `${BRAND.primary}55` }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-40 h-[420px] w-[420px] rounded-full blur-3xl opacity-25"
        style={{ backgroundColor: `${BRAND.accent}55` }}
      />

      <div className="relative mx-auto w-[min(1200px,92vw)]">
        {/* TOP ROW (title + blurb) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="lg:col-span-8"
          >
            <h2 className="text-white font-semibold tracking-tight leading-[0.95] text-5xl sm:text-6xl md:text-7xl">
              <span className="block">{heading[0]}</span>
              <span className="block">
                <span className="text-white">{heading[1]}</span>
                <span
                  className="inline-block align-top ml-3 h-3 w-3 rounded-full"
                  style={{ backgroundColor: BRAND.accent }}
                />
              </span>
            </h2>

            {/* thin brand underline */}
            <div className="mt-6 h-[3px] w-28 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full w-16 rounded-full"
                style={{ backgroundColor: BRAND.accent }}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="lg:col-span-4 lg:pt-6"
          >
            <p className="text-white/80 leading-relaxed text-base sm:text-lg">
              {blurb}
            </p>
          </motion.div>
        </div>

        {/* BOTTOM ROW (two big images) */}
        <motion.div
          style={{ opacity: cardsOpacity, scale: cardsScale }}
          className="mt-12 sm:mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* LEFT IMAGE CARD */}
            <motion.a
              href="#"
              style={{ x: leftX }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="
                group relative overflow-hidden rounded-3xl
                lg:col-span-7
                border border-white/10
                bg-white/5
                shadow-[0_40px_130px_rgba(0,0,0,0.65)]
              "
            >
              <img
                src={leftCard.image}
                alt={leftCard.title}
                className="h-[360px] sm:h-[420px] w-full object-cover"
                loading="lazy"
              />

              {/* dark overlay + diagonal texture */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
              <div className="absolute inset-0 opacity-[0.12] [background:linear-gradient(115deg,transparent_0%,rgba(55,198,217,0.55)_30%,transparent_60%)]" />

              {/* bottom label */}
              <div className="absolute left-6 bottom-6">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: BRAND.accent }}
                  />
                  <h3 className="text-white text-lg sm:text-xl font-semibold">
                    {leftCard.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-[44ch] text-white/75 text-sm sm:text-base">
                  {leftCard.subtitle}
                </p>

                {/* small underline grows on hover */}
                <div className="mt-4 h-[2px] w-12 bg-white/20 overflow-hidden rounded-full">
                  <div
                    className="h-full w-0 group-hover:w-12 transition-all duration-500 rounded-full"
                    style={{ backgroundColor: BRAND.accent }}
                  />
                </div>
              </div>

              {/* hover ring */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `inset 0 0 0 1px ${BRAND.accent}55`,
                }}
              />
            </motion.a>

            {/* RIGHT IMAGE CARD */}
            <motion.a
              href="#"
              style={{ x: rightX }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="
                group relative overflow-hidden rounded-3xl
                lg:col-span-5
                border border-white/10
                bg-white/5
                shadow-[0_40px_130px_rgba(0,0,0,0.65)]
              "
            >
              <img
                src={rightCard.image}
                alt={rightCard.title}
                className="h-[360px] sm:h-[420px] w-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
              <div className="absolute inset-0 opacity-[0.12] [background:linear-gradient(115deg,transparent_0%,rgba(0,115,153,0.65)_32%,transparent_62%)]" />

              <div className="absolute left-6 bottom-6">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: BRAND.accent }}
                  />
                  <h3 className="text-white text-lg sm:text-xl font-semibold">
                    {rightCard.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-[44ch] text-white/75 text-sm sm:text-base">
                  {rightCard.subtitle}
                </p>

                <div className="mt-4 h-[2px] w-12 bg-white/20 overflow-hidden rounded-full">
                  <div
                    className="h-full w-0 group-hover:w-12 transition-all duration-500 rounded-full"
                    style={{ backgroundColor: BRAND.accent }}
                  />
                </div>
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `inset 0 0 0 1px ${BRAND.accent}55`,
                }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
