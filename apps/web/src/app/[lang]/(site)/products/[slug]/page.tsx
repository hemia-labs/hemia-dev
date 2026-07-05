import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductVisual } from "@/components/product-visual";
import { products } from "@/lib/data";
import { getDictionary, hasLocale, type Locale } from "../../../dictionaries";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage(props: Props) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const dict = await getDictionary(lang);
  const t = dict.products;
  const pkg = `@hemia/${product.slug}`;
  const dateFmt = new Intl.DateTimeFormat(lang as Locale, {
    dateStyle: "medium",
  });
  // ponytail: specs mock uniformes; mover a data.ts si algún producto difiere
  const specs = [
    ["Package", pkg],
    ["Latest", product.version],
    ["License", "MIT"],
    ["Types", "Included"],
    ["Node", ">= 18"],
  ];
  const others = products.filter((o) => o.slug !== product.slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-grid border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              <Link
                href={`/${lang}/products`}
                className="transition-colors hover:text-primary"
              >
                {t.title}
              </Link>{" "}
              · {product.category}
            </p>
            <h1 className="flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {product.name}
              <Badge variant="secondary" className="font-mono">
                {product.status}
              </Badge>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/${lang}/docs/${product.slug}`}>
                  {t.viewDocs} <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={`https://github.com/hemia-labs/${product.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {dict.nav.github} <ArrowUpRight />
                </a>
              </Button>
            </div>
            <div className="mt-10 flex w-fit divide-x rounded-card border bg-card font-mono text-xs text-muted-foreground">
              <span className="px-4 py-2 text-foreground">{pkg}</span>
              <span className="px-4 py-2">{product.version}</span>
              <span className="px-4 py-2">MIT</span>
            </div>
          </div>
          <div className="hidden w-105 lg:block">
            <ProductVisual slug={product.slug} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          {t.detail.featuresEyebrow}
        </h2>
        <p className="mb-10 max-w-xl text-2xl font-semibold tracking-tight">
          {t.detail.featuresTitle}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {product.features.map((f, i) => (
            <Card
              key={f}
              className="rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50"
            >
              <CardHeader>
                <CardTitle className="font-mono text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </CardTitle>
                <CardDescription className="text-sm text-foreground">
                  {f}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Specs + Releases */}
      <section className="border-t">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              {t.detail.specsTitle}
            </h2>
            <dl className="mt-6 divide-y border-y">
              {specs.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between py-4">
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="font-mono text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              {t.detail.releasesTitle}
            </h2>
            <div className="mt-6 divide-y border-y">
              {product.releases.map((r) => (
                <div key={r.version} className="flex items-baseline gap-4 py-4">
                  <span className="shrink-0 font-mono text-sm">{r.version}</span>
                  <span className="text-sm text-muted-foreground">{r.note}</span>
                  <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">
                    {dateFmt.format(new Date(r.date))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Más productos */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                {t.detail.moreEyebrow}
              </h2>
              <p className="max-w-xl text-2xl font-semibold tracking-tight">
                {t.detail.moreTitle}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/${lang}/products`}>{t.detail.moreCta}</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/${lang}/products/${o.slug}`}>
                <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {o.name}
                      <Badge variant="secondary" className="font-mono">
                        {o.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{o.tagline}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="bg-grid border-t">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            {t.detail.quickstartEyebrow}
          </h2>
          <p className="mx-auto max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
            {t.detail.quickstartTitle}
          </p>
          <div className="mx-auto mt-8 w-fit rounded-card border bg-card px-6 py-3 font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> pnpm add {pkg}
          </div>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={`/${lang}/docs/${product.slug}`}>
                {t.viewDocs} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
