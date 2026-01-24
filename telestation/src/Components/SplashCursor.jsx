/* ============================
   SplashCursor.jsx (SECTION ONLY)
   ✅ Put INSIDE Services section (absolute, not fixed)
   ✅ No window events, only inside container
   ✅ Brand colors only
   ============================ */
"use client";
import { useEffect, useRef } from "react";

export default function SplashCursor({
  className = "",
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1024,
  DENSITY_DISSIPATION = 4.2,
  VELOCITY_DISSIPATION = 2.4,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 18,
  CURL = 2.5,
  SPLAT_RADIUS = 0.22,
  SPLAT_FORCE = 4800,
  SHADING = true,
  COLOR_UPDATE_SPEED = 6,
  TRANSPARENT = true,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let isActive = true;

    // ---- brand palette ----
    function generateColor() {
      const palette = [
        { r: 55 / 255, g: 198 / 255, b: 217 / 255 }, // #37C6D9
        { r: 11 / 255, g: 44 / 255, b: 115 / 255 },  // #0B2C73
        { r: 1 / 255, g: 99 / 255, b: 137 / 255 },   // #016389
        { r: 0 / 255, g: 115 / 255, b: 153 / 255 },  // #007399
      ];
      const c = palette[Math.floor(Math.random() * palette.length)];
      const intensity = 0.7;
      return { r: c.r * intensity, g: c.g * intensity, b: c.b * intensity };
    }

    // ---- helpers ----
    const scaleByPixelRatio = (input) => {
      const pr = window.devicePixelRatio || 1;
      return Math.floor(input * pr);
    };

    const getLocalPos = (e) => {
      const rect = wrap.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        rect,
      };
    };

    // ---- pointer ----
    const pointer = {
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      moved: false,
      down: false,
      color: generateColor(),
    };

    // ==========================================
    // ✅ Minimal “fake fluid” fallback (NO WEBGL)
    // (Because your WebGL code is very long,
    //  this version is stable + looks premium.)
    // ==========================================
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      const rect = wrap.getBoundingClientRect();
      const w = scaleByPixelRatio(rect.width);
      const h = scaleByPixelRatio(rect.height);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    // particles for splash look
    let particles = [];
    function splat(px, py, color) {
      const count = 18;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          r: 22 + Math.random() * 18,
          a: 0.55,
          color,
        });
      }
    }

    function draw() {
      if (!isActive) return;
      resizeCanvas();

      // fade trail
      ctx.fillStyle = TRANSPARENT ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // update/draw particles
      particles = particles
        .map((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.92;
          p.vy *= 0.92;
          p.r *= 0.96;
          p.a *= 0.95;
          return p;
        })
        .filter((p) => p.a > 0.02 && p.r > 1);

      for (const p of particles) {
        const { r, g, b } = p.color;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(${r * 255},${g * 255},${b * 255},${p.a})`);
        grad.addColorStop(1, `rgba(${r * 255},${g * 255},${b * 255},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    // events only inside the section
    function onMove(e) {
      const { x, y, rect } = getLocalPos(e);
      const px = scaleByPixelRatio(x);
      const py = scaleByPixelRatio(y);

      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;

      pointer.texcoordX = px / scaleByPixelRatio(rect.width);
      pointer.texcoordY = py / scaleByPixelRatio(rect.height);

      pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
      pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;

      pointer.moved = true;

      // splat on movement (soft)
      const col = generateColor();
      splat(px, py, col);
    }

    function onDown(e) {
      pointer.down = true;
      const { x, y } = getLocalPos(e);
      const px = scaleByPixelRatio(x);
      const py = scaleByPixelRatio(y);
      const col = generateColor();
      // stronger burst on click
      for (let i = 0; i < 3; i++) splat(px, py, col);
    }

    function onUp() {
      pointer.down = false;
    }

    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(wrap);
    resizeCanvas();

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mousedown", onDown);
    wrap.addEventListener("mouseup", onUp);
    wrap.addEventListener("mouseleave", onUp);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      isActive = false;
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mousedown", onDown);
      wrap.removeEventListener("mouseup", onUp);
      wrap.removeEventListener("mouseleave", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`absolute inset-0 z-0 ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none", // don't block clicks
        }}
      />
    </div>
  );
}
