// ParticleCanvas.jsx
import { useRef, useEffect } from "react";

export default function ParticleCanvas({
  particleCount = 150,
  maxSpeed = 0.7,
  trail = 0.1, // 0 = no trail, 1 = full trail
  color = "rgba(255,255,255,0.9)",
}) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * maxSpeed * 2,
      vy: (Math.random() - 0.5) * maxSpeed * 2,
      size: Math.random() * 2 + 1,
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // fade for trails
      ctx.fillStyle = `rgba(0,0,0,${trail})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw links
      const linkDist = 100;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // update & draw particles
      ctx.fillStyle = color;
      for (const p of particles.current) {
        // attract to mouse
        if (mouse.current.x != null) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          const force = Math.min(1.5 / dist, 0.04); // tune feel
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // velocity limit
        const speed = Math.hypot(p.vx, p.vy);
        const limit = maxSpeed * 3;
        if (speed > limit) {
          p.vx = (p.vx / speed) * limit;
          p.vy = (p.vy / speed) * limit;
        }

        p.x += p.vx;
        p.y += p.vy;

        // bounce edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [particleCount, maxSpeed, trail, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "#000",
      }}
    />
  );
}
