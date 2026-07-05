import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { experiments } from "@/lib/data";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: dict.lab.title };
}

// ponytail: experimentos mock; descripciones localizadas por índice en lab.experimentDescriptions
export default async function LabPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.lab;
  const dateFmt = new Intl.DateTimeFormat(lang as Locale, {
    dateStyle: "medium",
  });

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
              {t.subtitle}
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

      {/* Grid de experimentos */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((e, i) => (
            <Link key={e.slug} href={`/${lang}/lab/${e.slug}`}>
              <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="w-fit font-mono">
                      {t.badge}
                    </Badge>
                    {e.status === "archived" && (
                      <Badge variant="secondary" className="w-fit font-mono">
                        {t.status.archived}
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{e.name}</CardTitle>
                  <CardDescription>
                    {t.experimentDescriptions[i]}
                  </CardDescription>
                  <p className="mt-4 font-mono text-xs text-muted-foreground">
                    {dateFmt.format(new Date(e.date))}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
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
