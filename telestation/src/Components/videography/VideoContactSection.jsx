// src/components/videography/VideoContactSection.jsx
"use client";

import { useState } from "react";

const VIDEO_CONTACT_CONTENT = {
  heading: {
    line1: "Start Your Growth",
    line2: "Journey with",
    brand: "Digtel!",
  },
  description:
    "Let's dive into your ideas, achieve your goals with precision and design tailored strategies that fit your needs. We'll work with you to set clear expectations, goals, and metrics.",
  office: {
    title: "Digtel HEAD OFFICE",
    address:
      "First Floor, UL Cyber Park, Nellikode P O, Calicut,Kerala",
  },
  contact: {
    title: "CONTACT DETAILS",
    phone: "Phn: +971 50 353 5409",
    tel: "Tel: +971 50 353 5409",
    email: "hr@tspl-corp.com",
  },
  form: {
    fields: {
      firstName: { label: "First Name*", placeholder: "Enter your first name" },
      lastName: { label: "Last Name*", placeholder: "Enter your last name" },
      email: { label: "Email*", placeholder: "yourname@example.com" },
      company: { label: "Company Name*", placeholder: "Enter your company name" },
      phone: { label: "Phone number*", placeholder: "Enter your phone number" },
      message: { label: "Message", placeholder: "Write your message here...", rows: 4 },
    },
    countrySelect: {
      defaultValue: "India",
      options: [
        { value: "UAE", label: "UAE (+971)", dial: "+971" },
        { value: "India", label: "India (+91)", dial: "+91" },
        { value: "UK", label: "UK (+44)", dial: "+44" },
        { value: "USA", label: "USA (+1)", dial: "+1" },
      ],
    },
    submitLabel: "Submit",
  },
};

export default function VideoContactSection() {
  const [activeRegion, setActiveRegion] = useState("UAE"); // kept if you want tabs later
  const [country, setCountry] = useState(VIDEO_CONTACT_CONTENT.form.countrySelect.defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const selectedDial =
    VIDEO_CONTACT_CONTENT.form.countrySelect.options.find((o) => o.value === country)?.dial || "+91";

  const c = VIDEO_CONTACT_CONTENT;

  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_minmax(0,1.3fr)]">
          {/* LEFT */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                {c.heading.line1}
                <br />
                {c.heading.line2}{" "}
                <span className="text-[#D9F70D]">{c.heading.brand}</span>
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-200">
                {c.description}
              </p>
            </div>

            {/* Office details */}
            <div className="space-y-5 text-sm text-slate-200">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {c.office.title}
                </h3>
                <p className="mt-2 leading-relaxed">{c.office.address}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {c.contact.title}
                </h3>
                <p className="mt-2 leading-relaxed">
                  {c.contact.phone}
                  <br />
                  {c.contact.tel}
                  <br />
                  <span className="mt-2 block">Email: {c.contact.email}</span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-transparent">
            {/* First / Last Name */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  {c.form.fields.firstName.label}
                </label>
                <input
                  type="text"
                  placeholder={c.form.fields.firstName.placeholder}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#D9F70D] focus:ring-2 focus:ring-[#D9F70D]/70"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  {c.form.fields.lastName.label}
                </label>
                <input
                  type="text"
                  placeholder={c.form.fields.lastName.placeholder}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#D9F70D] focus:ring-2 focus:ring-[#D9F70D]/70"
                />
              </div>
            </div>

            {/* Email / Company */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  {c.form.fields.email.label}
                </label>
                <input
                  type="email"
                  placeholder={c.form.fields.email.placeholder}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#D9F70D] focus:ring-2 focus:ring-[#D9F70D]/70"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  {c.form.fields.company.label}
                </label>
                <input
                  type="text"
                  placeholder={c.form.fields.company.placeholder}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#D9F70D] focus:ring-2 focus:ring-[#D9F70D]/70"
                />
              </div>
            </div>

            {/* Phone row */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                {c.form.fields.phone.label}
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none ring-0 transition focus:border-[#D9F70D] focus:ring-2 focus:ring-[#D9F70D]/70 sm:max-w-[230px]"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {c.form.countrySelect.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                <div className="flex w-full rounded-2xl border border-white/10 bg-white text-sm text-black focus-within:border-[#D9F70D] focus-within:ring-2 focus-within:ring-[#D9F70D]/70">
                  <div className="flex items-center border-r border-slate-200 px-4 text-slate-600">
                    {selectedDial}
                  </div>
                  <input
                    type="tel"
                    placeholder={c.form.fields.phone.placeholder}
                    className="h-full w-full rounded-2xl px-4 py-3 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                {c.form.fields.message.label}
              </label>
              <textarea
                rows={c.form.fields.message.rows}
                placeholder={c.form.fields.message.placeholder}
                className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#D9F70D] focus:ring-2 focus:ring-[#D9F70D]/70"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex rounded-full bg-gradient-to-r from-[#D9F70D] via-[#f8ffb5] to-[#D9F70D] px-10 py-3 text-sm font-semibold text-black shadow-[0_18px_45px_rgba(217,247,13,0.45)] transition hover:translate-y-0.5 hover:brightness-110"
              >
                {c.form.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
