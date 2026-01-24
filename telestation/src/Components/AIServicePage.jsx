// --------------------------------------------------------------
// AIDevelopmentPage.jsx
import {
  Brain,
  Sparkles,
  MessageSquare,
  Eye,
  TrendingUp,
  Cpu,
} from "lucide-react";
import ServicePageTemplate_ from "./ServiceComponent"; // ensure this file exports default ServicePageTemplate

export const AIDevelopmentPage = () => {
  const pageContent = {
    hero: {
      mainTitle: "AI & Machine",
      highlightTitle: "Learning",
      endTitle: "Solutions.",
      subtitle:
        "Harness the power of artificial intelligence to transform your business. From intelligent automation to predictive analytics, we build AI solutions that deliver real value.",
      ctaText: "Explore AI solutions",
      bg: undefined,
    },
    servicesHeader: "Our AI development services.",
    services: [
      { id: 1, icon: Brain, title: "Custom AI Models", number: "01" },
      { id: 2, icon: MessageSquare, title: "LLM Integration", number: "02" },
      { id: 3, icon: Eye, title: "Computer Vision", number: "03" },
      { id: 4, icon: Sparkles, title: "Generative AI", number: "04" },
      { id: 5, icon: TrendingUp, title: "Predictive Analytics", number: "05" },
      { id: 6, icon: Cpu, title: "AI Infrastructure", number: "06" },
    ],
    serviceDetails: [
      {
        number: "01",
        title: "Custom AI Models",
        description:
          "Build proprietary AI models tailored to your specific business needs. We design, train, and deploy custom machine learning solutions that give you a competitive edge.",
        tags: [
          "Deep Learning",
          "Neural Networks",
          "Model Training",
          "Transfer Learning",
          "Fine-tuning",
          "MLOps",
        ],
        link: "/services/ai/custom-models",
      },
      {
        number: "02",
        title: "LLM Integration & RAG",
        description:
          "Leverage large language models like GPT-4, Claude, and Gemini. We build RAG systems, chatbots, and AI assistants that understand your business context.",
        tags: ["GPT-4", "Claude", "RAG Systems", "Vector Databases", "Prompt Engineering", "Fine-tuning"],
        link: "/services/ai/llm",
      },
      {
        number: "03",
        title: "Computer Vision",
        description:
          "Enable machines to see and understand visual data. From object detection to facial recognition, we build vision AI that processes images and video in real-time.",
        tags: [
          "Object Detection",
          "Image Classification",
          "OCR",
          "Facial Recognition",
          "Video Analytics",
          "YOLO/ResNet",
        ],
        highlightTags: ["Object Detection", "OCR"],
        link: "/services/ai/vision",
      },
      {
        number: "04",
        title: "Generative AI & Automation",
        description:
          "Create content, automate workflows, and augment human capabilities with generative AI. Text, image, code generation, and intelligent automation.",
        tags: ["Content Generation", "AI Workflows", "Stable Diffusion", "Code Generation"],
        link: "/services/ai/generative",
      },
    ],
    partnerships: {
      title: "Tech & partnerships.",
      logos: [
        { name: "OpenAI", src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
        { name: "Anthropic", src: "https://www.anthropic.com/_next/image?url=%2Fimages%2Ficons%2Flogo-icon.png&w=48&q=75" },
        { name: "Google AI", src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
        { name: "Hugging Face", src: "https://huggingface.co/front/assets/huggingface_logo.svg" },
        { name: "LangChain", src: "https://avatars.githubusercontent.com/u/126733545" },
        { name: "TensorFlow", src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
        { name: "PyTorch", src: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg" },
        { name: "AWS", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
        { name: "Azure AI", src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
        { name: "Google Cloud", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
        { name: "Pinecone", src: "https://www.pinecone.io/_next/static/media/pinecone-logo.7e4f1fdb.svg" },
        { name: "Weaviate", src: "https://weaviate.io/img/site/weaviate-logo-light.png" },
        { name: "NVIDIA", src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
        { name: "Cohere", src: "https://cohere.com/favicon.ico" },
      ],
    },
    portfolio: {
      title: "Our Featured works",
      items: [
        {
          name: "SmartDoc AI",
          description: "Document intelligence system processing 100K+ documents daily",
          tags: ["OCR", "NLP", "Automation"],
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1676277791608-ac379a5a3c7f?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/smartdoc",
        },
        {
          name: "RetailVision",
          description: "Computer vision system reducing inventory errors by 95%",
          tags: ["Computer Vision", "Real-time", "Edge AI"],
          image:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/retailvision",
        },
        {
          name: "InsightGPT",
          description: "Custom LLM chatbot with 95% accuracy on domain queries",
          tags: ["LLM", "RAG", "Chatbot"],
          image:
            "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/insightgpt",
        },
        {
          name: "PredictFlow",
          description: "ML forecasting engine improving demand prediction by 40%",
          tags: ["ML", "Forecasting", "Analytics"],
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/predictflow",
        },
      ],
    },
    testimonial: {
      title: "Hear it from our clients.",
      clients: ["OpenAI", "Google", "Microsoft", "IBM", "Salesforce", "Tesla", "NVIDIA"],
    },
    testimonials: [
      {
        quote:
          "The RAG system they built transformed our customer support. Our AI assistant now handles 70% of queries with 95% accuracy, and customers love the instant responses.",
        author: "Dr. Rachel Chen",
        role: "Chief AI Officer @ InsightGPT",
      },
      {
        quote:
          "Their computer vision solution exceeded expectations. Real-time product recognition with 99.2% accuracy has completely automated our inventory management.",
        author: "Mark Stevens",
        role: "VP Operations @ RetailVision",
      },
      {
        quote: "From POC to production in 8 weeks. The custom forecasting model they built saves us $2M annually in inventory costs.",
        author: "Linda Park",
        role: "Data Science Lead @ PredictFlow",
      },
    ],
  };

  return <ServicePageTemplate_ pageContent={pageContent} />;
};

export default AIDevelopmentPage;