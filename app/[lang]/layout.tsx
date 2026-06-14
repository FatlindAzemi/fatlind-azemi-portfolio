import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { type Locale, locales, isLocale, getMeta, defaultLocale } from "@/lib/i18n";

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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;

  return (
    <LanguageProvider initialLocale={locale}>
      <LanguageSwitcher />
      {children}
    </LanguageProvider>
  );
}
