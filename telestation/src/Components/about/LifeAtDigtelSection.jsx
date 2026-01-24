import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LifeAtDigtelSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selected, setSelected] = useState(null);
  const BRAND = { accent: "#37C6D9" };
const [imgAR, setImgAR] = useState(3 / 4); // default fallback


  const teamMembers = [
    {
      name: "NIHAL",
      role: "BDE",
      image: "/image/program1.jpeg",
      color: "bg-red-600",
      quote: "TSPL pushes creativity with real responsibility. Every idea we ship impacts real outcomes.",
      author: "Nihal • BDE",
    },
    {
      name: "AKSHAY",
      role: "BDE",
      image: "/image/program2.jpeg",
      color: "bg-yellow-500",
      quote: "The best part here is the speed. We move fast, learn fast, and grow together as a team.",
      author: "Akshay • BDE",
    },
    {
      name: "FAJINA",
      role: "Process Head",
      image: "/image/program3.jpeg",
      color: "bg-yellow-500",
      quote: "We work like a product team. Clear goals, strong support, and real ownership from day one.",
      author: "Fajina • Process Head",
    },
    {
      name: "FUHAD ZENIN",
      role: "Team Lead",
      image: "/image/program4.jpeg",
      color: "bg-blue-600",
      quote: "What I love is the clarity. We know what we're building and why it matters.",
      author: "Fuhad Zenin • Team Lead",
    },
    {
      name: "KAVYA",
      role: "Quality Assistant",
      image: "/image/program5.jpeg",
      color: "bg-red-600",
      quote: "No fake culture. You perform, you grow. And the team actually celebrates wins together.",
      author: "Kavya • Quality Assistant",
    },
    {
      name: "NEHA",
      role: "BDE",
      image: "/image/program6.jpeg",
      color: "bg-lime-500",
      quote: "I get the freedom to write with purpose — every piece of content has a clear mission.",
      author: "Neha • BDE",
    },
    {
      name: "LUFNA NASRIN",
      role: "Developer",
      image: "/image/program7.jpeg",
      color: "bg-red-600",
      quote: "You'll never feel stuck. There's always learning, support, and a better way to build.",
      author: "Lufna • Developer",
    },
    {
      name: "ZAINAB",
      role: "Team Lead",
      image: "/image/program8.jpeg",
      color: "bg-purple-600",
      quote: "Design here is not decoration. It's problem-solving. That's why I enjoy every project.",
      author: "Zainab • Team Lead",
    },
    {
      name: "NANDU",
      role: "BDE",
      image: "/image/program10.jpeg",
      color: "bg-yellow-500",
      quote: "It's a strong team with strong standards. If you want growth, you'll find it here.",
      author: "Nandu • BDE",
    },
    {
      name: "HARI",
      role: "Data Analyst",
      image: "/image/program11.jpeg",
      color: "bg-blue-600",
      quote: "The projects are challenging, but the environment is supportive. That balance is rare.",
      author: "Hari • Data Analyst",
    },
    {
      name: "SHAMNA",
      role: "HR Manager",
      image: "/image/program9.jpeg",
      color: "bg-purple-600",
      quote: "We build with taste and discipline. If you care about quality, you'll love TSPL.",
      author: "Shamna • HR Manager",
    },
  ];

  const closeModal = () => setSelected(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") closeModal();
    }
    if (selected) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  return (
    <section className="relative w-full bg-black text-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-[1600px] mx-auto">
        {/* Mobile View */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Life
              <br />
              <span className="text-5xl md:text-6xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                At
              </span>
              <br />
              <span className="text-5xl md:text-6xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                TSPL
              </span>
            </h1>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 w-1 h-20 bg-gradient-to-b from-white to-white/30 origin-top"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {teamMembers.map((member, idx) => (
              <motion.button
                key={idx}
                type="button"
                onClick={() => setSelected(member)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden ${member.color} aspect-[3/4] group cursor-pointer rounded-xl shadow-xl`}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm">{member.name}</p>
                  <p className="text-white/70 text-xs">{member.role}</p>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Desktop View - Masonry Layout */}
        <div className="hidden lg:flex gap-6 items-start justify-center">
          {/* Column 1 - Title + 2 images */}
          <div className="flex-shrink-0 w-[240px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <h1 className="text-5xl font-bold leading-tight">
                Life
                <br />
                <span className="text-6xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  At
                </span>
                <br />
                <span className="text-6xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  TSPL
                </span>
              </h1>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-6 w-1 h-24 bg-gradient-to-b from-white to-white/30 origin-top"
              />
            </motion.div>

            <div className="flex flex-col gap-4">
              <ImageCard member={teamMembers[0]} index={0} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="280px" />
              <ImageCard member={teamMembers[6]} index={6} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="240px" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex-shrink-0 w-[200px]">
            <div className="flex flex-col gap-4">
              <ImageCard member={teamMembers[1]} index={1} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="180px" delay={0.1} />
              <ImageCard member={teamMembers[3]} index={3} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="280px" delay={0.15} />
              <ImageCard member={teamMembers[7]} index={7} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="160px" delay={0.2} />
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex-shrink-0 w-[220px]">
            <div className="flex flex-col gap-4">
              <ImageCard member={teamMembers[2]} index={2} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="380px" delay={0.25} />
              <ImageCard member={teamMembers[8]} index={8} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="240px" delay={0.3} />
              <ImageCard member={teamMembers[9]} index={9} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="160px" delay={0.35} />
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex-shrink-0 w-[200px]">
            <div className="flex flex-col gap-4 pt-32">
              <ImageCard member={teamMembers[4]} index={4} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="240px" delay={0.35} />
              <ImageCard member={teamMembers[5]} index={5} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelected={setSelected} height="160px" delay={0.4} />
            </div>
          </div>
        </div>
      </div>

      
     
{/* Modal */}
{/* Modal */}
<AnimatePresence>
  {selected && (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-8"
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* -------------------------
          ✅ MOBILE MODAL (keep yours)
          ------------------------- */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="
          md:hidden
          relative w-full
          max-w-[92vw]
          h-[90svh]
          rounded-3xl bg-zinc-950 shadow-2xl overflow-hidden
        "
        style={{
          border: `1px solid ${BRAND.accent}22`,
          boxShadow: `0 30px 90px rgba(0,0,0,0.65)`,
        }}
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.accent}40, transparent 65%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.accent}2a, transparent 65%)`,
          }}
        />

        {/* Close */}
        <motion.button
          onClick={closeModal}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06, rotate: 90 }}
          whileTap={{ scale: 0.94 }}
          className="absolute right-3 top-3 z-20 rounded-xl px-3 py-2 text-white"
          style={{
            border: `1px solid ${BRAND.accent}33`,
            background: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))`,
          }}
        >
          ✕
        </motion.button>

        {/* ✅ No-scroll layout */}
        <div className="h-full p-4 sm:p-6">
          <div className="h-full grid gap-4">
            {/* Image */}
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-black"
              style={{ border: `1px solid ${BRAND.accent}22` }}
            >
              <img
                src={selected.image}
                alt={selected.name}
                draggable={false}
                className="w-full h-full object-cover object-center"
                style={{
                  maxHeight: "clamp(240px, 48vh, 520px)",
                }}
              />
            </div>

            {/* Text */}
            <div className="min-w-0 flex flex-col justify-center">
              <p
                className="text-xs font-medium"
                style={{ color: `${BRAND.accent}cc` }}
              >
                Life at TSPL
              </p>

              <h3 className="mt-2 text-2xl font-extrabold text-white leading-tight">
                {selected.name}
              </h3>

              <p className="mt-1 text-sm text-white/70">{selected.role}</p>

              <div
                className="mt-4 rounded-2xl p-4"
                style={{
                  border: `1px solid ${BRAND.accent}22`,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                }}
              >
                <p className="text-white/90 leading-relaxed text-sm">
                  “{selected.quote}”
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: BRAND.accent }}
                  />
                  <p className="text-sm text-white/55 font-medium">
                    — {selected.author}
                  </p>
                </div>
              </div>

              <div
                className="mt-4 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${BRAND.accent}55, transparent)`,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* -------------------------
          ✅ DESKTOP MODAL (previous style)
          ------------------------- */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="
          hidden md:block
          relative w-full max-w-5xl
          rounded-3xl bg-zinc-950 shadow-2xl overflow-hidden
        "
        style={{
          border: `1px solid ${BRAND.accent}22`,
          boxShadow: `0 30px 90px rgba(0,0,0,0.65)`,
        }}
      >
        {/* ✅ Brand glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.accent}40, transparent 65%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.accent}2a, transparent 65%)`,
          }}
        />

        {/* Close button */}
        <motion.button
          onClick={closeModal}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06, rotate: 90 }}
          whileTap={{ scale: 0.94 }}
          className="absolute right-4 top-4 z-20 rounded-xl px-3 py-2 text-white"
          style={{
            border: `1px solid ${BRAND.accent}33`,
            background: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))`,
          }}
        >
          ✕
        </motion.button>

        {/* ✅ Desktop layout (previous) */}
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[520px_1fr]">
          {/* Image (big + contained like your old modal) */}
          <div
            className="relative w-full overflow-hidden rounded-2xl bg-black"
            style={{
              border: `1px solid ${BRAND.accent}22`,
              minHeight: "520px",
            }}
          >
            <img
              src={selected.image}
              alt={selected.name}
              className="absolute inset-0 w-full h-full object-contain object-center"
              draggable={false}
            />
          </div>

          {/* Right side text */}
          <div className="min-w-0 flex flex-col justify-center">
            <p className="text-sm font-medium" style={{ color: `${BRAND.accent}cc` }}>
              Life at TSPL
            </p>

            <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {selected.name}
            </h3>

            <p className="mt-2 text-base sm:text-lg text-white/70">{selected.role}</p>

            <div
              className="mt-6 rounded-2xl p-5 sm:p-6"
              style={{
                border: `1px solid ${BRAND.accent}22`,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              }}
            >
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                “{selected.quote}”
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: BRAND.accent }}
                />
                <p className="text-sm text-white/55 font-medium">— {selected.author}</p>
              </div>
            </div>

            <div
              className="mt-6 h-px w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${BRAND.accent}55, transparent)`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>




    </section>
  );
};

// Reusable Image Card Component
function ImageCard({ member, index, activeIndex, setActiveIndex, setSelected, height, delay = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={() => setSelected(member)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden ${member.color} group cursor-pointer rounded-xl shadow-2xl transition-all duration-500 ${
        activeIndex === index ? "z-20 ring-2 ring-white/30" : "z-10"
      } ${activeIndex !== null && activeIndex !== index ? "opacity-60" : "opacity-100"}`}
      style={{ height }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      <motion.img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Dark gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
      
      {/* Scanline effect */}
      {/* <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)'
        }}
      /> */}

      {/* Name and role overlay */}
      {/* <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
      >
        <p className="text-white font-bold text-base drop-shadow-lg">{member.name}</p>
        <p className="text-white/80 text-sm drop-shadow-lg">{member.role}</p>
      </motion.div> */}

      {/* Light sweep effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Corner accent */}
      {/* <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/60"
      /> */}
    </motion.button>
  );
}

export default LifeAtDigtelSection;