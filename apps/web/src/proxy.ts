import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"] as const;
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  // ponytail: inglés fijo por defecto; para detectar idioma del navegador, lee accept-language aquí
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Salta internos, API y archivos con extensión (assets)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
