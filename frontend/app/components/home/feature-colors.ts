import type { ComponentType } from "react";
import { Calendar, TrendingUp, Sparkles } from "lucide-react";
import { TikTokIcon, YouTubeIcon, InstagramIcon } from "./icons";

export type FeatureId =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "scheduling"
  | "metrics"
  | "aiClip";

type FeatureStyle = {
  icon: ComponentType<{ className?: string }>;
  /** Fundo sólido - usado tanto no círculo do ícone quanto na cápsula de texto. */
  pill: string;
  /** Cor do texto/ícone sobre o fundo sólido (sempre branco). */
  pillText: string;
  /** Cor do texto secundário ("Em breve") sobre o fundo sólido. */
  pillMuted: string;
  iconBg: string;
  iconColor: string;
  /** Tons suaves usados em fundos maiores (painéis, blur), fora dos cards. */
  soft: string;
  softIconBg: string;
  softIconColor: string;
  ring: string;
};

// Paleta por funcionalidade/plataforma - usada nos badges do hero, na faixa de
// plataformas e nos pilares, para dar identidade visual consistente sem
// depender de um azul/indigo único em tudo.
// Padrão: fundo colorido (mesma cor no círculo do ícone e na cápsula) + ícone e texto brancos.
export const FEATURE_STYLES: Record<FeatureId, FeatureStyle> = {
  youtube: {
    icon: YouTubeIcon,
    pill: "bg-[#FF0000]",
    pillText: "text-white",
    pillMuted: "text-red-100",
    iconBg: "bg-[#FF0000]",
    iconColor: "text-white",
    soft: "bg-red-50",
    softIconBg: "bg-red-100",
    softIconColor: "text-red-600",
    ring: "ring-red-100",
  },
  instagram: {
    icon: InstagramIcon,
    pill: "bg-[linear-gradient(135deg,_#405de6_0%,_#5b51d8_15%,_#833ab4_30%,_#c13584_45%,_#e1306c_60%,_#fd1d1d_70%,_#f56040_80%,_#f77737_90%,_#fcaf45_100%)]",
    pillText: "text-white",
    pillMuted: "text-white/80",
    iconBg: "bg-[linear-gradient(135deg,_#405de6_0%,_#5b51d8_15%,_#833ab4_30%,_#c13584_45%,_#e1306c_60%,_#fd1d1d_70%,_#f56040_80%,_#f77737_90%,_#fcaf45_100%)]",
    iconColor: "text-white",
    soft: "bg-rose-50",
    softIconBg: "bg-rose-100",
    softIconColor: "text-rose-600",
    ring: "ring-rose-100",
  },
  tiktok: {
    icon: TikTokIcon,
    pill: "bg-black",
    pillText: "text-white",
    pillMuted: "text-slate-300",
    iconBg: "bg-black",
    iconColor: "text-white",
    soft: "bg-cyan-50",
    softIconBg: "bg-cyan-100",
    softIconColor: "text-cyan-700",
    ring: "ring-cyan-100",
  },
  scheduling: {
    icon: Calendar,
    pill: "bg-blue-500",
    pillText: "text-white",
    pillMuted: "text-blue-100",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    soft: "bg-blue-50",
    softIconBg: "bg-blue-100",
    softIconColor: "text-blue-600",
    ring: "ring-blue-100",
  },
  metrics: {
    icon: TrendingUp,
    pill: "bg-emerald-500",
    pillText: "text-white",
    pillMuted: "text-emerald-100",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    soft: "bg-emerald-50",
    softIconBg: "bg-emerald-100",
    softIconColor: "text-emerald-600",
    ring: "ring-emerald-100",
  },
  aiClip: {
    icon: Sparkles,
    pill: "bg-violet-500",
    pillText: "text-white",
    pillMuted: "text-violet-100",
    iconBg: "bg-violet-500",
    iconColor: "text-white",
    soft: "bg-violet-50",
    softIconBg: "bg-violet-100",
    softIconColor: "text-violet-600",
    ring: "ring-violet-100",
  },
};
