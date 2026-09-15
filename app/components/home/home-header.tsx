"use client";

import Link from "next/link";
import { useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations, useLocale, supportedLocales } from "../../lib/i18n/locale-context";
import { BrazilFlagIcon, UnitedStatesFlagIcon } from "./icons";

const FLAG_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "pt-BR": BrazilFlagIcon,
  "en-US": UnitedStatesFlagIcon,
};

export function HomeHeader() {
  const t = useTranslations();
  const { locale, setLocale } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#recursos", label: t.header.navFeatures },
    { href: "#como-funciona", label: t.header.navHowItWorks },
    { href: "#plataformas", label: t.header.navPlatforms },
    { href: "#precos", label: t.pricing.kicker },
    { href: "#faq", label: t.header.navFaq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white shadow-[0_1px_0_rgba(255,255,255,0.5)] md:static">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          PostAutomation
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} onChange={setLocale} />
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            {t.header.login}
          </Link>
          <Link
            href="/cadastro"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-slate-800"
          >
            {t.header.signup}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          aria-label="Menu"
        >
          <span className="relative flex h-4 w-5 items-center justify-center">
            <motion.span
              className="absolute h-0.5 w-5 rounded-full bg-current"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 0 : -4 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute h-0.5 w-5 rounded-full bg-current"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? 0 : 4 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
          </span>
        </button>
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {mobileOpen ? (
                <>
                  <motion.div
                    key="mobile-menu-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-x-0 bottom-0 top-16 z-30 bg-slate-900/20 md:hidden"
                  />
                  <motion.div
                    key="mobile-menu-panel"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="fixed inset-x-0 top-16 z-40 border-t border-slate-100 bg-white px-4 py-4 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.25)] md:hidden"
                  >
                    <nav className="flex flex-col gap-3">
                      {navLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm font-medium text-slate-700"
                        >
                          {link.label}
                        </a>
                      ))}
                    </nav>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <LanguageSwitcher locale={locale} onChange={setLocale} />
                      <div className="flex items-center gap-3">
                        <Link href="/login" className="text-sm font-medium text-slate-700">
                          {t.header.login}
                        </Link>
                        <Link
                          href="/cadastro"
                          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                        >
                          {t.header.signup}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </header>
  );
}

function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: string;
  onChange: (value: "pt-BR" | "en-US") => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {supportedLocales.map((option) => {
        const FlagIcon = FLAG_ICONS[option.value];
        const isActive = locale === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-label={option.label}
            aria-pressed={isActive}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all ${
              isActive ? "opacity-100" : "opacity-50 hover:opacity-90"
            }`}
          >
            <FlagIcon className="h-6 w-6 rounded-full" />
          </button>
        );
      })}
    </div>
  );
}
