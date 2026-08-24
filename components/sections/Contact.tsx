"use client";

import { useRef, useState } from "react";
import { Mail, Github, Linkedin, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { SiCodechef } from "react-icons/si";
import { LeetCodeLogo } from "@/components/ui/skill-logos";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SlideButton from "@/components/ui/slide-button";
import { site } from "@/data/site";

type Status = "idle" | "success";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  // Triggered by the slide-to-send button.
  async function submit() {
    const form = formRef.current;
    if (!form) throw new Error("No form");
    if (!form.reportValidity()) {
      setError("Please fill in your name, valid email, and message.");
      throw new Error("Invalid");
    }

    const data = new FormData(form);
    // honeypot check
    if (data.get("company")) return;

    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    setFormData({ name, email, message });
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = body.error || "Could not send. Try emailing directly.";
        setError(msg);
        throw new Error(msg);
      }

      setStatus("success");
      form.reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message.";
      if (!error) setError(msg);
      throw err;
    }
  }

  // Ultra-clear contrast fields matching all 3 theme color modes
  const field =
    "w-full rounded-xl border border-[var(--glass-border)] bg-[rgba(var(--bg-800),0.85)] px-4 py-3 text-sm text-[rgb(var(--text-100))] placeholder:text-[rgb(var(--text-500))] outline-none transition-all focus:border-[rgb(var(--neon-cyan))] focus:ring-2 focus:ring-[rgb(var(--neon-cyan))]/25 focus:bg-[rgb(var(--bg-800))] shadow-inner";

  const mailtoLink = `mailto:${site.email}?subject=${encodeURIComponent(
    formData.name ? `Message from ${formData.name}` : "Portfolio Inquiry"
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\n\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's build something."
        description="Open to internships, backend / AI roles, and interesting collaborations."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <GlassCard className="flex h-full flex-col justify-between p-8">
            <div>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 text-ink-100 transition-colors hover:text-neon-cyan"
              >
                <Mail size={20} className="text-neon-cyan" />
                <span className="text-sm font-medium">{site.email}</span>
              </a>
              <p className="mt-6 text-sm leading-relaxed text-ink-300">
                Prefer a quick DM? I'm active on these platforms and usually reply within 24 hours.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              {[
                { icon: Github, href: site.socials.github, label: "GitHub" },
                { icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
                { icon: LeetCodeLogo, href: site.socials.leetcode, label: "LeetCode" },
                { icon: SiCodechef, href: site.socials.codechef, label: "CodeChef" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-ink-300 transition-all hover:scale-110 hover:text-neon-cyan hover:shadow-glow-cyan"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal index={1}>
          <GlassCard className="p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 size={48} className="text-neon-cyan" />
                <h3 className="mt-4 font-display text-xl text-ink-100">Message sent!</h3>
                <p className="mt-2 text-sm text-ink-300">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-medium text-neon-cyan hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px]"
                  aria-hidden
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-ink-300">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your Name"
                      className={field}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-300">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className={field}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-ink-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the role, project, or collaboration…"
                    className={`${field} resize-none`}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                    <p className="flex items-center gap-2 font-medium">
                      <AlertCircle size={15} className="shrink-0" /> {error}
                    </p>
                    <a
                      href={mailtoLink}
                      className="mt-2 inline-flex items-center gap-1.5 font-medium text-neon-cyan hover:underline"
                    >
                      <ExternalLink size={13} /> Open in your email client instead
                    </a>
                  </div>
                )}

                <div className="flex justify-center pt-2">
                  <SlideButton label="Slide to send" onComplete={submit} />
                </div>
              </form>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
