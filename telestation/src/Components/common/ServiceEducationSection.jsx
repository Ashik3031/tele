import educationContent from "../../data/serviceEducationContent.json";

export default function ServiceEducationSection({ serviceKey }) {
  const data = educationContent[serviceKey];

  if (!data) return null; // nothing configured for this service

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 space-y-16">
        {/* 1. Education block */}
       {/* 1. Education block */}
<div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
  {/* Left content */}
  <div className="lg:col-span-7">
    <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
      {data.headingPrefix}{" "}
      <span className="bg-gradient-to-r from-[#D9F70D] via-white to-[#D9F70D] bg-clip-text text-transparent">
        {data.headingHighlight}
      </span>
    </h2>

    <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-200 sm:text-base">
      {data.introParagraphs?.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </div>
  </div>

  {/* Right image (height follows content) */}
  <div className="lg:col-span-5 lg:self-stretch">
    <div className="relative mx-auto h-full w-full max-w-md">
      {/* vertical glow strip */}
      <div className="pointer-events-none absolute -left-6 top-10 h-[75%] w-10 rounded-full bg-[#D9F70D]/25 blur-2xl" />

      <div className="relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
        <img
          src={data.imageSrc}
          alt={data.imageAlt}
          className="
            w-full object-cover
            aspect-[4/5] lg:aspect-auto
            h-auto lg:h-full
          "
        />

        {/* top highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        {/* bottom caption fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </div>
  </div>
</div>


        

        {/* Divider */}
        {/* <div className="border-t border-white/15">
          <div className="h-0.5 w-24 bg-[#D9F70D]" />
        </div> */}

        {/* 2. Power section */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Left text */}
          <div className={data.powerRightParagraphs?.length ? "lg:w-1/2" : "lg:w-full"}>
            <h3 className="text-2xl font-semibold sm:text-3xl">
              {data.powerHeading}
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-200 sm:text-base">
              {data.powerLeftParagraphs?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right quote / emphasis area */}
          {!!data.powerRightParagraphs?.length && (
          <div className="lg:w-1/2">
            <div className="rounded-2xl border border-white/10 bg-[#050509] p-6 text-sm leading-relaxed text-slate-200 sm:text-base">
              {data.powerRightParagraphs?.map((para, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? "italic text-slate-300"
                      : idx === data.powerRightParagraphs.length - 1
                      ? "mt-5 font-semibold text-[#D9F70D]"
                      : "mt-4"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
