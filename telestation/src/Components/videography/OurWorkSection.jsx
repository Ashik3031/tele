// src/components/videography/OurWorkSection.jsx
import React from "react";
import { Play } from "lucide-react";

const REELS = [
  "https://www.instagram.com/reel/DSpgPC0kW2W/",
  "https://www.instagram.com/reel/DOvthrEk2Os/",
  "https://www.instagram.com/reel/DO8Lp-qky_x/",
  "https://www.instagram.com/reel/DPGmgjUEzEe/",
  "https://www.instagram.com/reel/DQ6kuyrkm8k/",
  "https://www.instagram.com/reel/DSErcYjkiPD/",
];

function embedUrl(reelUrl) {
  return `${reelUrl}embed/`;
}

function CroppedReelCard({ reelUrl }) {
  return (
    <a
      href={reelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label="Open Instagram Reel"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d] shadow-[0_18px_55px_rgba(0,0,0,0.55)]">
        {/* Cropped embed container */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            title="IG Reel Preview"
            src={embedUrl(reelUrl)}
            className="absolute left-1/2 top-1/2"
            style={{
              width: "120%",
              height: "100%",
              transform: "translate(-50%, -50%) scale(1.25)",
              border: 0,

              // ✅ IMPORTANT: allow click to go to <a> not iframe
              pointerEvents: "none",
            }}
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

        {/* ✅ Play button overlay (clicking goes to IG link) */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          {/* <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 shadow-[0_0_40px_rgba(217,247,13,0.6)] ring-2 ring-[#D9F70D]/70 transition group-hover:scale-105">
            <Play className="ml-1 h-6 w-6 text-[#D9F70D]" />
          </div> */}
        </div>

        {/* Brand bottom line */}
        {/* <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-80"
          style={{
            background:
              "linear-gradient(90deg, transparent, #D9F70D, transparent)",
          }}
        /> */}
      </div>
    </a>
  );
}

export default function OurWorkSection() {
  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="mb-10 flex items-center justify-between gap-6">
          <h2 className="text-left text-3xl font-extrabold leading-[0.95] sm:text-5xl">
            <span className="text-[#D9F70D]">LATEST</span>
            <br />
            <span className="text-[#D9F70D]">WORK</span>
          </h2>

          <a
            href="https://www.instagram.com/digtel.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#D9F70D] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition hover:brightness-110"
          >
            View Our Work
          </a>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REELS.map((url) => (
            <CroppedReelCard key={url} reelUrl={url} />
          ))}
        </div>
      </div>
    </section>
  );
}
