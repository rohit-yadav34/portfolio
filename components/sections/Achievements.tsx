import { Award, Trophy, ExternalLink } from "lucide-react";
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

      <div className="grid gap-5 md:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon = a.kind === "milestone" ? Trophy : Award;
          return (
            <Reveal key={a.title} index={i}>
              <GlassCard interactive className="flex h-full flex-col p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-neon-cyan">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-base font-medium leading-snug text-ink-100">
                  {a.title}
                </h3>
                <div className="mt-auto pt-4">
                  <p className="font-mono text-xs text-ink-500">{a.issuer}</p>
                  {a.verifyUrl && (
                    <a
                      href={a.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-neon-cyan transition-colors hover:text-ink-100"
                    >
                      <ExternalLink size={12} /> Verify credential
                    </a>
                  )}
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
