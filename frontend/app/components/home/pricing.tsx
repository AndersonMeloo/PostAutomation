"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";

export function Pricing() {
  const t = useTranslations();

  return (
    <section id="precos" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
            {t.pricing.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t.pricing.subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3">
          {t.pricing.plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`home-card-hover relative flex flex-col rounded-3xl p-8 ${
                plan.popular
                  ? "home-glass-strong bg-linear-to-br from-blue-50/80 via-white to-white ring-2 ring-blue-400"
                  : "home-glass-strong"
              }`}
            >
              {plan.popular ? (
                <span className="absolute -top-3 right-8 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  {t.pricing.popularBadge}
                </span>
              ) : null}

              <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-500">{t.pricing.period}</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{plan.description}</p>

              <Link
                href="/cadastro"
                className={`mt-6 flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-[0_14px_30px_-10px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-0.5 ${
                  plan.popular
                    ? "bg-blue-600 text-white shadow-[0_14px_30px_-10px_rgba(37,99,235,0.5)]"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {t.pricing.ctaPrefix} {plan.name}
              </Link>

              <div className="mt-8 flex-1 border-t border-slate-100 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t.pricing.includesLabel}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <CircleCheckBig className="h-4 w-4 shrink-0 text-blue-500" />
                  <span className="text-sm text-slate-500">{t.pricing.detailsSoon}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
