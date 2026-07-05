import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { experiments } from "@/lib/data";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: dict.lab.title };
}

export default async function LabPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{dict.lab.title}</h1>
      <p className="mt-2 text-muted-foreground">{dict.lab.subtitle}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {experiments.map((e) => (
          <Link key={e.slug} href={`/${lang}/lab/${e.slug}`}>
            <Card className="h-full rounded-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/50">
              <CardHeader>
                <CardTitle>{e.name}</CardTitle>
                <CardDescription>{e.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
