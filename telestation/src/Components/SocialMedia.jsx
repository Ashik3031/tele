// --------------------------------------------------------------
// SocialMediaPage.jsx
import {
  Target,
  MessageCircle,
  Video,
  TrendingUp,
  Users,
  Brain,
} from "lucide-react";
import ServicePageTemplate_ from "./ServiceComponent"; // ensure this file exports default ServicePageTemplate

export const SocialMediaPage = () => {
  const pageContent = {
    hero: {
      mainTitle: "Social Media",
      highlightTitle: "Marketing",
      endTitle: "Services.",
      subtitle:
        "Build your brand presence and engage your audience with data-driven social media strategies across all platforms.",
      ctaText: "Get started",
      bg: undefined,
    },
    servicesHeader: "Our social media services.",
    services: [
      { id: 1, icon: Target, title: "Strategy & Planning", number: "01" },
      { id: 2, icon: MessageCircle, title: "Community Management", number: "02" },
      { id: 3, icon: Video, title: "Content Creation", number: "03" },
      { id: 4, icon: TrendingUp, title: "Social Advertising", number: "04" },
      { id: 5, icon: Users, title: "Influencer Partnerships", number: "05" },
      { id: 6, icon: Brain, title: "Analytics & Insights", number: "06" },
    ],
    serviceDetails: [
      {
        number: "01",
        title: "Strategy & Planning",
        description:
          "We craft comprehensive social media strategies aligned with your business goals, analyzing your audience and competitors to create a roadmap for success.",
        tags: [
          "Audience Research",
          "Competitor Analysis",
          "Content Calendar",
          "Platform Strategy",
          "Brand Voice Development",
          "KPI Definition",
        ],
        link: "/services/social-media/strategy",
      },
      {
        number: "02",
        title: "Community Management",
        description:
          "Build meaningful relationships with your audience through active engagement, timely responses, and authentic conversations that drive loyalty.",
        tags: ["24/7 Monitoring", "Response Management", "Crisis Management", "Community Building"],
        link: "/services/social-media/community",
      },
      {
        number: "03",
        title: "Content Creation",
        description:
          "From eye-catching graphics to compelling videos, we create scroll-stopping content that resonates with your audience and drives engagement.",
        tags: [
          "Graphic Design",
          "Video Production",
          "Copywriting",
          "Photography",
          "Story Development",
          "Reels & Shorts",
        ],
        highlightTags: ["Video Production"],
        link: "/services/social-media/content",
      },
      {
        number: "04",
        title: "Paid Social & Optimization",
        description:
          "Full-funnel campaigns with rapid creative testing and weekly optimization cycles to maximize ROAS.",
        tags: ["A/B Testing", "Lookalikes", "Retargeting", "Attribution"],
        link: "/services/social-media/ads",
      },
    ],
    partnerships: {
      title: "Tech & partnerships.",
      logos: [
        { name: "AWS", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
        { name: "Bridge", src: "https://assets.website-files.com/5e7cf1f1e8f56a8fd64c6b7c/5e7cf1f1e8f56a3f994c6bb4_bridge-logo.svg" },
        { name: "CIRCLE", src: "https://www.circle.com/hubfs/sundaes/CIRCLE%20logo.svg" },
        { name: "Google Cloud", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
        { name: "HubSpot", src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
        { name: "Gemini", src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
        { name: "OpenAI", src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
        { name: "Stellar", src: "https://stellar.org/assets/logo.svg" },
        { name: "Drant", src: "https://www.drant.com/logo.svg" },
        { name: "LangChain", src: "https://avatars.githubusercontent.com/u/126733545" },
        { name: "Linux Foundation", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Linux_Foundation_logo.svg" },
        { name: "Azure", src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
        { name: "Algolia", src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Algolia_logo.svg" },
        { name: "8thWall", src: "https://cdn.8thwall.com/web/img/logo-v3.svg" },
      ],
    },
    portfolio: {
      title: "Our Featured works",
      items: [
        {
          name: "THAW",
          logo: "/logos/thaw.svg",
          description: "Flutter-powered IoT app for personalized temperature control",
          tags: ["IoT", "Mobile"],
          image:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762520871/thaw_image_5ce722fe1f_vtmfwq.png",
          bgImage:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762520742/thaw_background_bbb38e8682_o67pk1.png",
          buttonText: "View case study",
          link: "/case-study/thaw",
        },
        {
          name: "AES Tietê",
          description: "Redefining grid intelligence for a Fortune 500 in the energy market",
          tags: ["Web"],
          image:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762521178/aes_image_bb9e5daa88_tiu1dd.png",
          bgImage:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762521159/aes_background_e5409ebdf0_sdgsis.png",
          buttonText: "View case study",
          link: "/case-study/aes",
        },
        {
          name: "FashionNova",
          description: "Scaled TikTok presence to 2M followers in 4 months",
          tags: ["Social Media", "Content"],
          image:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762521875/cru_image_db1570b937_tksy2w.png",
          bgImage:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762521808/cru_background_8e25c1d25e_btovye.png",
          buttonText: "View case study",
          link: "/case-study/fashionnova",
        },
        {
          name: "FitLife App",
          description: "Boosted App installs by 320% with influencer marketing",
          tags: ["Mobile", "Influencer"],
          image:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762522012/hyperspace_image_ab65e7edfd_sg5krl.png",
          bgImage:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762521961/hyperspace_background_62b81064d1_phnpeq.png",
          buttonText: "View case study",
          link: "/case-study/fitlife",
        },
      ],
    },
    testimonial: {
      title: "Hear it from our clients.",
      clients: ["Nike", "Adidas", "Zara", "H&M", "Sephora", "Target", "Walmart"],
    },
    testimonials: [
      {
        quote:
          "Their social media expertise transformed our online presence. We went from struggling to engage our audience to having one of the most active communities in our industry.",
        author: "Sarah Mitchell",
        role: "Marketing Director @ StyleCo",
      },
      {
        quote:
          "Clear strategy, crisp execution. The weekly optimization cadences made a measurable impact on ROAS.",
        author: "Ravi Sharma",
        role: "Head of Growth @ TechDash",
      },
      {
        quote: "They turned our founder’s voice into a LinkedIn engine for inbound leads.",
        author: "Elena Torres",
        role: "COO @ BlocBridge",
      },
    ],
  };

  return <ServicePageTemplate_ pageContent={pageContent} />;
};

export default SocialMediaPage;