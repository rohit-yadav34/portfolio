import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { SiCodechef } from "react-icons/si";
import { LeetCodeLogo } from "@/components/ui/skill-logos";
import { site, navLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-5 pb-10">
      <div className="glass flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.avatar}
            alt={site.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15"
          />
          <span className="text-sm text-ink-300">
            {site.name} · Built with Next.js + Framer Motion
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-4">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink-500 hover:text-ink-100">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3">
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
              className="text-ink-500 transition-colors hover:text-neon-cyan"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-5 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
