import React, { useEffect, useMemo, useRef, useState } from "react";

const BRAND = "#D9F70D";

const STATS = [
  { value: "3,460", label: "Satisfied Clients" },
  { value: "8,550", label: "Successful Campaigns" },
  { value: "180", label: "Brands Joined" },
  { value: "85", label: "Marketing Experts" },
];

const toNumber = (val) => Number(String(val).replace(/,/g, "")) || 0;

function useInViewOnce(threshold = 0.35) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(startWhen, endValue, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    const end = Number(endValue) || 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(progress * end);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [startWhen, endValue, duration]);

  return value;
}

export default function StatsStrip({ items = STATS }) {
  const { ref, inView } = useInViewOnce(0.3);

  return (
    <section ref={ref} className="bg-black py-8 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <StatCard key={idx} item={item} inView={inView} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ item, inView, index }) {
  const end = useMemo(() => toNumber(item.value), [item.value]);
  const count = useCountUp(inView, end, 1200);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/15 bg-[#060607] px-5 py-4
        transition-all duration-700 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{ transitionDelay: `${index * 120}ms` }} // stagger
    >
      {/* left brand bar */}
      <span
        className="absolute left-3 top-1/2 h-10 w-[3px] -translate-y-1/2 rounded-full"
        style={{ background: BRAND }}
      />

      {/* bottom brand underline */}
      <span
        className="absolute bottom-0 left-0 h-[3px] w-full opacity-90"
        style={{ background: BRAND }}
      />

      {/* content */}
      <div className="pl-5">
        <div className="flex items-start gap-1">
          <span className="text-2xl font-semibold tracking-tight">
            {count.toLocaleString()}
          </span>
          <span className="text-lg font-semibold leading-none" style={{ color: BRAND }}>
            +
          </span>
        </div>
        <p className="mt-1 text-xs text-white/75">{item.label}</p>
      </div>

      {/* subtle glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl opacity-20"
        style={{ background: BRAND }}
      />
    </div>
  );
}
