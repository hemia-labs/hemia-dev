import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/data";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: "Engineering", description: dict.engineeringPage.title };
}

// ponytail: posts mock del diccionario; montar colección MDX cuando exista el primer artículo
export default async function EngineeringPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.engineeringPage;
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

      {/* Lista editorial de posts */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="divide-y border-y">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={`/${lang}/engineering`}
              className="flex flex-col gap-2 py-5 transition-colors hover:text-primary md:flex-row md:items-center md:justify-between"
            >
              <span className="max-w-2xl font-medium">{t.postTitles[i]}</span>
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
      </section>

      {/* CTA hacia open source */}
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
              <Link href={`/${lang}/open-source`}>
                {t.cta.button} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
