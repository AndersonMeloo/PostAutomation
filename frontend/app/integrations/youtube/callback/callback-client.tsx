"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type YoutubeConnectCallbackClientProps = {
  status: "success" | "error";
};

export default function YoutubeConnectCallbackClient({
  status,
}: YoutubeConnectCallbackClientProps) {
  const router = useRouter();
  const success = status === "success";

  useEffect(() => {
    const timeout = setTimeout(() => router.replace("/users"), 2000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-10">
      <section className="dashboard-card w-full max-w-3xl overflow-hidden p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7c9cff,#57d7ff)] text-white shadow-lg shadow-cyan-500/20">
            <span className="text-sm font-semibold">YT</span>
          </div>
          <div>
            <p className="premium-kicker text-xs">Integração YouTube</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {success ? "Canal conectado" : "Não foi possível conectar"}
            </h1>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-muted md:text-base">
          {success
            ? "Seu canal do YouTube foi conectado com sucesso. Redirecionando..."
            : "Não foi possível concluir a conexão com o YouTube. Redirecionando..."}
        </p>
      </section>
    </main>
  );
}
