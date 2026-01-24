import React from "react";
import { useNavigate } from "react-router-dom";

export default function AwardsSection({ imageSrc = "/image/award.png" }) {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <button
         onClick={() => {
    navigate("/awards");
    // scroll to top after route change
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }}
          className="
            w-full overflow-hidden rounded-3xl
            bg-black
           
          "
          aria-label="Open Awards"
        >
          <img
            src={imageSrc}
            alt="Awards"
            draggable={false}
            loading="lazy"
            className="w-full h-auto block object-contain"
          />
        </button>
      </div>
    </section>
  );
}
