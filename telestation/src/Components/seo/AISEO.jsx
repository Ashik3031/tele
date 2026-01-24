import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RiRobot2Line, RiChat3Line } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";

const CARDS = [
  {
    key: "AEO",
    label: "AEO",
    icon: HiOutlineSparkles,
    href: "https://backlinko.com/answer-engine-optimization-aeo",
    subtitle: "Answer Engine Optimization",
  },
  {
    key: "GEO",
    label: "GEO",
    icon: BsSearch,
    href: "https://searchengineland.com/what-is-generative-engine-optimization-geo-444418",
    subtitle: "Generative Engine Optimization",
  },
  {
    key: "AIO",
    label: "AIO",
    icon: RiRobot2Line,
    href: "#",
    subtitle: "AI Optimization",
  },
  {
    key: "LLMs",
    label: "LLMs",
    icon: RiChat3Line,
    href: "#",
    subtitle: "LLM Visibility",
  },
];

/** Mobile marquee wrapper */
function Marquee({ children, speed = 25 }) {
  const reduce = useReducedMotion();

  // Respect "reduce motion" users: show swipeable row instead of auto-animate
  if (reduce) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
        {children}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black to-transparent" />

      <motion.div
        className="flex w-max gap-4 py-1 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* 1st set */}
        <div className="flex gap-4">{children}</div>
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-4" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function CardItem({ card, idx, variant = "grid" }) {
  const Icon = card.icon;

  const isExternal = card.href?.startsWith("http");
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;

  // Shared card UI
  const CardInner = (
    <>
      {/* glow blobs */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#D9F70D]/15 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#D9F70D]/10 blur-3xl opacity-70" />
      {/* subtle inner gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-70" />

      {/* Icon */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl">
          {/* 3D layered shadows */}
          <div className="absolute inset-0 rounded-xl bg-[#D9F70D]/20 blur-md" />
          <div className="absolute inset-0 translate-y-1 rounded-xl bg-[#D9F70D]/30 blur-sm" />

          {/* Main icon container */}
          <span
            className="relative flex h-full w-full items-center justify-center rounded-xl border border-[#D9F70D]/30 bg-gradient-to-br from-[#D9F70D]/25 via-[#D9F70D]/15 to-[#D9F70D]/5 text-[#D9F70D] shadow-[0_4px_20px_rgba(217,247,13,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(217,247,13,0.5)] group-hover:brightness-125"
            style={{
              transform: "translateZ(0)",
              boxShadow:
                "0 4px 20px rgba(217, 247, 13, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Icon className="relative z-10 text-2xl drop-shadow-[0_2px_8px_rgba(217,247,13,0.6)]" />
            {/* top highlight */}
            <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/10 to-transparent" />
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="relative">
        <div className="text-2xl font-semibold tracking-wide">{card.label}</div>
        <div className="mt-1 text-xs text-white/55">{card.subtitle}</div>

        {/* underline */}
        <div className="mt-5 h-px w-12 bg-white/15 transition-all duration-300 group-hover:w-20 group-hover:bg-[#D9F70D]/60" />
      </div>
    </>
  );

  // Mobile marquee card (no framer motion hover/entrance needed)
  if (variant === "marquee") {
    return (
      <a
        key={`${card.key}-m`}
        href={card.href}
        target={target}
        rel={rel}
        className="group relative w-[78vw] max-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#050509] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
      >
        {CardInner}
      </a>
    );
  }

  // Desktop grid card (your original motion)
  return (
    <motion.a
      key={`${card.key}-g`}
      href={card.href}
      target={target}
      rel={rel}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: idx * 0.05 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#050509] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
    >
      {CardInner}
    </motion.a>
  );
}

export default function AISEO2026() {
  return (
    <section className="bg-black py-14 text-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            AI-Driven SEO
            <br />
            <span className="text-white/85">Services in 2026</span>
          </h2>
        </div>

        {/* Mobile: marquee */}
        <div className="sm:hidden">
          <Marquee speed={26}>
            {CARDS.map((card, idx) => (
              <CardItem key={card.key} card={card} idx={idx} variant="marquee" />
            ))}
          </Marquee>
        </div>

        {/* Desktop+: grid */}
        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, idx) => (
            <CardItem key={card.key} card={card} idx={idx} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
