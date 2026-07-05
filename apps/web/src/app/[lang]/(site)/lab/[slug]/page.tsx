import { notFound } from "next/navigation";
import { experiments } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const experiment = experiments.find((e) => e.slug === slug);
  if (!experiment) notFound();
  return { title: experiment.name, description: experiment.description };
}

export default async function ExperimentPage(props: Props) {
  const { slug } = await props.params;
  const experiment = experiments.find((e) => e.slug === slug);
  if (!experiment) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-sm text-muted-foreground">
        {experiment.date}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        {experiment.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        {experiment.description}
      </p>
    </div>
  );
}
