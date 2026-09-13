"use client";

import { useEffect, useState } from "react";
import { Upload, Calendar, BarChart3 } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";

const STEP_ICONS = [Upload, Calendar, BarChart3];
const STEP_DURATION = 4500;

const STEP_STYLES = [
  {
    idleBg: "bg-linear-to-br from-violet-50 via-white to-white",
    activeBg: "bg-linear-to-br from-violet-100 via-violet-50 to-white",
    ring: "ring-2 ring-violet-300",
    shadow: "shadow-[0_24px_55px_-20px_rgba(124,58,237,0.4)]",
    number: "text-violet-600",
    iconBg: "bg-violet-500",
    iconColor: "text-white",
    bar: "bg-violet-500",
    track: "bg-violet-100",
  },
  {
    idleBg: "bg-linear-to-br from-blue-50 via-white to-white",
    activeBg: "bg-linear-to-br from-blue-100 via-blue-50 to-white",
    ring: "ring-2 ring-blue-300",
    shadow: "shadow-[0_24px_55px_-20px_rgba(37,99,235,0.4)]",
    number: "text-blue-600",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    bar: "bg-blue-500",
    track: "bg-blue-100",
  },
  {
    idleBg: "bg-linear-to-br from-emerald-50 via-white to-white",
    activeBg: "bg-linear-to-br from-emerald-100 via-emerald-50 to-white",
    ring: "ring-2 ring-emerald-300",
    shadow: "shadow-[0_24px_55px_-20px_rgba(5,150,105,0.4)]",
    number: "text-emerald-600",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    bar: "bg-emerald-500",
    track: "bg-emerald-100",
  },
];

export function HowItWorks() {
  const t = useTranslations();
  const [activeStep, setActiveStep] = useState(0);
  const steps = t.howItWorks.steps;

  useEffect(() => {
    setActiveStep(0);
  }, [steps]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <section id="como-funciona" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
          {t.howItWorks.kicker}
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold text-slate-900 sm:text-4xl">
          {t.howItWorks.title}
        </h2>

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length];
            const style = STEP_STYLES[index % STEP_STYLES.length];
            const isActive = index === activeStep;

            return (
              <div
                key={step.number}
                className={`flex h-full min-h-80 flex-col justify-between rounded-3xl border border-white/70 p-7 text-left shadow-[0_1px_1px_rgba(15,23,42,0.03),0_16px_40px_-16px_rgba(15,23,42,0.14),0_40px_80px_-32px_rgba(15,23,42,0.12)] transition-all duration-300 ${
                  isActive ? `${style.activeBg} ${style.ring} ${style.shadow} scale-[1.02]` : style.idleBg
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${style.number}`}>{step.number}</span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${style.iconBg} ${style.iconColor} transition-transform duration-300 ${
                        isActive ? "scale-110" : ""
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>

                <div className={`mt-6 h-1.5 w-full overflow-hidden rounded-full ${style.track}`}>
                  <div
                    className={`h-full rounded-full transition-all ${style.bar} ${
                      isActive ? "w-full" : "w-0"
                    }`}
                    style={{ transitionDuration: isActive ? `${STEP_DURATION}ms` : "300ms" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
