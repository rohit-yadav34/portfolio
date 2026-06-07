import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've shipped."
        description="Real backend & AI work in production environments."
      />

      <div className="relative border-l border-white/10 pl-6 sm:pl-10">
        {experience.map((job, i) => (
          <Reveal key={job.company} index={i} className="relative mb-8 last:mb-0">
            {/* node marker */}
            <span className="absolute -left-[31px] top-7 grid h-4 w-4 place-items-center sm:-left-[47px]">
              <span className="h-3 w-3 rounded-full bg-accent shadow-glow-violet" />
            </span>

            <GlassCard className="p-7 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-ink-100">
                  {job.role}
                </h3>
                <span className="font-mono text-xs text-neon-cyan">{job.period}</span>
              </div>
              <p className="mt-1 text-sm text-ink-300">
                {job.company} · {job.location}
              </p>

              <ul className="mt-5 space-y-3">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-fuchsia" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/12 px-3 py-1 font-mono text-xs text-ink-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
