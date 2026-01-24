import React from "react";

const cards = [
  {
    id: "social-media",
    title: "DIGITAL",
    subtitle: "Social Media Marketing",
    description:
      "We manage your corporate profiles and create engaging content that builds loyal followership across channels like Facebook, Instagram, Snapchat, and more.",
    accentColor: "#EC4899",
    bgImage: "/image/social.jpg",
    // Chat / social bubbles icon
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 8h10a3 3 0 013 3v2a3 3 0 01-3 3h-3l-3 3-3-3H7a3 3 0 01-3-3v-2a3 3 0 013-3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5h6a2 2 0 012 2v1"
        />
      </svg>
    ),
  },
  {
    id: "web",
    title: "WEB",
    subtitle: "Web Development",
    description:
      "We design and build conversion-focused websites that attract more visitors, keep them engaged, and turn them into customers—going far beyond just a beautiful layout.",
    accentColor: "#FBBF24",
    bgImage: "/image/creative.jpg",
    // Browser / code window icon
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Window frame */}
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          ry="2"
          strokeWidth={2}
        />
        {/* Top bar dots */}
        <circle cx="7" cy="8" r="0.7" />
        <circle cx="10" cy="8" r="0.7" />
        <circle cx="13" cy="8" r="0.7" />
        {/* </> */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 12l-2 2 2 2M14 12l2 2-2 2"
        />
      </svg>
    ),
  },
  {
  id: "photo-video",
  title: "PHOTO & VIDEO",
  subtitle: "Photography & Videography",
  description:
    "We plan, shoot, and produce high-quality photography and videography that tell your brand story across digital, social, and offline channels.",
  accentColor: "#F97316",
  bgImage: "/image/digital.jpg", // or e.g. "/image/photo-video.jpg" if you add a new image
  icon: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {/* Camera body */}
      <rect
        x="3"
        y="7"
        width="14"
        height="10"
        rx="2"
        ry="2"
        strokeWidth={2}
      />
      {/* Lens */}
      <circle
        cx="10"
        cy="12"
        r="3"
        strokeWidth={2}
      />
      {/* Top bar / viewfinder */}
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7l1.5-2h3L13 7"
      />
      {/* Small video indicator on the right */}
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 10l4 2.5-4 2.5v-5z"
      />
    </svg>
  ),
}
,
  {
  id: "seo",
  title: "SEO",
  subtitle: "Search Engine Optimization",
  description:
    "We optimize your website structure, content, and performance to improve search rankings, increase organic traffic, and capture high-intent customers.",
  accentColor: "#10B981", // keep or change if you want a different accent
  bgImage: "/image/strategy.jpg", // update to a more SEO-related image if you have one
  icon: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {/* Magnifying glass */}
      <circle
        cx="11"
        cy="11"
        r="4"
        strokeWidth={2}
      />
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 14l4 4"
      />
      {/* Small growth line/graph inside */}
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 11l1-1 1 2 1-2 1 1"
      />
    </svg>
  ),
}

,
];

export default function ServicePillarsStrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full min-h-screen">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="relative h-screen overflow-hidden group"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${card.bgImage})` }}
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col  p-8 text-white">
            {/* Top text (use description as the quote area) */}
            {/* <div className="text-sm opacity-70 leading-relaxed">
              {card.description}
            </div> */}

            {/* Icon (top-right) */}
            <div
              className="absolute top-8 right-2 transition-transform duration-500 group-hover:scale-110 "
              style={{ color: card.accentColor }}
            >
             
                {card.icon}
              
            </div>

            {/* Bottom Content */}
            <div className="mt-auto space-y-4">
              {/* English Title */}
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                {card.title}
              </h2>

              {/* Subtitle bar + subtitle text (horizontal instead of Arabic) */}
              <div className="flex items-center gap-3">
                <div
                  className="w-1 h-16"
                  style={{ backgroundColor: card.accentColor }}
                />
                <h3
                  className="text-xl md:text-2xl font-semibold"
                  style={{ color: card.accentColor }}
                >
                  {card.subtitle}
                </h3>
              </div>
            </div>
          </div>

          {/* Hover border glow */}
          <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
