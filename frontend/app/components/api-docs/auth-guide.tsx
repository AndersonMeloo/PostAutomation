import { CodeBlock } from "./code-block";
import { BASE_URL_EXAMPLE } from "./code-examples";

export function AuthGuide() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-bold text-foreground">O que é essa API</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          É a mesma API REST que move o painel do PostAutomation - cadastro de nichos, upload e agendamento de
          vídeos, métricas e a conexão com o YouTube. Cada requisição autenticada usa o mesmo token que sua sessão
          já tem quando você está logado no painel.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">URL base</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Não existe prefixo de versão nem de rota - cada endpoint é chamado direto na raiz.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Produção</p>
            <code className="mt-1 block text-sm text-foreground">{BASE_URL_EXAMPLE}</code>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Local</p>
            <code className="mt-1 block text-sm text-foreground">http://localhost:3000</code>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">Autenticação</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Faça login em <code className="text-foreground">POST /auth/login</code> com email e senha da sua conta
          pra receber um <code className="text-foreground">accessToken</code>. Envie esse token em toda chamada
          protegida no header abaixo. Quando ele expirar, troque por um novo em{" "}
          <code className="text-foreground">POST /auth/refresh</code> usando o{" "}
          <code className="text-foreground">refreshToken</code> recebido junto - sem precisar logar de novo.
        </p>
        <div className="mt-4">
          <CodeBlock code="Authorization: Bearer <SEU_ACCESS_TOKEN>" language="text" />
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Não existe um mecanismo separado de chave de API hoje - a autenticação é sempre o token da sua própria
          conta.
        </p>
      </div>
    </div>
  );
}
