"use client";

import { Clapperboard } from "lucide-react";
import { useEffect, useState } from "react";
import { isYoutubeUrl, resolveMediaUrl, youtubeEmbedUrlFrom } from "../../lib/media";

type VideoPreviewProps = {
  accessToken: string;
  video: {
    id: string;
    videoUrl: string | null;
    thumbnailUrl: string | null;
  };
};

export function VideoPreview({ accessToken, video }: VideoPreviewProps) {
  const [src, setSrc] = useState<string | null>(null);
  const embedUrl = isYoutubeUrl(video.videoUrl) ? youtubeEmbedUrlFrom(video.videoUrl) : null;

  useEffect(() => {
    if (embedUrl) return;

    let objectUrl: string | null = null;
    let cancelled = false;

    async function load() {
      const source = video.videoUrl ?? video.thumbnailUrl;
      const kind = video.videoUrl ? "video" : "thumbnail";
      const resolved = await resolveMediaUrl(accessToken, video.id, source, kind);

      if (cancelled) return;
      if (resolved?.startsWith("blob:")) objectUrl = resolved;
      setSrc(resolved);
    }

    void load();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [accessToken, video.id, video.videoUrl, video.thumbnailUrl, embedUrl]);

  return (
    <div className="dashboard-card p-4">
      <p className="premium-kicker text-xs">Pré-visualização</p>

      {embedUrl ? (
        <iframe
          src={embedUrl}
          title="Preview do vídeo no YouTube"
          allowFullScreen
          className="mt-3 aspect-video w-full rounded-2xl"
        />
      ) : src && video.videoUrl ? (
        <video src={src} controls className="mt-3 aspect-video w-full rounded-2xl bg-black" />
      ) : src && video.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="Thumbnail do vídeo" className="mt-3 aspect-video w-full rounded-2xl object-cover" />
      ) : (
        <div className="dash-chip mt-3 flex aspect-video w-full items-center justify-center rounded-2xl border text-sm text-muted">
          {video.videoUrl || video.thumbnailUrl ? (
            "Carregando..."
          ) : (
            <Clapperboard className="h-8 w-8 opacity-40" />
          )}
        </div>
      )}
    </div>
  );
}
