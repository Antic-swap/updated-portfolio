"use client";

import { useState } from "react";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import type { Project } from "@/features/portfolio/types";

const CATEGORY_LABELS: Record<Project["category"], string> = {
  defi: "DeFi", nft: "NFT", dao: "DAO", infra: "Infra", tools: "Tools", other: "Other",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col h-full"
      style={{ border: "var(--pt-card-border, 1px solid var(--pt-border))", borderRadius: "var(--pt-radius, 0px)", boxShadow: "var(--pt-card-shadow, none)", overflow: "hidden" }}>
      <div className="flex-1" style={{ padding: "var(--pt-card-pad, 1.25rem)", borderBottom: "1px solid var(--pt-border)" }}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-base font-bold leading-snug" style={{ color: "var(--pt-fg)" }}>{project.title}</h3>
          <div className="flex gap-1.5 shrink-0">
            {project.featured && (
              <span className="text-xs px-2 py-0.5 font-bold whitespace-nowrap uppercase tracking-wide"
                style={{ backgroundColor: "var(--pt-accent)", color: "var(--pt-accent-fg)", borderRadius: "var(--pt-radius, 0px)" }}>
                Featured
              </span>
            )}
            <span className="text-xs px-2 py-0.5 whitespace-nowrap uppercase tracking-wide"
              style={{ border: "1px solid var(--pt-border)", color: "var(--pt-fg3)", borderRadius: "var(--pt-radius, 0px)" }}>
              {CATEGORY_LABELS[project.category]}
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--pt-fg3)" }}>{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5" style={{ padding: "0.875rem var(--pt-card-pad, 1.25rem)" }}>
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-2 py-0.5 font-mono"
            style={{ color: "var(--pt-tag-fg)", backgroundColor: "var(--pt-tag-bg)", border: "1px solid var(--pt-tag-border)", borderRadius: "var(--pt-radius, 0px)" }}>
            {tech}
          </span>
        ))}
      </div>
      {(project.liveUrl || project.githubUrl) && (
        <div className="flex gap-4" style={{ padding: "0 var(--pt-card-pad, 1.25rem) 1rem" }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium underline underline-offset-2 uppercase tracking-wide" style={{ color: "var(--pt-accent)" }}>
              Live →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium underline underline-offset-2 uppercase tracking-wide" style={{ color: "var(--pt-fg3)" }}>
              GitHub →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function ProjectsSection({ desktop }: { desktop?: boolean }) {
  const { projects } = usePortfolio();
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const filtered = filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <div className={desktop ? "space-y-8" : "px-6 py-10 space-y-8"} style={desktop ? {} : { backgroundColor: "var(--pt-bg)" }}>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm font-mono mb-3 uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>
            {desktop ? "Projects" : "03 / Projects"}
          </div>
          <h2 className={`font-black leading-tight ${desktop ? "text-3xl" : "text-2xl"}`} style={{ color: "var(--pt-fg)" }}>Work</h2>
          <div className="mt-3 h-px w-12" style={{ backgroundColor: "var(--pt-accent)" }} />
        </div>
        <div className="flex gap-2 mb-1">
          {(["all", "featured"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="h-9 px-4 text-sm font-medium uppercase tracking-wide"
              style={filter === f
                ? { backgroundColor: "var(--pt-accent)", color: "var(--pt-accent-fg)", border: "1px solid var(--pt-accent)", borderRadius: "var(--pt-btn-radius, 0px)" }
                : { backgroundColor: "transparent", color: "var(--pt-fg3)", border: "1px solid var(--pt-border)", borderRadius: "var(--pt-btn-radius, 0px)" }
              }>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className={desktop ? "grid grid-cols-2 gap-5" : "space-y-4"}>
        {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        {filtered.length === 0 && (
          <div className="col-span-2 flex flex-col items-center py-16">
            <div className="text-4xl mb-4" style={{ color: "var(--pt-fg3)", opacity: 0.15 }}>◻</div>
            <p className="text-base" style={{ color: "var(--pt-fg3)" }}>No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
