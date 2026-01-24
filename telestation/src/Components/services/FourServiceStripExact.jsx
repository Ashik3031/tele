import React from "react";

/**
 * One BG for all 4 panels
 * - Replace BG_URL with your image
 * - Edit Arabic text + accent colors if needed
 */

const BG_URL =
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=2200&q=80";


const PANELS = [
  { title: "SOCIAL", accent: "#ff3bd5", icon: "chat", arabic: ["اجتماعي"] },
  { title: "CREATIVE", accent: "#ffe24a", icon: "heart", arabic: ["إبداع"] },
  { title: "DIGITAL", accent: "#ff7a18", icon: "search", arabic: ["رقمي"] },
  { title: "STRATEGY", accent: "#3cff88", icon: "sun", arabic: ["استراتيجية"] },
];

function NeonIcon({ type, color }) {
  const common = {
    stroke: color,
    strokeWidth: 2.2,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "heart") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path
          {...common}
          d="M20.8 4.8c-1.7-1.7-4.5-1.7-6.2 0L12 7.4 9.4 4.8c-1.7-1.7-4.5-1.7-6.2 0s-1.7 4.5 0 6.2L12 20l8.8-9c1.7-1.7 1.7-4.5 0-6.2Z"
        />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <circle {...common} cx="11" cy="11" r="6.5" />
        <path {...common} d="M20 20l-4.2-4.2" />
      </svg>
    );
  }

  if (type === "sun") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <circle {...common} cx="12" cy="12" r="4.5" />
        <path {...common} d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
        <path {...common} d="M4.2 4.2l1.8 1.8M18 18l1.8 1.8M19.8 4.2 18 6M6 18 4.2 19.8" />
      </svg>
    );
  }

  // chat
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        {...common}
        d="M20 14c0 1.7-1 3.2-2.6 4.2-1.6 1-3.6 1.6-5.4 1.6-1 0-2-.1-3-.4L4 21l1.2-3.1C4.4 16.9 4 15.6 4 14c0-3.9 3.6-7 8-7s8 3.1 8 7Z"
      />
    </svg>
  );
}

function ArabicNeon({ text, color }) {
  return (
    <div className="mt-6 leading-none" dir="rtl">
      <div
        className="text-[46px] sm:text-[54px] md:text-[58px] font-black tracking-tight"
        style={{
          color,
          textShadow: `0 0 18px ${color}66, 0 0 44px ${color}25`,
        }}
      >
        {text}
      </div>

      {/* underline bar */}
      <div
        className="mt-3 h-[6px] w-24 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 18px ${color}66` }}
      />
    </div>
  );
}

export default function FourPanelOneBG() {
  return (
    <section className="w-full bg-black">
      <div className="relative mx-auto max-w-7xl overflow-hidden">
        {/* One shared background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BG_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* global dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* global grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* Panels */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4">
          {PANELS.map((p, idx) => (
            <div
              key={p.title}
              className="group relative h-[260px] sm:h-[300px] md:h-[340px] px-8 flex flex-col justify-center"
            >
              {/* Divider line */}
              {idx !== 0 && (
                <div className="absolute left-0 top-0 h-full w-[2px] bg-white/55" />
              )}

              {/* Subtle panel overlay (like panels/frames) */}
              <div className="pointer-events-none absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

              {/* Icon */}
              <div
                className="absolute right-6 top-6"
                style={{
                  filter: `drop-shadow(0 0 10px ${p.accent}55) drop-shadow(0 0 22px ${p.accent}22)`,
                }}
              >
                <NeonIcon type={p.icon} color={p.accent} />
              </div>

              {/* Title */}
              <div
                className="text-white text-[36px] sm:text-[40px] font-extrabold tracking-[0.18em]"
                style={{ textShadow: "0 10px 30px rgba(0,0,0,.55)" }}
              >
                {p.title}
              </div>

              {/* Arabic neon */}
              <ArabicNeon text={p.arabic[0]} color={p.accent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
