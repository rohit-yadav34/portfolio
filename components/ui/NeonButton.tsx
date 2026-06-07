"use client";

import Link from "next/link";
import { type ReactNode } from "react";

interface NeonButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "glass";
  external?: boolean;
  download?: boolean;
  className?: string;
}

export default function NeonButton({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  className = "",
}: NeonButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

  const styles =
    variant === "primary"
      ? "bg-accent text-black shadow-glow-violet hover:shadow-glow-cyan hover:scale-[1.03]"
      : "glass text-ink-100 hover:border-neon-cyan/50 hover:text-white";

  const content = (
    <>
      {/* sheen sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download={download || undefined}
        className={`${base} ${styles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}
