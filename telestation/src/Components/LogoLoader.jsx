import React from "react";

export default function LogoLoader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Logo container with particle effects */}
        <div className="relative grid place-items-center">
          {/* Animated gradient glow */}
          <div className="absolute inset-0 rounded-full blur-3xl opacity-60 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 animate-pulse" />
          
          {/* Multiple rotating rings */}
          <div className="absolute -inset-8 rounded-full border border-white/5" />
          <div className="ring-outer" />
          <div className="ring-middle" />
          <div className="ring-inner" />
          
          {/* Floating particles */}
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
          <div className="particle particle-4" />
          
          {/* Logo with scale animation */}
          <img
            src="/logo1.png"
            alt="Logo"
            draggable={false}
            className="relative w-28 sm:w-32 md:w-36 h-auto object-contain select-none animate-[breathe_2s_ease-in-out_infinite]"
          />
        </div>

        {/* Modern progress bar with gradient */}
        {/* <div className="relative h-1 w-48 sm:w-56 overflow-hidden rounded-full bg-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-[progress_1.5s_ease-in-out_infinite]" />
        </div> */}

        {/* Text with fade animation */}
        {/* <p className="text-white/50 text-xs sm:text-sm tracking-[0.3em] uppercase font-light animate-[fadeInOut_2s_ease-in-out_infinite]">
          {text}
        </p> */}
      </div>

      <style>{`
        /* Logo breathing animation */
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Progress bar animation */
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        /* Shimmer effect */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Text fade */
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* Rotating rings */
        .ring-outer {
          border-radius: 9999px;
          border: 2px solid transparent;
          border-top-color: rgba(6, 182, 212, 0.3);
          border-right-color: rgba(59, 130, 246, 0.2);
          animation: spin 3s linear infinite;
          position: absolute;
          inset: -32px;
        }

        .ring-middle {
          border-radius: 9999px;
          border: 2px solid transparent;
          border-bottom-color: rgba(139, 92, 246, 0.3);
          border-left-color: rgba(59, 130, 246, 0.2);
          animation: spin 2s linear infinite reverse;
          position: absolute;
          inset: -24px;
        }

        .ring-inner {
          border-radius: 9999px;
          border: 1px solid transparent;
          border-top-color: rgba(6, 182, 212, 0.4);
          animation: spin 1.5s linear infinite;
          position: absolute;
          inset: -16px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Floating particles */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.8);
          opacity: 0;
        }

        .particle-1 {
          top: 0;
          left: 50%;
          animation: float 3s ease-in-out infinite;
        }

        .particle-2 {
          top: 50%;
          right: 0;
          animation: float 3s ease-in-out 0.75s infinite;
        }

        .particle-3 {
          bottom: 0;
          left: 50%;
          animation: float 3s ease-in-out 1.5s infinite;
        }

        .particle-4 {
          top: 50%;
          left: 0;
          animation: float 3s ease-in-out 2.25s infinite;
        }

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

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ring-outer,
          .ring-middle,
          .ring-inner,
          .particle,
          img {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}