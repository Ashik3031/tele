import React, { useEffect, useMemo, useRef, useState } from "react";

const BRAND = {
  accent: "#6EF1F7",
  primary: "#1353CD",
  secondary: "#007399",
};

/* -----------------------------------
   ✅ Stable TextType (no stuck, loop)
   - Uses setTimeout (not setInterval)
   - Props: text: string[]
------------------------------------ */
const TextType = ({
  text = [],
  typingSpeed = 60,
  pauseDuration = 900,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
}) => {
  const lines = Array.isArray(text) ? text : [String(text)];

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!lines.length) return;

    const currentLine = lines[lineIndex] ?? "";

    // clear previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // typing characters
    if (charIndex < currentLine.length) {
      timerRef.current = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, typingSpeed);
    } else {
      // pause at end then move to next line
      timerRef.current = setTimeout(() => {
        setLineIndex((i) => (i + 1) % lines.length);
        setCharIndex(0);
      }, pauseDuration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [charIndex, lineIndex, lines, typingSpeed, pauseDuration]);

  const currentLine = lines[lineIndex] ?? "";
  const typed = currentLine.slice(0, charIndex);
  const isTyping = charIndex < currentLine.length;

  return (
    <span className={`inline-block whitespace-pre-line break-words ${className}`}>
      {typed}
      {showCursor && (
        <span
          className={`inline-block ml-1 ${
            isTyping ? "animate-pulse" : "opacity-60"
          }`}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default function CareersIntroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const images = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop",
        alt: "TSPL team operations",
      },
      {
        src: "/image/service.jpg",
        alt: "Customer engagement desk",
      },
      {
        src: "/image/service1.jpg",
        alt: "Team collaboration",
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black text-white"
    >
      {/* Background glows + grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-3xl opacity-25 animate-[pulse_9s_ease-in-out_infinite]"
          style={{ backgroundColor: `${BRAND.accent}12` }}
        />
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 animate-[pulse_11s_ease-in-out_infinite]"
          style={{ backgroundColor: `${BRAND.primary}12` }}
        />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${BRAND.accent}25 1px, transparent 1px),
                             linear-gradient(90deg, ${BRAND.accent}25 1px, transparent 1px)`,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ✅ nav-safe spacing */}
      <div
        className="
          relative mx-auto w-[min(1180px,92vw)] px-4 sm:px-6
          pt-[calc(env(safe-area-inset-top)+96px)]
          sm:pt-[calc(env(safe-area-inset-top)+110px)]
          md:pt-20 lg:pt-24
          pb-14 sm:pb-16 md:pb-24
        "
      >
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center">
          {/* LEFT TEXT */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Heading */}
            <h2 className="mt-2 font-extrabold leading-[1.06] tracking-tight text-[clamp(28px,7vw,64px)]">
  <span className="text-white">
    Join{" "}
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage: `linear-gradient(90deg, ${BRAND.accent}, #ffffff)`,
      }}
    >
      TSPL
    </span>
    .
  </span>
  <br />
  <span className="text-white/85">Telecom operations.</span>
  <br />
  <span className="relative inline-block" style={{ color: BRAND.accent }}>
   <TextType
      text={["Real impact", "Real growth", "Real careers"]}
      typingSpeed={55}
      pauseDuration={850}
    />
  </span>
</h2>


            {/* Buttons */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4">
              <a
  href="#openings"
  className="
    w-full sm:w-auto
    inline-flex items-center justify-center gap-2
    whitespace-nowrap
    rounded-full px-4 sm:px-7 py-3.5
    text-[12px] sm:text-base font-bold text-black
    transition hover:brightness-110 active:scale-[0.98]
  "
  style={{
    backgroundColor: BRAND.accent,
    boxShadow: `0 18px 60px -35px ${BRAND.accent}`,
  }}
>
  <span className="truncate">View  Positions</span>
  <span className="text-lg">→</span>
</a>

             <a
  href="/about"
  className="
    w-full sm:w-auto
    inline-flex items-center justify-center
    whitespace-nowrap
    rounded-full px-4 sm:px-7 py-3.5
    text-[12px] sm:text-base font-semibold
    text-white/90 border border-white/15
    bg-white/5 backdrop-blur-sm
    transition hover:bg-white/10 hover:border-white/30 active:scale-[0.98]
  "
>
  <span className="truncate">Learn About TSPL</span>
</a>

            </div>

            
          </div>

          {/* RIGHT IMAGE COLLAGE */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 h-[380px] sm:h-[460px] lg:h-[560px]">
            {/* Large image */}
            <div
              className={`row-span-2 rounded-3xl overflow-hidden bg-neutral-900 group relative transition-all duration-1000 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.accent}25, ${BRAND.primary}20)`,
                }}
              />
              <div className="relative h-full overflow-hidden rounded-3xl">
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-70 group-hover:opacity-45 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
                    <p className="text-sm font-medium text-white">
                      High-performance delivery culture
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top right */}
            <div
              className={`rounded-3xl overflow-hidden bg-neutral-900 group relative transition-all duration-1000 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.primary}25, ${BRAND.accent}18)`,
                }}
              />
              <div className="relative h-full overflow-hidden rounded-3xl">
                <img
                  src={images[1].src}
                  alt={images[1].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-70 group-hover:opacity-45 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-medium text-white">
                      Telecom Operations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom right */}
            <div
              className={`rounded-3xl overflow-hidden bg-neutral-900 group relative transition-all duration-1000 ease-out delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.accent}22, ${BRAND.secondary}18)`,
                }}
              />
              <div className="relative h-full overflow-hidden rounded-3xl">
                <img
                  src={images[2].src}
                  alt={images[2].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-70 group-hover:opacity-45 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-medium text-white">
                      Growth & Training
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END collage */}
        </div>
      </div>
    </section>
  );
}
