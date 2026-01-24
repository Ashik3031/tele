import React from "react";
import { motion } from "framer-motion";

const BRAND = {
  primary: "#0B2C73",
  accent: "#37C6D9",
};

export default function LogoShowcase({
  title = "Trusted by",
  subtitle = "Brands we’ve supported in telecom & digital operations",
  logos = [
    { src: "/image/ashtel.png", alt: "Ashtel" },
    { src: "/image/easystore.png", alt: "Easy Store" },
    { src: "/image/snaptel.png", alt: "Snaptel" },
    { src: "/image/infox.png", alt: "Infox" },
    { src: "/image/digtel.png", alt: "Digtel" },
  ],
  className = "",
}) {
  return (
    <section className={`relative w-full bg-black text-white ${className}`}>
      {/* trending background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* soft grid */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(55,198,217,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(55,198,217,0.06)_1px,transparent_1px)] bg-[size:90px_90px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
        {/* glow blobs */}
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#37C6D9]/12 blur-[120px]" />
        <div className="absolute -bottom-28 -right-28 h-[520px] w-[520px] rounded-full bg-[#0B2C73]/25 blur-[140px]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/85" />
      </div>

      <div className="relative mx-auto w-[min(1180px,92vw)] py-12 sm:py-16">
        {/* header */}
        <div className="flex flex-col text-center items-center gap-2 sm:gap-3 px-1">
          {/* <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/60">
            {title}
          </p> */}

          <h3 className="mt-1 text-[20px] leading-tight sm:text-2xl md:text-3xl font-extrabold  uppercase tracking-tight px-2">
           Brands We Own & Operate
          </h3>

          {/* <p className="mt-2 max-w-[38rem] text-[13px] leading-relaxed sm:text-base text-white/65 px-3">
            {subtitle}
          </p> */}
        </div>

        {/* responsive grid (fixes wrap + spacing on all screens) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="
  mt-8 sm:mt-10
  grid gap-3 sm:gap-5
  grid-cols-2
  xs:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-5
  items-stretch
  justify-items-center sm:justify-items-stretch
"

        >
          {logos.map((logo, i) => (
            <motion.div
              key={`${logo.src}-${i}`}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className={`
      group relative overflow-hidden rounded-2xl
      border border-white/10 bg-white/[0.04] backdrop-blur
      shadow-[0_18px_60px_rgba(0,0,0,0.55)]
      p-3 sm:p-4 flex flex-col

      w-full max-w-[180px] sm:max-w-none

      ${logos.length % 2 !== 0 && i === logos.length - 1
  ? "col-span-2 justify-self-center sm:col-span-1 sm:justify-self-auto"
  : ""}

    `}
            >
              {/* shine */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(55,198,217,0.18),transparent_55%)]" />

              {/* logo holder (auto height + consistent card sizing) */}
              <div className="relative flex-1 flex items-center justify-center">
                <div
                  className="
                    w-full
                    rounded-2xl
                    bg-white/90
                    ring-1 ring-black/5
                    shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                    flex items-center justify-center
                    px-4 sm:px-6
                    py-4 sm:py-5
                    min-h-[84px] sm:min-h-[96px] md:min-h-[110px]
                  "
                >
                  <img
                    src={logo.src}
                    alt={logo.alt || `logo-${i}`}
                    loading="lazy"
                    draggable={false}
                    className="
                      w-auto object-contain
                      h-10 sm:h-12 md:h-14 lg:h-16
                      max-w-[140px] sm:max-w-[170px] md:max-w-[190px]
                    "
                  />
                </div>
              </div>

              {/* bottom accent line */}
              <div className="mt-3 sm:mt-4 h-[2px] w-10 rounded-full bg-white/10 group-hover:bg-[#37C6D9]/70 transition-colors mx-auto" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
