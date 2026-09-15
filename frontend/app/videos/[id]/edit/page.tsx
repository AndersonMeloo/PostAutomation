import Link from "next/link";
import { cookies } from "next/headers";
import { getDraft, getNiches } from "../../../lib/api";
import { ACCESS_TOKEN_COOKIE } from "../../../lib/auth-client";
import { VideoEditor } from "./video-editor";

type EditDraftPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditDraftPage({ params }: EditDraftPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? "";

  if (!accessToken) {
    return (
      <section className="dashboard-card p-6 text-sm text-muted">
        Sessão não encontrada.{" "}
        <Link href="/login" className="text-cyan-200 underline light:text-cyan-700">
          Faça login novamente
        </Link>
        .
      </section>
    );
  }

  try {
    const [draft, niches] = await Promise.all([
      getDraft(accessToken, id),
      getNiches(accessToken),
    ]);

    return (
      <section className="space-y-6 animate-fade-up">
        <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_28%)]" />
          <div className="relative">
            <p className="premium-kicker text-xs">Editor de vídeo</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {draft.title}
            </h2>
            <Link
              href="/videos"
              className="mt-3 inline-flex text-sm text-cyan-200 underline light:text-cyan-700"
            >
              Voltar para vídeos
            </Link>
          </div>
        </header>

        <VideoEditor accessToken={accessToken} draft={draft} niches={niches} />
      </section>
    );
  } catch {
    return (
      <section className="dashboard-card p-6 text-sm text-muted">
        Rascunho não encontrado (ou já foi publicado).{" "}
        <Link href="/videos" className="text-cyan-200 underline light:text-cyan-700">
          Voltar para vídeos
        </Link>
        .
      </section>
    );
  }
}
