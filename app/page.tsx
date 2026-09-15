import type { Metadata } from "next";
import { HomePage } from "./components/home/home-page";

export const metadata: Metadata = {
  title: "PostAutomation | Automação de vídeos para criadores",
  description:
    "Agende, publique e analise o desempenho dos seus vídeos no YouTube, Instagram e TikTok em um só lugar.",
};

export default function Page() {
  return <HomePage />;
}
