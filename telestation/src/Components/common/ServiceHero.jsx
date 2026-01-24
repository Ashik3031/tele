// src/Components/common/ServiceHero.jsx
import heroContent from "../../data/serviceHeroContent.json";
import Particles from "../ParticlesBackground";

export default function ServiceHero({ serviceKey }) {
  const data = heroContent?.[serviceKey];
  if (!data) return null;

  // ✅ WhatsApp URL (can be overridden per service)
  const defaultWhatsappUrl =
    "https://wa.me/919037362703?text=" + encodeURIComponent(data.whatsappText);

  const whatsappHref = data.whatsappHref || defaultWhatsappUrl;
  const whatsappLabel = data.whatsappLabel || "Free Consultation";

  // ✅ Second CTA (label + link from JSON, fallback to /contact)
  const contactHref = data.contactHref || "/contact";
  const contactLabel = data.contactLabel || "Speak to Us";

  return (
    <section className="relative overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base black */}
        <div className="absolute inset-0 bg-black" />

        {/* Particles layer */}
        <div className="absolute inset-0 pointer-events-none opacity-90">
          <Particles
            className="absolute inset-0"
            particleCount={360}
            particleSpread={10}
            speed={0.14}
            particleColors={["#D9F70D", "#ffffff", "#D9F70D"]}
            moveParticlesOnHover={false}
            particleHoverFactor={1}
            alphaParticles={true}
            particleBaseSize={320}
            sizeRandomness={1}
            cameraDistance={18}
            disableRotation={false}
            pixelRatio={
              typeof window !== "undefined"
                ? Math.min(window.devicePixelRatio || 1, 2)
                : 1
            }
          />
        </div>

        {/* Keep it premium-dark but not "dead black" */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Subtle brand glow */}
        <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-[#D9F70D]/18 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-[26rem] w-[18rem] rounded-full bg-gradient-to-b from-[#4C1D95]/40 via-transparent to-transparent blur-3xl" />

        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-[#D9F70D] via-white to-[#D9F70D] bg-clip-text text-transparent">
            {data.titleHighlight}
          </span>{" "}
          <span className="text-slate-200">{data.titleRest}</span>
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-white sm:text-base">
          {data.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* WhatsApp CTA */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition hover:translate-y-0.5 hover:bg-slate-100"
          >
            {whatsappLabel}
          </a>

          {/* Second CTA */}
          <a
            href={contactHref}
            className="rounded-full bg-[#D9F70D] px-10 py-3 text-sm font-semibold text-black shadow-[0_14px_36px_rgba(217,247,13,0.45)] transition hover:translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#D9F70D]"
          >
            {contactLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
