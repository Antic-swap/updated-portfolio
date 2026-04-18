"use client";

import { useState, useEffect, useRef } from "react";
import {
  DEFAULT_PORTFOLIO_OWNER,
  DEFAULT_ABOUT_HIGHLIGHTS,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_EXPERIENCES,
  DEFAULT_HERO_STATS,
} from "@/features/portfolio/portfolio-data";
import { PORTFOLIO_STYLES, applyStyle } from "@/features/portfolio/styles";
import { PORTFOLIO_TEMPLATES } from "@/features/portfolio/templates";
import {
  savePortfolioOwner,
  saveHeroStats,
  saveAboutHighlights,
  saveSkills,
  saveProjects,
  saveExperiences,
  saveTheme,
  resetAllPortfolioData,
} from "@/features/portfolio/portfolio-actions";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import type { PortfolioOwner, AboutHighlight, Skill, Project, Experience, HeroStat } from "@/features/portfolio/types";

type Tab = "templates" | "styles" | "profile" | "about" | "skills" | "projects" | "experience" | "settings";

const TABS: { key: Tab; label: string }[] = [
  { key: "templates",  label: "Templates"  },
  { key: "styles",     label: "Styles"     },
  { key: "profile",    label: "Profile"    },
  { key: "about",      label: "About"      },
  { key: "skills",     label: "Skills"     },
  { key: "projects",   label: "Projects"   },
  { key: "experience", label: "Experience" },
  { key: "settings",   label: "Settings"   },
];

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("templates");
  const { reload } = usePortfolio();

  async function handleClose() {
    await reload();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-12 shrink-0" style={{ borderBottom: "1px solid #1a1a1a" }}>
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="shrink-0 text-[11px] uppercase tracking-widest h-12 transition-colors relative"
              style={{ color: tab === t.key ? "#fff" : "#444" }}>
              {t.label}
              {tab === t.key && <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />}
            </button>
          ))}
        </div>
        <button onClick={handleClose} className="shrink-0 ml-4 text-[#444] hover:text-white transition-colors text-lg">✕</button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {tab === "templates"  && <TemplatesTab onClose={handleClose} />}
        {tab === "styles"     && <StylesTab />}
        {tab === "profile"    && <ProfileEditor />}
        {tab === "about"      && <AboutEditor />}
        {tab === "skills"     && <SkillsManager />}
        {tab === "projects"   && <ProjectEditor />}
        {tab === "experience" && <ExperienceEditor />}
        {tab === "settings"   && <SettingsTab onClose={handleClose} />}
      </div>
    </div>
  );
}

// ─── Templates ────────────────────────────────────────────────────────────────

function TemplatesTab({ onClose }: { onClose: () => void }) {
  const { owner } = usePortfolio();
  const [loading, setLoading] = useState(false);

  async function applyTemplate(templateId: string) {
    const tpl = PORTFOLIO_TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;
    setLoading(true);
    const mergedOwner: PortfolioOwner = {
      ...DEFAULT_PORTFOLIO_OWNER,
      ...tpl.owner as PortfolioOwner,
      name: owner.name || DEFAULT_PORTFOLIO_OWNER.name,
      email: owner.email || DEFAULT_PORTFOLIO_OWNER.email,
      github: owner.github || DEFAULT_PORTFOLIO_OWNER.github,
      twitter: owner.twitter || DEFAULT_PORTFOLIO_OWNER.twitter,
      farcaster: owner.farcaster || DEFAULT_PORTFOLIO_OWNER.farcaster,
      photoUrl: owner.photoUrl || "",
    };
    await Promise.all([
      savePortfolioOwner(mergedOwner),
      saveHeroStats(tpl.heroStats),
      saveAboutHighlights(tpl.aboutHighlights),
      saveSkills(tpl.skills),
      saveProjects(tpl.projects),
      saveExperiences(tpl.experiences),
      saveTheme(tpl.theme),
    ]);
    applyStyle(tpl.theme);
    setLoading(false);
    onClose();
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h3 className="text-base font-black text-white">Templates</h3>
        <p className="text-xs text-gray-500 mt-1">Pick a template to fill in content. Your name, photo, and contact details are preserved.</p>
      </div>
      <div className="space-y-3">
        {PORTFOLIO_TEMPLATES.map((tpl) => (
          <button key={tpl.id} onClick={() => applyTemplate(tpl.id)} disabled={loading}
            className="w-full text-left p-4 transition-colors hover:border-white disabled:opacity-40"
            style={{ border: "1px solid #1a1a1a", backgroundColor: "#111" }}>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg">{tpl.emoji}</span>
              <span className="text-sm font-bold text-white">{tpl.name}</span>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">{tpl.theme}</span>
            </div>
            <p className="text-xs text-gray-500 pl-8">{tpl.tagline}</p>
          </button>
        ))}
      </div>
      {loading && <p className="text-xs text-gray-500 text-center">Saving template…</p>}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

function StylesTab() {
  const { theme } = usePortfolio();
  const [current, setCurrent] = useState(theme);

  async function pick(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    applyStyle(id as any);
    setCurrent(id);
    await saveTheme(id);
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h3 className="text-base font-black text-white">Visual Style</h3>
        <p className="text-xs text-gray-500 mt-1">Applies instantly and saves permanently.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PORTFOLIO_STYLES.map((s) => (
          <button key={s.id} onClick={() => pick(s.id)} className="text-left p-4 transition-colors"
            style={{ border: `1px solid ${current === s.id ? "#fff" : "#1a1a1a"}`, backgroundColor: current === s.id ? "#111" : "#0d0d0d" }}>
            <div className="flex items-center gap-2 mb-2">
              <span>{s.emoji}</span>
              <span className="text-sm font-bold text-white">{s.name}</span>
            </div>
            <div className="flex gap-1 mb-2">
              {s.swatches.map((c, i) => <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: c }} />)}
            </div>
            <p className="text-[10px] text-gray-600 leading-relaxed">{s.vibe}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Profile Editor ───────────────────────────────────────────────────────────

function ProfileEditor() {
  const { owner, heroStats } = usePortfolio();
  const [ownerState, setOwnerState] = useState<PortfolioOwner>(owner);
  const [stats, setStats] = useState<HeroStat[]>(heroStats);
  const fileRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await Promise.all([savePortfolioOwner(ownerState), saveHeroStats(stats)]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setOwnerState((o) => ({ ...o, photoUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  const Field = ({ label, field, type = "text" }: { label: string; field: keyof PortfolioOwner; type?: string }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-gray-500">{label}</label>
      <input type={type} value={(ownerState[field] as string) ?? ""}
        onChange={(e) => setOwnerState((o) => ({ ...o, [field]: e.target.value }))}
        className="w-full h-10 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-lg">
      <h3 className="text-base font-black text-white">Profile</h3>
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Photo</label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border border-[#222] flex items-center justify-center overflow-hidden">
            {ownerState.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={ownerState.photoUrl} alt="photo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-700 text-xl">◆</span>
            )}
          </div>
          <button onClick={() => fileRef.current?.click()} className="h-9 px-4 border border-[#333] text-gray-400 text-xs uppercase tracking-widest">Upload</button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
        </div>
      </div>
      <Field label="Name"          field="name" />
      <Field label="Title"         field="title" />
      <Field label="Tagline"       field="tagline" />
      <Field label="Bio"           field="bio" />
      <Field label="Location"      field="location" />
      <Field label="Email"         field="email" type="email" />
      <Field label="GitHub URL"    field="github" />
      <Field label="Twitter URL"   field="twitter" />
      <Field label="Farcaster URL" field="farcaster" />
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Available for Work</span>
        <button onClick={() => setOwnerState((o) => ({ ...o, availableForWork: !o.availableForWork }))}
          className="w-12 h-6 relative" style={{ backgroundColor: ownerState.availableForWork ? "#fff" : "#222", borderRadius: "9999px" }}>
          <div className="absolute top-0.5 w-5 h-5 bg-black transition-all"
            style={{ left: ownerState.availableForWork ? "calc(100% - 1.375rem)" : "0.125rem", borderRadius: "9999px" }} />
        </button>
      </div>
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Hero Stats</label>
        {stats.map((stat, i) => (
          <div key={stat.id} className="flex gap-2">
            <input value={stat.value} onChange={(e) => setStats((s) => s.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
              placeholder="Value" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
            <input value={stat.label} onChange={(e) => setStats((s) => s.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
              placeholder="Label" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
          </div>
        ))}
      </div>
      <button onClick={save} disabled={saving}
        className="w-full h-11 bg-white text-black font-bold text-xs uppercase tracking-widest disabled:opacity-40">
        {saving ? "Saving…" : saved ? "Saved!" : "Save Profile"}
      </button>
    </div>
  );
}

// ─── About Editor ─────────────────────────────────────────────────────────────

function AboutEditor() {
  const { aboutHighlights } = usePortfolio();
  const [highlights, setHighlights] = useState<AboutHighlight[]>(aboutHighlights);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await saveAboutHighlights(highlights);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function update(i: number, field: keyof AboutHighlight, value: string) {
    setHighlights((h) => h.map((x, j) => j === i ? { ...x, [field]: value } : x));
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h3 className="text-base font-black text-white">About Highlights</h3>
      {highlights.map((h, i) => (
        <div key={h.id} className="space-y-2 p-4 border border-[#1a1a1a]">
          <div className="flex gap-2">
            <input value={h.icon} onChange={(e) => update(i, "icon", e.target.value)}
              placeholder="Icon" className="w-14 h-9 px-2 text-center text-sm bg-[#111] border border-[#222] text-white outline-none" />
            <input value={h.title} onChange={(e) => update(i, "title", e.target.value)}
              placeholder="Title" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
          </div>
          <textarea value={h.desc} onChange={(e) => update(i, "desc", e.target.value)}
            placeholder="Description" rows={2}
            className="w-full px-3 py-2 text-sm bg-[#111] border border-[#222] text-white outline-none resize-none" />
        </div>
      ))}
      <button onClick={save} disabled={saving}
        className="w-full h-11 bg-white text-black font-bold text-xs uppercase tracking-widest disabled:opacity-40">
        {saving ? "Saving…" : saved ? "Saved!" : "Save Highlights"}
      </button>
    </div>
  );
}

// ─── Skills Manager ───────────────────────────────────────────────────────────

const SKILL_CATEGORIES = ["languages", "blockchain", "frameworks", "tools", "protocols"] as const;
const LEVEL_LABELS: Record<number, string> = { 1: "Beginner", 2: "Familiar", 3: "Proficient", 4: "Advanced", 5: "Expert" };

function SkillsManager() {
  const { skills: initialSkills } = usePortfolio();
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setSkills(initialSkills); }, [initialSkills]);

  async function save() {
    setSaving(true);
    await saveSkills(skills);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addSkill() {
    setSkills((s) => [...s, { id: Date.now().toString(), name: "", category: "languages", level: 3 }]);
  }

  function update(id: string, field: keyof Skill, value: string | number) {
    setSkills((s) => s.map((x) => x.id === id ? { ...x, [field]: value } : x));
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-white">Skills</h3>
        <button onClick={addSkill} className="h-8 px-3 border border-[#333] text-gray-400 text-xs uppercase tracking-widest">+ Add</button>
      </div>
      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="flex gap-2 items-center">
            <input value={skill.name} onChange={(e) => update(skill.id, "name", e.target.value)}
              placeholder="Skill name" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
            <select value={skill.category} onChange={(e) => update(skill.id, "category", e.target.value)}
              className="h-9 px-2 text-xs bg-[#111] border border-[#222] text-white outline-none">
              {SKILL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={skill.level} onChange={(e) => update(skill.id, "level", parseInt(e.target.value))}
              className="h-9 px-2 text-xs bg-[#111] border border-[#222] text-white outline-none">
              {[1,2,3,4,5].map((l) => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
            </select>
            <button onClick={() => setSkills((s) => s.filter((x) => x.id !== skill.id))}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-red-500">✕</button>
          </div>
        ))}
      </div>
      <button onClick={save} disabled={saving}
        className="w-full h-11 bg-white text-black font-bold text-xs uppercase tracking-widest disabled:opacity-40">
        {saving ? "Saving…" : saved ? "Saved!" : "Save Skills"}
      </button>
    </div>
  );
}

// ─── Project Editor ───────────────────────────────────────────────────────────

const PROJECT_CATEGORIES = ["defi", "nft", "dao", "infra", "tools", "other"] as const;

function ProjectEditor() {
  const { projects: initialProjects } = usePortfolio();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setProjects(initialProjects); }, [initialProjects]);

  async function save() {
    setSaving(true);
    await saveProjects(projects);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function add() {
    setProjects((p) => [...p, { id: Date.now().toString(), title: "", description: "", techStack: [], category: "other", featured: false, createdAt: new Date().toISOString() }]);
  }

  function update(id: string, field: keyof Project, value: unknown) {
    setProjects((p) => p.map((x) => x.id === id ? { ...x, [field]: value } : x));
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-white">Projects</h3>
        <button onClick={add} className="h-8 px-3 border border-[#333] text-gray-400 text-xs uppercase tracking-widest">+ Add</button>
      </div>
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="space-y-2 p-4 border border-[#1a1a1a]">
            <div className="flex gap-2">
              <input value={p.title} onChange={(e) => update(p.id, "title", e.target.value)}
                placeholder="Project title" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
              <button onClick={() => setProjects((prev) => prev.filter((x) => x.id !== p.id))}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-red-500 shrink-0">✕</button>
            </div>
            <textarea value={p.description} onChange={(e) => update(p.id, "description", e.target.value)}
              placeholder="Description" rows={2}
              className="w-full px-3 py-2 text-sm bg-[#111] border border-[#222] text-white outline-none resize-none" />
            <input value={p.techStack.join(", ")}
              onChange={(e) => update(p.id, "techStack", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
              placeholder="Tech stack (comma separated)"
              className="w-full h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
            <div className="flex gap-2">
              <select value={p.category} onChange={(e) => update(p.id, "category", e.target.value)}
                className="flex-1 h-9 px-2 text-xs bg-[#111] border border-[#222] text-white outline-none">
                {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input value={p.liveUrl ?? ""} onChange={(e) => update(p.id, "liveUrl", e.target.value)}
                placeholder="Live URL" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
            </div>
            <div className="flex items-center gap-3">
              <input value={p.githubUrl ?? ""} onChange={(e) => update(p.id, "githubUrl", e.target.value)}
                placeholder="GitHub URL" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
              <label className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
                <input type="checkbox" checked={p.featured} onChange={(e) => update(p.id, "featured", e.target.checked)} />
                Featured
              </label>
            </div>
          </div>
        ))}
      </div>
      <button onClick={save} disabled={saving}
        className="w-full h-11 bg-white text-black font-bold text-xs uppercase tracking-widest disabled:opacity-40">
        {saving ? "Saving…" : saved ? "Saved!" : "Save Projects"}
      </button>
    </div>
  );
}

// ─── Experience Editor ────────────────────────────────────────────────────────

const EXP_TYPES = ["fulltime", "contract", "freelance"] as const;

function ExperienceEditor() {
  const { experiences: initialExps } = usePortfolio();
  const [experiences, setExperiences] = useState<Experience[]>(initialExps);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setExperiences(initialExps); }, [initialExps]);

  async function save() {
    setSaving(true);
    await saveExperiences(experiences);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function add() {
    setExperiences((e) => [...e, { id: Date.now().toString(), company: "", role: "", period: "", description: "", highlights: [], type: "fulltime" }]);
  }

  function update(id: string, field: keyof Experience, value: unknown) {
    setExperiences((e) => e.map((x) => x.id === id ? { ...x, [field]: value } : x));
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-white">Experience</h3>
        <button onClick={add} className="h-8 px-3 border border-[#333] text-gray-400 text-xs uppercase tracking-widest">+ Add</button>
      </div>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="space-y-2 p-4 border border-[#1a1a1a]">
            <div className="flex gap-2">
              <input value={exp.company} onChange={(e) => update(exp.id, "company", e.target.value)}
                placeholder="Company" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
              <button onClick={() => setExperiences((e) => e.filter((x) => x.id !== exp.id))}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-red-500 shrink-0">✕</button>
            </div>
            <input value={exp.role} onChange={(e) => update(exp.id, "role", e.target.value)}
              placeholder="Role" className="w-full h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
            <div className="flex gap-2">
              <input value={exp.period} onChange={(e) => update(exp.id, "period", e.target.value)}
                placeholder="Period (e.g. 2022 — Present)" className="flex-1 h-9 px-3 text-sm bg-[#111] border border-[#222] text-white outline-none" />
              <select value={exp.type} onChange={(e) => update(exp.id, "type", e.target.value)}
                className="h-9 px-2 text-xs bg-[#111] border border-[#222] text-white outline-none">
                {EXP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <textarea value={exp.description} onChange={(e) => update(exp.id, "description", e.target.value)}
              placeholder="Description" rows={2}
              className="w-full px-3 py-2 text-sm bg-[#111] border border-[#222] text-white outline-none resize-none" />
            <textarea value={exp.highlights.join("\n")}
              onChange={(e) => update(exp.id, "highlights", e.target.value.split("\n").filter(Boolean))}
              placeholder="Highlights (one per line)" rows={3}
              className="w-full px-3 py-2 text-sm bg-[#111] border border-[#222] text-white outline-none resize-none" />
          </div>
        ))}
      </div>
      <button onClick={save} disabled={saving}
        className="w-full h-11 bg-white text-black font-bold text-xs uppercase tracking-widest disabled:opacity-40">
        {saving ? "Saving…" : saved ? "Saved!" : "Save Experience"}
      </button>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

function SettingsTab({ onClose }: { onClose: () => void }) {
  const { projects, skills, experiences } = usePortfolio();
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function resetAll() {
    setResetting(true);
    await resetAllPortfolioData();
    setResetting(false);
    onClose();
  }

  return (
    <div className="space-y-8 max-w-lg">
      <h3 className="text-base font-black text-white">Settings</h3>
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Data Overview</label>
        <div className="grid grid-cols-3 gap-3">
          {[["Projects", projects.length], ["Skills", skills.length], ["Roles", experiences.length]].map(([key, count]) => (
            <div key={key} className="p-3 border border-[#1a1a1a] text-center">
              <div className="text-xl font-black text-white">{count}</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-widest">{key}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 pt-4" style={{ borderTop: "1px solid #1a1a1a" }}>
        <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Reset All Data</label>
        {confirmReset ? (
          <div className="space-y-2">
            <p className="text-xs text-red-400">This will delete all your portfolio data and reset to defaults.</p>
            <div className="flex gap-2">
              <button onClick={resetAll} disabled={resetting}
                className="flex-1 h-9 bg-red-600 text-white text-xs uppercase tracking-widest font-bold disabled:opacity-40">
                {resetting ? "Resetting…" : "Yes, Reset Everything"}
              </button>
              <button onClick={() => setConfirmReset(false)}
                className="flex-1 h-9 border border-[#333] text-gray-400 text-xs uppercase tracking-widest">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)} className="w-full h-9 border border-red-900 text-red-600 text-xs uppercase tracking-widest">
            Reset All Data
          </button>
        )}
      </div>
    </div>
  );
}
