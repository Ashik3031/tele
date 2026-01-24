import React from 'react'
import AboutHeadSection from '../Components/about/AboutHeadSection'
import CeoVisionSection from '../Components/about/CeoVisionSection'
import TeamSection from '../Components/about/TeamSection'
import CoreValuesSection from '../Components/about/CoreValuesSection'
import LifeAtDigtelSection from '../Components/about/LifeAtDigtelSection'

function AboutPage() {
  return (
    <main className='min-h-screen bg-black'>
        <AboutHeadSection/>
        <CeoVisionSection/>
        <TeamSection />
        {/* <CoreValuesSection /> */}
        <LifeAtDigtelSection />
    </main>
  )
}

export default AboutPage