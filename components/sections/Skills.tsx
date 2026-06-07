"use client";

import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SkillCard, type SkillIcon } from "@/components/ui/SkillCard";
import { skills } from "@/data/skills";
import { skillIcon } from "@/data/skill-icons";

interface LogoProps {
  title: string;
  logoComponent: SkillIcon;
  color: string;
}

interface MarqueeProps {
  skills: LogoProps[];
  direction: "left" | "right";
}

const Marquee: FC<MarqueeProps> = ({ skills, direction }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  useEffect(() => {
    const measureWidth = () => {
      if (marqueeRef.current) {
        setMarqueeWidth(marqueeRef.current.scrollWidth / 2);
      }
    };

    measureWidth();
    window.addEventListener("resize", measureWidth);

    return () => window.removeEventListener("resize", measureWidth);
  }, [skills]);

  const speedFactor = 50;
  const animationDuration = marqueeWidth > 0 ? marqueeWidth / speedFactor : 0;

  const animateX =
    direction === "right" ? [0, -marqueeWidth] : [-marqueeWidth, 0];

  return (
    <div className="my-2">
      <div className="relative overflow-hidden py-2">
        <motion.div
          ref={marqueeRef}
          className="flex flex-row gap-8 whitespace-nowrap"
          animate={marqueeWidth > 0 ? { x: animateX } : {}}
          transition={{
            repeat: Infinity,
            duration: animationDuration,
            ease: "linear",
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <SkillCard
              key={`${skill.title}-${index}`}
              title={skill.title}
              color={skill.color || "#ffffff"}
              Icon={skill.logoComponent}
              className="flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Skills() {
  // Build marquee rows from the skills data + icon map.
  const rows = skills.map((group) => ({
    title: group.label,
    data: group.items.map<LogoProps>((item) => {
      const { Icon, color } = skillIcon(item);
      return { title: item, logoComponent: Icon, color };
    }),
  }));

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Toolbox"
        title="The stack I reach for."
        description="From low-level systems to agent orchestration and cloud."
      />

      <Reveal className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-bg-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-bg-900 to-transparent" />

        {rows.map((category, index) => (
          <Marquee
            key={category.title}
            skills={category.data}
            direction={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      </Reveal>
    </section>
  );
}
