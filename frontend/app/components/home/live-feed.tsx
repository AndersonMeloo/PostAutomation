"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "../../lib/i18n/locale-context";
import { FEATURE_STYLES, type FeatureId } from "./feature-colors";

const SATELLITE_IDS: FeatureId[] = ["youtube", "instagram", "tiktok"];

const ITEM_FEATURE: Record<"publish" | "metrics" | "aiClip", FeatureId> = {
  publish: "youtube",
  metrics: "metrics",
  aiClip: "aiClip",
};

export function LiveFeed() {
  const t = useTranslations();
  const [items, setItems] = useState(t.liveFeed.items);

  useEffect(() => {
    setItems(t.liveFeed.items);
  }, [t.liveFeed.items]);

  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => (prev.length > 1 ? [...prev.slice(1), prev[0]] : prev));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="recursos" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
            {t.liveFeed.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {t.liveFeed.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t.liveFeed.subtitle}</p>
        </div>

        <div className="mt-16 rounded-4xl bg-linear-to-br from-indigo-50 via-cyan-50 to-emerald-50 p-6 sm:p-12">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-center text-xs font-semibold text-white shadow-lg">
                  {t.liveFeed.centerLabel}
                </div>
              </div>

              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              >
                {SATELLITE_IDS.map((id, index) => {
                  const style = FEATURE_STYLES[id];
                  const Icon = style.icon;
                  const angle = (360 / SATELLITE_IDS.length) * index;

                  return (
                    <div
                      key={id}
                      className="absolute left-1/2 top-1/2 h-0 w-0"
                      style={{ transform: `rotate(${angle}deg) translate(130px)` }}
                    >
                      <motion.div
                        className={`flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${style.softIconBg} shadow-md ring-1 ${style.ring}`}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon className={`h-6 w-6 ${style.softIconColor}`} />
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="flex flex-col gap-3">
              {items.map((item) => {
                const style = FEATURE_STYLES[ITEM_FEATURE[item.id]];
                const Icon = style.icon;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.2)]"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${style.softIconBg}`}>
                      <Icon className={`h-5 w-5 ${style.softIconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-slate-400">{item.time}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
