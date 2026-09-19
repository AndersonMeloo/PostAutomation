"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";

/**
 * FAQ geral da página de preços (cobrança/pagamento) - inspirada em painéis
 * de preço estilo Stripe: faixa de título + lista de linhas com borda e
 * chevron circular, mas com as cores e o raio de borda da nossa marca em vez
 * de copiar 1:1 o visual de referência. Estilo deliberadamente diferente do
 * FAQ da Home (home/faq.tsx), que usa categorias e um ícone "+".
 */
export function PricingFaq() {
  const t = useTranslations();
  const { title, items } = t.pricing.faqSection;
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section className="border-t border-slate-100 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200">
        <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white px-6 py-8 sm:px-10 sm:py-10">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
        </div>

        <div className="divide-y divide-slate-100 bg-white">
          {items.map((item) => {
            const isOpen = openQuestion === item.question;

            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left sm:px-10"
                >
                  <span className="text-sm font-medium text-slate-900 sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
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
                      <p className="px-6 pb-5 text-sm leading-6 text-slate-600 sm:px-10">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
