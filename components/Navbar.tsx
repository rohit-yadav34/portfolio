"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Briefcase, FolderGit2, Wrench, Award, Mail } from "lucide-react";
import { NavBar, type NavItem } from "@/components/ui/tubelight-navbar";
import { ThemeSwitcher } from "@/components/ui/apple-liquid-glass-switcher";
import { navLinks, site } from "@/data/site";

type Theme = "light" | "dark" | "dim";

const ICONS: Record<string, NavItem["icon"]> = {
  "#about": User,
  "#experience": Briefcase,
  "#projects": FolderGit2,
  "#skills": Wrench,
  "#certificates": Award,
  "#contact": Mail,
};

const items: NavItem[] = navLinks.map((l) => ({
  name: l.label,
  url: l.href,
  icon: ICONS[l.href] ?? User,
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(items[0]?.name ?? "");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const link = navLinks.find((l) => l.href === `#${e.target.id}`);
            if (link) setActive(link.label);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const handleTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5">
        {/* logo */}
        <Link href="#top" className="group flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.avatar}
            alt={site.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden font-display text-sm font-medium tracking-wide text-ink-100 sm:block">
            Rohit Yadav
          </span>
        </Link>

        {/* tubelight navbar — floats at the bottom on mobile, inline on desktop */}
        <NavBar
          items={items}
          active={active}
          className="fixed inset-x-0 bottom-5 z-50 px-4 lg:static lg:inset-x-auto lg:bottom-auto lg:px-0"
        />

        {/* liquid-glass theme switcher */}
        <div className="shrink-0">
          <ThemeSwitcher value={theme} onValueChange={handleTheme} />
        </div>
      </nav>
    </header>
  );
}
