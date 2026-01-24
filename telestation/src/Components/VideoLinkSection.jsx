import { useState } from 'react';
import { Instagram, ExternalLink, X, Maximize2 } from 'lucide-react';

export default function RealEstatePodcast() {
  const [selectedReel, setSelectedReel] = useState(null);

  const reels = [
    {
      id: 1,
      reelUrl: "https://www.instagram.com/reel/DOqDVCTiaF7/",
      embedUrl: "https://www.instagram.com/reel/DOqDVCTiaF7/embed/captioned",
      title: "Dubai Marina Luxury Tour",
      views: "125K",
      username: "@wgg_realestate"
    },
    {
      id: 2,
      reelUrl: "https://www.instagram.com/reel/DLiJXW6yAdy/",
      embedUrl: "https://www.instagram.com/reel/DLiJXW6yAdy/embed/captioned",
      title: "Investment Tips 2025",
      views: "89K",
      username: "@wgg_realestate"
    },
    {
      id: 3,
      reelUrl: "https://www.instagram.com/reel/DHa40wvpZyz/",
      embedUrl: "https://www.instagram.com/reel/DHa40wvpZyz/embed/captioned",
      title: "Premium Properties",
      views: "156K",
      username: "@wgg_realestate"
    },
    {
      id: 4,
      reelUrl: "https://www.instagram.com/reel/DGGF845JoEK/",
      embedUrl: "https://www.instagram.com/reel/DGGF845JoEK/embed/captioned",
      title: "Market Insights",
      views: "94K",
      username: "@wgg_realestate"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-emerald-400 font-semibold text-sm tracking-wider border border-emerald-400/30 px-4 py-2 rounded-full bg-emerald-400/10">
                [Podcast]
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Markting podcast about{' '}
              <span className="text-emerald-400">real estate business</span>{' '}
              in Dubai
            </h1>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                In this insightful episode,{' '}
                <span className="text-emerald-400">we speak with Abed, a marketing expert</span>,
                who led major brand transformations at Meraas and Nakheel.
                We talk about why so many real estate developers in Dubai tell the
                same story — luxury, lifestyle, premium? And how can a brand actually
                stand out?
              </p>
              
              <p>
                Watch the video, to learn{' '}
                <span className="text-emerald-400">practical insights on the real challenges of real
                estate marketing in the UAE</span> — and what truly works in today's
                competitive landscape.
              </p>
            </div>

            <button className="group flex items-center gap-2 text-emerald-400 font-semibold hover:gap-3 transition-all duration-300">
              Watch the video
              <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Content - Video */}
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl z-10 pointer-events-none"></div>
            
            {/* YouTube Embed */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2 pointer-events-none">
              <div className="text-emerald-400 font-bold text-lg lg:text-xl">
                our MARKETING SECRETS:
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="bg-black/60 px-3 py-1 rounded-full">Abed Bibi</span>
                <span className="bg-black/60 px-3 py-1 rounded-full">Anna Voskresenskaya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Reels Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {/* <Instagram className="w-8 h-8 text-pink-500" /> */}
              <h2 className="text-3xl font-bold">Featured Videos</h2>
            </div>
           
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {reels.map((reel) => (
              <div
                key={reel.id}
                className="relative group"
              >
                {/* Reel Container - Full Screen Video */}
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-xl border-2 border-gray-800 hover:border-emerald-400 transition-all duration-300">
                  <iframe
                    src={reel.embedUrl}
                    className="w-full h-full scale-[1.8] origin-center"
                    style={{
                      border: 'none',
                      overflow: 'hidden',
                    }}
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency="true"
                    allow="encrypted-media; autoplay; clipboard-write"
                  ></iframe>

                  {/* Expand Button Overlay */}
                  <div className="absolute top-3 right-3 z-30">
                    <button
                      onClick={() => setSelectedReel(reel)}
                      className="w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    >
                      <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Instagram Badge */}
                  {/* <div className="absolute top-3 left-3 z-30">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                  </div> */}

                  {/* Bottom Info - Only on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <p className="text-xs text-emerald-400 font-semibold">{reel.username}</p>
                    <h3 className="text-sm font-bold line-clamp-1">{reel.title}</h3>
                    <p className="text-xs text-gray-400">{reel.views} views</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedReel && (
        <div 
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReel(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-50"
            onClick={() => setSelectedReel(null)}
          >
            <X className="w-7 h-7" />
          </button>
          
          <div 
            className="relative w-full max-w-lg h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={selectedReel.embedUrl}
              className="w-full h-full scale-[1.8] origin-center"
              style={{
                border: 'none',
                overflow: 'hidden',
              }}
              frameBorder="0"
              scrolling="no"
              allowTransparency="true"
              allow="encrypted-media; autoplay; clipboard-write"
            ></iframe>
          </div>
          
          {/* <div className="absolute bottom-8 left-0 right-0 text-center space-y-2">
            <a
              href={selectedReel.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View on Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </div> */}
        </div>
      )}

      {/* Decorative Elements */}
      <div className="fixed top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}