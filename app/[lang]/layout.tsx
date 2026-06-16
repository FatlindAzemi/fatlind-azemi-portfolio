import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "../globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { type Locale, isLocale, getMeta, defaultLocale } from "@/lib/i18n";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const meta = getMeta(locale);

  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      "Fatlind Azemi",
      "Data Engineer",
      "Azure",
      "Databricks",
      "AI Expert",
      "Cloud Architect",
      "Big Data",
      "Data Lake",
      "AutoML",
      "Power BI",
    ],
    authors: [{ name: "Fatlind Azemi" }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
    },
  };
}

import ClientLogger from "@/components/ClientLogger";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${outfit.variable} ${geistMono.variable} font-sans bg-background text-gray-100 antialiased w-full min-h-screen overflow-x-hidden overflow-y-auto`}
      >
        <ClientLogger />
        <NoiseOverlay opacity={0.035} />
        <CustomCursor />
        <LanguageProvider initialLocale={locale}>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
