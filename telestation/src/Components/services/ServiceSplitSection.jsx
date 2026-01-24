import React, { useEffect, useRef, useState } from "react";

const ServiceSplitSection = ({ section }) => {
  const {
    title,
    description,
    bullets = [],
    imageSrc,
    imageAlt = "",
    exploreHref = "#",
    ctaLabel = "Discover More",
    headingLabel = "Development Services",
  } = section;

  const [isVisible, setIsVisible] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start revealing image after initial animations
          setTimeout(() => setShowImage(true), 900);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Enhanced parallax and floating effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    const container = imageContainerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Continuous floating animation for image
  useEffect(() => {
    if (!isVisible) return;
    
    let animationFrame;
    let time = 0;
    
    const animate = () => {
      time += 0.01;
      if (imageContainerRef.current) {
        const floatY = Math.sin(time) * 8;
        const floatX = Math.cos(time * 0.7) * 5;
        imageContainerRef.current.style.transform = `translate(${floatX + mousePosition.x * 5}px, ${floatY + mousePosition.y * 5}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, mousePosition]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#05030a]  text-white"
    >
      {/* Animated background */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: isVisible ? 'gridPulse 4s ease-in-out infinite' : 'none',
          }}
        />
        <div 
          className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[#D8F70C]/15 blur-3xl"
          style={{
            animation: isVisible ? 'floatBlob1 8s ease-in-out infinite' : 'none',
          }}
        />
        <div 
          className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#D8F70C]/15 blur-3xl"
          style={{
            animation: isVisible ? 'floatBlob2 10s ease-in-out infinite' : 'none',
            animationDelay: '1s',
          }}
        />
        <div 
          className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-[#D8F70C]/10 blur-3xl"
          style={{
            animation: isVisible ? 'floatBlob3 12s ease-in-out infinite' : 'none',
            animationDelay: '2s',
          }}
        />
      </div> */}

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-6 lg:gap-14">
        {/* Top label with animated underline */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block relative">
            {/* <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D8F70C]/80">
              {headingLabel}
            </p> */}
            <div 
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D8F70C] to-transparent transition-all duration-1000 delay-300"
              style={{ width: isVisible ? '100%' : '0%' }}
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)_1.1fr] lg:items-center">
          
          {/* LEFT CONTENT */}
          <div
            className={`space-y-6 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight overflow-hidden">
              {title.split(' ').map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-all duration-700"
                  style={{
                    transitionDelay: `${150 + idx * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                  }}
                >
                  {word}{' '}
                </span>
              ))}
            </h2>

           <p className="max-w-md text-white/60 leading-relaxed text-[15px] whitespace-pre-line">
  {description}
</p>


            <div 
              className="transition-all duration-700 delay-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              }}
            >
              <a
                href={exploreHref}
                className="group inline-flex w-max items-center gap-2 rounded-full bg-[#D8F70C] px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_20px_50px_rgba(216,247,12,0.5)] hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                {ctaLabel}
                {/* <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span> */}
              </a>
            </div>
          </div>

          {/* CENTER IMAGE WITH COLOR BLOCK TO IMAGE REVEAL */}
          <div
            ref={imageContainerRef}
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mx-auto w-full max-w-md">
              <div 
                className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/5 via-transparent to-white/5 p-[1px] transition-all duration-700"
                style={{
                  transform: `scale(${isVisible ? 1 : 0.9})`,
                  animation: isVisible ? 'borderGlow 3s ease-in-out infinite' : 'none',
                }}
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-black via-[#0a0a0a] to-black">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    {/* Color block background - always visible */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D8F70C]/25 via-[#D8F70C]/15 to-[#0a0a0a]">
                      {/* Animated gradient overlay on color block */}
                      <div 
                        className="absolute inset-0 opacity-50"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(216,247,12,0.3), transparent 70%)',
                          animation: isVisible ? 'pulse 3s ease-in-out infinite, rotate 20s linear infinite' : 'none',
                        }}
                      />
                      {/* Additional moving gradient */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(45deg, transparent, rgba(216,247,12,0.2), transparent)',
                          animation: isVisible ? 'slideGradient 4s ease-in-out infinite' : 'none',
                        }}
                      />
                    </div>
                    
                    {/* Image layer - fades in on top */}
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      className="absolute inset-0 h-full w-full object-cover transition-all duration-1000"
                      style={{
                        opacity: showImage ? 1 : 0,
                        transform: showImage ? 'scale(1)' : 'scale(1.1)',
                        animation: showImage ? 'subtleZoom 15s ease-in-out infinite' : 'none',
                      }}
                    />
                    
                    {/* Shine sweep effect during reveal */}
                    <div 
                      className="absolute inset-0 z-[2] pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 20%, rgba(216,247,12,0.7) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                        backgroundPosition: showImage ? '100% 0' : '-100% 0',
                        opacity: showImage ? 0 : 1,
                        transition: 'background-position 1.2s ease-out, opacity 1.2s ease-out',
                      }}
                    />
                    
                    {/* Continuous edge glow */}
                    <div 
                      className="absolute inset-0 z-[2] pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 60px rgba(216,247,12,0.2)',
                        animation: showImage ? 'edgeGlow 3s ease-in-out infinite' : 'none',
                      }}
                    />
                  </div>

                  {/* Bottom gradient overlay */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-[#D8F70C]/10 to-transparent z-[3] transition-opacity duration-1000"
                    style={{
                      opacity: showImage ? 1 : 0.3,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BULLETS */}
          <div
            className={`flex flex-col gap-3 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {bullets.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden border-b border-white/5 pb-3 last:border-b-0 transition-all duration-300 hover:border-[#D8F70C]/30 cursor-pointer"
                style={{
                  transitionDelay: `${400 + idx * 50}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D8F70C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" 
                  style={{
                    animation: 'slideGradient 2s ease-in-out infinite',
                    animationPlayState: 'paused',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                  onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                />
                
                {/* Glow effect on hover */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#D8F70C] rounded-full opacity-0 group-hover:opacity-100 group-hover:h-8 transition-all duration-300 shadow-[0_0_20px_rgba(216,247,12,0.8)]" />
                
                <p className="text-[15px] md:text-base font-medium text-white/70 transition-all duration-300 group-hover:text-white group-hover:translate-x-3 flex items-center gap-2 overflow-hidden">
                  <span 
                    className="inline-block w-1.5 h-1.5 rounded-full bg-[#D8F70C]/40 transition-all duration-300 group-hover:bg-[#D8F70C] group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(216,247,12,0.8)]" 
                    style={{
                      animation: 'pulse 2s ease-in-out infinite',
                      animationPlayState: 'paused',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                    onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                  />
                  <span className="flex flex-wrap">
                    {item.split(' ').map((word, wordIdx) => (
                      <span
                        key={wordIdx}
                        className="inline-block mr-1"
                        style={{
                          transitionDelay: `${400 + idx * 50 + wordIdx * 20}ms`,
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                          transition: 'all 0.5s ease-out',
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes slideGradient {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        
        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(216,247,12,0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(216,247,12,0.6);
          }
        }
        
        @keyframes edgeGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        @keyframes subtleZoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes floatBlob1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes floatBlob2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(0.9);
          }
          66% {
            transform: translate(20px, -20px) scale(1.1);
          }
        }
        
        @keyframes floatBlob3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        
        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.04;
          }
          50% {
            opacity: 0.08;
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceSplitSection;