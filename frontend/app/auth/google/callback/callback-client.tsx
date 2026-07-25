"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveSession } from "../../../lib/auth-client";

type GoogleCallbackClientProps = {
  accessToken: string;
  refreshToken: string;
};

export default function GoogleCallbackClient({
  accessToken,
  refreshToken,
}: GoogleCallbackClientProps) {
  const router = useRouter();
  const hasTokens = Boolean(accessToken && refreshToken);

  useEffect(() => {
    if (accessToken && refreshToken) {
      saveSession(accessToken, refreshToken);
      router.replace("/");
      return;
    }

    router.replace("/login");
  }, [accessToken, refreshToken, router]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-10">
      <section className="dashboard-card w-full max-w-3xl overflow-hidden p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7c9cff,#57d7ff)] text-white shadow-lg shadow-cyan-500/20">
            <span className="text-sm font-semibold">YT</span>
          </div>
          <div>
            <p className="premium-kicker text-xs">YouTube OAuth</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Finalizando conexão
            </h1>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">
          {hasTokens
            ? "Conta conectada com sucesso. Redirecionando..."
            : "Nao foi possivel concluir o login do Google. Redirecionando..."}
        </p>
      </section>
    </main>
  );
}
