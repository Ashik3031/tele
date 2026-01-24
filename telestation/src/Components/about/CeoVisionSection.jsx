import React from "react";

export default function CeoVisionSection() {
  const person = {
    name: "Riveen",
    role: "Managing Director",
    image: "/image/manager1.jpeg",
  };

  return (
    <section className="w-full bg-[#0a0a0a] py-10 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-14">
  Leadership Behind Telestation
</h2>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-[620px]">
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-[380px] sm:h-[460px] md:h-[560px] object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
            </div>

            {/* Overlay card (bottom-right, clean alignment) */}
            <div
              className="
                absolute
                right-4 sm:right-6
                bottom-4 sm:bottom-6
                w-[85%] sm:w-[72%] md:w-[62%]
              "
            >
              <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 shadow-[0_18px_50px_rgba(0,0,0,0.65)]">
                <p className="text-white/70 text-sm sm:text-base mb-1">
                  Managing Director of
                </p>
                <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                  TSPL
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-white w-full max-w-[640px] mx-auto lg:mx-0">
            <p className="text-white/85 italic leading-relaxed text-base md:text-lg lg:text-xl">
              Riveen’s journey wasn’t built on shortcuts. He believes in
              consistency, clarity, and long-term value creation. Over the
              years, he has helped shape the brand with a people-first mindset,
              strong operational discipline, and a vision that keeps evolving
              with the market. His leadership focuses on building trust,
              empowering teams, and turning challenges into growth—while keeping
              the brand’s standards uncompromising.
            </p>

            <div className="mt-8 md:mt-10">
              <h3 className="text-2xl md:text-3xl font-bold">{person.name}</h3>
              <p className="text-white/70 font-medium mt-1">{person.role}</p>

              {/* optional subtle divider for premium feel */}
              <div className="mt-6 h-px w-24 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
