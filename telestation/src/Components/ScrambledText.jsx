

import React, { useEffect, useRef, useState } from "react";

const DEFAULT_SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:,.<>/?";

export default function ScrambledText({
  children,
  className = "",
  radius = 100,         // not strictly required, but kept for API parity
  duration = 1.2,       // total animation duration in seconds
  speed = 0.5,          // tweak how aggressively it scrambles
  scrambleChars = ".:", // characters used when scrambling
}) {
  const [output, setOutput] = useState(
    typeof children === "string" ? children : ""
  );
  const frameRef = useRef(null);

  useEffect(() => {
    const text = typeof children === "string" ? children : "";
    const chars = (scrambleChars && scrambleChars.length
      ? scrambleChars
      : DEFAULT_SCRAMBLE_CHARS
    ).split("");

    if (!text) return;

    const original = text.split("");
    const length = original.length;

    const randomChar = () =>
      chars[Math.floor(Math.random() * chars.length)] || " ";

    const totalDurationMs = duration * 1000;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const rawProgress = elapsed / totalDurationMs;

      // clamp 0–1
      let progress = Math.max(0, Math.min(1, rawProgress));

      // speed influences how fast we move through the string
      const effectiveProgress = Math.min(progress * (0.5 + speed), 1);
      const revealCount = Math.floor(effectiveProgress * length);

      const result = original.map((ch, index) => {
        if (ch === " ") return " ";

        // already revealed
        if (index < revealCount) return ch;

        // optional: radius can reduce scrambling far from the reveal boundary
        const distanceFromBoundary = Math.abs(index - revealCount);
        const influence =
          radius > 0 ? Math.max(0, 1 - distanceFromBoundary / radius) : 1;

        // Slight chance to show original char when near the end of animation
        const revealChance = effectiveProgress * influence;
        if (Math.random() < revealChance * 0.2) {
          return ch;
        }

        return randomChar();
      });

      setOutput(result.join(""));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final text is perfectly clean
        setOutput(text);
      }
    };

    // start animation
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [children, duration, speed, radius, scrambleChars]);

  return <span className={className}>{output}</span>;
}
