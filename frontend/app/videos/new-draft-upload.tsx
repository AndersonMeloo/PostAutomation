"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createDraft } from "../lib/api";

export function NewDraftUpload({ accessToken }: { accessToken: string }) {
  const router = useRouter();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!videoFile) {
      setError("Selecione um arquivo de vídeo.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const draft = await createDraft(accessToken, {
        video: videoFile,
        title: title.trim() || undefined,
      });
      router.push(`/videos/${draft.id}/edit`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Falha ao enviar vídeo");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="dashboard-card p-5 md:p-6">
      <p className="premium-kicker text-xs">Novo vídeo</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Enviar vídeo para editar
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Envie o arquivo, defina o corte, a thumbnail e o formato antes de agendar a
        publicação.
      </p>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-200 light:text-rose-700">
          {error}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="grid gap-1 text-sm text-muted">
          Arquivo de vídeo
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm,video/x-matroska,.mp4,.mov,.webm,.mkv"
            onChange={(event) => setVideoFile(event.target.files?.[0] ?? null)}
            className="premium-input px-0 py-2 file:mr-4 file:rounded-full file:border-0 file:bg-(--border-soft-hover) file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foreground hover:file:bg-(--surface-glass-strong)"
          />
        </label>

        <label className="grid gap-1 text-sm text-muted">
          Título (opcional)
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={255}
            className="premium-input"
            placeholder="Deixe em branco para usar um título padrão"
          />
        </label>

        <button
          type="submit"
          disabled={!videoFile || isSubmitting}
          className="premium-button mt-1 px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:w-fit"
        >
          {isSubmitting ? "Enviando..." : "Enviar e editar"}
        </button>
      </form>
    </section>
  );
}
