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
    company: "Accenture",
    role: "AEH Intern",
    location: "Mumbai",
    period: "Jun 2026 — Jul 2026",
    highlights: [
      "Built custom AI/ML and cloud-integrated solutions for real-world client problems in a fast-moving delivery environment.",
      "Gained hands-on enterprise exposure across Microsoft Azure, AWS Bedrock, and Google Cloud while collaborating on production-oriented systems.",
      "Worked across rapidly changing requirements and delivery constraints, turning ambiguous problem statements into practical implementations.",
    ],
    stack: ["Azure", "AWS Bedrock", "Google Cloud", "Python", "AI/ML"],
  },
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
