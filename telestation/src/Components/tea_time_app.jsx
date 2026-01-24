import React, { useEffect, useMemo, useState } from "react";

/**
 * TeaTimeApp.jsx — Single-file React + Tailwind rebuild of the provided index.html
 * --------------------------------------------------------------
 * - No external UI libs required
 * - Responsive, animated, and sectioned SPA
 * - Drop into any React project (Vite/CRA/Next) with Tailwind configured
 * - Replace image src paths with your own assets
 */

const menuItems = [
  { title: "NesCafe", img: "/image/menu-1.png", desc: "A classic hot coffee with a rich and creamy flavor.", price: "Dhs. 3.50/5.25" },
  { title: "Hotdog Pizza", img: "/image/menu-2.png", desc: "A cheesy delight topped with juicy hotdog slices.", price: "Dhs. 20/27/32" },
  { title: "Hot Chocolate", img: "/image/menu-3.png", desc: "A warm, velvety drink to satisfy your chocolate cravings.", price: "Dhs. 6/11" },
  { title: "Turkish Coffee", img: "/image/menu-4.png", desc: "A bold, authentic Turkish coffee with an aromatic touch.", price: "Dhs. 3.25/6" },
  { title: "Karak Special", img: "/image/menu-5.png", desc: "A strong, flavorful tea brewed to perfection.", price: "Dhs. 1.50/2.50/4" },
  { title: "Chikkoo", img: "/image/menu-6.png", desc: "A refreshing chikkoo shake with natural sweetness.", price: "Dhs. 7.35" },
];


const reviews = [
  { name: "Lufna", role: "satisfied customer", text: "A hidden gem in Dubai! The tea is exceptional, and the cozy ambiance makes it a perfect spot to unwind. Highly recommend their Karak Chai!" },
  { name: "Abhijith", role: "satisfied customer", text: "The perfect blend of modern café vibes with traditional tea flavors. The staff is friendly, and the desserts are to die for!" },
  { name: "Manasi", role: "satisfied customer", text: "Loved the variety of teas available here! The Dubai-inspired decor adds a unique touch. Definitely a must-visit for tea lovers." },
  { name: "Swathy", role: "satisfied customer", text: "This café in Dubai is a paradise for tea enthusiasts! The aroma, flavors, and presentation are simply top-notch." },
];

const founders = [
  { name: "NOUSHAD KELOTH", title: "General Manager", img: "/image/gm.jpeg" },
  { name: "Ismail CM", title: "Managing Director", img: "/image/md.jpeg" },
  { name: "Khalifa Mohammed Lahdan Fadel Alqubaisi", title: "Founder", img: "/image/founder.jpeg" },
];

const branches = [
  { place: "Shamkha 13", wa: "0547494910", land: "025844297" },
  { place: "Shamkha 12", wa: "0566140777", land: "025845777" },
  { place: "Baniyas", wa: "0509588836", land: "025588827" },
  { place: "Al Falah (Sky Mall)", wa: "0503135570", land: "025659010" },
  { place: "Al Falah New A1", wa: "0504319399", land: "026663499" },
  { place: "Al Falah Old 1", wa: "0547866063", land: "024441313" },
  { place: "Khalifa City", wa: "0564210160", land: "025543000" },
  { place: "Electra (Eldorado Building)", wa: "0555544937", land: "026777560" },
  { place: "Muroor", wa: "0564294050", land: "024485595" },
  { place: "Hamdan Street", wa: "0568670530", land: "026393032" },
  { place: "Sheilaila", wa: "0502323584", land: "025666330" },
  { place: "Rahba City", wa: "0556218484", land: "025638844" },
  { place: "Emirates Tea Khalifa City", wa: "0505463626", land: "025560043" },
  { place: "Emirates Tea (Tourist Club)", wa: "0526447535", land: "024482965" },
  { place: "Central Mall,Khalifa city(safeer market)", wa: "0503137475", land: "0565637666" },
];

// Simple star icon as inline SVG
const Star = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

// Utility button
const CTA = ({ href = "#", children, onClick, className = "" }) => (
  <a
    href={href}
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold tracking-wide shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring focus-visible:ring-emerald-400 ${className}`}
  >
    {children}
  </a>
);

// Basic auto-rotating carousel for reviews
const useAutoIndex = (len, delay = 4000) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % len), delay);
    return () => clearInterval(t);
  }, [len, delay]);
  return [idx, setIdx];
};

const NavLink = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="px-3 py-2 text-sm font-medium capitalize text-slate-100/90 hover:text-white">
    {children}
  </a>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="max-w-3xl mx-auto text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-emerald-600 font-semibold uppercase tracking-wider">{subtitle}</p>
    )}
  </div>
);

export default function TeaTimeApp() {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [reviewIdx, setReviewIdx] = useAutoIndex(reviews.length, 5000);

  const year = useMemo(() => new Date().getFullYear(), []);

  // Close mobile nav on hash change
  useEffect(() => {
    const onHash = () => setNavOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Track active section for subtle nav highlight
  useEffect(() => {
    const ids = ["home", "about", "menu", "review", "founder", "book"]; 
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50/30 to-emerald-50 text-slate-700">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mt-4 rounded-2xl bg-slate-900/80 backdrop-blur border border-white/10 shadow-xl">
            <div className="flex items-center justify-between px-4 py-3">
              <a href="#home" className="flex items-center gap-3">
                <img src="/image/logo.jpg" alt="Tea Time Logo" className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-400/40"/>
                <span className="text-white text-lg font-bold tracking-wide">Tea Time</span>
              </a>

              <nav className="hidden md:flex items-center">
                {[
                  ["home", "home"],
                  ["about", "about"],
                  ["menu", "menu"],
                  ["review", "review"],
                  ["founder", "founder"],
                  ["book", "contact"],
                ].map(([href, label]) => (
                  <NavLink key={href} href={`#${href}`}>
                    <span className={active === href ? "underline underline-offset-8 decoration-emerald-400" : ""}>{label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="hidden md:block">
                <CTA href="#book" className="bg-emerald-500 text-white hover:bg-emerald-600">book a table</CTA>
              </div>

              <button
                className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/90 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-emerald-400"
                onClick={() => setNavOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {/* Burger icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
              </button>
            </div>

            {/* Mobile nav */}
            {navOpen && (
              <div className="md:hidden px-4 pb-4">
                <div className="flex flex-col gap-1">
                  {[
                    ["home", "home"],
                    ["about", "about"],
                    ["menu", "menu"],
                    ["review", "review"],
                    ["founder", "founder"],
                    ["book", "contact"],
                  ].map(([href, label]) => (
                    <a key={href} href={`#${href}`} className="rounded-lg px-3 py-2 text-sm font-medium capitalize text-white hover:bg-white/10">
                      {label}
                    </a>
                  ))}
                  <CTA href="#book" className="mt-2 bg-emerald-500 text-white hover:bg-emerald-600">book a table</CTA>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacing for fixed header */}
      <div className="h-28" />

      {/* HOME */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                Everyone's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-rose-500">Cup of Tea</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-prose">Experience the finest blends, handpicked from nature's best. Sip, savor, and celebrate every moment with our teas.</p>
              <div className="flex gap-3">
                <CTA href="#book" className="bg-slate-900 text-white hover:bg-slate-800">buy one now</CTA>
                <CTA href="#menu" className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-50">view menu</CTA>
              </div>
            </div>
            <div className="relative">
              <img src="/image/coffee2.png" alt="Main" className="mx-auto w-full max-w-lg drop-shadow-2xl" />
              <div className="absolute -bottom-5 -left-4 rotate-2 rounded-xl bg-white/80 backdrop-blur border border-slate-200 p-3 text-sm shadow-lg">
                “Finest leaves • Perfect brew • Warm company”
              </div>
            </div>
          </div>

    {/* Image strip */}
<div className="mt-12 grid gap-4 sm:grid-cols-2 items-center">
  <figure className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm aspect-[4/2]">
    <img
      src="/image/teatimetwo.png"
      alt="Signature blend"
      className="h-full w-full object-contain transition group-hover:scale-[1.03]"
    />
    <figcaption className="absolute bottom-3 left-3 rounded-lg bg-white/85 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
      Signature blend
    </figcaption>
  </figure>

  <figure className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm aspect-[4/2]">
    <img
      src="/image/teatimeone.png"
      alt="Perfect pour"
      className="h-full w-full object-contain transition group-hover:scale-[1.03]"
    />
    <figcaption className="absolute bottom-3 left-3 rounded-lg bg-white/85 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
      Perfect pour
    </figcaption>
  </figure>
</div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading title="about us" subtitle="why choose us"/>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img src="/image/about-img.png" alt="About" className="w-full rounded-3xl border border-slate-200 shadow-xl"/>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Tea Time Café: Where Every Sip Tells a Story</h3>
              <p className="text-slate-600 leading-relaxed">At Tea Time Café, we cherish the beauty of small moments—sharing laughter over a warm cup of tea, savoring a delicious snack, or enjoying a peaceful pause in your day. We blend the essence of timeless tea traditions with the excitement of modern flavors, creating an experience that's both comforting and refreshing.</p>
              <CTA href="#menu" className="bg-emerald-500 text-white hover:bg-emerald-600">read more</CTA>

              <div className="grid grid-cols-3 gap-4 pt-3">
                {[{
                  img: "/image/about-icon-1.png", label: "quality coffee"}, {img: "/image/about-icon-2.png", label: "our branches", href: "#branches"}, {img: "/image/about-icon-3.png", label: "free delivery"},].map((it) => (
                  <a key={it.label} href={it.href || '#'} className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white/60 p-4 text-center shadow-sm hover:shadow-md transition">
                    <img src={it.img} alt={it.label} className="h-12 w-12 object-contain"/>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600">{it.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-20 md:py-28 bg-white/60">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading title="our menu" subtitle="popular menu"/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((m) => (
              <a key={m.title} href="#book" className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-amber-50">
                  <img src={m.img} alt={m.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-slate-900">{m.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{m.desc}</p>
                  <div className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1 text-white text-sm">{m.price}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <CTA href="/image/menu.pdf" className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50" >Download Menu PDF</CTA>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="review" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading title="reviews" subtitle="what people say"/>

          <div className="relative mx-auto max-w-3xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <div className="flex items-center justify-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="mt-6 text-center text-lg leading-relaxed text-slate-700">“{reviews[reviewIdx].text}”</p>
              <div className="mt-6 text-center">
                <h4 className="font-semibold text-slate-900">{reviews[reviewIdx].name}</h4>
                <p className="text-sm text-slate-500">{reviews[reviewIdx].role}</p>
              </div>

              {/* Dots */}
              <div className="mt-6 flex justify-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIdx(i)}
                    className={`h-2.5 w-2.5 rounded-full ${i === reviewIdx ? "bg-emerald-500" : "bg-slate-300"}`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="founder" className="py-20 md:py-28 bg-white/60">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading title="Our Founders" />

          <div className="grid md:grid-cols-3 gap-6">
            {founders.map((f) => (
              <div key={f.name} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img src={f.img} alt={f.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition"/>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900">{f.name}</h3>
                  <p className="text-sm text-emerald-600 font-semibold">{f.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl mx-auto text-center text-slate-600 leading-relaxed">
            <p>At Tea Time Café, we cherish the beauty of small moments—sharing laughter over a warm cup of tea, savoring a delicious snack, or enjoying a peaceful pause in your day. We blend timeless tea traditions with modern flavors to create an experience that's both comforting and refreshing. Our mission is to bring people together, nurture connections, and deliver the best tea experience with sustainability and quality at the forefront.</p>
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section id="branches" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading title="Our Branches" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div key={b.place} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{b.place}</h3>
                <p className="mt-1 text-sm text-slate-600">WhatsApp: <a className="underline" href={`https://wa.me/${b.wa}`}>{b.wa}</a></p>
                <p className="text-sm text-slate-600">Landline: {b.land}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src="/image/teatimeone.png" alt="bg" className="h-full w-full object-cover"/>
        </div>
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading title={<span className="text-white">booking</span>} subtitle={<span className="text-emerald-300">reserve a table</span>} />
          <form className="mx-auto max-w-2xl grid grid-cols-1 gap-4">
            <input type="text" placeholder="Name" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
            <input type="email" placeholder="Email" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
            <input type="number" placeholder="Number" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
            <textarea rows="5" placeholder="Message" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"/>
            <div className="pt-2">
              <button type="submit" className="w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300">send message</button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold">quick links</h4>
              <div className="mt-3 flex flex-col gap-2 text-slate-400">
                <a href="#home" className="hover:text-white">home</a>
                <a href="#about" className="hover:text-white">about</a>
                <a href="#menu" className="hover:text-white">menu</a>
                <a href="#review" className="hover:text-white">reviews</a>
                <a href="#book" className="hover:text-white">contact</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold">contact info</h4>
              <div className="mt-3 flex flex-col gap-2 text-slate-400">
                <a href="tel:+971567489841" className="hover:text-white">+971 56 748 9841</a>
                <a href="tel:+971567867383" className="hover:text-white">+971 56 786 7383</a>
                <a href="mailto:info@teatimeuae.ae" className="hover:text-white">info@teatimeuae.ae</a>
                <span>Abu Dhabi, UAE</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold">follow us</h4>
              <div className="mt-3 flex flex-col gap-2 text-slate-400">
                <a href="https://www.instagram.com/teatimeuae.ae/profilecard/" target="_blank" rel="noreferrer" className="hover:text-white">instagram</a>
                <a href="https://www.tiktok.com/@tea_time_24?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="hover:text-white">tiktok</a>
                <a href="https://digtel.ae/" target="_blank" rel="noreferrer" className="hover:text-white">Developed by Digtel.ae</a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <img src="/image/logo.jpg" alt="logo" className="h-6 w-6 rounded"/>
              <span>Tea Time © {year}</span>
            </div>
            <a href="#home" className="hover:text-white">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
