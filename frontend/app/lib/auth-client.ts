export const ACCESS_TOKEN_COOKIE = "smap_access_token";
export const ACCESS_TOKEN_STORAGE = "smap_access_token";
export const REFRESH_TOKEN_STORAGE = "smap_refresh_token";
export const USER_ID_STORAGE = "smap_user_id";

type JwtPayload = {
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
};

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

export function saveSession(accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") return;

  const payload = decodeJwtPayload(accessToken);
  const userId = payload?.sub ?? "";

  localStorage.setItem(ACCESS_TOKEN_STORAGE, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE, refreshToken);
  localStorage.setItem(USER_ID_STORAGE, userId);

  document.cookie = `${ACCESS_TOKEN_COOKIE}=${accessToken}; path=/; max-age=900; SameSite=Lax`;
}

export function clearSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ACCESS_TOKEN_STORAGE);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE);
  localStorage.removeItem(USER_ID_STORAGE);
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function getSession() {
  if (typeof window === "undefined") {
    return {
      accessToken: "",
      refreshToken: "",
      userId: "",
    };
  }

  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_STORAGE) ?? "",
    refreshToken: localStorage.getItem(REFRESH_TOKEN_STORAGE) ?? "",
    userId: localStorage.getItem(USER_ID_STORAGE) ?? "",
  };
}
