import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
  Award,
  Trophy,
  Medal,
} from "lucide-react";
import AuroraBackground from "@/components/ui/AuroraBackground";
import GlassCard from "@/components/ui/GlassCard";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { achievements } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Résumé | Rohit Yadav",
  description: `View and download ${site.name}'s résumé — ${site.role}.`,
};

const DOWNLOAD_NAME = "Rohit_Yadav_resume_aug.pdf";

export default function ResumePage() {
  return (
    <>
      <AuroraBackground />
      <main className="relative z-10 mx-auto max-w-5xl px-5 py-24 sm:py-32">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-neon-cyan"
        >
          <ArrowLeft size={16} /> Back home
        </Link>

        {/* Page Header */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-8">
          <div>
            <p className="eyebrow mb-3">Résumé</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink-100 sm:text-5xl">
              {site.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-neon-cyan">
              {site.role}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-ink-300">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-neon-cyan" /> {site.location}
              </span>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-neon-cyan"
              >
                <Mail size={14} className="text-neon-cyan" /> {site.email}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={site.resumeUrl}
              download={DOWNLOAD_NAME}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition-all hover:shadow-glow-cyan"
            >
              <Download size={16} /> Download PDF
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink-100 transition-colors hover:text-neon-cyan"
            >
              <ExternalLink size={16} /> Open PDF in tab
            </a>
          </div>
        </div>

        {/* Digital HTML Résumé View */}
        <section className="mt-10 space-y-10">
          {/* Education */}
          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-neon-cyan">
                <GraduationCap size={20} />
              </span>
              <h2 className="font-display text-xl font-bold text-ink-100">
                Education
              </h2>
            </div>
            <div className="mt-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-base font-semibold text-ink-100">
                  {site.education.school}
                </h3>
                <p className="text-sm font-medium text-neon-cyan">
                  {site.education.degree}
                </p>
              </div>
              <div className="font-mono text-xs text-ink-300 text-left sm:text-right">
                <p>{site.education.period}</p>
                <p>{site.education.location}</p>
              </div>
            </div>
          </GlassCard>

          {/* Work Experience */}
          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-neon-cyan">
                <Briefcase size={20} />
              </span>
              <h2 className="font-display text-xl font-bold text-ink-100">
                Work Experience
              </h2>
            </div>
            <div className="mt-6 space-y-8">
              {experience.map((exp) => (
                <div key={exp.company} className="space-y-3">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-base font-bold text-ink-100">
                        {exp.company}{" "}
                        <span className="font-normal text-ink-300">
                          — {exp.role}
                        </span>
                      </h3>
                    </div>
                    <div className="font-mono text-xs text-ink-300">
                      {exp.period} · {exp.location}
                    </div>
                  </div>
                  <ul className="list-disc space-y-2 pl-5 text-xs text-ink-300 leading-relaxed sm:text-sm">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-neon-cyan"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Projects */}
          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-neon-cyan">
                <FolderGit2 size={20} />
              </span>
              <h2 className="font-display text-xl font-bold text-ink-100">
                Featured Projects
              </h2>
            </div>
            <div className="mt-6 space-y-8">
              {projects.map((proj) => (
                <div key={proj.title} className="space-y-3">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-ink-100">
                        {proj.title}
                      </h3>
                      {proj.org && (
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-ink-300">
                          {proj.org}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-neon-cyan">
                        {proj.metric.value} {proj.metric.label}
                      </span>
                      <span className="font-mono text-xs text-ink-300">
                        {proj.date}
                      </span>
                    </div>
                  </div>
                  <ul className="list-disc space-y-2 pl-5 text-xs text-ink-300 leading-relaxed sm:text-sm">
                    {proj.highlights.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-neon-cyan"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-neon-cyan hover:underline"
                      >
                        <ExternalLink size={12} /> {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Technical Skills */}
          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-neon-cyan">
                <Wrench size={20} />
              </span>
              <h2 className="font-display text-xl font-bold text-ink-100">
                Technical Skills & Coursework
              </h2>
            </div>
            <div className="mt-6 space-y-6">
              {skills.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-2.5 font-mono text-xs uppercase tracking-wider text-ink-500">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-ink-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Achievements & Certifications */}
          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-neon-cyan">
                <Award size={20} />
              </span>
              <h2 className="font-display text-xl font-bold text-ink-100">
                Achievements & Certifications
              </h2>
            </div>
            <div className="mt-6 space-y-6">
              {achievements.map((ach) => {
                const Icon =
                  ach.kind === "hackathon"
                    ? Trophy
                    : ach.kind === "milestone"
                      ? Medal
                      : Award;
                return (
                  <div
                    key={ach.title}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-neon-cyan">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-ink-100">
                          {ach.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-ink-300">
                          {ach.description}
                        </p>
                        <p className="mt-1 font-mono text-[11px] text-ink-500">
                          {ach.issuer}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2 pt-2 sm:pt-0">
                      {ach.verifyUrl && (
                        <a
                          href={ach.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan transition-colors hover:bg-neon-cyan/20"
                        >
                          <ExternalLink size={12} /> Verify Credential
                        </a>
                      )}
                      {ach.links?.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan transition-colors hover:bg-neon-cyan/20"
                        >
                          <ExternalLink size={12} /> {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </section>

        {/* Embedded PDF Viewer */}
        <div className="mt-14">
          <h2 className="mb-4 font-display text-xl font-bold text-ink-100">
            Original Résumé Document (PDF)
          </h2>
          <GlassCard className="overflow-hidden p-2 sm:p-3">
            <object
              data={`${site.resumeUrl}#view=FitH`}
              type="application/pdf"
              className="h-[80vh] min-h-[520px] w-full rounded-xl bg-white"
              aria-label={`${site.name} résumé`}
            >
              {/* Fallback for browsers that can't embed PDFs (often mobile) */}
              <div className="flex h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-sm text-ink-300">
                  Your browser does not render inline PDF documents.
                </p>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black"
                >
                  <ExternalLink size={16} /> Open PDF Resume
                </a>
              </div>
            </object>
          </GlassCard>
        </div>

        <p className="mt-6 text-center text-xs text-ink-500">
          Viewing {site.name}&apos;s verified résumé. Download available above.
        </p>
      </main>
    </>
  );
}
