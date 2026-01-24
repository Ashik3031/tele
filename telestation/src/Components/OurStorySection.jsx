import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ColorBrushText from "./ColorBrushText";
import TeleHeroHeading from "./TeleHeroHeading";

const EASE = [0.22, 1, 0.36, 1];
const HOVER_PALETTE = ["#A78BFA", "#22D3EE", "#F472B6", "#FBBF24"];

// Detect touch devices (coarse pointer)
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return isTouch;
}

// Mobile-only animated text (no hover)
function MobileSweepText({ text, className = "" }) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Base text */}
      <span className="text-white/80">{text}</span>

      {/* Sweep highlight layer */}
      <motion.span
        aria-hidden="true"
        className="
          absolute inset-0
          text-transparent bg-clip-text
          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)]
          bg-[length:200%_100%]
          mix-blend-screen
        "
        style={{ WebkitTextFillColor: "transparent" }}
        initial={{ backgroundPositionX: "0%" }}
        whileInView={{ backgroundPositionX: "200%" }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1.35, ease: EASE, delay: 0.15 }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

export default function OurStoryTextBlock({
  data = {
    eyebrow: "Our Story",
    heading: {
      before: "Turning conversations into",
      highlight: "business opportunities",
     
    },
    paragraph: [
      "TSPL is a BPO service provider delivering end-to-end telecommunication operations and customer engagement solutions. We work closely with leading Middle East telecom providers such as du and Etisalat, supporting high-volume, performance-driven telecom programs with precision and reliability.",
      "We have special OSP license certified by Department Of Telecommunications to regulate our services, which sets us apart from the major telecom service providers in the market. TSPL services solve critical business challenges, optimize business efficiency, minimize time, and save operational costs.",
      "Approaching your potential clients in an organized and personalized methodology to market services and products is our number one priority. We market your services based on your business value by leveraging the latest technology",
    ],
  },
  className = "",
}) {
  const isTouch = useIsTouch();

  return (
    <section className={`w-full bg-black text-white ${className}`}>
      <div className="mx-auto w-[min(1180px,92vw)] py-12 sm:py-16">
        <TeleHeroHeading />

        <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6 md:space-y-7 max-w-[72rem] mx-auto text-justify">
          {data.paragraph.map((para, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.85,
                ease: EASE,
                delay: 0.08 + idx * 0.08,
              }}
              className="text-white/75"
            >
              {isTouch ? (
                <MobileSweepText
                  text={para}
                  className="
                    font-light cursor-default
                    text-[17px] leading-[1.9]
                    sm:text-xl sm:leading-[1.9]
                    md:text-[22px] md:leading-[2]
                    lg:text-[24px] lg:leading-[2.05]
                  "
                />
              ) : (
                <ColorBrushText
                  text={para}
                  baseColor="rgba(255,255,255,0no .78)"
                  palette={HOVER_PALETTE}
                  neighbor={1}
                 
                  className="
                    cursor-pointer font-light
                    text-[22px] leading-[1.55]
  sm:text-[24px] sm:leading-[1.6]
  md:text-[26px] md:leading-[1.65]
  lg:text-[28px] lg:leading-[1.7]
  text-white/80
                  "
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
