import {
  Activity,
  Binary,
  Boxes,
  Brain,
  BrainCircuit,
  Braces,
  ListTree,
  Map as MapIcon,
  MapPinned,
  Network,
  Share2,
  Sparkles,
  Webhook,
} from "lucide-react";
import {
  SiCplusplus,
  SiDocker,
  SiElasticsearch,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiHtml5,
  SiHuggingface,
  SiKeras,
  SiLangchain,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiVercel,
} from "react-icons/si";
import {
  PythonLogo,
  JavaLogo,
  LangGraphLogo,
  FastMcpLogo,
} from "@/components/ui/skill-logos";
import type { SkillIcon } from "@/components/ui/SkillCard";

interface IconMeta {
  Icon: SkillIcon;
  color: string;
}

/** Brand / concept icon + colour for each skill name in data/skills.ts. */
const ICONS: Record<string, IconMeta> = {
  // Languages
  Python: { Icon: PythonLogo, color: "#3776AB" },
  "C / C++": { Icon: SiCplusplus, color: "#00599C" },
  Java: { Icon: JavaLogo, color: "#f58219" },
  "SQL (Postgres)": { Icon: SiPostgresql, color: "#4169E1" },
  "HTML / CSS": { Icon: SiHtml5, color: "#E34F26" },

  // Frameworks & Tools
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  LangGraph: { Icon: LangGraphLogo, color: "#1C3C3C" },
  FastMCP: { Icon: FastMcpLogo, color: "#C77DFF" },
  "Tree-sitter": { Icon: ListTree, color: "#4B8BBE" },
  NetworkX: { Icon: Network, color: "#2C7FB8" },
  LangChain: { Icon: SiLangchain, color: "#1C9C7C" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  Pandas: { Icon: SiPandas, color: "#9B59B6" },
  TensorFlow: { Icon: SiTensorflow, color: "#FF6F00" },
  Keras: { Icon: SiKeras, color: "#D00000" },
  OpenCV: { Icon: SiOpencv, color: "#5C3EE8" },

  // Cloud & DevOps
  "Google Cloud Platform": { Icon: SiGooglecloud, color: "#4285F4" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, color: "#E6EDF3" },
  Vercel: { Icon: SiVercel, color: "#FFFFFF" },
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  Elasticsearch: { Icon: SiElasticsearch, color: "#00BFB3" },
  Supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  "HF Spaces": { Icon: SiHuggingface, color: "#FFD21E" },

  // Concepts & Architecture
  DSA: { Icon: Binary, color: "#38BDF8" },
  "Machine Learning": { Icon: BrainCircuit, color: "#FF6F61" },
  "Deep Learning": { Icon: Brain, color: "#A855F7" },
  "RESTful APIs": { Icon: Webhook, color: "#6BA539" },
  Microservices: { Icon: Boxes, color: "#FF6B6B" },
  Observability: { Icon: Activity, color: "#F5A623" },
  "Graph RAG": { Icon: Share2, color: "#A66CFF" },
  GeoJSON: { Icon: MapIcon, color: "#3AA655" },
  PostGIS: { Icon: MapPinned, color: "#336791" },
  "JSON-RPC": { Icon: Braces, color: "#F7DF1E" },
};

const FALLBACK: IconMeta = { Icon: Sparkles, color: "#C8A07A" };

export function skillIcon(name: string): IconMeta {
  return ICONS[name] ?? FALLBACK;
}
