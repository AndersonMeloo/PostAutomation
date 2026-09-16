import type { ReactNode } from "react";

type StatusBannerVariant = "info" | "success" | "warning" | "error";

const VARIANT_CLASSES: Record<StatusBannerVariant, string> = {
  info: "border-blue-400/20 bg-blue-500/10 text-blue-200 light:text-blue-700",
  success: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200 light:text-emerald-700",
  warning: "border-amber-400/20 bg-amber-500/10 text-amber-200 light:text-amber-800",
  error: "border-rose-400/20 bg-rose-500/10 text-rose-200 light:text-rose-700",
};

type StatusBannerProps = {
  variant: StatusBannerVariant;
  children: ReactNode;
  className?: string;
};

export function StatusBanner({ variant, children, className }: StatusBannerProps) {
  return (
    <p className={`rounded-2xl border p-4 text-sm ${VARIANT_CLASSES[variant]} ${className ?? ""}`}>
      {children}
    </p>
  );
}
