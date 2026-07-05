import { Separator } from "@/components/ui/separator";
import { changelog } from "@/lib/data";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: dict.changelog.title };
}

export default async function ChangelogPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {dict.changelog.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{dict.changelog.subtitle}</p>
      <div className="mt-10 space-y-8">
        {changelog.map((entry) => (
          <article key={entry.date + entry.title}>
            <p className="font-mono text-sm text-muted-foreground">
              {entry.date}
            </p>
            <h2 className="mt-1 text-xl font-medium">{entry.title}</h2>
            <p className="mt-2 text-muted-foreground">{entry.description}</p>
            <Separator className="mt-8" />
          </article>
        ))}
      </div>
    </div>
  );
}
