export default function ClientsMarquee({
  label = "Trusted by leading brands",
  items = [],
  speed = 30, // seconds
  glow = "#5B21FF",
  cardClassName = "",
}) {
  const safeItems = Array.isArray(items) ? items : [];
  const loopItems = safeItems.length ? [...safeItems, ...safeItems, ...safeItems] : [];

  return (
    <section className="relative overflow-hidden bg-black py-16">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse"
          style={{ background: `${glow}66` }}
        />
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

      <div className="mx-auto max-w-6xl text-center mb-10">
        <p className="text-sm font-semibold tracking-[0.25em] text-slate-400 uppercase">
          {label}
        </p>
      </div>

      <div className="relative flex w-full items-center">
        <div className="flex animate-marquee gap-10 whitespace-nowrap">
          {loopItems.map((logo, idx) => (
            <div
              key={`${logo?.name || "logo"}-${idx}`}
              className={[
                "group flex h-28 min-w-[220px] items-center justify-center rounded-2xl bg-white/5 px-10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105",
                cardClassName,
              ].join(" ")}
            >
              <img
                src={logo?.src}
                alt={logo?.name || "Client logo"}
                className="h-24 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
