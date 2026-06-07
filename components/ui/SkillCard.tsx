"use client";

import { motion } from "framer-motion";
import type { ComponentType, CSSProperties } from "react";

export type SkillIcon = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

export function SkillCard({
  title,
  Icon,
  color,
  className = "",
}: {
  title: string;
  Icon: SkillIcon;
  color: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`${className} group flex h-fit w-fit flex-row items-center justify-center gap-3 rounded-full border border-white/12 bg-white/4 px-3.5 py-1.5 grayscale-[90%] transition-all duration-300 hover:grayscale-0`}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center"
        whileHover={{ rotate: 15, scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        <Icon
          className="h-5 w-5 transition-colors duration-300"
          style={{ color }}
        />
      </motion.div>
      <motion.small
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="text-sm font-semibold text-ink-300 group-hover:text-ink-100"
      >
        {title}
      </motion.small>
    </motion.div>
  );
}
