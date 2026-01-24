import React from 'react'

import VideoMarketingIntro from '../Components/videography/VideoMarketingIntro'
import OurWorkSection from '../Components/videography/OurWorkSection'
import VideoMarketingServicesGrid from '../Components/videography/VideoMarketingServicesGrid'
import VideoContactSection from '../Components/videography/VideoContactSection'
import VideoProductionIntro from '../Components/videography/VideoProductionIntro'
import ThinkingWithUs from '../Components/videography/ThinkingWithUs'
import ServiceHero from '../Components/common/ServiceHero'
import SEOTestimonials from '../Components/seo/SEOTestimonials'
import ServiceFAQSection from '../Components/common/ServiceFAQSection'
import StatsStrip from '../Components/videography/StatsStrip'

function VideographyPage() {
  return (
    <div>
        <ServiceHero serviceKey="videography" />
        <VideoMarketingIntro/>
        <OurWorkSection/>
        <StatsStrip/>
        <VideoProductionIntro />
        <VideoMarketingServicesGrid/>
        <SEOTestimonials type="videography" />
        <ServiceFAQSection serviceKey="videography" />
        {/* <ThinkingWithUs/> */}
        <VideoContactSection />
    </div>
  )
}

export default VideographyPage