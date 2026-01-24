import React, { useState } from "react";
import { motion } from "framer-motion";

const BRAND = {
  primary: "#007399",
  accent: "#37C6D9",
};

export default function SimpleContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setDone(false);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      setSending(true);
      await new Promise((r) => setTimeout(r, 900));
      setDone(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-black py-16">
      <div className="mx-auto w-[min(720px,92vw)]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative overflow-hidden rounded-3xl
            border border-white/10
            bg-white/[0.05] backdrop-blur-2xl
            shadow-[0_30px_90px_rgba(0,0,0,0.65)]
          "
        >
          {/* glows */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-70"
            style={{ backgroundColor: `${BRAND.accent}22` }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-60"
            style={{ backgroundColor: `${BRAND.primary}22` }}
          />

          {/* subtle top hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative p-7 sm:p-10">
            <p className="text-sm font-semibold tracking-wider uppercase text-white/55">
              Contact
            </p>

            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Let’s talk
            </h2>

            <p className="mt-3 text-white/70">
              Send us a message and we’ll get back to you soon.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  className="
                    w-full rounded-2xl
                    border border-white/10
                    bg-black/40
                    px-4 py-3 text-white
                    placeholder:text-white/35
                    outline-none
                    focus:border-white/20 focus:bg-black/55
                    transition
                  "
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email address"
                  className="
                    w-full rounded-2xl
                    border border-white/10
                    bg-black/40
                    px-4 py-3 text-white
                    placeholder:text-white/35
                    outline-none
                    focus:border-white/20 focus:bg-black/55
                    transition
                  "
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Your message"
                rows={5}
                className="
                  w-full resize-none rounded-2xl
                  border border-white/10
                  bg-black/40
                  px-4 py-3 text-white
                  placeholder:text-white/35
                  outline-none
                  focus:border-white/20 focus:bg-black/55
                  transition
                "
              />

              {error ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {error}
                </motion.p>
              ) : null}

              <div className="flex items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                  type="submit"
                  className="
                    rounded-full px-7 py-3.5 font-semibold
                    text-black
                    shadow-[0_18px_60px_rgba(55,198,217,0.20)]
                    disabled:opacity-60
                  "
                  style={{ backgroundColor: BRAND.accent }}
                >
                  {sending ? "Sending..." : "Send message"}
                </motion.button>

                {done ? (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-semibold"
                    style={{ color: BRAND.accent }}
                  >
                    ✅ Sent successfully!
                  </motion.span>
                ) : (
                  <span className="text-sm text-white/40"></span>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
