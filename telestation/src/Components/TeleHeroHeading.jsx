import React from "react";
import ColorBrushLetterWiggleText from "./ColorBrushWiggleText";

const BRAND = {
  primary: "#0B2C73",
  accent: "#37C6D9",
};

export default function TeleHeroHeading() {
  return (
    <section className="relative bg-black overflow-hidden pt-10 sm:pt-14 md:pt-16 pb-4 sm:pb-5">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* ✅ Responsive heading sizes + safe wrap */}
          <h1 className="font-extrabold tracking-tight leading-[0.92] text-[clamp(38px,9vw,120px)] break-words">
            <ColorBrushLetterWiggleText
              text="TURNING"
              className="inline-block"
              baseColor="rgba(255,255,255,0.88)"
              palette={[BRAND.accent, "#ffffff", BRAND.primary, BRAND.accent]}
              neighbor={2}
              letterClassName="mr-[0.02em]"
              shake={{ rotate: 5, x: 6, y: 3, scale: 1.18, lift: 10 }}
            />
          </h1>

          <h1 className="mt-2 sm:mt-3 font-extrabold tracking-tight leading-[0.92] text-[clamp(38px,9vw,120px)] break-words">
            <ColorBrushLetterWiggleText
              text="CONVERSATION"
              className="inline-block"
              baseColor="rgba(255,255,255,0.88)"
              palette={[BRAND.accent, "#22D3EE", "#A78BFA", "#F472B6"]}
              neighbor={2}
              letterClassName="mr-[0.02em]"
              shake={{ rotate: 5, x: 6, y: 3, scale: 1.18, lift: 10 }}
            />
          </h1>

          {/* tighter gap before line 3 on mobile */}
          <h1 className="mt-4 sm:mt-6 font-extrabold tracking-tight leading-[0.92] text-[clamp(38px,9vw,120px)] break-words">
            <ColorBrushLetterWiggleText
              text="INTO BUSINESS"
              className="inline-block"
              baseColor="rgba(255,255,255,0.88)"
              palette={["#ffffff", BRAND.accent, "#ffffff", BRAND.primary]}
              neighbor={2}
              letterClassName="mr-[0.02em]"
              shake={{ rotate: 5, x: 6, y: 3, scale: 1.18, lift: 10 }}
            />
          </h1>

          <h1 className="mt-2 sm:mt-3 font-extrabold tracking-tight leading-[0.92] text-[clamp(38px,9vw,120px)] break-words">
            <ColorBrushLetterWiggleText
              text="OPPORTUNITIES."
              className="inline-block"
              baseColor={BRAND.accent}
              palette={[BRAND.accent, "#22D3EE", BRAND.primary]}
              neighbor={2}
              letterClassName="mr-[0.02em]"
              shake={{ rotate: 5, x: 6, y: 3, scale: 1.18, lift: 10 }}
            />
          </h1>
        </div>
      </div>
    </section>
  );
}
