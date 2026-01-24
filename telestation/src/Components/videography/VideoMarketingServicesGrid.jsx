// src/components/videography/VideoMarketingServicesGrid.jsx

const SERVICES = [
  {
    id: 1,
    title: "Product Photography",
    description:
      "We create high-quality product photography that highlights detail, texture, and brand identity. Every shoot is carefully styled and planned to produce visuals that work seamlessly across e-commerce platforms, social media, and marketing campaigns.",
    image: "/image/photography.jpg",
  },
  {
    id: 2,
    title: "Video Editing & Motion Graphics",
    description:
      "Our post-production team transforms raw footage into polished, engaging video content. From precise editing and pacing to motion graphics and visual effects, we craft videos that flow smoothly, communicate clearly, and hold audience attention.",
    image: "/image/video-editing.jpg",
  },
  {
    id: 3,
    title: "AI, VFX & CGI",
    description:
      "When creative ideas go beyond live action, we use AI, VFX, and CGI to bring them to life. From subtle enhancements to fully immersive digital scenes, we create visuals that push boundaries while staying aligned with your brand vision.",
    image: "/image/vfx.jpg",
  },
  {
    id: 4,
    title: "Full-Scale Video Production",
    description:
      "As a video production company in Dubai, Digtel manages the entire production process from start to finish. From concept development and scripting to filming and final delivery, every frame is created with strategy, storytelling, and purpose.",
    image: "/image/video-production.jpg",
  },
  {
    id: 5,
    title: "2D / 3D Animation",
    description:
      "Our 2D and 3D animation services help brands explain ideas, showcase products, and tell stories in a visually engaging way. Animation allows complex messages to be communicated clearly across digital platforms.",
    image: "/image/animation.jpg",
  },
  {
    id: 6,
    title: "Sound Design",
    description:
      "Sound is a key part of how video is experienced. Our sound design services enhance emotion and clarity through clean dialogue, ambient soundscapes, and carefully crafted audio elements that elevate the overall impact of your content.",
    image: "/image/sound-design.jpg",
  }
];

export default function VideoMarketingServicesGrid() {
  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            We Provide A Full Range Of Video Marketing Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Video Marketing Services
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl border border-white/10 bg-[#050507] p-[1px] transition hover:border-[#D9F70D]/70 hover:shadow-[0_0_40px_rgba(217,247,13,0.35)]"
            >
              <div className="flip-card h-full w-full rounded-3xl bg-black aspect-[4/3]">
                <div className="flip-card-inner rounded-3xl">
                  {/* FRONT – IMAGE */}
                  <div className="flip-card-face flip-card-front overflow-hidden rounded-3xl">
                    <div className="relative h-full w-full">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5">
                        {/* <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                          Service
                        </p> */}
                        <h3 className="mt-1 text-lg font-semibold text-[#D9F70D]">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* BACK – TEXT */}
                  <div className="flip-card-face flip-card-back rounded-3xl border border-white/5 bg-[#050507] px-6 py-6 sm:px-7 sm:py-7">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#D9F70D]">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-200">
                          {service.description}
                        </p>
                      </div>

                      {/* arrow bottom-right */}
                      <div className="mt-6 flex justify-end">
                        {/* <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition group-hover:border-[#D9F70D] group-hover:text-[#D9F70D]">
                          <span className="translate-x-[1px] translate-y-[1px] text-lg">
                            ↘
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* flip styles */}
      <style>{`
        .flip-card {
          perspective: 1200px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .group:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
