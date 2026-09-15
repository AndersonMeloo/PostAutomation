"use client";

import { useMemo, useState } from "react";
import { NicheItem, uploadVideoPost } from "../lib/api";

type VideoUploadFormProps = {
  token: string;
  niches: NicheItem[];
};

function toDatetimeLocalInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function VideoUploadForm({ token, niches }: VideoUploadFormProps) {
  const activeNiches = useMemo(
    () => niches.filter((niche) => niche.active),
    [niches],
  );

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nicheId, setNicheId] = useState(activeNiches[0]?.id ?? "");
  const [scheduledAt, setScheduledAt] = useState(
    toDatetimeLocalInputValue(new Date(Date.now() + 2 * 60 * 1000)),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const canSubmit =
    Boolean(videoFile) &&
    Boolean(title.trim()) &&
    Boolean(nicheId) &&
    Boolean(scheduledAt) &&
    !isSubmitting;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!videoFile) {
      setError("Selecione um arquivo de video.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const isoDate = new Date(scheduledAt).toISOString();

      await uploadVideoPost(token, {
        video: videoFile,
        title: title.trim(),
        description: description.trim() || undefined,
        nicheId,
        scheduledAt: isoDate,
      });

      setMessage("Video enviado com sucesso. O post foi agendado.");
      setVideoFile(null);
      setTitle("");
      setDescription("");
      setScheduledAt(toDatetimeLocalInputValue(new Date(Date.now() + 2 * 60 * 1000)));

      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (caughtError) {
      const value =
        caughtError instanceof Error ? caughtError.message : "Falha ao enviar video";
      setError(value);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="dashboard-card p-5 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="premium-kicker text-xs">Upload</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Enviar e agendar vídeo</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Envie o arquivo e defina título, descrição e horário diretamente por aqui.
          </p>
        </div>
      </div>

      {activeNiches.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-200">
          Nenhum nicho ativo encontrado. Ative ou crie um nicho antes de enviar videos.
        </p>
      ) : null}

      {message ? (
        <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="mt-4 grid gap-3">
        <label className="grid gap-1 text-sm text-slate-300">
          Arquivo de video
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm,video/x-matroska,.mp4,.mov,.webm,.mkv"
            onChange={(event) => setVideoFile(event.target.files?.[0] ?? null)}
            className="premium-input px-0 py-2 file:mr-4 file:rounded-full file:border-0 file:bg-white/8 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-white/12"
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          Titulo
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={255}
            className="premium-input"
            placeholder="Ex.: 3 dicas para Shorts no Canva"
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          Descricao
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={500}
            className="premium-input min-h-24"
            placeholder="Ex.: Tutorial rapido de edicao vertical para YouTube Shorts."
          />
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          Nicho
          <select
            value={nicheId}
            onChange={(event) => setNicheId(event.target.value)}
            className="premium-input"
          >
            {activeNiches.map((niche) => (
              <option key={niche.id} value={niche.id}>
                {niche.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm text-slate-300">
          Agendar para
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(event) => setScheduledAt(event.target.value)}
            className="premium-input"
          />
        </label>

        <button
          type="submit"
          disabled={!canSubmit || activeNiches.length === 0}
          className="premium-button mt-1 px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : "Enviar e agendar video"}
        </button>
      </form>
    </section>
  );
}
