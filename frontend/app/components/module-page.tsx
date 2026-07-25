import { BackendModule, methodStyles } from "../lib/backend-routes";

type ModulePageProps = {
  moduleData: BackendModule;
};

export function ModulePage({ moduleData }: ModulePageProps) {
  return (
    <section className="space-y-6 animate-fade-up">
      <header className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,156,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.08),transparent_30%)]" />
        <div className="relative">
          <p className="premium-kicker text-xs">Módulo</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {moduleData.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
            {moduleData.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-slate-200 backdrop-blur-xl">
              Base: {moduleData.basePath}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-200 backdrop-blur-xl">
              Endpoints: {moduleData.endpoints.length}
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-3">
        {moduleData.endpoints.map((endpoint) => (
          <article
            key={`${moduleData.slug}-${endpoint.method}-${endpoint.path}`}
            className="premium-surface-soft p-4 transition duration-200 hover:-translate-y-0.5 hover:border-white/12"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${methodStyles[endpoint.method]}`}
                  >
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-sm text-white/90">{endpoint.path}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{endpoint.note}</p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
                {endpoint.access}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
