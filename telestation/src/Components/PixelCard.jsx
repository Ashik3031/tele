import React, { useEffect, useRef } from "react";

/* ======= BRAND ======= */
const BRAND = {
  c1: "#37C6D9",
  c2: "#0B2C73",
  c3: "#016389",
  c4: "#007399",
};

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;

    this.speed = (Math.random() * (0.9 - 0.1) + 0.1) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;

    this.minSize = 0.4;
    this.maxSizeInteger = 2;
    this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize;

    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;

    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) this.isShimmer = true;

    if (this.isShimmer) this.shimmer();
    else this.size += this.sizeStep;

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }

    this.size -= 0.12;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;

    if (this.isReverse) this.size -= this.speed;
    else this.size += this.speed;
  }
}

function getEffectiveSpeed(value, reducedMotion) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = parseInt(value, 10);

  if (parsed <= min || reducedMotion) return min;
  if (parsed >= max) return max * throttle;
  return parsed * throttle;
}

/**
 * ✅ PixelCard (Design + Pixel Hover)
 * - Works inside your current section
 * - Hover triggers pixel animation on canvas
 */
export default function PixelCard({
  className = "",
  children,
  // pixel tuning
  gap = 6,
  speed = 32,
  colors = `${BRAND.c2},${BRAND.c4},${BRAND.c3},${BRAND.c3},${BRAND.c1},#E6FBFF`,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePreviousRef = useRef(performance.now());

  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const initPixels = () => {
    if (!containerRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const colorsArray = colors.split(",");
    const pxs = [];

    for (let x = 0; x < width; x += parseInt(gap, 10)) {
      for (let y = 0; y < height; y += parseInt(gap, 10)) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

        // center out delay (nice bloom)
        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;

        pxs.push(
          new Pixel(
            canvasRef.current,
            ctx,
            x,
            y,
            color,
            getEffectiveSpeed(speed, reducedMotion),
            delay
          )
        );
      }
    }

    pixelsRef.current = pxs;
  };

  const doAnimate = (fnName) => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));

    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;
    if (timePassed < timeInterval) return;

    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const p = pixelsRef.current[i];
      p[fnName]();
      if (!p.isIdle) allIdle = false;
    }

    if (allIdle) cancelAnimationFrame(animationRef.current);
  };

  const handleAnimation = (name) => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => doAnimate(name));
  };

  const onMouseEnter = () => handleAnimation("appear");
  const onMouseLeave = () => handleAnimation("disappear");

  useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(() => initPixels());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gap, speed, colors]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative h-full group cursor-pointer ${className}`}
    >
      {/* ✅ Pixel border (animated gradient ring like your design) */}
      <div className="absolute -inset-[2px] rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, ${BRAND.c4}, ${BRAND.c1}, ${BRAND.c2}, ${BRAND.c4})`,
            backgroundSize: "200% 200%",
            animation: "gradientShift 3s ease infinite",
          }}
        />
      </div>

      {/* ✅ Main card */}
      <div
        className="
          relative h-full rounded-3xl overflow-hidden
          border border-slate-700/50
          bg-gradient-to-br from-slate-800 to-slate-950
          backdrop-blur-xl
          shadow-[0_30px_90px_rgba(0,0,0,0.55)]
        "
      >
        {/* ✅ REAL pixel canvas overlay */}
        <canvas
          ref={canvasRef}
          className="
            absolute inset-0
            opacity-0 group-hover:opacity-40
            transition-opacity duration-500
            pointer-events-none
          "
        />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-700" />

        {/* Pixel grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, ${BRAND.c1}40 25%, ${BRAND.c1}40 26%, transparent 27%, transparent 74%, ${BRAND.c1}40 75%, ${BRAND.c1}40 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, ${BRAND.c1}40 25%, ${BRAND.c1}40 26%, transparent 27%, transparent 74%, ${BRAND.c1}40 75%, ${BRAND.c1}40 76%, transparent 77%, transparent)
              `,
              backgroundSize: "8px 8px",
            }}
          />
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-[40px]" />

        {/* Shine effect on hover */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="
              absolute inset-0
              bg-gradient-to-br from-transparent via-white/10 to-transparent
              rotate-45
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
            style={{
              width: "200%",
              height: "200%",
              transform: "translate(-60%, -60%) rotate(45deg)",
            }}
          />
          <div
            className="
              absolute inset-0
              bg-gradient-to-br from-transparent via-white/10 to-transparent
              rotate-45
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              animate-[shineMove_850ms_ease_forwards]
            "
            style={{
              width: "200%",
              height: "200%",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative p-8 sm:p-10">{children}</div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/55 transition-all duration-700" />
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shineMove {
          0% { transform: translate(-80%, -80%) rotate(45deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(40%, 40%) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
