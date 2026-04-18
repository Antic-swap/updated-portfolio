"use client";

import { usePortfolio } from "@/features/portfolio/portfolio-context";
import type { Experience } from "@/features/portfolio/types";

const TYPE_LABELS: Record<Experience["type"], string> = {
  fulltime: "Full-time", contract: "Contract", freelance: "Freelance",
};

function ExperienceCard({ exp, desktop }: { exp: Experience; desktop?: boolean }) {
  return (
    <div className="relative pl-5" style={{ borderLeft: "2px solid var(--pt-border)" }}>
      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5"
        style={{ backgroundColor: "var(--pt-accent)", borderRadius: "var(--pt-radius, 0px)" }} />
      <div className="pb-8 space-y-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-mono" style={{ color: "var(--pt-fg3)" }}>{exp.period}</span>
            <span className="text-xs px-2 py-0.5 uppercase tracking-wide"
              style={{ border: "1px solid var(--pt-border)", color: "var(--pt-fg3)", borderRadius: "var(--pt-radius, 0px)" }}>
              {TYPE_LABELS[exp.type]}
            </span>
          </div>
          <h3 className={`font-bold mt-1 ${desktop ? "text-lg" : "text-base"}`} style={{ color: "var(--pt-fg)" }}>
            {exp.role}
          </h3>
          <p className="text-sm font-medium" style={{ color: "var(--pt-fg3)" }}>{exp.company}</p>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--pt-fg3)" }}>{exp.description}</p>
        <ul className="space-y-2">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-sm mt-0.5 shrink-0" style={{ color: "var(--pt-accent)", opacity: 0.7 }}>—</span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--pt-fg2)" }}>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExperienceSection({ desktop }: { desktop?: boolean }) {
  const { experiences } = usePortfolio();

  return (
    <div className={desktop ? "space-y-10" : "px-6 py-10 space-y-10"} style={desktop ? {} : { backgroundColor: "var(--pt-bg)" }}>
      <div>
        <div className="text-sm font-mono mb-3 uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>
          {desktop ? "Experience" : "04 / Experience"}
        </div>
        <h2 className={`font-black leading-tight ${desktop ? "text-3xl" : "text-2xl"}`} style={{ color: "var(--pt-fg)" }}>
          Timeline
        </h2>
        <div className="mt-3 h-px w-12" style={{ backgroundColor: "var(--pt-accent)" }} />
      </div>
      {desktop ? (
        <div className="grid grid-cols-2 gap-x-12">
          {experiences.map((exp) => <ExperienceCard key={exp.id} exp={exp} desktop />)}
        </div>
      ) : (
        <div>{experiences.map((exp) => <ExperienceCard key={exp.id} exp={exp} />)}</div>
      )}
    </div>
  );
}
