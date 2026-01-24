// src/components/digital-marketing/DigitalMarketingHero.jsx
"use client"; // only if you're in Next.js app router

import HeroBackground from "./HeroBackground";
import HeroCopy from "./HeroCopy";

import ImageTrail from "../ImageTrail";

const TRAIL_IMAGES = [
  "/image/about1.jpg",
  "/image/digital.jpg",
  "/image/branding.jpg",
  "/image/production.jpg",
];

export default function DigitalMarketingHero() {
  return (
    <section className="relative overflow-hidden bg-[#05020B] text-white">
      {/* background artwork + gradients */}
      {/* <HeroBackground /> */}

      {/* content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4  md:px-6 lg:flex-row lg:items-center lg:gap-16 ">
        {/* LEFT: copy + hover image trail */}
        <div className="relative flex-1">
          <HeroCopy />

          {/* GSAP image trail overlay (hover here) */}
          <div className="pointer-events-auto absolute inset-0">
            <ImageTrail items={TRAIL_IMAGES} variant={2} />
          </div>
        </div>

        {/* RIGHT: form */}
        {/* <div className="w-full max-w-md lg:flex-1">
          <HeroFormCard />
        </div> */}
      </div>
    </section>
  );
}
