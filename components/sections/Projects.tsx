"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects that move metrics."
        description="Multi-agent systems, MCP servers, and retrieval pipelines — with the numbers behind them."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.title}
            index={i}
            className={p.span === 2 ? "md:col-span-2" : ""}
          >
            <GlassCard interactive className="flex h-full flex-col p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-100 sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-neon-cyan">{p.date}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-2xl font-semibold text-gradient">
                    {p.metric.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-ink-500">
                    {p.metric.label}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-300">{p.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[11px] text-ink-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 pt-2">
                <button
                  onClick={() => setActive(p)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-ink-100 transition-colors hover:text-neon-cyan"
                >
                  Case study <ArrowUpRight size={15} />
                </button>
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-ink-300 transition-colors hover:text-neon-cyan"
                  >
                    <Github size={15} /> {l.label}
                  </a>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      {/* Case-study modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[85vh] w-full max-w-2xl overflow-y-auto p-8 sm:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink-100">
                    {active.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-neon-cyan">{active.date}</p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-300 transition-colors hover:bg-white/10 hover:text-ink-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 inline-flex items-baseline gap-2 rounded-xl bg-white/6 px-4 py-2">
                <span className="font-mono text-2xl font-semibold text-gradient">
                  {active.metric.value}
                </span>
                <span className="text-xs uppercase tracking-wide text-ink-500">
                  {active.metric.label}
                </span>
              </div>

              <ul className="mt-6 space-y-4">
                {active.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {active.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/12 px-3 py-1 font-mono text-xs text-ink-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex gap-4">
                {active.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-ink-100 transition-colors hover:text-neon-cyan"
                  >
                    <Github size={16} /> {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
