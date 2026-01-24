import React, { useMemo, useState } from "react";

const DEFAULT_ITEMS = [
  {
    no: "01",
    title: "Audience Analysis",
    desc: "We begin by understanding your target audience, their behaviour, preferences, and pain points. This allows us to create content and messaging that resonates, builds trust, and attracts potential customers.",
  },
  {
    no: "02",
    title: "Strategy & Brainstorming",
    desc: "Using insights from research and analytics, our strategists and creatives collaborate to develop campaign ideas and content concepts. Each strategy is tailored to your brand voice, goals, and platform opportunities.",
  },
  {
    no: "03",
    title: "Content Design & Creation",
    desc: "Our design and content teams bring ideas to life through high-quality visuals, copy, and platform-specific formats. Every piece of content is created to engage users and support consistent brand growth.",
  },
  {
    no: "04",
    title: "Distribution & Promotion",
    desc: "We publish and promote content across relevant social media platforms to maximise reach and engagement. Ongoing optimisation ensures your campaigns perform effectively and continue to deliver results.",
  },
];

export default function HoverExpandCards({
  heading = "Our Process for Social Media Marketing in Dubai",
  description = "Our social media marketing process is designed to deliver consistent growth through insight-led strategy and creative execution. From understanding your audience to promoting content across the right platforms, we follow a structured approach that helps brands maximise visibility, engagement, and long-term impact.",
  items = DEFAULT_ITEMS,
  brandColor = "#D9F70D",
  className = "",
}) {
  const [active, setActive] = useState(-1);

  const cssVars = useMemo(
    () => ({
      "--brand": brandColor,
    }),
    [brandColor]
  );

  return (
    <section
      style={cssVars}
      className={`relative w-full overflow-hidden bg-black py-14 sm:py-16 ${className}`}
      onMouseLeave={() => setActive(-1)}
    >
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "var(--brand)" }}
        />
        <div
          className="absolute -bottom-44 right-1/4 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "var(--brand)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
            {description}
          </p>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[var(--brand)]" />
        </div>

        {/* Cards */}
        <div className="flex gap-4">
          {items.slice(0, 4).map((card, idx) => {
            const isActive = active === idx;
            const isAnyActive = active !== -1;

            return (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                className={[
                  "group relative text-left",
                  "rounded-2xl border",
                  "bg-white/[0.03] backdrop-blur-xl",
                  "transition-[flex,transform,box-shadow,border-color] duration-500 ease-out",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
                  "hover:-translate-y-1",
                  isActive ? "flex-[2.2]" : isAnyActive ? "flex-[0.9]" : "flex-1",
                ].join(" ")}
                style={{
                  borderColor: isActive
                    ? "color-mix(in oklab, var(--brand) 55%, transparent)"
                    : "rgba(255,255,255,0.10)",
                  boxShadow: isActive
                    ? "0 18px 55px rgba(217,247,13,0.16)"
                    : "0 18px 55px rgba(0,0,0,0.45)",
                }}
              >
                {/* glow */}
                {/* <div
                  className={[
                    "pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500",
                    isActive ? "opacity-80" : "group-hover:opacity-40",
                  ].join(" ")}
                  style={{
                    background:
                      "radial-gradient(650px circle at 25% 20%, color-mix(in oklab, var(--brand) 28%, transparent) 0%, transparent 55%)",
                  }}
                /> */}

                {/* content - ✅ stable alignment */}
                <div className="relative flex h-full min-h-[220px] flex-col justify-start p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div
                        className="text-2xl font-semibold tracking-tight"
                        style={{ color: "var(--brand)" }}
                      >
                        {card.no}
                      </div>

                      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                        {card.title}
                      </div>
                    </div>

                    {/* <span
                      className={[
                        "mt-1 h-2.5 w-2.5 rounded-full transition-transform duration-500",
                        isActive ? "scale-110" : "scale-100",
                      ].join(" ")}
                      style={{ backgroundColor: "var(--brand)" }}
                    /> */}
                  </div>

                  {/* ✅ fixed spacing + clamp prevents ugly shrink */}
                  <p
                    className={[
                      "mt-4 text-sm leading-relaxed",
                      isActive ? "text-white/75" : "text-white/55",
                      // clamp more when inactive so alignment stays clean
                      isActive ? "line-clamp-none" : "line-clamp-4",
                    ].join(" ")}
                  >
                    {card.desc}
                  </p>

                  {/* push underline to bottom without jumping */}
                  <div className="mt-auto pt-6">
                    <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={[
                          "h-full w-0 rounded-full transition-all duration-500",
                          isActive ? "w-full" : "group-hover:w-3/4",
                        ].join(" ")}
                        style={{ backgroundColor: "var(--brand)" }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fallback clamp styles (if tailwind line-clamp plugin not enabled) */}
      <style>{`
        .line-clamp-4{
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-none{
          display: block;
          overflow: visible;
        }
      `}</style>
    </section>
  );
}
