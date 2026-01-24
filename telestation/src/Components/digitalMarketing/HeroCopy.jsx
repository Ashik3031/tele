"use client";

import React from "react";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const BRAND = "#D9F70D";

export default function HeroCopy() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft radial */}
        <div
          className="absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(217,247,13,0.16) 0%, transparent 62%)",
          }}
        />
        {/* side glow */}
        <div
          className="absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(217,247,13,0.10) 0%, transparent 60%)",
          }}
        />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, ${BRAND} 1px, transparent 1px),
                              linear-gradient(to bottom, ${BRAND} 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(circle at 40% 20%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 40% 20%, black, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="min-h-[72vh] py-20 sm:py-24 lg:py-28 flex items-center">
          <div className="w-full grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
            {/* Left content */}
            <div>
              {/* badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND }} />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                  Services
                </span>
              </motion.div>

              {/* title */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
              >
                Strategy, Creative,
                <span className="block">
                  and{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${BRAND}, rgba(217,247,13,0.65), ${BRAND})`,
                    }}
                  >
                    Performance
                  </span>
                </span>
              </motion.h1>

              {/* description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
              >
                From branding and web development to content, SEO, and social media—Digtel
                delivers end-to-end digital services designed to scale your visibility,
                engagement, and conversions.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="#services-list"
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-black transition hover:scale-[1.03] active:scale-[0.98]"
                  style={{ background: BRAND }}
                >
                  Explore Services
                  <FiArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-xl transition hover:bg-white/[0.06]"
                >
                  Get a Proposal <span className="text-white/60">→</span>
                </a>
              </motion.div>

              {/* mini proof points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.28 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {[
                  "Full-service team",
                  "Fast turnaround",
                  "Performance reporting",
                  "Premium creative",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/80"
                  >
                    <FiCheckCircle className="text-white/70" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right panel */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                {/* inner glow */}
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
                  style={{ background: `${BRAND}1f` }}
                />
                <div className="relative">
                  <p className="text-sm font-semibold text-white/90">What we deliver</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    A clear process, premium execution, and measurable results—built for
                    long-term brand growth.
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      { k: "Web", v: "UX/UI, Development, Landing Pages" },
                      { k: "Social", v: "Content, Reels, Monthly Strategy" },
                      { k: "SEO", v: "On-page, Technical, Growth Roadmap" },
                      { k: "Creative", v: "Photo/Video, Ads, Brand Assets" },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                      >
                        <span
                          className="shrink-0 rounded-full px-3 py-1 text-xs font-bold text-black"
                          style={{ background: BRAND }}
                        >
                          {row.k}
                        </span>
                        <span className="text-sm text-white/75">{row.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                      Based in UAE • Working globally
                    </p>
                    <div className="mt-3 flex items-end gap-6">
                      <div>
                        <div className="text-2xl font-extrabold text-white">300+</div>
                        <div className="text-xs text-white/60">Clients</div>
                      </div>
                      <div>
                        <div className="text-2xl font-extrabold text-white">1000+</div>
                        <div className="text-xs text-white/60">Projects</div>
                      </div>
                      <div>
                        <div className="text-2xl font-extrabold text-white">5+</div>
                        <div className="text-xs text-white/60">Locations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating accent */}
              <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl lg:block" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
