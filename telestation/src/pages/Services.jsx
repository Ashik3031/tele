
import React from "react";
import ServiceSplitSection from "../Components/services/ServiceSplitSection";
import { serviceSplitSections } from "../data/serviceSplitSections";
import ServicePillarsStrip from "../Components/services/ServicePillarsStrip";
import DigitalMarketingHero from "../Components/digitalMarketing/DigitalMarketingHero";
import FourServiceStripExact from "../Components/services/FourServiceStripExact";
import ServicesHero from "../Components/services/ServiceHero";
import ServiceHeadSection from "@/Components/ServiceHeadSection";
import ServicesScroll from "@/Components/ServiceHeadSection";
import SimpleContactForm from "@/Components/SimpleContact";
import AnimatedHero from "../Components/services/ServiceHero";


const ServicesPage = () => {
  return (
    <main className="bg-black">
      {/* <FourServiceStripExact/> */}
        {/* <DigitalMarketingHero /> */}
        <AnimatedHero/>
        <ServicesScroll/>
        <SimpleContactForm/>
       
      {/* {serviceSplitSections.map((section) => (
        <ServiceSplitSection key={section.id} section={section} />
      ))} */}
    </main>
  );
};

export default ServicesPage;
