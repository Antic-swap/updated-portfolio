"use client";

import { usePortfolio } from "@/features/portfolio/portfolio-context";

export function AboutSection({ desktop }: { desktop?: boolean }) {
  const { owner, aboutHighlights, loading } = usePortfolio();
  const d = owner;
  const hl = aboutHighlights;

  return (
    <div
      className={desktop ? "space-y-8" : "px-6 py-10 space-y-10"}
      style={desktop ? {} : { backgroundColor: "var(--pt-bg)" }}
    >
      {/* Header */}
      <div>
        <div className="text-sm font-mono mb-3 uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>
          {desktop ? "About" : "01 / About"}
        </div>
        <h2 className={`font-black leading-tight ${desktop ? "text-3xl" : "text-2xl"}`} style={{ color: "var(--pt-fg)" }}>
          Who I Am
        </h2>
        <div className="mt-3 h-px w-12" style={{ backgroundColor: "var(--pt-accent)" }} />
      </div>

      {/* Photo + Bio */}
      <div className="space-y-4">
        {!desktop && (
          <div
            className="w-20 h-20 flex items-center justify-center overflow-hidden"
            style={{ border: "1px solid var(--pt-border)", borderRadius: "var(--pt-radius-photo, 0px)" }}
          >
            {!loading && d.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={d.photoUrl} alt={d.name} className="w-full h-full object-cover" />
            ) : (
              <span style={{ fontSize: "24px", color: "var(--pt-accent)", opacity: 0.2 }}>◆</span>
            )}
          </div>
        )}
        <p className="text-base leading-relaxed" style={{ color: "var(--pt-fg2)" }}>{d.bio}</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--pt-fg3)" }}>{d.tagline}</p>
      </div>

      {/* Highlights */}
      <div className="space-y-3">
        {hl.map((item) => (
          <div
            key={item.id}
            className="space-y-1.5"
            style={{
              padding: "var(--pt-card-pad, 1rem)",
              border: "var(--pt-card-border, 1px solid var(--pt-border))",
              borderRadius: "var(--pt-radius, 0px)",
              boxShadow: "var(--pt-card-shadow, none)",
            }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--pt-accent)" }}>{item.icon}</span>
              <span className="text-base font-bold" style={{ color: "var(--pt-fg)" }}>{item.title}</span>
            </div>
            <p className="text-sm leading-relaxed pl-6" style={{ color: "var(--pt-fg3)" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="pt-6 space-y-3" style={{ borderTop: "1px solid var(--pt-border)" }}>
        {[
          { label: "Location",  value: d.location },
          { label: "Email",     value: d.email },
          { label: "Farcaster", value: d.farcaster?.replace("https://warpcast.com/", "@") ?? "" },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-sm font-mono uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>
              {item.label}
            </span>
            <span className="text-sm" style={{ color: "var(--pt-fg)" }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
