"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";
import { FacebookIcon, InstagramIcon } from "./icons";

type FooterLink =
  | { label: string; href: string; target?: "_blank" }
  | { label: string; comingSoon: true };

export function HomeFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const productLinks: FooterLink[] = [
    { href: "#recursos", label: t.header.navFeatures },
    { href: "#como-funciona", label: t.header.navHowItWorks },
    { href: "#plataformas", label: t.header.navPlatforms },
    { href: "#faq", label: t.header.navFaq },
    { href: "/precos", label: t.footer.links.pricing },
    { href: "/api-docs", label: "API", target: "_blank" },
  ];

  const companyLinks: FooterLink[] = [
    { href: "/", label: t.footer.links.home },
    { href: "/blog", label: t.footer.links.blog },
    { label: t.footer.links.about, comingSoon: true },
  ];

  const accountLinks = [
    { href: "/login", label: t.header.login },
    { href: "/cadastro", label: t.header.signup },
  ];

  return (
    <footer className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-6 select-none bg-linear-to-b from-blue-100 to-transparent bg-clip-text text-center text-[22vw] font-black leading-none tracking-tight text-transparent sm:text-[14vw]"
      >
        POSTAUTOMATION
      </p>

      <div className="relative mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.footer.backToTop}
          className="absolute left-1/2 top-0 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-white shadow-[0_12px_28px_-10px_rgba(15,23,42,0.45)] transition-transform hover:-translate-y-[calc(50%+3px)]"
        >
          <ArrowUp size={18} />
        </button>

        <div className="home-glass-strong relative flex flex-col gap-8 rounded-4xl p-8 sm:flex-row sm:gap-4 sm:p-10">
          <div className="absolute bottom-6 right-6 flex items-center gap-2 sm:bottom-8 sm:right-8">
            <SocialIcon label="Facebook" background="#1877F2">
              <FacebookIcon className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon
              label="Instagram"
              background="linear-gradient(135deg, #405de6 0%, #5b51d8 15%, #833ab4 30%, #c13584 45%, #e1306c 60%, #fd1d1d 70%, #f56040 80%, #f77737 90%, #fcaf45 100%)"
            >
              <InstagramIcon className="h-4 w-4" />
            </SocialIcon>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {t.footer.columns.product}
            </h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) =>
                "href" in link ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.target}
                      rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="text-sm text-slate-600 hover:text-slate-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <ComingSoonItem key={link.label} label={link.label} soonLabel={t.hero.comingSoon} />
                )
              )}
            </ul>
          </div>

          <div className="hidden w-px self-stretch bg-slate-200/70 sm:block" />

          <div className="flex-1">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {t.footer.columns.company}
            </h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) =>
                "href" in link ? (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-600 hover:text-slate-900">
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <ComingSoonItem key={link.label} label={link.label} soonLabel={t.hero.comingSoon} />
                )
              )}
            </ul>
          </div>

          <div className="hidden w-px self-stretch bg-slate-200/70 sm:block" />

          <div className="flex-1">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {t.footer.columns.account}
            </h3>
            <ul className="mt-4 space-y-2">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-slate-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-900">PostAutomation</p>
            <p className="text-xs text-slate-500">{t.footer.tagline}</p>
          </div>
          <p className="text-xs text-slate-400">
            © {year} PostAutomation. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  label,
  background,
  children,
}: {
  label: string;
  background: string;
  children: ReactNode;
}) {
  return (
    <span className="group relative inline-flex">
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.4)] transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100"
        style={{ background }}
      >
        {label}
      </span>
      <span
        aria-label={label}
        className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5"
        style={{ background }}
      >
        {children}
      </span>
    </span>
  );
}

function ComingSoonItem({ label, soonLabel }: { label: string; soonLabel: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400">
        {soonLabel}
      </span>
    </li>
  );
}
