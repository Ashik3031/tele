import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ColorBrushLetterWiggleText({
  text = "",
  baseColor = "rgba(255,255,255,0.78)",
  palette = ["#A78BFA", "#22D3EE", "#F472B6", "#FBBF24"],
  neighbor = 2,
  className = "",
  letterClassName = "",
  shake = {
    rotate: 3,
    x: 4,
    y: 2,
    scale: 1.22,
    lift: 6,
  },
}) {
  // ✅ prevent "undefined is not iterable"
  const safeText = typeof text === "string" ? text : String(text ?? "");
  const chars = useMemo(() => Array.from(safeText), [safeText]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef(null);

  const pickColor = (idx) => palette[Math.abs(idx) % palette.length];

  // ✅ brush colors ONLY when hovering the whole word
  const colorForChar = (i) => {
    if (!isHovering || activeIndex < 0) return baseColor;

    const d = Math.abs(i - activeIndex);
    if (d === 0) return pickColor(i);

    if (d <= neighbor) {
      const c = pickColor(i + 1);
      return c.startsWith("#") ? `${c}CC` : c;
    }

    return baseColor;
  };

  const setActive = (i) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setActiveIndex(i));
  };

  const clearAll = () => {
    setIsHovering(false);
    setActiveIndex(-1);
  };

  // ✅ ONLY hover letter shakes (normal state otherwise)
 const bigShake = {
  rotate: [0, -shake.rotate, shake.rotate, -shake.rotate * 0.6, 0],
  x: [0, -shake.x, shake.x, -shake.x * 0.5, 0],
  y: [0, -shake.y, shake.y, -shake.y * 0.4, 0],
  scale: [1, shake.scale, 1],
};

  return (
    <span
      className={className}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={clearAll}
    >
      {chars.map((ch, i) => {
        if (ch === " ") return <span key={i}> </span>;

        const isHot = isHovering && activeIndex === i;

        return (
          <motion.span
  key={i}
  className={letterClassName}
  onPointerEnter={() => setActive(i)}
  onPointerMove={() => setActive(i)}
  // ✅ hard reset baseline so no slant when not hovered
  initial={false}
  animate={{ rotate: 0, x: 0, y: 0, scale: 1 }}
  whileHover={{
    ...bigShake,
    y: [0, -shake.lift, 0], // lift on hover
  }}
  transition={{
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1],
  }}
  style={{
    display: "inline-block",
    color: colorForChar(i),
    transition: "color 140ms ease",
    transformOrigin: "50% 70%",
    willChange: "transform",
    textShadow: isHot
      ? "0 0 18px rgba(255,255,255,0.10), 0 0 26px rgba(34,211,238,0.14)"
      : "none",
  }}
>
  {ch}
</motion.span>
        );
      })}
    </span>
  );
}
