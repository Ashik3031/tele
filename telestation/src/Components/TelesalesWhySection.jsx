import React from "react";
import { motion } from "framer-motion";
import PixelCard from "./PixelCard";

const CARDS = [
  {
    title: "Save Time",
    text: "Inbound and outbound telemarketing are both challenging and time consuming. Save time by choosing Telestation Services and focus on core business functions instead.",
    from: "left",
  },
  {
    title: "Cost Effective",
    text: "You are never charged a fee for our expertise and recommendations with regards to outbound and inbound telemarketing, or for our business answering services.",
    from: "top",
  },
  {
    title: "Best Fit",
    text: "You can count on our award-winning resource network to provide “Best Fit” solutions with a personal touch and world class customer care and brand management.",
    from: "right",
  },
];

const ease = [0.22, 1, 0.36, 1];

const cardVariants = {
  left: {
    hidden: { opacity: 0, x: -80, y: 0, scale: 0.98, filter: "blur(10px)" },
    show: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
  },
  top: {
    hidden: { opacity: 0, x: 0, y: -60, scale: 0.98, filter: "blur(10px)" },
    show: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
  },
  right: {
    hidden: { opacity: 0, x: 80, y: 0, scale: 0.98, filter: "blur(10px)" },
    show: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
  },
};

export default function WhyTelestationPixel() {
  return (
    <section className="bg-black py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease }}
          className="text-center text-3xl sm:text-4xl font-semibold text-white"
        >
          Telesales & Telemarketing Outsourcing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mx-auto mt-6 max-w-4xl text-center text-white/70"
        >
          Since our Launch in 2020, Telestation has been providing services and
          results that are well-equipped in quality as well as efficiency
        </motion.p>

        {/* ✅ Cards with movement */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ staggerChildren: 0.14 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CARDS.map((c, idx) => (
            <motion.div
              key={c.title}
              variants={cardVariants[c.from]}
              transition={{ duration: 0.9, ease, delay: idx * 0.05 }}
              whileHover={{ y: -10 }} // extra movement on hover
              style={{ willChange: "transform, opacity, filter" }}
            >
              {/* keep your pixel hover inside */}
              <PixelCard className="min-h-[280px]">
                <h3 className="text-2xl font-semibold text-white">{c.title}</h3>
                <p className="mt-5 text-white/75 leading-relaxed">{c.text}</p>

                <div className="mt-8 flex justify-center">
                  <span className="h-1 w-16 rounded-full bg-[#37C6D9]" />
                </div>
              </PixelCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
