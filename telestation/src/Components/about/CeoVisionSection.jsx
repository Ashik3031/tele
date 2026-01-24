import React from "react";

const teamMembers = [
  {
    name: "Riveen",
    role: "Managing Director",
    image: "/image/manager1.jpeg", 
  },
  {
    name: "Nihal",
    role: "Director",
    image: "/image/manger2.jpeg",
  },
  {
    name: "Sabil",
    role: "Director",
    image: "/image/manger3.jpg",
  },
  {
    name: "Haseer",
    role: "Director",
    image: "/image/manger3.jpg",
  },
   {
    name: "Ijas",
    role: "Director",
    image: "/image/manger3.jpg",
  },
];

const CeoVisionSection = () => {
  return (
    <section className="w-full bg-[#0a0a0a] pt-6 pb-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main heading */}
        <h2 className="text-center text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
          Meet the Leadership Team
        </h2>

        {/* Optional subtext */}
        {/* <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10 text-sm md:text-base">
          A team of thinkers, builders, and leaders driving the brand forward.
        </p> */}

        {/* Cards row like the reference image */}
        <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="
                relative
                bg-black
                rounded-2xl
                overflow-hidden
                border border-white/10
                shadow-[0_18px_40px_rgba(0,0,0,0.7)]
                transition-transform duration-300 ease-out
                hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.9)]
              "
            >
              {/* Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-72 md:h-80 lg:h-80 object-cover"
              />

              {/* Dark gradient overlay at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Name + role in bottom-left (like the sample image) */}
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-sm md:text-base font-semibold">
                  {member.name}
                </p>
                <p className="text-white/85 text-xs md:text-sm">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CeoVisionSection;
