import { useEffect, useState } from "react";

export default function ServiceList() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(touch);
  }, []);

  const services = [
    {
      number: "01",
      title: "Digital marketing",
      image: "/digital-marketing.png",
      link: "/social-media",
    },
    {
      number: "02",
      title: "Website development",
      image: "/web-development.png",
      link: "/website",
    },
    {
      number: "03",
      title: "SEO",
      image: "/seo.png",
      link: "/seo",
    },
    {
      number: "04",
      title: "Video Production",
      image: "/video-production.png",
      link: "/video-graphy",
    },
  ];

  return (
    <section className="relative min-h-fit lg:min-h-[100svh] bg-black overflow-hidden">
      {/* Desktop hover background image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage:
            hoveredIndex !== null && !isTouch
              ? `url(${services[hoveredIndex].image})`
              : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: hoveredIndex !== null && !isTouch ? 0.15 : 0,
        }}
      />

      {/* Subtle ambient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,247,13,0.08)_0%,transparent_55%)] opacity-60 sm:opacity-40" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Services label */}
          <div className="flex items-center lg:flex-col lg:items-center">
            {/* Mobile */}
            <div className="lg:hidden text-white/70 text-sm tracking-[0.35em] uppercase">
              Services
            </div>

            {/* Desktop vertical */}
            <div
              className="hidden lg:block text-white text-4xl font-extralight tracking-wider rotate-180"
              style={{ writingMode: "vertical-rl" }}
            >
              Services
            </div>
          </div>

          {/* Services list */}
          <div className="flex-1">
            <div className="divide-y divide-gray-800/80 border-t border-gray-800/80">
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.link}
                  className="
                    group block
                    py-6 sm:py-8 md:py-10
                    transition-colors duration-300
                    focus:outline-none
                  "
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Number */}
                    <span className="text-white/80 text-lg sm:text-xl font-extralight group-hover:text-[#D9F70D] transition-colors duration-300">
                      {service.number}
                    </span>

                    {/* Title */}
                    <h2
                      className="
                        text-white font-extralight
                        transition-colors duration-300
                        group-hover:text-[#D9F70D]
                        text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                        leading-tight break-words
                      "
                    >
                      {service.title}
                    </h2>

                    {/* Arrow-only CTA */}
                    <span
                      className="
                        ml-auto
                        h-10 w-15 sm:h-12 sm:w-12
                        flex items-center justify-center
                        rounded-full
                        text-white/60
                        group-hover:border-[#D9F70D]
                        group-hover:text-[#D9F70D]
                        group-hover:translate-x-1
                        transition-all duration-300
                      "
                    >
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
