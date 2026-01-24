import React from "react";
//import ServiceHero from '../Components/common/ServiceHero'
import ClientsMarquee from "../Components/seo/ClientsMarquee";
import ServiceServicesSection from "../Components/common/ServiceServicesSection";
import SEOTestimonials from "../Components/seo/SEOTestimonials";
import VideoContactSection from "../Components/videography/VideoContactSection";
import ServiceFAQSection from "../Components/common/ServiceFAQSection";
import ServiceEducationSection from "../Components/common/ServiceEducationSection";
import IndustriesSection from "../Components/common/IndustriesSection";
import Ribbon from "../Components/social media/Ribbon";
import HoverExpandCards from "../Components/social media/HoverExpandCards";
import Hero from "../Components/social media/Hero";
import InstagramEmbedGrid from "../Components/social media/InstagramEmbedGrid";
import data from "../data/clientMarquee.json";

function SocialMediaPage() {
  return (
    <div>
      <Hero serviceKey="socialmedia" />
      <Ribbon />
     <ClientsMarquee
        label={data.socialMedia.label}
        items={data.socialMedia.items}
        speed={26}
        glow="#D9F70D"
      />
      <ServiceServicesSection serviceKey="socialMedia" />
      <InstagramEmbedGrid 
      title="Our Social Media Portfolio"
        brandColor="#D9F70D"
        username="Digtel"
        followUrl="https://instagram.com/fajrinteriors"
        links={[
          "https://www.instagram.com/p/DO04ES_k8D4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
          "https://www.instagram.com/p/DJY2hAgzQF9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
          "https://www.instagram.com/p/DOqkO93E5aV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
          "https://www.instagram.com/p/DI9MMjip8Ci/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        ]}
      />
      <ServiceEducationSection serviceKey="socialMedia" />
      <IndustriesSection />
      <HoverExpandCards />
      <SEOTestimonials type="socialMedia" />
      

      <ServiceFAQSection serviceKey="socialMedia" />
      <VideoContactSection />
    </div>
  );
}

export default SocialMediaPage;
