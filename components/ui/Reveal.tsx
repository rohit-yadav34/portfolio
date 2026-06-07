"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const spring = { type: "spring", stiffness: 120, damping: 18 } as const;

/** Scroll-triggered fade-up. `index` staggers siblings in a 60ms wave. */
export default function Reveal({
  children,
  index = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...spring, delay: index * 0.06 }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
