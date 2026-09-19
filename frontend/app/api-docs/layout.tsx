"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "../lib/i18n/locale-context";
import { HomeFooter } from "../components/home/home-footer";

// O resto do site esconde a barra de rolagem globalmente (globals.css), mas
// nos blocos de código da doc a gente quer o oposto: uma barra visível,
// pra deixar claro que dá pra arrastar e ver o texto que passa da borda
// (tokens, URLs longas). Vai como <style> aqui, direto na página, porque
// esse projeto tem uma regra global de reset de scrollbar bem agressiva.
const CODE_SCROLLBAR_STYLES = `
  .code-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.28) transparent;
  }
  .code-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .code-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .code-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.28);
    border-radius: 9999px;
  }
  .code-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.45);
  }
`;

// Layout próprio da doc da API - sem o header público (é uma página mais
// "de app"/técnica do que de marketing), mas mantendo o rodapé do site.
// Usa o MESMO sistema de tema claro/escuro do dashboard (ThemeProvider já
// envolve o app inteiro no layout raiz), então o toggle na sidebar afeta a
// mesma preferência salva que o dashboard usa.
export default function ApiDocsLayout({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <style>{CODE_SCROLLBAR_STYLES}</style>
      <div className="min-h-screen w-full bg-background text-foreground">
        <main>{children}</main>
        <HomeFooter />
      </div>
    </LocaleProvider>
  );
}
