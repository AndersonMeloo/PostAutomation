export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type Endpoint = {
  method: HttpMethod;
  path: string;
  access: "publica" | "jwt" | "google-oauth";
  note: string;
};

export type BackendModule = {
  slug: "auth" | "users" | "niches" | "posts";
  title: string;
  description: string;
  basePath: string;
  endpoints: Endpoint[];
};

export const backendModules: BackendModule[] = [
  {
    slug: "auth",
    title: "Autenticacao",
    description: "Fluxos de login local, OAuth com Google e refresh token.",
    basePath: "/auth",
    endpoints: [
      {
        method: "GET",
        path: "/auth/google",
        access: "google-oauth",
        note: "Inicia o fluxo de autenticacao Google.",
      },
      {
        method: "GET",
        path: "/auth/google/test",
        access: "publica",
        note: "Valida callback sem frontend para testes.",
      },
      {
        method: "GET",
        path: "/auth/google/redirect",
        access: "google-oauth",
        note: "Recebe usuario do Google e redireciona com tokens.",
      },
      {
        method: "POST",
        path: "/auth/login",
        access: "publica",
        note: "Autentica usuario por email e senha.",
      },
      {
        method: "POST",
        path: "/auth/refresh",
        access: "publica",
        note: "Gera novo access token com refresh token.",
      },
    ],
  },
  {
    slug: "users",
    title: "Usuarios",
    description: "Cadastro, consulta, atualizacao e remocao de usuarios.",
    basePath: "/users",
    endpoints: [
      {
        method: "POST",
        path: "/users",
        access: "publica",
        note: "Cria um novo usuario.",
      },
      {
        method: "GET",
        path: "/users",
        access: "jwt",
        note: "Lista todos os usuarios.",
      },
      {
        method: "GET",
        path: "/users/emails",
        access: "jwt",
        note: "Lista todos os emails de usuarios.",
      },
      {
        method: "GET",
        path: "/users/email/:email",
        access: "jwt",
        note: "Busca usuario por email.",
      },
      {
        method: "GET",
        path: "/users/:id",
        access: "jwt",
        note: "Busca usuario por id.",
      },
      {
        method: "PATCH",
        path: "/users/:id",
        access: "jwt",
        note: "Atualiza dados de um usuario.",
      },
      {
        method: "DELETE",
        path: "/users/:id",
        access: "jwt",
        note: "Remove um usuario.",
      },
    ],
  },
  {
    slug: "niches",
    title: "Nichos",
    description: "Gestao de nichos para classificar e organizar conteudos.",
    basePath: "/niches",
    endpoints: [
      {
        method: "POST",
        path: "/niches",
        access: "publica",
        note: "Cria um novo nicho.",
      },
      {
        method: "GET",
        path: "/niches",
        access: "publica",
        note: "Lista todos os nichos.",
      },
      {
        method: "GET",
        path: "/niches/:id",
        access: "publica",
        note: "Busca um nicho por id.",
      },
      {
        method: "PATCH",
        path: "/niches/:id",
        access: "publica",
        note: "Atualiza um nicho por id.",
      },
      {
        method: "DELETE",
        path: "/niches/:id",
        access: "publica",
        note: "Remove um nicho.",
      },
    ],
  },
  {
    slug: "posts",
    title: "Posts",
    description: "Importacao e criacao de posts a partir de URL do YouTube.",
    basePath: "/posts",
    endpoints: [
      {
        method: "GET",
        path: "/posts",
        access: "publica",
        note: "Lista os posts com ultimo snapshot de analytics.",
      },
      {
        method: "GET",
        path: "/posts/overview?date=YYYY-MM-DD",
        access: "publica",
        note: "Resumo diario de views, likes, comments e videos postados.",
      },
      {
        method: "POST",
        path: "/posts/import-youtube-url",
        access: "publica",
        note: "Cria post usando URL do YouTube.",
      },
    ],
  },
];

export const methodStyles: Record<HttpMethod, string> = {
  GET: "bg-emerald-50 text-emerald-700 border-emerald-200",
  POST: "bg-sky-50 text-sky-700 border-sky-200",
  PATCH: "bg-amber-50 text-amber-700 border-amber-200",
  DELETE: "bg-rose-50 text-rose-700 border-rose-200",
};
