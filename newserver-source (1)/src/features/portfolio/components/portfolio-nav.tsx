"use client";

import { useState, useEffect } from "react";
import type { NavSection } from "@/features/portfolio/types";

const NAV_ITEMS: { key: NavSection; label: string; short: string }[] = [
  { key: "home",       label: "Home",       short: "Home" },
  { key: "about",      label: "About",      short: "About" },
  { key: "skills",     label: "Skills",     short: "Skills" },
  { key: "projects",   label: "Projects",   short: "Work" },
  { key: "experience", label: "Experience", short: "Exp" },
  { key: "contact",    label: "Contact",    short: "Contact" },
];

interface PortfolioNavProps {
  active: NavSection;
  onNavigate: (s: string) => void;
  isOwner: boolean;
}

export function PortfolioNav({ active, onNavigate, isOwner }: PortfolioNavProps) {
  const [navStyle, setNavStyle] = useState<"pill" | "solid" | "underline">("underline");

  useEffect(() => {
    const val = getComputedStyle(document.documentElement).getPropertyValue("--pt-nav-style").trim();
    if (val === "pill" || val === "solid") setNavStyle(val);
    else setNavStyle("underline");
  }, []);

  return (
    <div className="flex items-center justify-between px-4 h-12"
      style={{ borderBottom: "1px solid var(--pt-border)", backgroundColor: "var(--pt-bg)" }}>
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;

          if (navStyle === "pill") {
            return (
              <button key={item.key} onClick={() => onNavigate(item.key)}
                className="shrink-0 h-7 px-3 text-[11px] uppercase tracking-widest transition-colors"
                style={isActive
                  ? { backgroundColor: "var(--pt-accent)", color: "var(--pt-accent-fg)", borderRadius: "9999px" }
                  : { color: "var(--pt-fg3)", background: "transparent" }
                }>
                <span className="sm:hidden">{item.short}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          }

          if (navStyle === "solid") {
            return (
              <button key={item.key} onClick={() => onNavigate(item.key)}
                className="shrink-0 h-7 px-3 text-[11px] uppercase tracking-widest transition-colors"
                style={isActive
                  ? { backgroundColor: "var(--pt-bg3)", color: "var(--pt-accent)", borderRadius: "var(--pt-btn-radius, 0px)" }
                  : { color: "var(--pt-fg3)", background: "transparent" }
                }>
                <span className="sm:hidden">{item.short}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          }

          // underline (default)
          return (
            <button key={item.key} onClick={() => onNavigate(item.key)}
              className="shrink-0 h-12 px-3 text-[11px] uppercase tracking-widest transition-colors relative"
              style={{ color: isActive ? "var(--pt-accent)" : "var(--pt-fg3)" }}
              aria-label={item.label}>
              <span className="sm:hidden">{item.short}</span>
              <span className="hidden sm:inline">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-0.5" style={{ backgroundColor: "var(--pt-accent)" }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Admin button — only visible to owner */}
      {isOwner && (
        <button onClick={() => onNavigate("admin")}
          className="shrink-0 w-9 h-9 flex items-center justify-center ml-1"
          aria-label="Admin panel" style={{ color: "var(--pt-fg3)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        </button>
      )}
    </div>
  );
}
