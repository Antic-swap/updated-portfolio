"use client";

import { usePortfolio } from "@/features/portfolio/portfolio-context";
import type { HeroStat } from "@/features/portfolio/types";

export function HeroSection({ onNavigate }: { onNavigate: (s: string) => void }) {
  const { owner, heroStats, loading } = usePortfolio();
  const d = owner;

  return (
    <div className="min-h-[100dvh] flex flex-col px-6 py-10 gap-8" style={{ backgroundColor: "var(--pt-bg)" }}>
      {/* Identity */}
      <div className="flex-1 flex flex-col justify-center gap-6">
        {/* Photo */}
        <div className="w-20 h-20 flex items-center justify-center overflow-hidden"
          style={{ border: "1px solid var(--pt-border)", borderRadius: "var(--pt-radius-photo, 0px)" }}>
          {!loading && d.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={d.photoUrl} alt={d.name} className="w-full h-full object-cover" />
          ) : (
            <span style={{ fontSize: "28px", color: "var(--pt-accent)", opacity: 0.25 }}>◆</span>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: d.availableForWork ? "var(--pt-accent)" : "var(--pt-fg3)",
              boxShadow: d.availableForWork ? "0 0 5px var(--pt-accent)" : "none",
            }} />
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>
            {d.availableForWork ? "Available for work" : "Not available"}
          </span>
        </div>

        {/* Name */}
        <div>
          <h1 className="font-black leading-none mb-3"
            style={{
              color: "var(--pt-fg)",
              fontSize: "var(--pt-heading-size, 2.5rem)",
              fontWeight: "var(--pt-heading-weight, 900)" as React.CSSProperties["fontWeight"],
              letterSpacing: "var(--pt-heading-tracking, -0.02em)",
            }}>
            {d.name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-6" style={{ backgroundColor: "var(--pt-accent)" }} />
            <span className="text-sm font-mono uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>{d.title}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-base leading-relaxed max-w-xs" style={{ color: "var(--pt-fg2)" }}>{d.bio}</p>

        {/* CTAs */}
        <div className="flex gap-3">
          <button onClick={() => onNavigate("projects")} className="h-11 px-6 font-bold text-xs uppercase tracking-widest"
            style={{ backgroundColor: "var(--pt-btn-bg)", color: "var(--pt-btn-fg)", borderRadius: "var(--pt-btn-radius, 0px)" }}>
            View Work
          </button>
          <button onClick={() => onNavigate("contact")} className="h-11 px-6 font-medium text-xs uppercase tracking-widest"
            style={{ border: "1px solid var(--pt-border)", color: "var(--pt-fg2)", background: "transparent", borderRadius: "var(--pt-btn-radius, 0px)" }}>
            Contact
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {heroStats.map((stat) => (
          <div key={stat.id} className="p-4"
            style={{ border: "var(--pt-card-border, 1px solid var(--pt-border))", borderRadius: "var(--pt-radius, 0px)", boxShadow: "var(--pt-card-shadow, none)" }}>
            <div className="text-2xl font-black leading-none mb-1" style={{ color: "var(--pt-accent)" }}>{stat.value}</div>
            <div className="text-xs uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="flex items-center gap-2 pb-2">
        <div className="w-px h-6" style={{ backgroundColor: "var(--pt-border)" }} />
        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>Scroll</span>
      </div>
    </div>
  );
}
