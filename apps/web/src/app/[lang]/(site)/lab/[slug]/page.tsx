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
import { experiments } from "@/lib/data";
import { getDictionary, hasLocale, type Locale } from "../../../dictionaries";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: Props) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const idx = experiments.findIndex((e) => e.slug === slug);
  if (idx === -1) notFound();
  return {
    title: experiments[idx].name,
    description: dict.lab.experimentDescriptions[idx],
  };
}

export default async function ExperimentPage(props: Props) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.lab;
  const idx = experiments.findIndex((e) => e.slug === slug);
  if (idx === -1) notFound();
  const experiment = experiments[idx];
  const dateFmt = new Intl.DateTimeFormat(lang as Locale, {
    dateStyle: "medium",
  });
  const others = experiments.filter((e) => e.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-grid border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            <Link
              href={`/${lang}/lab`}
              className="transition-colors hover:text-primary"
            >
              {t.eyebrow}
            </Link>{" "}
            · {t.badge}
          </p>
          <h1 className="flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {experiment.name}
            <Badge variant="secondary" className="font-mono">
              {t.status[experiment.status]}
            </Badge>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {t.experimentDescriptions[idx]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/${lang}/lab`}>
                {t.detail.otherCta} <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://github.com/hemia-labs"
                target="_blank"
                rel="noreferrer"
              >
                {t.detail.github} <ArrowUpRight />
              </a>
            </Button>
          </div>
          <div className="mt-10 flex w-fit divide-x rounded-card border bg-card font-mono text-xs text-muted-foreground">
            <span className="px-4 py-2 text-foreground">
              {t.status[experiment.status]}
            </span>
            <span className="px-4 py-2">{dateFmt.format(new Date(experiment.date))}</span>
            <span className="px-4 py-2">{experiment.slug}</span>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="max-w-2xl border-l-2 border-primary/50 pl-6 text-lg text-muted-foreground">
          {t.detail.disclaimer}
        </p>
      </section>

      {/* Otros experimentos */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                {t.detail.otherEyebrow}
              </h2>
              <p className="max-w-xl text-2xl font-semibold tracking-tight">
                {t.detail.otherTitle}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/${lang}/lab`}>{t.detail.otherCta}</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/${lang}/lab/${o.slug}`}>
                <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="w-fit font-mono">
                        {t.badge}
                      </Badge>
                      {o.status === "archived" && (
                        <Badge variant="secondary" className="w-fit font-mono">
                          {t.status.archived}
                        </Badge>
                      )}
                    </div>
                    <CardTitle>{o.name}</CardTitle>
                    <CardDescription>
                      {t.experimentDescriptions[experiments.indexOf(o)]}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA hacia productos */}
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
              <Link href={`/${lang}/products`}>
                {t.cta.button} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
