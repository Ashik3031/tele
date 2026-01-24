import React from "react";

export default function ReelCardLoader({ logoSrc = "/logo1.png" }) {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        {/* Logo container with same particle + rings animation */}
        <div className="relative grid place-items-center">
          {/* glow */}
          <div className="absolute inset-0 rounded-full blur-2xl opacity-60 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 animate-pulse" />

          {/* rings */}
          <div className="ring-outer" />
          <div className="ring-middle" />
          <div className="ring-inner" />

          {/* particles */}
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
          <div className="particle particle-4" />

          {/* logo */}
          <img
            src={logoSrc}
            alt="Loading"
            draggable={false}
            className="relative w-14 sm:w-16 h-auto object-contain select-none animate-[breathe_2s_ease-in-out_infinite]"
          />
        </div>

        {/* tiny progress bar (optional but nice) */}
        <div className="relative h-1 w-24 overflow-hidden rounded-full bg-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-[progress_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .ring-outer {
          border-radius: 9999px;
          border: 2px solid transparent;
          border-top-color: rgba(6, 182, 212, 0.35);
          border-right-color: rgba(59, 130, 246, 0.25);
          animation: spin 3s linear infinite;
          position: absolute;
          inset: -18px;
        }

        .ring-middle {
          border-radius: 9999px;
          border: 2px solid transparent;
          border-bottom-color: rgba(139, 92, 246, 0.35);
          border-left-color: rgba(59, 130, 246, 0.25);
          animation: spin 2.2s linear infinite reverse;
          position: absolute;
          inset: -13px;
        }

        .ring-inner {
          border-radius: 9999px;
          border: 1px solid transparent;
          border-top-color: rgba(6, 182, 212, 0.45);
          animation: spin 1.5s linear infinite;
          position: absolute;
          inset: -8px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
          opacity: 0;
        }

        .particle-1 { top: -22px; left: 50%; animation: float 3s ease-in-out infinite; }
        .particle-2 { top: 50%; right: -22px; animation: float 3s ease-in-out 0.75s infinite; }
        .particle-3 { bottom: -22px; left: 50%; animation: float 3s ease-in-out 1.5s infinite; }
        .particle-4 { top: 50%; left: -22px; animation: float 3s ease-in-out 2.25s infinite; }

        @keyframes float {
          0%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring-outer, .ring-middle, .ring-inner, .particle, img {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
