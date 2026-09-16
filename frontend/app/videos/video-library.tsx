"use client";

import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import type { PostListItem, VideoFormat } from "../lib/api";
import { VideoCard, type VideoCardData } from "../components/dashboard/video-card";
import { NewDraftUpload } from "./new-draft-upload";

type StatusFilter = "ALL" | "DRAFT" | "PENDING" | "POSTED";
type FormatFilter = "ALL" | VideoFormat;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "DRAFT", label: "Em andamento" },
  { value: "PENDING", label: "Agendados" },
  { value: "POSTED", label: "Publicados" },
];

const FORMAT_TABS: { value: FormatFilter; label: string }[] = [
  { value: "ALL", label: "Todos formatos" },
  { value: "SHORT", label: "Shorts" },
  { value: "STANDARD", label: "Padrão" },
];

type VideoLibraryProps = {
  accessToken: string;
  posts: PostListItem[];
};

export function VideoLibrary({ accessToken, posts }: VideoLibraryProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [format, setFormat] = useState<FormatFilter>("ALL");
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (status !== "ALL" && post.status !== status) return false;
      if (format !== "ALL" && post.format !== format) return false;
      if (normalizedQuery && !post.title.toLowerCase().includes(normalizedQuery)) return false;
      return true;
    });
  }, [posts, status, format, query]);

  return (
    <div className="space-y-6">
      <section className="dashboard-card p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Biblioteca de vídeos</h3>
            <p className="mt-1 text-sm text-muted">
              {posts.length} vídeo{posts.length === 1 ? "" : "s"} na sua biblioteca.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setUploadOpen((value) => !value)}
            className="premium-button px-4 py-2.5 text-sm"
          >
            {uploadOpen ? <X size={16} /> : <Plus size={16} />}
            {uploadOpen ? "Fechar" : "Novo vídeo"}
          </button>
        </div>

        {uploadOpen ? (
          <div className="mt-5 border-t border-(--border-soft) pt-5">
            <NewDraftUpload accessToken={accessToken} />
          </div>
        ) : null}
      </section>

      <section className="dashboard-card p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative md:max-w-sm md:flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por título..."
              className="premium-input pl-9"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <div className="dash-panel inline-flex flex-wrap rounded-full border p-1">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  data-active={status === tab.value}
                  onClick={() => setStatus(tab.value)}
                  className="premium-tab px-3 py-1.5 text-xs font-medium"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="dash-panel inline-flex flex-wrap rounded-full border p-1">
              {FORMAT_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  data-active={format === tab.value}
                  onClick={() => setFormat(tab.value)}
                  className="premium-tab px-3 py-1.5 text-xs font-medium"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5">
          {filtered.length === 0 ? (
            <p className="dash-chip rounded-2xl border p-6 text-center text-sm text-muted">
              {posts.length === 0
                ? "Nenhum vídeo por enquanto. Clique em \"Novo vídeo\" para começar."
                : "Nenhum vídeo encontrado com esse filtro."}
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => {
                const video: VideoCardData = {
                  id: post.id,
                  title: post.title,
                  status: post.status,
                  format: post.format,
                  thumbnailUrl: post.thumbnailUrl,
                  videoUrl: post.videoUrl,
                  latestAnalytics: post.analytics[0] ?? null,
                };

                return <VideoCard key={post.id} accessToken={accessToken} video={video} />;
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
