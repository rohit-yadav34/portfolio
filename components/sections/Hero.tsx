"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, FileDown } from "lucide-react";
import { SiCodechef } from "react-icons/si";
import { LeetCodeLogo } from "@/components/ui/skill-logos";
import NeonButton from "@/components/ui/NeonButton";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { site } from "@/data/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % site.roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block">
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-gradient font-display"
      >
        {site.roles[i]}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center px-5 pt-28">
      {/* moving spotlight + cursor-tracking 3D robot */}
      <Spotlight className="-top-20 left-10 md:left-1/3" fill="white" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 lg:block">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="pointer-events-auto h-full w-full"
          onLoad={() => {
            if (typeof window !== "undefined") {
              (window as { __hero3dLoaded?: boolean }).__hero3dLoaded = true;
              window.dispatchEvent(new Event("hero-3d-loaded"));
            }
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <motion.p variants={item} className="eyebrow mb-5">
          Backend × AI Engineer · NIT Kurukshetra
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-[clamp(2.75rem,8vw,5.75rem)] font-bold leading-[0.98] tracking-tight text-ink-100"
        >
          Rohit Yadav
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-3 font-display text-[clamp(1.5rem,4vw,2.75rem)] font-medium text-ink-300"
        >
          I build <RotatingRole />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg"
        >
          {site.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <NeonButton href="#projects" variant="primary">
            View Projects
          </NeonButton>
          <NeonButton href="/resume" variant="glass">
            <FileDown size={16} /> View Résumé
          </NeonButton>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex items-center gap-3">
          {[
            { icon: Github, href: site.socials.github, label: "GitHub" },
            { icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
            { icon: LeetCodeLogo, href: site.socials.leetcode, label: "LeetCode" },
            { icon: SiCodechef, href: site.socials.codechef, label: "CodeChef" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass grid h-11 w-11 place-items-center rounded-full text-ink-300 transition-all duration-300 hover:scale-110 hover:text-neon-cyan hover:shadow-glow-cyan"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-ink-500 lg:block"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
