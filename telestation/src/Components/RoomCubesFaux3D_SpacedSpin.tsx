import { useEffect, useRef, useState } from "react";

/**
 * RoomCubesFaux3D_SpacedSpin.jsx
 *
 * Faux-3D cube particles in an open-top bin with DRY physics + extras:
 * - Small spacing between particles (separation via spatial hash)
 * - Click "shatter": cubes get linear impulse + angular spin based on cursor speed
 * - On floor they slide & roll; spin decays via angular damping
 */

export default function RoomCubesFaux3D_SpacedSpin({
  count = 360,
  binHeightRatio = 0.32,
  size = [12, 20],        // cube edge range (screen-space, before perspective)
  padding = 2.0,          // extra separation between cubes

  depth = 240,            // z range (-depth..depth) for perspective/parallax
  perspectiveScale = 0.0016,
  baseColor = "#A0C4FF",
  faceContrast = 0.55,
  bg = "#000",

  gravity = 0.24,
  airDrag = 0.01,
  restitution = 0.28,
  floorFriction = 0.12,
  staticFrictionThresh = 0.22,

  repelRadius = 150,
  repelStrength = 1.2,
  speedBoost = 2.8,
  upwardBias = 0.4,

  shatterPower = 1.0,     // base click blast
  spinFactor = 1.6,       // how much spin is generated on shatter
  angularDamping = 0.012, // per-frame angular velocity decay
  rollToSlide = 0.22,     // convert spin to horizontal slide when on floor

  maxDt = 24,
}) {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const partsRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, vx: 0, vy: 0, speed: 0, t: 0 });
  const binRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const timeRef = useRef({ last: 0 });

  const rand = (a, b) => Math.random() * (b - a) + a;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return { r: 160, g: 196, b: 255 };
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
  }
  const baseRGB = hexToRgb(baseColor);
  const shade = (rgb, f) => `rgb(${clamp(Math.round(rgb.r * f),0,255)},${clamp(Math.round(rgb.g * f),0,255)},${clamp(Math.round(rgb.b * f),0,255)})`;

  // build/open bin + spawn
  const init = () => {
    const canvas = canvasRef.current;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const binH = Math.max(120, H * binHeightRatio);
    const binY = H - binH;
    const binX = Math.floor(W * 0.08);
    const binW = Math.floor(W * 0.84);
    binRef.current = { x: binX, y: binY, w: binW, h: binH };

    const arr = [];
    for (let i = 0; i < count; i++) {
      const s = rand(size[0], size[1]);
      const x = rand(binX + s, binX + binW - s);
      const y = rand(binY + s, binY + binH - s);
      const z = rand(-depth, depth);
      arr.push({
        x, y, z,
        vx: rand(-0.6, 0.6), vy: rand(-0.6, 0.6), vz: rand(-0.2, 0.2),
        s,
        theta: rand(0, Math.PI * 2), // rotation angle (radians)
        omega: rand(-0.02, 0.02),    // angular velocity
      });
    }
    partsRef.current = arr;
  };

  // spatial hash for separation
  function separate(arr) {
    const cell = Math.max(size[1] + padding, 22);
    const grid = new Map();
    const key = (ix, iy) => ix + "," + iy;

    // insert
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const ix = (p.x / cell) | 0;
      const iy = (p.y / cell) | 0;
      const k = key(ix, iy);
      (grid.get(k) || grid.set(k, [])).push(i);
    }

    // resolve overlaps (1 pass)
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const ix = (p.x / cell) | 0;
      const iy = (p.y / cell) | 0;
      for (let gx = ix - 1; gx <= ix + 1; gx++) {
        for (let gy = iy - 1; gy <= iy + 1; gy++) {
          const list = grid.get(key(gx, gy));
          if (!list) continue;
          for (const j of list) {
            if (j <= i) continue;
            const q = arr[j];
            const minDist = (p.s + q.s) * 0.5 + padding;
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > 0 && d2 < minDist * minDist) {
              const d = Math.sqrt(d2) || 1;
              const ux = dx / d, uy = dy / d;
              const push = (minDist - d) * 0.5;
              p.x -= ux * push; p.y -= uy * push;
              q.x += ux * push; q.y += uy * push;
              // damp velocities a touch when separating
              p.vx *= 0.98; p.vy *= 0.98;
              q.vx *= 0.98; q.vy *= 0.98;
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

    // draw helper — rotated faux-3D cube
    const drawCube = (sx, sy, s, theta, colors) => {
      const half = s * 0.5;
      const iso = s * 0.5; // top face vertical radius

      const cos = Math.cos(theta), sin = Math.sin(theta);
      // rotated basis vectors
      const ex = (dx, dy) => ({ x: dx * cos - dy * sin, y: dx * sin + dy * cos });

      // top diamond corners (rotated)
      const P0 = { x: sx + ex(0, -iso).x, y: sy + ex(0, -iso).y };
      const P1 = { x: sx + ex(half, 0).x, y: sy + ex(half, 0).y };
      const P2 = { x: sx + ex(0, iso).x, y: sy + ex(0, iso).y };
      const P3 = { x: sx + ex(-half, 0).x, y: sy + ex(-half, 0).y };

      // vertical extrusion vector (downwards in screen space)
      const Vd = { x: 0, y: s * 1.0 };

      // faces: top, right(P1..P2), left(P3..P2)
      ctx.fillStyle = colors.top;
      ctx.beginPath();
      ctx.moveTo(P0.x, P0.y);
      ctx.lineTo(P1.x, P1.y);
      ctx.lineTo(P2.x, P2.y);
      ctx.lineTo(P3.x, P3.y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = colors.right;
      ctx.beginPath();
      ctx.moveTo(P1.x, P1.y);
      ctx.lineTo(P2.x, P2.y);
      ctx.lineTo(P2.x + Vd.x, P2.y + Vd.y);
      ctx.lineTo(P1.x + Vd.x, P1.y + Vd.y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = colors.left;
      ctx.beginPath();
      ctx.moveTo(P3.x, P3.y);
      ctx.lineTo(P2.x, P2.y);
      ctx.lineTo(P2.x + Vd.x, P2.y + Vd.y);
      ctx.lineTo(P3.x + Vd.x, P3.y + Vd.y);
      ctx.closePath();
      ctx.fill();
    };

    const step = (now) => {
      const last = timeRef.current.last || now;
      let dt = Math.min(maxDt, now - last);
      timeRef.current.last = now;
      const tScale = dt / (1000 / 60);

      const W = canvas.width;
      const H = canvas.height;
      const { x: bx, y: by, w: bw, h: bh } = binRef.current;

      // background + open bin guides
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.lineWidth = 1;
      // left, right, floor
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + bw, by); ctx.lineTo(bx + bw, by + bh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.stroke();

      const arr = partsRef.current;
      const m = mouseRef.current;

      for (const p of arr) {
        // gravity & air drag
        p.vy += gravity * tScale;
        p.vx -= p.vx * airDrag * tScale;
        p.vy -= p.vy * airDrag * tScale;
        p.vz -= p.vz * airDrag * tScale;

        // cursor repel with upward bias
        if (m.x != null) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          const R = repelRadius + Math.min(320, m.speed * 120);
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const nx = dx / d;
            const ny = dy / d - upwardBias;
            const imp = (1 - d / R) * (repelStrength + m.speed * speedBoost) * 0.55 * tScale;
            p.vx += nx * imp;
            p.vy += ny * imp;
          }
        }

        // integrate linear
        p.x += p.vx * tScale;
        p.y += p.vy * tScale;
        p.z += p.vz * tScale;
        if (p.z < -depth) { p.z = -depth; p.vz *= -restitution; }
        if (p.z > depth)  { p.z = depth;  p.vz *= -restitution; }

        // walls/floor (open top)
        const half = p.s * 0.5;
        const L = bx + half;
        const Rw = bx + bw - half;
        const F = by + bh - half;
        if (p.x < L) { p.x = L; p.vx = -p.vx * restitution; }
        if (p.x > Rw){ p.x = Rw; p.vx = -p.vx * restitution; }
        if (p.y > F) {
          p.y = F; p.vy = -p.vy * restitution;
          // floor friction + rolling effect
          if (Math.abs(p.vx) > staticFrictionThresh) {
            const sgn = Math.sign(p.vx);
            p.vx -= sgn * floorFriction * tScale;
            if (Math.sign(p.vx) !== sgn) p.vx = 0;
          } else { p.vx = 0; }

          // convert spin to horizontal slide (rolling)
          p.vx += p.omega * p.s * rollToSlide * tScale;
        }

        // angular update
        p.theta += p.omega * tScale * 60; // scale to frame rate feel
        p.omega *= 1 - angularDamping;    // decay spin
      }

      // separation pass (after movement & wall constraints)
      separate(arr);

      // draw back-to-front by y+z for simple layering
      const order = arr.slice().sort((a,b) => (a.y - a.z*0.25) - (b.y - b.z*0.25));
      for (const p of order) {
        const pf = 1 + p.z * perspectiveScale;
        const sx = p.x;
        const sy = p.y - p.z * 0.25;
        const s = p.s * pf;
        const light = 1 - (p.z / (depth * 1.3));
        const colTop = shade(baseRGB, clamp(light, 0.35, 1.2));
        const colLeft = shade(baseRGB, clamp(1 - faceContrast, 0.2, 0.9));
        const colRight = shade(baseRGB, clamp(1 - faceContrast * 0.6, 0.25, 1.0));
        drawCube(sx, sy - s * 0.8, s, p.theta, { top: colTop, left: colLeft, right: colRight });
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    return () => { /* stop on unmount */ };
  }, [mounted, bg, baseColor, faceContrast, gravity, airDrag, restitution, floorFriction, staticFrictionThresh, repelRadius, repelStrength, speedBoost, upwardBias, depth, perspectiveScale, padding, spinFactor, shatterPower, angularDamping, rollToSlide, maxDt]);

  // events
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
      const m = mouseRef.current;
      if (m.t) {
        const dt = Math.max(1, now - m.t);
        const vx = (x - m.x) / dt; // px/ms
        const vy = (y - m.y) / dt;
        const speed = Math.min(4.5, Math.hypot(vx, vy));
        m.vx = vx; m.vy = vy; m.speed = speed;
      }
      m.x = x; m.y = y; m.t = now;
    };

    // click shatter → linear impulse + spin
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const m = mouseRef.current;

      const arr = partsRef.current;
      for (const p of arr) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy) || 1;
        const nx = dx / d;
        const ny = dy / d;
        const impulse = (shatterPower * (1 / (0.4 + d * 0.01))) * (1 + m.speed * speedBoost);
        p.vx += nx * impulse;
        p.vy += (ny - upwardBias) * impulse; // upward kick

        // spin from relative motion & off-center hit
        const tangential = (dx * m.vy - dy * m.vx) / (d + 1e-3); // 2D cross
        p.omega += tangential * spinFactor * 0.15 + (Math.random() - 0.5) * 0.12;
      }
    };

    const onLeave = () => { mouseRef.current.x = null; mouseRef.current.y = null; mouseRef.current.speed = 0; };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mouseleave", onLeave);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [count, binHeightRatio, size]);

  return (
    <div className="w-full h-full bg-black relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// Demo wrapper
export function Demo() {
  return (
    <div className="w-screen h-screen bg-black">
      <RoomCubesFaux3D_SpacedSpin />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm pointer-events-none">
        Click to shatter — cubes spin, roll, and slide; particles keep a bit of space.
      </div>
    </div>
  );
}
