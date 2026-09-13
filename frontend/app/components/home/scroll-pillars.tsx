"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useTranslations } from "../../lib/i18n/locale-context";

// Alinhado ao mesmo sistema de cores dos badges/plataformas: Agendamento=azul, Métricas=verde.
const CORNER_COLORS = ["bg-violet-500", "bg-blue-500", "bg-amber-500", "bg-emerald-500"];
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
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 sm:px-6">
          <div className="relative mx-auto aspect-4/3 w-full max-w-4xl rounded-4xl border border-slate-200 bg-linear-to-br from-violet-50 via-white to-emerald-50 sm:aspect-video">
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
      className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 sm:inset-x-16"
    >
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
            <span className={`h-1.5 w-1.5 rounded-full ${CORNER_COLORS[index % CORNER_COLORS.length]}`} />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
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
      className={`absolute flex items-center gap-2 ${CORNER_POSITIONS[index % CORNER_POSITIONS.length]}`}
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
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center text-2xl font-medium text-slate-300 sm:text-4xl"
    >
      {title}
    </p>
  );
}
