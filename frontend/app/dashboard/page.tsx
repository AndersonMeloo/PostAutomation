import Link from "next/link";
import { cookies } from "next/headers";
import { getPostsOverview } from "../lib/api";
import { ACCESS_TOKEN_COOKIE } from "../lib/auth-client";
import { backendModules } from "../lib/backend-routes";

type DashboardPageProps = {
  searchParams: Promise<{
    chart?: string | string[];
  }>;
};

export default async function DashboardHome({ searchParams }: DashboardPageProps) {
  const query = await searchParams;
  const chartParam = Array.isArray(query.chart) ? query.chart[0] : query.chart;
  const chartMode = chartParam === "total" ? "total" : "daily";

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? "";

  const totalEndpoints = backendModules.reduce(
    (acc, moduleItem) => acc + moduleItem.endpoints.length,
    0,
  );

  let overview: Awaited<ReturnType<typeof getPostsOverview>> | null = null;

  try {
    if (accessToken) {
      overview = await getPostsOverview(accessToken);
    }
  } catch {
    overview = null;
  }

  const metrics = [
    {
      label: "Views",
      value:
        chartMode === "total"
          ? overview?.totalsAllTime.views ?? 0
          : overview?.totalsForDay.views ?? 0,
      tone: "bg-cyan-500",
    },
    {
      label: "Curtidas",
      value:
        chartMode === "total"
          ? overview?.totalsAllTime.likes ?? 0
          : overview?.totalsForDay.likes ?? 0,
      tone: "bg-emerald-500",
    },
    {
      label: "Comentarios",
      value:
        chartMode === "total"
          ? overview?.totalsAllTime.comments ?? 0
          : overview?.totalsForDay.comments ?? 0,
      tone: "bg-amber-500",
    },
  ];

  const maxMetric = Math.max(...metrics.map((item) => item.value), 1);

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_28%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="premium-kicker text-xs">Dashboard</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Visão geral da operação
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
              Acompanhe os módulos expostos pelo backend, os indicadores diários e o desempenho
              agregado dos vídeos em uma experiência mais limpa e premium.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/posts" className="premium-button px-4 py-2.5 text-sm">
                Ver posts
              </Link>
              <Link href="/auth" className="premium-button-secondary px-4 py-2.5 text-sm">
                Explorar rotas
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <article className="premium-surface-soft p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Módulos</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{backendModules.length}</p>
            </article>
            <article className="premium-surface-soft p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Views hoje</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {overview?.totalsForDay.views ?? 0}
              </p>
            </article>
            <article className="premium-surface-soft p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Vídeos totais</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {overview?.totalPostedVideos ?? 0}
              </p>
            </article>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Curtidas no dia</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{overview?.totalsForDay.likes ?? 0}</p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Comentários no dia</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {overview?.totalsForDay.comments ?? 0}
          </p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Vídeos postados hoje</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {overview?.postedToday.length ?? 0}
          </p>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Curtidas totais</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{overview?.totalsAllTime.likes ?? 0}</p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Comentários totais</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {overview?.totalsAllTime.comments ?? 0}
          </p>
        </article>
        <article className="dashboard-card p-4">
          <p className="text-sm text-muted">Vídeos publicados no total</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {overview?.totalPostedVideos ?? 0}
          </p>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {backendModules.map((moduleItem) => (
          <Link
            key={moduleItem.slug}
            href={`/${moduleItem.slug}`}
            className="dashboard-card p-4 transition duration-200 hover:-translate-y-1 hover:border-(--border-soft-hover)"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{moduleItem.basePath}</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">{moduleItem.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{moduleItem.description}</p>
            <p className="mt-4 text-sm font-medium text-cyan-200 light:text-cyan-700">
              {moduleItem.endpoints.length} endpoint(s)
            </p>
          </Link>
        ))}
      </div>

      <section className="dashboard-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground">Resumo da integração</h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          {overview
            ? `Dados de ${overview.date} carregados do backend. Endpoints mapeados: ${totalEndpoints}.`
            : "Backend indisponível agora. Quando subir a API, essa tela exibe métricas reais automaticamente."}
        </p>
      </section>

      <section className="dashboard-card p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {chartMode === "total" ? "Gráfico total" : "Gráfico diário"}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {chartMode === "total"
                ? "Comparativo acumulado de views, curtidas e comentários de todos os vídeos postados."
                : "Comparativo de views, curtidas e comentários no dia selecionado pelo backend."}
            </p>
          </div>

          <div className="dash-panel inline-flex rounded-full border p-1">
            <Link
              href="/dashboard?chart=daily"
              data-active={chartMode === "daily"}
              className="premium-tab px-3 py-1.5 text-sm font-medium"
            >
              Diário
            </Link>
            <Link
              href="/dashboard?chart=total"
              data-active={chartMode === "total"}
              className="premium-tab px-3 py-1.5 text-sm font-medium"
            >
              Totais
            </Link>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {metrics.map((metric) => (
            <article key={metric.label} className="dash-chip rounded-2xl border p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <p className="font-medium text-foreground">{metric.label}</p>
                <p className="font-semibold text-foreground">{metric.value}</p>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-(--border-soft-hover)">
                <div
                  className={`h-full rounded-full ${metric.tone} shadow-lg shadow-cyan-500/20`}
                  style={{ width: `${(metric.value / maxMetric) * 100}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
