"use client";

import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle, UserPlus } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";

const STAT_GRADIENTS = [
  "bg-linear-to-br from-cyan-400 to-teal-600",
  "bg-linear-to-br from-violet-500 to-purple-700",
  "bg-linear-to-br from-fuchsia-500 to-pink-600",
  "bg-linear-to-br from-blue-500 to-indigo-700",
];

// Segue a mesma ordem de t.metrics.stats: Visualizações, Curtidas, Comentários, Inscritos ganhos.
const STAT_ICONS = [Eye, Heart, MessageCircle, UserPlus];

export function MetricsPreview() {
  const t = useTranslations();

  return (
    <section className="px-4 py-24 sm:px-6">
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

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.metrics.stats.map((stat, index) => {
            const Icon = STAT_ICONS[index % STAT_ICONS.length];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`home-card-hover relative overflow-hidden rounded-3xl p-6 ${STAT_GRADIENTS[index % STAT_GRADIENTS.length]}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[14px_14px] opacity-15" />
                <p className="relative text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                <div className="relative mt-3 flex items-center gap-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-sm">
                    {stat.label}
                  </p>
                  <Icon className="h-3.5 w-3.5 shrink-0 text-white/70" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
