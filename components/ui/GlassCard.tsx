"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Adds hover lift + neon glow + pointer tilt. */
  interactive?: boolean;
  strong?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  interactive = false,
  strong = false,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -6, scale: 1.015 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className={[
        "glass group",
        strong ? "bg-[var(--glass-bg-strong)]" : "",
        interactive
          ? "transition-shadow duration-300 hover:shadow-glow-violet hover:border-neon-violet/40"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </motion.div>
  );
}
