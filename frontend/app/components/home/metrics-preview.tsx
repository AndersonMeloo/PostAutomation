"use client";

import { motion } from "framer-motion";
import { useTranslations } from "../../lib/i18n/locale-context";

const STAT_COLORS = ["text-red-600", "text-rose-600", "text-blue-600", "text-emerald-600"];

export function MetricsPreview() {
  const t = useTranslations();

  return (
    <section className="bg-linear-to-b from-white via-indigo-50/40 to-white px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
            {t.metrics.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {t.metrics.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t.metrics.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid grid-cols-2 gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:grid-cols-4 sm:p-10"
        >
          {t.metrics.stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className={`text-2xl font-semibold sm:text-3xl ${STAT_COLORS[index % STAT_COLORS.length]}`}>
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
