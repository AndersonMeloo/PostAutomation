"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  editDraft,
  fetchDraftAssetBlobUrl,
  finalizeDraft,
  type DraftPost,
  type NicheItem,
  type VideoFormat,
} from "../../../lib/api";
import { VideoPreviewPanel } from "./video-preview-panel";
import { TrimPanel } from "./trim-panel";
import { FormatPanel } from "./format-panel";
import { ThumbnailPanel } from "./thumbnail-panel";
import { ActionsBar } from "./actions-bar";

type VideoEditorProps = {
  accessToken: string;
  draft: DraftPost;
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

export function VideoEditor({ accessToken, draft, niches }: VideoEditorProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const [title, setTitle] = useState(draft.title);
  const [description, setDescription] = useState(draft.description ?? "");
  const [format, setFormat] = useState<VideoFormat | null>(draft.format);
  const [trimStart, setTrimStart] = useState(draft.trimStart ?? 0);
  const [trimEnd, setTrimEnd] = useState(draft.trimEnd ?? 0);

  const activeNiches = niches.filter((niche) => niche.active);
  const [nicheId, setNicheId] = useState(draft.nicheId ?? activeNiches[0]?.id ?? "");
  const [scheduledAt, setScheduledAt] = useState(
    toDatetimeLocalInputValue(new Date(Date.now() + 10 * 60 * 1000)),
  );

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    void fetchDraftAssetBlobUrl(accessToken, draft.id, "video").then((url) => {
      if (cancelled) return;
      objectUrl = url;
      setVideoUrl(url);
    });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [accessToken, draft.id]);

  useEffect(() => {
    if (!draft.thumbnailUrl) return;

    let objectUrl: string | null = null;
    let cancelled = false;

    void fetchDraftAssetBlobUrl(accessToken, draft.id, "thumbnail").then((url) => {
      if (cancelled) return;
      objectUrl = url;
      setThumbnailUrl(url);
    });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, draft.id]);

  function handleLoadedMetadata() {
    const value = videoRef.current?.duration;
    if (value && Number.isFinite(value)) {
      setDuration(value);
      setTrimEnd((current) => (current > 0 ? current : value));
    }
  }

  function useCurrentTimeFor(field: "trimStart" | "trimEnd") {
    const current = videoRef.current?.currentTime ?? 0;
    if (field === "trimStart") setTrimStart(current);
    else setTrimEnd(current);
  }

  async function persistEdits(): Promise<boolean> {
    setSaving(true);
    setError("");

    try {
      await editDraft(accessToken, draft.id, {
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        format: format ?? undefined,
        trimStart,
        trimEnd,
      });
      return true;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Falha ao salvar alterações");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveAndContinue() {
    setFeedback("");
    const ok = await persistEdits();
    if (ok) setFeedback("Alterações salvas.");
  }

  async function handleSaveAndExit() {
    const ok = await persistEdits();
    if (ok) router.push("/videos");
  }

  async function handleFinalize() {
    if (!nicheId || !scheduledAt) {
      setError("Selecione um nicho e um horário para publicar.");
      return;
    }

    setFeedback("");
    const ok = await persistEdits();
    if (!ok) return;

    setSaving(true);
    setError("");

    try {
      const isoDate = new Date(scheduledAt).toISOString();
      await finalizeDraft(accessToken, draft.id, {
        nicheId,
        scheduledAt: isoDate,
        title: title.trim() || undefined,
        description: description.trim() || undefined,
      });
      router.push("/posts");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Falha ao preparar publicação");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      {error ? (
        <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200 light:text-rose-700">
          {error}
        </p>
      ) : null}
      {feedback ? (
        <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200 light:text-emerald-700">
          {feedback}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-4">
          <VideoPreviewPanel ref={videoRef} videoUrl={videoUrl} onLoadedMetadata={handleLoadedMetadata} />
          <TrimPanel
            duration={duration}
            trimStart={trimStart}
            trimEnd={trimEnd}
            onChangeStart={setTrimStart}
            onChangeEnd={setTrimEnd}
            onUseCurrentTime={useCurrentTimeFor}
          />
        </div>

        <div className="space-y-4">
          <div className="dashboard-card p-4">
            <p className="premium-kicker text-xs">Detalhes</p>
            <label className="mt-3 grid gap-1 text-sm text-muted">
              Título
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={255}
                className="premium-input"
              />
            </label>
            <label className="mt-3 grid gap-1 text-sm text-muted">
              Descrição
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={500}
                className="premium-input min-h-20"
              />
            </label>
          </div>

          <FormatPanel format={format} onChange={setFormat} />

          <ThumbnailPanel
            accessToken={accessToken}
            postId={draft.id}
            videoRef={videoRef}
            thumbnailUrl={thumbnailUrl}
            onSaved={setThumbnailUrl}
          />

          <div className="dashboard-card p-4">
            <p className="premium-kicker text-xs">Publicação</p>
            <label className="mt-3 grid gap-1 text-sm text-muted">
              Nicho
              <select
                value={nicheId}
                onChange={(event) => setNicheId(event.target.value)}
                className="premium-input"
              >
                <option value="" disabled>
                  Selecione um nicho
                </option>
                {activeNiches.map((niche) => (
                  <option key={niche.id} value={niche.id}>
                    {niche.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-3 grid gap-1 text-sm text-muted">
              Agendar para
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(event) => setScheduledAt(event.target.value)}
                className="premium-input"
              />
            </label>
          </div>
        </div>
      </div>

      <ActionsBar
        saving={saving}
        canFinalize={Boolean(nicheId && scheduledAt)}
        onSaveAndContinue={handleSaveAndContinue}
        onSaveAndExit={handleSaveAndExit}
        onFinalize={handleFinalize}
      />
    </div>
  );
}
