export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Lepton Software",
    role: "Software Intern — Backend",
    location: "Gurugram",
    period: "Jun 2025 — Aug 2025",
    highlights: [
      "Built a multi-agent AI assistant using LangGraph and Python so non-technical users could perform complex conversational data analysis.",
      "Engineered robust API integrations and orchestrated SQL queries to power dynamic, context-aware agent interactions.",
      "Developed a containerized backend service leveraging Elasticsearch on Docker/SSH servers for high-performance similarity search and automated geocoding.",
    ],
    stack: ["Python", "LangGraph", "Elasticsearch", "Docker", "SQL"],
  },
];
