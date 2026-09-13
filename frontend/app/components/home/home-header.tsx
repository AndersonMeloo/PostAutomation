"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale, supportedLocales } from "../../lib/i18n/locale-context";

export function HomeHeader() {
  const t = useTranslations();
  const { locale, setLocale } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#recursos", label: t.header.navFeatures },
    { href: "#como-funciona", label: t.header.navHowItWorks },
    { href: "#plataformas", label: t.header.navPlatforms },
    { href: "#faq", label: t.header.navFaq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
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
        </div>
      ) : null}
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
    <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
      {supportedLocales.map((option, index) => (
        <span key={option.value} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onChange(option.value)}
            className={
              locale === option.value
                ? "text-slate-900"
                : "text-slate-400 transition-colors hover:text-slate-600"
            }
          >
            {option.label}
          </button>
          {index < supportedLocales.length - 1 ? <span className="text-slate-300">|</span> : null}
        </span>
      ))}
    </div>
  );
}
