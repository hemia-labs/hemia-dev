"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const langs = ["en", "es"] as const;

export function LangSwitch({ lang }: { lang: string }) {
  const pathname = usePathname();
  // Reemplaza el primer segmento (locale) por el destino
  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground/40">/</span>}
          <Link
            href={`/${l}${rest === "/" ? "" : rest}`}
            className={cn(
              "uppercase transition-colors hover:text-foreground",
              l === lang ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
