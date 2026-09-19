"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../../lib/theme-context";
import { API_CATEGORIES, API_ENDPOINTS } from "./api-data";

const METHOD_TEXT_STYLES: Record<string, string> = {
  GET: "text-blue-400",
  POST: "text-emerald-400",
  PATCH: "text-amber-400",
  DELETE: "text-rose-400",
};

/** Sidebar de navegação (estilo app de documentação) - busca, categorias e
 * destaque do endpoint em foco via IntersectionObserver, mesmo truque já
 * usado no índice do Blog (article-toc.tsx). Usa o mesmo tema claro/escuro
 * do dashboard. */
export function EndpointNav() {
  const { theme, toggleTheme } = useTheme();
  const [activeId, setActiveId] = useState(API_ENDPOINTS[0]?.id);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const sections = API_ENDPOINTS.map((endpoint) => document.getElementById(endpoint.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  const groups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return API_CATEGORIES.map((category) => ({
      category,
      endpoints: API_ENDPOINTS.filter(
        (endpoint) =>
          endpoint.category === category.id &&
          (normalized === "" ||
            endpoint.summary.toLowerCase().includes(normalized) ||
            endpoint.path.toLowerCase().includes(normalized)),
      ),
    })).filter((group) => group.endpoints.length > 0);
  }, [query]);

  return (
    <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-70 lg:shrink-0">
      <nav className="dashboard-card flex h-full flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">API do PostAutomation</p>
            <p className="text-xs text-muted">Documentação</p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="dash-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors"
            title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar endpoint..."
            className="premium-input w-full pl-8 text-sm"
          />
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
          {groups.map(({ category, endpoints }) => (
            <div key={category.id}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{category.label}</p>
              <ul className="mt-2 space-y-0.5">
                {endpoints.map((endpoint) => {
                  const isActive = endpoint.id === activeId;
                  return (
                    <li key={endpoint.id}>
                      <a
                        href={`#${endpoint.id}`}
                        onClick={(event) => handleClick(event, endpoint.id)}
                        className={`flex items-baseline gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                          isActive
                            ? "bg-accent-soft font-semibold text-accent"
                            : "text-muted hover:bg-white/5 hover:text-foreground"
                        }`}
                      >
                        <span className={`shrink-0 text-[10px] font-bold ${METHOD_TEXT_STYLES[endpoint.method]}`}>
                          {endpoint.method}
                        </span>
                        <span>{endpoint.summary}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {groups.length === 0 ? <p className="px-2 text-sm text-muted">Nenhum endpoint encontrado.</p> : null}
        </div>
      </nav>
    </aside>
  );
}
