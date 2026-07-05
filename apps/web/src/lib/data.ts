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
  },
];

export type Experiment = {
  slug: string;
  name: string;
  description: string;
  date: string; // ISO
};

export const experiments: Experiment[] = [
  {
    slug: "hello-lab",
    name: "Hello Lab",
    description: "Primer experimento del laboratorio. Placeholder.",
    date: "2026-07-04",
  },
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
