"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslations, useLocale, supportedLocales } from "../../lib/i18n/locale-context";
import { GoogleIcon, BrazilFlagIcon, UnitedStatesFlagIcon } from "../home/icons";
import { getGoogleLoginUrl } from "../../lib/api";

const FLAG_ICONS = {
  "pt-BR": BrazilFlagIcon,
  "en-US": UnitedStatesFlagIcon,
} as const;

type AuthShellProps = {
  kicker: string;
  title: string;
  subtitle: string;
  switchPrompt: string;
  switchCta: string;
  switchHref: string;
  children: ReactNode;
};

export function AuthShell({
  kicker,
  title,
  subtitle,
  switchPrompt,
  switchCta,
  switchHref,
  children,
}: AuthShellProps) {
  const t = useTranslations();
  const { locale, setLocale } = useLocale();

  return (
    <div className="home-canvas relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16">
      <Link
        href="/"
        className="home-glass absolute left-4 top-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:left-6 sm:top-6"
      >
        ← {t.auth.backToHome}
      </Link>

      <div className="absolute right-4 top-4 flex items-center gap-1.5 sm:right-6 sm:top-6">
        {supportedLocales.map((option) => {
          const FlagIcon = FLAG_ICONS[option.value];
          const isActive = locale === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setLocale(option.value)}
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

      <div className="home-glass-strong relative w-full max-w-md rounded-4xl p-8 sm:p-10">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          PostAutomation
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
          {kicker}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>

        <a
          href={getGoogleLoginUrl()}
          className="mt-6 flex items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          <GoogleIcon className="h-4.5 w-4.5" />
          {t.auth.shared.googleCta}
        </a>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {t.auth.shared.dividerLabel}
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="mt-6">{children}</div>

        <p className="mt-6 text-center text-sm text-slate-600">
          {switchPrompt}{" "}
          <Link href={switchHref} className="font-semibold text-indigo-600 hover:text-indigo-700">
            {switchCta}
          </Link>
        </p>
      </div>
    </div>
  );
}
