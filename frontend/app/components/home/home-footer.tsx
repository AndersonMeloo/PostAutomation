"use client";

import Link from "next/link";
import { useTranslations } from "../../lib/i18n/locale-context";

export function HomeFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold text-slate-900">PostAutomation</p>
          <p className="mt-1 text-sm text-slate-500">{t.footer.tagline}</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-500">
          <Link href="/login" className="hover:text-slate-800">
            {t.header.login}
          </Link>
          <Link href="/cadastro" className="hover:text-slate-800">
            {t.header.signup}
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        © {year} PostAutomation. {t.footer.rights}
      </p>
    </footer>
  );
}
