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
        getNiches(),
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
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Vídeos e publicações
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
            Lista de vídeos postados com data/hora e resumo diário de visualizações, curtidas e comentários.
          </p>

          <form method="GET" className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
            <label className="grid gap-1.5 text-sm text-slate-300">
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
        <article className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          {errorMessage}
        </article>
      ) : null}

      {!errorMessage && accessToken ? (
        <VideoUploadForm token={accessToken} niches={niches} />
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <article className="dashboard-card p-4">
          <p className="text-sm text-slate-400">Views no dia</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {overview?.totalsForDay.views ?? 0}
          </p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-slate-400">Curtidas no dia</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {overview?.totalsForDay.likes ?? 0}
          </p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-slate-400">Comentários no dia</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {overview?.totalsForDay.comments ?? 0}
          </p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-slate-400">Views totais</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {overview?.totalViewsAllVideos ?? 0}
          </p>
        </article>
      </div>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-white">Vídeos com atividade no dia</h3>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-400">
                <th className="px-3 py-3 font-medium">Título</th>
                <th className="hidden px-3 py-3 font-medium md:table-cell">Plataforma</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Postado em</th>
                <th className="hidden px-3 py-3 font-medium lg:table-cell">Agendado em</th>
                <th className="px-3 py-3 font-medium">Link</th>
                <th className="px-3 py-3 font-medium">Views</th>
                <th className="hidden px-3 py-3 font-medium md:table-cell">Curtidas</th>
                <th className="hidden px-3 py-3 font-medium md:table-cell">Comentários</th>
              </tr>
            </thead>
            <tbody>
              {(overview?.postedToday ?? []).length === 0 ? (
                <tr>
                  <td className="px-3 py-5 text-slate-300" colSpan={9}>
                    Nenhum vídeo com atividade na data selecionada.
                  </td>
                </tr>
              ) : (
                (overview?.postedToday ?? []).map((post) => (
                  <tr key={post.id} className="border-b border-white/5 last:border-none">
                    <td className="px-3 py-3 font-medium text-white">{post.title}</td>
                    <td className="hidden px-3 py-3 text-slate-300 md:table-cell">{post.platform}</td>
                    <td className="px-3 py-3 text-slate-300">{post.status}</td>
                    <td className="px-3 py-3 text-slate-300">{formatDate(post.postedAt)}</td>
                    <td className="hidden px-3 py-3 text-slate-300 lg:table-cell">{formatDate(post.scheduledAt)}</td>
                    <td className="px-3 py-3 text-slate-300">
                      {post.status === "POSTED" && isYouTubeLink(post.videoUrl) ? (
                        <a
                          href={post.videoUrl ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-cyan-100"
                        >
                          Ver no YouTube
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-3 py-3 text-slate-300">{post.latestAnalytics?.views ?? 0}</td>
                    <td className="hidden px-3 py-3 text-slate-300 md:table-cell">{post.latestAnalytics?.likes ?? 0}</td>
                    <td className="hidden px-3 py-3 text-slate-300 md:table-cell">
                      {post.latestAnalytics?.comments ?? 0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-white">Todos os vídeos</h3>
        <p className="mt-1 text-sm text-slate-300">
          Seus ultimos {posts.length} registros retornados por GET /posts.
        </p>
        <ul className="mt-4 grid gap-3">
          {posts.map((post) => (
            <li key={post.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <p className="font-medium text-white">{post.title}</p>
              <p className="mt-1 text-xs text-slate-300">
                {post.platform} | {post.status} | {formatDate(post.postedAt)}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Nicho: {post.niche?.name ?? "-"} | Views: {post.analytics[0]?.views ?? 0}
              </p>
              {post.status === "POSTED" && isYouTubeLink(post.videoUrl) ? (
                <a
                  href={post.videoUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-xs font-medium text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-cyan-100"
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
