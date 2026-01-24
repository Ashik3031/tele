import React from "react";

const BRAND = {
  accent: "#6EF1F7",
  primary: "#1353CD",
  secondary: "#007399",
};

const process = [
  { step: "01", title: "Apply", desc: "Submit your application" },
  { step: "02", title: "Review", desc: "We review your profile" },
  { step: "03", title: "Interview", desc: "Meet the team" },
  { step: "04", title: "Offer", desc: "Join us!" },
];

const CareersTimeline = () => {
  return (
    <section className="relative text-white">
      <div className="mx-auto w-[min(1100px,92vw)] px-4 sm:px-6 pb-14 sm:pb-16 md:pb-20">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-10 sm:mb-14 md:mb-20">
          Our Hiring Process
        </h3>

        {/* ✅ Desktop horizontal line (centered & responsive width) */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[118px] w-[min(860px,72vw)] h-[3px] rounded-full"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${BRAND.accent}, transparent)`,
          }}
        />

        {/* ✅ Mobile/tablet: vertical timeline look */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-10 md:gap-12 relative">
          {process.map((item, i) => (
            <div key={i} className="relative text-center md:text-center">
              {/* Dot / Step */}
              <div className="relative z-10 flex justify-center">
                <div
                  className="
                    w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                    rounded-xl flex items-center justify-center
                    text-black text-base sm:text-lg md:text-xl font-bold
                    shadow-lg
                  "
                  style={{
                    backgroundColor: BRAND.accent,
                    boxShadow: `0 18px 50px -28px ${BRAND.accent}`,
                  }}
                >
                  {item.step}
                </div>
              </div>

              <h4 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">
                {item.title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-white/60 max-w-[22rem] mx-auto">
                {item.desc}
              </p>

              {/* ✅ Mobile connector line (shorter on small, taller on bigger) */}
              {i < process.length - 1 && (
                <div
                  className="md:hidden w-1 mx-auto mt-5 sm:mt-6 rounded-full"
                  style={{
                    height: i === process.length - 2 ? "28px" : "34px",
                    backgroundColor: `${BRAND.accent}66`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersTimeline;
