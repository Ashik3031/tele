// --------------------------------------------------------------
// UXUIDesignPage.jsx
import {
  Palette,
  Layout,
  Smartphone,
  Eye,
  Zap,
  TestTube,
} from "lucide-react";
import ServicePageTemplate_ from "./ServiceComponent"; // ensure this file exports default ServicePageTemplate

export const UXUIDesignPage = () => {
  const pageContent = {
    hero: {
      mainTitle: "UX/UI Design",
      highlightTitle: "& Product",
      endTitle: "Services.",
      subtitle:
        "Create intuitive, beautiful experiences that users love. We design digital products that combine aesthetic excellence with seamless usability.",
      ctaText: "Start your project",
      bg: undefined,
    },
    servicesHeader: "Our UX/UI design services.",
    services: [
      { id: 1, icon: Eye, title: "UX Research & Strategy", number: "01" },
      { id: 2, icon: Layout, title: "UI Design & Systems", number: "02" },
      { id: 3, icon: Smartphone, title: "Mobile App Design", number: "03" },
      { id: 4, icon: Palette, title: "Web Design", number: "04" },
      { id: 5, icon: TestTube, title: "Usability Testing", number: "05" },
      { id: 6, icon: Zap, title: "Design Systems", number: "06" },
    ],
    serviceDetails: [
      {
        number: "01",
        title: "UX Research & Strategy",
        description:
          "Deep user insights drive our design decisions. We conduct comprehensive research to understand your users' needs, behaviors, and pain points to create meaningful experiences.",
        tags: [
          "User Interviews",
          "Persona Development",
          "Journey Mapping",
          "Competitive Analysis",
          "Heuristic Evaluation",
          "Information Architecture",
        ],
        link: "/services/ux-ui/research",
      },
      {
        number: "02",
        title: "UI Design & Systems",
        description:
          "Pixel-perfect interfaces that delight users and strengthen your brand. We create cohesive visual systems that scale across your entire product ecosystem.",
        tags: ["Visual Design", "Component Libraries", "Style Guides", "Iconography", "Micro-interactions"],
        link: "/services/ux-ui/ui-design",
      },
      {
        number: "03",
        title: "Mobile App Design",
        description:
          "Native iOS and Android experiences that feel intuitive and performant. We design mobile-first interfaces optimized for touch and small screens.",
        tags: [
          "iOS Design",
          "Android Design",
          "Responsive Design",
          "Touch Interactions",
          "Animation Design",
          "Dark Mode",
        ],
        highlightTags: ["iOS Design", "Android Design"],
        link: "/services/ux-ui/mobile",
      },
      {
        number: "04",
        title: "Web Design & Prototyping",
        description:
          "High-fidelity prototypes with rapid iteration cycles. Interactive mockups that validate concepts before development begins.",
        tags: ["Figma Prototypes", "Responsive Web", "A/B Testing", "Accessibility"],
        link: "/services/ux-ui/web",
      },
    ],
    partnerships: {
      title: "Tech & partnerships.",
      logos: [
        { name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
        { name: "Adobe", src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg" },
        { name: "Sketch", src: "https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg" },
        { name: "InVision", src: "https://www.invisionapp.com/assets/img/brand/invision-logo.svg" },
        { name: "Framer", src: "https://www.framer.com/images/social/default.png" },
        { name: "Webflow", src: "https://upload.wikimedia.org/wikipedia/commons/6/67/Webflow_logo.svg" },
        { name: "Miro", src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Miro_Logo.svg" },
        { name: "Notion", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
        { name: "Maze", src: "https://maze.co/static/maze-logo.svg" },
        { name: "Hotjar", src: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Hotjar_Logo.svg" },
        { name: "UserTesting", src: "https://www.usertesting.com/sites/default/files/ut-logo-2022.svg" },
        { name: "Optimal Workshop", src: "https://www.optimalworkshop.com/static/ow-logo.svg" },
        { name: "Zeplin", src: "https://zeplin.io/img/logo.svg" },
        { name: "Abstract", src: "https://www.abstract.com/static/abstract-logo.svg" },
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
          name: "HealthHub",
          description: "Redesigned patient portal, reducing support tickets by 65%",
          tags: ["Healthcare", "Web"],
          image:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762521875/cru_image_db1570b937_tksy2w.png",
          bgImage:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762521808/cru_background_8e25c1d25e_btovye.png",
          buttonText: "View case study",
          link: "/case-study/healthhub",
        },
        {
          name: "FinFlow",
          description: "Banking app with 4.8★ rating and 92% task completion rate",
          tags: ["Fintech", "Mobile"],
          image:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762522012/hyperspace_image_ab65e7edfd_sg5krl.png",
          bgImage:
            "https://res.cloudinary.com/dugtxybef/image/upload/v1762521961/hyperspace_background_62b81064d1_phnpeq.png",
          buttonText: "View case study",
          link: "/case-study/finflow",
        },
      ],
    },
    testimonial: {
      title: "Hear it from our clients.",
      clients: ["Spotify", "Airbnb", "Stripe", "Notion", "Slack", "Dropbox", "Shopify"],
    },
    testimonials: [
      {
        quote:
          "The design team didn't just make things pretty—they fundamentally improved how our users interact with our product. Our NPS jumped 28 points in six months.",
        author: "Michael Chen",
        role: "VP Product @ CloudSync",
      },
      {
        quote:
          "They understand the balance between aesthetic and function. Every design decision was backed by research and testing.",
        author: "Priya Patel",
        role: "CEO @ MedTech Solutions",
      },
      {
        quote: "From wireframes to final UI, the process was collaborative and the results exceeded our expectations. Users are finally loving our app.",
        author: "James Anderson",
        role: "CTO @ FinFlow",
      },
    ],
  };

  return <ServicePageTemplate_ pageContent={pageContent} />;
};

export default UXUIDesignPage;