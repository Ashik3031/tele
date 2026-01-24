// src/components/videography/ThinkingWithUs.jsx

const POINTS = [
  "Founded in 2005 in Dubai, UAE.",
  "Over 300 active clients.",
  "Experience in over 30 industries from high-profile B2C businesses to highly niche and specialised organisations.",
  "Over 50 in-house digital marketing specialists.",
  "Full spectrum of digital marketing services provided.",
  "Clients include leading global brands plus many local home-grown businesses.",
  "Offices located in Dubai, Manchester, Melbourne and New York.",
];

export default function ThinkingWithUs() {
  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
        {/* LEFT: heading + bullets */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Thinking about working with{" "}
            <span className="text-[#D9F70D]">Digtel?</span>
          </h2>

          <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-slate-100 sm:text-base">
            {POINTS.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                {/* arrow icon */}
                <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-sm border border-[#D9F70D]/40 text-[#D9F70D]">
                  {/* down-right arrow */}
                  <span className="text-lg leading-none">↘</span>
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: floating glass bars */}
        <div className="relative flex flex-1 items-center justify-center lg:justify-end">
          <div className="flex w-full max-w-sm flex-col gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`glass-bar h-20 rounded-[999px] border border-white/10 bg-gradient-to-r from-[#1a1a1a] via-[#2b2b2b] to-[#101010] 
                relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)]`}
                style={{
                  animationDelay: `${i * 0.6}s`,
                }}
              >
                {/* inner highlight strip to mimic glossy image */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-white/35 via-white/5 to-transparent blur-[2px] opacity-70" />
                  <div className="absolute -inset-y-6 left-1/2 w-[65%] rotate-3 bg-gradient-to-r from-[#D9F70D]/0 via-[#D9F70D]/40 to-transparent blur-xl opacity-70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating animation */}
      <style>{`
        .glass-bar {
          animation: glassFloat 7s ease-in-out infinite;
        }
        @keyframes glassFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
