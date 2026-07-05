import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: "Standards", description: dict.standardsPage.title };
}

// ponytail: estándares mock en el diccionario; mover a MDX cuando se documenten los reales
export default async function StandardsPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.standardsPage;

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

      {/* Índice de estándares por disciplina */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="divide-y border-y">
          {t.disciplines.map((d, i) => (
            <div
              key={d.name}
              className="grid gap-6 py-10 md:grid-cols-[220px_1fr]"
            >
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  {d.name}
                </h2>
              </div>
              <div className="space-y-6">
                {d.principles.map((p) => (
                  <div key={p.title}>
                    <h3 className="font-medium">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {p.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA hacia Engineering */}
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
              <Link href={`/${lang}/engineering`}>
                {t.cta.button} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
