import { useEffect, useRef, useState } from "react";

/**
 * ParticleTextMini.jsx
 * Compact particle text for footer area.
 * - Smaller height (default ~160px)
 * - Lower particle count (bigger gap)
 * - Pauses when not visible (IntersectionObserver)
 * - Optional transparent background (default transparent)
 */

export default function ParticleTextMini({
  text = "DIgtel",
  height = 160,                   // pixels tall (good for “below footer”)
  fontFamily = "900 96px Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  particleGap = 7,                // larger gap = fewer particles
  particleSize = [1, 1.0],        // smaller dots for compact UI
  spring = 0.08,
  friction = 0.86,
  hoverForce = 90,
  hoverRadius = 100,
  shatterPower = 10,
  shatterDuration = 1200,
  bg = null,                      // null = transparent canvas; set to a color to fill
  particleColor = "rgba(255,255,255,0.95)",
  linkLine = true,
  linkDistance = 18,
  className = "",                 // extra classes for outer wrapper
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, down: false });
  const shatteredRef = useRef(false);
  const reassembleTimeoutRef = useRef(null);
  const playingRef = useRef(true); // toggled by IntersectionObserver

  const rand = (min, max) => Math.random() * (max - min) + min;

  const buildParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;
    canvas.width = vw;
    canvas.height = vh;

    // Offscreen canvas to rasterize text, width constrained to area
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");

    const targetWidth = Math.min(vw * 0.9, 900);
    const baseFontSize = Math.max(48, Math.min(120, targetWidth / 5.2));
    off.width = Math.ceil(targetWidth);
    off.height = Math.ceil(baseFontSize * 1.5);
    offCtx.clearRect(0, 0, off.width, off.height);

    offCtx.fillStyle = "#fff";
    offCtx.font = fontFamily.replace(/\d+px/, `${baseFontSize}px`);
    offCtx.textBaseline = "middle";
    offCtx.textAlign = "center";

    const tx = off.width / 2;
    const ty = off.height / 2 + baseFontSize * 0.06;
    offCtx.fillText(text, tx, ty);

    const img = offCtx.getImageData(0, 0, off.width, off.height);
    const data = img.data;

    const points = [];
    for (let y = 0; y < off.height; y += particleGap) {
      for (let x = 0; x < off.width; x += particleGap) {
        const idx = (y * off.width + x) * 4;
        if (data[idx + 3] > 128) points.push({ x, y });
      }
    }

    const offsetX = (vw - off.width) / 2;
    const offsetY = (vh - off.height) / 2;

    const particles = points.map((p) => ({
      x: rand(0, vw),
      y: rand(0, vh),
      vx: 0,
      vy: 0,
      tx: p.x + offsetX,
      ty: p.y + offsetY,
      r: rand(particleSize[0], particleSize[1]),
    }));

    particlesRef.current = particles;
  };

  // Animation loop (pauses when not visible)
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!playingRef.current) return;

      const W = canvas.width;
      const H = canvas.height;
      if (bg == null) {
        ctx.clearRect(0, 0, W, H); // transparent
      } else {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);
      }

      const parts = particlesRef.current;
      const mouse = mouseRef.current;

      if (linkLine) {
        ctx.lineWidth = 0.35;
        ctx.strokeStyle = "rgba(255,255,255,0.16)";
      }

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];

        if (!shatteredRef.current) {
          const ax = (p.tx - p.x) * spring;
          const ay = (p.ty - p.y) * spring;
          p.vx = (p.vx + ax) * friction;
          p.vy = (p.vy + ay) * friction;

          if (mouse.x != null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < hoverRadius * hoverRadius) {
              const d = Math.sqrt(d2) || 1;
              const f = (1 - d / hoverRadius) * (hoverForce / 1000);
              p.vx += (dx / d) * f * 2;
              p.vy += (dy / d) * f * 2;
            }
          }
        } else {
          p.vx *= 0.985;
          p.vy = p.vy * 0.985 + 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        if (linkLine && i % 10 === 0) {
          for (let j = i + 1; j < parts.length; j += 10) {
            const q = parts[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDistance * linkDistance) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mounted, bg, particleColor, linkLine, linkDistance, spring, friction, hoverForce, hoverRadius]);

  // Events, resize, and visibility pause
  useEffect(() => {
    setMounted(true);
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;

    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      buildParticles();
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      shatteredRef.current = true;
      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy) || 1;
        const nx = dx / d;
        const ny = dy / d;
        const power = shatterPower * (1 + Math.random());
        p.vx = nx * power + (Math.random() - 0.5) * 1.6;
        p.vy = ny * power + (Math.random() - 0.5) * 1.6;
      }
      if (reassembleTimeoutRef.current) clearTimeout(reassembleTimeoutRef.current);
      reassembleTimeoutRef.current = setTimeout(() => {
        shatteredRef.current = false;
      }, shatterDuration);
    };

    // Pause when not visible
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          playingRef.current = entry.isIntersecting;
        }
      },
      { root: null, threshold: 0.05 }
    );
    io.observe(wrap);

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    // initial
    handleResize();

    return () => {
      io.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
      if (reassembleTimeoutRef.current) clearTimeout(reassembleTimeoutRef.current);
    };
  }, [text, fontFamily, particleGap, shatterPower, shatterDuration]);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full bg-black ${className}`}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
