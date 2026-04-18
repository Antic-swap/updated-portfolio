"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAllPortfolioData } from "@/features/portfolio/portfolio-actions";
import { applyStyle } from "@/features/portfolio/styles";
import type { ThemeId } from "@/features/portfolio/styles";
import type { PortfolioOwner, AboutHighlight, HeroStat, Skill, Project, Experience } from "@/features/portfolio/types";
import {
  DEFAULT_PORTFOLIO_OWNER,
  DEFAULT_ABOUT_HIGHLIGHTS,
  DEFAULT_HERO_STATS,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_EXPERIENCES,
} from "@/features/portfolio/portfolio-data";

export interface PortfolioData {
  owner: PortfolioOwner;
  heroStats: HeroStat[];
  aboutHighlights: AboutHighlight[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  theme: string;
}

interface PortfolioContextValue extends PortfolioData {
  loading: boolean;
  reload: () => Promise<void>;
}

const defaultData: PortfolioData = {
  owner: DEFAULT_PORTFOLIO_OWNER,
  heroStats: DEFAULT_HERO_STATS,
  aboutHighlights: DEFAULT_ABOUT_HIGHLIGHTS,
  skills: DEFAULT_SKILLS,
  projects: DEFAULT_PROJECTS,
  experiences: DEFAULT_EXPERIENCES,
  theme: "mono",
};

const PortfolioContext = createContext<PortfolioContextValue>({
  ...defaultData,
  loading: true,
  reload: async () => {},
});

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const fresh = await getAllPortfolioData();
      setData(fresh);
      applyStyle(fresh.theme as ThemeId);
    } catch {
      applyStyle("mono");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <PortfolioContext.Provider value={{ ...data, loading, reload }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
