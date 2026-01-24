// src/Components/OurWorkSlider.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * items: [
 *  {
 *    name: "THAW",
 *    logo: "/logos/thaw.svg",           // optional
 *    tags: ["IoT","Mobile"],            // pills
 *    title: "Flutter-powered IoT app for personalized temperature control",
 *    ctaText: "View case study",
 *    link: "/case-study/thaw",
 *    bgImage: "/images/thaw-bg.jpg",    // large background (fills section)
 *    overlay: "from-[#d35400]/90 to-[#d35400]/60", // tailwind gradient stops (optional)
 *    sideImage: "/images/thaw-mockup.png"          // phone/watch mockup
 *  },
 *  ...
 * ]
 */
export default function OurWorkSlider({ title = "Our work.", items = [] }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  // snap to slide i
  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: i * w, behavior: "smooth" });
  };

  const next = () => {
    const i = (index + 1) % items.length;
    goTo(i);
  };

  const prev = () => {
    const i = (index - 1 + items.length) % items.length;
    goTo(i);
  };

  // track index on scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handle = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / Math.max(w, 1));
      setIndex(i);
    };
    el.addEventListener("scroll", handle, { passive: true });
    return () => el.removeEventListener("scroll", handle);
  }, []);

  // auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [index, items.length]);

  if (!items.length) return null;

  return (
    <section className="w-full border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <h2 className="text-4xl lg:text-5xl font-semibold mb-8 text-white">
          {title}
        </h2>
      </div>

      {/* viewport */}
      <div
        ref={trackRef}
        className="w-full h-[88vh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex h-full">
          {items.map((p, i) => (
            <article
              key={p.name + i}
              className="relative min-w-full h-full snap-center"
            >
              {/* background image */}
              <img
                src={p.bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* white overlay layer */}
              <div className="absolute inset-0 bg-white/60" />
              {/* overlay gradient (left->right like the screenshot) */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  p.overlay || "from-black/80 via-black/60 to-black/30"
                }`}
              />
              {/* content grid */}
              <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 h-full gap-8">
                  {/* left copy block */}
                  <div className="flex flex-col justify-center">
                    {/* logo or name */}
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="h-10 w-auto mb-6 opacity-95"
                      />
                    ) : (
                      <div className="text-white/90 font-semibold text-xl mb-4">
                        {p.name}
                      </div>
                    )}

                    {/* tags */}
                    {p.tags?.length > 0 && (
                      <div className="flex gap-3 mb-6">
                        {p.tags.map((t) => (
                          <span
                            key={`${p.name}-${t}`}
                            className="px-4 py-1 rounded-full text-sm bg-white/10 text-white/90 backdrop-blur border border-white/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* headline */}
                    <h3 className="text-white text-4xl lg:text-5xl font-semibold leading-tight max-w-xl">
                      {p.title}
                    </h3>

                    {/* CTA */}
                    <div className="mt-8">
                      <a
                        href={p.link || "#"}
                        className="inline-flex items-center gap-2 border border-white/70 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
                      >
                        {p.ctaText || "View case study"}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    {/* dots */}
                    <div className="mt-10 flex gap-2">
                      {items.map((_, di) => (
                        <button
                          key={di}
                          onClick={() => goTo(di)}
                          aria-label={`Go to slide ${di + 1}`}
                          className={`h-2.5 rounded-full transition-all ${
                            di === index ? "w-8 bg-white" : "w-4 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* right device/mockup image */}
                  <div className="relative flex items-center justify-end">
                    {p.sideImage && (
                      <img
                        src={p.sideImage}
                        alt={`${p.name} mockup`}
                        className="max-h-[70vh] object-contain drop-shadow-2xl"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* bottom-right next arrow */}
              <button
                onClick={next}
                aria-label="Next project"
                className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* (optional) prev arrow on the left; hide on small screens */}
              <button
                onClick={prev}
                aria-label="Previous project"
                className="hidden md:flex absolute bottom-8 left-8 w-12 h-12 rounded-full border border-white/60 text-white items-center justify-center hover:bg-white hover:text-black transition rotate-180"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}