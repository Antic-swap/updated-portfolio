export type NavSection = "home" | "about" | "skills" | "projects" | "experience" | "contact" | "admin";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "defi" | "nft" | "dao" | "infra" | "tools" | "other";
  featured: boolean;
  createdAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  type: "fulltime" | "contract" | "freelance";
}

export interface Skill {
  id: string;
  name: string;
  category: "languages" | "blockchain" | "frameworks" | "tools" | "protocols";
  level: number; // 1-5
}

export interface PortfolioOwner {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  twitter: string;
  farcaster: string;
  telegram?: string;
  availableForWork: boolean;
  photoUrl?: string;
}

export interface HeroStat {
  id: string;
  value: string;
  label: string;
}

export interface AboutHighlight {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
