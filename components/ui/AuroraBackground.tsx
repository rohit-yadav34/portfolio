"use client";

/**
 * Living aurora-mesh background. CSS-only, GPU-friendly (transform/opacity).
 * Three drifting neon blobs over the near-black canvas, plus grain + grid overlays.
 * Pauses automatically under prefers-reduced-motion (handled by globals.css).
 */
export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-900">
      <div className="absolute inset-0 grid-overlay opacity-60" />

      <div className="absolute -left-[10%] -top-[15%] h-[55vmax] w-[55vmax] rounded-full bg-neon-violet/30 blur-[120px] animate-aurora-drift" />
      <div className="absolute right-[-15%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-neon-cyan/25 blur-[130px] animate-aurora-drift-slow" />
      <div className="absolute bottom-[-20%] left-[20%] h-[48vmax] w-[48vmax] rounded-full bg-neon-fuchsia/20 blur-[140px] animate-aurora-drift" />

      {/* vignette to keep edges deep (theme-aware) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(var(--bg-900)/0.9)_100%)]" />
      <div className="grain" />
    </div>
  );
}
