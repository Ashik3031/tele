import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BRAND = {
  primary: "#007399",
  accent: "#37C6D9",
};

const DEFAULT_SECTIONS = [
  {
    number: "01",
    title: "B2B Telecommunication",
    description:
      "We generate targeted leads and qualify prospects with a personalized approach—building stronger relationships and long-term brand awareness.",
    image: "/image/about1.jpg",
    tags: ["Lead gen", "Qualification", "Follow-ups"],
  },
  {
    number: "02",
    title: "B2C Telecommunication",
    description:
      "We build customer relationships through personal interaction—understanding challenges and presenting targeted offers that drive measurable outcomes.",
    image: "/image/about2.jpg",
    tags: ["Customer care", "Offers", "Retention"],
  },
  {
    number: "03",
    title: "Inbound Telemarketing",
    description:
      "When customers reach out, we respond with speed, clarity, and a human-first approach—converting inbound interest into trust and retention.",
    image: "/image/about3.jpg",
    tags: ["Inbound", "Support", "Upsell"],
  },
  {
    number: "04",
    title: "Outbound Telemarketing",
    description:
      "We proactively connect with prospects using a tactical outreach process—improving conversions while keeping customer experience at the center.",
    image: "/image/about1.jpg",
    tags: ["Outbound", "Conversion", "Insights"],
  },
  {
    number: "05",
    title: "Cold Calling",
    description:
      "Cold calling connects your brand with potential customers who haven't shown prior interest—turning first conversations into real opportunities.",
    image: "/image/about2.jpg",
    tags: ["Prospecting", "Scripts", "Qualification"],
  },
  {
    number: "06",
    title: "Consulting Service",
    description:
      "Telestation delivers end-to-end consulting with action plans, assessments, and roadmaps to run call center operations smoothly.",
    image: "/image/about3.jpg",
    tags: ["Assessments", "Roadmaps", "Optimization"],
  },
  {
    number: "07",
    title: "Product Support",
    description:
      "We maximize customer satisfaction with multi-channel support and empathetic communication—building trust and long-term retention.",
    image: "/image/about1.jpg",
    tags: ["Support", "Multi-channel", "Retention"],
  },
  {
    number: "08",
    title: "Direct Sale",
    description:
      "We help you sell virtually through structured conversations, instant feedback, and tailored messaging—driving higher conversions.",
    image: "/image/about2.jpg",
    tags: ["Conversion", "Feedback", "Sales enablement"],
  },
];

function StackingCard({ item, index, total, scrollYProgress }) {
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scaleRange = [index / total, (index + 1) / total];
  const scale = useTransform(scrollYProgress, scaleRange, [1, targetScale]);

  // little fade/blur in as it becomes active (feels premium)
  const opacity = useTransform(scrollYProgress, scaleRange, [1, 0.92]);
  const blur = useTransform(scrollYProgress, scaleRange, [0, 1.5]);

  return (
    <div
      className="sticky top-0 h-screen flex items-center justify-center"
      style={{ top: `${index * 20}px` }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          filter: blur?.get ? `blur(${blur.get()}px)` : undefined,
        }}
        className="
          relative
          w-[min(1150px,92vw)]
          rounded-[34px]
          overflow-hidden
          border border-white/10
          bg-white/[0.06]
          backdrop-blur-2xl
          shadow-[0_40px_130px_rgba(0,0,0,0.55)]
          origin-top
        "
      >
        {/* subtle gradient wash */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(900px 420px at 15% 20%, rgba(55,198,217,0.16), transparent 55%), radial-gradient(700px 380px at 85% 75%, rgba(0,115,153,0.20), transparent 60%)",
          }}
        />

        {/* top hairline glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative grid lg:grid-cols-2 gap-10 p-7 sm:p-10 lg:p-12">
          {/* LEFT */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center border border-white/10 bg-black/30">
                  <span className="text-xl font-bold text-white">
                    {item.number}
                  </span>
                </div>

                <div className="h-px w-16 bg-white/10" />
                <span className="text-sm font-semibold tracking-wider uppercase text-white/55">
                  Telestation
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.05]">
                {item.title}
              </h3>

              <p className="mt-5 text-lg sm:text-xl leading-relaxed text-white/70 max-w-[56ch]">
                {item.description}
              </p>

              {!!item.tags?.length && (
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="
                        rounded-full
                        border border-white/10
                        bg-white/5
                        px-4 py-2
                        text-sm
                        text-white/70
                        backdrop-blur-xl
                      "
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            {/* <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                className="
                  px-7 py-3.5 rounded-full text-black font-semibold
                  shadow-[0_18px_60px_rgba(55,198,217,0.18)]
                  transition hover:opacity-90
                "
                style={{ backgroundColor: BRAND.accent }}
              >
                Explore
              </button>

              <button
                className="
                  px-7 py-3.5 rounded-full font-semibold
                  border border-white/12
                  bg-white/5
                  text-white/85
                  hover:bg-white/8
                  transition
                "
              >
                Learn more
              </button>
            </div> */}
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              {/* cinematic overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(55,198,217,0.12),transparent_55%)]" />
            </div>

            {/* glow blob */}
            <div
              className="absolute -z-10 -top-10 -right-10 h-48 w-48 rounded-full blur-3xl"
              style={{ backgroundColor: `${BRAND.accent}22` }}
            />
            <div
              className="absolute -z-10 -bottom-12 -left-10 h-48 w-48 rounded-full blur-3xl"
              style={{ backgroundColor: `${BRAND.primary}22` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BottomSection() {
  return (
    <section className="bg-black py-14">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
          {/* background glow */}
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(900px_380px_at_10%_30%,rgba(55,198,217,0.14),transparent_60%),radial-gradient(700px_340px_at_90%_70%,rgba(0,115,153,0.18),transparent_60%)]" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="text-sm font-semibold tracking-wider uppercase text-white/55">
                Telestation
              </p>
              <h3 className="mt-1 text-2xl sm:text-3xl font-semibold text-white">
                Ready to scale your sales?
              </h3>
              <p className="mt-2 text-white/70">
                Let’s plan a strategy that improves conversions and customer trust.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="px-6 py-3 rounded-full font-semibold text-black hover:opacity-90 transition shadow-[0_18px_60px_rgba(55,198,217,0.18)]"
                style={{ backgroundColor: BRAND.accent }}
              >
                Get started
              </a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-full font-semibold border border-white/12 bg-white/5 text-white/85 hover:bg-white/8 transition"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>

        {/* divider fade */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}

export default function PremiumServicesAlt({ sections }) {
  const data = useMemo(
    () => (sections?.length ? sections : DEFAULT_SECTIONS),
    [sections]
  );

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {/* STACK */}
      <div style={{ height: `${data.length * 120}vh` }}>
        {data.map((item, i) => (
          <StackingCard
            key={`${item.number}-${i}`}
            item={item}
            index={i}
            total={data.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <BottomSection />
    </section>
  );
}
