import React from "react";
import { motion } from "framer-motion";
import PixelCard from "./PixelCard";

const ease = [0.22, 1, 0.36, 1];

const variants = {
  left: {
    hidden: { opacity: 0, x: -90, y: 0, scale: 0.98, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease },
    },
  },
  top: {
    hidden: { opacity: 0, x: 0, y: -70, scale: 0.98, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease },
    },
  },
  right: {
    hidden: { opacity: 0, x: 90, y: 0, scale: 0.98, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease },
    },
  },
};

export default function AnimatedPixelCard({
  from = "left", // "left" | "top" | "right"
  delay = 0,
  variant = "telestation",
  className = "",
  children,
  ...props
}) {
  const v = variants[from] || variants.left;

  return (
    <motion.div
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay }}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      <PixelCard variant={variant} {...props}>
        {children}
      </PixelCard>
    </motion.div>
  );
}
