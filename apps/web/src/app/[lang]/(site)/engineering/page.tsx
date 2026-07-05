import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: "Engineering", description: dict.engineeringPage.title };
}

// ponytail: placeholder; montar colección MDX de artículos cuando exista el primero
export default async function EngineeringPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {dict.engineeringPage.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {dict.engineeringPage.text}
      </p>
    </div>
  );
}
