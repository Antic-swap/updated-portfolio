"use server";

import { kvGet, kvSet, kvDelete } from "@/neynar-db-sdk";
import {
  DEFAULT_PORTFOLIO_OWNER,
  DEFAULT_ABOUT_HIGHLIGHTS,
  DEFAULT_HERO_STATS,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_EXPERIENCES,
} from "@/features/portfolio/portfolio-data";
import type { PortfolioOwner, AboutHighlight, HeroStat, Skill, Project, Experience } from "@/features/portfolio/types";

// ─── Generic helpers ──────────────────────────────────────────────────────────

async function dbGet<T>(key: string, fallback: T): Promise<T> {
  try {
    const val = await kvGet(key);
    return val ? (JSON.parse(val) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function dbSet(key: string, value: unknown): Promise<void> {
  await kvSet(key, JSON.stringify(value));
}

// ─── Owner / Profile ──────────────────────────────────────────────────────────

export async function getPortfolioOwner(): Promise<PortfolioOwner> {
  return dbGet("portfolio_owner", DEFAULT_PORTFOLIO_OWNER);
}

export async function savePortfolioOwner(owner: PortfolioOwner): Promise<void> {
  await dbSet("portfolio_owner", owner);
}

// ─── Hero Stats ───────────────────────────────────────────────────────────────

export async function getHeroStats(): Promise<HeroStat[]> {
  return dbGet("portfolio_hero_stats", DEFAULT_HERO_STATS);
}

export async function saveHeroStats(stats: HeroStat[]): Promise<void> {
  await dbSet("portfolio_hero_stats", stats);
}

// ─── About Highlights ─────────────────────────────────────────────────────────

export async function getAboutHighlights(): Promise<AboutHighlight[]> {
  return dbGet("portfolio_about_highlights", DEFAULT_ABOUT_HIGHLIGHTS);
}

export async function saveAboutHighlights(highlights: AboutHighlight[]): Promise<void> {
  await dbSet("portfolio_about_highlights", highlights);
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export async function getSkills(): Promise<Skill[]> {
  return dbGet("portfolio_skills", DEFAULT_SKILLS);
}

export async function saveSkills(skills: Skill[]): Promise<void> {
  await dbSet("portfolio_skills", skills);
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  return dbGet("portfolio_projects", DEFAULT_PROJECTS);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await dbSet("portfolio_projects", projects);
}

// ─── Experiences ──────────────────────────────────────────────────────────────

export async function getExperiences(): Promise<Experience[]> {
  return dbGet("portfolio_experiences", DEFAULT_EXPERIENCES);
}

export async function saveExperiences(experiences: Experience[]): Promise<void> {
  await dbSet("portfolio_experiences", experiences);
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export async function getTheme(): Promise<string> {
  return dbGet("portfolio_theme", "mono");
}

export async function saveTheme(themeId: string): Promise<void> {
  await dbSet("portfolio_theme", themeId);
}

// ─── Reset All ────────────────────────────────────────────────────────────────

export async function resetAllPortfolioData(): Promise<void> {
  const keys = [
    "portfolio_owner", "portfolio_hero_stats", "portfolio_about_highlights",
    "portfolio_skills", "portfolio_projects", "portfolio_experiences", "portfolio_theme",
  ];
  await Promise.all(keys.map((k) => kvDelete(k)));
}

// ─── Load All (single round-trip for initial render) ─────────────────────────

export async function getAllPortfolioData() {
  const [owner, heroStats, aboutHighlights, skills, projects, experiences, theme] = await Promise.all([
    getPortfolioOwner(),
    getHeroStats(),
    getAboutHighlights(),
    getSkills(),
    getProjects(),
    getExperiences(),
    getTheme(),
  ]);
  return { owner, heroStats, aboutHighlights, skills, projects, experiences, theme };
}
