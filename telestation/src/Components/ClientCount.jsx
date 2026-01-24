import { useEffect, useState } from "react";

export default function HeroStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, projects: 0, countries: 0 });

  useEffect(() => {
    setIsVisible(true);

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = { clients: 500, projects: 1000, countries: 5 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        clients: Math.floor(targets.clients * easeOut),
        projects: Math.floor(targets.projects * easeOut),
        countries: Math.floor(targets.countries * easeOut),
      });

      if (step >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      value: `${counts.clients}+`,
      title: "Clients",
      sub: "Trusted partnerships worldwide",
      delay: "delay-300",
    },
    {
      value: `${counts.projects}+`,
      title: "Projects Done",
      sub: "Successfully delivered",
      delay: "delay-500",
    },
    {
      value: `${counts.countries}+`,
      title: "Countries",
      sub: "Global presence",
      delay: "delay-700",
    },
  ];

  return (
    <div className="relative bg-black min-h-[100svh] lg:min-h-screen overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:56px_56px] lg:bg-[size:80px_80px]" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />

      <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-6 py-14 min-h-[100svh] lg:min-h-screen">
        <div className="max-w-7xl w-full">
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Vertical founded text + heading aligned */}
            <div className="flex items-start gap-4 sm:gap-6 lg:gap-10">
              {/* Left vertical text */}
              <div className="shrink-0 flex justify-center">
                <div
                  className={`transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  {/* glass wrapper so it stays readable */}
                  <div className="rounded-full bg-black/40 backdrop-blur-md px-2 py-1 ">
                    <div
                      className="
                        text-gray-300/90 font-light uppercase relative
                        tracking-[0.35em] rotate-180
                        text-[10px] sm:text-xs lg:text-sm
                        drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]
                      "
                      style={{ writingMode: "vertical-rl" }}
                    >
                      <span className="inline-block hover:text-white transition-colors duration-300">
                        Founded in 2023, We are a UAE-born Digital Marketing Agency
                      </span>

                      {/* accent line */}
                      <div className="absolute left-1/2 top-0 w-px h-14 sm:h-20 bg-gradient-to-b from-transparent to-gray-500 -translate-x-1/2 -translate-y-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right heading */}
              <div className="min-w-0 flex-1">
                <h1
                  className={`mb-10 sm:mb-12 lg:mb-14 transition-all duration-1000 delay-200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="font-extralight leading-tight">
                    <div className="text-[28px] leading-[1.15] sm:text-4xl sm:leading-tight lg:text-6xl lg:leading-tight">
                      <span className="text-gray-400">Crafting </span>
                      <span className="text-white">transformative digital experiences</span>
                      <span className="text-gray-400">
                        {" "}
                        for the world's leading brands by seamlessly blending{" "}
                      </span>
                      <span className="text-gray-300">design, technology, </span>
                      <span className="text-gray-400">and </span>
                      <span className="text-white">marketing.</span>
                    </div>
                  </div>
                </h1>

                {/* ✅ Stats Grid pulled UP into the gap */}
                <div className="relative z-10 mt-3 sm:mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {stats.map((stat) => (
                    <div
                      key={stat.title}
                      className={`group relative transition-all duration-700 ${stat.delay} ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      <div
                        className="
                          relative bg-gradient-to-br from-gray-900/30 to-black/50
                          backdrop-blur-sm rounded-2xl
                          pt-8 pb-6 px-6
                          sm:pt-9 sm:pb-7 sm:px-7
                          lg:pt-10 lg:pb-8 lg:px-8
                          border border-gray-800/50 hover:border-gray-600
                          transition-all duration-500
                          hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-2
                        "
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent rounded-2xl transition-all duration-500  " />

                        <div className="relative ">
                          {/* count pushed upward */}
                        <div className="mb-3 sm:mb-4">
  <div className="font-black tracking-tight leading-none text-5xl sm:text-6xl lg:text-8xl text-white">
    {stat.value}
  </div>
  <div className="mt-2 h-[3px] w-14 rounded-full bg-[#D9F70D]" />
</div>


                          <div className="text-gray-300 font-light tracking-wide text-xl sm:text-2xl lg:text-3xl">
                            {stat.title}
                          </div>

                          <div className="mt-3 sm:mt-4 text-gray-500 text-sm">
                            {stat.sub}
                          </div>
                        </div>

                        <div className="absolute top-4 right-4 w-2 h-2 bg-white/50 rounded-full group-hover:bg-white transition-colors duration-300" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom decorative line */}
                <div
                  className={`mt-10 sm:mt-14 lg:mt-16 transition-all duration-1000 delay-1000 ${
                    isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                >
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
