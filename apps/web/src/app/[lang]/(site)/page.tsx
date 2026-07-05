import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  FlaskConical,
  Rocket,
  Ruler,
  Star,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products, repos, posts, experiments, changelog } from "@/lib/data";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { notFound } from "next/navigation";

// ponytail: contenido mock (posts, filtros); sustituir por datos reales cuando existan
// ponytail: descripciones/títulos vienen del diccionario por índice
const standardsTags = [
  "Engineering",
  "Product",
  "Design",
  "AI",
  "Security",
  "Operations",
];

const resourceFilters = [
  "Next.js",
  "React",
  "TypeScript",
  "AI",
  "APIs",
  "Design systems",
  "Product",
];

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.home;
  const href = (path: string) => `/${lang}${path}`;
  const dateFmt = new Intl.DateTimeFormat(lang as Locale, { dateStyle: "medium" });

  const pillars = [
    { icon: Rocket, key: "products", title: dict.nav.products, href: "/products" },
    { icon: Boxes, key: "openSource", title: dict.nav.openSource, href: "/open-source" },
    { icon: Ruler, key: "standards", title: dict.nav.standards, href: "/standards" },
    { icon: Wrench, key: "resources", title: dict.nav.resources, href: "/resources" },
    { icon: BookOpen, key: "engineering", title: dict.nav.engineering, href: "/engineering" },
    { icon: FlaskConical, key: "labs", title: dict.nav.labs, href: "/lab" },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="bg-grid border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:py-36 lg:grid-cols-[1fr_auto]">
          <div>
            <Badge variant="outline" className="mb-6 font-mono">
              {t.hero.badge}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {t.hero.titleTop}
              <br />
              {t.hero.titleBottom}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {t.hero.text}
            </p>
            <div className="mt-8 flex gap-3">
              <Button asChild>
                <Link href={href("/products")}>
                  {t.hero.ctaPrimary} <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="https://github.com/hemia-labs" target="_blank" rel="noreferrer">
                  {t.hero.ctaSecondary}
                </a>
              </Button>
            </div>
          </div>
          {/* ponytail: terminal decorativa estática; animarla solo si diseño lo pide */}
          <div className="hidden w-105 rounded-card border bg-card font-mono text-xs shadow-2xl lg:block">
            <div className="flex items-center gap-1.5 border-b px-4 py-3">
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="ml-2 text-muted-foreground">hemia — zsh</span>
            </div>
            <div className="space-y-2 p-4 text-muted-foreground">
              <p>
                <span className="text-primary">$</span> pnpm add @hemia/schema
                @hemia/ui
              </p>
              <p>Packages: +2</p>
              <p className="text-foreground">✓ Done in 1.2s</p>
              <p>
                <span className="text-primary">$</span> hemia init
              </p>
              <p>◇ Project detected: Next.js</p>
              <p className="text-foreground">✓ Ready to build.</p>
              <p>
                <span className="text-primary">$</span>{" "}
                <span className="inline-block h-3.5 w-2 animate-pulse bg-foreground align-text-bottom" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Link key={p.key} href={href(p.href)}>
              <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
                <CardHeader>
                  <p.icon className="mb-2 size-5 text-foreground transition-colors group-hover/card:text-primary" />
                  <CardTitle className="flex items-center gap-1">
                    {p.title}
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>
                    {t.pillars[p.key as keyof typeof t.pillars]}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-y">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            {t.products.eyebrow}
          </h2>
          <p className="mb-10 max-w-xl text-2xl font-semibold tracking-tight">
            {t.products.title}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link key={p.slug} href={href(`/products/${p.slug}`)}>
                <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {p.name}
                      <Badge variant="secondary" className="font-mono">
                        {p.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{p.tagline}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Open source */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              {t.openSource.eyebrow}
            </h2>
            <p className="max-w-xl text-2xl font-semibold tracking-tight">
              {t.openSource.title}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={href("/open-source")}>{t.openSource.cta}</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {repos.slice(0, 3).map((r, i) => (
            <Card
              key={r.name}
              className="rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50"
            >
              <CardHeader>
                <CardTitle className="font-mono text-base">{r.name}</CardTitle>
                <CardDescription>{t.repoDescriptions[i]}</CardDescription>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-primary" />
                    {r.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="size-3" /> {r.stars}
                  </span>
                  <span>{r.version}</span>
                  <span>{r.license}</span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Standards */}
      <section className="border-y bg-grid">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            {t.standards.eyebrow}
          </h2>
          <p className="mb-10 max-w-xl text-2xl font-semibold tracking-tight">
            {t.standards.title}
          </p>
          <div className="flex flex-wrap gap-3">
            {standardsTags.map((s) => (
              <Link key={s} href={href("/standards")}>
                <Badge
                  variant="outline"
                  className="rounded-card bg-card px-4 py-2 text-sm font-normal transition-colors hover:border-primary/50"
                >
                  {s}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              {t.resources.eyebrow}
            </h2>
            <p className="max-w-xl text-2xl font-semibold tracking-tight">
              {t.resources.title}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={href("/resources")}>{t.resources.cta}</Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 font-mono text-sm text-muted-foreground">
          {resourceFilters.map((r) => (
            <span key={r} className="rounded-card border px-3 py-1">
              {r}
            </span>
          ))}
        </div>
      </section>

      {/* Engineering */}
      <section className="border-y">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                {t.engineering.eyebrow}
              </h2>
              <p className="max-w-xl text-2xl font-semibold tracking-tight">
                {t.engineering.title}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href={href("/engineering")}>{t.engineering.cta}</Link>
            </Button>
          </div>
          <div className="divide-y border-y">
            {posts.slice(0, 3).map((post, i) => (
              <Link
                key={i}
                href={href("/engineering")}
                className="flex flex-col gap-2 py-5 transition-colors hover:text-primary md:flex-row md:items-center md:justify-between"
              >
                <span className="max-w-xl font-medium">{t.postTitles[i]}</span>
                <span className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                  <Badge variant="secondary" className="font-mono">
                    {post.topic}
                  </Badge>
                  {post.author}
                  <span>{dateFmt.format(new Date(post.date))}</span>
                  <span>{post.readingTime}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Labs */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              {t.labs.eyebrow}
            </h2>
            <p className="max-w-xl text-2xl font-semibold tracking-tight">
              {t.labs.title}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={href("/lab")}>{t.labs.cta}</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiments.slice(0, 3).map((e, i) => (
            <Link key={e.slug} href={href(`/lab/${e.slug}`)}>
              <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
                <CardHeader>
                  <Badge variant="outline" className="mb-2 w-fit font-mono">
                    {t.labs.badge}
                  </Badge>
                  <CardTitle>{e.name}</CardTitle>
                  <CardDescription>
                    {dict.lab.experimentDescriptions[i]}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section className="border-y">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t.changelog.title}
            </h2>
            <Button asChild variant="outline">
              <Link href={href("/changelog")}>{t.changelog.cta}</Link>
            </Button>
          </div>
          <div className="divide-y border-y">
            {changelog.map((entry) => (
              <div
                key={entry.date + entry.title}
                className="flex flex-col gap-1 py-5 md:flex-row md:gap-8"
              >
                <p className="font-mono text-sm text-muted-foreground md:w-32 md:shrink-0">
                  {dateFmt.format(new Date(entry.date))}
                </p>
                <div>
                  <p className="font-medium">{entry.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Badge variant="outline" className="mb-4 font-mono">
          {t.ecosystem.badge}
        </Badge>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">
          {t.ecosystem.title}
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">{t.ecosystem.text}</p>
        <div className="mt-8 flex gap-3">
          <Button asChild variant="outline">
            <a href="https://hemia.mx" target="_blank" rel="noreferrer">
              {t.ecosystem.ctaPrimary}
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="https://hemia.mx/contacto" target="_blank" rel="noreferrer">
              {t.ecosystem.ctaSecondary}
            </a>
          </Button>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t bg-grid">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {t.cta.text}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg">
              <Link href={href("/products")}>
                {t.cta.ctaPrimary} <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://github.com/hemia-labs" target="_blank" rel="noreferrer">
                {t.cta.ctaSecondary}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
