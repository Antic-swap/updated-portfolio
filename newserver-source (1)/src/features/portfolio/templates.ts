import type { ThemeId } from "@/features/portfolio/styles";
import type { PortfolioOwner, HeroStat, AboutHighlight, Skill, Project, Experience } from "@/features/portfolio/types";

export interface PortfolioTemplate {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  theme: ThemeId;
  owner: Partial<PortfolioOwner>;
  heroStats: HeroStat[];
  aboutHighlights: AboutHighlight[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
}

export const PORTFOLIO_TEMPLATES: PortfolioTemplate[] = [
  {
    id: "defi-architect",
    name: "DeFi Architect",
    emoji: "◆",
    tagline: "Protocols & primitives",
    theme: "cyber",
    owner: {
      title: "Senior DeFi Engineer",
      tagline: "Protocols & primitives",
      bio: "7+ years building DeFi primitives. From AMMs and lending markets to MEV protection and cross-chain infrastructure.",
      availableForWork: true,
    },
    heroStats: [
      { id: "1", value: "7+",     label: "Years"   },
      { id: "2", value: "$500M+", label: "TVL"     },
      { id: "3", value: "15+",    label: "Protocols" },
    ],
    aboutHighlights: [
      { id: "1", icon: "◆", title: "AMM Design",        desc: "Constant product, concentrated liquidity, and hybrid curve designs." },
      { id: "2", icon: "◈", title: "Lending Markets",   desc: "Overcollateralized and undercollateralized lending protocol architecture." },
      { id: "3", icon: "◻", title: "MEV Protection",    desc: "Commit-reveal, batch auctions, and private mempool integrations." },
      { id: "4", icon: "▲", title: "Cross-chain",       desc: "Bridge design, message passing, and canonical token standards." },
    ],
    skills: [
      { id: "s1", name: "Solidity",    category: "languages",  level: 5 },
      { id: "s2", name: "Vyper",       category: "languages",  level: 4 },
      { id: "s3", name: "TypeScript",  category: "languages",  level: 4 },
      { id: "s4", name: "Ethereum",    category: "blockchain", level: 5 },
      { id: "s5", name: "Base",        category: "blockchain", level: 5 },
      { id: "s6", name: "Arbitrum",    category: "blockchain", level: 4 },
      { id: "s7", name: "Foundry",     category: "frameworks", level: 5 },
      { id: "s8", name: "Hardhat",     category: "frameworks", level: 5 },
      { id: "s9", name: "Uniswap SDK", category: "tools",      level: 5 },
      { id: "s10",name: "ERC-4626",    category: "protocols",  level: 5 },
    ],
    projects: [
      {
        id: "p1", title: "Concentrated Liquidity AMM", category: "defi", featured: true, createdAt: "2023-01-01",
        description: "Uniswap v3-style AMM with custom fee tiers and out-of-range position management. $200M+ TVL at peak.",
        techStack: ["Solidity", "Foundry", "TypeScript"], liveUrl: "https://example.com", githubUrl: "https://github.com",
      },
      {
        id: "p2", title: "Lending Protocol v2", category: "defi", featured: true, createdAt: "2022-06-01",
        description: "Isolated lending markets with dynamic interest rate model and permissionless collateral listing.",
        techStack: ["Solidity", "Hardhat", "The Graph"], githubUrl: "https://github.com",
      },
      {
        id: "p3", title: "MEV-Resistant DEX", category: "defi", featured: false, createdAt: "2021-09-01",
        description: "Batch auction DEX with commit-reveal scheme eliminating front-running at the protocol level.",
        techStack: ["Solidity", "Rust", "Foundry"], githubUrl: "https://github.com",
      },
    ],
    experiences: [
      {
        id: "e1", company: "DeFi Protocol", role: "Lead Protocol Engineer", period: "2021 — Present", type: "fulltime",
        description: "Architecting core DeFi primitives and coordinating external security reviews.",
        highlights: ["Shipped AMM v2 with 60% gas reduction", "Managed $500M+ TVL across 3 products", "Led 4 external audits with zero critical findings"],
      },
      {
        id: "e2", company: "Uniswap Labs", role: "Protocol Developer", period: "2019 — 2021", type: "fulltime",
        description: "Contributed to v2 and early v3 concentrated liquidity research.",
        highlights: ["Implemented tick math library in Solidity", "Wrote formal spec for fee accounting", "Open-sourced 3 Foundry testing utilities"],
      },
    ],
  },
  {
    id: "nft-builder",
    name: "NFT Builder",
    emoji: "◈",
    tagline: "Digital art on-chain",
    theme: "amber",
    owner: {
      title: "NFT Protocol Engineer",
      tagline: "Digital art on-chain",
      bio: "Building on-chain generative art engines, NFT marketplaces, and dynamic metadata systems for 4 years.",
      availableForWork: true,
    },
    heroStats: [
      { id: "1", value: "4+",   label: "Years"       },
      { id: "2", value: "1M+",  label: "Mints"       },
      { id: "3", value: "50+",  label: "Collections" },
    ],
    aboutHighlights: [
      { id: "1", icon: "◆", title: "Generative Art",    desc: "Fully on-chain SVG and p5.js generative systems with verifiable randomness." },
      { id: "2", icon: "◈", title: "Marketplace Tech",  desc: "Gas-efficient listing, offer, and royalty enforcement systems." },
      { id: "3", icon: "◻", title: "Dynamic NFTs",      desc: "Metadata that evolves based on on-chain events, time, or user actions." },
      { id: "4", icon: "▲", title: "Minting UX",        desc: "Custom minting contracts with allowlists, Dutch auctions, and reveal mechanics." },
    ],
    skills: [
      { id: "s1", name: "Solidity",     category: "languages",  level: 5 },
      { id: "s2", name: "TypeScript",   category: "languages",  level: 5 },
      { id: "s3", name: "Ethereum",     category: "blockchain", level: 5 },
      { id: "s4", name: "Base",         category: "blockchain", level: 4 },
      { id: "s5", name: "Hardhat",      category: "frameworks", level: 5 },
      { id: "s6", name: "Next.js",      category: "frameworks", level: 4 },
      { id: "s7", name: "OpenZeppelin", category: "tools",      level: 5 },
      { id: "s8", name: "IPFS",         category: "tools",      level: 4 },
      { id: "s9", name: "ERC-721",      category: "protocols",  level: 5 },
      { id: "s10",name: "ERC-1155",     category: "protocols",  level: 5 },
    ],
    projects: [
      {
        id: "p1", title: "On-Chain Generative Collection", category: "nft", featured: true, createdAt: "2023-01-01",
        description: "10,000-piece generative art collection rendered fully on-chain as SVG. Sold out in 4 minutes.",
        techStack: ["Solidity", "SVG", "Hardhat"], liveUrl: "https://example.com", githubUrl: "https://github.com",
      },
      {
        id: "p2", title: "NFT Marketplace", category: "nft", featured: true, createdAt: "2022-03-01",
        description: "Gas-efficient peer-to-peer NFT marketplace with EIP-2981 royalty enforcement and bulk listings.",
        techStack: ["Solidity", "Next.js", "wagmi"], liveUrl: "https://example.com",
      },
      {
        id: "p3", title: "Dynamic NFT Framework", category: "nft", featured: false, createdAt: "2021-06-01",
        description: "NFT metadata that evolves based on holder activity, DeFi positions, and on-chain events.",
        techStack: ["Solidity", "The Graph", "TypeScript"], githubUrl: "https://github.com",
      },
    ],
    experiences: [
      {
        id: "e1", company: "Art3 Studio", role: "Lead NFT Engineer", period: "2022 — Present", type: "fulltime",
        description: "Building generative art infrastructure and marketplace protocols.",
        highlights: ["Shipped 20+ collections totaling 500K+ mints", "Built marketplace processing $10M+ in volume", "Open-sourced on-chain SVG rendering library"],
      },
      {
        id: "e2", company: "Manifold", role: "Protocol Developer", period: "2020 — 2022", type: "fulltime",
        description: "Built creator tooling and minting infrastructure for 10,000+ artists.",
        highlights: ["Developed allowlist minting system used by 5,000+ projects", "Reduced mint gas costs by 35%", "Integrated EIP-2981 across all contracts"],
      },
    ],
  },
  {
    id: "security-auditor",
    name: "Security Auditor",
    emoji: "◻",
    tagline: "Zero vulnerabilities shipped",
    theme: "mono",
    owner: {
      title: "Smart Contract Security Researcher",
      tagline: "Zero vulnerabilities shipped",
      bio: "5 years of smart contract security research. 60+ audits completed. Specialized in DeFi, bridges, and governance systems.",
      availableForWork: true,
    },
    heroStats: [
      { id: "1", value: "5+",  label: "Years"    },
      { id: "2", value: "60+", label: "Audits"   },
      { id: "3", value: "40+", label: "Criticals" },
    ],
    aboutHighlights: [
      { id: "1", icon: "◆", title: "DeFi Security",     desc: "AMM manipulation, flash loan attacks, oracle exploits, and reentrancy." },
      { id: "2", icon: "◈", title: "Formal Verification", desc: "Using Certora Prover and Echidna for mathematical security guarantees." },
      { id: "3", icon: "◻", title: "Bridge Audits",     desc: "Cross-chain message validation, replay protection, and trust assumptions." },
      { id: "4", icon: "▲", title: "Governance Risk",   desc: "Timelock bypasses, vote manipulation, and admin key risk analysis." },
    ],
    skills: [
      { id: "s1", name: "Solidity",  category: "languages",  level: 5 },
      { id: "s2", name: "Python",    category: "languages",  level: 4 },
      { id: "s3", name: "Ethereum",  category: "blockchain", level: 5 },
      { id: "s4", name: "Foundry",   category: "frameworks", level: 5 },
      { id: "s5", name: "Echidna",   category: "tools",      level: 5 },
      { id: "s6", name: "Slither",   category: "tools",      level: 5 },
      { id: "s7", name: "Certora",   category: "tools",      level: 4 },
      { id: "s8", name: "ERC-4626",  category: "protocols",  level: 5 },
    ],
    projects: [
      {
        id: "p1", title: "Protocol Audit Suite", category: "tools", featured: true, createdAt: "2023-01-01",
        description: "Open-source collection of Foundry invariant tests and Echidna harnesses for DeFi protocols.",
        techStack: ["Solidity", "Foundry", "Python"], githubUrl: "https://github.com",
      },
      {
        id: "p2", title: "Bridge Security Framework", category: "infra", featured: true, createdAt: "2022-06-01",
        description: "Checklist and automated scanner for cross-chain bridge security assumptions.",
        techStack: ["Python", "Slither", "TypeScript"], githubUrl: "https://github.com",
      },
    ],
    experiences: [
      {
        id: "e1", company: "Trail of Bits", role: "Senior Security Researcher", period: "2021 — Present", type: "fulltime",
        description: "Leading smart contract audits and developing automated security tooling.",
        highlights: ["Completed 40+ protocol audits", "Disclosed critical bug saving $80M+", "Authored formal verification curriculum"],
      },
      {
        id: "e2", company: "Freelance", role: "Independent Auditor", period: "2019 — 2021", type: "freelance",
        description: "Independent security reviews for DeFi protocols and NFT projects.",
        highlights: ["20+ audits with public reports", "Disclosed 40+ critical vulnerabilities", "Built reputation on Code4rena and Sherlock"],
      },
    ],
  },
  {
    id: "infra-engineer",
    name: "Infra Engineer",
    emoji: "▲",
    tagline: "Scaling the decentralized stack",
    theme: "forest",
    owner: {
      title: "Blockchain Infrastructure Engineer",
      tagline: "Scaling the decentralized stack",
      bio: "Building the infrastructure layer of Web3. Validators, indexers, RPC networks, and DevOps for blockchain systems.",
      availableForWork: false,
    },
    heroStats: [
      { id: "1", value: "8+",       label: "Years"    },
      { id: "2", value: "99.99%",   label: "Uptime"   },
      { id: "3", value: "10+",      label: "Networks" },
    ],
    aboutHighlights: [
      { id: "1", icon: "◆", title: "Validator Ops",   desc: "Running validators on Ethereum, Cosmos, and Solana with 99.99% uptime." },
      { id: "2", icon: "◈", title: "Indexing",         desc: "The Graph subgraphs and custom indexers for real-time on-chain data." },
      { id: "3", icon: "◻", title: "RPC Infrastructure", desc: "High-availability load-balanced RPC with sub-50ms response times." },
      { id: "4", icon: "▲", title: "DevOps",           desc: "Kubernetes, Terraform, and CI/CD pipelines for blockchain node operators." },
    ],
    skills: [
      { id: "s1", name: "Go",          category: "languages",  level: 5 },
      { id: "s2", name: "Rust",        category: "languages",  level: 4 },
      { id: "s3", name: "TypeScript",  category: "languages",  level: 4 },
      { id: "s4", name: "Ethereum",    category: "blockchain", level: 5 },
      { id: "s5", name: "Cosmos",      category: "blockchain", level: 4 },
      { id: "s6", name: "Kubernetes",  category: "frameworks", level: 5 },
      { id: "s7", name: "Terraform",   category: "tools",      level: 5 },
      { id: "s8", name: "The Graph",   category: "tools",      level: 5 },
    ],
    projects: [
      {
        id: "p1", title: "Ethereum Validator Cluster", category: "infra", featured: true, createdAt: "2023-01-01",
        description: "Distributed validator cluster with MEV-boost, DVT, and automated slashing protection. 99.99% uptime over 2 years.",
        techStack: ["Go", "Kubernetes", "Terraform"], githubUrl: "https://github.com",
      },
      {
        id: "p2", title: "Multi-Chain Indexer", category: "infra", featured: true, createdAt: "2022-01-01",
        description: "Real-time indexing pipeline processing 50K+ events/second across 8 chains.",
        techStack: ["Rust", "PostgreSQL", "The Graph"], githubUrl: "https://github.com",
      },
    ],
    experiences: [
      {
        id: "e1", company: "Figment", role: "Senior Infrastructure Engineer", period: "2020 — Present", type: "fulltime",
        description: "Managing validator infrastructure and protocol integrations across 10+ networks.",
        highlights: ["Maintained 99.99% uptime across all validators", "Reduced infrastructure costs by 35%", "Led integration of 5 new PoS networks"],
      },
    ],
  },
  {
    id: "fullstack-web3",
    name: "Full-Stack Web3",
    emoji: "⬡",
    tagline: "End-to-end dApp builder",
    theme: "slate",
    owner: {
      title: "Full-Stack Web3 Developer",
      tagline: "End-to-end dApp builder",
      bio: "Building complete Web3 products from smart contracts to polished frontends. 6 years shipping production dApps.",
      availableForWork: true,
    },
    heroStats: [
      { id: "1", value: "6+",   label: "Years"    },
      { id: "2", value: "15+",  label: "dApps"    },
      { id: "3", value: "50K+", label: "Users"    },
    ],
    aboutHighlights: [
      { id: "1", icon: "◆", title: "Smart Contracts",  desc: "Solidity development with Hardhat, testing, and deployment pipelines." },
      { id: "2", icon: "◈", title: "Frontend",          desc: "React, Next.js, and wagmi for beautiful Web3 user interfaces." },
      { id: "3", icon: "◻", title: "Backend & APIs",   desc: "Node.js APIs, The Graph subgraphs, and off-chain data infrastructure." },
      { id: "4", icon: "▲", title: "Product Thinking", desc: "From user research to shipped product — I care about UX as much as code." },
    ],
    skills: [
      { id: "s1", name: "Solidity",   category: "languages",  level: 4 },
      { id: "s2", name: "TypeScript", category: "languages",  level: 5 },
      { id: "s3", name: "React",      category: "frameworks", level: 5 },
      { id: "s4", name: "Next.js",    category: "frameworks", level: 5 },
      { id: "s5", name: "Hardhat",    category: "frameworks", level: 4 },
      { id: "s6", name: "wagmi",      category: "tools",      level: 5 },
      { id: "s7", name: "The Graph",  category: "tools",      level: 4 },
      { id: "s8", name: "ERC-20",     category: "protocols",  level: 5 },
      { id: "s9", name: "ERC-721",    category: "protocols",  level: 5 },
    ],
    projects: [
      {
        id: "p1", title: "DeFi Dashboard", category: "defi", featured: true, createdAt: "2023-06-01",
        description: "Portfolio tracker with live on-chain data, P&L analysis, and yield optimization suggestions. 10K+ active users.",
        techStack: ["Next.js", "wagmi", "The Graph", "TypeScript"], liveUrl: "https://example.com", githubUrl: "https://github.com",
      },
      {
        id: "p2", title: "NFT Creator Platform", category: "nft", featured: true, createdAt: "2022-09-01",
        description: "No-code NFT creation and minting platform. 5K+ collections deployed, 40K+ mints.",
        techStack: ["Solidity", "Next.js", "IPFS", "wagmi"], liveUrl: "https://example.com",
      },
      {
        id: "p3", title: "DAO Voting UI", category: "dao", featured: false, createdAt: "2022-01-01",
        description: "Clean governance interface for DAO proposals with on-chain execution and notification system.",
        techStack: ["Next.js", "Solidity", "TypeScript"], githubUrl: "https://github.com",
      },
    ],
    experiences: [
      {
        id: "e1", company: "Web3 Studio", role: "Lead Full-Stack Developer", period: "2021 — Present", type: "fulltime",
        description: "End-to-end product development from contract to deployed dApp.",
        highlights: ["Shipped 8 production dApps serving 50K+ users", "Built reusable component library adopted company-wide", "Reduced time-to-launch from 3 months to 3 weeks"],
      },
      {
        id: "e2", company: "Freelance", role: "Web3 Developer", period: "2018 — 2021", type: "freelance",
        description: "Full-stack Web3 development for startups and established protocols.",
        highlights: ["Completed 20+ client projects", "Specialized in DeFi and NFT dApps", "Built audience of 5K+ on developer blog"],
      },
    ],
  },
];
