// ponytail: datos estáticos en un array; mover a MDX/CMS cuando haya más de ~10 entradas
export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "stable" | "beta" | "soon";
};

export const products: Product[] = [
  {
    slug: "core",
    name: "Hemia Core",
    tagline: "La base de la plataforma.",
    description:
      "Primer producto de Hemia. Reemplaza esta entrada con el producto real.",
    status: "soon",
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
