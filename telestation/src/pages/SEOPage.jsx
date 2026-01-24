//import React from 'react'

import ClientsMarquee from '../Components/seo/ClientsMarquee'
import SEOProcess from '../Components/seo/SEOProcess'

import SEOApproachSection from '../Components/seo/SEOApproachSection'
import VideoContactSection from '../Components/videography/VideoContactSection'
//import SEOEducationSection from '../Components/seo/SEOEducationSection'
import SEOTestimonials from '../Components/seo/SEOTestimonials'
//import SEOFAQSection from '../Components/seo/SEOFAQSection'
import ServiceHero from '../Components/common/ServiceHero'
import ServiceServicesSection from '../Components/common/ServiceServicesSection'
import ServiceFAQSection from '../Components/common/ServiceFAQSection'
import ServiceEducationSection from '../Components/common/ServiceEducationSection'
import StatsStrip from '../Components/seo/StatsStrip'
import AISEO2026 from '../Components/seo/AISEO'

function SEOPage() {
  return (
    <div>
        <ServiceHero serviceKey="seo" />
        <StatsStrip/>
        <SEOProcess/>
        <AISEO2026 />
       <ServiceServicesSection serviceKey="seo" />
        <SEOApproachSection/>
       <ServiceEducationSection serviceKey="seo" />
        <SEOTestimonials type='seo'/>
        <ServiceFAQSection serviceKey="seo" />
        <VideoContactSection/>
    </div>
  )
}

export default SEOPage