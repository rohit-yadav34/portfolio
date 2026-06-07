"use client";

import { useRef, useState } from "react";
import { Mail, Github, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";
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
  const formRef = useRef<HTMLFormElement>(null);

  // Triggered by the slide-to-send button. Throws so the button shows its
  // error state; resolves on success so it shows the check.
  async function submit() {
    const form = formRef.current;
    if (!form) throw new Error("No form");
    if (!form.reportValidity()) throw new Error("Invalid");

    const data = new FormData(form);
    // honeypot
    if (data.get("company")) return;

    setError("");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const msg = body.error || "Something went wrong.";
      setError(msg);
      throw new Error(msg);
    }
    setStatus("success");
    form.reset();
  }

  const field =
    "w-full rounded-xl border border-white/12 bg-white/4 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 outline-none transition-all focus:border-neon-cyan/60 focus:ring-2 focus:ring-neon-cyan/20";

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
                <span className="text-sm">{site.email}</span>
              </a>
              <p className="mt-6 text-sm leading-relaxed text-ink-300">
                Prefer a quick DM? I'm active on these. I usually reply within a day.
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
                  className="mt-6 text-sm text-neon-cyan hover:underline"
                >
                  Send another
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
                    <label htmlFor="name" className="mb-1.5 block text-xs text-ink-300">
                      Name
                    </label>
                    <input id="name" name="name" required placeholder="Jane Doe" className={field} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs text-ink-300">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className={field}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs text-ink-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the role or idea…"
                    className={`${field} resize-none`}
                  />
                </div>

                {error && (
                  <p className="flex items-center gap-2 text-sm text-neon-fuchsia">
                    <AlertCircle size={16} /> {error}
                  </p>
                )}

                <div className="flex justify-center pt-1">
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
