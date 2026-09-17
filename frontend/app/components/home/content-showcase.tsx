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
import { InstagramColorIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "./icons";
import { SectionGlow } from "./section-glow";

const PLATFORM_BRAND_ICON: Record<string, typeof YouTubeIcon> = {
  YouTube: YouTubeIcon,
  Instagram: InstagramColorIcon,
  TikTok: TikTokIcon,
};

const PLATFORM_BRAND_ICON_COLOR: Record<string, string> = {
  YouTube: "text-[#FF0000]",
  Instagram: "",
  TikTok: "text-black",
};

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
  
  const itemOffsetsRef = useRef<{ left: number; width: number }[]>([]);
  const videoPairsRef = useRef<Map<string, HTMLVideoElement[]>>(new Map());
  const videoEntriesRef = useRef<VideoEntry[]>([]);

  const categories = t.contentShowcase.categories.map((category, index) => ({
    ...category,
    ...CATEGORY_STYLES[index % CATEGORY_STYLES.length],
  }));

  // Multiplicamos as categorias 4 vezes em vez de 2 para garantir que monitores ultrawide 
  // e telas grandes nunca vejam o fim da faixa de vídeos antes do reset do looping.
  const loop = [...categories, ...categories, ...categories, ...categories];

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      
      const trackRect = trackRef.current.getBoundingClientRect();
      const children = Array.from(trackRef.current.children);
      
      // Captura a posição exata baseada na renderização real do navegador, 
      // respeitando gaps de mobile (gap-5) e desktop (gap-6) nativamente.
      const offsets = children.map((child) => {
        const rect = child.getBoundingClientRect();
        return {
          left: rect.left - trackRect.left,
          width: rect.width,
        };
      });
      
      itemOffsetsRef.current = offsets;
      
      // A largura exata de movimentação é a distância até onde começa
      // o primeiro card do SEGUNDO bloco (início do ciclo de repetição).
      if (offsets[categories.length]) {
        setLoopWidth(offsets[categories.length].left);
      }
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
          const instances = videoPairsRef.current.get(entry.label) ?? [];
          const other = instances.find((video) => video !== entry.el);
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
    <section id="plataformas" className="relative overflow-hidden px-4 py-16 sm:px-6">
      <SectionGlow
        blobs={[
          { position: "left-1/3 top-0 h-64 w-64", color: "bg-indigo-200/20" },
          { position: "right-[6%] bottom-10 h-56 w-56", color: "bg-cyan-200/20" },
        ]}
      />
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center justify-center gap-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {t.contentShowcase.kicker}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-5xl">
          {t.contentShowcase.title}
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {t.platforms.items.map((platform) => {
            const Icon = PLATFORM_BRAND_ICON[platform.name];
            const iconColor = PLATFORM_BRAND_ICON_COLOR[platform.name];
            // const isSoon = platform.status === "soon";
            return (
              <div key={platform.name} className="home-card-hover flex items-center gap-2 rounded-full">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-100">
                  <Icon className={`h-7 w-7 ${iconColor}`} />
                </span>
                {/* <span className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-slate-100">
                  <span className="text-sm font-semibold text-slate-800">{platform.name}</span>
                  {isSoon ? (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                      {t.hero.comingSoon}
                    </span>
                  ) : null}
                </span> */}
              </div>
            );
          })}
        </div>
      </div>
      
      <div ref={containerRef} className="relative mt-10">
        <motion.div ref={trackRef} className="flex w-max gap-5 sm:gap-14" style={{ x }}>
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
                      const instances = videoPairsRef.current.get(category.label) ?? [];
                      if (!instances.includes(el)) instances.push(el);
                      videoPairsRef.current.set(category.label, instances);
                      if (!videoEntriesRef.current.some((item) => item.el === el)) {
                        videoEntriesRef.current.push({ el, label: category.label, itemIndex: index });
                      }
                    }}
                    onTimeUpdate={(event) => {
                      const current = event.currentTarget;
                      const instances = videoPairsRef.current.get(category.label) ?? [];
                      for (const other of instances) {
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