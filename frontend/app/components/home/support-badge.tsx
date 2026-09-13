"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";

export function SupportBadge() {
  const t = useTranslations();

  return (
    <button
      type="button"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-0.5"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <span className="hidden sm:inline">{t.support.chatButton}</span>
      <MessageCircle size={16} className="sm:hidden" />
    </button>
  );
}
