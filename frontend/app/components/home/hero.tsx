"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";
import { FEATURE_STYLES } from "./feature-colors";

const BADGE_POSITIONS = [
  "left-[4%] top-[12%]",
  "left-[12%] top-[62%]",
  "right-[6%] top-[8%]",
  "right-[10%] top-[58%]",
  "left-[25%] top-[90%]",
  "right-[23%] top-[86%]",
];

export function Hero() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden px-4 pb-28 pt-20 sm:px-6 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute right-1/4 top-24 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute right-[10%] bottom-10 h-52 w-52 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute left-[8%] bottom-24 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500"
        >
          {t.hero.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
        >
          {t.hero.titleLine1}
          <br />
          <span className="text-indigo-600">{t.hero.titleAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-slate-800"
          >
            {t.hero.primaryCta}
            <ArrowRight size={16} />
          </Link>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            {t.hero.secondaryCta}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-slate-500"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t.support.label}
        </motion.p>
      </div>

      {/* Badges flutuantes - só no desktop, para manter o hero limpo no mobile */}
      <div className="relative mx-auto mt-16 hidden h-64 max-w-5xl md:block">
        {t.hero.badges.map((badge, index) => {
          const style = FEATURE_STYLES[badge.id];
          const Icon = style.icon;

          return (
            <motion.div
              key={badge.id}
              className={`absolute flex items-center gap-2 ${BADGE_POSITIONS[index % BADGE_POSITIONS.length]}`}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5 + (index % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.35,
              }}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.iconBg} shadow-md`}>
                <Icon className={`h-4 w-4 ${style.iconColor}`} />
              </span>
              <span
                className={`flex items-center gap-1.5 rounded-full ${style.pill} px-4 py-2 text-sm font-medium ${style.pillText} shadow-[0_10px_30px_-12px_rgba(15,23,42,0.35)]`}
              >
                {badge.label}
                {badge.comingSoon ? (
                  <span className={`text-xs font-normal ${style.pillMuted}`}>
                    · {t.hero.comingSoon}
                  </span>
                ) : null}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Versão compacta dos badges para mobile */}
      <div className="mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-4 md:hidden">
        {t.hero.badges.map((badge) => {
          const style = FEATURE_STYLES[badge.id];
          const Icon = style.icon;

          return (
            <span key={badge.id} className="flex items-center gap-2">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${style.iconBg} shadow-md`}>
                <Icon className={`h-3.5 w-3.5 ${style.iconColor}`} />
              </span>
              <span
                className={`flex items-center gap-1 rounded-full ${style.pill} px-3 py-1.5 text-xs font-medium ${style.pillText}`}
              >
                {badge.label}
              </span>
            </span>
          );
        })}
      </div>
    </section>
  );
}
