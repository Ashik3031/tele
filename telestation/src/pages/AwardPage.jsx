import React from "react";
import { motion } from "framer-motion";

const BRAND = { accent: "#37C6D9" };
const EASE = [0.22, 1, 0.36, 1];

const gradientAnim = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 5, repeat: Infinity, ease: "linear" },
  },
};


/* ✅ EDIT ONLY THIS DATA */
const AWARDS_DATA = {
  employeeOfMonth: [
    {
     
      month: "December 2025",
      name: "MUNAVARRA",
      image: "/image/employee1.jpeg",
    },
    {
     
      month: "December 2025",
      name: "AJAL BABU",
      image: "/image/employee2.jpeg",
    },
     {
      
      month: "December 2025",
      name: "ANITA",
      image: "/image/target5.jpeg",
     
    }
  ],

  targetAchieved: [
    {
     
      month: "December 2025",
      name: "Rafi",
      image: "/image/target1.jpeg",
      note: "120% Achieved",
    },
    {
      
      month: "December 2025",
      name: "Gayathri",
      image: "/image/target2.jpeg",
      note: "110% Achieved",
    },
    {
      
      month: "December 2025",
      name: "Fuhad Zenin",
      image: "/image/target3.jpeg",
      note: "110% Achieved",
    },
     {
      
      month: "December 2025",
      name: "Mariam",
      image: "/image/target4.jpeg",
      note: "110% Achieved",
    },
    
    
  ],
};

export default function AwardsImageCards() {
  const employeeList = AWARDS_DATA.employeeOfMonth || [];
  const targetList = AWARDS_DATA.targetAchieved || [];

  return (
    <section className="min-h-screen bg-black text-white py-12 sm:py-16">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <div className="space-y-14 pt-10">
          {/* ✅ EMPLOYEE OF THE MONTH (Poster style / contain) */}
         <AwardsSection
  title="Employee of the Month"
  items={employeeList}
  cardSize="tall"
  cardVariant="poster"
  grid="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
  gridTopSpace="mt-10 sm:mt-12"
/>


          {/* ✅ TARGET ACHIEVED (Photo style / cover) */}
          <AwardsSection
            title="Target Achieved"
            items={targetList}
            cardSize="tall"
            cardVariant="photo"
            grid="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
            gridTopSpace="mt-10 sm:mt-12"
          />
        </div>
      </div>
    </section>
  );
}

/* ✅ Section Wrapper */
function AwardsSection({
  title,
  items = [],
  cardSize = "normal",
  grid,
  cardVariant = "poster", // "poster" | "photo"
  gridTopSpace = "mt-10 sm:mt-12", // ✅ space between title and cards
}) {
  if (!items.length) return null;

  return (
    <div>
      {/* ✅ SECTION TITLE (animated) */}
      <div className="flex items-end justify-between gap-4 pt-10">
        <motion.h2
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.6 }}
  transition={{ duration: 0.8, ease: EASE }}
  className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-none"
>
  <motion.span
    variants={gradientAnim}
    initial="initial"
    animate="animate"
    className="inline-block bg-clip-text text-transparent"
    style={{
      backgroundImage:
        "linear-gradient(90deg, #6EF1F7, #6EF1F7, #007399)",
      backgroundSize: "220% 220%",
    }}
  >
    {title}
  </motion.span>

  {/* underline draw */}
  <motion.span
    aria-hidden="true"
    className="absolute -bottom-3 left-0 h-[3px] w-full origin-left rounded-full"
    style={{
      background: "linear-gradient(90deg, #6EF1F7, #6EF1F7, #007399)",
    }}
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
  />
</motion.h2>



        {/* right divider line (animated) */}
        <motion.div
        //   initial={{ scaleX: 0, opacity: 0 }}
        //   whileInView={{ scaleX: 1, opacity: 1 }}
        //   viewport={{ once: true, amount: 0.6 }}
        //   transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        //   className="hidden sm:block h-px flex-1 origin-left"
        //   style={{
        //     background:
        //       "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.00))",
        //   }}
        />
      </div>

      {/* ✅ GRID */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
        className={gridTopSpace}
      >
        <div
          className={
            grid ||
            "grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]"
          }
        >
          {items.map((p, idx) => (
            <ImageAwardCard
              key={`${p.category}-${p.name}-${idx}`}
              variant={cardVariant}
              image={p.image}
              alt={p.name || title}
              meta={p.month}
              name={p.name}
              category={p.category}
              note={p.note}
              size={cardSize}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ✅ Card */
function ImageAwardCard({
  variant = "poster", // "poster" | "photo"
  image,
  alt = "Award",
  meta,
  name,
  category,
  note,
  size = "normal",
}) {
  const isTall = size === "tall";
  const isPoster = variant === "poster";

  const heightClass = isTall
    ? "h-[360px] sm:h-[420px] md:h-[460px]"
    : "h-[300px] sm:h-[340px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="
        group relative overflow-hidden rounded-[28px]
        border border-white/10
        bg-white/[0.03]
        shadow-[0_30px_90px_rgba(0,0,0,0.70)]
      "
    >
      {/* subtle brand glow */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-30"
        style={{
          background: `radial-gradient(circle, ${BRAND.accent}35, transparent 65%)`,
        }}
      />

      <div className={`relative ${heightClass}`}>
        {/* ✅ IMAGE STYLE SWITCH */}
        {isPoster ? (
          <>
            {/* Poster style: background blur fill + main contain */}
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-20 scale-110"
            />
            <div className="absolute inset-0 bg-black/35" />

            <motion.img
              src={image}
              alt={alt}
              className="absolute inset-0 h-full w-full object-contain object-center p-0 sm:p-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </>
        ) : (
          <>
            {/* Photo style: full bleed cover */}
            <motion.img
              src={image}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover object-center"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15" />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(80% 60% at 50% 0%, ${BRAND.accent}22, transparent 55%)`,
              }}
            />
          </>
        )}

        {/* top badges */}
        <div className="absolute left-4 top-4 right-4 z-20 flex items-center justify-between gap-3">
          {/* ✅ Month */}
          {meta && (
            <span className="rounded-full px-3 py-1 text-[11px] text-white/75 border border-white/10 bg-black/50 backdrop-blur">
              {meta}
            </span>
          )}
        </div>

        {/* bottom name plate */}
        {name && (
          <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4">
            <div
              className={[
                "w-full rounded-2xl border border-white/10 backdrop-blur",
                isPoster ? "bg-black/55" : "bg-black/40",
                "px-4 py-2",
              ].join(" ")}
            >
              <h3 className="text-base sm:text-lg font-extrabold tracking-wide text-white text-center">
                {name}
              </h3>

              {/* ✅ show note only for target cards if you want */}
              
            </div>
          </div>
        )}

        {/* hover shine */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}
