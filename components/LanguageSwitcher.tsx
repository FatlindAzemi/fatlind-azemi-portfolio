"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <nav
      aria-label="Language switcher"
      className="fixed top-5 right-5 md:top-6 md:right-6 z-50 flex items-center gap-0.5 p-1 rounded-full glass will-change-transform"
    >
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l as Locale)}
          className={`relative px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] transition-colors duration-300 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-azure/60 ${
            locale === l ? "text-white" : "text-white/40 hover:text-white/75"
          }`}
          aria-pressed={locale === l}
          aria-label={`Switch language to ${l === "de" ? "Deutsch" : "English"}`}
        >
          {locale === l && (
            <motion.span
              layoutId="language-pill"
              className="absolute inset-0 rounded-full bg-white/10 border border-white/8"
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            />
          )}
          <span className="relative z-10">{l}</span>
        </button>
      ))}
    </nav>
  );
}
