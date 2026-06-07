"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { site } from "@/data/site";

interface H1ComponentProps {
  name: string;
  y_initialValue: number;
}

const H1_Component: FC<H1ComponentProps> = ({ name, y_initialValue }) => {
  return (
    <motion.h1
      initial={{ y: y_initialValue, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="font-display text-4xl font-semibold text-ink-100 sm:text-6xl"
    >
      {name}
    </motion.h1>
  );
};

// Minimum time the intro is shown (so it never just flashes), and a hard
// fallback in case the 3D scene is slow / unavailable (e.g. offline, mobile).
const MIN_DURATION = 1600;
const MAX_DURATION = 8000;

export const Preloader = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [minPassed, setMinPassed] = useState(false);

  // Wait for the Hero's interactive 3D to finish loading.
  useEffect(() => {
    const w = window as { __hero3dLoaded?: boolean };
    if (w.__hero3dLoaded) setLoaded(true);

    const onLoaded = () => setLoaded(true);
    window.addEventListener("hero-3d-loaded", onLoaded);

    const minTimer = setTimeout(() => setMinPassed(true), MIN_DURATION);
    const maxTimer = setTimeout(() => {
      setLoaded(true);
      setMinPassed(true);
    }, MAX_DURATION);

    return () => {
      window.removeEventListener("hero-3d-loaded", onLoaded);
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  // Hide only once the 3D has loaded AND the intro has played its minimum.
  useEffect(() => {
    if (loaded && minPassed) setShowPreloader(false);
  }, [loaded, minPassed]);

  // Lock scrolling while the preloader is up for a smooth reveal.
  useEffect(() => {
    document.body.style.overflow = showPreloader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          className="fixed inset-0 z-[100] h-screen w-full overflow-hidden bg-bg-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* ambient theme glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-violet/15 blur-[130px]" />
            <div className="absolute left-[60%] top-[40%] h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/12 blur-[120px]" />
          </div>

          <div className="fixed flex h-full w-full items-center justify-center">
            <motion.div
              className="container mx-auto flex items-center justify-center tracking-widest"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <H1_Component name={first} y_initialValue={100} />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-gradient mx-3 text-4xl font-semibold sm:text-6xl"
              >
                /
              </motion.span>
              <H1_Component name={last} y_initialValue={-100} />
            </motion.div>

            {/* loading hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-16 flex items-center gap-3"
            >
              <span className="loader !h-5 !w-5 !border-2" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-500">
                Loading experience
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
