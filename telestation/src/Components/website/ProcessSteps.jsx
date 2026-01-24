// src/Components/common/ProcessSteps.jsx
const BRAND = "#D9F70D";

const steps = [
  {
    title: "Discovery",
    items: [
      "Define business goals and target audience",
      "Research competitors and market opportunities",
      "Create a clear project roadmap and scope",
    ],
  },
  {
    title: "Design",
    items: [
      "Wireframes and UI concepts aligned with your brand",
      "High-converting page layouts",
      "UX validation for clarity and flow",
    ],
  },
  {
    title: "Development",
    items: [
      "Fast, responsive, scalable development",
      "CMS, forms, and CRM integrations if required",
      "Performance and security optimisation",
    ],
  },
  {
    title: "Launch & Growth",
    items: [
      "SEO setup and analytics configuration",
      "Quality testing and speed optimisation",
      "Post-launch monitoring and continuous improvements",
    ],
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
         How We Design & Build Websites
        </h2>

        <div className="relative mt-10">
          {/* subtle grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(217,247,13,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(217,247,13,0.35) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Timeline row */}
          <div className="relative grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                {/* Top bar shape */}
                <div
                  className={[
                    "relative overflow-hidden rounded-xl border",
                    "shadow-[0_18px_55px_rgba(217,247,13,0.08)]",
                  ].join(" ")}
                  style={{
                    borderColor: "rgba(217,247,13,0.22)",
                    background:
                      "linear-gradient(135deg, rgba(217,247,13,0.35), rgba(217,247,13,0.18))",
                  }}
                >
                  {/* diagonal highlight */}
                  <div
                    className="absolute right-0 top-0 h-full w-2/5 opacity-60"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.0))",
                      clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                  />

                  <div className="px-6 py-7">
                    <h3 className="text-xl font-semibold text-black">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-black/70">
                      Step {i + 1}
                    </p>
                  </div>

                  {/* arrow connector on desktop */}
                  {i !== steps.length - 1 && (
                    <div
                      className="absolute -right-6 top-1/2 hidden h-0 w-0 -translate-y-1/2 md:block"
                      style={{
                        borderTop: "26px solid transparent",
                        borderBottom: "26px solid transparent",
                        borderLeft: `26px solid rgba(217,247,13,0.24)`,
                        filter: "drop-shadow(0 10px 22px rgba(217,247,13,0.10))",
                      }}
                    />
                  )}
                </div>

                {/* content list */}
                <div className="mt-6 space-y-4">
                  {step.items.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold"
                        style={{
                          borderColor: "rgba(217,247,13,0.25)",
                          background: "rgba(217,247,13,0.06)",
                          color: BRAND,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-200/90">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* glow */}
          <div
            className="pointer-events-none absolute -top-10 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "rgba(217,247,13,0.14)" }}
          />
        </div>
      </div>
    </section>
  );
}
