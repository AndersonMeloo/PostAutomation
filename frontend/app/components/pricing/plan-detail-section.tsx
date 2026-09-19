"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheckBig, Plus } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";
import type { PlanId } from "../../lib/i18n/types";
import { PlanStickyCard } from "./plan-sticky-card";

/**
 * Bloco de detalhamento de um plano: card pequeno fixo na lateral (desktop)
 * ou em barra horizontal fixa no topo (mobile), ao lado do conteúdo longo.
 * O "handoff" entre planos ao rolar é feito só com position: sticky nativo -
 * cada plano é sua própria seção, então o card de um plano some sozinho
 * assim que a seção termina, e o próximo assume. Sem JS calculando scroll.
 */
export function PlanDetailSection({ planId }: { planId: PlanId }) {
  const t = useTranslations();
  const plan = t.pricing.plans[planId];
  const labels = t.pricing.sectionLabels;
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section id={`plano-${planId}`} className="scroll-mt-16 border-t border-slate-100 py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <PlanStickyCard planId={planId} />
        </aside>

        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{plan.name}</h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-indigo-500">
              {labels.forWho}
            </p>
            <p className="mt-2 leading-7 text-slate-600">{plan.forWho}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {labels.features}
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {labels.limits}
              </p>
              <ul className="mt-3 space-y-2">
                {plan.limits.map((limit) => (
                  <li key={limit} className="text-sm leading-6 text-slate-600">
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {labels.differentiators}
              </p>
              <ul className="mt-3 space-y-2">
                {plan.differentiators.map((item) => (
                  <li key={item} className="text-sm leading-6 text-slate-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{labels.usage}</p>
            <ul className="mt-3 space-y-2">
              {plan.usageNotes.map((note) => (
                <li key={note} className="text-sm leading-6 text-slate-600">
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{labels.faq}</p>
            <div className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-100">
              {plan.faq.map((item) => {
                const isOpen = openQuestion === item.question;

                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-sm font-medium text-slate-900">{item.question}</span>
                      <Plus
                        size={16}
                        className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-sm leading-6 text-slate-600">{item.answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
