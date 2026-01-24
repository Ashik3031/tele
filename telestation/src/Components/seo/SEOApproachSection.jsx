// src/components/seo/SEOApproachSection.jsx
"use client";

const SEO_APPROACH_DATA = {
  image: {
    src: "/image/seo.png",
    alt: "best seo agency in UAE",
  },

  heading: {
    highlight: "SEO for a Smarter Search Era",
    // rest: "–  Visibility. Trust. Growth.",
  },

  subheading: " Visibility. Trust. Growth.",

  paragraphs: [
    {
      type: "normal",
      text: [
        "In 2026, SEO is no longer just about rankings or traffic volume. When executed correctly,",
        { highlight: " it delivers high-quality, high-intent" },
        "users who are actively searching, evaluating, and ready to take action — making SEO one of the most sustainable growth channels available for modern businesses.",
      ],
    },
    {
      type: "italic",
      text: [
        "As the best SEO agency in UAE and a trusted Dubai SEO company, we approach SEO as a strategic system built around how search engines and AI-driven platforms evaluate relevance, authority, and trust.",
      ],
    },
    {
      type: "bold",
      text: [""],
    },
    {
      type: "normal",
      text: [
        "",
      ],
    },
    {
      type: "normal",
      text: [
        "Today, SEO works much like a customer discovering your business at the exact moment they need your solution — informed, confident, and prepared to engage. The opportunity already exists; ",
        { highlight: "success depends on visibility, credibility, and timing." },
      ],
    },
  ],
  cta: {
    label: "Know More",
    href: "/seo",
  },


};

export default function SEOApproachSection() {
  const c = SEO_APPROACH_DATA;

  return (
    <section className="relative bg-black py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 lg:flex-row lg:items-stretch">
        {/* Left: image */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="relative">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="h-72 w-72 rounded-full bg-[#5B21FF]/40 blur-3xl" />
            </div>

            
              <img
                src={c.image.src}
                alt={c.image.alt}
                className="
    block h-auto
    w-[360px] sm:w-[480px] md:w-[560px] lg:w-[640px] xl:w-[720px]
    max-w-full object-contain
  "
              />
           
          </div>
        </div>

        {/* Right: content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-[#D9F70D] via-white to-[#D9F70D] bg-clip-text text-transparent">
              {c.heading.highlight}
            </span>{" "}
            <span className="text-white">{c.heading.rest}</span>
          </h2>

          <p className="mt-4 text-sm font-semibold text-white sm:text-base">
            {c.subheading}
          </p>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-200 sm:text-base">
            {c.paragraphs.map((p, idx) => {
              const cls =
                p.type === "italic"
                  ? "italic text-slate-300"
                  : p.type === "bold"
                  ? "font-semibold text-white"
                  : "text-slate-200";

              return (
                <p key={idx} className={cls}>
                  {p.text.map((part, i) =>
                    typeof part === "string" ? (
                      <span key={i}>{part}</span>
                    ) : (
                      <span key={i} className="font-semibold text-[#D9F70D]">
                        {part.highlight}
                      </span>
                    )
                  )}
                </p>
              );
            })}
          </div>

          {/* CTA Button */}
<div className="mt-8">
  <a
    href={c.cta.href}
    className="group inline-flex items-center gap-3 rounded-full border border-[#D9F70D] px-6 py-3 text-sm font-semibold text-[#D9F70D] transition-all duration-300 hover:bg-[#D9F70D] hover:text-black hover:shadow-[0_0_30px_rgba(217,247,13,0.4)]"
  >
    {c.cta.label}

    {/* <span className="inline-block h-2 w-2 rounded-full bg-current transition-transform duration-300 group-hover:translate-x-1" /> */}
  </a>
</div>

        </div>
      </div>
    </section>
  );
}
