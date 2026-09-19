"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";
import { useLocale, useTranslations } from "../../lib/i18n/locale-context";
import type { PlanId } from "../../lib/i18n/types";
import { PRICING_PLANS, formatMonthlyPrice } from "./plans-data";

/** Card completo de comparação, usado no topo da página de preços. */
export function PlanCard({ planId, index }: { planId: PlanId; index: number }) {
  const t = useTranslations();
  const { locale } = useLocale();
  const meta = PRICING_PLANS.find((plan) => plan.id === planId);
  const plan = t.pricing.plans[planId];
  if (!meta) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`home-card-hover relative flex flex-col rounded-3xl p-8 ${
        meta.popular
          ? "home-glass-strong bg-linear-to-br from-blue-50/80 via-white to-white ring-2 ring-blue-400"
          : "home-glass-strong"
      }`}
    >
      {meta.popular ? (
        <span className="absolute -top-3 right-8 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
          {t.pricing.popularBadge}
        </span>
      ) : null}

      <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
      <p className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-slate-900">
          {formatMonthlyPrice(meta.monthlyPrice, locale)}
        </span>
        <span className="text-sm text-slate-500">{t.pricing.period}</span>
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{plan.tagline}</p>

      <Link
        href="/cadastro"
        className={`mt-6 flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-[0_14px_30px_-10px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-0.5 ${
          meta.popular
            ? "bg-blue-600 text-white shadow-[0_14px_30px_-10px_rgba(37,99,235,0.5)]"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        {t.pricing.ctaPrefix} {plan.name}
      </Link>

      <ul className="mt-8 flex-1 space-y-3 border-t border-slate-100 pt-6">
        {plan.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-sm text-slate-600">
            <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
            {highlight}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
