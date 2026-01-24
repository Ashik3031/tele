// src/assets/Components/HomePage.jsx
import Hero from "./heroo.jsx";
import ServiceSection from "./ServiceSection.jsx";
import PackageSection from "./PackageSection.jsx";
import Cards from "./Cards.jsx";
import ContactPage from "./ContactPage.jsx";
//import HeroSection from "./heroo1.jsx";


export default function HomePage() {
  return (
    <div className="bg-black">
      <Hero />
      {/* <HeroSection/> */}
      <ServiceSection />
      <PackageSection />
     
      {/* <Cards /> */}
      <ContactPage />
    </div>
  );
}
