import { fetchDraftAssetBlobUrl } from "./api";

function isPublicUrl(value: string | null | undefined): value is string {
  return Boolean(value) && /^https?:\/\//i.test(value as string);
}

/**
 * Resolve a URL utilizável em <img>/<video> a partir do que vier salvo em
 * Post.videoUrl/thumbnailUrl. Quando já é uma URL pública (Supabase Storage),
 * usa direto - zero requisição extra. Só cai pro fetch autenticado (blob)
 * quando for um path local do adapter de storage em disco.
 */
export async function resolveMediaUrl(
  token: string,
  postId: string,
  source: string | null,
  kind: "video" | "thumbnail",
): Promise<string | null> {
  if (!source) return null;
  if (isPublicUrl(source)) return source;
  return fetchDraftAssetBlobUrl(token, postId, kind);
}

/**
 * Mesma extração de videoId feita no backend (publish.scheduler.ts),
 * replicada aqui só pra leitura, sem chamar API.
 */
function extractYoutubeVideoId(videoUrl: string): string | null {
  try {
    const parsed = new URL(videoUrl);
    const host = parsed.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (host.includes("youtube.com")) {
      const watchId = parsed.searchParams.get("v");
      if (watchId) return watchId;

      const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/?]+)/);
      return shortsMatch?.[1] ?? null;
    }

    return null;
  } catch {
    return null;
  }
}

/** Fallback de thumbnail para vídeos já publicados no YouTube sem thumbnailUrl própria. */
export function youtubeThumbnailFrom(videoUrl: string | null): string | null {
  if (!videoUrl) return null;
  const videoId = extractYoutubeVideoId(videoUrl);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

/**
 * URL de embed do YouTube - usada no preview de vídeos já publicados, já que
 * o videoUrl salvo é a página de watch (não um arquivo de vídeo direto, então
 * não dá pra usar como src de <video>).
 */
export function youtubeEmbedUrlFrom(videoUrl: string | null): string | null {
  if (!videoUrl) return null;
  const videoId = extractYoutubeVideoId(videoUrl);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export function isYoutubeUrl(videoUrl: string | null): boolean {
  return Boolean(videoUrl && extractYoutubeVideoId(videoUrl));
}
