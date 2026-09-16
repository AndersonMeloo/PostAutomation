export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://postautomation-production-d200.up.railway.app";

export type PostListItem = {
  id: string;
  title: string;
  platform: string;
  status: string;
  videoUrl: string | null;
  postedAt: string | null;
  scheduledAt: string | null;
  niche: {
    id: string;
    name: string;
  };
  analytics: {
    views: number;
    likes: number;
    comments: number;
    collectedAt: string;
  }[];
};

export type PostsOverview = {
  date: string;
  totalsForDay: {
    views: number;
    likes: number;
    comments: number;
  };
  totalsAllTime: {
    views: number;
    likes: number;
    comments: number;
  };
  totalPostedVideos: number;
  totalViewsAllVideos: number;
  dailySeries: {
    date: string;
    views: number;
    likes: number;
    comments: number;
  }[];
  postedToday: {
    id: string;
    title: string;
    videoUrl: string | null;
    platform: string;
    status: string;
    postedAt: string | null;
    scheduledAt: string | null;
    latestAnalytics: {
      views: number;
      likes: number;
      comments: number;
      collectedAt: string;
    } | null;
  }[];
};

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type YoutubeConnectionStatus = {
  connected: boolean;
  account: {
    id: string;
    platform: string;
    tokenExpiry: string | null;
  } | null;
};

export type NicheItem = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Mesma lógica de content-type do request() abaixo, mas reutilizável por
// chamadas multipart/form-data que não passam pelo request() (upload de
// arquivo não pode ir como JSON.stringify no body).
async function parseErrorMessage(response: Response, fallback: string): Promise<string> {
  if (response.headers.get("content-type")?.includes("application/json")) {
    try {
      const data = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(data.message)) {
        return data.message.join(", ");
      }
      if (typeof data.message === "string") {
        return data.message;
      }
    } catch {
      // corpo não era um JSON válido - mantém a mensagem genérica
    }
  }

  return fallback;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `Falha em ${path}`;

    // Só confia no corpo da resposta se for JSON (respostas HTML de erro,
    // como uma página 404 do próprio frontend, nunca viram a mensagem exibida).
    if (response.headers.get("content-type")?.includes("application/json")) {
      try {
        const data = (await response.json()) as { message?: string | string[] };
        if (Array.isArray(data.message)) {
          message = data.message.join(", ");
        } else if (typeof data.message === "string") {
          message = data.message;
        }
      } catch {
        // corpo não era um JSON válido - mantém a mensagem genérica
      }
    }

    throw new ApiError(response.status, message);
  }

  return (await response.json()) as T;
}

export async function getPostsOverview(token: string, date?: string) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  return request<PostsOverview>(`/posts/overview${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export type PostAnalyticsHistory = {
  post: {
    id: string;
    title: string;
    platform: string;
    status: string;
  };
  history: {
    views: number;
    likes: number;
    comments: number;
    collectedAt: string;
  }[];
};

export async function getPostAnalytics(token: string, postId: string) {
  return request<PostAnalyticsHistory>(`/posts/${postId}/analytics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getPosts(token: string) {
  return request<PostListItem[]>("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getNiches(token: string) {
  return request<NicheItem[]>('/niches', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadVideoPost(
  token: string,
  payload: {
    video: File;
    title: string;
    description?: string;
    nicheId: string;
    scheduledAt: string;
  },
) {
  const formData = new FormData();
  formData.append('video', payload.video);
  formData.append('title', payload.title);
  formData.append('nicheId', payload.nicheId);
  formData.append('scheduledAt', payload.scheduledAt);

  if (payload.description?.trim()) {
    formData.append('description', payload.description.trim());
  }

  const response = await fetch(`${API_BASE_URL}/posts/upload-video`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await parseErrorMessage(response, 'Falha ao enviar video'));
  }

  return response.json();
}

export type VideoFormat = "SHORT" | "STANDARD";

export type DraftPost = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  format: VideoFormat | null;
  trimStart: number | null;
  trimEnd: number | null;
  nicheId: string | null;
  scheduledAt: string | null;
  createdAt: string;
};

export async function getDrafts(token: string) {
  return request<DraftPost[]>("/posts/drafts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getDraft(token: string, postId: string) {
  return request<DraftPost>(`/posts/${postId}/draft`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createDraft(
  token: string,
  payload: { video: File; title?: string },
) {
  const formData = new FormData();
  formData.append("video", payload.video);
  if (payload.title?.trim()) {
    formData.append("title", payload.title.trim());
  }

  const response = await fetch(`${API_BASE_URL}/posts/draft`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await parseErrorMessage(response, "Falha ao criar rascunho"));
  }

  return (await response.json()) as DraftPost;
}

export async function editDraft(
  token: string,
  postId: string,
  payload: {
    title?: string;
    description?: string;
    format?: VideoFormat;
    trimStart?: number;
    trimEnd?: number;
  },
) {
  return request<DraftPost>(`/posts/${postId}/edit`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteDraft(token: string, postId: string) {
  return request<{ message: string }>(`/posts/${postId}/draft`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadDraftThumbnail(
  token: string,
  postId: string,
  thumbnail: File | Blob,
) {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail, "thumbnail.jpg");

  const response = await fetch(`${API_BASE_URL}/posts/${postId}/thumbnail`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await parseErrorMessage(response, "Falha ao enviar thumbnail"));
  }

  return (await response.json()) as DraftPost;
}

export async function finalizeDraft(
  token: string,
  postId: string,
  payload: {
    nicheId: string;
    scheduledAt: string;
    title?: string;
    description?: string;
  },
) {
  return request<DraftPost>(`/posts/${postId}/finalize`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function fetchDraftAssetBlobUrl(
  token: string,
  postId: string,
  kind: "video" | "thumbnail",
): Promise<string | null> {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/draft/${kind}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export async function getUserById(userId: string, token: string) {
  return request<UserProfile>(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateUserById(
  userId: string,
  token: string,
  payload: {
    email?: string;
    name?: string;
    password?: string;
  },
) {
  return request<UserProfile>(`/users/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteUserById(userId: string, token: string) {
  return request<{ message: string }>(`/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getYoutubeConnectUrl(token: string) {
  return request<{ url: string }>("/auth/youtube/connect", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getYoutubeConnectionStatus(userId: string, token: string) {
  return request<YoutubeConnectionStatus>(`/users/${userId}/youtube-connection`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function disconnectYoutubeConnection(userId: string, token: string) {
  return request<{ message: string }>(`/users/${userId}/youtube-connection`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getGoogleLoginUrl() {
  return `${API_BASE_URL}/auth/google`;
}

export async function loginUser(payload: { email: string; password: string }) {
  return request<AuthTokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload: {
  email: string;
  name?: string;
  password: string;
}) {
  return request<{ id: string; email: string; name?: string }>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}