// TippingPointHero.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Premium "tipping point" loop animation using SVG + Framer Motion.
 * - Dark gradient background
 * - Magenta baseline
 * - Outlined circles pyramid
 * - One filled circle drops -> stack breaks -> re-forms
 */
export default function TippingPointHero({
  line1 = "For many organizations, 2020",
  line2 = "was a tipping point.",
  highlight = "tipping point",
}) {
  const W = 900;
  const H = 420;

  const MAGENTA = "#d10b6a";
  const BG = "#120b1f";

  // Build pyramid positions (15 circles: 1+2+3+4+5)
  const pyramid = useMemo(() => {
    const levels = [1, 2, 3, 4, 5];
    const r = 16;
    const gapX = 42;
    const gapY = 36;

    const cx0 = W / 2;
    const topY = 80;

    const pts = [];
    let idx = 0;

    levels.forEach((count, row) => {
      const rowY = topY + row * gapY;
      const rowWidth = (count - 1) * gapX;
      for (let c = 0; c < count; c++) {
        pts.push({
          id: idx++,
          x: cx0 - rowWidth / 2 + c * gapX,
          y: rowY,
          r,
        });
      }
    });

    return pts; // 15
  }, [W]);

  // Create “break” layouts (right spill + left spill) deterministically
  const layouts = useMemo(() => {
    const base = pyramid;

    const baselineY = 255;

    const rightSpill = base.map((p, i) => {
      // push most circles to the right and slightly down with stagger
      const t = i / (base.length - 1);
      const x = p.x + 220 + 110 * t + (i % 3) * 10;
      const y = Math.min(baselineY - 10, p.y + 85 + 65 * t + (i % 4) * 6);
      return { ...p, x, y };
    });

    const leftSpill = base.map((p, i) => {
      const t = i / (base.length - 1);
      const x = p.x - 220 - 110 * (1 - t) - (i % 3) * 10;
      const y = Math.min(baselineY - 10, p.y + 85 + 65 * (1 - t) + (i % 4) * 6);
      return { ...p, x, y };
    });

    return { base, rightSpill, leftSpill, baselineY };
  }, [pyramid]);

  // Keyframe timing (≈ video loop feel)
  const times = [0, 0.33, 0.66, 1];
  const duration = 14;

  // Text: highlight only the phrase
  const renderLine2 = () => {
    // naive highlight split
    const parts = line2.split(highlight);
    if (parts.length === 1) return <span>{line2}</span>;

    return (
      <>
        <span>{parts[0]}</span>
        <span className="text-[color:var(--magenta)]">{highlight}</span>
        <span>{parts[1]}</span>
      </>
    );
  };

  return (
    <section
      className="relative min-h-[70vh] w-full overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      {/* soft premium background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-[90px]" />
        <div className="absolute -bottom-48 left-1/4 h-[520px] w-[520px] rounded-full bg-[color:var(--magenta)]/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_10%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div
        className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-16"
        style={{ ["--magenta"]: MAGENTA }}
      >
        {/* SVG Animation */}
        <div className="w-full max-w-4xl">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
            {/* baseline */}
            <motion.line
              x1={W * 0.36}
              y1={layouts.baselineY}
              x2={W * 0.64}
              y2={layouts.baselineY}
              stroke={MAGENTA}
              strokeWidth="2"
              opacity="0.9"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* outlined circles */}
            {pyramid.map((p, i) => {
              const b = layouts.base[i];
              const r = layouts.rightSpill[i];
              const l = layouts.leftSpill[i];

              return (
                <motion.circle
                  key={p.id}
                  r={p.r}
                  fill="transparent"
                  stroke={MAGENTA}
                  strokeWidth="2"
                  opacity="0.95"
                  initial={{ cx: b.x, cy: b.y }}
                  animate={{
                    cx: [b.x, r.x, l.x, b.x],
                    cy: [b.y, r.y, l.y, b.y],
                  }}
                  transition={{
                    duration,
                    times,
                    repeat: Infinity,
                    ease: ["easeInOut", "easeInOut", "easeInOut"],
                    delay: i * 0.015, // subtle organic stagger
                  }}
                />
              );
            })}

            {/* filled “impact” circle */}
            <motion.circle
              r="16"
              fill={MAGENTA}
              initial={{ cx: W / 2, cy: 20, opacity: 1 }}
              animate={{
                cx: [W / 2, W / 2 + 40, W / 2 - 80, W / 2],
                cy: [20, 132, layouts.baselineY - 75, 20],
                opacity: [1, 1, 1, 1],
              }}
              transition={{
                duration,
                times,
                repeat: Infinity,
                ease: ["easeIn", "easeOut", "easeInOut"],
              }}
            />

            {/* small “accent” dot (subtle, premium detail) */}
            <motion.circle
              r="4"
              fill={MAGENTA}
              initial={{ cx: W / 2 + 120, cy: layouts.baselineY - 90, opacity: 0.0 }}
              animate={{
                opacity: [0.0, 0.25, 0.0, 0.0],
                cy: [layouts.baselineY - 90, layouts.baselineY - 105, layouts.baselineY - 90, layouts.baselineY - 90],
              }}
              transition={{ duration, times, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Text block (centered, premium) */}
        <div className="mt-4 text-center">
          <p className="font-serif text-lg tracking-tight text-white/90 sm:text-xl">
            {line1}
          </p>
          <p className="font-serif text-lg tracking-tight text-white/90 sm:text-xl">
            {renderLine2()}
          </p>
        </div>
      </div>
    </section>
  );
}
