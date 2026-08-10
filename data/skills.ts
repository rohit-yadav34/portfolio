export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "C / C++", "Java", "SQL (Postgres)", "HTML / CSS"],
  },
  {
    label: "Concepts & Architecture",
    items: [
      "DSA",
      "Machine Learning",
      "Deep Learning",
      "RESTful APIs",
      "Microservices",
      "Observability",
      "Graph RAG",
      "GeoJSON",
      "PostGIS",
      "JSON-RPC",
    ],
  },
  {
    label: "Frameworks & Tools",
    items: [
      "FastAPI",
      "LangGraph",
      "FastMCP",
      "Tree-sitter",
      "NetworkX",
      "LangChain",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Pandas",
      "TensorFlow",
      "Keras",
      "OpenCV",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "Google Cloud Platform",
      "Docker",
      "Git",
      "GitHub",
      "Vercel",
      "Postman",
      "Elasticsearch",
      "Supabase",
      "HF Spaces",
    ],
  },
  {
    label: "Coursework",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Artificial Intelligence",
    ],
  },
];
