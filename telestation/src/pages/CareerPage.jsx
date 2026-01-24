import CareersBackground from "../Components/career/CareerBackground";
import CareersHero from "../Components/career/CareersHero";
import CareersIntroSection from "../Components/career/CareerIntroSection";
import CareersPerks from "../Components/career/CareersPerks";
import CareersForm from "../Components/career/CareerFrom";
import CareersTimeline from "../Components/career/CareerTimeline";
import CareersOpenings from "../Components/career/CareersOpenings";

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <CareersBackground />
      <CareersIntroSection />
      <CareersHero />
      <CareersOpenings/>
      <CareersPerks />
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <CareersForm />
      </div>
      <CareersTimeline />
    </div>
  );
}
