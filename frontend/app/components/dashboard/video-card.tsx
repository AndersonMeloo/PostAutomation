"use client";

import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { useEffect, useState } from "react";
import type { VideoFormat } from "../../lib/api";
import { resolveMediaUrl, youtubeThumbnailFrom } from "../../lib/media";
import { FormatBadge, StatusBadge } from "./badges";

export type VideoCardData = {
  id: string;
  title: string;
  status: string;
  format: VideoFormat | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  latestAnalytics?: {
    views: number;
    likes: number;
    comments: number;
  } | null;
};

type VideoCardProps = {
  accessToken: string;
  video: VideoCardData;
};

export function VideoCard({ accessToken, video }: VideoCardProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const isDraft = video.status === "DRAFT";
  const href = isDraft ? `/videos/${video.id}/edit` : `/videos/${video.id}`;

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    async function load() {
      const resolved = await resolveMediaUrl(
        accessToken,
        video.id,
        video.thumbnailUrl,
        "thumbnail",
      );
      const finalUrl = resolved ?? youtubeThumbnailFrom(video.videoUrl);

      if (cancelled) return;

      if (resolved?.startsWith("blob:")) {
        objectUrl = resolved;
      }
      setThumbnail(finalUrl);
    }

    void load();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [accessToken, video.id, video.thumbnailUrl, video.videoUrl]);

  const aspect = video.format === "SHORT" ? "aspect-[9/16]" : "aspect-video";

  return (
    <Link
      href={href}
      className="dashboard-card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1"
    >
      <div className={`relative ${aspect} w-full overflow-hidden bg-(--surface-glass-strong)`}>
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            <Clapperboard className="h-8 w-8 opacity-40" />
          </div>
        )}

        <div className="absolute left-2 top-2">
          <FormatBadge format={video.format} overlay />
        </div>
        <div className="absolute right-2 top-2">
          <StatusBadge status={video.status} overlay />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="line-clamp-2 text-sm font-semibold text-foreground">{video.title}</p>

        {video.latestAnalytics ? (
          <p className="text-xs text-muted">
            {video.latestAnalytics.views} views · {video.latestAnalytics.likes} curtidas ·{" "}
            {video.latestAnalytics.comments} comentários
          </p>
        ) : (
          <p className="text-xs text-muted">
            {isDraft
              ? "Continuar edição"
              : video.status === "PENDING"
                ? "Aguardando publicação"
                : "Sem métricas ainda"}
          </p>
        )}
      </div>
    </Link>
  );
}
