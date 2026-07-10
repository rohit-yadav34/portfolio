import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import AuroraBackground from "@/components/ui/AuroraBackground";
import GlassCard from "@/components/ui/GlassCard";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `View and download ${site.name}'s résumé — ${site.role}.`,
};

const DOWNLOAD_NAME = "Rohit_Yadav_resume_july_2026.pdf";

export default function ResumePage() {
  return (
    <>
      <AuroraBackground />
      <main className="relative z-10 mx-auto max-w-4xl px-5 py-28 sm:py-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-neon-cyan"
        >
          <ArrowLeft size={16} /> Back home
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-3">Résumé</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink-100 sm:text-5xl">
              {site.name}
            </h1>
            <p className="mt-2 text-ink-300">
              {site.role} · {site.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={site.resumeUrl}
              download={DOWNLOAD_NAME}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition-all hover:shadow-glow-cyan"
            >
              <Download size={16} /> Download
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink-100 transition-colors hover:text-neon-cyan"
            >
              <ExternalLink size={16} /> Open in new tab
            </a>
          </div>
        </div>

        {/* On-site viewer */}
        <GlassCard className="mt-8 overflow-hidden p-2 sm:p-3">
          <object
            data={`${site.resumeUrl}#view=FitH`}
            type="application/pdf"
            className="h-[80vh] min-h-[520px] w-full rounded-xl bg-white"
            aria-label={`${site.name} résumé`}
          >
            {/* Fallback for browsers that can't embed PDFs (often mobile) */}
            <div className="flex h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
              <p className="text-sm text-ink-300">
                Your browser can&apos;t display the PDF inline.
              </p>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black"
              >
                <ExternalLink size={16} /> Open the résumé
              </a>
            </div>
          </object>
        </GlassCard>

        <p className="mt-4 text-center text-xs text-ink-500">
          Viewing inline. Use{" "}
          <span className="text-ink-300">Download</span> to save a copy.
        </p>
      </main>
    </>
  );
}
