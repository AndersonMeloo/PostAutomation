import { cookies } from "next/headers";
import { getPosts, type PostListItem } from "../lib/api";
import { ACCESS_TOKEN_COOKIE } from "../lib/auth-client";
import { StatusBanner } from "../components/dashboard/status-banner";
import { VideoLibrary } from "./video-library";

export default async function VideosPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? "";

  let posts: PostListItem[] = [];

  try {
    if (accessToken) {
      posts = await getPosts(accessToken);
    }
  } catch {
    posts = [];
  }

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_28%)]" />
        <div className="relative">
          <p className="premium-kicker text-xs">Vídeos</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Sua biblioteca de conteúdo
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
            Envie, edite, acompanhe métricas e publique seus vídeos, tudo em um só
            lugar.
          </p>
        </div>
      </header>

      {accessToken ? (
        <VideoLibrary accessToken={accessToken} posts={posts} />
      ) : (
        <StatusBanner variant="error">Sessão não encontrada. Faça login novamente.</StatusBanner>
      )}
    </section>
  );
}
