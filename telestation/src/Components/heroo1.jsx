import { useEffect, useState } from "react";
import PulseNavbar from "./Navbar";
import Orb from "./Orb";

export default function HeroSection() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(touch);
  }, []);

  return (
    <section
      className="relative w-full h-[100svh] md:h-screen overflow-hidden bg-black"
      style={{ touchAction: "pan-y" }}
    >
      <PulseNavbar />

      {/* Orb background (FULLSCREEN) */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: isTouch ? "none" : "auto",
          touchAction: "pan-y",
        }}
      >
        <Orb
          hue={205}                 // shifts orb palette towards teal/blue
          hoverIntensity={0.45}
          rotateOnHover={!isTouch}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75" />

      {/* Content */}
      <div
        className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-[760px]
          px-4 sm:px-6
          flex flex-col items-center text-center
        "
      >
        <h1 className="font-poppins text-center font-extrabold uppercase tracking-tight leading-[0.95]">
          <span className="block text-4xl sm:text-5xl md:text-7xl text-white">
            Building
          </span>

          <span className="block text-4xl sm:text-5xl md:text-7xl text-white">
            What&apos;s
          </span>

          <span
            className="
              block mt-2 text-4xl sm:text-5xl md:text-7xl
              text-[#37C6D9]
              drop-shadow-[0_0_18px_rgba(55,198,217,0.35)]
            "
          >
            Next!
          </span>

          <span className="mt-6 block h-[2px] w-16 sm:w-20 mx-auto bg-[#37C6D9]/80 rounded-full" />
        </h1>

        <h3
          className="
            mt-4 text-sm sm:text-base md:text-lg
            text-white/75 leading-relaxed max-w-[42rem]
          "
        >
          Make your brand so useful, people would miss it if it disappeared.
        </h3>

        <div className="mt-8 w-full max-w-xs sm:max-w-md">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <a
              href="https://wa.me/919037362703?text=Hi%20I%20want%20to%20start%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center w-full
                px-3 py-2 text-[11px]
                sm:px-7 sm:py-3 sm:text-base
                rounded-full
                bg-[#37C6D9] text-black
                font-semibold uppercase tracking-wide
                min-h-[34px] sm:min-h-[48px]
                active:scale-[0.98] transition
                hover:bg-[#018CA5]
              "
            >
              Start a project
            </a>

            <a
              href="/services"
              className="
                inline-flex items-center justify-center w-full
                px-3 py-2 text-[11px]
                sm:px-7 sm:py-3 sm:text-base
                rounded-full
                border border-white/25
                text-white font-semibold uppercase tracking-wide
                min-h-[34px] sm:min-h-[48px]
                hover:bg-white/10 transition
              "
            >
              See our work
            </a>
          </div>
        </div>

        {/* Optional subtle brand chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#37C6D9]" />
          <span className="h-2 w-2 rounded-full bg-[#018CA5]" />
          <span className="h-2 w-2 rounded-full bg-[#1353CD]" />
          <span className="h-2 w-2 rounded-full bg-[#0B2C73]" />
        </div>
      </div>
    </section>
  );
}
