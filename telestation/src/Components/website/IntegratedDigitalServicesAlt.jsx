// src/Components/common/IntegratedDigitalServicesBento.jsx
import { ArrowUpRight, Monitor, RefreshCw, Wrench, Languages, TrendingUp, FileText } from "lucide-react";

const BRAND = "#D9F70D";

const items = [
  {
    title: "Creating Seamless Digital Experiences",
    tag: "Web Design & Development",
    desc: "Responsive, high-performance websites built to convert across every device.",
    icon: Monitor,
    span: "lg:col-span-2",
  },
  {
    title: "Continuous Website Updates",
    tag: "Enhancements",
    desc: "Modern UI upgrades, new features, and ongoing UX refinement to stay ahead.",
    icon: RefreshCw,
    span: "lg:col-span-1",
  },
  {
    title: "Maintenance & Troubleshooting",
    tag: "Stability",
    desc: "Monitoring, fixes, and proactive support to keep your site smooth and secure.",
    icon: Wrench,
    span: "lg:col-span-1",
  },
  {
    title: "Professional Content Translation",
    tag: "Localization",
    desc: "Accurate translation that preserves your brand tone across regions.",
    icon: Languages,
    span: "lg:col-span-1",
  },
  {
    title: "UX Improvement & CRO",
    tag: "Conversion",
    desc: "Behavior insights + optimizations that turn visitors into leads and customers.",
    icon: TrendingUp,
    span: "lg:col-span-1",
  },
  {
    title: "Creating & Formatting Content",
    tag: "Content Systems",
    desc: "Structured content that looks premium, reads clearly, and stays consistent.",
    icon: FileText,
    span: "lg:col-span-2",
  },
];

function BentoCard({ title, tag, desc, icon: Icon, span }) {
  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border bg-white/[0.03] p-6",
        "shadow-[0_30px_90px_rgba(0,0,0,0.55)]",
        "transition hover:-translate-y-1 hover:bg-white/[0.05]",
        span,
      ].join(" ")}
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      {/* Spotlight hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(217,247,13,0.18)" }}
        />
        <div
          className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(217,247,13,0.10)" }}
        />
      </div>

      {/* Neon edge on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ boxShadow: "0 0 0 1px rgba(217,247,13,0.35) inset" }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="grid h-11 w-11 place-items-center rounded-xl border"
            style={{
              borderColor: "rgba(217,247,13,0.35)",
              background: "rgba(217,247,13,0.06)",
            }}
          >
            <Icon className="h-5 w-5" style={{ color: BRAND }} />
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "rgba(217,247,13,0.85)" }}
            >
              {tag}
            </p>
            <div className="mt-1 h-px w-10 bg-white/10 group-hover:bg-white/20" />
          </div>
        </div>

        <a
          href="/contact"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition group-hover:border-white/20 group-hover:text-white"
          aria-label={`Learn more about ${title}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Content */}
      <h3 className="relative mt-5 text-lg font-semibold leading-snug">
        {title}
      </h3>

      <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
        {desc}
      </p>

      {/* Bottom bar */}
      <div className="relative mt-6 h-1 w-16 rounded-full bg-white/10">
        <div
          className="h-1 w-8 rounded-full transition-all duration-500 group-hover:w-16"
          style={{ background: BRAND }}
        />
      </div>
    </article>
  );
}

export default function IntegratedDigitalServicesBento() {
  return (
    <section className="relative overflow-hidden bg-black py-16 text-white">
      {/* background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Integrated Digital Services to Achieve your Ambitions
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            A premium set of services designed to launch, optimize, and scale —
            with performance and conversions built-in.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((it) => (
            <BentoCard key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
