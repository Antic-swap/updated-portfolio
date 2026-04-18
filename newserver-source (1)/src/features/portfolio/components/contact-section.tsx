"use client";

import { useState } from "react";
import { usePortfolio } from "@/features/portfolio/portfolio-context";
import type { ContactMessage } from "@/features/portfolio/types";

type Status = "idle" | "sending" | "sent";

export function ContactSection({ desktop }: { desktop?: boolean }) {
  const { owner } = usePortfolio();
  const d = owner;
  const [form, setForm] = useState<ContactMessage>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  }

  const socials = [
    { label: "GitHub",    href: d.github,    display: d.github?.replace("https://", "").replace("http://", "") ?? "" },
    { label: "Twitter",   href: d.twitter,   display: d.twitter?.replace("https://twitter.com/", "@").replace("https://x.com/", "@") ?? "" },
    { label: "Farcaster", href: d.farcaster, display: d.farcaster?.replace("https://warpcast.com/", "@") ?? "" },
    { label: "Email",     href: `mailto:${d.email}`, display: d.email },
  ].filter((s) => s.href && s.href !== "mailto:");

  const SocialsBlock = () => (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-mono uppercase tracking-widest mb-2" style={{ color: "var(--pt-fg3)" }}>Get in touch</div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--pt-fg2)" }}>
          Building something? Want to collaborate? Or just want to say hello?
        </p>
      </div>
      <div className="space-y-3 pt-2">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>{s.label}</span>
            <span className="text-sm group-hover:underline underline-offset-2" style={{ color: "var(--pt-fg)" }}>{s.display}</span>
          </a>
        ))}
      </div>
    </div>
  );

  const FormBlock = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "sent" ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3"
          style={{ border: "1px solid var(--pt-border)", borderRadius: "var(--pt-radius, 0px)" }}>
          <span className="text-2xl" style={{ color: "var(--pt-accent)" }}>◆</span>
          <p className="text-base font-bold" style={{ color: "var(--pt-fg)" }}>Message Sent</p>
          <p className="text-sm" style={{ color: "var(--pt-fg3)" }}>I&apos;ll get back to you shortly.</p>
        </div>
      ) : (
        <>
          {[
            { key: "name", label: "Name", type: "text", placeholder: "Your name" },
            { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
          ].map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>{field.label}</label>
              <input type={field.type} value={form[field.key as keyof ContactMessage]}
                onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                placeholder={field.placeholder} required
                className="w-full h-11 px-3 text-sm outline-none bg-transparent"
                style={{ border: "1px solid var(--pt-border)", borderRadius: "var(--pt-radius, 0px)", color: "var(--pt-fg)", caretColor: "var(--pt-accent)" }} />
            </div>
          ))}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>Message</label>
            <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="What's on your mind?" required rows={4}
              className="w-full px-3 py-3 text-sm outline-none bg-transparent resize-none"
              style={{ border: "1px solid var(--pt-border)", borderRadius: "var(--pt-radius, 0px)", color: "var(--pt-fg)", caretColor: "var(--pt-accent)" }} />
          </div>
          <button type="submit" disabled={status === "sending"}
            className="w-full h-11 font-bold text-xs uppercase tracking-widest"
            style={{ backgroundColor: "var(--pt-btn-bg)", color: "var(--pt-btn-fg)", borderRadius: "var(--pt-btn-radius, 0px)", opacity: status === "sending" ? 0.4 : 1 }}>
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
        </>
      )}
    </form>
  );

  if (desktop) {
    return (
      <div className="space-y-8">
        <div>
          <div className="text-sm font-mono mb-3 uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>Contact</div>
          <h2 className="text-3xl font-black leading-tight" style={{ color: "var(--pt-fg)" }}>Say Hello</h2>
          <div className="mt-3 h-px w-12" style={{ backgroundColor: "var(--pt-accent)" }} />
        </div>
        <div className="grid grid-cols-2 gap-12">
          <SocialsBlock />
          <FormBlock />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 space-y-10" style={{ backgroundColor: "var(--pt-bg)" }}>
      <div>
        <div className="text-sm font-mono mb-3 uppercase tracking-widest" style={{ color: "var(--pt-fg3)" }}>05 / Contact</div>
        <h2 className="text-2xl font-black leading-tight" style={{ color: "var(--pt-fg)" }}>Say Hello</h2>
        <div className="mt-3 h-px w-12" style={{ backgroundColor: "var(--pt-accent)" }} />
      </div>
      <SocialsBlock />
      <div className="h-px" style={{ backgroundColor: "var(--pt-border)" }} />
      <FormBlock />
    </div>
  );
}
