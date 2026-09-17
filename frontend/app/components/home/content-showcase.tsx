"use client";

import { animate, motion, useAnimationFrame, useMotionValue } from "framer-motion";
import {
  Dumbbell,
  GraduationCap,
  MessagesSquare,
  Mic,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "../../lib/i18n/locale-context";
import { InstagramIcon, YouTubeIcon } from "./icons";

const GAP_PX = 24; // gap-6 (sm:); usado só pra medir offsets, não afeta o layout em si
const VISIBILITY_MARGIN_PX = 400;

const CATEGORY_STYLES: {
  icon: LucideIcon;
  platformIcon: typeof YouTubeIcon;
  accent: string;
  wide?: boolean;
  videoSrc?: string;
}[] = [
  {
    icon: Mic,
    platformIcon: YouTubeIcon,
    accent: "from-violet-500 to-indigo-600",
    videoSrc: "/RodrigoSilva.mp4",
  },
  {
    icon: GraduationCap,
    platformIcon: InstagramIcon,
    accent: "from-blue-500 to-cyan-500",
    wide: true,
    videoSrc: "/Curso.mp4",
  },
  {
    icon: Newspaper,
    platformIcon: YouTubeIcon,
    accent: "from-amber-500 to-orange-500",
    videoSrc: "/Noticia.mp4",
  },
  {
    icon: MessagesSquare,
    platformIcon: InstagramIcon,
    accent: "from-emerald-500 to-teal-500",
    videoSrc: "/Entrevista.mp4",
  },
  {
    icon: Dumbbell,
    platformIcon: YouTubeIcon,
    accent: "from-rose-500 to-pink-500",
    videoSrc: "/Treino.mp4",
  },
];

type VideoEntry = { el: HTMLVideoElement; label: string; itemIndex: number };

export function ContentShowcase() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);

  // A faixa é duplicada (2 cópias) pra criar a ilusão de loop infinito. Com
  // os 5 vídeos tocando em dobro (10 instâncias simultâneas), o navegador
  // pausa sozinho algumas por sobrecarga, e as duas instâncias do mesmo
  // vídeo vão saindo de sincronia uma da outra - o que vira um salto visível
  // bem no instante em que a faixa "reseta" a posição. A correção: só
  // mantém tocando o que está próximo da área visível (reduz a sobrecarga)
  // e, ao entrar em vista, realinha com a outra instância do mesmo vídeo -
  // a que estiver tocando de verdade, não necessariamente a "original".
  //
  // Importante: isso é decidido a cada frame com base na MESMA posição que
  // move a faixa visualmente (não via IntersectionObserver) - o observer
  // não acompanha bem mudanças feitas só por `transform`, e demora segundos
  // pra perceber que um card "reapareceu", deixando o vídeo congelado.
  const itemOffsetsRef = useRef<{ left: number; width: number }[]>([]);
  const videoPairsRef = useRef<Map<string, HTMLVideoElement[]>>(new Map());
  const videoEntriesRef = useRef<VideoEntry[]>([]);

  const categories = t.contentShowcase.categories.map((category, index) => ({
    ...category,
    ...CATEGORY_STYLES[index % CATEGORY_STYLES.length],
  }));
  const loop = [...categories, ...categories];

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;

      let cumulative = 0;
      const offsets = Array.from(trackRef.current.children).map((child) => {
        const width = (child as HTMLElement).getBoundingClientRect().width;
        const entry = { left: cumulative, width };
        cumulative += width + GAP_PX;
        return entry;
      });

      itemOffsetsRef.current = offsets;
      setLoopWidth(trackRef.current.scrollWidth / 2);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [categories.length]);

  useEffect(() => {
    if (loopWidth <= 0) return;

    const controls = animate(x, [0, -loopWidth], {
      duration: loopWidth / 45,
      repeat: Infinity,
      ease: "linear",
    });

    return () => controls.stop();
  }, [loopWidth, x]);

  useAnimationFrame(() => {
    const offsets = itemOffsetsRef.current;
    if (offsets.length === 0 || !containerRef.current) return;

    const currentX = x.get();
    const containerWidth = containerRef.current.getBoundingClientRect().width;

    for (const entry of videoEntriesRef.current) {
      const offset = offsets[entry.itemIndex];
      if (!offset) continue;

      const screenLeft = offset.left + currentX;
      const screenRight = screenLeft + offset.width;
      const isNearby =
        screenRight > -VISIBILITY_MARGIN_PX && screenLeft < containerWidth + VISIBILITY_MARGIN_PX;

      if (isNearby) {
        if (entry.el.paused) {
          const pair = videoPairsRef.current.get(entry.label) ?? [];
          const other = pair.find((video) => video !== entry.el);
          if (other && !other.paused) {
            try {
              entry.el.currentTime = other.currentTime;
            } catch {
              // vídeo ainda sem metadata carregada - ignora, sincroniza no próximo frame
            }
          }
          void entry.el.play().catch(() => {});
        }
      } else if (!entry.el.paused) {
        entry.el.pause();
      }
    }
  });

  return (
    <section className="overflow-hidden px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {t.contentShowcase.kicker}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          {t.contentShowcase.title}
        </h2>
      </div>

      <div ref={containerRef} className="relative mt-10">
        <motion.div ref={trackRef} className="flex w-max gap-5 sm:gap-6" style={{ x }}>
          {loop.map((category, index) => (
            <div
              key={`${category.label}-${index}`}
              className={`shrink-0 ${category.wide ? "w-64 sm:w-80" : "w-44 sm:w-52"}`}
            >
              <p className="mb-2 text-center text-sm font-semibold text-slate-700">
                {category.label}
              </p>
              <div
                className={`home-card-hover relative flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br sm:h-80 ${category.accent} shadow-lg`}
              >
                {category.videoSrc ? (
                  <video
                    src={category.videoSrc}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                    ref={(el) => {
                      if (!el) return;

                      const pair = videoPairsRef.current.get(category.label) ?? [];
                      if (!pair.includes(el)) pair.push(el);
                      videoPairsRef.current.set(category.label, pair);

                      if (!videoEntriesRef.current.some((item) => item.el === el)) {
                        videoEntriesRef.current.push({ el, label: category.label, itemIndex: index });
                      }
                    }}
                    onTimeUpdate={(event) => {
                      const current = event.currentTarget;
                      const pair = videoPairsRef.current.get(category.label) ?? [];
                      for (const other of pair) {
                        if (
                          other !== current &&
                          !other.paused &&
                          Math.abs(other.currentTime - current.currentTime) > 0.2
                        ) {
                          current.currentTime = other.currentTime;
                        }
                      }
                    }}
                  />
                ) : (
                  <category.icon className="h-10 w-10 text-white/90" strokeWidth={1.5} />
                )}
              </div>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
                <category.platformIcon className="h-3.5 w-3.5 shrink-0" />
                <span>{category.handle}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
