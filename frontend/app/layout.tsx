import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { DashboardShell } from "./components/dashboard-shell";
import { ThemeProvider } from "./lib/theme-context";

// Roda antes da hidratação do React pra aplicar o tema salvo sem "flash" do
// tema escuro (padrão) antes de trocar pro claro. dark é o default implícito
// (nenhum atributo = usa os valores base do :root), então só precisa agir
// quando o usuário já escolheu "light" explicitamente.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('postautomation:dashboard-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Media Auto Publisher | Console",
  description: "Console premium para automação de mídias sociais e monitoramento do backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="h-full bg-background text-foreground">
        <ThemeProvider>
          <DashboardShell>{children}</DashboardShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
