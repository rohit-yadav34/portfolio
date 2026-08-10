import { Award, Trophy, Medal, ExternalLink } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { achievements } from "@/data/achievements";

export default function Achievements() {
  return (
    <section
      id="certificates"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32"
    >
      <SectionHeading eyebrow="Recognition" title="Certifications & milestones." />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon =
            a.kind === "hackathon"
              ? Trophy
              : a.kind === "milestone"
                ? Medal
                : Award;
          return (
            <Reveal key={a.title} index={i}>
              <GlassCard interactive className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-neon-cyan">
                    <Icon size={22} />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] font-medium capitalize text-ink-300">
                    {a.kind}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold leading-snug text-ink-100">
                  {a.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-300">
                  {a.description}
                </p>
                <div className="mt-auto pt-5">
                  <p className="font-mono text-xs text-ink-500">{a.issuer}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {a.verifyUrl && (
                      <a
                        href={a.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-neon-cyan transition-colors hover:text-ink-100"
                      >
                        <ExternalLink size={12} /> Verify credential
                      </a>
                    )}
                    {a.links?.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-neon-cyan transition-colors hover:text-ink-100"
                      >
                        <ExternalLink size={12} /> {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
