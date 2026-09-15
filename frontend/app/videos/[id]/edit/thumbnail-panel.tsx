"use client";

import { useState, type RefObject } from "react";
import { uploadDraftThumbnail } from "../../../lib/api";

type ThumbnailPanelProps = {
  accessToken: string;
  postId: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  thumbnailUrl: string | null;
  onSaved: (url: string) => void;
};

export function ThumbnailPanel({
  accessToken,
  postId,
  videoRef,
  thumbnailUrl,
  onSaved,
}: ThumbnailPanelProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function saveBlob(blob: Blob) {
    setSaving(true);
    setError("");

    try {
      await uploadDraftThumbnail(accessToken, postId, blob);
      onSaved(URL.createObjectURL(blob));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Falha ao salvar thumbnail");
    } finally {
      setSaving(false);
    }
  }

  function handleCaptureFrame() {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      setError("Aguarde o vídeo carregar antes de capturar um frame.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (blob) void saveBlob(blob);
      },
      "image/jpeg",
      0.9,
    );
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void saveBlob(file);
  }

  return (
    <div className="dashboard-card p-4">
      <p className="premium-kicker text-xs">Thumbnail</p>

      <div className="mt-3 flex items-center gap-3">
        <div className="dash-chip flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border text-center text-xs text-muted">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnailUrl} alt="Thumbnail do vídeo" className="h-full w-full object-cover" />
          ) : (
            "Sem thumbnail"
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleCaptureFrame}
            disabled={saving}
            className="premium-button-secondary px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-60"
          >
            Capturar frame atual
          </button>
          <label className="premium-button-secondary cursor-pointer px-3 py-2 text-center text-xs">
            Enviar imagem
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {error ? <p className="mt-2 text-xs text-rose-300 light:text-rose-700">{error}</p> : null}
      {saving ? <p className="mt-2 text-xs text-muted">Salvando...</p> : null}
    </div>
  );
}
