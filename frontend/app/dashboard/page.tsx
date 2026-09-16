import Link from "next/link";
import { cookies } from "next/headers";
import {
  ChartNoAxesCombined,
  Clapperboard,
  Eye,
  FolderTree,
  Heart,
  MessageCircle,
  Plus,
  Shapes,
} from "lucide-react";
import {
  getDrafts,
  getPosts,
  getPostsOverview,
  type DraftPost,
  type PostListItem,
} from "../lib/api";
import { ACCESS_TOKEN_COOKIE } from "../lib/auth-client";
import { VideoCard, type VideoCardData } from "../components/dashboard/video-card";
import { VideoAnalyticsChart } from "../components/dashboard/video-analytics-chart";

type ActivityItem =
  | { kind: "draft"; date: string; video: VideoCardData }
  | { kind: "posted"; date: string; video: VideoCardData };

export default async function DashboardHome() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? "";

  let overview: Awaited<ReturnType<typeof getPostsOverview>> | null = null;
  let drafts: DraftPost[] = [];
  let posts: PostListItem[] = [];

  try {
    if (accessToken) {
      [overview, drafts, posts] = await Promise.all([
        getPostsOverview(accessToken),
        getDrafts(accessToken),
        getPosts(accessToken),
      ]);
    }
  } catch {
    overview = null;
    drafts = [];
    posts = [];
  }

  const postedVideos = posts.filter((post) => post.status === "POSTED");
  const dailySeries = overview?.dailySeries ?? [];

  const kpis = [
    { label: "Views hoje", value: overview?.totalsForDay.views ?? 0, icon: Eye },
    { label: "Curtidas hoje", value: overview?.totalsForDay.likes ?? 0, icon: Heart },
    { label: "Comentários hoje", value: overview?.totalsForDay.comments ?? 0, icon: MessageCircle },
    { label: "Vídeos publicados", value: overview?.totalPostedVideos ?? 0, icon: Clapperboard },
  ];

  const shortcuts = [
    { href: "/videos", label: "Vídeos", icon: Clapperboard },
    { href: "/metrics", label: "Métricas", icon: ChartNoAxesCombined },
    { href: "/posts", label: "Postagens", icon: FolderTree },
    { href: "/niches", label: "Nichos", icon: Shapes },
  ];

  const activity: ActivityItem[] = [
    ...drafts.map((draft) => ({
      kind: "draft" as const,
      date: draft.createdAt,
      video: {
        id: draft.id,
        title: draft.title,
        status: draft.status,
        format: draft.format,
        thumbnailUrl: draft.thumbnailUrl,
        videoUrl: draft.videoUrl,
        latestAnalytics: null,
      },
    })),
    ...postedVideos.map((post) => ({
      kind: "posted" as const,
      date: post.postedAt ?? post.createdAt,
      video: {
        id: post.id,
        title: post.title,
        status: post.status,
        format: post.format,
        thumbnailUrl: post.thumbnailUrl,
        videoUrl: post.videoUrl,
        latestAnalytics: post.analytics[0] ?? null,
      },
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_28%)]" />
        <div className="relative">
          <p className="premium-kicker text-xs">Dashboard</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Visão geral da operação
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
            Acompanhe o desempenho dos seus vídeos, o que está em andamento e o que
            já foi publicado, tudo em um só lugar.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/videos" className="premium-button px-4 py-2.5 text-sm">
              <Plus size={16} />
              Novo vídeo
            </Link>
            <Link href="/metrics" className="premium-button-secondary px-4 py-2.5 text-sm">
              <ChartNoAxesCombined size={16} />
              Ver métricas
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="dashboard-card p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <kpi.icon size={20} />
              </span>
              <div>
                <p className="text-sm text-muted">{kpi.label}</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{kpi.value}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="dashboard-card p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Tendência dos últimos dias</h3>
            <p className="mt-1 text-sm text-muted">
              Views, curtidas e comentários somados de todos os vídeos, por dia.
            </p>
          </div>
          <Link href="/metrics" className="premium-button-secondary px-4 py-2 text-sm">
            Ver métricas completas
          </Link>
        </div>

        {dailySeries.length > 0 ? (
          <div className="mt-6">
            <VideoAnalyticsChart data={dailySeries} height={260} showDots={false} />
          </div>
        ) : (
          <p className="dash-chip mt-6 rounded-2xl border p-6 text-center text-sm text-muted">
            Ainda não há dados suficientes. Assim que seus vídeos forem publicados e
            as métricas do YouTube forem coletadas, o gráfico aparece aqui.
          </p>
        )}
      </section>

      <section className="dashboard-card p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Atividade recente</h3>
            <p className="mt-1 text-sm text-muted">
              Últimos vídeos em andamento e publicados.
            </p>
          </div>
          <Link href="/videos" className="text-sm text-cyan-200 underline light:text-cyan-700">
            Ver todos
          </Link>
        </div>

        {activity.length === 0 ? (
          <p className="dash-chip mt-4 rounded-2xl border p-6 text-center text-sm text-muted">
            Nenhuma atividade ainda. Envie um vídeo para começar.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activity.map((item) => (
              <VideoCard key={`${item.kind}-${item.video.id}`} accessToken={accessToken} video={item.video} />
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Atalhos</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {shortcuts.map((shortcut) => (
            <Link
              key={shortcut.href}
              href={shortcut.href}
              className="dash-chip flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition duration-200 hover:-translate-y-0.5"
            >
              <shortcut.icon size={22} className="text-muted" />
              <span className="text-sm font-medium text-foreground">{shortcut.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
