import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { getDictionary, hasLocale } from "../../../dictionaries";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Badge variant="outline" className="mb-4 font-mono">
        {product.status}
      </Badge>
      <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        {product.description}
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href={`/${lang}/docs/${product.slug}`}>
            {dict.products.viewDocs}
          </Link>
        </Button>
      </div>
    </div>
  );
}
