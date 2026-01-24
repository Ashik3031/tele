import React, { useState, useEffect, useRef } from 'react';

const ServicesPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    {
      id: 1,
      title: "Social Media Management",
      subtitle: "SERVICES",
      features: [
        "Managing 2 accounts: Instagram & TikTok",
        "Copywriting & caption writing",
        "30+ monthly content",
        "Reposting with editing & voice-over",
        "Publishing & engagement"
      ],
      cta: "Free Consultation"
    },
    {
      id: 2,
      title: "Production",
      subtitle: "SERVICES",
      features: [
        "Professional video production",
        "Photography & visual content",
        "Studio & on-location shoots",
        "Post-production editing",
        "Brand storytelling"
      ],
      cta: "Get Started"
    },
    {
      id: 3,
      title: "Paid Advertising",
      subtitle: "SERVICES",
      features: [
        "Targeted ads (Instagram & TikTok)",
        "Campaign optimization",
        "Budget management",
        "Messages Ads",
        "Lead Generation Ads",
        "Website Traffic Ads",
        "Increase Followers Ads"
      ],
      cta: "Explore"
    },
    {
      id: 4,
      title: "Technical Services",
      subtitle: "SERVICES",
      features: [
        "Website development & maintenance",
        "SEO optimization",
        "Analytics & tracking setup",
        "E-commerce solutions",
        "Technical consulting"
      ],
      cta: "Learn More"
    },
    {
      id: 5,
      title: "Brand Strategy",
      subtitle: "SERVICES",
      features: [
        "Brand identity development",
        "Market research & analysis",
        "Competitive positioning",
        "Brand guidelines creation",
        "Long-term growth planning"
      ],
      cta: "Start Building"
    }
  ];

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const getCardStyle = (index) => {
    if (isMobile) {
      // Mobile: Simple stacking
      return {
        transform: index === activeIndex ? 'scale(1)' : 'scale(0.95)',
        opacity: index === activeIndex ? 1 : 0.6,
        zIndex: index === activeIndex ? 100 : 50,
        pointerEvents: 'auto'
      };
    }

    let diff = index - activeIndex;
    
    if (diff < 0) {
      diff = services.length + diff;
    }
    
    if (diff === 0) {
      return {
        transform: 'translateX(0px) scale(1)',
        opacity: 1,
        zIndex: 100,
        pointerEvents: 'auto'
      };
    } else {
      const baseOffset = 120;
      const offset = baseOffset + (diff - 1) * 70;
      const scale = 0.90 - (diff - 1) * 0.08;
      const opacity = 0.7 - (diff - 1) * 0.15;
      
      return {
        transform: `translateX(${offset}px) scale(${Math.max(scale, 0.7)})`,
        opacity: Math.max(opacity, 0.3),
        zIndex: 100 - diff,
        pointerEvents: 'auto'
      };
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen  text-white relative overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover "
        >
          <source src="https://res.cloudinary.com/dugtxybef/video/upload/v1760779100/4K-Fog-Overlay-Free-Download-_-Smoke-Overlay-Effect-Free-Download-_-Royalty-Free-_-No-Copyright_qnt2co.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 "></div>
      </div>

      {/* Hero Section at Top */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-widest mb-4 sm:mb-6">
            Our Services
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 leading-relaxed px-4">
            At Pulse, we empower businesses with management and tailored marketing solutions that drive growth, build strong brands, and streamline operations for lasting success.
          </p>
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-600 uppercase tracking-wider mb-4 sm:mb-6 px-4">
              Platinum Package
            </h2>
            <p className="text-gray-500 italic text-sm sm:text-base md:text-lg px-4">
              A full-scale management solution for ambitious businesses...
            </p>
          </div>
        </div>
      </div>
      
      {/* Mobile Layout */}
      {isMobile ? (
        <div className="relative z-10 px-4 sm:px-6 pb-24">
          {/* Service Cards - Mobile Carousel */}
          <div className="mb-12">
            <div className="relative h-[600px] sm:h-[650px] flex items-center justify-center">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`absolute w-full max-w-md transition-all duration-500 ${
                    index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '50px 50px'
                    }}></div>
                    
                    <div className="absolute top-6 right-6 w-24 h-24 border border-cyan-500/20 rounded-full"></div>
                    <div className="absolute bottom-6 right-6 w-32 h-32 border border-blue-500/20 rotate-45 rounded-lg"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black text-lg mx-auto mb-4">
                        {service.id}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight text-white">
                        {service.title}
                      </h3>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                        <p className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">
                          {service.subtitle}
                        </p>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="relative z-10 space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-300">
                          <span className="text-cyan-400 mr-3 mt-1">•</span>
                          <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="relative z-10 flex justify-center">
                      <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded uppercase tracking-wider transition-all duration-300 font-medium text-sm">
                        {service.cta}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots - Mobile */}
          <div className="flex justify-center gap-3 mb-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-8 h-3 bg-cyan-500'
                    : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows - Mobile */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center hover:bg-cyan-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="text-xl">←</span>
            </button>
            <button
              onClick={() => setActiveIndex(Math.min(services.length - 1, activeIndex + 1))}
              disabled={activeIndex === services.length - 1}
              className="w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center hover:bg-cyan-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="min-h-screen flex items-center py-12 lg:py-20 relative z-10">
          <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 flex flex-col xl:flex-row items-start gap-12 xl:gap-20">
            
            {/* Left Side: Timeline + Content */}
            <div className="flex gap-8 lg:gap-12 w-full xl:w-[800px] flex-shrink-0">
              {/* Timeline */}
              <div className="relative w-16 lg:w-20 flex flex-col items-center justify-center h-[500px] flex-shrink-0">
                <div className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
                
                <div className="relative flex flex-col justify-between h-full py-4">
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      className="relative flex items-center justify-center"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                          index === activeIndex
                            ? 'border-cyan-400 bg-cyan-400 scale-150 shadow-lg shadow-cyan-500'
                            : index < activeIndex
                            ? 'border-cyan-600 bg-cyan-600'
                            : 'border-gray-600 bg-transparent'
                        }`}
                      >
                        {index === activeIndex && (
                          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping"></div>
                        )}
                      </div>
                      
                      {index === activeIndex && (
                        <div className="absolute -left-14 lg:-left-16 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black text-base lg:text-lg">
                          {service.id}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Service Content */}
              <div className="flex-1">
                <div className="transition-all duration-500">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-8 leading-tight">
                    {services[activeIndex].title}
                  </h2>
                  
                  <ul className="space-y-3 lg:space-y-4 mb-8 lg:mb-10">
                    {services[activeIndex].features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-300 transition-all duration-300"
                        style={{
                          animation: `slideIn 0.3s ease-out ${idx * 0.1}s both`
                        }}
                      >
                        <span className="text-cyan-400 mr-3 lg:mr-4 mt-1.5 text-base lg:text-lg">•</span>
                        <span className="text-base lg:text-lg leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 lg:px-10 py-3 lg:py-4 rounded uppercase tracking-wider transition-all duration-300 font-medium text-sm">
                    {services[activeIndex].cta}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Horizontally Stacked Cards */}
            <div className="relative w-full xl:w-[750px] h-[500px] flex-shrink-0 overflow-visible">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="absolute top-0 left-0 w-80 lg:w-96 transition-all duration-700 ease-out cursor-pointer group"
                  style={getCardStyle(index)}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-slate-700/50 rounded-3xl p-8 lg:p-10 hover:border-cyan-400/70 transition-all duration-300 backdrop-blur-xl shadow-2xl h-[500px] flex flex-col justify-center items-center overflow-hidden group-hover:shadow-cyan-500/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '50px 50px'
                    }}></div>
                    
                    <div className="absolute top-8 right-8 w-32 h-32 border border-cyan-500/20 rounded-full"></div>
                    <div className="absolute top-16 right-16 w-20 h-20 border border-cyan-400/15 rounded-full"></div>
                    <div className="absolute top-12 right-24 w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse"></div>
                    
                    <div className="absolute bottom-12 right-12 w-40 h-40 border border-blue-500/20 rotate-45 rounded-lg"></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 border border-blue-400/15 rotate-45 rounded-lg"></div>
                    
                    <div className="absolute top-1/3 right-6 w-3 h-3 bg-cyan-500/30 rounded-full"></div>
                    <div className="absolute top-1/2 right-12 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-1/3 right-8 w-2 h-2 bg-cyan-300/30 rounded-full"></div>
                    
                    <div className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-cyan-500/10 rounded-tr-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-blue-500/10 rounded-br-3xl"></div>
                    
                    <div className="absolute top-1/4 -right-8 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute bottom-1/4 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{transitionDelay: '0.2s'}}></div>
                    
                    <div className="relative z-10 text-center">
                      <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 leading-tight text-white drop-shadow-lg">
                        {service.title}
                      </h3>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                        <p className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">
                          {service.subtitle}
                        </p>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-10 left-0 right-0 z-10 px-10">
                      {index !== activeIndex ? (
                        <div className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity font-medium flex items-center justify-center gap-2">
                          <span>Click to view</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-medium">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span>Active Service</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Arrows - Desktop Only */}
      {!isMobile && (
        <div className="fixed bottom-8 lg:bottom-12 right-8 lg:right-12 flex gap-3 lg:gap-4 z-50">
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center hover:bg-cyan-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="text-lg lg:text-xl">←</span>
          </button>
          <button
            onClick={() => setActiveIndex(Math.min(services.length - 1, activeIndex + 1))}
            disabled={activeIndex === services.length - 1}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center hover:bg-cyan-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="text-lg lg:text-xl">→</span>
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;