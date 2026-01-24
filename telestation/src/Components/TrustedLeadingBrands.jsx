import React, { useState } from "react";

const cards = [
  {
    title: "Digital Solutions With Unmatched Excellence",
    description:
      "Our expert-crafted digital marketing services focus on success and distinction.",
    icon: "⚙️",
    bgPattern:
      "radial-gradient(circle at 20% 50%, rgba(190, 242, 2, 0.08) 0%, transparent 50%)",
  },
  {
    title: "Turn Your Digital Ideas Into Reality",
    description:
      "We transform your vision into a unique digital experience, backed by over 20 years of expertise.",
    icon: "💡",
    bgPattern:
      "radial-gradient(circle at 80% 20%, rgba(190, 242, 2, 0.08) 0%, transparent 50%)",
  },
  {
    title: "Strategies Tailored To Your Ambitions",
    description:
      "We deliver innovative and precise strategies to achieve your goals seamlessly.",
    icon: "📈",
    bgPattern:
      "radial-gradient(circle at 50% 80%, rgba(190, 242, 2, 0.08) 0%, transparent 50%)",
  },
];

const TrustedByLeadingBrands = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative w-full bg-black py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(190,242,2,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,242,2,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#bef202]/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#bef202]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 sm:mb-16 lg:mb-20 space-y-6">
          <h2 className="text-3xl sm:text-5xl md:text-7xl text-center font-semibold">
            <span className="text-white">Trusted by </span>
            <span className="text-[#bef202]">Leading Brands</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div
                className="
                  relative h-full
                  rounded-2xl sm:rounded-3xl
                  p-5 sm:p-7 lg:p-8
                  bg-white/[0.03] backdrop-blur-xl
                  border border-white/10
                  transition-all duration-500
                  hover:bg-white/[0.06]
                  hover:border-[#bef202]/30
                  overflow-hidden
                "
              >
                {/* Hover background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: card.bgPattern }}
                ></div>

                {/* Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-[#bef202] rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-all duration-700 -top-12 -right-12 group-hover:scale-150"></div>
                  <div
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-[#bef202] rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-all duration-700 -bottom-10 -left-10 group-hover:scale-150"
                    style={{ transitionDelay: "100ms" }}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon smaller on mobile */}
                  <div className="mb-4 sm:mb-6 inline-flex relative">
                    <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#bef202] p-[2px] group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                        <span className="text-xl sm:text-2xl filter drop-shadow-lg">
                          {card.icon}
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-0 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#bef202] blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>

                  {/* Title smaller on mobile */}
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                    {card.title}
                  </h3>

                  {/* Description smaller on mobile */}
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>

                {/* Corner accent smaller on mobile */}
                <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-white/5 rounded-tr-2xl sm:rounded-tr-3xl group-hover:border-[#bef202]/20 transition-colors duration-300"></div>
              </div>

              {/* Outer glow */}
              <div className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl bg-[#bef202] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedByLeadingBrands;
