import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import "../globals.css";
import { cn } from "@/lib/utils";
import { i18n } from "@/lib/i18n";
import { hasLocale, locales } from "./dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { provider } = defineI18nUI(i18n, {
  en: { displayName: "English" },
  es: { displayName: "Español" },
});

export const metadata: Metadata = {
  title: {
    default: "Hemia — tools for people who build",
    template: "%s · Hemia",
  },
  description: "Hemia builds products and tools for developers.",
  metadataBase: new URL("https://hemia.dev"),
  openGraph: { images: ["/og.webp"] },
  twitter: { card: "summary_large_image", images: ["/og.webp"] },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn("antialiased", geistSans.variable, geistMono.variable)}
    >
      <body className="flex min-h-dvh flex-col font-sans">
        <RootProvider theme={{ defaultTheme: "dark" }} i18n={provider(lang)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
