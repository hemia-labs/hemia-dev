import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { repos, products } from "@/lib/data";
import { ProductVisual } from "@/components/product-visual";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: "Open Source", description: dict.openSourcePage.title };
}

export default async function OpenSourcePage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.openSourcePage;

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

      {/* Destacados: una sección grande por repo, alternando lados (patrón de products) */}
      {repos
        .filter((r) => r.featured)
        .map((r, i) => {
          const slug = r.name.split("/")[1];
          return (
            <section key={r.name} className="border-t">
              <div
                className={`mx-auto max-w-6xl px-4 ${
                  r.logo ? "py-28" : "py-20"
                }`}
              >
                {/* Logo como header posterizado, ancho completo */}
                {r.logo && (
                  <div className="mb-14 overflow-hidden rounded-card border bg-black">
                    <Image
                      src={r.logo}
                      alt={slug}
                      width={1350}
                      height={380}
                      priority
                      className="h-auto w-full"
                    />
                  </div>
                )}
                <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                    {t.featured.eyebrow} · {r.language}
                  </p>
                  <h2 className="flex items-center gap-3 font-mono text-2xl font-semibold tracking-tight">
                    {r.name}
                    <Badge variant="secondary" className="font-mono">
                      {r.license}
                    </Badge>
                  </h2>
                  <p className="mt-4 max-w-md text-muted-foreground">
                    {t.featured.texts[i]}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-6 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="size-3" /> {r.stars}
                    </span>
                    <span>{r.version}</span>
                    <span>{r.license}</span>
                  </div>
                  <div className="mt-8 flex items-center gap-3">
                    <Button asChild variant="outline">
                      <a href={r.url} target="_blank" rel="noreferrer">
                        {t.featured.github} <ArrowUpRight />
                      </a>
                    </Button>
                    {products.some((p) => p.slug === slug) && (
                      <Button asChild variant="ghost">
                        <Link href={`/${lang}/products/${slug}`}>
                          {t.featured.viewProduct}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <ProductVisual slug={slug} />
                </div>
              </div>
            </section>
          );
        })}

      {/* Resto de repos */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight">
            {t.moreTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* ponytail: descripciones indexadas sobre el array completo de repos */}
            {repos
              .map((r, i) => [r, i] as const)
              .filter(([r]) => !r.featured)
              .map(([r, i]) => (
            <a key={r.name} href={r.url} target="_blank" rel="noreferrer">
              <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-1 font-mono text-base">
                    {r.name}
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </CardTitle>
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
            </a>
          ))}
          </div>
        </div>
      </section>

      {/* Contribute */}
      <section className="border-t bg-grid">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t.contribute.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {t.contribute.text}
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <a
                href="https://github.com/hemia-labs"
                target="_blank"
                rel="noreferrer"
              >
                {t.contribute.cta}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
