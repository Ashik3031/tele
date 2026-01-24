// DecryptedText.jsx
import React, { useEffect, useRef, useState } from "react";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";

export default function DecryptedText({
  text,
  speed = 50,             // ms between iterations
  maxIterations = 10,      // how many times each char scrambles
  characters = DEFAULT_CHARACTERS,
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",     // "hover" | "view" | "load"
  revealDirection = "left" // "left" | "right" | "center"
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypting, setIsDecrypting] = useState(
    animateOn === "load" // start immediately if "load"
  );
  const [hasRun, setHasRun] = useState(false);
  const ref = useRef(null);
  const intervalRef = useRef(null);

  // Helper to get random character
  const randomChar = () =>
    characters.charAt(Math.floor(Math.random() * characters.length)) || " ";

  // Start animation
  const startDecrypt = () => {
    if (hasRun && animateOn === "view") return; // run once on view
    setIsDecrypting(true);
    setHasRun(true);
  };

  // IntersectionObserver for animateOn="view"
  useEffect(() => {
    if (animateOn !== "view") return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startDecrypt();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOn]);

  // Core decrypting effect
  useEffect(() => {
    if (!isDecrypting) return;

    const original = text.split("");
    let iterations = 0;

    const getActiveRange = (progress) => {
      const length = original.length;
      if (revealDirection === "left") {
        return Math.floor(progress * length);
      } else if (revealDirection === "right") {
        return length - Math.floor(progress * length);
      } else {
        // center
        const half = Math.floor(length / 2);
        const span = Math.floor(progress * length);
        return { start: half - span, end: half + span };
      }
    };

    intervalRef.current = setInterval(() => {
      iterations++;
      const progress = Math.min(iterations / maxIterations, 1);

      let output = [...original];

      if (revealDirection === "center") {
        const { start, end } = getActiveRange(progress);
        for (let i = 0; i < original.length; i++) {
          if (i < start || i > end) {
            output[i] = randomChar();
          } else {
            output[i] = original[i];
          }
        }
      } else {
        const activeIndex = getActiveRange(progress);
        for (let i = 0; i < original.length; i++) {
          if (
            (revealDirection === "left" && i > activeIndex) ||
            (revealDirection === "right" && i < activeIndex)
          ) {
            output[i] = randomChar();
          } else {
            output[i] = original[i];
          }
        }
      }

      setDisplayText(output.join(""));

      if (progress === 1) {
        clearInterval(intervalRef.current);
        setIsDecrypting(false);
        setDisplayText(text); // ensure final is exact
      }
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [isDecrypting, text, speed, maxIterations, characters, revealDirection]);

  // For animateOn="load"
  useEffect(() => {
    if (animateOn === "load") {
      startDecrypt();
    }
  }, [animateOn]);

  // For hover mode
  const handleMouseEnter = () => {
    if (animateOn === "hover") {
      startDecrypt();
    }
  };

  return (
    <span
      ref={ref}
      className={parentClassName}
      onMouseEnter={handleMouseEnter}
    >
      <span className={isDecrypting ? encryptedClassName : className}>
        {displayText}
      </span>
    </span>
  );
}
