import React from "react";

const BRAND = "#D9F70D";

const gradientMapping = {
  brand: `linear-gradient(135deg, ${BRAND}, #000000)`,
  brandSoft: `linear-gradient(135deg, rgba(217,247,13,1), rgba(0,0,0,0.9))`,
  brandSolid: BRAND,
};

export default function GlassIcons({ items, className }) {
  const getBackgroundStyle = (color) => {
    if (!color) return { background: gradientMapping.brandSoft };
    if (gradientMapping[color]) return { background: gradientMapping[color] };
    return { background: color };
  };

  return (
    <div
      className={`grid gap-[3.5em] grid-cols-7 md:grid-cols-7 lg:grid-cols-7 mx-auto py-[3em] overflow-visible ${
        className || ""
      }`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          aria-label={item.label}
          className={`relative bg-transparent outline-none border-none cursor-pointer w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
            item.customClass || ""
          }`}
        >
          {/* BRAND plate */}
          <span
            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] [will-change:transform] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
            style={{
              ...getBackgroundStyle("brand"),
              boxShadow: "0.5em -0.5em 1.2em rgba(217,247,13,0.25)",
            }}
          />

          {/* black glass */}
          <span
            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[rgba(0,0,0,0.35)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] [will-change:transform] transform group-hover:[transform:translate3d(0,0,2em)] group-hover:shadow-[0_0_45px_rgba(217,247,13,0.35)]"
            style={{
              boxShadow: "0 0 0 0.1em rgba(217,247,13,0.35) inset",
            }}
          >
            <span className="m-auto w-[1.6em] h-[1.6em] flex items-center justify-center" aria-hidden="true">
              {React.isValidElement(item.icon)
                ? React.cloneElement(item.icon, { className: "h-6 w-6 text-[#D9F70D]" })
                : item.icon}
            </span>
          </span>

          {/* label */}
          <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-sm sm:text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)] text-white/90">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
