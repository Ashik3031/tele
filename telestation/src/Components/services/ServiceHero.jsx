import React from "react";
import PixelSnow from "../PixelSnow"; // adjust path
import BlurText from "../BlurText";

export default function AnimatedHero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden ">
      {/* ✅ PixelSnow Background */}
      <PixelSnow
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{ width: "100%", height: "100%" }}
        color="#37C6D9"          // brand snow color (you can set #ffffff too)
        flakeSize={0.012}
        minFlakeSize={1.2}
        pixelResolution={210}
        speed={1.25}
        depthFade={8}
        farPlane={20}
        brightness={1.1}
        gamma={0.4545}
        density={0.32}
        variant="snowflake"      // "square" | "round" | "snowflake"
        direction={125}
      />

      {/* ✅ Overlay (better contrast) */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/90" /> */}

      {/* Optional: subtle grid */}
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(55,198,217,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(55,198,217,0.06)_1px,transparent_1px)] bg-[size:90px_90px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

      {/* ✅ Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[100svh] px-4 sm:px-6">
        <div className="w-full max-w-[1100px] text-center">
          <BlurText
            text="Connecting brands"
            animateBy="words"
            delay={120}
            direction="top"
            className="justify-center font-black leading-[0.95] text-[clamp(34px,7vw,96px)] text-white"
          />

          <BlurText
            text="to real results"
            animateBy="letters"
            delay={35}
            direction="bottom"
            className="justify-center font-black leading-[0.95] text-[clamp(34px,7vw,96px)] text-[#37C6D9] drop-shadow-[0_0_28px_rgba(55,198,217,0.25)]"
          />

          <BlurText
            text="From inbound support to outbound campaigns, we help telecom providers acquire customers, retain loyalty, and grow sustainably."
            animateBy="words"
            delay={55}
            stepDuration={0.25}
            direction="top"
            className="justify-center mt-6 sm:mt-8 mx-auto max-w-[46rem] text-[13px] sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/70"
          />
        </div>
      </div>
    </section>
  );
}
