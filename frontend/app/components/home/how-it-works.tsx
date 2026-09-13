"use client";

import { useEffect, useState } from "react";
import { Upload, Calendar, BarChart3 } from "lucide-react";
import { useTranslations } from "../../lib/i18n/locale-context";

const STEP_ICONS = [Upload, Calendar, BarChart3];
const STEP_DURATION = 4500;

const STEP_STYLES = [
  {
    border: "border-violet-300",
    shadow: "shadow-[0_20px_45px_-20px_rgba(124,58,237,0.35)]",
    number: "text-violet-600",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    bar: "bg-violet-500",
  },
  {
    border: "border-blue-300",
    shadow: "shadow-[0_20px_45px_-20px_rgba(37,99,235,0.35)]",
    number: "text-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    bar: "bg-blue-500",
  },
  {
    border: "border-emerald-300",
    shadow: "shadow-[0_20px_45px_-20px_rgba(5,150,105,0.35)]",
    number: "text-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    bar: "bg-emerald-500",
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
    <section id="como-funciona" className="bg-slate-50/60 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
          {t.howItWorks.kicker}
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold text-slate-900 sm:text-4xl">
          {t.howItWorks.title}
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length];
            const style = STEP_STYLES[index % STEP_STYLES.length];
            const isActive = index === activeStep;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`rounded-3xl border bg-white p-6 text-left transition-all duration-300 ${
                  isActive ? `${style.border} ${style.shadow}` : "border-slate-100 shadow-sm hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-bold ${isActive ? style.number : "text-slate-300"}`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      isActive ? `${style.iconBg} ${style.iconColor}` : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>

                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${style.bar} ${
                      isActive ? "w-full" : "w-0"
                    }`}
                    style={{ transitionDuration: isActive ? `${STEP_DURATION}ms` : "300ms" }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
