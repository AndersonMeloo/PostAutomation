"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { Calendar, Clock, Scissors, TrendingUp } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";
import { YouTubeIcon, InstagramIcon, TikTokIcon } from "./icons";

// Alinhado ao mesmo sistema de cores dos badges/plataformas: Agendamento=azul, Métricas=verde.
const CORNER_COLORS = ["bg-violet-500", "bg-blue-500", "bg-amber-500", "bg-emerald-500"];
const PILLAR_BACKGROUNDS = [
  "bg-linear-to-br from-violet-300 via-sky-300 to-blue-200",
  "bg-linear-to-br from-blue-300 via-sky-300 to-cyan-200",
  "bg-linear-to-br from-amber-200 via-orange-200 to-rose-200",
  "bg-linear-to-br from-emerald-300 via-teal-300 to-cyan-200",
];
const CORNER_POSITIONS = [
  "left-3 top-3 sm:left-6 sm:top-6",
  "right-3 top-3 sm:right-6 sm:top-6 flex-row-reverse",
  "left-3 bottom-3 sm:left-6 sm:bottom-6",
  "right-3 bottom-3 sm:right-6 sm:bottom-6 flex-row-reverse",
];

const INTRO_END = 0.12;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

type PillarRange = [number, number, number, number];

// Trapézio em vez de triângulo: cada pilar tem um "platô" com opacidade total,
// para que dois painéis nunca fiquem visíveis ao mesmo tempo com o mesmo destaque
// (evita texto sobreposto durante a transição).
function getPillarRange(index: number, zoneWidth: number): PillarRange {
  const zoneStart = INTRO_END + zoneWidth * index;
  const zoneEnd = zoneStart + zoneWidth;
  const fade = zoneWidth * 0.3;

  return [
    clamp01(zoneStart),
    clamp01(zoneStart + fade),
    clamp01(zoneEnd - fade),
    clamp01(zoneEnd),
  ];
}

// O fundo do primeiro pilar precisa estar 100% visível antes mesmo do scroll
// começar (durante o título de intro), então seu range começa em 0 em vez de
// esperar o INTRO_END como o texto do pilar.
function getBackgroundRange(index: number, zoneWidth: number): PillarRange {
  if (index === 0) {
    const zoneEnd = INTRO_END + zoneWidth;
    const fade = zoneWidth * 0.3;
    return [0, 0, clamp01(zoneEnd - fade), clamp01(zoneEnd)];
  }
  return getPillarRange(index, zoneWidth);
}

// Hook auxiliar: le um MotionValue derivado do scroll e sincroniza o numero
// atual em um state comum do React. Evita que o navegador tente "acelerar"
// essa animacao via uma scroll-timeline nativa (que fica dessincronizada de
// saltos de scroll), garantindo que o valor exibido seja sempre exatamente o
// valor logico calculado a partir do progresso do scroll.
function useSyncedValue(motionValue: MotionValue<number>, initial: number): number {
  const [value, setValue] = useState(initial);
  useMotionValueEvent(motionValue, "change", (latest) => setValue(latest));
  return value;
}

type Pillar = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
};

export function ScrollPillars() {
  const t = useTranslations();
  const items = t.pillars.items;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const zoneWidth = (1 - INTRO_END) / items.length;

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-24 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
          {t.pillars.kicker}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          {t.pillars.title}
        </h2>
      </div>

      <section ref={sectionRef} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className={`relative aspect-4/3 min-h-95 w-full overflow-hidden rounded-none border border-white/50 shadow-[0_1px_1px_rgba(15,23,42,0.04),0_24px_60px_-20px_rgba(15,23,42,0.25),0_60px_120px_-40px_rgba(15,23,42,0.2)] sm:min-h-0 sm:aspect-video sm:rounded-4xl ${PILLAR_BACKGROUNDS[0]}`}>
            {items.map((item, index) => (
              <PillarBackground
                key={item.number}
                index={index}
                progress={scrollYProgress}
                range={getBackgroundRange(index, zoneWidth)}
              />
            ))}

            <div className="home-shimmer" aria-hidden="true" />

            {items.map((item, index) => (
              <PillarCorner
                key={item.number}
                index={index}
                title={item.title}
                progress={scrollYProgress}
                range={getPillarRange(index, zoneWidth)}
              />
            ))}

            <IntroTitle progress={scrollYProgress} title={t.pillars.centerLabel} introEnd={INTRO_END} />

            {items.map((item, index) => (
              <PillarPanel
                key={item.number}
                index={index}
                item={item}
                progress={scrollYProgress}
                range={getPillarRange(index, zoneWidth)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PillarBackground({
  index,
  progress,
  range,
}: {
  index: number;
  progress: MotionValue<number>;
  range: PillarRange;
}) {
  const opacityMv = useTransform(progress, range, [0, 1, 1, 0]);
  const opacity = useSyncedValue(opacityMv, index === 0 ? 1 : 0);

  return (
    <div
      style={{ opacity }}
      aria-hidden="true"
      className={`absolute inset-0 ${PILLAR_BACKGROUNDS[index % PILLAR_BACKGROUNDS.length]}`}
    />
  );
}

function PillarPanel({
  index,
  item,
  progress,
  range,
}: {
  index: number;
  item: Pillar;
  progress: MotionValue<number>;
  range: PillarRange;
}) {
  const opacityMv = useTransform(progress, range, [0, 1, 1, 0]);
  const yMv = useTransform(progress, range, [16, 0, 0, -16]);
  const opacity = useSyncedValue(opacityMv, 0);
  const y = useSyncedValue(yMv, 16);

  return (
    <div
      style={{ opacity, transform: `translateY(${y}px)` }}
      className="pointer-events-none absolute inset-x-6 top-1/2 flex -translate-y-1/2 items-center justify-center gap-16 sm:inset-x-16"
    >
      <div className="max-w-md">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white ${CORNER_COLORS[index % CORNER_COLORS.length]}`}
        >
          {item.number}
        </span>
        <h3 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">{item.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
          {item.description}
        </p>
        <ul className="mt-5 space-y-2">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2 text-sm text-slate-600">
              <span
                className={`h-1.5 w-1.5 rounded-full ${CORNER_COLORS[index % CORNER_COLORS.length]}`}
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className="animate-float hidden shrink-0 lg:block">
        <PillarVisual index={index} />
      </div>
    </div>
  );
}

function PillarVisual({ index }: { index: number }) {
  switch (index % 4) {
    case 0:
      return (
        <div className="flex w-64 flex-col gap-3">
          <div className="home-glass flex items-center gap-3 rounded-2xl p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white">
              <YouTubeIcon className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">YouTube</p>
              <p className="text-xs text-slate-500">Publicação ativa</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <div className="home-glass ml-6 flex items-center gap-3 rounded-2xl p-3 opacity-80">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#405de6_0%,#5b51d8_15%,#833ab4_30%,#c13584_45%,#e1306c_60%,#fd1d1d_70%,#f56040_80%,#f77737_90%,#fcaf45_100%)] text-white">
              <InstagramIcon className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">Instagram</p>
              <p className="text-xs text-slate-500">Em breve</p>
            </div>
          </div>
          <div className="home-glass ml-12 flex items-center gap-3 rounded-2xl p-3 opacity-60">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
              <TikTokIcon className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">TikTok</p>
              <p className="text-xs text-slate-500">Em breve</p>
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="home-glass w-64 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">Publicação agendada</p>
              <p className="text-xs text-slate-500">Short · Vídeo longo</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
            <Clock className="h-4 w-4" />
            Amanhã às 09:00
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            Sexta às 18:30
          </div>
        </div>
      );
    case 2:
      return (
        <div className="home-glass w-64 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">
              <Scissors className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">Corte do vídeo</p>
              <p className="text-xs text-slate-500">00:08 – 00:42</p>
            </div>
          </div>
          <div className="relative mt-5 h-8 overflow-hidden rounded-lg bg-slate-100">
            <div className="absolute inset-y-0 left-[15%] right-[20%] rounded-lg bg-amber-400" />
            <div className="absolute inset-y-0 left-[15%] w-1 rounded-full bg-amber-600" />
            <div className="absolute inset-y-0 right-[20%] w-1 rounded-full bg-amber-600" />
          </div>
          <p className="mt-2 text-xs text-slate-400">Prévia antes de publicar</p>
        </div>
      );
    default:
      return (
        <div className="home-glass w-64 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                <TrendingUp className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-slate-800">Desempenho</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
              +18%
            </span>
          </div>
          <div className="mt-5 flex h-16 items-end gap-2">
            {[40, 65, 50, 80, 60, 95].map((height, barIndex) => (
              <div
                key={barIndex}
                className="flex-1 rounded-t-md bg-emerald-400"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      );
  }
}

function PillarCorner({
  index,
  title,
  progress,
  range,
}: {
  index: number;
  title: string;
  progress: MotionValue<number>;
  range: PillarRange;
}) {
  const opacityMv = useTransform(progress, range, [0.35, 1, 1, 0.35]);
  const opacity = useSyncedValue(opacityMv, 0.35);

  return (
    <div
      style={{ opacity }}
      className={`absolute hidden items-center gap-2 sm:flex ${CORNER_POSITIONS[index % CORNER_POSITIONS.length]}`}
    >
      <span className={`h-2.5 w-2.5 rounded-sm ${CORNER_COLORS[index % CORNER_COLORS.length]}`} />
      <span className="text-xs font-semibold text-slate-500 sm:text-sm">{title}</span>
    </div>
  );
}

function IntroTitle({
  progress,
  title,
  introEnd,
}: {
  progress: MotionValue<number>;
  title: string;
  introEnd: number;
}) {
  const opacityMv = useTransform(progress, [0, introEnd * 0.6, introEnd], [1, 1, 0]);
  const opacity = useSyncedValue(opacityMv, 1);

  return (
    <p
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center text-2xl font-medium text-slate-300 sm:text-5xl"
    >
      {title}
    </p>
  );
}
