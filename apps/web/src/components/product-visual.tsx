import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

// Terminal con reveal secuencial CSS-only (una pasada al montar) + cursor parpadeante.
// ponytail: sin JS; client component solo si se quiere loop/typing real
function Terminal({ title, lines }: { title: string; lines: React.ReactNode[] }) {
  return (
    <Panel title={title}>
      {lines.map((line, i) => (
        <p
          key={i}
          className="fade-in slide-in-from-left-2 fill-mode-both animate-in duration-300"
          style={{ animationDelay: `${i * 350}ms` }}
        >
          {line}
        </p>
      ))}
      <p
        className="fade-in fill-mode-both animate-in"
        style={{ animationDelay: `${lines.length * 350}ms` }}
      >
        <span className="text-primary">$</span>{" "}
        <span className="inline-block h-3.5 w-2 animate-pulse bg-foreground align-text-bottom" />
      </p>
    </Panel>
  );
}

// ponytail: visuales mock por slug; sustituir por screenshots/demos reales cuando existan
export function ProductVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "skeletree":
      return (
        <Terminal
          title="skeletree — zsh"
          lines={[
            <>
              <span className="text-primary">$</span> skeletree index .
            </>,
            <span className="text-foreground">
              ✓ 1,240 archivos · 8,932 símbolos → graph.db (0.9s)
            </span>,
            <>
              <span className="text-primary">$</span> skeletree mcp
            </>,
            <span className="text-foreground">◆ servidor MCP listo · stdio</span>,
            <>
              <span className="text-primary">$</span> query "callers of parseConfig"
            </>,
            <span className="text-foreground">→ 3 hits · 412 tokens</span>,
            <span className="pl-2">config.ts:parseConfig ← cli.ts:main</span>,
            <span className="pl-2">config.ts:parseConfig ← watch.ts:reload</span>,
          ]}
        />
      );
    case "docrail":
      return (
        <Terminal
          title="docrail — zsh"
          lines={[
            <>
              <span className="text-primary">$</span> docrail render nda --data
              payload.json
            </>,
            <span className="pl-2">{'{ party: "Acme", term: "2y" }'}</span>,
            <span className="text-foreground">
              ✓ nda.pdf · nda.docx · nda.html — determinístico
            </span>,
            <span className="text-foreground">◆ cláusulas v3 aprobadas · marca aplicada</span>,
            <>
              <span className="text-primary">$</span> docrail mcp
            </>,
            <span className="text-foreground">◆ servidor MCP listo · 12 plantillas</span>,
            <span className="pl-2">los agentes escriben JSON → Docrail escribe el documento</span>,
          ]}
        />
      );
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
