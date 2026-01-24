// --------------------------------------------------------------
// MobileAppDevelopmentPage.jsx
import {
  Smartphone,
  Code,
  Layers,
  Shield,
  Zap,
  RefreshCw,
} from "lucide-react";
import ServicePageTemplate_ from "./ServiceComponent"; // ensure this file exports default ServicePageTemplate

export const MobileAppDevelopmentPage = () => {
  const pageContent = {
    hero: {
      mainTitle: "Mobile App",
      highlightTitle: "Development",
      endTitle: "Services.",
      subtitle:
        "Build powerful, scalable mobile applications for iOS and Android. We turn your vision into high-performance apps that users love.",
      ctaText: "Build your app",
      bg: undefined,
    },
    servicesHeader: "Our mobile development services.",
    services: [
      { id: 1, icon: Smartphone, title: "Native iOS Development", number: "01" },
      { id: 2, icon: Code, title: "Native Android Development", number: "02" },
      { id: 3, icon: Layers, title: "Cross-Platform Apps", number: "03" },
      { id: 4, icon: Shield, title: "App Security & Testing", number: "04" },
      { id: 5, icon: Zap, title: "API Integration", number: "05" },
      { id: 6, icon: RefreshCw, title: "Maintenance & Support", number: "06" },
    ],
    serviceDetails: [
      {
        number: "01",
        title: "Native iOS Development",
        description:
          "Build exceptional iOS experiences using Swift and SwiftUI. We create apps that leverage the full power of Apple's ecosystem, from iPhone to iPad and Apple Watch.",
        tags: [
          "Swift",
          "SwiftUI",
          "UIKit",
          "Core Data",
          "CloudKit",
          "App Store Optimization",
        ],
        link: "/services/mobile/ios",
      },
      {
        number: "02",
        title: "Native Android Development",
        description:
          "Develop powerful Android applications with Kotlin and Jetpack Compose. We build apps that work seamlessly across the diverse Android ecosystem.",
        tags: ["Kotlin", "Jetpack Compose", "Material Design", "Room DB", "Firebase", "Play Store"],
        link: "/services/mobile/android",
      },
      {
        number: "03",
        title: "Cross-Platform Development",
        description:
          "Maximize reach and minimize costs with Flutter and React Native. One codebase, multiple platforms, native performance.",
        tags: [
          "Flutter",
          "React Native",
          "Dart",
          "TypeScript",
          "Hot Reload",
          "Native Modules",
        ],
        highlightTags: ["Flutter", "React Native"],
        link: "/services/mobile/cross-platform",
      },
      {
        number: "04",
        title: "Testing & Performance",
        description:
          "Comprehensive QA with automated testing, performance profiling, and security audits. Ship with confidence.",
        tags: ["Unit Testing", "UI Testing", "Performance Optimization", "Security Audits"],
        link: "/services/mobile/testing",
      },
    ],
    partnerships: {
      title: "Tech & partnerships.",
      logos: [
        { name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
        { name: "Android", src: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
        { name: "Flutter", src: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" },
        { name: "React Native", src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
        { name: "Firebase", src: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" },
        { name: "AWS", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
        { name: "Google Cloud", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
        { name: "Azure", src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
        { name: "Stripe", src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
        { name: "Twilio", src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg" },
        { name: "MongoDB", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
        { name: "PostgreSQL", src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
        { name: "Redis", src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Logo-redis.svg" },
        { name: "Docker", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
      ],
    },
    portfolio: {
      title: "Our Featured works",
      items: [
        {
          name: "RideShare Pro",
          description: "Real-time ride-hailing app with 500K+ active users",
          tags: ["Flutter", "Maps", "Real-time"],
          image:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/rideshare",
        },
        {
          name: "HealthTracker",
          description: "AI-powered fitness app with Apple Health integration",
          tags: ["iOS", "Swift", "HealthKit"],
          image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/healthtracker",
        },
        {
          name: "PayFlow",
          description: "Secure mobile banking with biometric authentication",
          tags: ["React Native", "Fintech", "Security"],
          image:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/payflow",
        },
        {
          name: "FoodieGo",
          description: "Food delivery platform processing 10K+ orders daily",
          tags: ["Android", "Kotlin", "Maps"],
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/foodiego",
        },
      ],
    },
    testimonial: {
      title: "Hear it from our clients.",
      clients: ["Uber", "Spotify", "Netflix", "Instagram", "WhatsApp", "Airbnb", "DoorDash"],
    },
    testimonials: [
      {
        quote:
          "They built our app in record time without compromising quality. The Flutter framework they chose cut our development costs in half while delivering native performance.",
        author: "David Kim",
        role: "CTO @ RideShare Pro",
      },
      {
        quote:
          "The attention to detail in performance optimization was outstanding. Our app loads 3x faster and crashes are down 95%.",
        author: "Amanda Rodriguez",
        role: "Product Lead @ HealthTracker",
      },
      {
        quote: "Security was our top priority for a banking app. They implemented bank-grade encryption and passed all our audits with flying colors.",
        author: "Marcus Thompson",
        role: "VP Engineering @ PayFlow",
      },
    ],
  };

  return <ServicePageTemplate_ pageContent={pageContent} />;
};

export default MobileAppDevelopmentPage;