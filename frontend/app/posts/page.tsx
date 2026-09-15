  import { getNiches, getPosts, getPostsOverview } from "../lib/api";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE } from "../lib/auth-client";
import { VideoUploadForm } from "./video-upload-form";

function formatDate(value: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("pt-BR");
}

function isYouTubeLink(value: string | null) {
  if (!value) return false;

  return value.includes("youtube.com") || value.includes("youtu.be");
}

type PostsPageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? "";

  const resolvedSearchParams = await searchParams;
  const selectedDate = resolvedSearchParams.date;

  let posts = [] as Awaited<ReturnType<typeof getPosts>>;
  let overview = null as Awaited<ReturnType<typeof getPostsOverview>> | null;
  let niches = [] as Awaited<ReturnType<typeof getNiches>>;
  let errorMessage = "";

  try {
    if (!accessToken) {
      errorMessage = "Sessão não encontrada. Faça login novamente.";
    } else {
      const [postsResult, overviewResult, nichesResult] = await Promise.all([
        getPosts(accessToken),
        getPostsOverview(accessToken, selectedDate),
        getNiches(accessToken),
      ]);
      posts = postsResult;
      overview = overviewResult;
      niches = nichesResult;
    }
  } catch {
    errorMessage =
      "Não foi possivel carregar dados do backend. Verifique se a API Nest esta rodando na URL configurada.";
  }

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_28%)]" />
        <div className="relative">
          <p className="premium-kicker text-xs">Posts</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Vídeos e publicações
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted md:text-base">
            Lista de vídeos postados com data/hora e resumo diário de visualizações, curtidas e comentários.
          </p>

          <form method="GET" className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
            <label className="grid gap-1.5 text-sm text-muted">
              Filtrar overview por data
              <input
                type="date"
                name="date"
                defaultValue={selectedDate ?? ""}
                className="premium-input"
              />
            </label>
            <button
              type="submit"
              className="premium-button px-4 py-2.5 text-sm"
            >
              Aplicar filtro
            </button>
            <a href="/posts" className="premium-button-secondary px-4 py-2.5 text-sm">
              Limpar
            </a>
          </form>
        </div>
      </header>

      {errorMessage ? (
        <article className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200 light:text-rose-700">
          {errorMessage}
        </article>
      ) : null}

      {!errorMessage && accessToken ? (
        <VideoUploadForm token={accessToken} niches={niches} />
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Views no dia</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {overview?.totalsForDay.views ?? 0}
          </p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Curtidas no dia</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {overview?.totalsForDay.likes ?? 0}
          </p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Comentários no dia</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {overview?.totalsForDay.comments ?? 0}
          </p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Views totais</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {overview?.totalViewsAllVideos ?? 0}
          </p>
        </article>
      </div>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Vídeos com atividade no dia</h3>

        {(overview?.postedToday ?? []).length === 0 ? (
          <p className="dash-chip mt-4 rounded-2xl border p-6 text-center text-sm text-muted">
            Nenhum vídeo com atividade na data selecionada.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(overview?.postedToday ?? []).map((post) => (
              <li key={post.id} className="dash-chip rounded-2xl border p-4">
                <p className="font-medium text-foreground">{post.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {post.platform} · {post.status}
                </p>
                <p className="mt-1 text-xs text-muted">Postado em: {formatDate(post.postedAt)}</p>
                {post.scheduledAt ? (
                  <p className="mt-1 text-xs text-muted">
                    Agendado em: {formatDate(post.scheduledAt)}
                  </p>
                ) : null}
                <p className="mt-2 text-xs text-muted">
                  Views: {post.latestAnalytics?.views ?? 0} · Curtidas:{" "}
                  {post.latestAnalytics?.likes ?? 0} · Comentários:{" "}
                  {post.latestAnalytics?.comments ?? 0}
                </p>
                {post.status === "POSTED" && isYouTubeLink(post.videoUrl) ? (
                  <a
                    href={post.videoUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-xs font-medium text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-cyan-100 light:text-cyan-700 light:hover:text-cyan-800"
                  >
                    Ver no YouTube
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Todos os vídeos</h3>
        <p className="mt-1 text-sm text-muted">
          Seus ultimos {posts.length} registros retornados por GET /posts.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id} className="dash-chip rounded-2xl border p-4">
              <p className="font-medium text-foreground">{post.title}</p>
              <p className="mt-1 text-xs text-muted">
                {post.platform} | {post.status} | {formatDate(post.postedAt)}
              </p>
              <p className="mt-1 text-xs text-muted">
                Nicho: {post.niche?.name ?? "-"} | Views: {post.analytics[0]?.views ?? 0}
              </p>
              {post.status === "POSTED" && isYouTubeLink(post.videoUrl) ? (
                <a
                  href={post.videoUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-xs font-medium text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-cyan-100 light:text-cyan-700 light:hover:text-cyan-800"
                >
                  Abrir vídeo no YouTube
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
