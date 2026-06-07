import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export default function About() {
  const facts = [
    { icon: GraduationCap, label: site.education.school, sub: site.education.period },
    { icon: MapPin, label: site.location, sub: "Open to roles & internships" },
    { icon: Sparkles, label: "Backend + Applied AI", sub: "Agents · RAG · Systems" },
  ];

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="About" title="Engineer of systems, not just features." />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <GlassCard className="h-full p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-ink-300">{site.about}</p>
            <p className="mt-5 text-base leading-relaxed text-ink-500">
              {site.education.degree} · {site.education.school}.
            </p>
          </GlassCard>
        </Reveal>

        <div className="grid gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} index={i}>
              <GlassCard interactive className="flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/8 text-neon-cyan">
                  <f.icon size={20} />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink-100">{f.label}</span>
                  <span className="block text-xs text-ink-500">{f.sub}</span>
                </span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
