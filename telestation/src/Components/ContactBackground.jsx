import React from "react";

export default function ContactBackground({
  accent = "#37C6D9",
  primary = "#007399",
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* soft animated blobs */}
      <div
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-[110px] opacity-45 animate-blobA"
        style={{
          background: `radial-gradient(circle at center, ${accent}55, transparent 65%)`,
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full blur-[120px] opacity-35 animate-blobB"
        style={{
          background: `radial-gradient(circle at center, ${primary}66, transparent 62%)`,
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[620px] w-[620px] rounded-full blur-[130px] opacity-25 animate-blobC"
        style={{
          background: `radial-gradient(circle at center, ${accent}44, transparent 65%)`,
        }}
      />

      {/* subtle drifting grid */}
      <div className="absolute inset-0 opacity-[0.22] animate-gridDrift
        bg-[linear-gradient(rgba(55,198,217,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(55,198,217,0.07)_1px,transparent_1px)]
        bg-[size:90px_90px]
        [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]
      " />

      {/* vignette for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/85" />

      {/* keyframes */}
      <style>{`
        @keyframes blobA {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(38px, 22px) scale(1.10); }
        }
        @keyframes blobB {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-34px, 28px) scale(1.08); }
        }
        @keyframes blobC {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(26px, -18px) scale(1.12); }
        }
        @keyframes gridDrift {
          0% { background-position: 0px 0px, 0px 0px; }
          100% { background-position: 140px 160px, 160px 140px; }
        }
        .animate-blobA { animation: blobA 10s ease-in-out infinite; }
        .animate-blobB { animation: blobB 12s ease-in-out infinite; }
        .animate-blobC { animation: blobC 14s ease-in-out infinite; }
        .animate-gridDrift { animation: gridDrift 18s linear infinite; }
      `}</style>
    </div>
  );
}
