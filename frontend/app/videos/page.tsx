import Link from "next/link";
import { cookies } from "next/headers";
import { getDrafts, getPosts } from "../lib/api";
import { ACCESS_TOKEN_COOKIE } from "../lib/auth-client";
import { NewDraftUpload } from "./new-draft-upload";

const FORMAT_LABEL: Record<string, string> = {
  SHORT: "Shorts",
  STANDARD: "Padrão",
};

export default async function VideosPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? "";

  let drafts: Awaited<ReturnType<typeof getDrafts>> = [];
  let recentPosted: Awaited<ReturnType<typeof getPosts>> = [];

  try {
    if (accessToken) {
      const [draftsResult, postsResult] = await Promise.all([
        getDrafts(accessToken),
        getPosts(accessToken),
      ]);
      drafts = draftsResult;
      recentPosted = postsResult.filter((post) => post.status === "POSTED").slice(0, 6);
    }
  } catch {
    drafts = [];
    recentPosted = [];
  }

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_28%)]" />
        <div className="relative">
          <p className="premium-kicker text-xs">Vídeos</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Envie, edite e publique
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
            Envie um vídeo, ajuste corte, thumbnail e formato, e prepare a publicação
            quando estiver pronto.
          </p>
        </div>
      </header>

      {accessToken ? (
        <NewDraftUpload accessToken={accessToken} />
      ) : (
        <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200 light:text-rose-700">
          Sessão não encontrada. Faça login novamente.
        </p>
      )}

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Em andamento</h3>
        <p className="mt-1 text-sm text-muted">
          Rascunhos salvos, prontos para continuar a edição.
        </p>

        {drafts.length === 0 ? (
          <p className="dash-chip mt-4 rounded-2xl border p-6 text-center text-sm text-muted">
            Nenhum rascunho por enquanto. Envie um vídeo acima para começar.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => (
              <li key={draft.id} className="dash-chip rounded-2xl border p-4">
                <p className="font-medium text-foreground">{draft.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {draft.format ? FORMAT_LABEL[draft.format] : "Formato não definido"}
                  {" · "}
                  {new Date(draft.createdAt).toLocaleString("pt-BR")}
                </p>
                <Link
                  href={`/videos/${draft.id}/edit`}
                  className="premium-button-secondary mt-3 inline-flex px-3 py-1.5 text-xs"
                >
                  Continuar edição
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Publicados recentemente</h3>
        <p className="mt-1 text-sm text-muted">
          Veja o histórico completo em{" "}
          <Link href="/posts" className="text-cyan-200 underline light:text-cyan-700">
            Postagens
          </Link>
          .
        </p>

        {recentPosted.length === 0 ? (
          <p className="dash-chip mt-4 rounded-2xl border p-6 text-center text-sm text-muted">
            Nenhum vídeo publicado ainda.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosted.map((post) => (
              <li key={post.id} className="dash-chip rounded-2xl border p-4">
                <p className="font-medium text-foreground">{post.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {post.platform} · {post.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
