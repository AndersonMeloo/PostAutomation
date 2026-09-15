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
      router.replace("/dashboard");
      return;
    }

    router.replace("/login");
  }, [accessToken, refreshToken, router]);

  return (
    <main className="home-canvas flex min-h-screen w-full items-center justify-center px-4 py-10">
      <section className="home-glass-strong w-full max-w-md rounded-4xl p-8 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500" />

        <h1 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
          {hasTokens ? "Login realizado com sucesso" : "Não foi possível entrar com o Google"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {hasTokens
            ? "Redirecionando para o seu painel..."
            : "Redirecionando de volta para o login..."}
        </p>
      </section>
    </main>
  );
}
