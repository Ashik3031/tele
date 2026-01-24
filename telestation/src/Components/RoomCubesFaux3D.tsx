import { useEffect, useRef, useState } from "react";

/**
 * RoomCubesFaux3D.jsx
 *
 * Canvas-based particles that LOOK like 3D cubes (isometric-ish),
 * with dry room physics (gravity, wall/floor bounces, friction), open-top bin,
 * and cursor repel (speed-boosted, with slight upward bias).
 *
 * This is a lightweight faux-3D approach:
 * - Each particle has x,y,z and velocities; z only affects perspective/lighting
 * - Drawn using 3 pseudo-3D faces (top/left/right) for a cube feel
 * - Much faster than full WebGL; good for hundreds of particles
 *
 * For true 3D (thousands of boxes, real camera, lights), consider Three.js InstancedMesh.
 */

export default function RoomCubesFaux3D({
  count = 320,
  binHeightRatio = 0.32,
  size = [10, 18],          // base cube edge length in px (before perspective)
  depth = 260,              // z-range: -depth..+depth for perspective variation
  bg = "#000",
  baseColor = "#9ad1ff",   // base face color (light blue by default)
  faceContrast = 0.55,      // 0..1, how much darker side faces are

  gravity = 0.26,           // downward accel
  airDrag = 0.01,           // air resistance
  restitution = 0.28,       // bounciness
  floorFriction = 0.12,     // slows horizontal slide on floor
  staticFrictionThresh = 0.2,

  repelRadius = 150,
  repelStrength = 1.2,
  speedBoost = 2.8,
  upwardBias = 0.2,         // small upward push

  perspectiveScale = 0.0018, // how z affects size
  zJitter = 0.15,            // tiny z change per frame (keeps shimmer)
  maxDt = 24,
}) {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const partsRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, vx: 0, vy: 0, speed: 0, t: 0 });
  const binRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const timeRef = useRef({ last: 0 });

  const rand = (a, b) => Math.random() * (b - a) + a;

  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return { r: 154, g: 209, b: 255 };
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
  }
  const baseRGB = hexToRgb(baseColor);

  const shade = (rgb, f) => `rgb(${Math.max(0, Math.min(255, Math.round(rgb.r * f)))},${Math.max(0, Math.min(255, Math.round(rgb.g * f)))},${Math.max(0, Math.min(255, Math.round(rgb.b * f)))})`;

  const init = () => {
    const canvas = canvasRef.current;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W;
    canvas.height = H;

    // Define bottom bin
    const binH = Math.max(120, H * binHeightRatio);
    const binY = H - binH;
    const binX = Math.floor(W * 0.08);
    const binW = Math.floor(W * 0.84);
    binRef.current = { x: binX, y: binY, w: binW, h: binH };

    // Scatter faux-3D cubes
    const arr = [];
    for (let i = 0; i < count; i++) {
      const s = rand(size[0], size[1]);
      const x = rand(binX + s, binX + binW - s);
      const y = rand(binY + s, binY + binH - s);
      const z = rand(-depth, depth);
      arr.push({ x, y, z, vx: rand(-0.6, 0.6), vy: rand(-0.6, 0.6), vz: rand(-0.2, 0.2), s });
    }
    partsRef.current = arr;
  };

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawCube = (ctx, sx, sy, s, shadeTop, shadeLeft, shadeRight) => {
      // Isometric-ish projection for 2D faces
      // We'll draw three faces: top (a diamond), left, right
      const h = s;             // cube edge
      const half = h / 2;
      const iso = h * 0.5;     // isometric skew

      // Top face (diamond)
      ctx.fillStyle = shadeTop;
      ctx.beginPath();
      ctx.moveTo(sx, sy - iso);
      ctx.lineTo(sx + half, sy);
      ctx.lineTo(sx, sy + iso);
      ctx.lineTo(sx - half, sy);
      ctx.closePath();
      ctx.fill();

      // Left face
      ctx.fillStyle = shadeLeft;
      ctx.beginPath();
      ctx.moveTo(sx - half, sy);
      ctx.lineTo(sx, sy + iso);
      ctx.lineTo(sx, sy + iso + h);
      ctx.lineTo(sx - half, sy + h);
      ctx.closePath();
      ctx.fill();

      // Right face
      ctx.fillStyle = shadeRight;
      ctx.beginPath();
      ctx.moveTo(sx + half, sy);
      ctx.lineTo(sx, sy + iso);
      ctx.lineTo(sx, sy + iso + h);
      ctx.lineTo(sx + half, sy + h);
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

      // background and open-top bin guides
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.lineWidth = 1;
      // left wall
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.stroke();
      // right wall
      ctx.beginPath(); ctx.moveTo(bx + bw, by); ctx.lineTo(bx + bw, by + bh); ctx.stroke();
      // floor
      ctx.beginPath(); ctx.moveTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.stroke();

      const arr = partsRef.current;
      const m = mouseRef.current;

      for (const p of arr) {
        // physics in x,y; z only slight jitter + velocity
        p.vy += gravity * tScale;

        p.vx -= p.vx * airDrag * tScale;
        p.vy -= p.vy * airDrag * tScale;
        p.vz -= p.vz * airDrag * tScale;

        if (m.x != null) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          const R = repelRadius + Math.min(320, m.speed * 120);
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const nx = dx / d;
            let ny = dy / d - upwardBias; // up bias
            const imp = (1 - d / R) * (repelStrength + m.speed * speedBoost) * 0.6 * tScale;
            p.vx += nx * imp;
            p.vy += ny * imp;
            // tiny z nudge for parallax variety
            p.vz += (Math.random() - 0.5) * imp * 0.2;
          }
        }

        // integrate
        p.x += p.vx * tScale;
        p.y += p.vy * tScale;
        p.z += p.vz * tScale + (Math.random() - 0.5) * zJitter;
        if (p.z < -depth) { p.z = -depth; p.vz *= -restitution; }
        if (p.z > depth)  { p.z = depth;  p.vz *= -restitution; }

        // bin collisions (open top)
        const half = p.s * 0.5;
        const l = bx + half;
        const r = bx + bw - half;
        const floor = by + bh - half;
        if (p.x < l) { p.x = l; p.vx = -p.vx * restitution; }
        if (p.x > r) { p.x = r; p.vx = -p.vx * restitution; }
        if (p.y > floor) {
          p.y = floor; p.vy = -p.vy * restitution;
          // floor friction on x
          if (Math.abs(p.vx) > staticFrictionThresh) {
            const sgn = p.vx > 0 ? 1 : -1;
            p.vx -= sgn * floorFriction * tScale;
            if (Math.sign(p.vx) !== sgn) p.vx = 0;
          } else { p.vx = 0; }
        }

        // project to screen with depth/perspective (simple)
        const pf = 1 + p.z * perspectiveScale; // 1 +/- small
        const sx = p.x;                 // keep x screen-aligned
        const sy = p.y - p.z * 0.25;    // parallax up with depth
        const s = p.s * pf;             // size varies with depth

        // face shading by depth (simulate light from top-left)
        const light = 1 - (p.z / (depth * 1.3));
        const topCol = shade(baseRGB, Math.max(0.35, Math.min(1.2, light)));
        const leftCol = shade(baseRGB, Math.max(0.2, topCol === 0 ? 0.2 : (1 - faceContrast) * 0.8));
        const rightCol = shade(baseRGB, Math.max(0.2, (1 - faceContrast * 0.6)));

        drawCube(ctx, sx, sy - s * 0.8, s, topCol, leftCol, rightCol);
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    return () => { /* stop on unmount */ };
  }, [mounted, bg, baseColor, faceContrast, gravity, airDrag, restitution, floorFriction, staticFrictionThresh, repelRadius, repelStrength, speedBoost, upwardBias, depth, perspectiveScale, zJitter, maxDt]);

  // events & responsive
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
        const speed = Math.min(4.0, Math.hypot(vx, vy));
        m.vx = vx; m.vy = vy; m.speed = speed;
      }
      m.x = x; m.y = y; m.t = now;
    };

    const onLeave = () => { mouseRef.current.x = null; mouseRef.current.y = null; mouseRef.current.speed = 0; };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [count, binHeightRatio, size]);

  return (
    <div className="w-full h-full bg-black relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// Minimal demo
export function Demo() {
  return (
    <div className="w-screen h-screen bg-black">
      <RoomCubesFaux3D baseColor="#FFD166" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm pointer-events-none">
        Faux-3D cubes in an open bin. Move fast to blast upward.
      </div>
    </div>
  );
}
