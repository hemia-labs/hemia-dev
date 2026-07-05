import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: "Standards", description: dict.standardsPage.title };
}

// ponytail: placeholder; documentar estándares reales por disciplina cuando existan
export default async function StandardsPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {dict.standardsPage.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {dict.standardsPage.text}
      </p>
    </div>
  );
}
