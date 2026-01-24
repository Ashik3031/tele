import React, { useEffect, useRef, useState } from "react";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=85",
    alt: "Digital Marketing Campaign",
    title: "Building Tomorrow",
    description:
      "DigTel empowers businesses with innovative marketing strategies that merge creativity and technology to deliver measurable growth."
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=85",
    alt: "Brand Strategy and Creative Execution",
    title: "Trusted by Businesses",
    description:
      "From social media marketing to brand storytelling, we help brands connect deeply with audiences and build loyalty through impactful digital experiences."
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=85",
    alt: "AI Chatbot and Web Solutions",
    title: "Innovating with AI",
    description:
      "With our 24/7 AI chatbot integration, web development, and IT solutions, we transform customer engagement and operational efficiency."
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&q=85",
    alt: "Creative Production and Global Reach",
    title: "Visuals that Speak",
    description:
      "Our photography, videography, and performance marketing campaigns bring brands to life — from Dubai to the world."
  },
];


export default function ClientsScroller() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;

      const start = sec.offsetTop;                    // where the scroller starts
      const total = sec.offsetHeight;                 // total scrollable height of this scroller
      const vh = window.innerHeight;

      // Current scroll relative to the start of the scroller
      const y = window.scrollY;
      const rel = y - start;

      // Map scroll to panel index (each panel ~1 viewport tall)
      const rawIndex = Math.floor((rel + vh * 0.5) / vh); // center-based snap
      const clamped = Math.max(0, Math.min(IMAGES.length - 1, rawIndex));
      setCurrentIndex(clamped);
    };

    onScroll(); // set initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative" ref={sectionRef}>
      {/* Scroll region height = number of slides * 100vh */}
      <section
        className="relative bg-[#0b0c10]"
        style={{
          height: `${IMAGES.length * 100}vh`,
          backgroundImage: `
            radial-gradient(900px 500px at 85% -10%, rgba(110,199,255,0.08), transparent 60%),
            linear-gradient(180deg, #0b0c10, #0e1015)
          `,
        }}
      >
        {/* Sticky viewport where slides animate */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {IMAGES.map((img, i) => {
            // Position states
            const isActive = i === currentIndex;
            const isPrev   = i <  currentIndex;
            const isNext   = i >  currentIndex;

            const base =
              "absolute inset-0 transition-all duration-700 ease-\[cubic-bezier(.2,.75,.2,1)\] will-change-transform";
            const pos =
              isActive
                ? "translate-x-0 opacity-100 z-20"
                : isPrev
                ? "-translate-x-full opacity-0 z-10"
                : "translate-x-full opacity-0 z-0";

            return (
              <div key={i} className={`${base} ${pos}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full h-full object-cover brightness-90 saturate-110 contrast-105 ${
                    isActive ? "transition-transform duration-700 scale-100" : ""
                  }`}
                />

                {/* Tint/overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30"
                  aria-hidden="true"
                />

                {/* Text overlay (only on active) */}
                {isActive && (
                  <div className="absolute left-6 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-30 max-w-2xl">
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight text-white/95 drop-shadow-2xl mb-4">
                      {img.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-white/75 font-light drop-shadow">
                      {img.alt}
                    </p>
                  </div>
                )}

               
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
