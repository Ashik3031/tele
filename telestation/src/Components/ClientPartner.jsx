import React from "react";

export default function ClientPartner() {
  return (
   <section className="relative isolate min-h-[92vh] md:min-h-screen overflow-hidden bg-black text-[#D9F70D]">
  {/* solid black backdrop (important for the blend) */}
  <div className="absolute inset-0 bg-black" />

  {/* smoke video blended on top of black */}
  <video
    className="
      absolute inset-0 w-full h-full object-cover
      mix-blend-screen                      /* makes dark areas transparent */
      opacity-80                            /* adjust to taste */
      [filter:grayscale(1)_contrast(1.25)_brightness(1.15)]
      pointer-events-none
    "
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source src="/client_video1.mp4" type="video/mp4" />
  </video>

      {/* CSS fog fallback / enhancement (works even without video) */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="fog-layer fog-a absolute inset-0" />
        <div className="fog-layer fog-b absolute inset-0" />
      </div>

      {/* subtle top gradient so white logo/menu remain readable */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* leave room for your navbar */}
        <div className="h-20 md:h-24" />

        <div className="flex min-h-[70vh] items-center">
          <div>
            {/* Headline */}
            <h1
              className="
                font-[600] tracking-tight leading-[0.95]
                text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] xl:text-[6.2vw]
                text-white/40
              "
            >
              BECOME{" "}
              <span
                className="
                  relative text-transparent
                  bg-clip-text
                  bg-gradient-to-b from-white via-white to-zinc-400
                  drop-shadow-[0_6px_24px_rgba(255,255,255,0.25)]
                "
              >
                SUCCESS
              </span>
              <br />
              PARTNER
            </h1>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="/contact"
                className="
                  inline-flex items-center justify-center
                  px-8 md:px-12 py-3.5 md:py-4
                  rounded-full
                  text-lg md:text-xl font-semibold tracking-wide
                  bg-black/30
                  border border-white/30
                  shadow-[inset_0_0_0_1px_rgba(255,255,255,.15)]
                  hover:shadow-[0_0_0_2px_rgba(255,255,255,.2),inset_0_0_0_1px_rgba(255,255,255,.2)]
                  transition-all
                  backdrop-blur-sm
                "
              >
                Join Us Now!
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes + fog styles (scoped) */}
      <style>{`
        @keyframes fogMoveA {
          0%   { transform: translate3d(-10%, 0, 0) scale(1.3); opacity:.65; }
          50%  { transform: translate3d(5%, 2%, 0)   scale(1.35); opacity:.8; }
          100% { transform: translate3d(-10%, 0, 0) scale(1.3); opacity:.65; }
        }
        @keyframes fogMoveB {
          0%   { transform: translate3d(8%, 1%, 0) scale(1.25); opacity:.55; }
          50%  { transform: translate3d(-6%, -1%, 0) scale(1.28); opacity:.75; }
          100% { transform: translate3d(8%, 1%, 0) scale(1.25); opacity:.55; }
        }

        /* Soft procedural fog using layered radial-gradients (no images needed) */
        .fog-layer {
          background:
            radial-gradient(60vw 40vh at 30% 20%, rgba(255,255,255,.12), transparent 60%),
            radial-gradient(50vw 35vh at 70% 35%, rgba(255,255,255,.10), transparent 60%),
            radial-gradient(65vw 45vh at 50% 70%, rgba(255,255,255,.08), transparent 65%);
          filter: blur(18px) saturate(110%);
        }
        .fog-a { animation: fogMoveA 26s ease-in-out infinite; }
        .fog-b { animation: fogMoveB 34s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
