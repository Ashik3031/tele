import React, { useState, useEffect, useRef } from 'react';

const SplitSection = ({ 
  title, 
  buttonText, 
  buttonLink = "#",
  imageUrl, 
  imageAlt = "Section image",
  customContent = null,
  reverse = false,
  backgroundColor = "#0a0a0a"
}) => {
  const [scale, setScale] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate distance from viewport center (-1 to 1)
      const distance = (sectionCenter - viewportCenter) / (windowHeight / 2);
      
      // Calculate scale (1 to 1.3) - closer to center = larger scale
      const newScale = 1 + (1 - Math.min(Math.abs(distance), 1)) * 0.3;
      
      setScale(newScale);
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen sm:min-h-[70vh] md:min-h-[60vh] lg:min-h-[64vh] flex flex-col md:flex-row"
      style={{ backgroundColor }}
    >
      {/* Text Content */}
      <div className={`w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-12 md:py-0 ${
        reverse ? 'md:order-2 md:items-start' : 'md:order-1 md:items-end'
      }`}>
        <div className={`max-w-xl w-full text-center md:text-${reverse ? 'left' : 'right'}`}>
         <h1
  className="text-xl sm:text-2xl md:text-2xl lg:text-3xl  mb-6 sm:mb-8 md:mb-10 leading-relaxed tracking-wide
             text-transparent bg-clip-text
             bg-[linear-gradient(110deg,#9ca3af,55%,#D9F70D,65%,#9ca3af)]
             bg-[length:200%_100%] animate-shine"
>
  {title}
</h1>

 <button
  onClick={() => (window.location.href = buttonLink)}
  className="px-5 sm:px-6 py-2 sm:py-2.5 bg-gray-200 uppercase text-xs tracking-widest transition-all duration-300 active:scale-95
             text-transparent bg-clip-text
             bg-[linear-gradient(110deg,#9ca3af,55%,#ffffff,65%,#9ca3af)]
             bg-[length:200%_100%] animate-shine hover:bg-gray-700"
>
  {buttonText}
</button>

        </div>
      </div>

      {/* Image or Custom Content */}
      <div className={`w-full md:w-1/2 flex items-center justify-center px-6 py-8 md:p-8 lg:p-12 overflow-hidden ${
        reverse ? 'md:order-1' : 'md:order-2'
      }`}>
        {customContent ? (
          <div className="w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[00px]">
            {customContent}
          </div>
        ) : (
          <div 
            className="w-full max-w-auto sm:max-w-[550px] md:max-w-[400px] aspect-square transition-transform duration-300 ease-out"
            style={{ transform: `scale(${scale})` }}
          >
            <img 
              src={imageUrl} 
              alt={imageAlt}
              className="w-full h-full  rounded-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <SplitSection
        title="YOUR PARTNER IN DIGITAL GROWTH. INTEGRATED MARKETING SERVICES, MEASURABLE RESULTS, AND LASTING IMPACT."
        buttonText="BECOME PARTNER"
        buttonLink="#partner"
        imageUrl="https://res.cloudinary.com/dxq0nrirt/image/upload/v1760450477/ChatGPT_Image_Oct_14__2025__07_10_36_PM-removebg-preview_x3heqq.png"
      />

      <SplitSection
        title="INNOVATIVE SOLUTIONS THAT TRANSFORM YOUR BUSINESS. CUTTING-EDGE TECHNOLOGY, PROVEN STRATEGIES."
        buttonText="GET STARTED"
        buttonLink="#start"
        imageUrl="https://res.cloudinary.com/dxq0nrirt/image/upload/v1760510756/black-friday-sale-banner-template-astronaut-working-laptop_cmlxar.png"
        imageAlt="Innovation concept"
        reverse={true}
        backgroundColor="#0a0a0a"
      />

      <SplitSection
        title="INTERACTIVE EXCELLENCE. EXPERIENCE THE FUTURE OF DIGITAL DESIGN WITH CUTTING-EDGE PARTICLE EFFECTS."
        buttonText="EXPLORE MORE"
        buttonLink="#explore"
        imageUrl="https://res.cloudinary.com/dxq0nrirt/image/upload/v1760511086/black-friday-sale-banner-template-mobile-mockup_oupkph.png"
        imageAlt="Innovation concept"
        backgroundColor="#0a0a0a"
      />
    </div>
  );
}