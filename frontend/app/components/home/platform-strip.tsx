"use client";

import { useTranslations } from "../../lib/i18n/locale-context";
import { FEATURE_STYLES, type FeatureId } from "./feature-colors";

const PLATFORM_IDS: Record<string, FeatureId> = {
  YouTube: "youtube",
  Instagram: "instagram",
  TikTok: "tiktok",
};

export function PlatformStrip() {
  const t = useTranslations();

  return (
    <section id="plataformas" className="bg-linear-to-b from-white via-slate-50/60 to-white px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {t.platforms.kicker}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          {t.platforms.title}
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {t.platforms.items.map((platform) => {
            const style = FEATURE_STYLES[PLATFORM_IDS[platform.name]];
            const Icon = style.icon;
            const isSoon = platform.status === "soon";

            return (
              <div key={platform.name} className="flex items-center gap-2">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${style.iconBg} shadow-md`}>
                  <Icon className={`h-5 w-5 ${style.iconColor}`} />
                </span>
                <span className={`flex items-center gap-2 rounded-full ${style.pill} px-5 py-3 shadow-sm`}>
                  <span className={`text-sm font-semibold ${style.pillText}`}>{platform.name}</span>
                  {isSoon ? (
                    <span className="rounded-full bg-white/25 px-2 py-0.5 text-[11px] font-medium text-white">
                      {t.hero.comingSoon}
                    </span>
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
