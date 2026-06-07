import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, PenLine } from "lucide-react";
import AuroraBackground from "@/components/ui/AuroraBackground";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on backend engineering, AI agents, and systems by Rohit Yadav.",
};

/**
 * Blog index — scaffolded with an empty state.
 * Drop MDX posts into /content and wire a loader here, or add entries to `posts`.
 */
const posts: { slug: string; title: string; date: string; excerpt: string }[] = [];

export default function Blog() {
  return (
    <>
      <AuroraBackground />
      <main className="relative z-10 mx-auto max-w-3xl px-5 py-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-neon-cyan"
        >
          <ArrowLeft size={16} /> Back home
        </Link>

        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink-100 sm:text-5xl">
          Writing
        </h1>
        <p className="mt-3 text-ink-300">Notes on systems, agents, and the things I build.</p>

        {posts.length === 0 ? (
          <GlassCard className="mt-12 flex flex-col items-center gap-4 p-14 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-neon-cyan">
              <PenLine size={26} />
            </span>
            <h2 className="font-display text-xl text-ink-100">Writing soon.</h2>
            <p className="max-w-sm text-sm text-ink-300">
              First posts on MCP servers, multi-agent orchestration, and RAG pipelines are on the way.
            </p>
          </GlassCard>
        ) : (
          <ul className="mt-12 space-y-5">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`}>
                  <GlassCard interactive className="p-7">
                    <p className="font-mono text-xs text-neon-cyan">{p.date}</p>
                    <h3 className="mt-2 font-display text-xl text-ink-100">{p.title}</h3>
                    <p className="mt-2 text-sm text-ink-300">{p.excerpt}</p>
                  </GlassCard>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
