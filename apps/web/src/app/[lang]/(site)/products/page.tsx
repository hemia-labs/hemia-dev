import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { ProductVisual } from "@/components/product-visual";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: dict.products.title };
}

export default async function ProductsPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="bg-grid border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:py-36 lg:grid-cols-[1fr_auto]">
          <div>
            <Badge variant="outline" className="mb-6 font-mono">
              {dict.products.eyebrow}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {dict.products.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {dict.products.subtitle}
            </p>
          </div>
          {/* Secuencia-slogan sobre línea vertical */}
          <div className="hidden space-y-6 border-l pl-10 lg:block">
            {dict.products.slogan.map((line, i) => (
              <div key={line}>
                <p className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={`text-2xl font-semibold tracking-tight ${
                    i === dict.products.slogan.length - 1
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

      {/* Una sección por producto, alternando lados */}
      {products.map((p, i) => (
        <section key={p.slug} id={p.slug} className="scroll-mt-16 border-t">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <p className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · {p.category}
              </p>
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                {p.name}
                <Badge variant="secondary" className="font-mono">
                  {p.status}
                </Badge>
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                {p.description}
              </p>
              <ul className="mt-6 space-y-3 border-t pt-6">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="font-mono text-foreground">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-4">
                <Button asChild variant="outline">
                  <Link href={`/${lang}/products/${p.slug}`}>
                    {dict.products.viewDocs} <ArrowRight />
                  </Link>
                </Button>
                <span className="font-mono text-xs text-muted-foreground">
                  {p.version}
                </span>
              </div>
            </div>
            <ProductVisual slug={p.slug} />
          </div>
        </section>
      ))}
    </>
  );
}
