// src/components/digital-marketing/HeroBackground.jsx
export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* main artwork image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('/images/dm-hero-rocket.jpg')", // change path
        }}
      />

      {/* dark overlay + yellowish glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-[#05020B]" />

      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#D9F70D]/35 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-64 w-full bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* subtle grid at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
    </div>
  );
}
