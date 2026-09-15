"use client";

import { motion } from "framer-motion";
import { CircleCheckBig, Clapperboard, ChevronUp, EyeOff, Play, Sparkles, TrendingUp } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";

const SEGMENT_COLORS = ["#FF0000", "#3b82f6", "#10b981"];
const SEGMENT_BADGE_POSITIONS = [
  "-right-2 -top-3",
  "-bottom-3 left-1/2 -translate-x-1/2",
  "-left-4 top-1/3",
];

export function Benefits() {
  const t = useTranslations();
  const { chart, anonymity, proof, monetization } = t.benefits;

  let cursor = 0;
  const gradientStops = chart.segments
    .map((segment, index) => {
      const start = cursor;
      cursor += segment.percent;
      return `${SEGMENT_COLORS[index % SEGMENT_COLORS.length]} ${start}% ${cursor}%`;
    })
    .join(", ");

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
            {t.benefits.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {t.benefits.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t.benefits.subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="home-card-hover flex h-95 flex-col items-center justify-between rounded-3xl border border-white/70 bg-linear-to-br from-rose-100 via-white to-sky-100 p-6 shadow-[0_1px_1px_rgba(15,23,42,0.03),0_16px_40px_-16px_rgba(15,23,42,0.14),0_40px_80px_-32px_rgba(15,23,42,0.12)]"
          >
            <div className="relative mt-4 h-36 w-36">
              <div
                className="h-full w-full rounded-full"
                style={{ background: `conic-gradient(${gradientStops})` }}
              />
              <div className="absolute inset-[16%] flex items-center justify-center rounded-full bg-white shadow-inner">
                <Clapperboard className="h-6 w-6 text-slate-700" />
              </div>
              {chart.segments.map((segment, index) => (
                <span
                  key={segment.label}
                  className={`absolute flex items-center gap-1 rounded-full border border-slate-100 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-md ${SEGMENT_BADGE_POSITIONS[index % SEGMENT_BADGE_POSITIONS.length]}`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }}
                  />
                  {segment.percent}%
                </span>
              ))}
            </div>
            <p className="text-center text-sm font-medium leading-6 text-slate-700">
              {chart.caption}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="home-card-hover flex h-95 flex-col items-center justify-between rounded-3xl border border-white/70 bg-linear-to-br from-violet-100 via-white to-blue-100 p-6 shadow-[0_1px_1px_rgba(15,23,42,0.03),0_16px_40px_-16px_rgba(15,23,42,0.14),0_40px_80px_-32px_rgba(15,23,42,0.12)]"
          >
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500 text-white shadow-[0_10px_24px_-8px_rgba(139,92,246,0.6)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="-ml-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-[0_10px_24px_-8px_rgba(59,130,246,0.6)]">
                  <TrendingUp className="h-5 w-5" />
                </span>
              </div>
              <ChevronUp className="h-4 w-4 text-slate-300" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
                <EyeOff className="h-6 w-6" />
              </span>
            </div>
            <p className="text-center text-sm font-medium leading-6 text-slate-700">
              {anonymity.caption}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="home-card-hover relative flex h-95 flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-6 text-white"
          >
            <video
              src="/80K.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/40" />
            <span className="relative flex h-10 w-10 items-center justify-center self-end rounded-full bg-white/20 backdrop-blur-sm">
              <Play className="h-4 w-4 fill-white text-white" />
            </span>
            <div className="relative">
              <p className="text-4xl font-bold sm:text-5xl">{proof.statValue}</p>
              <p className="mt-1 text-sm text-white/80">{proof.statLabel}</p>
              <p className="mt-4 text-sm font-medium text-white/95">{proof.caption}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="home-card-hover flex h-95 flex-col items-center justify-between rounded-3xl border border-white/70 bg-linear-to-br from-emerald-100 via-white to-teal-100 p-6 shadow-[0_1px_1px_rgba(15,23,42,0.03),0_16px_40px_-16px_rgba(15,23,42,0.14),0_40px_80px_-32px_rgba(15,23,42,0.12)]"
          >
            <div className="mt-2 w-36 rounded-[28px] bg-slate-900 p-1.5 shadow-[0_20px_40px_-16px_rgba(15,23,42,0.5)]">
              <div className="rounded-[22px] bg-white p-3">
                <div className="mx-auto h-1 w-8 rounded-full bg-slate-200" />
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {monetization.channelLabel}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">{monetization.subscribers}</p>
                <span className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                  {monetization.trend}
                </span>
                <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3">
                  <CircleCheckBig className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[10px] font-medium text-slate-600">
                    {monetization.eligibleLabel}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm font-medium leading-6 text-slate-700">
              {monetization.caption}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
