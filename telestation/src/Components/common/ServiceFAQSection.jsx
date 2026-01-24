import { useState } from "react";
import faqContent from "../../data/serviceFAQContent.json";

export default function ServiceFAQSection({ serviceKey }) {
  const data = faqContent[serviceKey];

  // if no data for this service, render nothing
  if (!data || !data.faqs || data.faqs.length === 0) return null;

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-10 text-center text-3xl font-semibold sm:text-4xl">
          {data.heading || "Frequently Asked Question"}
        </h2>

        <div className="space-y-4">
          {data.faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#050509]"
              >
                {/* Question row */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 bg-white px-6 py-4 text-left text-sm font-medium text-black sm:text-base"
                >
                  <span>{item.question}</span>

                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition ${
                      isOpen
                        ? "bg-[#D9F70D]/90"
                        : "bg-black text-black/60 border border-black/20"
                    }`}
                  >
                    {/* chevron icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transform transition ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="bg-black px-6 py-5 text-sm leading-relaxed text-slate-200 sm:text-base">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
