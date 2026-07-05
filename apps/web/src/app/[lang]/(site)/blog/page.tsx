import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: dict.blog.title };
}

// ponytail: sin posts aún; montar colección MDX de fumadocs cuando exista el primero
export default async function BlogPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{dict.blog.title}</h1>
      <p className="mt-2 text-muted-foreground">{dict.blog.subtitle}</p>
    </div>
  );
}
