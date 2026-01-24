import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import LazyIframe from "./LazyIframe";
import ReelCardLoader from "./ReelCardLoader";

const reels = [
  {
    id: 1,
    reelUrl: "https://www.instagram.com/reel/DTQHm_YDChX/",
    embedUrl: "https://www.instagram.com/reel/DTQHm_YDChX/embed",
   
  
    username: "@wgg_realestate",
  },
  {
    id: 2,
    reelUrl: "https://www.instagram.com/reel/DR7o3pQkgvO/",
    embedUrl: "https://www.instagram.com/reel/DR7o3pQkgvO/embed",
   
    
    username: "@wgg_realestate",
  },
  {
    id: 3,
    reelUrl: "https://www.instagram.com/reel/DNYWkhzyKzA/",
    embedUrl: "https://www.instagram.com/reel/DNYWkhzyKzA/embed",
    
   
    username: "@wgg_realestate",
  },
  {
    id: 4,
    reelUrl: "https://www.instagram.com/reel/DS7xjLTknaE/",
    embedUrl: "https://www.instagram.com/reel/DS7xjLTknaE/embed",
    username: "@wgg_realestate",
  },
];


export default function VideoTestimonials() {
  const [activeReel, setActiveReel] = useState(null);
  const [loadedMap, setLoadedMap] = useState({});
const markLoaded = (id) => setLoadedMap((p) => ({ ...p, [id]: true }));


  // Lock scroll when modal open
  useEffect(() => {
    if (!activeReel) return;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [activeReel]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActiveReel(null);
    if (activeReel) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeReel]);

  return (
    <section className="relative bg-black text-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Featured Reels
        </h2>

        {/* GRID (same layout, just a bit tighter on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reels.map((reel) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => setActiveReel(reel)}
              className="
                relative rounded-2xl overflow-hidden shadow-xl group text-left
                focus:outline-none focus:ring-2 focus:ring-rose-100

                w-full max-w-[240px] mx-auto
                sm:max-w-none sm:mx-0
              "
            >
              {/* SAME CARD DESIGN */}
 <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#6EF1F7] bg-zinc-900">
  {!loadedMap[reel.id] && <ReelCardLoader logoSrc="/logo1.png" />}

  {/* Mobile */}
  <div className="block sm:hidden relative w-full h-full">
    <LazyIframe
      src={reel.embedUrl}
      className="relative w-full h-full"
      style={{
        border: "none",
        transform: "scale(1.3) translateY(-12%)",
        transformOrigin: "center",
      }}
      onLoad={() => markLoaded(reel.id)}
    />
  </div>

  {/* Desktop */}
  <div className="hidden sm:block relative w-full h-full">
    <LazyIframe
      src={reel.embedUrl}
      className="relative w-full h-full"
      style={{
        border: "none",
        transform: "scale(1.25) translateY(-8%)",
        transformOrigin: "center",
      }}
      onLoad={() => markLoaded(reel.id)}
    />
  </div>
</div>




              {/* SAME INFO OVERLAY */}
              <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none">
                {/* <h3 className="text-sm md:text-base font-semibold line-clamp-1">
                  {reel.title}
                </h3> */}
                {/* <p className="text-xs text-gray-300 mt-1">
                  {reel.views} views
                </p> */}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL (unchanged) */}
      {activeReel && (
        <div className="fixed inset-0 z-[999]">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setActiveReel(null)}
          />

          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
            <div className="relative w-[min(92vw,420px)] h-[92svh] max-h-[820px] overflow-hidden rounded-xl border border-white/15 shadow-2xl bg-black">
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                className="absolute top-3 right-3 z-20 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm hover:bg-white/15"
              >
                <X className="w-4 h-4" />
                Close
              </button>

              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  key={activeReel.id}
                  src={`${activeReel.embedUrl}?autoplay=1&muted=0`}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    border: "none",
                    transform: "scale(1.42) translateY(-8%)",
                    transformOrigin: "center",
                  }}
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; encrypted-media; clipboard-write"
                  allowFullScreen
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                {/* <h3 className="text-base font-semibold">{activeReel.title}</h3> */}

                <a
                  href={activeReel.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm hover:bg-white/15"
                >
                  Open on Instagram
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
