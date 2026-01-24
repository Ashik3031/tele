import { useEffect, useRef, useState } from "react";

/**
 * FlatSquaresWalls.jsx — (NOW: Circles + Brand Palette)
 * - Same physics
 * - Draws gradient circles instead of squares
 * - Uses your palette: #6EF1F7, #1353CD, #007399
 */

export default function FlatSquaresWalls({
  count = 420,
  binHeightRatio = 0.35,
  size = [8, 14],
  padding = 2.0,

  bg = "#0b0b0c",
  stroke = false,

  gravity = 0.28,
  airDrag = 0.012,
  restitution = 0.22,
  floorFriction = 0.14,
  staticFrictionThresh = 0.18,

  repelRadius = 140,
  repelStrength = 1.0,
  speedBoost = 2.2,
  upwardBias = 0.35,

  sleepVel2 = 0.003,
  sleepFrames = 28,

  separationIterations = 3,
  preRelaxIterations = 4,
  sleepSeparationEpsilon = 0.35,

  enableClickShatter = true,
  shatterPower = 0.9,
  maxDt = 24,

  // ✅ NEW: brand palette
  palette = ["#6EF1F7", "#1353CD", "#007399"],
}) {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const partsRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, vx: 0, vy: 0, speed: 0, t: 0 });
  const binRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const boundsRef = useRef({ L: 0, R: 0, F: 0 });
  const timeRef = useRef({ last: 0 });

  const rand = (a, b) => Math.random() * (b - a) + a;
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];

  // tiny hex lighten/darken helper (for circle gradient)
  const shadeHex = (hex, amt) => {
    const h = hex.replace("#", "").trim();
    const num = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;
    r = Math.max(0, Math.min(255, r + amt));
    g = Math.max(0, Math.min(255, g + amt));
    b = Math.max(0, Math.min(255, b + amt));
    return `rgb(${r},${g},${b})`;
  };

  const init = () => {
    const canvas = canvasRef.current;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const binH = Math.max(120, H * binHeightRatio);
    const binY = H - binH;
    binRef.current = { x: 0, y: binY, w: W, h: binH };

    boundsRef.current = { L: 0, R: W, F: binY + binH };

    const arr = [];
    for (let i = 0; i < count; i++) {
      const s = Math.round(rand(size[0], size[1])); // diameter basis
      const half = s * 0.5;
      const x = rand(half + padding, W - half - padding);
      const y = rand(half + padding, H - half - padding);

      const base = pick(palette);
      arr.push({
        x,
        y,
        s,
        r: s * 0.5,         // ✅ radius
        vx: 0,
        vy: 0,
        sleep: false,
        sleepTick: 0,
        baseColor: base,    // ✅ per particle color
      });
    }

    for (let k = 0; k < preRelaxIterations; k++) separate(arr, { allowSleepResolve: true });

    partsRef.current = arr;
  };

  // Separation uses circle distance (already what you do) – perfect for circles ✅
  function separate(arr, options = {}) {
    const { allowSleepResolve = false } = options;
    const maxS = size[1];
    const cell = Math.max(maxS + padding, 20);
    const grid = new Map();
    const key = (ix, iy) => ix + "," + iy;
    const { L, R } = boundsRef.current;
    const { y: by, h: bh } = binRef.current;

    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const ix = (p.x / cell) | 0;
      const iy = (p.y / cell) | 0;
      const k = key(ix, iy);
      let b = grid.get(k);
      if (!b) {
        b = [];
        grid.set(k, b);
      }
      b.push(i);
    }

    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const ix = (p.x / cell) | 0;
      const iy = (p.y / cell) | 0;

      for (let gx = ix - 1; gx <= ix + 1; gx++) {
        for (let gy = iy - 1; gy <= iy + 1; gy++) {
          const bkt = grid.get(key(gx, gy));
          if (!bkt) continue;

          for (const j of bkt) {
            if (j <= i) continue;
            const q = arr[j];

            const minDist = (p.s + q.s) * 0.5 + padding;
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const d2 = dx * dx + dy * dy;

            if (d2 > 0 && d2 < minDist * minDist) {
              const d = Math.sqrt(d2) || 1;
              const pen = minDist - d;
              if (!(allowSleepResolve || pen > sleepSeparationEpsilon) && p.sleep && q.sleep) continue;

              const ux = dx / d,
                uy = dy / d;

              const mvP = Math.abs(p.vx) + Math.abs(p.vy);
              const mvQ = Math.abs(q.vx) + Math.abs(q.vy);
              const total = mvP + mvQ;
              const a = total > 0 ? mvQ / total : 0.5;

              p.x -= ux * pen * a;
              p.y -= uy * pen * a;
              q.x += ux * pen * (1 - a);
              q.y += uy * pen * (1 - a);

              const halfP = p.s * 0.5;
              p.x = Math.max(L + halfP, Math.min(R - halfP, p.x));
              const floorP = by + bh - halfP;
              if (p.y > floorP) p.y = floorP;

              const halfQ = q.s * 0.5;
              q.x = Math.max(L + halfQ, Math.min(R - halfQ, q.x));
              const floorQ = by + bh - halfQ;
              if (q.y > floorQ) q.y = floorQ;

              p.vx *= 0.992;
              p.vy *= 0.992;
              q.vx *= 0.992;
              q.vy *= 0.992;
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const step = (now) => {
      const last = timeRef.current.last || now;
      let dt = Math.min(maxDt, now - last);
      timeRef.current.last = now;
      const tScale = dt / (1000 / 60);

      const W = canvas.width;
      const H = canvas.height;
      const { y: by, h: bh } = binRef.current;
      const { L, R, F } = boundsRef.current;

      // background
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // walls + floor
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(L, F);
      ctx.lineTo(R, F);
      ctx.moveTo(L, by);
      ctx.lineTo(L, F);
      ctx.moveTo(R, by);
      ctx.lineTo(R, F);
      ctx.stroke();

      const arr = partsRef.current;
      const m = mouseRef.current;

      for (const p of arr) {
        if (m.x != null) {
          const dx = p.x - m.x,
            dy = p.y - m.y;
          if (dx * dx + dy * dy < (repelRadius * repelRadius) * 1.05) {
            p.sleep = false;
            p.sleepTick = 0;
          }
        }

        if (!p.sleep) {
          p.vy += gravity * tScale;
          p.vx -= p.vx * airDrag * tScale;
          p.vy -= p.vy * airDrag * tScale;

          if (m.x != null) {
            const dx = p.x - m.x,
              dy = p.y - m.y;
            const d2 = dx * dx + dy * dy;
            const Rm = repelRadius + Math.min(280, m.speed * 110);
            if (d2 < Rm * Rm) {
              const d = Math.sqrt(d2) || 1;
              const nx = dx / d,
                ny = dy / d - upwardBias;
              const imp =
                (1 - d / Rm) * (repelStrength + m.speed * speedBoost) * 0.55 * tScale;
              p.vx += nx * imp;
              p.vy += ny * imp;
            }
          }

          p.x += p.vx * tScale;
          p.y += p.vy * tScale;

          const half = p.s * 0.5;
          if (p.x < L + half) {
            p.x = L + half;
            p.vx = -p.vx * restitution;
          }
          if (p.x > R - half) {
            p.x = R - half;
            p.vx = -p.vx * restitution;
          }

          const floorY = by + bh - half;
          if (p.y > floorY) {
            p.y = floorY;
            p.vy = -p.vy * restitution;

            if (Math.abs(p.vx) > staticFrictionThresh) {
              const sgn = Math.sign(p.vx);
              p.vx -= sgn * floorFriction * tScale;
              if (Math.sign(p.vx) !== sgn) p.vx = 0;
            } else {
              p.vx = 0;
            }
          }

          const onFloor = p.y >= by + bh - half - 0.5;
          const v2 = p.vx * p.vx + p.vy * p.vy;
          if (onFloor && v2 < sleepVel2) {
            p.sleepTick++;
            if (p.sleepTick >= sleepFrames) {
              p.sleep = true;
              p.vx = 0;
              p.vy = 0;
            }
          } else p.sleepTick = 0;
        }
      }

      const activeRatio = arr.reduce((n, p) => n + (p.sleep ? 0 : 1), 0) / arr.length;
      const passes =
        activeRatio > 0.08 ? separationIterations : Math.max(1, Math.floor(separationIterations / 2));
      for (let k = 0; k < passes; k++) separate(arr, { allowSleepResolve: true });

      // ✅ DRAW: gradient circles
      for (const p of arr) {
        const r = p.r;

        if (stroke) {
          ctx.strokeStyle = p.baseColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // soft radial gradient per circle
          const g = ctx.createRadialGradient(
            p.x - r * 0.35,
            p.y - r * 0.35,
            r * 0.2,
            p.x,
            p.y,
            r
          );

          g.addColorStop(0, shadeHex(p.baseColor, 55));  // highlight
          g.addColorStop(0.55, p.baseColor);             // base
          g.addColorStop(1, shadeHex(p.baseColor, -40)); // shadow

          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    return () => {};
  }, [
    mounted,
    bg,
    gravity,
    airDrag,
    restitution,
    floorFriction,
    staticFrictionThresh,
    repelRadius,
    repelStrength,
    speedBoost,
    upwardBias,
    sleepVel2,
    sleepFrames,
    padding,
    separationIterations,
    preRelaxIterations,
    sleepSeparationEpsilon,
    maxDt,
    palette,
    stroke,
  ]);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;

    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      init();
    };

    const onMove = (e) => {
      const now = performance.now();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
        mouseRef.current.speed = 0;
        mouseRef.current.t = now;
        return;
      }

      const m = mouseRef.current;
      if (m.t) {
        const dt = Math.max(1, now - m.t);
        const vx = (x - m.x) / dt;
        const vy = (y - m.y) / dt;
        const speed = Math.min(4.0, Math.hypot(vx, vy));
        m.vx = vx;
        m.vy = vy;
        m.speed = speed;
      }
      m.x = x;
      m.y = y;
      m.t = now;
    };

    const onLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
      mouseRef.current.speed = 0;
    };

    const onClick = (e) => {
      if (!enableClickShatter) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const m = mouseRef.current;
      const arr = partsRef.current;

      for (const p of arr) {
        const dx = p.x - mx,
          dy = p.y - my;
        const d = Math.hypot(dx, dy) || 1;
        const nx = dx / d,
          ny = dy / d - upwardBias;
        const impulse = (shatterPower * (1 / (0.4 + d * 0.01))) * (1 + m.speed * speedBoost);
        p.vx += nx * impulse;
        p.vy += ny * impulse;
        p.sleep = false;
        p.sleepTick = 0;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [count, binHeightRatio, size, enableClickShatter, palette]);

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
