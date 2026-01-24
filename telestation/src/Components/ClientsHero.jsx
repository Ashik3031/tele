import React, { useEffect, useRef, useState } from "react";

/** ---------- STATIC CONTENT (edit as needed) ---------- */
const CONTENT = {
  eyebrow: "Building Tomorrow",
  headlineLead: "Empower",
  headlineFlipFront: "Businesses",
  headlineFlipBack: "Brands",
  headlineTail: "to Grow Faster",
  subtext:
    "We build measurable digital growth systems for you: high-converting websites and Shopify stores, 24/7 AI chatbots, performance marketing on Meta Ads & Google Ads, and scroll-stopping videography & photoshoots. digtel plans, builds, and scales what actually drives revenue.",
  ctaLabel: "Get a Free Strategy Call",
  ctaHref: "#contact",
  serviceChips: [
    "Websites & Shopify",
    "AI Chatbots (24/7)",
    "Meta Ads",
    "Google Ads",
    "Videography",
    "Photoshoots",
    "SEO",
    "Social Media",
  ],
};

/** ---------- IMAGES (used in the right media stack) ---------- */
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=85",
    alt: "Digital Marketing Campaign",
    title: "Building Tomorrow",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=85",
    alt: "Brand Strategy",
    title: "Trusted Partnerships",
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=85",
    alt: "Creative Solutions",
    title: "Innovative Results",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&q=85",
    alt: "Global Impact",
    title: "Worldwide Success",
  },
];

export default function ClientsHero() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const [flipKey, setFlipKey] = useState(0);

  // Flip "Businesses/Brands"
  useEffect(() => {
    const id = setInterval(() => setFlipKey((p) => p + 1), 3000);
    return () => clearInterval(id);
  }, []);

  // Mouse tilt (desktop only)
  useEffect(() => {
    const el = sectionRef.current;
    const media = mediaRef.current;
    if (!el || !media) return;

    const isTouch =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (isTouch) return;

    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const nx = x * 2 - 1;
      const ny = y * 2 - 1;

      const rotY = nx * 10;
      const rotX = -ny * 8;
      const tX = nx * 18;
      const tY = ny * 14;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        media.style.transform = `
          perspective(1000px)
          rotateY(${rotY}deg)
          rotateX(${rotX}deg)
          translateX(${tX}px)
          translateY(${tY}px)
          translateZ(36px)
        `;
      });
    };
    const reset = () => {
      media.style.transform =
        "perspective(1000px) rotateY(0) rotateX(0) translateX(0) translateY(0) translateZ(0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Fade in on view
  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const io = new IntersectionObserver(
      (ents) => ents.forEach((en) => en.isIntersecting && s.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    io.observe(s);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cl-hero{opacity:0;transition:opacity .6s ease}
        .cl-hero.is-visible{opacity:1}
        .cl-hero__media{transition:transform .15s ease-out;transform-style:preserve-3d}
        .cl-hero__media>*{transform-style:preserve-3d}

        .cl-flip{perspective:1000px}
        .cl-flip__face{backface-visibility:hidden;transition:transform .6s ease}
        .cl-flip__face--front{transform:rotateX(0)}
        .cl-flip__face--back{transform:rotateX(-90deg);transform-origin:center bottom}
        .cl-flip.flipping .cl-flip__face--front{transform:rotateX(90deg);transform-origin:center top}
        .cl-flip.flipping .cl-flip__face--back{transform:rotateX(0)}

        .cl-hero__btn::before{
          content:"";position:absolute;inset:0;left:-120%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);
          transition:left .5s ease
        }
        .cl-hero__btn:hover::before{left:120%}

        @keyframes float{0%,100%{transform:translateY(0) translateZ(16px)}50%{transform:translateY(-12px) translateZ(16px)}}
        @keyframes float2{0%,100%{transform:translateY(0) translateZ(10px)}50%{transform:translateY(-10px) translateZ(10px)}}
        .float-animation{animation:float 4.2s ease-in-out infinite}
        .float-animation-delayed{animation:float2 4.6s ease-in-out infinite;animation-delay:.8s}

        @media (max-width: 1023px){
          .float-animation,.float-animation-delayed{animation:float 3.2s ease-in-out infinite}
          .cl-hero__media{transform:none !important}
        }

        @media (prefers-reduced-motion: reduce){
          .cl-hero,*{animation:none !important;transition:none !important}
        }
      `}</style>

      <section
        ref={sectionRef}
        className="
          cl-hero relative
          min-h-[100svh]
          flex items-center
          px-4 sm:px-6 lg:px-10
          py-14 sm:py-20 lg:py-24
          overflow-hidden
          bg-[#000]
        "
      >
        {/* soft background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60rem 30rem at 18% 40%, rgba(99,179,237,0.09), transparent 60%)",
          }}
        />

        <div
          className="
            relative mx-auto w-full max-w-7xl
            grid grid-cols-1 lg:grid-cols-2
            gap-10 lg:gap-16
            items-center
          "
        >
          {/* LEFT: static content */}
          <div className="z-10 text-center lg:text-left">
            {/* Eyebrow */}
            {/* <div className="mb-2 text-xs tracking-[0.2em] uppercase text-white/60">
              {CONTENT.eyebrow}
            </div> */}

            {/* Headline with flip */}
            <h1
              className="
                mb-4 font-light tracking-tight text-white
                leading-[1.08]
                text-[clamp(28px,7.2vw,56px)]
              "
            >
              {CONTENT.headlineLead}{" "}
              <span
                className={`cl-flip inline-block relative font-normal text-[#D9F70D] ${
                  flipKey % 2 === 1 ? "flipping" : ""
                }`}
              >
                <span className="cl-flip__face cl-flip__face--front block text-center">
                  {CONTENT.headlineFlipFront}
                </span>
                <span className="cl-flip__face cl-flip__face--back absolute top-0 left-0">
                  {CONTENT.headlineFlipBack}
                </span>
              </span>
              <br />
              {CONTENT.headlineTail}
            </h1>

            {/* Subtext */}
            <p className="mx-auto lg:mx-0 max-w-[60ch] text-[clamp(14px,2.6vw,18px)] leading-relaxed text-white/80 text-justify">
              {CONTENT.subtext}
            </p>

            {/* Service chips */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start">
              {CONTENT.serviceChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs sm:text-sm text-white/80"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-7">
              <a
                href={CONTENT.ctaHref}
                className="
                  cl-hero__btn relative inline-block overflow-hidden
                  rounded-xl border-2 border-white/20 bg-transparent
                  px-6 py-3 sm:px-8 sm:py-3.5
                  text-[clamp(14px,2.4vw,16px)] font-medium text-white
                  transition-all duration-300 hover:border-white
                  hover:-translate-y-0.5 active:scale-95
                "
              >
                {CONTENT.ctaLabel}
              </a>
            </div>
          </div>

          {/* RIGHT: media stack */}
          <div
            ref={mediaRef}
            className="
              cl-hero__media relative w-full
              h-[46svh] sm:h-[52svh] lg:h-[60svh]
              min-h-[320px] max-h-[720px]
              mx-auto lg:mx-0
            "
          >
            {/* Main card */}
            <div
              className="
                absolute left-1/2 top-1/2 z-20
                -translate-x-1/2 -translate-y-1/2
                w-[min(86vw,520px)] aspect-[4/3]
                overflow-hidden rounded-3xl
                border border-white/10
                transition-all duration-300
                hover:shadow-2xl hover:shadow-[#93c5fd]/20
              "
              style={{ boxShadow: "0 30px 60px rgba(0,0,0,.5)" }}
            >
              <img
                loading="lazy"
                src={IMAGES[0].src}
                alt={IMAGES[0].alt}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.04]"
              />
            </div>

            {/* Top chip */}
            <div
              className="
                float-animation absolute z-30
                right-1 sm:right-0 md:-right-2
                top-2 sm:top-[8%]
                w-[44vw] sm:w-44 md:w-[260px]
                aspect-[7/5]
                overflow-hidden rounded-2xl
                border-2 border-white/15 bg-gray-700
              "
              style={{ boxShadow: "0 20px 40px rgba(0,0,0,.4)" }}
            >
              <img
                loading="lazy"
                src={IMAGES[1].src}
                alt={IMAGES[1].alt}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Bottom chip */}
            <div
              className="
                float-animation-delayed absolute z-10
                left-1 sm:left-0 md:-left-4
                bottom-2 sm:bottom-[8%]
                w-[50vw] sm:w-48 md:w-[300px]
                aspect-[7/5]
                overflow-hidden rounded-2xl
                border-2 border-white/15 bg-gray-700
              "
              style={{ boxShadow: "0 20px 40px rgba(0,0,0,.4)" }}
            >
              <img
                loading="lazy"
                src={IMAGES[2].src}
                alt={IMAGES[2].alt}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
