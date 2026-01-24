import { Sparkles } from "lucide-react";

const BRAND = {
  accent: "#6EF1F7",
  primary: "#1353CD",
  secondary: "#007399",
};

const CareersHero = () => {
  return (
    <div className="relative mx-auto w-[min(1280px,92vw)] px-4 sm:px-6 pt-14 sm:pt-20 pb-10 sm:pb-12 text-center">
      {/* Badge */}
      <div
        className="
          inline-flex items-center gap-2
          backdrop-blur-sm border
          px-4 sm:px-5 py-2
          rounded-full
          mb-6 sm:mb-8
          animate-fadeIn
        "
        style={{
          backgroundColor: `${BRAND.accent}14`,
          borderColor: `${BRAND.accent}4D`,
        }}
      >
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: BRAND.accent }} />
        <span
          className="text-sm sm:text-base md:text-lg font-semibold"
          style={{ color: BRAND.accent }}
        >
          We&apos;re Hiring!
        </span>
      </div>

      {/* Title (optional but recommended for hero balance) */}
      <h1 className="text-white font-extrabold tracking-tight leading-[1.05] text-[clamp(28px,5vw,56px)] animate-fadeIn">
        Build your career at TSPL
      </h1>

      {/* Sub text */}
      <p className="mt-4 sm:mt-5 text-[13px] sm:text-base md:text-lg text-gray-300 max-w-[42rem] mx-auto animate-fadeIn delay-300 leading-relaxed">
        Join a team of innovators, creators, and dreamers shaping tomorrow&apos;s experiences
      </p>
    </div>
  );
};

export default CareersHero;
