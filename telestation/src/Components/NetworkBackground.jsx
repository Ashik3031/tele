import { useEffect, useRef } from "react";

export default function GlobeNetworkBackground({
  palette = ["#007198", "#155AE7", "#0B2C73"],
  bg = "#060607",

  arcStroke = "rgba(21,90,231,0.42)",
  gridStroke = "rgba(21,90,231,0.14)",

  density = 0.00013,
  maxLinkDist = 210,
  drift = 0.14,
  lineAlpha = 0.22,
  pulseAlpha = 0.92,

  // ✅ make it smaller + lower
  globeScale = 0.92,     // ⬅️ smaller (was 1.08)
  globeLift = 0.055,     // ⬅️ lower (was 0.12). smaller lift = lower

  // originality
  horizonGlow = true,
  orbitRing = true,
  continents = true,
  tilt = -0.22,          // tilt the globe grid (radians)
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");

    let W = 0, H = 0;
    let raf = 0;
    let last = performance.now();

    const rand = (a, b) => Math.random() * (b - a) + a;
    const pick = (arr) => arr[(Math.random() * arr.length) | 0];

    let nodes = [];
    let pulses = [];

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width));
      H = Math.max(1, Math.floor(r.height));

      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      // globe geometry
      const R = Math.min(W * 0.54, H * 0.82) * globeScale;
      const cx = W / 2;
      const cy = H * (1 - globeLift);

      // nodes count
      const area = (Math.PI * R * R) / 2;
      const count = Math.max(34, Math.floor(area * density));

      nodes = new Array(count).fill(0).map((_, i) => {
        let x = cx, y = cy;
        for (let k = 0; k < 24; k++) {
          const ang = rand(Math.PI, 2 * Math.PI);
          const rr = Math.sqrt(Math.random()) * (R * 0.985);
          x = cx + Math.cos(ang) * rr;
          y = cy + Math.sin(ang) * rr;
          if (y <= cy) break;
        }
        return {
          x,
          y,
          vx: rand(-drift, drift),
          vy: rand(-drift, drift),
          r: rand(1.15, 2.6),
          c: pick(palette),
        };
      });

      pulses = [];
      wrap.__globe = { cx, cy, R };
    };

    const insideGlobe = (x, y) => {
      const g = wrap.__globe;
      const dx = x - g.cx;
      const dy = y - g.cy;
      return dy <= 0 && dx * dx + dy * dy <= g.R * g.R;
    };

    const clampToGlobe = (n) => {
      const g = wrap.__globe;
      if (n.y > g.cy) n.y = g.cy;
      const dx = n.x - g.cx;
      const dy = n.y - g.cy;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      if (d > g.R) {
        const s = (g.R - 1) / d;
        n.x = g.cx + dx * s;
        n.y = g.cy + dy * s;
      }
    };

    const spawnPulse = (a, b) => {
      pulses.push({
        ax: a.x, ay: a.y,
        bx: b.x, by: b.y,
        t: 0,
        speed: rand(0.012, 0.022),
        c: pick(palette),
      });
      if (pulses.length > 110) pulses.shift();
    };

    // ---- Originality helpers ----
    const drawOrbitRing = (cx, cy, R) => {
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = "rgba(0,113,152,0.25)";
      ctx.lineWidth = 1;

      // dotted ring (slightly above horizon)
      const ringR = R * 1.06;
      for (let a = Math.PI; a <= 2 * Math.PI; a += 0.065) {
        const x1 = cx + Math.cos(a) * ringR;
        const y1 = cy + Math.sin(a) * ringR;
        // skip a few dots randomly (natural)
        if (Math.random() < 0.12) continue;
        ctx.beginPath();
        ctx.arc(x1, y1, 1, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawContinents = (cx, cy, R) => {
      // simple soft blobs (not a map, but gives "earth" feel)
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "rgba(0,113,152,0.55)";

      const blob = (ox, oy, sx, sy) => {
        ctx.beginPath();
        ctx.ellipse(cx + ox * R, cy + oy * R, sx * R, sy * R, tilt * 0.6, 0, Math.PI * 2);
        ctx.fill();
      };

      // a few blobs
      blob(-0.22, -0.35, 0.14, 0.08);
      blob(-0.04, -0.28, 0.10, 0.06);
      blob(0.22, -0.32, 0.15, 0.07);
      blob(0.10, -0.50, 0.08, 0.05);

      ctx.globalAlpha = 0.10;
      ctx.fillStyle = "rgba(21,90,231,0.55)";
      blob(-0.30, -0.52, 0.10, 0.05);
      blob(0.30, -0.46, 0.10, 0.05);

      ctx.restore();
    };

    const drawGlobeBase = () => {
      const { cx, cy, R } = wrap.__globe;

      // background
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // clip for globe shading
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      // haze
      const haze = ctx.createRadialGradient(cx, cy, 10, cx, cy, R * 1.1);
      haze.addColorStop(0, "rgba(0,113,152,0.18)");
      haze.addColorStop(0.55, "rgba(21,90,231,0.10)");
      haze.addColorStop(1, "rgba(11,44,115,0.00)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, W, H);

      // vignette
      const vig = ctx.createRadialGradient(cx, cy, R * 0.25, cx, cy, R * 1.15);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // continents (inside clip)
      if (continents) drawContinents(cx, cy, R);

      ctx.restore();

      // horizon glow
      if (horizonGlow) {
        const hg = ctx.createLinearGradient(0, cy - 20, 0, cy + 34);
        hg.addColorStop(0, "rgba(21,90,231,0.00)");
        hg.addColorStop(0.45, "rgba(21,90,231,0.26)");
        hg.addColorStop(1, "rgba(21,90,231,0.00)");
        ctx.fillStyle = hg;
        ctx.fillRect(0, cy - 40, W, 90);
      }

      // orbit ring
      if (orbitRing) drawOrbitRing(cx, cy, R);

      // arc outline with glow
      ctx.save();
      ctx.shadowColor = "rgba(21,90,231,0.45)";
      ctx.shadowBlur = 14;
      ctx.strokeStyle = arcStroke;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();

      // tilted lat/long grid (more original)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.translate(-cx, -cy);

      ctx.strokeStyle = gridStroke;
      ctx.lineWidth = 1;

      // latitude
      for (let i = 1; i <= 5; i++) {
        const rr = (R * i) / 6;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, Math.PI, 2 * Math.PI);
        ctx.stroke();
      }

      // longitude with slight warp
      for (let i = -4; i <= 4; i++) {
        if (i === 0) continue;
        const k = i / 5;
        ctx.beginPath();
        for (let t = Math.PI; t <= 2 * Math.PI + 0.001; t += 0.02) {
          const x = cx + Math.cos(t) * R;
          const y = cy + Math.sin(t) * R;
          const wx = cx + (x - cx) * (1 - Math.abs(k) * 0.38);
          const wy = y;
          if (t === Math.PI) ctx.moveTo(wx + k * 10, wy);
          else ctx.lineTo(wx + k * 10, wy);
        }
        ctx.stroke();
      }

      ctx.restore();
    };

    const step = (now) => {
      const dt = Math.min(34, now - last);
      last = now;

      drawGlobeBase();

      const { cx, cy, R } = wrap.__globe;

      // clip overlay to half globe
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      // drift nodes
      for (const n of nodes) {
        n.x += n.vx * (dt / 16);
        n.y += n.vy * (dt / 16);

        if (!insideGlobe(n.x, n.y)) {
          n.vx *= -1;
          n.vy *= -1;
          n.x += n.vx * 2;
          n.y += n.vy * 2;
          clampToGlobe(n);
        }
      }

      // links + pulses
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < maxLinkDist * maxLinkDist) {
            const d = Math.sqrt(d2) || 1;
            const fade = 1 - d / maxLinkDist;

            ctx.globalAlpha = lineAlpha * fade;
            ctx.strokeStyle = "rgba(21,90,231,1)";
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            if (Math.random() < 0.0023 * fade) spawnPulse(a, b);
          }
        }
      }

      // pulses
      ctx.globalAlpha = pulseAlpha;
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.t += p.speed * (dt / 16);

        const x = p.ax + (p.bx - p.ax) * p.t;
        const y = p.ay + (p.by - p.ay) * p.t;

        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.14;
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(x, y, 8.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = pulseAlpha;

        if (p.t >= 1) pulses.splice(k, 1);
      }

      // nodes
      ctx.globalAlpha = 0.9;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = n.c;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.10;
        ctx.beginPath();
        ctx.fillStyle = n.c;
        ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.9;
      }

      ctx.restore();
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    };

    resize();
    raf = requestAnimationFrame(step);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [
    palette, bg, arcStroke, gridStroke,
    density, maxLinkDist, drift, lineAlpha, pulseAlpha,
    globeScale, globeLift, horizonGlow, orbitRing, continents, tilt
  ]);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
