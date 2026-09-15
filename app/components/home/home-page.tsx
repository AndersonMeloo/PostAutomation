"use client";

import { LocaleProvider } from "../../lib/i18n/locale-context";
import { HomeHeader } from "./home-header";
import { Hero } from "./hero";
import { PlatformStrip } from "./platform-strip";
import { LiveFeed } from "./live-feed";
import { HowItWorks } from "./how-it-works";
import { ScrollPillars } from "./scroll-pillars";
import { Benefits } from "./benefits";
import { MetricsPreview } from "./metrics-preview";
import { Pricing } from "./pricing";
import { FinalCta } from "./final-cta";
import { Faq } from "./faq";
import { HomeFooter } from "./home-footer";
import { SupportBadge } from "./support-badge";

export function HomePage() {
  return (
    <LocaleProvider>
      <div className="home-canvas min-h-screen w-full text-slate-900">
        <HomeHeader />
        <main>
          <Hero />
          <Benefits />
          <PlatformStrip />
          {/* <LiveFeed /> */}
          <HowItWorks />
          <ScrollPillars />
          <MetricsPreview />
          <Pricing />
          <FinalCta />
          <Faq />
        </main>
        <HomeFooter />
        <SupportBadge />
      </div>
    </LocaleProvider>
  );
}
