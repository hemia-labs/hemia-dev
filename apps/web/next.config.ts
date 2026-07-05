import path from "node:path";
import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  // Build autocontenido para desplegar sin `pnpm install` en el servidor.
  output: "standalone",
  // Monorepo: rastrear deps desde la raíz, no desde apps/web.
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default withMDX(nextConfig);
