import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: "Resources", description: dict.resourcesPage.title };
}

// ponytail: placeholder; poblar con templates y recursos reales cuando existan
export default async function ResourcesPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {dict.resourcesPage.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {dict.resourcesPage.text}
      </p>
    </div>
  );
}
