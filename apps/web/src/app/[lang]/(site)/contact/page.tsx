import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { getDictionary, hasLocale } from "../../dictionaries";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { title: dict.contact.title };
}

// ponytail: mailto en vez de formulario; añadir form + API route cuando haga falta capturar leads
export default async function ContactPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {dict.contact.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{dict.contact.subtitle}</p>
      <Button asChild className="mt-8">
        <a href="mailto:hola@hemia.dev">
          <Mail /> hola@hemia.dev
        </a>
      </Button>
    </div>
  );
}
