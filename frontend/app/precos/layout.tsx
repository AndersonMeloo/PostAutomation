"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "../lib/i18n/locale-context";
import { HomeHeader } from "../components/home/home-header";
import { HomeFooter } from "../components/home/home-footer";

export default function PricingLayout({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <div className="home-canvas min-h-screen w-full text-slate-900">
        <HomeHeader />
        <main>{children}</main>
        <HomeFooter />
      </div>
    </LocaleProvider>
  );
}
