import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LangSwitch } from "@/components/lang-switch";
import { getDictionary, hasLocale } from "../dictionaries";
import { notFound } from "next/navigation";

// ponytail: enlaces mock estilo Vercel; labels (productos/columnas) son nombres propios, no se traducen
type FooterLink = { href: string; label: string; badge?: string };
const footerCols: { key: string; links: FooterLink[] }[] = [
  {
    key: "platform",
    links: [
      { href: "/products", label: "Compute" },
      { href: "/products", label: "Edge Network" },
      { href: "/products", label: "Storage" },
      { href: "/products", label: "Observability" },
      { href: "/products", label: "Connect", badge: "NEW" },
      { href: "/products", label: "Passport", badge: "NEW" },
    ],
  },
  {
    key: "data",
    links: [
      { href: "/products", label: "Postgres" },
      { href: "/products", label: "Realtime" },
      { href: "/products", label: "Vector", badge: "NEW" },
      { href: "/products", label: "Queues" },
      { href: "/products", label: "Cache" },
    ],
  },
  {
    key: "security",
    links: [
      { href: "/products", label: "Auth" },
      { href: "/products", label: "WAF" },
      { href: "/products", label: "Bot ID", badge: "NEW" },
      { href: "/products", label: "Secrets" },
    ],
  },
  {
    key: "tools",
    links: [
      { href: "/lab", label: "Hemia CLI" },
      { href: "/lab", label: "SDK", badge: "NEW" },
      { href: "/lab", label: "Agents" },
      { href: "/lab", label: "Templates" },
      { href: "/lab", label: "Marketplace" },
    ],
  },
  {
    key: "resources",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/blog", label: "Blog" },
      { href: "/changelog", label: "Changelog" },
      { href: "/docs", label: "Guides" },
      { href: "/docs", label: "API reference" },
    ],
  },
  {
    key: "explore",
    links: [
      { href: "/about", label: "Customers" },
      { href: "/products", label: "Use cases" },
      { href: "/lab", label: "Prototypes" },
      { href: "/about", label: "Partners" },
    ],
  },
  {
    key: "company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about", label: "Careers" },
      { href: "/about", label: "Press" },
      { href: "/contact", label: "Contact" },
      { href: "/about", label: "Enterprise" },
    ],
  },
  {
    key: "legal",
    links: [
      { href: "/about", label: "Privacy" },
      { href: "/about", label: "Terms" },
      { href: "/about", label: "Cookies" },
      { href: "/about", label: "Status" },
    ],
  },
  {
    key: "social",
    links: [
      { href: "https://github.com/hemia-labs", label: "GitHub" },
      { href: "https://x.com", label: "X" },
      { href: "https://linkedin.com", label: "LinkedIn" },
      { href: "https://youtube.com", label: "YouTube" },
    ],
  },
];

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.nav;
  const f = dict.footer;

  // Prefija enlaces internos con el locale; deja pasar externos
  const href = (path: string) => (path.startsWith("http") ? path : `/${lang}${path}`);

  const nav = [
    { href: "/products", label: t.products },
    { href: "/open-source", label: t.openSource },
    { href: "/standards", label: t.standards },
    { href: "/resources", label: t.resources },
    { href: "/engineering", label: t.engineering },
    { href: "/lab", label: t.labs },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
          <Link href={href("/")} className="flex items-center">
            <Image src="/logo.webp" alt="Hemia" width={28} height={28} priority />
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={href(item.href)}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <LangSwitch lang={lang} />
            <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
              <a href="https://github.com/hemia-labs" target="_blank" rel="noreferrer">
                {t.github}
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href="https://hemia.mx" target="_blank" rel="noreferrer">
                {t.ecosystem}
              </a>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-6">
            {footerCols.map((col) => (
              <div key={col.key}>
                <p className="mb-4 text-sm font-medium">
                  {f.cols[col.key as keyof typeof f.cols]}
                </p>
                <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={href(link.href)}
                      className="flex items-center gap-2 transition-colors hover:text-foreground"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="rounded border px-1 font-mono text-[10px] uppercase leading-tight text-muted-foreground">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <Link
              href={href("/")}
              className="font-mono text-sm font-semibold tracking-tight text-foreground"
            >
              hemia<span className="text-primary">.dev</span>
            </Link>
            <p className="font-mono">
              © {new Date().getFullYear()} Hemia — {f.rights}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
