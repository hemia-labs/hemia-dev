// ponytail: datos estáticos en un array; mover a MDX/CMS cuando haya más de ~10 entradas
export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "stable" | "beta" | "soon";
  version: string;
  category: string;
  features: string[];
  releases: { version: string; date: string; note: string }[]; // date ISO
};

export const products: Product[] = [
  {
    slug: "core",
    name: "Hemia Core",
    tagline: "La base de la plataforma.",
    description:
      "Identidad, permisos y configuración compartida para todo el ecosistema Hemia.",
    status: "soon",
    version: "v0.1.0",
    category: "Platform",
    features: [
      "SSO y permisos por rol para todo el ecosistema.",
      "Configuración compartida entre productos y entornos.",
      "Un solo panel para equipos, tokens y facturación.",
    ],
    releases: [
      { version: "v0.1.0", date: "2026-06-20", note: "Primera preview interna: SSO y panel de equipos." },
      { version: "v0.0.2", date: "2026-05-28", note: "Modelo de permisos por rol." },
      { version: "v0.0.1", date: "2026-05-02", note: "Esqueleto del panel y API de tokens." },
    ],
  },
  {
    slug: "schema",
    name: "Hemia Schema",
    tagline: "Validación de datos tipada, de extremo a extremo.",
    description:
      "Define el esquema una vez y compártelo entre frontend, backend y documentación.",
    status: "stable",
    version: "v0.4.1",
    category: "Data",
    features: [
      "Define el esquema una vez, valida en cliente y servidor.",
      "Tipos TypeScript inferidos, sin codegen.",
      "Mensajes de error legibles y localizables.",
    ],
    releases: [
      { version: "v0.4.1", date: "2026-06-30", note: "Mensajes de error localizables." },
      { version: "v0.4.0", date: "2026-06-12", note: "h.enum() y uniones discriminadas." },
      { version: "v0.3.2", date: "2026-05-19", note: "Fix: inferencia en objetos anidados." },
    ],
  },
  {
    slug: "ui",
    name: "Hemia UI",
    tagline: "Componentes accesibles con tokens propios.",
    description:
      "Librería de componentes sobre Tailwind, construida con los estándares de diseño de Hemia.",
    status: "stable",
    version: "v0.2.0",
    category: "Design",
    features: [
      "Componentes accesibles sobre Radix, estilados con tokens.",
      "Modo claro y oscuro de serie.",
      "Copia el código: sin dependencia de runtime.",
    ],
    releases: [
      { version: "v0.2.0", date: "2026-06-25", note: "Modo claro y nuevos tokens de chart." },
      { version: "v0.1.4", date: "2026-06-05", note: "Combobox y Command accesibles." },
      { version: "v0.1.3", date: "2026-05-15", note: "Fix: focus ring en Safari." },
    ],
  },
  {
    slug: "cli",
    name: "Hemia CLI",
    tagline: "Scaffolding y automatización desde la terminal.",
    description:
      "Inicializa proyectos, genera código y conecta con la plataforma sin salir de la shell.",
    status: "beta",
    version: "v0.1.3",
    category: "Tooling",
    features: [
      "Scaffolding de proyectos con los estándares de Hemia.",
      "Generadores de código para APIs, schemas y componentes.",
      "Deploys de preview desde la terminal.",
    ],
    releases: [
      { version: "v0.1.3", date: "2026-06-28", note: "hemia deploy --preview." },
      { version: "v0.1.2", date: "2026-06-10", note: "Generador de schemas." },
      { version: "v0.1.0", date: "2026-05-22", note: "hemia init con detección de framework." },
    ],
  },
  {
    slug: "gateway",
    name: "Hemia Gateway",
    tagline: "Un punto de entrada para todas tus APIs.",
    description:
      "Enrutamiento, rate limiting y observabilidad para servicios internos y públicos.",
    status: "beta",
    version: "v0.0.9",
    category: "Infrastructure",
    features: [
      "Enrutamiento declarativo con fallbacks automáticos.",
      "Rate limiting y API keys por cliente.",
      "Métricas y trazas sin instrumentar tu código.",
    ],
    releases: [
      { version: "v0.0.9", date: "2026-07-01", note: "Métricas por ruta y p99." },
      { version: "v0.0.8", date: "2026-06-18", note: "Rate limiting por API key." },
      { version: "v0.0.7", date: "2026-05-30", note: "Fallbacks automáticos entre upstreams." },
    ],
  },
];

export type Repo = {
  name: string;
  language: string;
  stars: string;
  version: string;
  license: string;
  url: string;
  featured?: boolean; // sección grande en /open-source; el slug (name sin org) debe existir en ProductVisual
  logo?: string; // ruta a wordmark; si existe, se muestra como banner y la sección va más alta
};

// ponytail: repos mock; poblar desde la API de GitHub cuando la org sea pública
// ponytail: descripciones localizadas por índice en openSourcePage.repoDescriptions
export const repos: Repo[] = [
  // ponytail: stars/version placeholder hasta poblar desde la API de GitHub
  { name: "hemia/skeletree", language: "Rust", stars: "340", version: "v0.1.0", license: "MIT", url: "https://github.com/hemia-labs/skeletree", featured: true, logo: "/open-source/skeletree.webp" },
  { name: "hemia/docrail", language: "Rust", stars: "210", version: "v0.1.0", license: "MIT", url: "https://github.com/hemia-labs/docrail", featured: true, logo: "/open-source/docrail.webp" },
  { name: "hemia/schema", language: "TypeScript", stars: "1.2k", version: "v0.4.1", license: "MIT", url: "https://github.com/hemia-labs/schema", featured: true },
  { name: "hemia/ui", language: "TypeScript", stars: "860", version: "v0.2.0", license: "MIT", url: "https://github.com/hemia-labs/ui", featured: true },
  { name: "hemia/cli", language: "Go", stars: "430", version: "v0.1.3", license: "Apache-2.0", url: "https://github.com/hemia-labs/cli", featured: true },
  { name: "hemia/config", language: "TypeScript", stars: "210", version: "v1.2.0", license: "MIT", url: "https://github.com/hemia-labs/config" },
  { name: "hemia/hooks", language: "TypeScript", stars: "180", version: "v0.3.0", license: "MIT", url: "https://github.com/hemia-labs/hooks" },
  { name: "hemia/docs-theme", language: "TypeScript", stars: "95", version: "v0.1.1", license: "MIT", url: "https://github.com/hemia-labs/docs-theme" },
];

export type Post = {
  topic: string;
  author: string;
  date: string; // ISO
  readingTime: string;
};

// ponytail: posts mock; montar colección MDX cuando exista el primer artículo real
// ponytail: títulos localizados por índice en engineeringPage.postTitles
export const posts: Post[] = [
  { topic: "AI", author: "AI Team", date: "2026-06-28", readingTime: "8 min" },
  { topic: "Backend", author: "Platform Team", date: "2026-06-14", readingTime: "11 min" },
  { topic: "Infrastructure", author: "Infra Team", date: "2026-05-30", readingTime: "6 min" },
  { topic: "Design", author: "Design Team", date: "2026-05-16", readingTime: "7 min" },
  { topic: "Frontend", author: "Frontend Team", date: "2026-04-29", readingTime: "9 min" },
  { topic: "Security", author: "Security Team", date: "2026-04-11", readingTime: "5 min" },
];

export type Resource = {
  name: string;
  type: "Template" | "Component" | "Config" | "Starter";
  tags: string[]; // deben existir en resourceFilters
  url: string;
};

// ponytail: recursos mock; poblar desde el repo/registry real cuando exista
// ponytail: descripciones localizadas por índice en resourcesPage.resourceDescriptions
export const resources: Resource[] = [
  { name: "Next.js SaaS Starter", type: "Starter", tags: ["Next.js", "React", "TypeScript"], url: "https://github.com/hemia-labs" },
  { name: "AI Chat Template", type: "Template", tags: ["AI", "Next.js"], url: "https://github.com/hemia-labs" },
  { name: "Design System Kit", type: "Component", tags: ["Design systems", "React"], url: "https://github.com/hemia-labs" },
  { name: "API Gateway Config", type: "Config", tags: ["APIs", "TypeScript"], url: "https://github.com/hemia-labs" },
  { name: "Product Landing Template", type: "Template", tags: ["Product", "Next.js"], url: "https://github.com/hemia-labs" },
  { name: "TypeScript Base Config", type: "Config", tags: ["TypeScript"], url: "https://github.com/hemia-labs" },
];

export type Experiment = {
  slug: string;
  name: string; // nombre propio, universal
  status: "active" | "archived";
  date: string; // ISO
};

// ponytail: experimentos mock; descripciones localizadas por índice en labPage.experimentDescriptions
export const experiments: Experiment[] = [
  { slug: "hello-lab", name: "Hello Lab", status: "active", date: "2026-07-04" },
  { slug: "prompt-playground", name: "Prompt Playground", status: "active", date: "2026-06-22" },
  { slug: "edge-renderer", name: "Edge Renderer", status: "active", date: "2026-06-08" },
  { slug: "type-explorer", name: "Type Explorer", status: "archived", date: "2026-05-10" },
];

export type ChangelogEntry = {
  date: string; // ISO
  title: string;
  description: string;
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-07-04",
    title: "hemia.dev v0",
    description: "Nace la plataforma: landing, docs, lab, changelog y blog.",
  },
];
