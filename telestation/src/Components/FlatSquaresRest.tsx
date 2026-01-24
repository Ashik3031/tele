import { useEffect, useRef, useState } from "react";

/**
 * FlatSquaresRest.jsx — "No-Touch" (Floor-only, no side walls)
 *
 * 2D squares with dry physics that REST when idle.
 * Changes in this version:
 *  - Left & right walls removed (open horizontally)
 *  - Only a FLOOR remains
 *  - Strong multi-pass separation keeps a small gap (no touching)
 */

export default function FlatSquaresRest({
  count = 420,
  binHeightRatio = 0.3,       // height of the floor "zone" from bottom
  size = [8, 14],             // square edge range
  padding = 2.0,              // minimum gap between squares (px)

  bg = "#000",
  color = "#ffffff",
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

  // Sleep — stops flicker at rest
  sleepVel2 = 0.003,
  sleepFrames = 28,

  // Separation control
  separationIterations = 3,   // passes per frame
  preRelaxIterations = 4,     // passes at spawn to resolve overlaps
  sleepSeparationEpsilon = 0.35,

  enableClickShatter = true,
  shatterPower = 0.9,
  maxDt = 24,
}) {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const partsRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, vx: 0, vy: 0, speed: 0, t: 0 });
  const binRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const timeRef = useRef({ last: 0 });

  const rand = (a, b) => Math.random() * (b - a) + a;

  const init = () => {
    const canvas = canvasRef.current;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const binH = Math.max(120, H * binHeightRatio);
    const binY = H - binH;
    const binX = 0;          // no side walls → span full width
    const binW = W;
    binRef.current = { x: binX, y: binY, w: binW, h: binH };

    const arr = [];
    for (let i = 0; i < count; i++) {
      const s = Math.round(rand(size[0], size[1]));
      // spawn across full width; within floor zone vertically
      const x = rand(s, W - s);
      const y = rand(binY + s, binY + binH - s);
      arr.push({ x, y, s, vx: 0, vy: 0, sleep: false, sleepTick: 0 });
    }

    // pre-relax to remove initial overlaps without adding energy
    for (let k = 0; k < preRelaxIterations; k++) separate(arr, { allowSleepResolve: true });

    partsRef.current = arr;
  };

  // Multi-pass stable separation using a spatial hash.
  function separate(arr, options = {}) {
    const { allowSleepResolve = false } = options;
    const maxS = size[1];
    const cell = Math.max(maxS + padding, 20);
    const grid = new Map();
    const key = (ix, iy) => ix + "," + iy;
    const { x: bx, y: by, w: bw, h: bh } = binRef.current;

    // build grid
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const ix = (p.x / cell) | 0;
      const iy = (p.y / cell) | 0;
      const k = key(ix, iy);
      let bkt = grid.get(k); if (!bkt) { bkt = []; grid.set(k, bkt); }
      bkt.push(i);
    }

    // resolve
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

            // circle-approx separation for AABBs (cheap & stable)
            const minDist = (p.s + q.s) * 0.5 + padding;
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > 0 && d2 < minDist * minDist) {
              const d = Math.sqrt(d2) || 1;
              const pen = minDist - d;
              if (!(allowSleepResolve || pen > sleepSeparationEpsilon) && p.sleep && q.sleep) continue;

              const ux = dx / d, uy = dy / d;
              const mvP = Math.abs(p.vx) + Math.abs(p.vy);
              const mvQ = Math.abs(q.vx) + Math.abs(q.vy);
              const total = mvP + mvQ;
              const a = total > 0 ? mvQ / total : 0.5;

              p.x -= ux * pen * a; p.y -= uy * pen * a;
              q.x += ux * pen * (1 - a); q.y += uy * pen * (1 - a);

              // floor clamp only (no side walls)
              const halfP = p.s * 0.5, halfQ = q.s * 0.5;
              const F = by + bh - halfP;
              if (p.y > F) p.y = F;
              const F2 = by + bh - halfQ;
              if (q.y > F2) q.y = F2;

              p.vx *= 0.992; p.vy *= 0.992; q.vx *= 0.992; q.vy *= 0.992;
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
      const { x: bx, y: by, w: bw, h: bh } = binRef.current;

      // scene — draw only the floor line
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, by + bh); ctx.lineTo(W, by + bh); ctx.stroke();

      const arr = partsRef.current;
      const m = mouseRef.current;

      for (const p of arr) {
        // wake on proximity
        if (m.x != null) {
          const dx = p.x - m.x, dy = p.y - m.y;
          if (dx * dx + dy * dy < (repelRadius * repelRadius) * 1.05) { p.sleep = false; p.sleepTick = 0; }
        }

        if (!p.sleep) {
          // physics
          p.vy += gravity * tScale;
          p.vx -= p.vx * airDrag * tScale;
          p.vy -= p.vy * airDrag * tScale;

          if (m.x != null) {
            const dx = p.x - m.x, dy = p.y - m.y;
            const d2 = dx * dx + dy * dy;
            const R = repelRadius + Math.min(280, m.speed * 110);
            if (d2 < R * R) {
              const d = Math.sqrt(d2) || 1;
              const nx = dx / d, ny = dy / d - upwardBias;
              const imp = (1 - d / R) * (repelStrength + m.speed * speedBoost) * 0.55 * tScale;
              p.vx += nx * imp; p.vy += ny * imp;
            }
          }

          // integrate
          p.x += p.vx * tScale; p.y += p.vy * tScale;

          // FLOOR ONLY collision
          const half = p.s * 0.5;
          const F = by + bh - half;
          if (p.y > F) {
            p.y = F; p.vy = -p.vy * restitution;
            // horizontal floor friction
            if (Math.abs(p.vx) > staticFrictionThresh) {
              const sgn = Math.sign(p.vx);
              p.vx -= sgn * floorFriction * tScale;
              if (Math.sign(p.vx) !== sgn) p.vx = 0;
            } else {
              p.vx = 0;
            }
          }

          // sleep test (only when on/near floor)
          const onFloor = p.y >= by + bh - half - 0.5;
          const v2 = p.vx * p.vx + p.vy * p.vy;
          if (onFloor && v2 < sleepVel2) {
            p.sleepTick++;
            if (p.sleepTick >= sleepFrames) { p.sleep = true; p.vx = 0; p.vy = 0; }
          } else p.sleepTick = 0;
        }
      }

      // multi-pass separation to guarantee gap
      const activeRatio = arr.reduce((n, p) => n + (p.sleep ? 0 : 1), 0) / arr.length;
      const passes = activeRatio > 0.08 ? separationIterations : Math.max(1, Math.floor(separationIterations / 2));
      for (let k = 0; k < passes; k++) separate(arr, { allowSleepResolve: true });

      // draw (pixel-snap)
      if (stroke) {
        ctx.strokeStyle = color;
        for (const p of arr) {
          const x = Math.round(p.x - p.s * 0.5);
          const y = Math.round(p.y - p.s * 0.5);
          ctx.strokeRect(x, y, p.s, p.s);
        }
      } else {
        ctx.fillStyle = color;
        for (const p of arr) {
          const x = Math.round(p.x - p.s * 0.5);
          const y = Math.round(p.y - p.s * 0.5);
          ctx.fillRect(x, y, p.s, p.s);
        }
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    return () => { /* stop on unmount */ };
  }, [mounted, bg, color, gravity, airDrag, restitution, floorFriction, staticFrictionThresh, repelRadius, repelStrength, speedBoost, upwardBias, sleepVel2, sleepFrames, padding, separationIterations, preRelaxIterations, sleepSeparationEpsilon, maxDt]);

  // events & responsive
  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;

    const handleResize = () => { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; init(); };

    const onMove = (e) => {
      const now = performance.now();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const m = mouseRef.current;
      if (m.t) {
        const dt = Math.max(1, now - m.t); const vx = (x - m.x) / dt; const vy = (y - m.y) / dt;
        const speed = Math.min(4.0, Math.hypot(vx, vy)); m.vx = vx; m.vy = vy; m.speed = speed;
      }
      m.x = x; m.y = y; m.t = now;
    };

    const onLeave = () => { mouseRef.current.x = null; mouseRef.current.y = null; mouseRef.current.speed = 0; };

    const onClick = (e) => {
      if (!enableClickShatter) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
      const m = mouseRef.current; const arr = partsRef.current;
      for (const p of arr) {
        const dx = p.x - mx, dy = p.y - my; const d = Math.hypot(dx, dy) || 1;
        const nx = dx / d, ny = dy / d - upwardBias;
        const impulse = (shatterPower * (1 / (0.4 + d * 0.01))) * (1 + m.speed * speedBoost);
        p.vx += nx * impulse; p.vy += ny * impulse; p.sleep = false; p.sleepTick = 0;
      }
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [count, binHeightRatio, size, enableClickShatter]);

  return (
    <div className="w-full h-full bg-black relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// Demo
export function Demo() {
  return (
    <div className="w-screen h-screen bg-black">
         <section className="relative min-h-screen w-full bg-[#0b0b0c] text-white">
            {/* Background simulation */}
            <div className="absolute inset-0 -z-10">
              <FlatSquaresWalls
                count={380}
                binHeightRatio={0.42}
                size={[8, 14]}
                padding={2}
                bg="#0b0b0c"
                color="rgba(255,255,255,0.75)"
                stroke={false}
                gravity={0.32}
                airDrag={0.014}
                restitution={0.2}
                floorFriction={0.16}
                staticFrictionThresh={0.18}
                repelRadius={140}
                repelStrength={1}
                speedBoost={2.2}
                upwardBias={0.35}
              />
              {/* Soft corner vignettes */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(75%_60%_at_0%_0%,rgba(255,255,255,0.05),transparent_60%)]" />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(75%_60%_at_100%_0%,rgba(255,255,255,0.04),transparent_60%)]" />
            </div>
      
            {/* Content */}
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
              <div className="grid gap-10 md:grid-cols-5">
                {/* Left intro */}
                <div className="md:col-span-2">
                  <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-wide">
                    Let’s talk about your growth
                  </h1>
                  <p className="mt-4 text-zinc-300/90">
                    Tell us what you’re building and we’ll get back within one business day.
                    For urgent queries, ping us on WhatsApp.
                  </p>
      
                 <div className="mt-6 space-y-3 text-zinc-400">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <span className="mt-[2px]">✉️</span>
                  <a href="mailto:info@digtel.ae" className="hover:text-white transition">
                    info@digtel.ae
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <span className="mt-[2px]">📞</span>
                  <a href="tel:+971503535409" className="hover:text-white transition">
                    +971 50 353 5409
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <span className="mt-[2px]">📍</span>
                  <div className="leading-relaxed">
                    <p>City Bay Business Center</p>
                    <p>Office No 523 | Abu Hail</p>
                    <p>Road Deira – Dubai</p>
                  </div>
                </div>
              </div>

                </div>
      
                {/* Form card */}
                <div className="md:col-span-3">
                  <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)]">
                    <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-white/6 to-transparent opacity-60" />
                    <form
                      className="relative space-y-5"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const data = Object.fromEntries(new FormData(e.currentTarget).entries());
                        console.log("Contact form:", data);
                        alert("Thanks! We’ll get back to you shortly.");
                        e.currentTarget.reset();
                      }}
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Name">
                          <input name="name" required className="input" placeholder="Jane Doe" />
                        </Field>
                        <Field label="Email">
                          <input name="email" type="email" required className="input" placeholder="jane@company.com" />
                        </Field>
                      </div>
      
                      <Field label="Company">
                        <input name="company" className="input" placeholder="Acme Inc." />
                      </Field>
      
                      <Field label="Message">
                        <textarea name="message" required rows={5} className="input resize-none" placeholder="Tell us about your project..." />
                      </Field>
      
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="group relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold tracking-wide"
                        >
                          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-white/15 via-white/10 to-white/15 blur-xl opacity-70 group-hover:opacity-90 transition" />
                          <span className="relative rounded-xl bg-white/10 ring-1 ring-white/15 px-6 py-3">
                            Send message
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
      
              {/* Bottom note */}
              <p className="mt-10 text-center text-sm text-zinc-500">
                Squares are interactive — move your cursor to scatter them ✨
              </p>
            </div>
          </section>
      <FlatSquaresRest />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm pointer-events-none">
        Floor only. Rest-on-idle. Tiny gaps so squares never touch.
      </div>
    </div>
  );
}
