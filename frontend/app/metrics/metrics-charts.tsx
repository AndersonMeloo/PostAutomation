"use client";

import { useState } from "react";
import { getPostAnalytics, type PostAnalyticsHistory, type PostsOverview } from "../lib/api";
import { VideoAnalyticsChart } from "../components/dashboard/video-analytics-chart";

type PostOption = { id: string; title: string };

type MetricsChartsProps = {
  accessToken: string;
  overview: PostsOverview | null;
  posts: PostOption[];
};

export function MetricsCharts({ accessToken, overview, posts }: MetricsChartsProps) {
  const statCards = [
    { label: "Visualizações hoje", value: overview?.totalsForDay.views ?? 0 },
    { label: "Curtidas hoje", value: overview?.totalsForDay.likes ?? 0 },
    { label: "Comentários hoje", value: overview?.totalsForDay.comments ?? 0 },
    { label: "Vídeos publicados", value: overview?.totalPostedVideos ?? 0 },
  ];

  const dailySeries = overview?.dailySeries ?? [];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {statCards.map((stat) => (
          <article key={stat.label} className="dashboard-card p-4">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
          </article>
        ))}
      </div>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Evolução geral</h3>
        <p className="mt-1 text-sm text-muted">
          Visualizações, curtidas e comentários somados de todos os vídeos, por dia.
        </p>

        {dailySeries.length > 0 ? (
          <div className="mt-6">
            <VideoAnalyticsChart data={dailySeries} height={288} showDots={false} />
          </div>
        ) : (
          <p className="dash-chip mt-6 rounded-2xl border p-6 text-center text-sm text-muted">
            Ainda não há dados suficientes. Assim que seus vídeos forem publicados e as
            métricas do YouTube forem coletadas, o gráfico aparece aqui.
          </p>
        )}
      </section>

      <PostAnalyticsSection accessToken={accessToken} posts={posts} />
    </>
  );
}

function PostAnalyticsSection({
  accessToken,
  posts,
}: {
  accessToken: string;
  posts: PostOption[];
}) {
  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id ?? "");
  const [data, setData] = useState<PostAnalyticsHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  async function loadAnalytics(postId: string) {
    if (!postId || !accessToken) return;

    setLoading(true);
    try {
      const result = await getPostAnalytics(accessToken, postId);
      setData(result);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }

  function handleSelectChange(postId: string) {
    setSelectedPostId(postId);
    void loadAnalytics(postId);
  }

  const chartData =
    data?.history.map((snapshot) => ({
      date: new Date(snapshot.collectedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      views: snapshot.views,
      likes: snapshot.likes,
      comments: snapshot.comments,
    })) ?? [];

  return (
    <section className="dashboard-card p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Evolução por vídeo</h3>
          <p className="mt-1 text-sm text-muted">
            Escolha um vídeo publicado para ver o histórico de views, curtidas e
            comentários coletado ao longo do tempo.
          </p>
        </div>

        {posts.length > 0 ? (
          <select
            value={selectedPostId}
            onChange={(event) => handleSelectChange(event.target.value)}
            className="premium-input max-w-xs"
          >
            <option value="" disabled>
              Selecione um vídeo
            </option>
            {posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      {posts.length === 0 ? (
        <p className="dash-chip mt-6 rounded-2xl border p-6 text-center text-sm text-muted">
          Nenhum vídeo publicado ainda. Assim que um vídeo for publicado, ele aparece
          aqui para você acompanhar a evolução individual.
        </p>
      ) : loading ? (
        <p className="dash-chip mt-6 rounded-2xl border p-6 text-center text-sm text-muted">
          Carregando...
        </p>
      ) : hasLoaded && chartData.length === 0 ? (
        <p className="dash-chip mt-6 rounded-2xl border p-6 text-center text-sm text-muted">
          Ainda não há snapshots de analytics para este vídeo.
        </p>
      ) : chartData.length > 0 ? (
        <div className="mt-6">
          <VideoAnalyticsChart data={chartData} height={256} />
        </div>
      ) : (
        <p className="dash-chip mt-6 rounded-2xl border p-6 text-center text-sm text-muted">
          Selecione um vídeo acima para ver a evolução.
        </p>
      )}
    </section>
  );
}
