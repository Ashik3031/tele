import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * Website screenshot preview (image) — avoids iframe embedding issues.
 */
const getShot = (url) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`;

const PROJECTS = [
  {
    title: "Pure Hygiene",
    href: "https://purehygiene.ae/",
    tags: ["Website", "UI/UX"],
  },
  {
    title: "Cekir Bazaar",
    href: "https://cekirbazaar.com/",
    tags: ["Website", "UI/UX"],
  },
  {
    title: "Bella Closet",
    href: "https://bellaluxurycloset.com/",
    tags: ["Website", "UI/UX"],
  },
  {
    title: "Supreme Luxury Car Rentals",
    href: "supremeluxurycarrentals.com",
    tags: ["Website", "UI/UX"],
  },
];

function LaptopMockup({ url, title }) {
  return (
    <div className="relative w-full max-w-[380px] animate-fade-in sm:max-w-[460px]">
      {/* Screen */}
      <div className="relative rounded-t-xl border border-white/15 bg-[#0b0b0d] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105">
        {/* Top bar */}
        <div className="mb-2 flex items-center gap-1.5 px-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500/90" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500/90" style={{ animationDelay: '0.1s' }} />
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500/90" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Website preview */}
        <div className="overflow-hidden rounded-lg bg-white">
          <img
            src={getShot(url)}
            alt={`${title} laptop preview`}
            className="h-[200px] sm:h-[235px] w-full object-cover object-top transition-transform duration-500 hover:scale-110"

            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' font-size='22' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3EPreview unavailable%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </div>

      {/* Base */}
      <div className="h-3 rounded-b-xl bg-gradient-to-b from-white/15 to-white/5" />
      <div className="mx-auto -mt-[2px] h-[6px] w-32 rounded-b-xl bg-white/10" />
    </div>
  );
}

function MobileMockup({ url, title }) {
  return (
    <div className="absolute -right-4 bottom-0 w-[100px] rotate-[3deg] animate-slide-in-right">
      <div className="relative overflow-hidden rounded-[18px] border border-white/15 bg-[#0b0b0d] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:rotate-0 hover:scale-105">
        {/* notch */}
        <div className="mx-auto mb-1.5 h-[8px] w-12 rounded-full bg-black/70" />

        <div className="overflow-hidden rounded-[14px] bg-white">
          <img
            src={getShot(url)}
            alt={`${title} mobile preview`}
            className="h-[160px] w-full object-cover object-top transition-transform duration-500 hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='1200'%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' font-size='20' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3EPreview unavailable%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects({
  items = PROJECTS,
  title = "Featured Projects",
  moreWorkLabel = "More Work",
  moreWorkHref = "/work",
}) {
  return (
    <section className="relative w-full overflow-hidden bg-black py-16">
      {/* Animated background elements */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-blob rounded-full bg-[#D9F70D]/10 blur-3xl" />
        <div className="animation-delay-2000 absolute right-1/4 top-1/3 h-96 w-96 animate-blob rounded-full bg-[#D9F70D]/15 blur-3xl" />
        <div className="animation-delay-4000 absolute bottom-1/4 left-1/3 h-96 w-96 animate-blob rounded-full bg-[#D9F70D]/10 blur-3xl" />
      </div> */}

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 flex animate-fade-in-down items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-white">{title}</h2>

          {/* <a
            href={moreWorkHref}
            className="rounded-full border border-[#D9F70D]/50 bg-[#D9F70D]/10 px-6 py-2.5 text-sm font-medium text-[#D9F70D] backdrop-blur-sm transition-all hover:scale-105 hover:border-[#D9F70D] hover:bg-[#D9F70D] hover:text-black"
          >
            {moreWorkLabel}
          </a> */}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {items.slice(0, 4).map((p, idx) => (
            <div
              key={idx}
              className="group animate-fade-in-up overflow-hidden rounded-2xl bg-zinc-900/80 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[#D9F70D]/20"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* subtle glow */}
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#D9F70D]/20 blur-3xl transition-opacity duration-300 group-hover:opacity-60" />
                <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-[#D9F70D]/15 blur-3xl transition-opacity duration-300 group-hover:opacity-60" />
              </div>

              <div className="relative p-6">
                {/* Mockups row */}
                <div className="relative mb-6 flex h-[290px] sm:h-[330px] items-center justify-center">

                  <LaptopMockup url={p.href} title={p.title} />
                  {/* <MobileMockup url={p.href} title={p.title} /> */}
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-semibold text-white transition-colors group-hover:text-[#D9F70D]">
                  {p.title}
                </h3>

                {/* Buttons */}
                <div className="flex gap-3">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#D9F70D]/50 bg-[#D9F70D]/10 px-5 py-2 text-sm font-medium text-[#D9F70D] backdrop-blur-sm transition-all hover:scale-105 hover:border-[#D9F70D] hover:bg-[#D9F70D] hover:text-black"
                  >
                    WEBSITE
                  </a>
                  {/* <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#D9F70D]/50 bg-[#D9F70D]/10 px-5 py-2 text-sm font-medium text-[#D9F70D] backdrop-blur-sm transition-all hover:scale-105 hover:border-[#D9F70D] hover:bg-[#D9F70D] hover:text-black"
                  >
                    UI/UX
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px) rotate(3deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(3deg);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.3s both;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}