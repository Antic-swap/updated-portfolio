import type { PortfolioOwner, HeroStat, AboutHighlight, Skill, Project, Experience } from "@/features/portfolio/types";

export const DEFAULT_PORTFOLIO_OWNER: PortfolioOwner = {
  name: "Alex Chen",
  title: "Senior Blockchain Developer",
  tagline: "Building the decentralized future",
  bio: "Specializing in smart contracts, DeFi protocols, and Web3 infrastructure. I focus on building scalable on-chain systems and clean, auditable code.",
  location: "Remote / Global",
  email: "alex@example.com",
  github: "https://github.com/alexchen",
  twitter: "https://twitter.com/alexchen",
  farcaster: "https://warpcast.com/alexchen",
  availableForWork: true,
  photoUrl: "",
};

export const DEFAULT_HERO_STATS: HeroStat[] = [
  { id: "1", value: "6+",     label: "Years"   },
  { id: "2", value: "30+",    label: "Audits"  },
  { id: "3", value: "$200M+", label: "Secured" },
];

export const DEFAULT_ABOUT_HIGHLIGHTS: AboutHighlight[] = [
  { id: "1", icon: "◆", title: "Smart Contracts",      desc: "Production-grade Solidity with full test coverage and formal verification." },
  { id: "2", icon: "◈", title: "DeFi Architecture",    desc: "AMMs, lending markets, yield strategies, and MEV-resistant protocol design." },
  { id: "3", icon: "◻", title: "Security First",       desc: "Every line of code written with attack surfaces in mind. No shortcuts." },
  { id: "4", icon: "▲", title: "Full-Stack Web3",      desc: "End-to-end dApp development from contract to polished frontend." },
];

export const DEFAULT_SKILLS: Skill[] = [
  { id: "s1",  name: "Solidity",       category: "languages",   level: 5 },
  { id: "s2",  name: "TypeScript",     category: "languages",   level: 5 },
  { id: "s3",  name: "Rust",           category: "languages",   level: 3 },
  { id: "s4",  name: "Ethereum",       category: "blockchain",  level: 5 },
  { id: "s5",  name: "Base",           category: "blockchain",  level: 5 },
  { id: "s6",  name: "Polygon",        category: "blockchain",  level: 4 },
  { id: "s7",  name: "Hardhat",        category: "frameworks",  level: 5 },
  { id: "s8",  name: "Foundry",        category: "frameworks",  level: 5 },
  { id: "s9",  name: "Next.js",        category: "frameworks",  level: 4 },
  { id: "s10", name: "OpenZeppelin",   category: "tools",       level: 5 },
  { id: "s11", name: "The Graph",      category: "tools",       level: 4 },
  { id: "s12", name: "ERC-20",         category: "protocols",   level: 5 },
  { id: "s13", name: "ERC-721",        category: "protocols",   level: 5 },
  { id: "s14", name: "ERC-1155",       category: "protocols",   level: 4 },
];

// legacy alias
export const SKILLS = DEFAULT_SKILLS;

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "DeFi Yield Aggregator",
    description: "Multi-strategy yield optimizer managing $40M+ TVL across 12 protocols. Automated rebalancing, gas-optimized harvesting, and emergency withdrawal mechanisms.",
    techStack: ["Solidity", "Hardhat", "TypeScript", "The Graph"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "defi",
    featured: true,
    createdAt: "2023-01-01",
  },
  {
    id: "p2",
    title: "NFT Marketplace Protocol",
    description: "Gas-efficient marketplace supporting ERC-721 and ERC-1155 with royalty enforcement, bulk listings, and on-chain offer system. 250K+ transactions.",
    techStack: ["Solidity", "Next.js", "wagmi", "IPFS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "nft",
    featured: true,
    createdAt: "2022-06-01",
  },
  {
    id: "p3",
    title: "DAO Governance Framework",
    description: "Modular governance system with timelock, multi-sig treasury, and on-chain voting. Supporting $120M+ in treasury across 8 DAOs.",
    techStack: ["Solidity", "OpenZeppelin", "TypeScript"],
    githubUrl: "https://github.com",
    category: "dao",
    featured: true,
    createdAt: "2022-01-01",
  },
  {
    id: "p4",
    title: "Cross-Chain Bridge",
    description: "Trust-minimized bridge between Ethereum and Base using optimistic verification and fraud proofs. Sub-10-minute finality.",
    techStack: ["Solidity", "Rust", "Foundry"],
    githubUrl: "https://github.com",
    category: "infra",
    featured: false,
    createdAt: "2021-09-01",
  },
  {
    id: "p5",
    title: "Audit CLI Tool",
    description: "Static analysis tool for Solidity codebases. Detects reentrancy, integer overflow, and access control vulnerabilities with zero false positives.",
    techStack: ["TypeScript", "Node.js"],
    githubUrl: "https://github.com",
    category: "tools",
    featured: false,
    createdAt: "2021-01-01",
  },
];

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: "e1",
    company: "Protocol Labs",
    role: "Senior Smart Contract Engineer",
    period: "2022 — Present",
    description: "Leading smart contract development for core protocol primitives. Responsible for architecture, security reviews, and production deployments.",
    highlights: [
      "Shipped 3 major protocol upgrades with zero security incidents",
      "Reduced gas costs by 40% through assembly-level optimizations",
      "Established internal audit process adopted across 5 teams",
    ],
    type: "fulltime",
  },
  {
    id: "e2",
    company: "DeFi Ventures",
    role: "Blockchain Developer",
    period: "2020 — 2022",
    description: "Built and maintained DeFi products from initial concept to mainnet launch. Worked across the full stack from contracts to frontend.",
    highlights: [
      "Launched yield aggregator managing $40M+ TVL at peak",
      "Integrated 6 external protocols via adapter pattern",
      "Mentored 3 junior developers in Solidity best practices",
    ],
    type: "fulltime",
  },
  {
    id: "e3",
    company: "Freelance",
    role: "Smart Contract Auditor",
    period: "2019 — 2020",
    description: "Independent security audits for DeFi protocols and NFT projects. Delivered detailed reports with PoC exploits and remediation guidance.",
    highlights: [
      "Completed 30+ audits across DeFi, NFT, and DAO protocols",
      "Disclosed 5 critical vulnerabilities before mainnet launch",
      "Built reputation through public audit reports and blog posts",
    ],
    type: "freelance",
  },
];
