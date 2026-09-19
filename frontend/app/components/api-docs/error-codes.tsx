const COMMON_ERRORS = [
  { status: 400, label: "Bad Request", description: "O corpo da requisição não passou na validação - campo obrigatório ausente ou em formato errado." },
  { status: 401, label: "Unauthorized", description: "Token ausente, inválido ou expirado. Renove em POST /auth/refresh ou faça login de novo." },
  { status: 404, label: "Not Found", description: "Nenhum registro encontrado com o id informado." },
  { status: 409, label: "Conflict", description: "Já existe um registro com esse valor único (ex: email já cadastrado)." },
  { status: 500, label: "Internal Server Error", description: "Erro inesperado no servidor - se persistir, entre em contato com o suporte." },
];

export function ErrorCodes() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground">Códigos de erro comuns</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted">
        Todo erro vem no formato padrão do NestJS: <code className="text-foreground">{"{ statusCode, message }"}</code>
        . Os códigos abaixo aparecem em praticamente qualquer endpoint protegido; cada endpoint também lista, na
        própria seção, os status específicos dele nas abas de resposta.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Descrição</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {COMMON_ERRORS.map((error) => (
              <tr key={error.status}>
                <td className="w-40 px-4 py-3 align-top">
                  <code className="text-sm font-semibold text-rose-400">{error.status}</code>
                  <p className="text-xs text-muted">{error.label}</p>
                </td>
                <td className="px-4 py-3 text-muted">{error.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
