"use client";

import { useTranslations } from "../lib/i18n/locale-context";
import { SectionGlow } from "../components/home/section-glow";
import { PlanCard } from "../components/pricing/plan-card";
import { PlanDetailSection } from "../components/pricing/plan-detail-section";
import { PlanMobileCta } from "../components/pricing/plan-mobile-cta";
import { PaymentMethods } from "../components/pricing/payment-methods";
import { PricingFaq } from "../components/pricing/pricing-faq";
import { PRICING_PLANS } from "../components/pricing/plans-data";

export default function PricingPage() {
  const t = useTranslations();

  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pt-20">
        <SectionGlow
          blobs={[
            { position: "left-1/4 top-0 h-64 w-64", color: "bg-blue-200/20" },
            { position: "right-[12%] bottom-0 h-56 w-56", color: "bg-indigo-200/15" },
          ]}
        />
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
              {t.pricing.kicker}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              {t.pricing.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">{t.pricing.subtitle}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3">
            {PRICING_PLANS.map((plan, index) => (
              <PlanCard key={plan.id} planId={plan.id} index={index} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {PRICING_PLANS.map((plan) => (
          <PlanDetailSection key={plan.id} planId={plan.id} />
        ))}
      </div>

      <PaymentMethods />
      <PricingFaq />
      <PlanMobileCta />
    </div>
  );
}
