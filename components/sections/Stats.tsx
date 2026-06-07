"use client";

import { useEffect, useState } from "react";
import { Github, Code2, Star, GitFork } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "@/components/ui/Counter";
import { site } from "@/data/site";

interface LeetData {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}
interface GhData {
  repos: number;
  followers: number;
}

const LEET_FALLBACK: LeetData = { total: 550, easy: 220, medium: 270, hard: 60 };

export default function Stats() {
  const [leet, setLeet] = useState<LeetData | null>(null);
  const [gh, setGh] = useState<GhData | null>(null);
  const [leetLoading, setLeetLoading] = useState(true);
  const [ghLoading, setGhLoading] = useState(true);

  useEffect(() => {
    const lc = site.usernames.leetcode;
    fetch(`https://leetcode-stats-api.herokuapp.com/${lc}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (d && typeof d.totalSolved === "number") {
          setLeet({
            total: d.totalSolved,
            easy: d.easySolved ?? 0,
            medium: d.mediumSolved ?? 0,
            hard: d.hardSolved ?? 0,
          });
        } else throw new Error("bad");
      })
      .catch(() => setLeet(LEET_FALLBACK))
      .finally(() => setLeetLoading(false));

    fetch(`https://api.github.com/users/${site.usernames.github}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) =>
        setGh({ repos: d.public_repos ?? 0, followers: d.followers ?? 0 })
      )
      .catch(() => setGh({ repos: 0, followers: 0 }))
      .finally(() => setGhLoading(false));
  }, []);

  const lc = leet ?? LEET_FALLBACK;
  const diff = [
    { label: "Easy", value: lc.easy, color: "bg-neon-cyan" },
    { label: "Medium", value: lc.medium, color: "bg-neon-violet" },
    { label: "Hard", value: lc.hard, color: "bg-neon-fuchsia" },
  ];

  return (
    <section id="stats" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="By the Numbers"
        title="Consistency, measured."
        description="Live from LeetCode and GitHub."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* LeetCode */}
        <Reveal>
          <GlassCard className="h-full p-8">
            <div className="flex items-center gap-3">
              <Code2 className="text-neon-cyan" size={20} />
              <h3 className="font-display text-lg font-semibold text-ink-100">LeetCode</h3>
              <a
                href={site.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto font-mono text-xs text-ink-500 hover:text-neon-cyan"
              >
                @{site.usernames.leetcode}
              </a>
            </div>

            {leetLoading ? (
              <Skeleton />
            ) : (
              <>
                <div className="mt-6 flex items-end gap-2">
                  <Counter
                    to={lc.total}
                    suffix="+"
                    className="font-mono text-5xl font-semibold text-gradient"
                  />
                  <span className="mb-2 text-sm text-ink-500">problems solved</span>
                </div>
                <div className="mt-6 space-y-3">
                  {diff.map((d) => (
                    <div key={d.label}>
                      <div className="mb-1 flex justify-between text-xs text-ink-300">
                        <span>{d.label}</span>
                        <span className="font-mono">{d.value}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                        <div
                          className={`h-full ${d.color}`}
                          style={{ width: `${Math.min((d.value / lc.total) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </GlassCard>
        </Reveal>

        {/* GitHub */}
        <Reveal index={1}>
          <GlassCard className="h-full p-8">
            <div className="flex items-center gap-3">
              <Github className="text-neon-violet" size={20} />
              <h3 className="font-display text-lg font-semibold text-ink-100">GitHub</h3>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto font-mono text-xs text-ink-500 hover:text-neon-cyan"
              >
                @{site.usernames.github}
              </a>
            </div>

            {ghLoading ? (
              <Skeleton />
            ) : (
              <>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/4 p-5">
                    <Star className="text-neon-cyan" size={18} />
                    <Counter
                      to={gh?.repos ?? 0}
                      className="mt-2 block font-mono text-3xl font-semibold text-ink-100"
                    />
                    <span className="text-xs text-ink-500">public repos</span>
                  </div>
                  <div className="rounded-2xl bg-white/4 p-5">
                    <GitFork className="text-neon-fuchsia" size={18} />
                    <Counter
                      to={gh?.followers ?? 0}
                      className="mt-2 block font-mono text-3xl font-semibold text-ink-100"
                    />
                    <span className="text-xs text-ink-500">followers</span>
                  </div>
                </div>
                {/* contribution graph (no-auth image) */}
                <img
                  src={`https://ghchart.rshah.org/8b5cf6/${site.usernames.github}`}
                  alt="GitHub contribution graph"
                  loading="lazy"
                  className="mt-6 w-full rounded-xl opacity-90"
                />
              </>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="mt-6 animate-pulse space-y-4">
      <div className="h-12 w-40 rounded-lg bg-white/8" />
      <div className="h-2 w-full rounded-full bg-white/8" />
      <div className="h-2 w-5/6 rounded-full bg-white/8" />
      <div className="h-2 w-2/3 rounded-full bg-white/8" />
    </div>
  );
}
