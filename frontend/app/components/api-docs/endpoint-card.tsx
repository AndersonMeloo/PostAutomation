"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import type { ApiEndpoint, ApiParam } from "./api-data";
import { BASE_URL_EXAMPLE } from "./code-examples";
import { CodeBlock } from "./code-block";
import { CodeTabs } from "./code-tabs";

const METHOD_STYLES: Record<ApiEndpoint["method"], string> = {
  GET: "bg-blue-500/10 text-blue-400",
  POST: "bg-emerald-500/10 text-emerald-400",
  PATCH: "bg-amber-500/10 text-amber-400",
  DELETE: "bg-rose-500/10 text-rose-400",
};

function ParamTable({ title, params }: { title?: string; params: ApiParam[] }) {
  return (
    <div>
      {title ? <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p> : null}
      <div className="mt-2 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-line">
            {params.map((param) => (
              <tr key={param.name}>
                <td className="w-1/3 px-4 py-3 align-top">
                  <code className="text-xs font-semibold text-foreground">{param.name}</code>
                  {param.required ? (
                    <span className="ml-1.5 text-[10px] font-medium text-rose-400">obrigatório</span>
                  ) : null}
                  <p className="mt-1 text-xs text-muted">{param.type}</p>
                </td>
                <td className="px-4 py-3 text-muted">{param.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Aba de status da resposta (200 / 400 / 401 / ...), no mesmo espírito de
 * documentações de API estilo Stripe/Cut.Pro - um exemplo de corpo por
 * código de status, trocando de conteúdo ao clicar. */
function ResponseTabs({ endpoint }: { endpoint: ApiEndpoint }) {
  const variants = [
    { status: endpoint.responseExample.status, body: endpoint.responseExample.body, ok: true },
    ...endpoint.errors.map((error) => ({
      status: error.status,
      body: { statusCode: error.status, message: error.description },
      ok: false,
    })),
  ];
  const [active, setActive] = useState(variants[0].status);
  const current = variants.find((variant) => variant.status === active) ?? variants[0];

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-line">
        {variants.map((variant) => (
          <button
            key={variant.status}
            type="button"
            onClick={() => setActive(variant.status)}
            className={`border-b-2 px-3 py-2 text-xs font-bold transition-colors ${
              active === variant.status
                ? variant.ok
                  ? "border-emerald-500 text-emerald-500"
                  : "border-rose-500 text-rose-500"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {variant.status}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <CodeBlock
          code={typeof current.body === "string" ? current.body : JSON.stringify(current.body, null, 2)}
          language="json"
        />
      </div>
    </div>
  );
}

export function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
  return (
    <section id={endpoint.id} className="scroll-mt-24 border-t border-line py-12 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${METHOD_STYLES[endpoint.method]}`}>
          {endpoint.method}
        </span>
        <code className="text-sm font-medium text-foreground">{endpoint.path}</code>
        {endpoint.auth === "bearer" ? (
          <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted">
            <Lock size={11} />
            Requer autenticação
          </span>
        ) : (
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted">Público</span>
        )}
      </div>

      <h3 className="mt-4 text-xl font-bold text-foreground">{endpoint.summary}</h3>
      <p className="mt-2 max-w-2xl leading-6 text-muted">{endpoint.description}</p>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          {endpoint.pathParams?.length ? <ParamTable title="Parâmetros na URL" params={endpoint.pathParams} /> : null}
          {endpoint.queryParams?.length ? <ParamTable title="Query params" params={endpoint.queryParams} /> : null}
          {endpoint.requestBody ? (
            <ParamTable
              title={`Corpo da requisição (${endpoint.requestBody.contentType})`}
              params={endpoint.requestBody.fields}
            />
          ) : null}
        </div>

        <div className="dashboard-card space-y-4 p-4">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Server URL</span>
            <code className="truncate text-xs text-muted">{BASE_URL_EXAMPLE}</code>
          </div>

          <CodeTabs endpoint={endpoint} />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Resposta</p>
            <ResponseTabs endpoint={endpoint} />
          </div>
        </div>
      </div>
    </section>
  );
}
