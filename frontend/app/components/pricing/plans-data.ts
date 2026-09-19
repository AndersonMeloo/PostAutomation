import type { PlanId } from "../../lib/i18n/types";

// Fonte única dos planos - preço e popularidade não são texto traduzido,
// então ficam aqui em vez de dentro do dicionário de i18n. O texto de cada
// plano (nome, recursos, etc.) vive em pricing.plans[id] nos arquivos de
// locale, usando ESTE MESMO id nos dois idiomas.
export type PlanMeta = {
  id: PlanId;
  monthlyPrice: number;
  popular: boolean;
};

export const PRICING_PLANS: PlanMeta[] = [
  { id: "basic", monthlyPrice: 33.99, popular: false },
  { id: "pro", monthlyPrice: 49.99, popular: true },
  { id: "premium", monthlyPrice: 79.99, popular: false },
];

export function formatMonthlyPrice(monthlyPrice: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(monthlyPrice);
}
