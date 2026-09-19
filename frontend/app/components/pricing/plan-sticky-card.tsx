"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "../../lib/i18n/locale-context";
import type { PlanId } from "../../lib/i18n/types";
import { PRICING_PLANS, formatMonthlyPrice } from "./plans-data";

/**
 * Versão pequena do card de plano: só nome, preço e CTA - sem a lista de
 * recursos. Usada na coluna lateral fixa do detalhamento (desktop). No
 * mobile/tablet essa função é cumprida pela barra de CTA em plan-tabs-nav.tsx.
 */
export function PlanStickyCard({ planId }: { planId: PlanId }) {
  const t = useTranslations();
  const { locale } = useLocale();
  const meta = PRICING_PLANS.find((plan) => plan.id === planId);
  const plan = t.pricing.plans[planId];
  if (!meta) return null;

  return (
    <div
      className={`rounded-3xl p-6 ${
        meta.popular
          ? "home-glass-strong bg-linear-to-br from-blue-50/80 via-white to-white ring-2 ring-blue-400"
          : "home-glass-strong"
      }`}
    >
      {meta.popular ? (
        <span className="mb-3 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
          {t.pricing.popularBadge}
        </span>
      ) : null}
      <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
      <p className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-slate-900">
          {formatMonthlyPrice(meta.monthlyPrice, locale)}
        </span>
        <span className="text-sm text-slate-500">{t.pricing.period}</span>
      </p>
      <Link
        href="/cadastro"
        className={`mt-5 flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-[0_14px_30px_-10px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-0.5 ${
          meta.popular
            ? "bg-blue-600 text-white shadow-[0_14px_30px_-10px_rgba(37,99,235,0.5)]"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        {t.pricing.ctaPrefix} {plan.name}
      </Link>
    </div>
  );
}
