// --------------------------------------------------------------
// WebDevelopmentPage.jsx
import {
  Globe,
  Code2,
  Database,
  Rocket,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import ServicePageTemplate_ from "./ServiceComponent"; // ensure this file exports default ServicePageTemplate

export const WebDevelopmentPage = () => {
  const pageContent = {
    hero: {
      mainTitle: "Web Development",
      highlightTitle: "& Engineering",
      endTitle: "Services.",
      subtitle:
        "Build fast, scalable, and secure web applications that drive business growth. From startups to enterprise, we deliver digital solutions that perform.",
      ctaText: "Start your project",
      bg: undefined,
    },
    servicesHeader: "Our web development services.",
    services: [
      { id: 1, icon: Globe, title: "Frontend Development", number: "01" },
      { id: 2, icon: Database, title: "Backend Development", number: "02" },
      { id: 3, icon: Code2, title: "Full-Stack Solutions", number: "03" },
      { id: 4, icon: ShoppingCart, title: "E-Commerce Platforms", number: "04" },
      { id: 5, icon: Rocket, title: "Web Apps & SaaS", number: "05" },
      { id: 6, icon: BarChart3, title: "Performance & SEO", number: "06" },
    ],
    serviceDetails: [
      {
        number: "01",
        title: "Frontend Development",
        description:
          "Create stunning, responsive interfaces with modern JavaScript frameworks. We build pixel-perfect UIs that are fast, accessible, and optimized for all devices.",
        tags: [
          "React",
          "Next.js",
          "Vue.js",
          "TypeScript",
          "Tailwind CSS",
          "Responsive Design",
        ],
        link: "/services/web/frontend",
      },
      {
        number: "02",
        title: "Backend Development",
        description:
          "Robust server-side solutions that scale. We architect secure APIs, databases, and cloud infrastructure that power your application.",
        tags: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
        link: "/services/web/backend",
      },
      {
        number: "03",
        title: "Full-Stack Development",
        description:
          "End-to-end web solutions with seamless frontend-backend integration. Modern tech stacks optimized for performance and developer experience.",
        tags: [
          "MERN Stack",
          "Next.js",
          "Prisma",
          "tRPC",
          "Serverless",
          "CI/CD",
        ],
        highlightTags: ["Next.js", "Serverless"],
        link: "/services/web/fullstack",
      },
      {
        number: "04",
        title: "E-Commerce & CMS",
        description:
          "Custom e-commerce platforms and content management systems. Headless architectures with Shopify, Stripe, and modern CMSs.",
        tags: ["Shopify", "WooCommerce", "Stripe", "Contentful", "Sanity"],
        link: "/services/web/ecommerce",
      },
    ],
    partnerships: {
      title: "Tech & partnerships.",
      logos: [
        { name: "React", src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
        { name: "Next.js", src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
        { name: "Vue.js", src: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
        { name: "Node.js", src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
        { name: "TypeScript", src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
        { name: "Tailwind CSS", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
        { name: "AWS", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
        { name: "Vercel", src: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" },
        { name: "Netlify", src: "https://www.netlify.com/v3/img/components/logomark.png" },
        { name: "MongoDB", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
        { name: "PostgreSQL", src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
        { name: "Shopify", src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
        { name: "Stripe", src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
        { name: "Docker", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
      ],
    },
    portfolio: {
      title: "Our Featured works",
      items: [
        {
          name: "TechFlow SaaS",
          description: "B2B platform serving 50K+ users with 99.9% uptime",
          tags: ["Next.js", "SaaS", "Real-time"],
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/techflow",
        },
        {
          name: "LuxeStore",
          description: "Headless e-commerce with $5M+ in monthly revenue",
          tags: ["Shopify", "E-Commerce", "React"],
          image:
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/luxestore",
        },
        {
          name: "DataViz Pro",
          description: "Analytics dashboard processing 1M+ data points/second",
          tags: ["React", "D3.js", "WebSockets"],
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/dataviz",
        },
        {
          name: "EduLearn",
          description: "Learning management system with video streaming",
          tags: ["Vue.js", "Education", "Video"],
          image:
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/edulearn",
        },
      ],
    },
    testimonial: {
      title: "Hear it from our clients.",
      clients: ["Google", "Microsoft", "Amazon", "Salesforce", "Meta", "Adobe", "Oracle"],
    },
    testimonials: [
      {
        quote:
          "They rebuilt our entire platform in Next.js and our page load times dropped from 5 seconds to under 1 second. The SEO improvements brought us 200% more organic traffic.",
        author: "Jennifer Wu",
        role: "Head of Engineering @ TechFlow",
      },
      {
        quote:
          "The team's expertise in headless commerce was invaluable. They integrated Shopify with our custom frontend seamlessly, and our conversion rate increased 40%.",
        author: "Alex Martinez",
        role: "E-Commerce Director @ LuxeStore",
      },
      {
        quote: "Fast, clean code with excellent documentation. The WebSocket implementation handles our real-time data needs flawlessly, even under heavy load.",
        author: "Samantha Lee",
        role: "CTO @ DataViz Pro",
      },
    ],
  };

  return <ServicePageTemplate_ pageContent={pageContent} />;
};

export default WebDevelopmentPage;