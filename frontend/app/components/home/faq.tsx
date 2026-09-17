"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";
import { SectionGlow } from "./section-glow";

export function Faq() {
  const t = useTranslations();
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden border-t border-slate-100 px-4 py-24 sm:px-6">
      <SectionGlow blobs={[{ position: "right-1/4 bottom-0 h-64 w-64", color: "bg-violet-200/12" }]} />
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
          {t.faq.kicker}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{t.faq.title}</h2>

        <div className="mt-10 space-y-10">
          {t.faq.categories.map((category) => (
            <div key={category.label} className="grid gap-4 sm:grid-cols-[180px_1fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {category.label}
              </p>

              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {category.items.map((item) => {
                  const isOpen = openQuestion === item.question;

                  return (
                    <div key={item.question}>
                      <button
                        type="button"
                        onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
                      >
                        <span className="text-sm font-medium text-slate-900 sm:text-base">
                          {item.question}
                        </span>
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
                            <p className="pb-4 text-sm leading-6 text-slate-600">{item.answer}</p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
