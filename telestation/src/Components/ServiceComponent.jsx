import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import OurWorkSlider from "./OurWorkSlider.jsx";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

const ServicePageTemplate = ({ pageContent }) => {
  // -------------------- Contact form state --------------------
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const requiredFields = useMemo(
    () => ["firstName", "email", "company", "phone"],
    []
  );

  const validate = () => {
    const next = {};
    if (!formData.firstName.trim()) next.firstName = "First name is required";
    if (!formData.company.trim()) next.company = "Company is required";
    if (!formData.phone.trim()) next.phone = "Phone is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!isValidEmail(formData.email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    if (errors[name]) setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // TODO: integrate API/email service here
      console.log("Form submitted:", formData);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCtaClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // -------------------- Scroll-to-top button (optional) --------------------
  const [showTopBtn, setShowTopBtn] = useState(false);
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // -------------------- Testimonial slider state --------------------
  const testimonials = pageContent?.testimonials || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const clients = pageContent?.testimonial?.clients || [];
  const doubledClients = [...clients, ...clients];

  useEffect(() => {
    if (!testimonials.length) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              pageContent?.hero?.bg ||
              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            }
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-semibold mb-6 leading-tight text-white tracking-tight">
              {pageContent?.hero?.mainTitle} {" "}
              <span className="text-[#d8f70c]">
                {pageContent?.hero?.highlightTitle}
              </span>{" "}
              {pageContent?.hero?.endTitle}
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {pageContent?.hero?.subtitle}
            </p>
            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 text-sm cursor-pointer group text-[#d8f70c] hover:text-white transition-colors"
              aria-label="Jump to contact form"
            >
              <span>{pageContent?.hero?.ctaText || "Contact us"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Partnerships (auto-scrolling two rows) */}
      {pageContent?.partnerships?.logos?.length > 0 && (
        <section className="py-28 border-t border-zinc-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl lg:text-6xl font-semibold text-white tracking-tight">
              {pageContent.partnerships.title}
            </h2>
            {/* Bigger session gap between heading and rows */}
            <div className="h-12 lg:h-20" />
          </div>

          {/* Row 1 */}
          <div className="relative mb-12 lg:mb-16 marquee-mask">
            <div
              className="flex animate-marquee-right space-x-28 lg:space-x-32 will-change-transform"
              style={{
                ["--marquee-speed"]: "28s",
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div
                  key={setIndex}
                  className="flex items-center space-x-28 lg:space-x-32"
                  aria-hidden={setIndex === 1}
                >
                  {pageContent.partnerships.logos
                    .slice(
                      0,
                      Math.ceil(pageContent.partnerships.logos.length / 2)
                    )
                    .map((item, idx) => (
                      <div
                        key={`${item.name}-${idx}-${setIndex}`}
                        className="flex-shrink-0 flex items-center"
                      >
                        {item.src ? (
                          <img
                            src={item.src}
                            alt={item.name}
                            className="h-10 sm:h-11 lg:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-zinc-900/60 border border-zinc-800 rounded-full grid place-items-center">
                            <span className="text-white font-semibold text-base lg:text-lg">
                              {item.name?.[0] || "•"}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative marquee-mask">
            <div
              className="flex animate-marquee-left space-x-28 lg:space-x-32 will-change-transform"
              style={{
                ["--marquee-speed"]: "34s",
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div
                  key={setIndex}
                  className="flex items-center space-x-28 lg:space-x-32"
                  aria-hidden={setIndex === 1}
                >
                  {pageContent.partnerships.logos
                    .slice(Math.ceil(pageContent.partnerships.logos.length / 2))
                    .map((item, idx) => (
                      <div
                        key={`${item.name}-${idx}-${setIndex}`}
                        className="flex-shrink-0 flex items-center"
                      >
                        {item.src ? (
                          <img
                            src={item.src}
                            alt={item.name}
                            className="h-10 sm:h-11 lg:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-zinc-900/60 border border-zinc-800 rounded-full grid place-items-center">
                            <span className="text-white font-semibold text-base lg:text-lg">
                              {item.name?.[0] || "•"}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Styles: smoother infinite marquee, hover pause, mask fade, and reduced motion support */}
          <style>{`
            @keyframes marquee-right { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @keyframes marquee-left  { 0% { transform: translateX(-50%);} 100% { transform: translateX(0); } }
            .animate-marquee-right { animation: marquee-right var(--marquee-speed, 28s) linear infinite; }
            .animate-marquee-left  { animation: marquee-left  var(--marquee-speed, 34s) linear infinite; }
            .animate-marquee-right:hover, .animate-marquee-left:hover { animation-play-state: paused; }
            .marquee-mask { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
            @media (prefers-reduced-motion: reduce) {
              .animate-marquee-right, .animate-marquee-left { animation-duration: 999s; }
            }
          `}</style>
        </section>
      )}

      {/* Service Details */}
      {pageContent?.serviceDetails?.map((service) => (
        <section key={service.number} className="py-24 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-12 lg:mb-16" />

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="-mt-2 lg:pl-8">
                <div className="text-5xl font-semibold mb-4 text-[#d8f70c]">
                  {service.number}
                </div>
                <h3 className="text-4xl lg:text-5xl font-semibold mb-6 text-white">
                  {service.title}
                </h3>
                {service?.link && (
                  <a
                    href={service.link}
                    className="inline-block border-b border-[#d8f70c] pb-1 text-[#d8f70c] hover:text-white hover:border-white transition-colors"
                  >
                    Learn more
                  </a>
                )}
              </div>

              <div>
                <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {(service.tags || []).map((tag) => {
                    const isHighlight = service.highlightTags?.includes(tag);
                    return (
                      <span
                        key={tag}
                        className={[
                          "px-4 py-2 rounded-full text-sm border transition-colors duration-200",
                          isHighlight
                            ? "bg-[#d8f70c] text-black border-transparent hover:opacity-90"
                            : "bg-zinc-950 text-gray-300 border-zinc-800 hover:bg-[#d8f70c] hover:text-black hover:border-transparent",
                        ].join(" ")}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Portfolio slider */}
      {pageContent?.portfolio?.items?.length > 0 && (
        <OurWorkSlider
          title={pageContent.portfolio.title || "Our work."}
          items={pageContent.portfolio.items.map((p) => ({
            name: p.name,
            logo: p.logo,
            tags: p.tags || [],
            title: p.description || p.title,
            ctaText: p.buttonText || "View case study",
            link: p.link,
            bgImage: p.bgImage,
            overlay: p.overlay,
            sideImage: p.image,
          }))}
        />
      )}

      {/* Testimonials */}
      {(pageContent?.testimonial || testimonials.length > 0) && (
        <section className="py-20 bg-black text-white overflow-hidden border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center text-[#d8f70c]">
              {pageContent?.testimonial?.title || "Hear it from our clients."}
            </h2>

            {/* Testimonial Carousel */}
            {testimonials.length > 0 && (
              <div className="relative mb-16 max-w-4xl mx-auto">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {testimonials.map((testimonial, idx) => (
                      <div key={`${testimonial.author}-${idx}`} className="w-full flex-shrink-0 px-4">
                        <figure className="text-center">
                          <blockquote className="text-2xl lg:text-3xl leading-relaxed text-white mb-8 font-light">
                            <span className="text-[#d8f70c] text-5xl leading-none align-top">&ldquo;</span>
                            {testimonial.quote}
                          </blockquote>
                          <figcaption className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-[#d8f70c] text-xl font-semibold">
                              {testimonial.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="text-white font-semibold text-lg">{testimonial.author}</div>
                              <div className="text-gray-400 text-sm">{testimonial.role}</div>
                            </div>
                          </figcaption>
                        </figure>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-8" : "bg-gray-600 w-2"}`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Scrolling Logos */}
            {clients.length > 0 && (
              <div className="relative overflow-hidden py-8 mt-12">
                <div className="flex gap-12 animate-scroll">
                  {doubledClients.map((client, idx) => (
                    <div key={`${client}-${idx}`} className="flex-shrink-0 flex items-center">
                      <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                        {client}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <style>{`
            @keyframes scroll { 0% { transform: translateX(0);} 100% { transform: translateX(-50%);} }
            .animate-scroll { animation: scroll 25s linear infinite; width: fit-content; }
            .animate-scroll:hover { animation-play-state: paused; }
          `}</style>
        </section>
      )}

    

      {/* Scroll to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#d8f70c] text-black w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowRight className="w-5 h-5 -rotate-90" />
        </button>
      )}
    </div>
  );
};

export default ServicePageTemplate;


