import PulseNavbar from "./Navbar";
import Hyperspeed from "./Hyperspeed";
import { hyperspeedBlackPreset } from "./config/hyperspeedPresets"; // adjust path
import { useMemo } from "react";

export default function HeroSection() {
 const effectOptions = useMemo(() => ({
  ...hyperspeedBlackPreset.one,
  colors: { ...hyperspeedBlackPreset.one.colors, background: 0x000000 },
}), []);

  return (
    <section className="relative w-full h-[100svh] md:h-screen overflow-hidden bg-white">
      <PulseNavbar />

      {/* Background */}
      {/* <Hyperspeed effectOptions={hyperspeedBlackPreset.one} /> */}
      <div className="absolute inset-0 pointer-events-none">
        <Hyperspeed effectOptions={effectOptions} />
      </div>




      {/* Overlay for readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/85" />
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(0,0,0,0.06)_70%,rgba(0,0,0,0.12)_100%)]" />
 */}

      {/* Content */}
      <div
        className="
          relative z-10 h-full
          flex flex-col items-center justify-center
          px-4 text-center
        "
      >
       <h1 className="font-poppins font-extrabold uppercase tracking-tight leading-[0.95]">
  <span className="block text-4xl sm:text-5xl md:text-7xl text-white">
    Connecting
  </span>
  <span className="block text-4xl sm:text-5xl md:text-7xl text-white">
    Business
  </span>
  <span className="block mt-2 text-4xl sm:text-5xl md:text-7xl text-[#37C6D9] drop-shadow-[0_0_18px_rgba(55,198,217,0.35)]">
    Better
  </span>
  <span className="mt-6 block h-[2px] w-16 sm:w-20 mx-auto bg-[#37C6D9]/80 rounded-full" />
</h1>

<p className="mt-4 text-sm sm:text-base md:text-lg text-white max-w-2xl">
  End-to-end BPO and telecom services trusted by leading providers.
</p>


        {/* <div className="mt-8 w-full max-w-xs sm:max-w-md">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <a
              href="https://wa.me/971503535409?text=Hi%20I%20want%20to%20start%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center w-full
                px-3 py-2 text-[11px]
                sm:px-7 sm:py-3 sm:text-base
                rounded-full bg-[#37C6D9] text-black
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
                rounded-full border border-white/30
                text-white font-semibold uppercase tracking-wide
                min-h-[34px] sm:min-h-[48px]
                hover:bg-white/10 transition
              "
            >
              See our work
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
}
