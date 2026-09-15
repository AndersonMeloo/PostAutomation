"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ApiError, loginUser, registerUser } from "../lib/api";
import { saveSession } from "../lib/auth-client";
import { LocaleProvider, useTranslations } from "../lib/i18n/locale-context";
import { AuthShell } from "../components/auth/auth-shell";

export default function CadastroPage() {
  return (
    <LocaleProvider>
      <CadastroForm />
    </LocaleProvider>
  );
}

function CadastroForm() {
  const t = useTranslations();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await registerUser({ name: name || undefined, email, password });
      const tokens = await loginUser({ email, password });
      saveSession(tokens.accessToken, tokens.refreshToken);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setErrorMessage(t.auth.signup.emailTaken);
      } else {
        setErrorMessage(t.auth.signup.genericError);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      kicker={t.auth.signup.kicker}
      title={t.auth.signup.title}
      subtitle={t.auth.signup.subtitle}
      switchPrompt={t.auth.signup.switchPrompt}
      switchCta={t.auth.signup.switchCta}
      switchHref="/login"
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          {t.auth.signup.nameLabel}
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-400"
            placeholder={t.auth.signup.namePlaceholder}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          {t.auth.shared.emailLabel}
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-400"
            placeholder={t.auth.shared.emailPlaceholder}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          {t.auth.shared.passwordLabel}
          <div className="relative">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-400"
              placeholder={t.auth.shared.passwordPlaceholder}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        {errorMessage ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t.auth.signup.submitLoadingCta : t.auth.signup.submitCta}
        </button>
      </form>
    </AuthShell>
  );
}
