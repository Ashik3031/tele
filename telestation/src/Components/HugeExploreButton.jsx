import React from "react";

export function HugeExploreButton({
  label = "Explore",
  accent = "#37C6D9", // use your brand accent (or Huge pink/green)
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "group relative inline-flex items-center gap-4",
        "px-10 py-5",
        "bg-black text-white mt-5",
        "shadow-[0_18px_50px_rgba(0,0,0,0.18)]",
        "transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
        "hover:-translate-y-[2px]",
        "active:translate-y-0",
        "overflow-hidden",
        className,
      ].join(" ")}
      style={{ borderRadius: 0 }} // Huge buttons are squared
    >
      {/* ✅ Accent wipe overlay */}
      <span
        className="absolute inset-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0"
        style={{ backgroundColor: accent }}
      />

      {/* ✅ Content stays above overlay */}
      <span className="relative z-10 flex items-center gap-4">
        {/* Text flips color on hover */}
        <span className="text-lg font-medium transition-colors duration-300 group-hover:text-black">
          {label}
        </span>

        {/* Icon box (inverts like Huge) */}
        <span
          className={[
            "grid place-items-center",
            "h-5 w-5",
          
            "transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
            "group-hover:border-black/25",
          ].join(" ")}
        >
          <span className="text-xl leading-none transition-colors duration-300 group-hover:text-black">
            ↗
          </span>
        </span>
      </span>

      {/* ✅ Subtle “top shade” that makes it feel like Huge */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}
