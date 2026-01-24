import React from 'react'
import ServiceHero from '../Components/common/ServiceHero'
//import VideoMarketingIntro from '../Components/videography/VideoMarketingIntro'
import ClientsMarquee from '../Components/seo/ClientsMarquee'
import ServiceEducationSection from '../Components/common/ServiceEducationSection'
import ServiceServicesSection from '../Components/common/ServiceServicesSection'
import ProcessSteps from '../Components/website/ProcessSteps'
//import IndustriesSection from '../Components/common/IndustriesSection'
import SEOTestimonials from '../Components/seo/SEOTestimonials'
import VideoContactSection from '../Components/videography/VideoContactSection'
//import IntegratedDigitalServicesAlt from '../Components/website/IntegratedDigitalServicesAlt'
import FeaturedProjects from '../Components/website/FeaturedProjects'
import StatsRibbon from '../Components/StatsRibbon'
import ServiceFAQSection from '../Components/common/ServiceFAQSection'
import data from '../data/clientMarquee.json'

function WebsitePage() {
  return (
    <div>
        <ServiceHero serviceKey="website" />
       <ClientsMarquee
        label={data.website.label}
        items={data.website.items}
        speed={30}
        glow="#5B21FF"
      />
        <ServiceEducationSection serviceKey="webDevelopment"/>
        <FeaturedProjects />
        <ServiceServicesSection serviceKey="webDevelopment" />
        <StatsRibbon />
        <ProcessSteps/>
        {/* <IndustriesSection /> */}
        {/* <IntegratedDigitalServicesAlt/> */}
        <SEOTestimonials type="website" />
        <ServiceFAQSection serviceKey="website" />
        <VideoContactSection />
        
    </div>
  )
}

export default WebsitePage