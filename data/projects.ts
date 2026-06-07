export interface Project {
  title: string;
  date: string;
  summary: string;
  metric: { value: string; label: string };
  stack: string[];
  highlights: string[];
  links: { label: string; href: string }[];
  /** Employer/internship this was built under (private codebase, no public repo). */
  org?: string;
  /** Layout span in the bento grid (1 = standard, 2 = wide). */
  span: 1 | 2;
}

export const projects: Project[] = [
  {
    title: "LegacyGraph-MCP Server",
    date: "March 2026",
    summary:
      "An MCP server that parses legacy C++ into a queryable knowledge graph for AI agents.",
    metric: { value: "30x", label: "faster AST builds" },
    stack: ["Python", "FastMCP", "Tree-sitter", "NetworkX", "Smithery", "Docker"],
    highlights: [
      "Parses legacy C++ into a queryable knowledge graph — processing 20k+ RPC calls and 10k+ agent sessions globally via Smithery observability.",
      "Optimized the ingestion pipeline with multi-core distributed processing and JSON caching, accelerating AST builds 30x — 67,000 files and 1.15M+ nodes in under 10 minutes.",
      "Containerized with multi-stage Docker builds for hybrid architectures: local stdio for Claude Desktop and streamable-http cloud deploys on Hugging Face Spaces.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/rohit-yadav34/LegacyGraph-MCP" }],
    span: 2,
  },
  {
    title: "DemystDocs.AI",
    date: "Sept 2025",
    summary:
      "End-to-end document-intelligence platform combining OCR, RAG, and vector search.",
    metric: { value: "OCR + RAG", label: "doc intelligence" },
    stack: ["Python", "FastAPI", "React", "Supabase", "GCP"],
    highlights: [
      "Built an end-to-end document-intelligence platform integrating OCR, RAG, and vector search for scalable document-processing workflows.",
      "Designed and delivered high-performance RESTful APIs deployed on GCP for low-latency interaction with large datasets.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/rohit-yadav34/DemystDocs.AI" }],
    span: 1,
  },
  {
    title: "AI Assistant — SmartMarket.ai",
    date: "June 2025",
    summary:
      "Autonomous multi-agent system orchestrating multi-step reasoning across distributed APIs and databases.",
    metric: { value: "Multi-agent", label: "autonomous reasoning" },
    stack: ["Python", "LangGraph", "LangSmith", "FastAPI", "SQL", "Docker"],
    highlights: [
      "Designed an autonomous multi-agent system using LangGraph to orchestrate complex multi-step reasoning across distributed APIs and databases.",
      "Improved data accessibility and business decision-making via an adaptive, agent-driven framework for conversational analysis.",
    ],
    links: [],
    org: "Lepton Software",
    span: 1,
  },
  {
    title: "Intelligent Address Matching System",
    date: "July 2025",
    summary:
      "Real-time fuzzy address matching and geocoding powered by Gemini and Elasticsearch.",
    metric: { value: "Real-time", label: "fuzzy matching" },
    stack: ["FastAPI", "Python", "Gemini API", "Elasticsearch", "React"],
    highlights: [
      "Built a FastAPI backend that dynamically loads and processes data from Google Sheets, using the Gemini API for intelligent text analysis.",
      "Optimized retrieval workflows with Elasticsearch for highly accurate, real-time fuzzy matching and API-driven lookup.",
    ],
    links: [],
    org: "Lepton Software",
    span: 2,
  },
];
