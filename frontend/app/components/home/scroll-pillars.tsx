"use client";

import { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  type MotionValue,
} from "framer-motion";
import {
  Calendar,
  Clock,
  Scissors,
  TrendingUp,
  Zap,
  Users,
  Eye,
  CheckCircle2,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";
import { YouTubeIcon, InstagramIcon, TikTokIcon } from "./icons";

// Cores e Gradientes Originais
const CORNER_COLORS = ["bg-violet-500", "bg-blue-500", "bg-amber-500", "bg-emerald-500"];
const BULLET_COLORS = ["bg-violet-500", "bg-blue-500", "bg-amber-500", "bg-emerald-500"];
const PILLAR_BACKGROUNDS = [
  "bg-gradient-to-br from-violet-300 via-sky-300 to-blue-200",
  "bg-gradient-to-br from-blue-300 via-sky-300 to-cyan-200",
  "bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200",
  "bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-200",
];

const INTRO_END = 0.1;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

type PillarRange = [number, number, number, number];

function getPillarRange(index: number, zoneWidth: number): PillarRange {
  const zoneStart = INTRO_END + zoneWidth * index;
  const zoneEnd = zoneStart + zoneWidth;
  const fade = zoneWidth * 0.25;

  return [
    clamp01(zoneStart),
    clamp01(zoneStart + fade),
    clamp01(zoneEnd - fade),
    clamp01(zoneEnd),
  ];
}

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
  const items: Pillar[] = t.pillars.items;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const zoneWidth = (1 - INTRO_END) / items.length;

  return (
    <div className="bg-slate-950 font-sans antialiased text-slate-900">
      <section ref={sectionRef} className="relative h-[450vh]">
        {/* Container ocupando a tela inteira */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden p-3 sm:p-6 md:p-8">
          
          {/* Timeline / Passos estilo OneFin (Lado Esquerdo) */}
          <div className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
            <div className="relative flex flex-col items-center gap-6">
              <div className="absolute top-3 bottom-3 w-[2px] bg-slate-800" />
              {items.map((item, idx) => (
                <StepDot
                  key={item.number}
                  index={idx}
                  progress={scrollYProgress}
                  range={getPillarRange(idx, zoneWidth)}
                />
              ))}
            </div>
          </div>

          {/* Frame Principal Estilo OneFin com As Cores Originais */}
          <div className="relative flex h-full max-h-[850px] w-full max-w-7xl items-center justify-between overflow-hidden rounded-[2.5rem] border border-white/50 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.3)] backdrop-blur-2xl p-6 sm:p-12 lg:p-16">
            
            {/* Backgrounds coloridos da primeira versão */}
            {items.map((_, index) => (
              <PillarBackground
                key={index}
                index={index}
                progress={scrollYProgress}
                range={
                  index === 0
                    ? [0, 0, clamp01(INTRO_END + zoneWidth - zoneWidth * 0.25), clamp01(INTRO_END + zoneWidth)]
                    : getPillarRange(index, zoneWidth)
                }
              />
            ))}

            <div className="home-shimmer pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

            {/* Título de Introdução */}
            <IntroTitle
              progress={scrollYProgress}
              title={t.pillars.centerLabel}
              introEnd={INTRO_END}
            />

            {/* Conteúdo dos Pilares (Textos e Animações) */}
            {items.map((item, index) => (
              <PillarContent
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

{/* Bolinhas Indicadoras Numéricas */}
function StepDot({
  index,
  progress,
  range,
}: {
  index: number;
  progress: MotionValue<number>;
  range: PillarRange;
}) {
  const opacityMv = useTransform(progress, range, [0.3, 1, 1, 0.3]);
  const scaleMv = useTransform(progress, range, [0.9, 1.2, 1.2, 0.9]);
  const opacity = useSyncedValue(opacityMv, 0.3);
  const scale = useSyncedValue(scaleMv, 0.9);
  const isActive = opacity > 0.6;

  return (
    <div
      style={{ opacity, transform: `scale(${scale})` }}
      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
        isActive
          ? `${CORNER_COLORS[index % CORNER_COLORS.length]} text-white shadow-lg shadow-black/20`
          : "bg-slate-800 text-slate-400"
      }`}
    >
      {index + 1}
    </div>
  );
}

{/* Transição Suave do Fundo Colorido */}
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
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        PILLAR_BACKGROUNDS[index % PILLAR_BACKGROUNDS.length]
      }`}
    />
  );
}

{/* Conteúdo com Animação Suave nos Textos */}
function PillarContent({
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
  const yMv = useTransform(progress, range, [30, 0, 0, -30]);
  const scaleMv = useTransform(progress, range, [0.96, 1, 1, 0.96]);

  const opacity = useSyncedValue(opacityMv, 0);
  const y = useSyncedValue(yMv, 30);
  const scale = useSyncedValue(scaleMv, 0.96);

  const isVisible = opacity > 0.05;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out",
      }}
      className={`pointer-events-none absolute inset-6 flex items-center justify-between gap-12 sm:inset-12 lg:inset-16 ${
        !isVisible && "hidden"
      }`}
    >
      {/* Coluna da Esquerda (Textos Animados) */}
      <div className="z-10 max-w-xl text-left">
        <span
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold text-white shadow-sm ${
            CORNER_COLORS[index % CORNER_COLORS.length]
          }`}
        >
          {item.number}
        </span>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
          {item.title}
        </h2>

        <p className="mt-4 text-base font-normal leading-relaxed text-slate-700 sm:text-xl">
          {item.description}
        </p>

        <ul className="mt-6 space-y-3">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3 text-sm font-semibold text-slate-800 sm:text-base">
              <span
                className={`h-2 w-2 rounded-full ${
                  BULLET_COLORS[index % BULLET_COLORS.length]
                }`}
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Coluna da Direita (Visuais Animados com Métricas ao Fundo) */}
      <div className="relative z-10 hidden w-full max-w-lg items-center justify-center lg:flex">
        <PillarVisual index={index} isVisible={isVisible} />
      </div>
    </div>
  );
}

{/* Visuais Animados */}
function PillarVisual({ index, isVisible }: { index: number; isVisible: boolean }) {
  switch (index % 4) {
    case 0:
      return <MultiPlatformVisual isVisible={isVisible} />;
    case 1:
      return <SchedulingVisual isVisible={isVisible} />;
    case 2:
      return <VideoCuttingVisual isVisible={isVisible} />;
    default:
      return <AnimatedChartVisual isVisible={isVisible} />;
  }
}

{/* Visual 1: Multi-plataforma + Métricas de Fundo estilo Foto 2 */}
function MultiPlatformVisual({ isVisible }: { isVisible: boolean }) {
  const cardGlass = "relative z-10 home-glass flex items-center gap-3 rounded-2xl p-4 shadow-xl backdrop-blur-md transition-all duration-300";

  return (
    <div className="relative flex w-full max-w-md items-center justify-center py-6">
      
      {/* --- CARDS DE MÉTRICAS AO FUNDO (Estilo Imagem 2) --- */}
      {/* Metric Background 1 - Canto Superior Esquerdo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -30, y: -20, rotate: -6 }}
        animate={isVisible ? { opacity: 0.75, scale: 1, x: -50, y: -45, rotate: -6 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute left-0 top-0 rounded-2xl bg-white/40 p-3.5 shadow-md backdrop-blur-md border border-white/60 text-slate-800"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Inscritos</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <Users className="h-4 w-4 text-violet-600" />
          <span className="text-sm font-extrabold text-slate-900">+1,240 /wk</span>
        </div>
      </motion.div>

      {/* Metric Background 2 - Canto Inferior Direito */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 30, y: 20, rotate: 5 }}
        animate={isVisible ? { opacity: 0.75, scale: 1, x: 40, y: 40, rotate: 5 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-0 bottom-0 rounded-2xl bg-white/40 p-3.5 shadow-md backdrop-blur-md border border-white/60 text-slate-800"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Views</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <Eye className="h-4 w-4 text-sky-600" />
          <span className="text-sm font-extrabold text-slate-900">248.5K</span>
        </div>
      </motion.div>


      {/* --- ELEMENTOS PRINCIPAIS NA FRENTE --- */}
      <div className="relative flex w-80 flex-col gap-3">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={isVisible ? { scale: 1, opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cardGlass}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-md">
            <YouTubeIcon className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">YouTube</p>
            <p className="text-xs text-slate-500">Publicação ativa</p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={isVisible ? { scale: 1, opacity: 0.85, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`${cardGlass} ml-6`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#405de6_0%,#5b51d8_15%,#833ab4_30%,#c13584_45%,#e1306c_60%,#fd1d1d_70%,#f56040_80%,#f77737_90%,#fcaf45_100%)] text-white shadow-md">
            <InstagramIcon className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">Instagram</p>
            <p className="text-xs text-slate-500">Em breve</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={isVisible ? { scale: 1, opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`${cardGlass} ml-12`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-md">
            <TikTokIcon className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">TikTok</p>
            <p className="text-xs text-slate-500">Em breve</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

{/* Visual 2: Agendamento + Métricas ao Fundo */}
function SchedulingVisual({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="relative flex w-full max-w-md items-center justify-center py-6">
      
      {/* --- CARDS DE MÉTRICAS AO FUNDO --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -35, y: -30, rotate: -5 }}
        animate={isVisible ? { opacity: 0.75, scale: 1, x: -45, y: -40, rotate: -5 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute left-0 top-0 rounded-2xl bg-white/40 p-3.5 shadow-md backdrop-blur-md border border-white/60 text-slate-800"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Status Fila</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-extrabold text-slate-900">100% Sincro</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 35, y: 25, rotate: 6 }}
        animate={isVisible ? { opacity: 0.75, scale: 1, x: 45, y: 35, rotate: 6 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-0 bottom-0 rounded-2xl bg-white/40 p-3.5 shadow-md backdrop-blur-md border border-white/60 text-slate-800"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Melhor Horário</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-extrabold text-slate-900">18:00 Peak</span>
        </div>
      </motion.div>

      {/* --- CARD PRINCIPAL --- */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 home-glass w-80 rounded-2xl p-6 shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-md shadow-blue-500/30">
            <Calendar className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">Publicação agendada</p>
            <p className="text-xs text-slate-500">Short · Vídeo longo</p>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          <motion.div
            initial={{ x: -15, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-2 rounded-xl bg-blue-50/90 border border-blue-200/50 px-3.5 py-2.5 text-sm font-medium text-blue-700"
          >
            <Clock className="h-4 w-4" />
            Amanhã às 09:00
          </motion.div>

          <motion.div
            initial={{ x: -15, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="flex items-center gap-2 rounded-xl bg-white/60 px-3.5 py-2.5 text-sm text-slate-500"
          >
            <Clock className="h-4 w-4 text-slate-400" />
            Sexta às 18:30
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

{/* Visual 3: Edição de Vídeo + Métricas ao Fundo */}
function VideoCuttingVisual({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="relative flex w-full max-w-md items-center justify-center py-6">
      
      {/* --- CARDS DE MÉTRICAS AO FUNDO --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -30, y: -25, rotate: -7 }}
        animate={isVisible ? { opacity: 0.75, scale: 1, x: -40, y: -35, rotate: -7 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute left-0 top-0 rounded-2xl bg-white/40 p-3.5 shadow-md backdrop-blur-md border border-white/60 text-slate-800"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tempo Salvo</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-extrabold text-slate-900">4.2h /vídeo</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 30, y: 20, rotate: 4 }}
        animate={isVisible ? { opacity: 0.75, scale: 1, x: 40, y: 35, rotate: 4 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-0 bottom-0 rounded-2xl bg-white/40 p-3.5 shadow-md backdrop-blur-md border border-white/60 text-slate-800"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Corte Silêncio</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <Scissors className="h-4 w-4 text-rose-500" />
          <span className="text-sm font-extrabold text-slate-900">AI Auto</span>
        </div>
      </motion.div>

      {/* --- CARD PRINCIPAL --- */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 home-glass w-80 rounded-2xl p-6 shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white shadow-md shadow-amber-500/30">
            <Scissors className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">Corte do vídeo</p>
            <p className="text-xs text-slate-500">00:08 – 00:42</p>
          </div>
        </div>

        <div className="relative mt-6 h-9 overflow-hidden rounded-lg bg-slate-200/80 p-0.5">
          <motion.div
            initial={{ left: "0%", right: "0%" }}
            animate={isVisible ? { left: "15%", right: "20%" } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-y-0 bg-amber-400 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div className="h-full w-1 rounded-full bg-amber-600" />
            <div className="h-full w-1 rounded-full bg-amber-600" />
          </motion.div>
        </div>
        <p className="mt-3 text-xs text-slate-500">Prévia antes de publicar</p>
      </motion.div>
    </div>
  );
}

{/* Visual 4: Gráfico Animado + Métricas ao Fundo */}
function AnimatedChartVisual({ isVisible }: { isVisible: boolean }) {
  const barHeights = [40, 65, 50, 80, 60, 95];

  return (
    <div className="relative flex w-full max-w-md items-center justify-center py-6">
      
      {/* --- CARDS DE MÉTRICAS AO FUNDO --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -35, y: -25, rotate: -5 }}
        animate={isVisible ? { opacity: 0.75, scale: 1, x: -45, y: -35, rotate: -5 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute left-0 top-0 rounded-2xl bg-white/40 p-3.5 shadow-md backdrop-blur-md border border-white/60 text-slate-800"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Est. Revenue</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-extrabold text-slate-900">$2,450.00</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 35, y: 20, rotate: 6 }}
        animate={isVisible ? { opacity: 0.75, scale: 1, x: 45, y: 35, rotate: 6 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-0 bottom-0 rounded-2xl bg-white/40 p-3.5 shadow-md backdrop-blur-md border border-white/60 text-slate-800"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Engajamento</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-extrabold text-slate-900">8.4% Avg</span>
        </div>
      </motion.div>

      {/* --- CARD PRINCIPAL --- */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 home-glass w-80 rounded-2xl p-6 shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
              <TrendingUp className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-slate-800">Desempenho</p>
          </div>
          <motion.span
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"
          >
            +18%
          </motion.span>
        </div>

        <div className="mt-6 flex h-20 items-end gap-2">
          {barHeights.map((height, barIndex) => (
            <div key={barIndex} className="flex-1 h-full flex items-end">
              <motion.div
                initial={{ height: "0%" }}
                animate={isVisible ? { height: `${height}%` } : { height: "0%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 * barIndex,
                  type: "spring",
                  stiffness: 110,
                }}
                className="w-full rounded-t-md bg-emerald-500"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

{/* Título de Introdução */}
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

  if (opacity <= 0.05) return null;

  return (
    <p
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center text-3xl font-extrabold text-slate-800 sm:text-6xl tracking-tight transition-opacity duration-300"
    >
      {title}
    </p>
  );
}
