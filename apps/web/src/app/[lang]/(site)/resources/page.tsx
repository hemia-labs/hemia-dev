import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resources } from "@/lib/data";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ tag?: string }>;
};

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: "Resources", description: dict.resourcesPage.title };
}

// ponytail: recursos mock del diccionario; filtrado por searchParams (nativo, sin estado cliente)
export default async function ResourcesPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.resourcesPage;
  const { tag } = await props.searchParams;

  const tags = [...new Set(resources.flatMap((r) => r.tags))];
  // Índice original para leer la descripción localizada; luego filtramos por tag
  const shown = resources
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => !tag || r.tags.includes(tag));

  const chipBase =
    "rounded-card border px-3 py-1 font-mono text-sm transition-colors";

  return (
    <>
      {/* Hero */}
      <section className="bg-grid border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:py-36 lg:grid-cols-[1fr_auto]">
          <div>
            <Badge variant="outline" className="mb-6 font-mono">
              {t.eyebrow}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {t.text}
            </p>
          </div>
          {/* Secuencia-slogan sobre línea vertical (patrón del hero de products) */}
          <div className="hidden space-y-6 border-l pl-10 lg:block">
            {t.slogan.map((line, i) => (
              <div key={line}>
                <p className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={`text-2xl font-semibold tracking-tight ${
                    i === t.slogan.length - 1
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros + grid */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.filtersLabel}
          </span>
          <Link
            href={`/${lang}/resources`}
            className={`${chipBase} ${
              !tag
                ? "border-primary/50 text-foreground"
                : "text-muted-foreground hover:border-primary/50"
            }`}
          >
            All
          </Link>
          {tags.map((tg) => (
            <Link
              key={tg}
              href={`/${lang}/resources?tag=${encodeURIComponent(tg)}`}
              className={`${chipBase} ${
                tag === tg
                  ? "border-primary/50 text-foreground"
                  : "text-muted-foreground hover:border-primary/50"
              }`}
            >
              {tg}
            </Link>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map(({ r, i }) => (
            <a key={r.name} href={r.url} target="_blank" rel="noreferrer">
              <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
                <CardHeader>
                  <Badge variant="secondary" className="mb-2 w-fit font-mono">
                    {r.type}
                  </Badge>
                  <CardTitle className="flex items-center gap-1">
                    {r.name}
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>{t.resourceDescriptions[i]}</CardDescription>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                    {r.tags.map((tg) => (
                      <span key={tg}>#{tg}</span>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-grid">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {t.cta.text}
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <a
                href="https://github.com/hemia-labs"
                target="_blank"
                rel="noreferrer"
              >
                {t.cta.button}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
