import { useEffect, useState } from "react";

// ✅ TSPL Brand (edit if you have exact hex)
const BRAND = {
  primary: "#0B2C73",
  accent: "#37C6D9",
  textOnDark: "rgba(255,255,255,0.82)",
  mutedOnDark: "rgba(255,255,255,0.68)",
};

// ScrambledText component
const ScrambledText = ({ children, className, duration = 2.2, scrambleChars = ".:" }) => {
  const [displayText, setDisplayText] = useState(children);

  useEffect(() => {
    const chars = scrambleChars.split("");
    const targetText = children;
    let frame = 0;
    const totalFrames = duration * 60;

    const interval = setInterval(() => {
      if (frame >= totalFrames) {
        setDisplayText(targetText);
        clearInterval(interval);
        return;
      }

      const progress = frame / totalFrames;
      const revealIndex = Math.floor(progress * targetText.length);

      const scrambled = targetText
        .split("")
        .map((char, i) => {
          if (i < revealIndex) return char;
          if (char === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);
      frame++;
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [children, duration, scrambleChars]);

  return <span className={className}>{displayText}</span>;
};

// LiquidEther mock (kept)
const LiquidEther = ({ colors }) => (
  <div className="w-full h-full relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-60"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, ${colors[0]}26, transparent 60%),
          radial-gradient(circle at 80% 70%, ${colors[1]}22, transparent 60%),
          radial-gradient(circle at 50% 50%, ${colors[2]}18, transparent 70%)
        `,
      }}
    />
  </div>
);

// Mock navbar placeholder
const PulseNavbar = () => <div className="absolute top-0 left-0 right-0 z-10 p-6" />;

export default function AboutHeadSection() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(touch);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100svh",
        minHeight: "100svh",
        position: "relative",

        // ✅ BLACK BACKGROUND (main fix)
        background: "#000000",

        overflow: "hidden",
        touchAction: "pan-y",
      }}
    >
      <PulseNavbar />

      {/* Background liquid effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: isTouch ? "none" : "auto",
          touchAction: "pan-y",
        }}
      >
        <LiquidEther colors={[BRAND.accent, BRAND.primary, BRAND.accent]} />
      </div>

      {/* ✅ Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(0,0,0,0.50), rgba(0,0,0,0.78))",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl w-full space-y-6 md:space-y-8">
          {/* Small label */}
          <div className="overflow-hidden">
            <p
              className="text-xs md:text-sm tracking-[0.4em] uppercase font-medium animate-fade-in"
              style={{
                color: "rgba(255,255,255,0.65)",
                animationDelay: "0.25s",
                animationFillMode: "backwards",
              }}
            >
              Telecom BPO • OSP Licensed • Customer Care
            </p>
          </div>

          {/* Headline */}
          <div className="space-y-4 md:space-y-5">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-7xl leading-[1.08] tracking-tight">
              <ScrambledText
                className="text-transparent bg-clip-text drop-shadow-[0_0_36px_rgba(55,198,217,0.22)] animate-gradient"
                duration={2.1}
                scrambleChars=".:"
              >
               We help businesses grow by transforming customer interactions into lasting relationships through smart telecommunication.
              </ScrambledText>
            </h1>

            {/* underline accent */}
            <div className="flex items-center gap-3">
              <div
                className="h-[2px] w-24 md:w-44 rounded-full animate-expand origin-left"
                style={{
                  background: `linear-gradient(to right, ${BRAND.accent}, transparent)`,
                  animationDelay: "2.2s",
                  animationFillMode: "backwards",
                }}
              />
              <div
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: BRAND.accent, animationDelay: "2.35s" }}
              />
            </div>
          </div>

          

          
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 0.9; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in { animation: fade-in 0.85s ease-out; }
        .animate-expand { animation: expand 1s ease-out; }
        .animate-gradient {
          background-image: linear-gradient(90deg, ${BRAND.accent}, #ffffff, ${BRAND.accent});
          background-size: 200% 100%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
