// src/components/videography/VideoMarketingIntro.jsx

const VIDEO_MARKETING_INTRO = {
  heading: {
    line1: "Creating Stories ",
    line2: "That Inspire Culture",
  },
  paragraphs: [
    "We are a video creative marketing agency crafting meaningful stories that connect brands with people. We believe powerful ideas shape stories — and great stories shape culture.",
    "With years of experience across industries, we help brands define their voice, engage audiences, and stand out in an ever-evolving digital landscape. From concept development to full-scale production and distribution, we collaborate closely with our clients to deliver creative work that drives real impact.",
  ],
  accentColor: "#D9F70D",
  media: {
    type: "video", // "video" | "image"
    src: "/video-service.mp4",
    poster: "", // optional
    alt: "Video Marketing Agency In Dubai", 
  },
};

export default function VideoMarketingIntro() {
  const { heading, paragraphs, accentColor, media } = VIDEO_MARKETING_INTRO;

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT: Text */}
          <div>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {heading.line1}
              <br />
              {heading.line2}
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-200">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            <div
              className="mt-6 h-[2px] w-24 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* RIGHT: Image / Video */}
          <div className="relative">
            <div className="overflow-hidden rounded-none lg:rounded-md border border-white/5">
              {media.type === "image" ? (
                <img
                  src={media.src}
                  alt={media.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  src={media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={media.poster || undefined}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
