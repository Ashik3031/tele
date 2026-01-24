import React from 'react'
import Hero from "./heroo.jsx"
import ServiceList from "./ServiceLIst.jsx"
 import ServiceSection from './ServiceSection.jsx'
import ContactPage from './ContactPage.jsx'
import ClientCount from './ClientCount.jsx'
import VideoLinkSection from './VideoLinkSection.jsx'
import OurStorySection from './OurStorySection.jsx'
import VideoTestimonials from './VideoTestimonials.jsx'
import TrustedByLeadingBrands from './TrustedLeadingBrands.jsx'

import WhyTelestationPixel from './TelesalesWhySection.jsx'
import TwoNationShowcase from './TwoNationShowcase.jsx'
import LogoMarquee from './LogoMarquee.jsx'
import AwardsPage from '@/pages/AwardPage.jsx'
import AwardsSection from './AwardSection.jsx'


const Landingpage = () => {
  return (
    <>  
      <Hero />
      {/* <TippingPointHero/> */}
       {/* <ClientCount />
       <ServiceList />
       */}
      {/* <ServiceSection /> */}
    
      <WhyTelestationPixel/>
      <TwoNationShowcase/>
        <OurStorySection />
        <LogoMarquee/>
        <AwardsSection/>
      {/* <VideoLinkSection /> */}
      {/* <TrustedByLeadingBrands /> */}
      <VideoTestimonials />
      <ContactPage/>
    </>
  )
} 

export default Landingpage






// import React from 'react'
// import Hero from "./heroo.jsx"
// import ServiceList from "./ServiceLIst.jsx"
//  import ServiceSection from './ServiceSection.jsx'
// import ContactPage from './ContactPage.jsx'


// const Landingpage = () => {
//   return (
//     <>
//      <Hero />
//      <ServiceList />
//      <ServiceSection />
//      <ContactPage/>
//     </>
//   )
// }

// export default Landingpage
