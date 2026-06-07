"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Applies the aceternity container-scroll-animation effect (3D rotate-in on
 * scroll) to any block of content. Used to give every section a cohesive
 * scroll-driven reveal as it enters the viewport.
 */
export default function SectionScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

  return (
    <div ref={ref} style={{ perspective: "1200px" }} className={className}>
      {/*
        No `transform-style: preserve-3d` here on purpose: it flattens
        `backdrop-filter` children (our .glass cards) into a separate plane,
        which makes them ignore this rotateX and breaks their entrance
        animations. A single flattened layer tilts correctly via the parent
        perspective and carries the glass cards with it.
      */}
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          opacity,
          transformOrigin: "center top",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
