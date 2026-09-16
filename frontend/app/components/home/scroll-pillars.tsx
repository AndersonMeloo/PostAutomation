"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  Check,
  Clock3,
  Eye,
  Scissors,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Manrope, Sora } from "next/font/google";
import { useTranslations } from "../../lib/i18n/locale-context";
import { FEATURE_STYLES } from "./feature-colors";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
});

type Pillar = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
};

const ACCENTS = [
  {
    hex: "#8B5CF6",
    dot: "bg-violet-500",
    text: "text-violet-600",
    soft: "bg-violet-50",
    border: "border-violet-100",
    glow: "bg-violet-300/30",
  },
  {
    hex: "#3B82F6",
    dot: "bg-blue-500",
    text: "text-blue-600",
    soft: "bg-blue-50",
    border: "border-blue-100",
    glow: "bg-blue-300/30",
  },
  {
    hex: "#F59E0B",
    dot: "bg-amber-500",
    text: "text-amber-600",
    soft: "bg-amber-50",
    border: "border-amber-100",
    glow: "bg-amber-300/30",
  },
  {
    hex: "#10B981",
    dot: "bg-emerald-500",
    text: "text-emerald-600",
    soft: "bg-emerald-50",
    border: "border-emerald-100",
    glow: "bg-emerald-300/30",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function ScrollPillars() {
  const t = useTranslations();
  const items: Pillar[] = t.pillars.items;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!items.length) return;

    const safeProgress = Math.min(Math.max(latest, 0), 0.999999);
    const next = Math.min(
      items.length - 1,
      Math.floor(safeProgress * items.length),
    );

    setActiveIndex((current) => (current === next ? current : next));
  });

  if (!items.length) return null;

  const activeItem = items[activeIndex];
  const accent = ACCENTS[activeIndex % ACCENTS.length];
  const timelineProgress =
    items.length <= 1 ? 0 : (activeIndex / (items.length - 1)) * 100;

  return (
    <section
      ref={sectionRef}
      className={`${manrope.className} relative h-[420vh] bg-white text-slate-950`}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Linhas discretas para dar profundidade sem tirar o foco do conteúdo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200/80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-slate-200/80"
        />

        <div className="relative mx-auto flex h-full w-full max-w-[1380px] items-center px-5 sm:px-8 lg:px-14 xl:px-20">
          <MinimalStepper
            items={items}
            activeIndex={activeIndex}
            progress={timelineProgress}
          />

          <div className="grid w-full items-center gap-12 pl-11 md:pl-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:pl-16 xl:gap-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`copy-${activeIndex}`}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative z-20 max-w-[620px]"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[11px] font-extrabold tracking-[0.08em] text-white ${accent.dot}`}
                  >
                    {activeItem.number}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Recurso principal
                  </span>
                </div>

                <h2
                  className={`${sora.className} max-w-[590px] text-[clamp(2.55rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950`}
                >
                  {activeItem.title}
                </h2>

                <p className="mt-7 max-w-[560px] text-base font-medium leading-7 text-slate-500 sm:text-lg sm:leading-8">
                  {activeItem.description}
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {activeItem.bullets.map((bullet, bulletIndex) => (
                    <motion.li
                      key={bullet}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.38,
                        delay: 0.12 + bulletIndex * 0.07,
                        ease: EASE,
                      }}
                      className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.soft} ${accent.text}`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="relative hidden min-h-[560px] items-center justify-center lg:flex">
              <div
                aria-hidden="true"
                className={`absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] ${accent.glow}`}
              />
              <DotField accent={accent.hex} />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`visual-${activeIndex}`}
                  initial={{ opacity: 0, x: 36, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -28, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="relative z-10 w-full max-w-[600px]"
                >
                  <PillarVisual index={activeIndex} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* versão mobile das métricas */}
          <div className="pointer-events-none absolute inset-x-5 bottom-8 lg:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`mobile-metric-${activeIndex}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="ml-11 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,.3)]"
              >
                <MobileMetric index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function MinimalStepper({
  items,
  activeIndex,
  progress,
}: {
  items: Pillar[];
  activeIndex: number;
  progress: number;
}) {
  const active = ACCENTS[activeIndex % ACCENTS.length];

  return (
    <aside className="absolute left-4 top-1/2 z-30 -translate-y-1/2 sm:left-7 lg:left-8 xl:left-10">
      <div className="relative flex flex-col items-center gap-6">
        <div className="absolute bottom-3 top-3 w-px bg-slate-200" />
        <motion.div
          className="absolute left-1/2 top-3 w-px -translate-x-1/2 origin-top"
          animate={{
            height: `calc(${progress}% - ${(progress / 100) * 24}px)`,
            backgroundColor: active.hex,
          }}
          transition={{ duration: 0.4, ease: EASE }}
        />

        {items.map((item, index) => {
          const itemAccent = ACCENTS[index % ACCENTS.length];
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;

          return (
            <motion.div
              key={item.number}
              animate={{ scale: isActive ? 1 : 0.92 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-extrabold transition-colors duration-300 ${
                isActive
                  ? `${itemAccent.dot} border-transparent text-white shadow-[0_7px_18px_-8px_rgba(15,23,42,.55)]`
                  : isPast
                    ? "border-slate-300 bg-white text-slate-700"
                    : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {index + 1}
            </motion.div>
          );
        })}
      </div>
    </aside>
  );
}

function DotField({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-8 overflow-hidden rounded-[2rem] opacity-50"
      style={{
        backgroundImage: `radial-gradient(${accent}22 1px, transparent 1px)`,
        backgroundSize: "22px 22px",
        WebkitMaskImage:
          "radial-gradient(circle at center, black 0%, black 30%, transparent 72%)",
        maskImage:
          "radial-gradient(circle at center, black 0%, black 30%, transparent 72%)",
      }}
    />
  );
}

function PillarVisual({ index }: { index: number }) {
  switch (index % 4) {
    case 0:
      return <MultiPlatformVisual />;
    case 1:
      return <SchedulingVisual />;
    case 2:
      return <VideoCuttingVisual />;
    default:
      return <AnalyticsVisual />;
  }
}

function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const mv = useMotionValue(0);
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(mv, "change", (latest) => setCurrent(latest));

  useEffect(() => {
    mv.set(0);

    if (reduceMotion) {
      mv.set(value);
      return;
    }

    const controls = animate(mv, value, {
      duration,
      ease: EASE,
    });

    return () => controls.stop();
  }, [duration, mv, reduceMotion, value]);

  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(current);

  return (
    <>
      {prefix}
      {formatted}
      {suffix}
    </>
  );
}

function FloatingMetric({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 1, y: [0, -7, 0], scale: 1 }
      }
      transition={
        reduceMotion
          ? { duration: 0.45, delay, ease: EASE }
          : {
              opacity: { duration: 0.45, delay, ease: EASE },
              scale: { duration: 0.45, delay, ease: EASE },
              y: {
                duration: 4.8,
                delay: delay + 0.45,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      className={`rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_18px_45px_-30px_rgba(15,23,42,.45)] backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MetricLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
      {children}
    </p>
  );
}

function MultiPlatformVisual() {
  return (
    <div className="relative mx-auto min-h-[500px] w-full max-w-[560px]">
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2">
        <MetricLabel>Alcance total</MetricLabel>
        <div className={`${sora.className} mt-2 text-[clamp(4.3rem,7vw,7.4rem)] font-semibold leading-none tracking-[-0.075em] text-slate-950`}>
          <AnimatedCounter value={248.5} decimals={1} suffix="K" />
        </div>
        <p className="mt-3 max-w-[300px] text-sm font-medium leading-6 text-slate-500">
          visualizações processadas em um único fluxo de publicação.
        </p>

        <div className="mt-9 flex items-center gap-3">
          {[FEATURE_STYLES.youtube, FEATURE_STYLES.instagram, FEATURE_STYLES.tiktok].map(
            (style, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 + index * 0.08, ease: EASE }}
                className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 shadow-sm ${style.iconBg}`}
              >
                <style.icon className={`h-5 w-5 ${style.iconColor}`} />
              </motion.div>
            ),
          )}
          <span className="ml-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            3 canais
          </span>
        </div>
      </div>

      <FloatingMetric className="absolute right-2 top-10" delay={0.08}>
        <MetricLabel>Inscritos / semana</MetricLabel>
        <div className="mt-1 flex items-center gap-2">
          <Users className="h-4 w-4 text-violet-500" />
          <strong className="text-lg font-extrabold tracking-tight text-slate-900">
            +<AnimatedCounter value={1240} />
          </strong>
        </div>
      </FloatingMetric>

      <FloatingMetric className="absolute bottom-12 left-0" delay={0.18}>
        <MetricLabel>Status</MetricLabel>
        <div className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-800">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Publicando
        </div>
      </FloatingMetric>

      <FloatingMetric className="absolute bottom-8 right-6" delay={0.28}>
        <MetricLabel>Views em tempo real</MetricLabel>
        <div className="mt-1 flex items-center gap-2">
          <Eye className="h-4 w-4 text-sky-500" />
          <strong className="text-base font-extrabold text-slate-900">+2.8K</strong>
        </div>
      </FloatingMetric>
    </div>
  );
}

function SchedulingVisual() {
  return (
    <div className="relative mx-auto min-h-[500px] w-full max-w-[560px]">
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2">
        <MetricLabel>Fila sincronizada</MetricLabel>
        <div className={`${sora.className} mt-2 text-[clamp(4.3rem,7vw,7.4rem)] font-semibold leading-none tracking-[-0.075em] text-slate-950`}>
          <AnimatedCounter value={100} suffix="%" />
        </div>
        <p className="mt-3 max-w-[330px] text-sm font-medium leading-6 text-slate-500">
          seus conteúdos entram na fila e são publicados no horário definido.
        </p>

        <div className="mt-9 max-w-[370px] border-l border-slate-200 pl-5">
          <ScheduleRow active time="09:00" label="Amanhã" delay={0.12} />
          <ScheduleRow time="18:30" label="Sexta-feira" delay={0.22} />
        </div>
      </div>

      <FloatingMetric className="absolute right-0 top-8" delay={0.1}>
        <MetricLabel>Próxima publicação</MetricLabel>
        <div className="mt-1 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-blue-500" />
          <strong className="text-base font-extrabold text-slate-900">09:00</strong>
        </div>
      </FloatingMetric>

      <FloatingMetric className="absolute bottom-7 right-5" delay={0.22}>
        <MetricLabel>Melhor horário</MetricLabel>
        <div className="mt-1 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          <strong className="text-base font-extrabold text-slate-900">18:00</strong>
        </div>
      </FloatingMetric>

      <FloatingMetric className="absolute bottom-0 left-0" delay={0.3}>
        <MetricLabel>Retentativa</MetricLabel>
        <div className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-800">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Automática
        </div>
      </FloatingMetric>
    </div>
  );
}

function ScheduleRow({
  time,
  label,
  active = false,
  delay,
}: {
  time: string;
  label: string;
  active?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className="relative flex items-center justify-between py-3"
    >
      <span
        className={`absolute -left-[25px] h-2.5 w-2.5 rounded-full ring-4 ring-white ${
          active ? "bg-blue-500" : "bg-slate-300"
        }`}
      />
      <div className="flex items-center gap-3">
        <Clock3 className={`h-4 w-4 ${active ? "text-blue-500" : "text-slate-400"}`} />
        <span className={`text-sm font-bold ${active ? "text-slate-900" : "text-slate-500"}`}>
          {label}
        </span>
      </div>
      <span className={`${sora.className} text-base font-semibold text-slate-900`}>{time}</span>
    </motion.div>
  );
}

function VideoCuttingVisual() {
  return (
    <div className="relative mx-auto min-h-[500px] w-full max-w-[560px]">
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2">
        <MetricLabel>Tempo economizado</MetricLabel>
        <div className={`${sora.className} mt-2 text-[clamp(4.3rem,7vw,7.4rem)] font-semibold leading-none tracking-[-0.075em] text-slate-950`}>
          <AnimatedCounter value={4.2} decimals={1} suffix="h" />
        </div>
        <p className="mt-3 max-w-[330px] text-sm font-medium leading-6 text-slate-500">
          por vídeo com corte rápido, prévia e ajustes antes da publicação.
        </p>

        <div className="mt-10 max-w-[390px]">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            <span>00:00</span>
            <span>00:42</span>
          </div>
          <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ left: "0%", right: "100%" }}
              animate={{ left: "18%", right: "24%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="absolute inset-y-0 rounded-full bg-amber-400"
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Corte selecionado</span>
            <span>34s</span>
          </div>
        </div>
      </div>

      <FloatingMetric className="absolute right-2 top-8" delay={0.08}>
        <MetricLabel>Prévia</MetricLabel>
        <div className="mt-1 flex items-center gap-2">
          <Scissors className="h-4 w-4 text-amber-500" />
          <strong className="text-base font-extrabold text-slate-900">00:08 → 00:42</strong>
        </div>
      </FloatingMetric>

      <FloatingMetric className="absolute bottom-8 right-3" delay={0.2}>
        <MetricLabel>Corte de silêncio</MetricLabel>
        <div className="mt-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-rose-500" />
          <strong className="text-base font-extrabold text-slate-900">AI Auto</strong>
        </div>
      </FloatingMetric>

      <FloatingMetric className="absolute bottom-6 left-0" delay={0.3}>
        <MetricLabel>Thumbnail</MetricLabel>
        <div className="mt-1 text-sm font-bold text-slate-800">Personalizada</div>
      </FloatingMetric>
    </div>
  );
}

function AnalyticsVisual() {
  const heights = [34, 52, 44, 72, 58, 86, 68, 100];

  return (
    <div className="relative mx-auto min-h-[500px] w-full max-w-[560px]">
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2">
        <MetricLabel>Crescimento no período</MetricLabel>
        <div className={`${sora.className} mt-2 text-[clamp(4.3rem,7vw,7.4rem)] font-semibold leading-none tracking-[-0.075em] text-slate-950`}>
          +<AnimatedCounter value={18} suffix="%" />
        </div>
        <p className="mt-3 max-w-[330px] text-sm font-medium leading-6 text-slate-500">
          compare vídeos, formatos e períodos sem sair do mesmo painel.
        </p>

        <div className="mt-10 flex h-24 max-w-[390px] items-end gap-2 border-b border-slate-200 pb-1">
          {heights.map((height, index) => (
            <div key={index} className="flex h-full flex-1 items-end">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${height}%`, opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + index * 0.045,
                  type: "spring",
                  stiffness: 110,
                  damping: 18,
                }}
                className="w-full rounded-t-[5px] bg-emerald-500"
              />
            </div>
          ))}
        </div>
      </div>

      <FloatingMetric className="absolute right-0 top-8" delay={0.08}>
        <MetricLabel>Receita estimada</MetricLabel>
        <div className="mt-1 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-emerald-500" />
          <strong className="text-base font-extrabold text-slate-900">
            $<AnimatedCounter value={2450} />
          </strong>
        </div>
      </FloatingMetric>

      <FloatingMetric className="absolute bottom-10 right-4" delay={0.2}>
        <MetricLabel>Engajamento médio</MetricLabel>
        <div className="mt-1 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <strong className="text-base font-extrabold text-slate-900">
            <AnimatedCounter value={8.4} decimals={1} suffix="%" />
          </strong>
        </div>
      </FloatingMetric>

      <FloatingMetric className="absolute bottom-16 left-0" delay={0.3}>
        <MetricLabel>Período</MetricLabel>
        <div className="mt-1 text-sm font-bold text-slate-800">Últimos 30 dias</div>
      </FloatingMetric>
    </div>
  );
}

function MobileMetric({ index }: { index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];

  const content = [
    {
      icon: <Eye className={`h-4 w-4 ${accent.text}`} />,
      value: "248,5K",
      label: "views processadas",
    },
    {
      icon: <CalendarDays className={`h-4 w-4 ${accent.text}`} />,
      value: "100%",
      label: "fila sincronizada",
    },
    {
      icon: <Scissors className={`h-4 w-4 ${accent.text}`} />,
      value: "4,2h",
      label: "economizadas por vídeo",
    },
    {
      icon: <TrendingUp className={`h-4 w-4 ${accent.text}`} />,
      value: "+18%",
      label: "crescimento no período",
    },
  ][index % 4];

  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accent.soft}`}>
        {content.icon}
      </span>
      <div>
        <div className={`${sora.className} text-xl font-semibold tracking-tight text-slate-950`}>
          {content.value}
        </div>
        <div className="text-xs font-medium text-slate-500">{content.label}</div>
      </div>
    </div>
  );
}
