"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Clapperboard,
  Image as ImageIcon,
  Send,
  Smartphone,
  TrendingUp,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";
import { FEATURE_STYLES, type FeatureId } from "./feature-colors";
import { TikTokIcon, YouTubeIcon, InstagramIcon } from "./icons";

const SATELLITE_IDS: FeatureId[] = ["youtube", "instagram", "tiktok"];

const INPUT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  youtube: YouTubeIcon,
  shorts: Smartphone,
  longform: Clapperboard,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  upload: UploadCloud,
  schedule: Calendar,
};

const STAGE_STYLES: Record<string, { icon: React.ComponentType<{ className?: string }>; iconBg: string; iconColor: string }> = {
  scheduling: { icon: Calendar, iconBg: FEATURE_STYLES.scheduling.softIconBg, iconColor: FEATURE_STYLES.scheduling.softIconColor },
  publishing: { icon: Send, iconBg: FEATURE_STYLES.youtube.softIconBg, iconColor: FEATURE_STYLES.youtube.softIconColor },
  metrics: { icon: TrendingUp, iconBg: FEATURE_STYLES.metrics.softIconBg, iconColor: FEATURE_STYLES.metrics.softIconColor },
  aiClip: { icon: Sparkles, iconBg: FEATURE_STYLES.aiClip.softIconBg, iconColor: FEATURE_STYLES.aiClip.softIconColor },
};

const RESULT_FEATURE: Record<string, FeatureId> = {
  publish: "youtube",
  metrics: "metrics",
  aiClip: "aiClip",
  schedule: "scheduling",
  thumbnail: "aiClip",
};

const RESULT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  publish: Send,
  metrics: TrendingUp,
  aiClip: Sparkles,
  schedule: Calendar,
  thumbnail: ImageIcon,
};

const INPUT_VISIBLE = 4;
const RESULT_VISIBLE = 3;

export function LiveFeed() {
  const t = useTranslations();
  const [inputs, setInputs] = useState(t.liveFeed.inputs);
  const [results, setResults] = useState(t.liveFeed.items);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    setInputs(t.liveFeed.inputs);
    setResults(t.liveFeed.items);
    setStageIndex(0);
  }, [t.liveFeed.inputs, t.liveFeed.items]);

  useEffect(() => {
    const id = setInterval(() => {
      setInputs((prev) => (prev.length > 1 ? [...prev.slice(1), prev[0]] : prev));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setResults((prev) => (prev.length > 1 ? [...prev.slice(1), prev[0]] : prev));
    }, 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % t.liveFeed.stages.length);
    }, 2800);
    return () => clearInterval(id);
  }, [t.liveFeed.stages.length]);

  const visibleInputs = inputs.slice(0, INPUT_VISIBLE);
  const visibleResults = results.slice(0, RESULT_VISIBLE);
  const stage = t.liveFeed.stages[stageIndex];
  const stageStyle = STAGE_STYLES[stage.id];
  const StageIcon = stageStyle.icon;

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

        <div className="home-glass mt-16 rounded-4xl bg-linear-to-br from-blue-50/80 via-white/60 to-teal-50/80 p-6 sm:p-12">
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1fr_1.1fr]">
            {/* Entrada: fila de formatos/plataformas alternando */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t.liveFeed.inputLabel}
              </p>
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleInputs.map((input) => {
                    const Icon = INPUT_ICONS[input.id];
                    return (
                      <motion.div
                        key={input.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
                          <Icon className="h-3.5 w-3.5 text-slate-600" />
                        </span>
                        <span className="truncate text-sm font-medium text-slate-700">
                          {input.label}
                        </span>
                        {input.comingSoon ? (
                          <span className="ml-auto shrink-0 text-[10px] font-medium text-amber-500">
                            {t.hero.comingSoon}
                          </span>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Processamento: orbita das plataformas + estágio atual */}
            <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
              {/* Trilha da órbita */}
              <div className="absolute left-1/2 top-1/2 h-65 w-65 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300/60" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-center text-xs font-semibold text-white shadow-[0_16px_40px_-12px_rgba(15,23,42,0.5)]">
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
                    <div key={id}>
                      {/* Linha conectando o centro ao satélite */}
                      <div
                        className="absolute left-1/2 top-1/2 h-32.5 w-px origin-top bg-linear-to-b from-slate-300/0 via-slate-300/70 to-slate-300/70"
                        style={{ transform: `rotate(${angle}deg)` }}
                      />
                      <div
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
                    </div>
                  );
                })}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-lg ring-1 ring-slate-100"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${stageStyle.iconBg}`}>
                    <StageIcon className={`h-3.5 w-3.5 ${stageStyle.iconColor}`} />
                  </span>
                  <span className="whitespace-nowrap text-xs font-semibold text-slate-700">
                    {stage.label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Resultado: feed de eventos do produto */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t.liveFeed.resultLabel}
              </p>
              <div className="flex flex-col gap-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleResults.map((item) => {
                    const style = FEATURE_STYLES[RESULT_FEATURE[item.id]];
                    const Icon = RESULT_ICONS[item.id];
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="home-card-hover flex items-center gap-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.2)] backdrop-blur-sm"
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
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
