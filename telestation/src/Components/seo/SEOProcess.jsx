"use client";

// src/components/seo/SEOProcess.jsx
import { motion } from "framer-motion";

const steps = [
  {
    title: "Brand Analysis",
    description:
      "Our team will analyze the brand and the similar products available in the market, for finalizing the way ahead.",
    icon: "🔎", 
  },
  {
    title: "Keyword & Search Research",
    description:
      "We identify high-intent keywords and search opportunities based on how your customers search, ensuring content is planned with relevance and commercial value in mind.",
    icon: "🔑", 
  },
  {
    title: "Content Performance Review",
    description:
      "We audit existing content to assess rankings, relevance, and gaps. This helps us understand what’s working, what needs improvement, and where new opportunities exist.",
    icon: "📈", 
  },
  {
    title: "Content Structure & Clusters",
    description:
      "We organise content into structured topic clusters and pillar pages to improve internal linking, relevance, and long-term search visibility for priority keywords.",
    icon: "🧩",
  },
  {
    title: "SEO Roadmap Planning",
    description:
      "A clear quarterly SEO plan is created with defined priorities, deliverables, and milestones aligned to your business goals and growth targets.",
    icon: "🗺️", 
  },
  {
    title: "Content Strategy Alignment",
    description:
      "We align content direction, messaging, and formats to ensure all SEO content supports brand positioning while meeting search intent.",
    icon: "🧭", 
  },
  {
    title: "Content & SEO Execution",
    description:
      "Optimised content is developed and implemented across key pages, blogs, and resources, supported by on-page and technical SEO best practices.",
    icon: "🚀", 
  },
  {
    title: "Performance Tracking & Reporting",
    description:
      "We monitor rankings, traffic, and engagement to understand what’s driving growth and refine the strategy for continued improvement.",
    icon: "📊", 
  },
];


// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.2, 0.75, 0.2, 1] },
  },
};

export default function SEOProcess() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#D9F70D]/10 blur-3xl"
          animate={{ y: [0, 10, 0], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.2, 0.75, 0.2, 1] }}
          className="text-3xl font-semibold sm:text-4xl"
        >
          <span className="bg-gradient-to-r from-[#D9F70D] via-white to-[#D9F70D] bg-clip-text text-transparent">
            How We Deliver SEO Results
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 text-sm text-slate-300/80 sm:text-base max-w-2xl mx-auto"
        >
         A structured SEO framework designed to build visibility, authority, and long-term growth.
        </motion.p>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="group flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                {/* outer glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#D9F70D]/10 blur-xl"
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.25 }}
                />

                {/* main ring */}
                <motion.div
                  className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#D9F70D]/70 bg-gradient-to-b from-[#111] via-black to-black shadow-[0_0_30px_rgba(217,247,13,0.25)]"
                  whileHover={{
                    boxShadow: "0_0_55px_rgba(217,247,13,0.50)",
                    scale: 1.06,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="text-2xl"
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                  >
                    {step.icon}
                  </motion.span>
                </motion.div>
              </div>

              <h3 className="text-base font-semibold text-white sm:text-lg">
                {step.title}
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-slate-300/85 sm:text-sm">
                {step.description}
              </p>

              {/* animated underline */}
              <motion.div
                className="mt-4 h-px w-10 bg-[#D9F70D]/60"
                initial={{ opacity: 0, y: 6, scaleX: 0 }}
                whileHover={{ opacity: 1, y: 0, scaleX: 1 }}
                transition={{ duration: 0.25 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
