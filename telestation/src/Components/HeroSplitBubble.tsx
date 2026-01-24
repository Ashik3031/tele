import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type Props = {
  title?: string;
  ctaText?: string;
  onCta?: () => void;
};

type Ripple = { id: number; x: number; y: number };

export default function HeroSplitBubble({
  title = "YOUR PARTNER IN DIGITAL GROWTH. INTEGRATED MARKETING SERVICES, MEASURABLE RESULTS, AND LASTING IMPACT.",
  ctaText = "BECOME PARTNER",
  onCta,
}: Props) {
  // ----- Light follow (inside the bubble) -----
  const mx = useMotionValue(0.5); // 0..1
  const my = useMotionValue(0.5); // 0..1
  const smx = useSpring(mx, { stiffness: 120, damping: 20 });
  const smy = useSpring(my, { stiffness: 120, damping: 20 });

  const light = useMotionTemplate`radial-gradient(40% 40% at ${useTransform(
    smx,
    (v) => `${v * 100}%`,
  )} ${useTransform(smy, (v) => `${v * 100}%`)},
    rgba(255,255,255,0.10), transparent 60%)`;

  const vignette =
    "radial-gradient(circle at 50% 60%, rgba(0,0,0,0.55), rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.85) 70%), " +
    "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent 70%)";

  // ----- Magnetic repel motion (bubble body) -----
  const bx = useMotionValue(0); // px offset X
  const by = useMotionValue(0); // px offset Y
  const sbx = useSpring(bx, { stiffness: 220, damping: 22, mass: 0.6 });
  const sby = useSpring(by, { stiffness: 220, damping: 22, mass: 0.6 });

  const bscale = useMotionValue(1);
  const sbscale = useSpring(bscale, { stiffness: 180, damping: 20 });

  // Idle float wrapper (separate transform so it doesn't fight the repel)
  const [hovering, setHovering] = useState(false);

  // Ripple state
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [rippleId, setRippleId] = useState(0);

  // tuning
  const MAX_OFFSET = 42;       // px push amount
  const INFLUENCE_RADIUS = 0.55; // fraction of half-diagonal
  const MAX_SCALE_BUMP = 0.05; // +5%

  // gentle auto drift for light (for touch / idle)
  useEffect(() => {
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.015;
      mx.set(Math.sin(t) * 0.15 + 0.5);
      my.set(Math.cos(t * 0.9) * 0.12 + 0.52);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    setHovering(true);
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();

    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // update light (0..1)
    mx.set(px / rect.width);
    my.set(py / rect.height);

    // repel math
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = px - cx;
    const dy = py - cy;

    const halfDiag = Math.sqrt(cx * cx + cy * cy);
    const nd = Math.min(
      Math.sqrt(dx * dx + dy * dy) / (halfDiag * INFLUENCE_RADIUS),
      1,
    );
    const strength = 1 - nd;

    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = dx / len;
    const ny = dy / len;

    bx.set(-nx * strength * MAX_OFFSET);
    by.set(-ny * strength * MAX_OFFSET);
    bscale.set(1 + strength * MAX_SCALE_BUMP);
  }

  function onLeave() {
    setHovering(false);
    bx.set(0);
    by.set(0);
    bscale.set(1);
  }

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    // Create a ripple at click position (relative to bubble)
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples((prev) => [...prev, { id: rippleId, x, y }]);
    setRippleId((id) => id + 1);
  }

  function removeRipple(id: number) {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <section className="relative w-full bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT: Headline + CTA */}
          <div className="max-w-2xl">
            <h1 className="text-left font-semibold uppercase leading-tight tracking-wide text-zinc-200 text-[clamp(28px,4.6vw,56px)]">
              {title}
            </h1>

            <div className="mt-10">
              <button
                onClick={onCta}
                className="group relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold tracking-wider text-zinc-200 transition focus:outline-none"
                aria-label={ctaText}
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-xl opacity-70 group-hover:opacity-90 transition" />
                <span className="relative rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm px-6 py-3">
                  {ctaText}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: Interactive Magnetic Bubble */}
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onMouseEnter={() => setHovering(true)}
            onClick={onClick}
            className="relative aspect-square w-full max-w-[540px] justify-self-center overflow-visible"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Idle float wrapper */}
            <motion.div
              // when not hovering, gently bob & rotate forever
              animate={
                hovering
                  ? { y: 0, rotate: 0 }
                  : {
                      y: [0, -8, 0, 6, 0],
                      rotate: [0, -0.6, 0.2, -0.4, 0],
                    }
              }
              transition={
                hovering
                  ? { type: "spring", stiffness: 120, damping: 18 }
                  : { duration: 6, ease: "easeInOut", repeat: Infinity }
              }
              className="absolute inset-0"
            >
              {/* Repel group (position/scale reacts to cursor) */}
              <motion.div
                style={{ x: sbx, y: sby, scale: sbscale }}
                className="absolute inset-0"
              >
                {/* moving light + vignette */}
                <motion.div
                  style={{ backgroundImage: useMotionTemplate`${light}, ${vignette}` }}
                  className="absolute inset-0 rounded-full"
                />
                {/* bubble body / depth layers */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-800/40 via-zinc-900/50 to-zinc-800/20" />
                <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />

                {/* CLICK RIPPLES */}
                {ripples.map((r) => (
                  <RippleRing key={r.id} x={r.x} y={r.y} onDone={() => removeRipple(r.id)} />
                ))}
              </motion.div>
            </motion.div>

            {/* ground shadow (parallax with repel) */}
            <motion.div
              style={{ x: useTransform(sbx, (v) => v * 0.35) }}
              className="absolute -bottom-7 left-1/2 h-10 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** A quick ripple ring that scales & fades out */
function RippleRing({
  x,
  y,
  onDone,
}: {
  x: number;
  y: number;
  onDone: () => void;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute aspect-square w-[30%] rounded-full"
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(closest-side, rgba(255,255,255,0.32), rgba(255,255,255,0.2) 35%, transparent 70%)",
        filter: "blur(1px)",
      }}
      initial={{ scale: 0.2, opacity: 0.35 }}
      animate={{ scale: 1.8, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={onDone}
    />
  );
}
