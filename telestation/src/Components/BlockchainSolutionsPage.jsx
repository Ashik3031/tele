// --------------------------------------------------------------
// BlockchainSolutionsPage.jsx
import {
  Blocks,
  Lock,
  Coins,
  FileCode,
  TrendingUp,
  Shield,
} from "lucide-react";
import ServicePageTemplate_ from "./ServiceComponent"; // ensure this file exports default ServicePageTemplate

export const BlockchainSolutionsPage = () => {
  const pageContent = {
    hero: {
      mainTitle: "Blockchain &",
      highlightTitle: "Web3",
      endTitle: "Solutions.",
      subtitle:
        "Build the future of decentralized applications. From smart contracts to DeFi platforms, we deliver secure, scalable blockchain solutions that drive innovation.",
      ctaText: "Start building",
      bg: undefined,
    },
    servicesHeader: "Our blockchain services.",
    services: [
      { id: 1, icon: FileCode, title: "Smart Contract Development", number: "01" },
      { id: 2, icon: Coins, title: "DeFi Platforms", number: "02" },
      { id: 3, icon: Blocks, title: "NFT Marketplaces", number: "03" },
      { id: 4, icon: Lock, title: "Blockchain Security", number: "04" },
      { id: 5, icon: TrendingUp, title: "Tokenomics & ICO", number: "05" },
      { id: 6, icon: Shield, title: "Enterprise Blockchain", number: "06" },
    ],
    serviceDetails: [
      {
        number: "01",
        title: "Smart Contract Development",
        description:
          "Build secure, audited smart contracts on Ethereum, Solana, and other leading blockchains. We write gas-optimized code that's battle-tested for production.",
        tags: [
          "Solidity",
          "Rust",
          "EVM",
          "Smart Contract Audits",
          "Gas Optimization",
          "Hardhat/Foundry",
        ],
        link: "/services/blockchain/smart-contracts",
      },
      {
        number: "02",
        title: "DeFi Platforms",
        description:
          "Launch decentralized finance applications with AMMs, lending protocols, yield farming, and staking mechanisms. Full-stack DeFi solutions from concept to mainnet.",
        tags: ["AMM", "Lending Protocols", "Yield Farming", "Staking", "Liquidity Pools", "DEX"],
        link: "/services/blockchain/defi",
      },
      {
        number: "03",
        title: "NFT Marketplaces & Solutions",
        description:
          "Create NFT platforms with minting, trading, and royalty systems. From ERC-721 to dynamic NFTs, we build the full NFT ecosystem.",
        tags: [
          "ERC-721",
          "ERC-1155",
          "IPFS",
          "NFT Minting",
          "Marketplace",
          "Royalties",
        ],
        highlightTags: ["NFT Minting", "Marketplace"],
        link: "/services/blockchain/nft",
      },
      {
        number: "04",
        title: "Security & Audits",
        description:
          "Comprehensive smart contract audits, penetration testing, and security reviews. Protect your protocol from vulnerabilities and exploits.",
        tags: ["Security Audits", "Penetration Testing", "Formal Verification", "Bug Bounties"],
        link: "/services/blockchain/security",
      },
    ],
    partnerships: {
      title: "Tech & partnerships.",
      logos: [
        { name: "Ethereum", src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" },
        { name: "Solana", src: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" },
        { name: "Polygon", src: "https://cryptologos.cc/logos/polygon-matic-logo.svg" },
        { name: "Binance", src: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg" },
        { name: "Chainlink", src: "https://cryptologos.cc/logos/chainlink-link-logo.svg" },
        { name: "Avalanche", src: "https://cryptologos.cc/logos/avalanche-avax-logo.svg" },
        { name: "Arbitrum", src: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg" },
        { name: "Optimism", src: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg" },
        { name: "IPFS", src: "https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png" },
        { name: "Hardhat", src: "https://hardhat.org/hardhat-logo.svg" },
        { name: "OpenZeppelin", src: "https://www.openzeppelin.com/hubfs/oz-iso.svg" },
        { name: "MetaMask", src: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" },
        { name: "WalletConnect", src: "https://walletconnect.com/static/favicon.ico" },
        { name: "The Graph", src: "https://cryptologos.cc/logos/the-graph-grt-logo.svg" },
      ],
    },
    portfolio: {
      title: "Our Featured works",
      items: [
        {
          name: "DeFiSwap",
          description: "DEX with $50M+ TVL and 10K+ daily active users",
          tags: ["DeFi", "Ethereum", "AMM"],
          image:
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/defiswap",
        },
        {
          name: "ArtChain NFT",
          description: "Curated NFT marketplace with $20M+ in sales volume",
          tags: ["NFT", "Marketplace", "IPFS"],
          image:
            "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/artchain",
        },
        {
          name: "SecureChain",
          description: "Enterprise blockchain for supply chain transparency",
          tags: ["Enterprise", "Hyperledger", "IoT"],
          image:
            "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/securechain",
        },
        {
          name: "StakePool",
          description: "Staking protocol with 99.9% uptime and auto-compounding",
          tags: ["Staking", "DeFi", "Solana"],
          image:
            "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&h=600&fit=crop",
          bgImage:
            "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1200&h=800&fit=crop",
          buttonText: "View case study",
          link: "/case-study/stakepool",
        },
      ],
    },
    testimonial: {
      title: "Hear it from our clients.",
      clients: ["Coinbase", "Binance", "Uniswap", "Aave", "OpenSea", "Polygon", "Chainlink"],
    },
    testimonials: [
      {
        quote:
          "Their smart contract expertise is world-class. The audit caught critical vulnerabilities we missed, and their gas optimizations saved our users thousands in fees.",
        author: "Alex Chen",
        role: "Founder @ DeFiSwap",
      },
      {
        quote:
          "From concept to mainnet in 12 weeks. The NFT marketplace they built handles peak loads flawlessly and the royalty system works perfectly.",
        author: "Maria Garcia",
        role: "CEO @ ArtChain NFT",
      },
      {
        quote: "Security-first approach gave us confidence. The formal verification and multi-sig implementation protected $50M+ in locked value.",
        author: "Thomas Anderson",
        role: "CTO @ StakePool",
      },
    ],
  };

  return <ServicePageTemplate_ pageContent={pageContent} />;
};

export default BlockchainSolutionsPage;