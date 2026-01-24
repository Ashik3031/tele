import { useEffect, useMemo, useState } from "react";
import testimonialData from "../../data/seoTestimonials.json";

export default function SEOTestimonials({ type = "seo" }) {
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const data = testimonialData?.[type];

  if (!data) {
    return (
      <section className="bg-black py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-white/70">
          Testimonials not found for: <span className="text-white">{type}</span>
        </div>
      </section>
    );
  }

  const { heading, cards = [], speed = 50 } = data;

  // ✅ slower on mobile (feel free to adjust multiplier)
  const duration = isMobile ? speed * 1.8 : speed;

  const items = useMemo(() => [...cards, ...cards], [cards]);
  if (!cards.length) return null;

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">
          <span className="bg-gradient-to-r from-[#D9F70D] via-white to-[#D9F70D] bg-clip-text text-transparent">
            {heading}
          </span>
        </h2>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />

          <div
            className="overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <div
              className="flex gap-6 py-2 will-change-transform"
              style={{
                animation: `seoMarquee ${duration}s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {items.map((item, index) => (
                <div
                  key={`${type}-${item.title}-${index}`}
                  className="min-w-[340px] sm:min-w-[380px] rounded-2xl border border-white/10 bg-[#050509] p-8 shadow-lg transition hover:border-[#D9F70D]"
                >
                  <h3 className="mt-4 text-xl font-semibold tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {item.text}
                  </p>
                  <div className="mt-6">
                    <p className="text-sm font-semibold italic text-slate-200">
                      {item.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes seoMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
