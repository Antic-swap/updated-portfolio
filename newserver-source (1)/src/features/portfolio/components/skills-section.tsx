"use client";

import { useState } from "react";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import type { Skill } from "@/features/portfolio/types";

const CATEGORIES = ["languages", "blockchain", "frameworks", "tools", "protocols"] as const;
type Category = typeof CATEGORIES[number];

const CATEGORY_LABELS: Record<Category, string> = {
  languages: "Languages", blockchain: "Blockchain", frameworks: "Frameworks", tools: "Tools", protocols: "Protocols",
};

const LEVEL_LABELS: Record<number, string> = {
  1: "Beginner", 2: "Familiar", 3: "Proficient", 4: "Advanced", 5: "Expert",
};

export function SkillsSection({ desktop }: { desktop?: boolean }) {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<Category>("languages");

  if (desktop) {
    return (
      <div className="space-y-8">
        <div>
          <div className="text-sm font-mono mb-3 uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>Skills</div>
          <h2 className="text-3xl font-black leading-tight" style={{ color: "var(--pt-fg)" }}>Expertise</h2>
          <div className="mt-3 h-px w-12" style={{ backgroundColor: "var(--pt-accent)" }} />
        </div>
        <div className="space-y-6">
          {CATEGORIES.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            if (catSkills.length === 0) return null;
            return (
              <div key={cat}>
                <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--pt-fg3)" }}>
                  {CATEGORY_LABELS[cat]}
                </div>
                <div className="space-y-2">
                  {catSkills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-3">
                      <span className="text-sm w-28 shrink-0" style={{ color: "var(--pt-fg2)" }}>{skill.name}</span>
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-0.5 flex-1"
                            style={{ backgroundColor: i <= skill.level ? "var(--pt-accent)" : "var(--pt-border)" }} />
                        ))}
                      </div>
                      <span className="text-xs w-16 text-right" style={{ color: "var(--pt-fg3)" }}>
                        {LEVEL_LABELS[skill.level]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <div className="px-6 py-10 space-y-8" style={{ backgroundColor: "var(--pt-bg)" }}>
      <div>
        <div className="text-sm font-mono mb-3 uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>02 / Skills</div>
        <h2 className="text-2xl font-black leading-tight" style={{ color: "var(--pt-fg)" }}>Expertise</h2>
        <div className="mt-3 h-px w-12" style={{ backgroundColor: "var(--pt-accent)" }} />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="shrink-0 h-9 px-4 text-xs uppercase tracking-widest transition-colors"
            style={activeCategory === cat
              ? { backgroundColor: "var(--pt-accent)", color: "var(--pt-accent-fg)", borderRadius: "var(--pt-btn-radius, 0px)" }
              : { border: "1px solid var(--pt-border)", color: "var(--pt-fg3)", background: "transparent", borderRadius: "var(--pt-btn-radius, 0px)" }
            }
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-sm py-8 text-center" style={{ color: "var(--pt-fg3)" }}>No skills in this category.</p>
        ) : (
          filtered.map((skill) => (
            <div key={skill.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: "var(--pt-fg)" }}>{skill.name}</span>
                <span className="text-xs" style={{ color: "var(--pt-fg3)" }}>{LEVEL_LABELS[skill.level]}</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-1 flex-1"
                    style={{ backgroundColor: i <= skill.level ? "var(--pt-accent)" : "var(--pt-border)" }} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
