import { cookies } from "next/headers";
import { getPosts, getPostsOverview } from "../lib/api";
import { ACCESS_TOKEN_COOKIE } from "../lib/auth-client";
import { MetricsCharts } from "./metrics-charts";

export default async function MetricsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? "";

  let overview: Awaited<ReturnType<typeof getPostsOverview>> | null = null;
  let posts: Awaited<ReturnType<typeof getPosts>> = [];

  try {
    if (accessToken) {
      [overview, posts] = await Promise.all([
        getPostsOverview(accessToken),
        getPosts(accessToken),
      ]);
    }
  } catch {
    overview = null;
    posts = [];
  }

  const postedPosts = posts.filter((post) => post.status === "POSTED");

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_28%)]" />
        <div className="relative">
          <p className="premium-kicker text-xs">Métricas</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Desempenho dos seus vídeos
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
            Visualizações, curtidas e comentários ao longo do tempo, com evolução por
            vídeo. Dados coletados automaticamente a cada poucas horas via YouTube.
          </p>
        </div>
      </header>

      <MetricsCharts
        accessToken={accessToken}
        overview={overview}
        posts={postedPosts.map((post) => ({ id: post.id, title: post.title }))}
      />
    </section>
  );
}
