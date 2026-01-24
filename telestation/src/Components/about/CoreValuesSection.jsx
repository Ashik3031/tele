import React, { useState, useEffect, useRef } from "react";

const values = [
  {
    title: "ENTREPRENEURSHIP",
    text: "We measure the time we spend and its ROI. We create opportunities rather than wait for them.",
    icon: "💡",
  },
  {
    title: "AGILITY",
    text: "We adjust and respond to change, staying at the forefront and ready for any challenge.",
    icon: "⚡",
  },
  {
    title: "COLLABORATION",
    text: "Two creative minds, one mission. Collaboration is at the center of everything we build.",
    icon: "🤝",
  },
  {
    title: "CREATIVITY",
    text: "We love ideas that challenge the ordinary and spark conversations.",
    icon: "✨",
  },
];

const cardColors = [
  "from-[#D9F70D] via-[#F0FF5C] to-[#E4F34D]",
  "from-[#1E293B] via-[#334155] to-[#475569]",
  "from-[#FAFAFA] via-[#F5F5F5] to-[#E5E5E5]",
  "from-[#52525B] via-[#71717A] to-[#A1A1AA]",
];

const CoreValuesSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            }
          });
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="w-full bg-black py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-[#D9F70D]/20 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${-20 + Math.random() * 40}%`,
              animation: `floatVertical ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 opacity-60">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D9F70D]" />
            <p className="tracking-[0.4em] text-[10px] uppercase text-[#D9F70D] font-light">
              Our Core Values
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D9F70D]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            The principles that shape how we{" "}
            <span className="bg-gradient-to-r from-[#D9F70D] via-[#F0FF5C] to-[#D9F70D] text-transparent bg-clip-text">
              think, create, and build.
            </span>
          </h2>
        </div>

        {/* Zig-zag timeline */}
        <div className=" relative">
          {/* Center timeline line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 pointer-events-none" />

          {values.map((value, index) => {
            const isEven = index % 2 === 0;
            const colorClass = cardColors[index % cardColors.length];
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={value.title}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`
                  relative flex flex-col md:flex-row items-center gap-6 md:gap-10
                  ${isEven ? "md:justify-start" : "md:justify-end"}
                  transition-all duration-1000 ease-out
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                `}
              >
                {/* Timeline connector dot */}
                {/* <div
                  className={`
                    hidden md:flex items-center justify-center
                    absolute left-1/2 -translate-x-1/2 z-20
                    transition-all duration-500 delay-300
                    ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                  `}
                >
                  <span className="h-5 w-5 rounded-full bg-[#D9F70D] shadow-[0_0_20px_rgba(217,247,13,0.6)] animate-pulse" />
                  <span className="absolute h-8 w-8 rounded-full border-2 border-[#D9F70D]/30 animate-ping" />
                </div> */}

                {/* Card */}
                <div
                  className={`
                    w-full md:w-[48%] group
                    relative
                    rounded-2xl
                    bg-gradient-to-br ${colorClass}
                    px-6 py-8 md:px-8 md:py-10
                    shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                    hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                    hover:scale-[1.02]
                    transition-all duration-500
                    ${isEven ? "md:mr-auto" : "md:ml-auto"}
                    overflow-hidden
                  `}
                >
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Shine effect */}
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine pointer-events-none" />

                  {/* Content overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl pointer-events-none ${
                      index === 0
                        ? "bg-black/10"
                        : index === 2
                        ? "bg-black/5"
                        : "bg-white/5"
                    }`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    {/* <div
                      className={`text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ${
                        index === 0 || index === 2 ? "opacity-80" : "opacity-60"
                      }`}
                    >
                      {value.icon}
                    </div> */}

                    {/* Title */}
                    <h3
                      className={`text-xs tracking-[0.4em] uppercase mb-4 font-semibold ${
                        index === 0
                          ? "text-black/70"
                          : index === 2
                          ? "text-black/70"
                          : "text-white/70"
                      }`}
                    >
                      {value.title}
                    </h3>

                    {/* Divider line */}
                    <div
                      className={`w-16 h-px mb-4 transition-all duration-500 group-hover:w-24 ${
                        index === 0
                          ? "bg-black/30"
                          : index === 2
                          ? "bg-black/30"
                          : "bg-white/30"
                      }`}
                    />

                    {/* Description */}
                    <p
                      className={`text-sm md:text-base leading-relaxed ${
                        index === 0
                          ? "text-black/90"
                          : index === 2
                          ? "text-black/90"
                          : "text-white/90"
                      }`}
                    >
                      {value.text}
                    </p>
                  </div>

                  {/* Bottom corner accent */}
                  <div
                    className={`absolute bottom-0 right-0 w-24 h-24 opacity-10 transform translate-x-8 translate-y-8 rotate-45 ${
                      index === 0
                        ? "bg-black"
                        : index === 2
                        ? "bg-black"
                        : "bg-white"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D9F70D]/50 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes floatVertical {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes shine {
          to {
            transform: translateX(200%);
          }
        }

        .animate-shine {
          animation: shine 2s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default CoreValuesSection;