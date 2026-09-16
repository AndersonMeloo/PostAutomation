import Link from "next/link";
import { cookies } from "next/headers";
import {
  getDraft,
  getPostAnalytics,
  getPosts,
  type VideoFormat,
} from "../../lib/api";
import { ACCESS_TOKEN_COOKIE } from "../../lib/auth-client";
import { FormatBadge, StatusBadge } from "../../components/dashboard/badges";
import { VideoAnalyticsChart, type AnalyticsPoint } from "../../components/dashboard/video-analytics-chart";
import { StatusBanner } from "../../components/dashboard/status-banner";
import { VideoPreview } from "./video-preview";

type VideoDetail = {
  id: string;
  title: string;
  status: string;
  format: VideoFormat | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  latestAnalytics: { views: number; likes: number; comments: number } | null;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function VideoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? "";

  if (!accessToken) {
    return (
      <section className="dashboard-card p-6 text-sm text-muted">
        <StatusBanner variant="error">Sessão não encontrada. Faça login novamente.</StatusBanner>
      </section>
    );
  }

  // Não existe um GET /posts/:id genérico - tenta como rascunho primeiro
  // (mais barato, um único post), e só se não for rascunho procura entre
  // todos os posts do usuário.
  let video: VideoDetail | null = null;

  try {
    const draft = await getDraft(accessToken, id);
    video = {
      id: draft.id,
      title: draft.title,
      status: draft.status,
      format: draft.format,
      thumbnailUrl: draft.thumbnailUrl,
      videoUrl: draft.videoUrl,
      latestAnalytics: null,
    };
  } catch {
    try {
      const posts = await getPosts(accessToken);
      const found = posts.find((post) => post.id === id);

      if (found) {
        video = {
          id: found.id,
          title: found.title,
          status: found.status,
          format: found.format,
          thumbnailUrl: found.thumbnailUrl,
          videoUrl: found.videoUrl,
          latestAnalytics: found.analytics[0] ?? null,
        };
      }
    } catch {
      video = null;
    }
  }

  if (!video) {
    return (
      <section className="dashboard-card p-6 text-sm text-muted">
        Vídeo não encontrado.{" "}
        <Link href="/videos" className="text-cyan-200 underline light:text-cyan-700">
          Voltar para vídeos
        </Link>
        .
      </section>
    );
  }

  let chartData: AnalyticsPoint[] = [];

  try {
    const analytics = await getPostAnalytics(accessToken, id);
    chartData = analytics.history.map((snapshot) => ({
      date: new Date(snapshot.collectedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      views: snapshot.views,
      likes: snapshot.likes,
      comments: snapshot.comments,
    }));
  } catch {
    chartData = [];
  }

  return (
    <section className="space-y-6 animate-fade-up">
      <nav className="text-sm text-muted">
        <Link href="/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <Link href="/videos" className="hover:text-foreground">
          Vídeos
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{video.title}</span>
      </nav>

      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_28%)]" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <FormatBadge format={video.format} />
              <StatusBadge status={video.status} />
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {video.title}
            </h2>
          </div>

          {video.status === "DRAFT" ? (
            <Link href={`/videos/${video.id}/edit`} className="premium-button px-4 py-2.5 text-sm">
              Editar
            </Link>
          ) : null}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <VideoPreview accessToken={accessToken} video={video} />

        <div className="grid grid-cols-3 gap-3 lg:content-start">
          <article className="dashboard-card p-4">
            <p className="text-sm text-muted">Views</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {video.latestAnalytics?.views ?? 0}
            </p>
          </article>
          <article className="dashboard-card p-4">
            <p className="text-sm text-muted">Curtidas</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {video.latestAnalytics?.likes ?? 0}
            </p>
          </article>
          <article className="dashboard-card p-4">
            <p className="text-sm text-muted">Comentários</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {video.latestAnalytics?.comments ?? 0}
            </p>
          </article>
        </div>
      </div>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Evolução</h3>
        <p className="mt-1 text-sm text-muted">
          Histórico de views, curtidas e comentários coletado ao longo do tempo.
        </p>

        {chartData.length > 0 ? (
          <div className="mt-6">
            <VideoAnalyticsChart data={chartData} height={280} />
          </div>
        ) : (
          <p className="dash-chip mt-6 rounded-2xl border p-6 text-center text-sm text-muted">
            Ainda não há snapshots de analytics para este vídeo.
          </p>
        )}
      </section>
    </section>
  );
}
