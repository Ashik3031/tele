import servicesContent from "../../data/serviceServicesContent.json";

export default function ServiceServicesSection({ serviceKey }) {
  const data = servicesContent[serviceKey];

  if (!data) return null; // fallback if key not found

  const whatsappUrl =
    "https://wa.me/971503535409?text=" +
    encodeURIComponent(data.whatsappText);

  return (
    <section className="relative bg-black py-16 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* subtle top glow */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#D9F70D]/10 via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">
          <span className="bg-gradient-to-r from-[#D9F70D] via-white to-[#D9F70D] bg-clip-text text-transparent">
            {data.heading}
          </span>
        </h2>

        {/* Cards grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#050509] px-6 py-7 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-[#aac403]"
            >
              <div>
                <h3 className="text-sm font-semibold text-[#D9F70D] sm:text-base group-hover:text-black">
                  {service.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-slate-300/90 sm:text-sm group-hover:text-black/80">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                {/* Speak to Us button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-white/60 px-4 py-2 text-xs font-medium text-white transition group-hover:border-black group-hover:text-black group-hover:bg-[#aac403]"
                >
                  Speak to Us
                </a>

                {/* Arrow circle */}
                {/* <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-slate-300 transition group-hover:border-black group-hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M10 7h7v7"
                    />
                  </svg>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
