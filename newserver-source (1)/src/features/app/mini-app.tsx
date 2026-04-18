"use client";

import { useState, useEffect, useRef } from "react";
import { useFarcasterUser } from "@/neynar-farcaster-sdk/mini";
import { HeroSection } from "@/features/portfolio/components/hero-section";
import { AboutSection } from "@/features/portfolio/components/about-section";
import { SkillsSection } from "@/features/portfolio/components/skills-section";
import { ProjectsSection } from "@/features/portfolio/components/projects-section";
import { ExperienceSection } from "@/features/portfolio/components/experience-section";
import { ContactSection } from "@/features/portfolio/components/contact-section";
import { AdminPanel } from "@/features/portfolio/components/admin-panel";
import { PortfolioNav } from "@/features/portfolio/components/portfolio-nav";
import { PortfolioProvider, usePortfolio } from "@/features/portfolio/portfolio-context";
import { ShareButton } from "@/neynar-farcaster-sdk/mini";
import type { NavSection } from "@/features/portfolio/types";

// ─── Owner FID — only this FID can access admin ───────────────────────────────
const OWNER_FID = 3317691;

const DESKTOP_SECTIONS: NavSection[] = ["home", "about", "projects", "experience", "contact"];

const NAV_ITEMS: { key: NavSection; label: string; icon: string }[] = [
  { key: "home",       label: "Home",       icon: "◆" },
  { key: "about",      label: "About",      icon: "◻" },
  { key: "skills",     label: "Skills",     icon: "◈" },
  { key: "projects",   label: "Projects",   icon: "⬡" },
  { key: "experience", label: "Experience", icon: "▲" },
  { key: "contact",    label: "Contact",    icon: "◇" },
];

export function MiniApp() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

function PortfolioApp() {
  const { data: farcasterUser } = useFarcasterUser();
  const isOwner = farcasterUser?.fid === OWNER_FID;

  const [activeSection, setActiveSection] = useState<NavSection>("home");
  const [adminOpen, setAdminOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section") as NavSection;
            if (id) setActiveSection(id);
          }
        });
      },
      { root: main, rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    const timer = setTimeout(() => {
      DESKTOP_SECTIONS.forEach((id) => {
        const el = main.querySelector(`[data-section="${id}"]`);
        if (el) observer.observe(el);
      });
    }, 100);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [adminOpen]);

  function handleNavigate(section: string) {
    if (section === "admin") {
      if (isOwner) setAdminOpen(true);
      return;
    }
    setActiveSection(section as NavSection);
    const main = mainRef.current;
    if (main) {
      const desktopId = section === "skills" ? "about" : section;
      const target = main.querySelector(`[data-section="${desktopId}"]`);
      if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    main?.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (adminOpen) return <AdminPanel onClose={() => setAdminOpen(false)} />;

  return (
    <div className="relative h-dvh flex flex-col overflow-hidden" style={{ backgroundColor: "var(--pt-bg)" }}>
      {/* Mobile top nav */}
      <div className="lg:hidden">
        <PortfolioNav active={activeSection} onNavigate={handleNavigate} isOwner={isOwner} />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 h-full overflow-y-auto"
          style={{ borderRight: "1px solid var(--pt-border)", backgroundColor: "var(--pt-bg)" }}>
          <DesktopSidebar active={activeSection} onNavigate={handleNavigate} isOwner={isOwner} />
        </aside>

        {/* Main content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--pt-bg)" }}>
          <div className="hidden lg:block">
            <DesktopLayout onNavigate={handleNavigate} />
          </div>
          <div className="lg:hidden">
            {activeSection === "home"       && <HeroSection onNavigate={handleNavigate} />}
            {activeSection === "about"      && <AboutSection />}
            {activeSection === "skills"     && <SkillsSection />}
            {activeSection === "projects"   && <ProjectsSection />}
            {activeSection === "experience" && <ExperienceSection />}
            {activeSection === "contact"    && <ContactSection />}
          </div>
        </main>
      </div>

      {/* Mobile share bar */}
      <div className="lg:hidden shrink-0 px-6 py-3"
        style={{ borderTop: "1px solid var(--pt-border)", backgroundColor: "var(--pt-bg)" }}>
        <ShareButton
          text="Check out this developer portfolio on Farcaster"
          className="w-full h-[44px] bg-transparent border border-[var(--pt-border)] text-[var(--pt-fg2)] text-[11px] uppercase tracking-[0.1em] font-medium"
        >
          View Portfolio
        </ShareButton>
      </div>
    </div>
  );
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────

function DesktopSidebar({ active, onNavigate, isOwner }: { active: NavSection; onNavigate: (s: string) => void; isOwner: boolean }) {
  const { owner, loading } = usePortfolio();
  const d = owner;

  return (
    <div className="flex flex-col h-full p-6 gap-0">
      {/* Identity block */}
      <div className="mb-8">
        <div className="w-16 h-16 mb-4 overflow-hidden flex items-center justify-center"
          style={{ border: "1px solid var(--pt-border)", borderRadius: "var(--pt-radius-photo, 0px)" }}>
          {!loading && d.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={d.photoUrl} alt={d.name} className="w-full h-full object-cover" />
          ) : (
            <span style={{ fontSize: "20px", color: "var(--pt-accent)", opacity: 0.3 }}>◆</span>
          )}
        </div>
        <div className="w-6 h-px mb-3" style={{ backgroundColor: "var(--pt-accent)" }} />
        <h2 className="text-lg font-black leading-tight mb-1" style={{ color: "var(--pt-fg)" }}>{d.name}</h2>
        <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--pt-fg3)" }}>{d.title}</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: d.availableForWork ? "var(--pt-accent)" : "var(--pt-fg3)",
              boxShadow: d.availableForWork ? "0 0 5px var(--pt-accent)" : "none",
            }} />
          <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>
            {d.availableForWork ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button key={item.key} onClick={() => onNavigate(item.key)}
              className="flex items-center gap-3 h-10 px-3 text-left transition-all"
              style={{
                backgroundColor: isActive ? "var(--pt-bg3)" : "transparent",
                borderLeft: isActive ? "2px solid var(--pt-accent)" : "2px solid transparent",
                color: isActive ? "var(--pt-accent)" : "var(--pt-fg3)",
                borderRadius: "var(--pt-radius, 0px)",
              }}>
              <span className="text-xs w-4 text-center">{item.icon}</span>
              <span className="text-xs uppercase tracking-widest font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom: share + admin (admin only for owner) */}
      <div className="mt-6 space-y-2">
        <ShareButton
          text="Check out this developer portfolio on Farcaster"
          className="w-full h-9 flex items-center justify-center text-[10px] uppercase tracking-widest font-medium bg-transparent border border-[var(--pt-border)] text-[var(--pt-fg3)] rounded-[var(--pt-btn-radius,0px)]"
        >
          Share Portfolio
        </ShareButton>
        {isOwner && (
          <button onClick={() => onNavigate("admin")}
            className="w-full h-9 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-medium transition-colors"
            style={{ border: "1px solid var(--pt-border)", color: "var(--pt-fg3)", borderRadius: "var(--pt-btn-radius, 0px)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
            Admin Panel
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Desktop Layout ───────────────────────────────────────────────────────────

function DesktopLayout({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <div className="max-w-5xl xl:max-w-6xl mx-auto px-8 xl:px-12 py-12 space-y-24">
      <section data-section="home"><DesktopHero onNavigate={onNavigate} /></section>
      <section data-section="about" className="grid grid-cols-2 gap-12 xl:gap-16">
        <AboutSection desktop />
        <SkillsSection desktop />
      </section>
      <section data-section="projects"><ProjectsSection desktop /></section>
      <section data-section="experience"><ExperienceSection desktop /></section>
      <section data-section="contact"><ContactSection desktop /></section>
    </div>
  );
}

// ─── Desktop Hero ─────────────────────────────────────────────────────────────

function DesktopHero({ onNavigate }: { onNavigate: (s: string) => void }) {
  const { owner, heroStats, loading } = usePortfolio();
  const d = owner;

  return (
    <div className="grid grid-cols-2 gap-16 items-center min-h-[420px]">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-20 h-20 overflow-hidden flex items-center justify-center shrink-0"
            style={{ border: "1px solid var(--pt-border)", borderRadius: "var(--pt-radius-photo, 0px)" }}>
            {!loading && d.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={d.photoUrl} alt={d.name} className="w-full h-full object-cover" />
            ) : (
              <span style={{ fontSize: "28px", color: "var(--pt-accent)", opacity: 0.25 }}>◆</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: d.availableForWork ? "var(--pt-accent)" : "var(--pt-fg3)",
                  boxShadow: d.availableForWork ? "0 0 6px var(--pt-accent)" : "none",
                }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>
                {d.availableForWork ? "Available for work" : "Not available"}
              </span>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>{d.location}</p>
          </div>
        </div>

        <h1 className="font-black leading-none mb-3"
          style={{
            color: "var(--pt-fg)",
            fontSize: "var(--pt-heading-size, 2.5rem)",
            fontWeight: "var(--pt-heading-weight, 900)" as React.CSSProperties["fontWeight"],
            letterSpacing: "var(--pt-heading-tracking, -0.02em)",
          }}>
          {d.name}
        </h1>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8" style={{ backgroundColor: "var(--pt-accent)" }} />
          <span className="text-sm font-mono uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>{d.title}</span>
        </div>
        <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "var(--pt-fg2)" }}>{d.bio}</p>
        <div className="flex gap-3">
          <button onClick={() => onNavigate("projects")} className="h-11 px-8 font-bold text-xs uppercase tracking-widest"
            style={{ backgroundColor: "var(--pt-btn-bg)", color: "var(--pt-btn-fg)", borderRadius: "var(--pt-btn-radius, 0px)" }}>
            View Work
          </button>
          <button onClick={() => onNavigate("contact")} className="h-11 px-8 font-medium text-xs uppercase tracking-widest"
            style={{ border: "1px solid var(--pt-border)", color: "var(--pt-fg2)", background: "transparent", borderRadius: "var(--pt-btn-radius, 0px)" }}>
            Get in Touch
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {!loading && (
          <p className="text-3xl xl:text-4xl font-black leading-tight" style={{ color: "var(--pt-fg)", opacity: 0.12 }}>
            &ldquo;{d.tagline}&rdquo;
          </p>
        )}
        <div className="grid grid-cols-3 gap-4">
          {heroStats.map((stat) => (
            <div key={stat.id} className="p-5"
              style={{ border: "var(--pt-card-border, 1px solid var(--pt-border))", borderRadius: "var(--pt-radius, 0px)", boxShadow: "var(--pt-card-shadow, none)" }}>
              <div className="text-3xl font-black leading-none mb-1" style={{ color: "var(--pt-accent)" }}>{stat.value}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
        {!loading && (
          <div className="flex gap-4">
            {[
              { label: "GitHub",    href: d.github },
              { label: "Twitter",   href: d.twitter },
              { label: "Farcaster", href: d.farcaster },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest hover:underline underline-offset-2"
                style={{ color: "var(--pt-fg3)" }}>
                {s.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
