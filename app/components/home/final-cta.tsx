"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";

export function FinalCta() {
  const t = useTranslations();

  return (
    <section className="px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="home-glass-strong relative mx-auto max-w-3xl overflow-hidden rounded-4xl bg-linear-to-br from-blue-50/80 via-white/70 to-teal-50/80 px-6 py-16 text-center sm:px-12"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {t.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          {t.cta.subtitle}
        </p>
        <Link
          href="/cadastro"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-slate-800"
        >
          {t.cta.button}
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
