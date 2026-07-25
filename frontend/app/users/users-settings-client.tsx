"use client";

import { FormEvent, useState } from "react";
import {
  deleteUserById,
  getUserById,
  type UserProfile,
  updateUserById,
} from "../lib/api";
import { getSession } from "../lib/auth-client";
import { useEffect } from "react";

export function UsersSettingsClient() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function loadProfile(nextToken: string, nextUserId: string) {
    if (!nextToken || !nextUserId) {
      setFeedback("Sessao incompleta. Faca login novamente.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const result = await getUserById(nextUserId, nextToken);
      setProfile(result);
      setName(result.name ?? "");
      setEmail(result.email ?? "");
      setPassword("");
      setFeedback("Perfil carregado com sucesso.");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Erro ao carregar perfil.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const session = getSession();
    if (!session.accessToken || !session.userId) {
      setFeedback("Não foi encontrada sessão ativa. Faça login antes de acessar Users.");
      return;
    }

    setToken(session.accessToken);
    setUserId(session.userId);
    void loadProfile(session.accessToken, session.userId);
  }, []);

  async function onLoadProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || !userId) {
      setFeedback("Informe token JWT e userId para carregar o perfil.");
      return;
    }

    await loadProfile(token, userId);
  }

  async function onSaveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || !userId) {
      setFeedback("Informe token JWT e userId para salvar alterações.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const result = await updateUserById(userId, token, {
        name: name || undefined,
        email: email || undefined,
        password: password || undefined,
      });
      setProfile(result);
      setPassword("");
      setFeedback("Perfil atualizado com sucesso.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Erro ao salvar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function onDeleteProfile() {
    if (!token || !userId) {
      setFeedback("Informe token JWT e userId para deletar.");
      return;
    }

    const confirmed = window.confirm(
      "Tem certeza que deseja deletar este usuario? Esta ação não pode ser desfeita.",
    );
    if (!confirmed) return;

    setLoading(true);
    setFeedback("");

    try {
      const result = await deleteUserById(userId, token);
      setFeedback(result.message || "Usuario removido.");
      setProfile(null);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Erro ao deletar usuario.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-5 animate-fade-up">
      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_26%)]" />
        <div className="relative">
          <p className="premium-kicker text-xs">Users</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Perfil, configurações e conta
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
            Tela conectada ao backend para buscar, editar e deletar usuário.
          </p>
        </div>
      </header>

      <form onSubmit={onLoadProfile} className="dashboard-card p-5 md:p-6">
        <h3 className="text-base font-semibold text-white">Autenticação da tela</h3>
        <p className="mt-1 text-sm text-slate-300">
          Token e userId são preenchidos automaticamente após login.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <label className="grid gap-1 text-sm text-slate-300">
            JWT Token
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="premium-input"
              placeholder="Bearer token sem o prefixo"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-300">
            User ID
            <input
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              className="premium-input"
              placeholder="UUID do usuario"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="premium-button mt-4 px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Carregando..." : "Carregar perfil"}
        </button>
      </form>

      <form onSubmit={onSaveProfile} className="dashboard-card p-5 md:p-6">
        <h3 className="text-base font-semibold text-white">Editar dados do perfil</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <label className="grid gap-1 text-sm text-slate-300">
            Nome
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="premium-input"
              placeholder="Nome do usuario"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-300">
            E-mail
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="premium-input"
              placeholder="email@dominio.com"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-300">
            Nova senha
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="premium-input"
              type="password"
              placeholder="Opcional"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={loading}
            className="premium-button px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            Salvar alterações
          </button>
          <button
            type="button"
            onClick={onDeleteProfile}
            disabled={loading}
            className="rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Deletar conta
          </button>
        </div>
      </form>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-base font-semibold text-white">Dados atuais</h3>
        <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/8 bg-black/40 p-4 text-xs text-slate-200">
          {JSON.stringify(profile, null, 2)}
        </pre>
      </section>

      {feedback ? (
        <p className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200 backdrop-blur-xl">
          {feedback}
        </p>
      ) : null}
    </section>
  );
}
