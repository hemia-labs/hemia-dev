# hemia.dev

Espacio de producto, ingeniería y open source del ecosistema Hemia. Monorepo **pnpm + Turborepo** con una app: [apps/web](apps/web) — Next.js (App Router) + Tailwind CSS v4 + shadcn/ui (Radix) + Fumadocs.

## Requisitos

- Node.js 22
- pnpm (fijado vía `packageManager` en `package.json`; usa corepack)

## Desarrollo

```sh
pnpm install
pnpm dev     # http://localhost:6001
pnpm build   # build de producción (standalone)
pnpm lint
```

## Estructura

```
apps/web/                  App Next.js
  src/app/[lang]/          Rutas i18n (en · es)
  src/components/ui/       Componentes shadcn (Button, Card, Badge, Separator)
  src/lib/data.ts          Productos, experimentos y changelog
  content/docs/            Documentación MDX
docs/                      Notas internas (no versionadas): brief y design system
ecosystem.config.cjs       Config de PM2 para producción
.github/workflows/         CI/CD
```

## i18n

Rutas bajo `/[lang]` (`en` por defecto, `es`). La redirección de locale la hace `src/proxy.ts`. Los textos viven en `apps/web/src/app/[lang]/dictionaries/{en,es}.json` y se cargan con `dictionaries.ts`.

## Contenido

- **Docs**: `apps/web/content/docs` (MDX; `*.mdx` = inglés, `*.es.mdx` = español).
- **Datos de la home** (productos, experimentos, changelog): `apps/web/src/lib/data.ts`.
- **Design system**: `docs/design-system.md` — tokens, componentes y patrones del frontend.

## Despliegue

CI/CD en [.github/workflows/deploy.yml](.github/workflows/deploy.yml): en cada push a `main` (environment `prod`), GitHub Actions **construye** la app y **sube solo el build** al VPS por SSH (sin clonar el repo ni instalar dependencias en el servidor).

- Next corre en modo **`output: "standalone"`**: el build es autocontenido (incluye su propio `node_modules` mínimo). El workflow copia `.next/static` y `public` dentro del bundle y lo transfiere por `scp`.
- En el servidor, **PM2** ([ecosystem.config.cjs](ecosystem.config.cjs)) arranca `apps/web/server.js` como el proceso `hemia-dev-web` en el puerto **6001** (`127.0.0.1`, tras un reverse proxy).
- El dominio `hemia.dev` y HTTPS los resuelve un reverse proxy (nginx/Caddy) fuera de este repo, apuntando a `localhost:6001`.

### Secrets requeridos (environment `prod`)

`VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PORT` (opcional, default 22), `VPS_APP_DIR`.

### Deploy manual

```sh
pnpm install
pnpm build
pm2 start ecosystem.config.cjs   # requiere el bundle standalone ensamblado
pm2 save
```
