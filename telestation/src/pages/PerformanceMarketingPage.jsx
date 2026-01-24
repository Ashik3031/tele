import React from 'react'
import ServiceHero from '../Components/common/ServiceHero'
import ServiceServicesSection from '../Components/common/ServiceServicesSection'
import VideoContactSection from '../Components/videography/VideoContactSection'
import ServiceEducationSection from '../Components/common/ServiceEducationSection'

function PerformanceMarketingPage() {
  return (
    <div>
        <ServiceHero serviceKey="performanceMarketing" />
        <ServiceEducationSection serviceKey="performanceMarketing" />
        <ServiceServicesSection serviceKey="performanceMarketing" />
        <VideoContactSection/>
    </div>
  )
}

export default PerformanceMarketingPage