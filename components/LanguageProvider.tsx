"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { type Locale, locales, isLocale, t } from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : null;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Keep provider state in sync with browser back/forward. The initial locale
  // arrives from the server via `initialLocale`, so we only need to react to
  // popstate (pushState is handled inside `setLocale` below).
  useEffect(() => {
    const handlePopState = () => {
      const detected = resolveLocaleFromPath(window.location.pathname);
      if (detected && detected !== locale) {
        setLocaleState(detected);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (!locales.includes(newLocale) || newLocale === locale) return;

      const pathname = window.location.pathname;
      const segments = pathname.split("/").filter(Boolean);
      const hasLocalePrefix = isLocale(segments[0]);
      const rest = hasLocalePrefix ? segments.slice(1).join("/") : segments.join("/");
      const newPath = `/${newLocale}${rest ? `/${rest}` : ""}${window.location.search}${window.location.hash}`;

      window.history.pushState({ locale: newLocale }, "", newPath);
      setLocaleState(newLocale);
      window.dispatchEvent(new Event("languagechange"));
    },
    [locale]
  );

  const translate = useCallback(
    (key: string, vars?: Record<string, string | number>) => t(locale, key, vars),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t: translate }),
    [locale, setLocale, translate]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
