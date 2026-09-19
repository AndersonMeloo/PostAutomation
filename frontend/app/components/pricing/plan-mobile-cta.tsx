"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "../../lib/i18n/locale-context";
import type { PlanId } from "../../lib/i18n/types";
import { PRICING_PLANS, formatMonthlyPrice } from "./plans-data";

/**
 * Barra de CTA fixa no rodapé, só no mobile/tablet - no desktop essa função
 * já é do card lateral sticky. Mostra o plano em foco, calculado com o
 * mesmo truque de IntersectionObserver + rootMargin já usado no índice do
 * Blog (article-toc.tsx), e só fica visível enquanto alguma seção de plano
 * está na tela - some ao entrar nos métodos de pagamento, no FAQ ou no
 * rodapé, e também antes de chegar no detalhamento.
 */
export function PlanMobileCta() {
  const t = useTranslations();
  const { locale } = useLocale();
  const [activeId, setActiveId] = useState<PlanId>(PRICING_PLANS[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = PRICING_PLANS.map((plan) => document.getElementById(`plano-${plan.id}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id.replace("plano-", "");
          if (entry.isIntersecting) {
            visibleIds.add(id);
            setActiveId(id as PlanId);
          } else {
            visibleIds.delete(id);
          }
        }
        setVisible(visibleIds.size > 0);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const activeMeta = PRICING_PLANS.find((plan) => plan.id === activeId) ?? PRICING_PLANS[0];
  const activePlan = t.pricing.plans[activeId];

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-30 lg:hidden">
      <div className="home-glass-strong flex items-center justify-between gap-3 rounded-full px-5 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{activePlan.name}</p>
          <p className="text-xs text-slate-500">
            {formatMonthlyPrice(activeMeta.monthlyPrice, locale)}
            {t.pricing.period}
          </p>
        </div>
        <Link
          href="/cadastro"
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 ${
            activeMeta.popular ? "bg-blue-600" : "bg-slate-900"
          }`}
        >
          {t.pricing.ctaPrefix}
        </Link>
      </div>
    </div>
  );
}
