"use client";

import { forwardRef } from "react";

type VideoPreviewPanelProps = {
  videoUrl: string | null;
  onLoadedMetadata: () => void;
};

export const VideoPreviewPanel = forwardRef<HTMLVideoElement, VideoPreviewPanelProps>(
  function VideoPreviewPanel({ videoUrl, onLoadedMetadata }, ref) {
    return (
      <div className="dashboard-card p-4">
        <p className="premium-kicker text-xs">Pré-visualização</p>

        {videoUrl ? (
          <video
            ref={ref}
            src={videoUrl}
            controls
            onLoadedMetadata={onLoadedMetadata}
            className="mt-3 aspect-video w-full rounded-2xl bg-black"
          />
        ) : (
          <div className="dash-chip mt-3 flex aspect-video w-full items-center justify-center rounded-2xl border text-sm text-muted">
            Carregando vídeo...
          </div>
        )}
      </div>
    );
  },
);
