import React, { useState } from "react";
import FlatSquaresWalls from "../Components/FlatSquaresWalls";
import emailjs from "@emailjs/browser";
import FlatSquaresRest from "@/Components/FlatSquaresRest";
// import NetworkBackground from "./NetworkBackground";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const BRAND_COLORS = ["#007198", "#007198", "#155AE7", "#0B2C73"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      setLoading(true);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          company: data.company || "-",
          message: data.message,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("Thanks! We'll get back to you shortly.");
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Sorry, message failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#0b0b0c] text-white ">
      {/* Background simulation */}
      {/* <div className="absolute inset-0 z-0"> */}
       <div className="hidden md:block absolute inset-0">
         <FlatSquaresWalls
    count={580}
    binHeightRatio={0.42}
    size={[8, 14]}
    padding={2}
    bg="#0b0b0c"
    palette={["#6EF1F7", "#1353CD", "#007399"]} // ✅ brand colors
    stroke={false}
    gravity={0.32}
    airDrag={0.014}
    restitution={0.2}
    floorFriction={0.16}
    staticFrictionThresh={0.18}
    repelRadius={140}
    repelStrength={1}
    speedBoost={2.2}
    upwardBias={0.35}
  />
        </div>
        {/* Soft corner vignettes */}
        {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(75%_60%_at_0%_0%,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(75%_60%_at_100%_0%,rgba(255,255,255,0.04),transparent_60%)]" /> */}
      {/* </div> */}

       {/* <NetworkBackground
        imageSrc="/image/your-network.png" // ✅ put your image path here
        palette={["#007198", "#007198", "#155AE7", "#0B2C73"]}
        density={0.00014}
        maxLinkDist={190}
      /> */}

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24 z-10">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Left intro */}
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-wide mt-10">
              Let’s talk about your <span className="text-[#08DEF6]">growth</span>
            </h1>
            <p className="mt-4 text-zinc-300/90">
              Tell us what you’re building and we’ll get back within one business day.
              For urgent queries, ping us on WhatsApp.
            </p>

            <div className="mt-6 space-y-3 text-zinc-400">
              {/* Email */}
              <div className="flex items-start gap-3">
                <span className="mt-[2px]">✉️</span>
                <a href="mailto:hr@tspl-corp.com" className="hover:text-white transition">
                  hr@tspl-corp.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <span className="mt-[2px]">📞</span>
                <a href="tel:+919037362703" className="hover:text-white transition">
                  +91 90373 62703
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="mt-[2px]">📍</span>
                <div className="leading-relaxed">
                  <p> Third Floor,  </p>
                  <p>UL Cyber Park,</p>
                  <p>Nellikode P O, Calicut,Kerala</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="md:col-span-3">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)]">
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-white/6 to-transparent opacity-60" />

              <form className="relative space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name">
                    <input name="name" required className="input" placeholder="Jane Doe" />
                  </Field>

                  <Field label="Email">
                    <input
                      name="email"
                      type="email"
                      required
                      className="input"
                      placeholder="jane@company.com"
                    />
                  </Field>
                </div>

                <Field label="Company">
                  <input name="company" className="input" placeholder="Acme Inc." />
                </Field>

                <Field label="Message">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="input resize-none"
                    placeholder="Tell us about your project..."
                  />
                </Field>

                {/* Buttons row - SAME WIDTH & HEIGHT */}
                <div className="pt-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Send message button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        group relative inline-flex items-center justify-center
                        w-full h-11
                        rounded-xl
                        text-sm font-semibold tracking-wide
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                    >
                      <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-white/15 via-white/10 to-white/15 blur-xl opacity-70 group-hover:opacity-90 transition" />
                      <span className="relative w-full h-11 flex items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                        {loading ? "Sending..." : "Send message"}
                      </span>
                    </button>

                    {/* WhatsApp button */}
                    <a
                      href={
                        "https://wa.me/919037362703?text=" +
                        encodeURIComponent("Hi, I’d like to talk about a new project.")
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                     className="
  inline-flex items-center justify-center gap-2
  w-full h-11 rounded-xl text-sm font-semibold
  border border-white/15 bg-white/5
  text-[#6EF1F7]
  hover:bg-white/10 hover:border-white/25
  transition whitespace-nowrap
"

                    >
                      <span>💬 WhatsApp</span>
                    </a>
                  </div>


                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-zinc-300">{label}</span>
      <div className="relative">{children}</div>
    </label>
  );
}
