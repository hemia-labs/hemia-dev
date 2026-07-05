import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/lib/data";
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
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {dict.products.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{dict.products.subtitle}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {products.map((p) => (
          <Link key={p.slug} href={`/${lang}/products/${p.slug}`}>
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
  );
}
