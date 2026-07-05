import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

// Panel decorativo estilo ventana: mismo patrón que la terminal del hero del home.
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full rounded-card border bg-card font-mono text-xs">
      <div className="flex items-center gap-1.5 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-2 text-muted-foreground">{title}</span>
      </div>
      <div className="space-y-2 p-4 text-muted-foreground">{children}</div>
    </div>
  );
}

// ponytail: visuales mock por slug; sustituir por screenshots/demos reales cuando existan
function Visual({ slug }: { slug: string }) {
  switch (slug) {
    case "core":
      return (
        <Panel title="hemia.config.ts">
          <p>
            <span className="text-foreground">import</span> {"{ hemia }"}{" "}
            <span className="text-foreground">from</span> "@hemia/core";
          </p>
          <p>&nbsp;</p>
          <p>
            <span className="text-foreground">export default</span> hemia({"{"}
          </p>
          <p className="pl-4">org: "acme",</p>
          <p className="pl-4">products: ["schema", "ui", "cli"],</p>
          <p className="pl-4">auth: {"{ sso: true }"},</p>
          <p>{"}"});</p>
        </Panel>
      );
    case "schema":
      return (
        <Panel title="user.schema.ts">
          <p>
            <span className="text-foreground">const</span> user = h.object({"{"}
          </p>
          <p className="pl-4">id: h.uuid(),</p>
          <p className="pl-4">email: h.string().email(),</p>
          <p className="pl-4">role: h.enum(["admin", "member"]),</p>
          <p>{"}"});</p>
          <p>&nbsp;</p>
          <p className="text-foreground">✓ Type inferred: User</p>
        </Panel>
      );
    case "ui":
      return (
        <Panel title="specimen — @hemia/ui">
          <div className="flex flex-wrap items-center gap-3 pt-1 font-sans">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Badge variant="outline" className="font-mono">
              stable
            </Badge>
            <Badge variant="secondary" className="font-mono">
              beta
            </Badge>
            <Badge variant="secondary" className="font-mono">
              soon
            </Badge>
          </div>
          <p className="pt-2">tokens: --primary · --border · --radius-card</p>
        </Panel>
      );
    case "cli":
      return (
        <Panel title="hemia — zsh">
          <p>
            <span className="text-primary">$</span> hemia generate api users
          </p>
          <p className="text-foreground">✓ created src/api/users/route.ts</p>
          <p className="text-foreground">✓ created src/api/users/schema.ts</p>
          <p>
            <span className="text-primary">$</span> hemia deploy --preview
          </p>
          <p className="text-foreground">✓ Preview: https://acme.hemia.app</p>
          <p>
            <span className="text-primary">$</span>{" "}
            <span className="inline-block h-3.5 w-2 animate-pulse bg-foreground align-text-bottom" />
          </p>
        </Panel>
      );
    case "gateway":
      return (
        <Panel title="gateway — live">
          {[
            ["GET", "/v1/users", "users-svc", "12ms"],
            ["POST", "/v1/ingest", "pipeline-svc", "48ms"],
            ["GET", "/v1/search", "search-svc", "31ms"],
            ["GET", "/v1/files/:id", "storage-svc", "9ms"],
          ].map(([method, path, svc, ms]) => (
            <p key={path} className="flex items-center gap-3">
              <span className="w-9 text-foreground">{method}</span>
              <span>{path}</span>
              <span className="ml-auto">→ {svc}</span>
              <span className="w-10 text-right">{ms}</span>
              <span className="size-2 rounded-full bg-primary" />
            </p>
          ))}
        </Panel>
      );
    default:
      return null;
  }
}

export default async function ProductsPage(props: Props) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="bg-grid border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:py-36 lg:grid-cols-[1fr_auto]">
          <div>
            <Badge variant="outline" className="mb-6 font-mono">
              {dict.products.eyebrow}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {dict.products.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {dict.products.subtitle}
            </p>
          </div>
          {/* Secuencia-slogan sobre línea vertical */}
          <div className="hidden space-y-6 border-l pl-10 lg:block">
            {dict.products.slogan.map((line, i) => (
              <div key={line}>
                <p className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={`text-2xl font-semibold tracking-tight ${
                    i === dict.products.slogan.length - 1
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Una sección por producto, alternando lados */}
      {products.map((p, i) => (
        <section key={p.slug} id={p.slug} className="scroll-mt-16 border-t">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <p className="mb-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · {p.category}
              </p>
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                {p.name}
                <Badge variant="secondary" className="font-mono">
                  {p.status}
                </Badge>
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                {p.description}
              </p>
              <ul className="mt-6 space-y-3 border-t pt-6">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="font-mono text-foreground">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-4">
                <Button asChild variant="outline">
                  <Link href={`/${lang}/products/${p.slug}`}>
                    {dict.products.viewDocs} <ArrowRight />
                  </Link>
                </Button>
                <span className="font-mono text-xs text-muted-foreground">
                  {p.version}
                </span>
              </div>
            </div>
            <Visual slug={p.slug} />
          </div>
        </section>
      ))}
    </>
  );
}
