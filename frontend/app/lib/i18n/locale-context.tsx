"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Dictionary, Locale } from "./types";
import { ptBR } from "./locales/pt-BR";
import { enUS } from "./locales/en-US";

const LOCALE_STORAGE_KEY = "postautomation:locale";
const DEFAULT_LOCALE: Locale = "pt-BR";

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

export const supportedLocales: { value: Locale; label: string; flag: string }[] = [
  { value: "pt-BR", label: "PT-BR", flag: "🇧🇷" },
  { value: "en-US", label: "EN-US", flag: "🇺🇸" },
];

function isLocale(value: string | null): value is Locale {
  return value === "pt-BR" || value === "en-US";
}

function detectBrowserLocale(): Locale {
  const language = window.navigator.language?.toLowerCase() ?? "";
  return language.startsWith("en") ? "en-US" : "pt-BR";
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      setLocaleState(isLocale(stored) ? stored : detectBrowserLocale());
    } catch {
      setLocaleState(detectBrowserLocale());
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Sem acesso ao localStorage (ex: modo privado) - a escolha vale só para a sessão atual.
    }
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale precisa ser usado dentro de um LocaleProvider");
  }
  return context;
}

export function useTranslations(): Dictionary {
  const { locale } = useLocale();
  return dictionaries[locale];
}
