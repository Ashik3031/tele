import React from "react";
import { Zap, Heart, Rocket, Sparkles } from "lucide-react";

const BRAND = {
  accent: "#6EF1F7",
  primary: "#1353CD",
  secondary: "#007399",
};

const perks = [
  { icon: Zap, text: "Fast-paced growth" },
  { icon: Heart, text: "Work-life balance" },
  { icon: Rocket, text: "Innovation driven" },
  { icon: Sparkles, text: "Creative freedom" },
];

const CareersPerks = () => {
  return (
    <div className="mx-auto w-[min(900px,92vw)] mb-10 sm:mb-14 md:mb-16 animate-fadeIn delay-500">
      {/* ✅ responsive grid:
          1 col (very small) → 2 cols (mobile) → 4 cols (desktop)
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {perks.map((perk, i) => {
          const Icon = perk.icon;
          return (
            <div
              key={i}
              className="
                group relative overflow-hidden
                bg-white/5 border border-white/10
                rounded-2xl
                p-4 sm:p-5
                transition-transform duration-300
                hover:-translate-y-1 hover:scale-[1.02]
              "
            >
              {/* icon */}
              <div className="mb-2 sm:mb-3" style={{ color: BRAND.accent }}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                {perk.text}
              </p>

              {/* ✅ subtle hover glow (fixed: use group-hover, not hover on overlay) */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 0 1px ${BRAND.accent}33, 0 20px 60px -45px ${BRAND.accent}66`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareersPerks;
