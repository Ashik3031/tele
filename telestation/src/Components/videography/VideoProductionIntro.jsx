// src/components/videography/VideoProductionIntro.jsx
"use client";

import ScrollReveal from "../ScrollReveal";

const VIDEO_PRODUCTION_INTRO = {
  label: "VIDEOGRAPHY",
  heading: "High-quality video production can bring your business to life",
  lead:
    "Purpose-led production that looks premium, communicates clearly, and performs across every channel.",
  paragraphs: [
    {
      text:
        "Our team of content creators is ready to bring your business to life with video content by encapsulating your brand's essence in clips your customers are excited to consume.",
      emphasis: true,
    },
    {
      text:
        "Video content is multifaceted and can convey and showcase meaning in ways that other forms of content cannot. From capturing emotions to demonstrating processes and expressing values, there is a lot of potential for businesses in all industries when it comes to video.",
      emphasis: false,
    },
    {
      text:
        "Video has become an expectation on behalf of the consumer and a 'must' for marketing teams, yet there are misconceptions when it comes to budget and strategy. Working with an agency like ours, your videos will be handled by an in-house team of creators who will carry your project from strategy through to delivery, without blowing the budget.",
      emphasis: false,
    },
    {
      text:
        "Our videos are rooted in purpose, clarity of communication, and an end product that resonates with the audience and encourages engagement. This way, videos become a high-value asset for your business's content library, your audience's liking, and your space in the digital world, as search engines favor this form of content.",
      emphasis: true,
    },
  ],
  chips: ["Brand Films", "Product Videos", "Reels & Shorts", "Events", "Editing"],
  button: {
    label: "Request a Quotation",
  },
};

export default function VideoProductionIntro() {
  const content = VIDEO_PRODUCTION_INTRO;

  return (
    <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20">
      {/* subtle background (premium, not noisy) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-50"
          style={{ background: "rgba(217,247,13,0.10)" }}
        />
        <div
          className="absolute -right-32 top-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
          style={{ background: "rgba(217,247,13,0.08)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_58%)]" />
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(217,247,13,0.25) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(217,247,13,0.25) 1px, transparent 1px)`,
              backgroundSize: "72px 72px",
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* top label */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9F70D]/20 bg-white/5 px-4 py-1.5 text-xs font-thin tracking-[0.22em] text-slate-200/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#D9F70D] shadow-[0_0_16px_rgba(217,247,13,0.55)]" />
            {content.label}
          </div>
        </div>

        {/* heading (ScrollReveal) */}
        <div className="mt-6 text-center">
          <ScrollReveal
            enableBlur
            blurStrength={6}
            baseOpacity={0.08}
            baseRotation={2}
            rotationEnd="bottom 85%"
            wordAnimationEnd="bottom 78%"
            containerClassName="mx-auto max-w-4xl"
            textClassName="text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.12] tracking-tight font-thin" 
            as="h2"
          >
            {content.heading}
          </ScrollReveal>

          <div className="mx-auto mt-4 max-w-3xl">
            <ScrollReveal
              enableBlur={false}
              baseOpacity={0.25}
              baseRotation={0}
              wordAnimationEnd="bottom 75%"
              containerClassName=""
              textClassName="text-md  sm:text-base leading-7 text-slate-200/80"
              as="p"
            >
              {content.lead}
            </ScrollReveal>
          </div>

          {/* chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {content.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200/80 backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* body block (premium text card) */}
        <div className="mx-auto mt-10 max-w-4xl">
         
            <div className="space-y-5">
              {content.paragraphs.map((p, idx) => (
                <ScrollReveal
                  key={idx}
                  enableBlur
                  blurStrength={p.emphasis ? 4 : 3}
                  baseOpacity={0.2}
                  baseRotation={0}
                  rotationEnd="bottom 78%"
                  wordAnimationEnd="bottom 72%"
                  containerClassName=""
                  textClassName={`text-lg  font-thin leading-7 text-slate-100/90 ${
                    p.emphasis ? "font-thin text-white" : ""
                  }`}
                  as="p"
                >
                  {p.text}
                </ScrollReveal>
              ))}
            </div>

            {/* bottom CTA row */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <ScrollReveal
                enableBlur={false}
                baseOpacity={0.2}
                baseRotation={0}
                wordAnimationEnd="bottom 75%"
                as="div"
                textClassName=""
              >
                <button
                  type="button"
                  className="rounded-full bg-[#D9F70D] px-10 py-3 text-md font-thin text-black shadow-[0_18px_45px_rgba(217,247,13,0.18)] transition hover:translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#D9F70D]"
                >
                  {content.button.label}
                </button>
              </ScrollReveal>

              
            </div>
          </div>
        </div>
      
    </section>
  );
}
