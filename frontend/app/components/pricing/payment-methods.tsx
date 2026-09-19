"use client";

import { motion } from "framer-motion";
import { useTranslations } from "../../lib/i18n/locale-context";
import type { PaymentMethodId } from "../../lib/i18n/types";
import { BoletoIcon, MastercardIcon, PixIcon, VisaIcon } from "../home/icons";

const METHOD_ICONS: Record<PaymentMethodId, typeof VisaIcon> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  pix: PixIcon,
  boleto: BoletoIcon,
};

export function PaymentMethods() {
  const t = useTranslations();
  const { kicker, title, subtitle, methods } = t.pricing.paymentMethods;

  return (
    <section className="border-t border-slate-100 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">{kicker}</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">{subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {methods.map((method, index) => {
            const Icon = METHOD_ICONS[method.id];
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="home-card-hover flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4"
              >
                <Icon className="h-8 w-auto shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{method.label}</p>
                  <p className="text-xs text-slate-500">{method.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
