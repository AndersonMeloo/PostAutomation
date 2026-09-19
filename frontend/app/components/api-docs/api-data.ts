// Fonte única de dados da documentação da API (/api-docs). Cada objeto aqui
// vira uma seção na página automaticamente - pra adicionar um endpoint novo
// no futuro, basta acrescentar um item em API_ENDPOINTS, sem mexer em
// nenhum componente visual.
//
// Não documentamos aqui: GET /auth/google, GET /auth/google/callback e
// GET /auth/youtube/callback (são alvos de redirect do navegador durante o
// fluxo OAuth, não chamadas que um cliente de API faria diretamente) nem
// GET /auth/google/test (endpoint de diagnóstico sem guarda - não deve ser
// exposto como parte pública da API).

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type ApiParam = {
  name: string;
  type: string;
  required: boolean;
  description: string;
};

export type ApiError = {
  status: number;
  description: string;
};

export type ApiEndpoint = {
  id: string;
  method: HttpMethod;
  path: string;
  summary: string;
  description: string;
  category: "auth" | "users" | "niches" | "posts";
  auth: "none" | "bearer";
  pathParams?: ApiParam[];
  queryParams?: ApiParam[];
  requestBody?: {
    contentType: "application/json" | "multipart/form-data";
    fields: ApiParam[];
  };
  responseExample: { status: number; body: unknown };
  errors: ApiError[];
};

export const API_CATEGORIES: { id: ApiEndpoint["category"]; label: string; description: string }[] = [
  {
    id: "auth",
    label: "Autenticação",
    description: "Login, renovação de sessão e conexão do canal do YouTube.",
  },
  {
    id: "users",
    label: "Usuários",
    description: "Cadastro, dados da conta e status da conexão com o YouTube.",
  },
  {
    id: "niches",
    label: "Nichos",
    description: "Organização dos posts por nicho de conteúdo.",
  },
  {
    id: "posts",
    label: "Posts e agendamento",
    description: "Upload, edição de rascunho, agendamento, publicação e métricas.",
  },
];

const AUTH_ERROR: ApiError = {
  status: 401,
  description: "Token ausente, inválido ou expirado no header Authorization.",
};

const VALIDATION_ERROR: ApiError = {
  status: 400,
  description: "Corpo da requisição não passou na validação (campo obrigatório ausente ou em formato errado).",
};

const NOT_FOUND_ERROR: ApiError = {
  status: 404,
  description: "Nenhum registro encontrado com o id informado.",
};

export const API_ENDPOINTS: ApiEndpoint[] = [
  // ---------------------------------------------------------------------
  // Autenticação
  // ---------------------------------------------------------------------
  {
    id: "login",
    method: "POST",
    path: "/auth/login",
    summary: "Login",
    description:
      "Autentica com email e senha e devolve o par de tokens usado em todas as outras chamadas da API.",
    category: "auth",
    auth: "none",
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "email", type: "string", required: true, description: "Email cadastrado do usuário." },
        { name: "password", type: "string", required: true, description: "Senha da conta." },
      ],
    },
    responseExample: {
      status: 200,
      body: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
    errors: [
      VALIDATION_ERROR,
      { status: 401, description: "Email ou senha incorretos." },
    ],
  },
  {
    id: "refresh",
    method: "POST",
    path: "/auth/refresh",
    summary: "Renovar sessão",
    description: "Troca um refreshToken válido por um novo par de tokens, sem precisar logar de novo.",
    category: "auth",
    auth: "none",
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "refreshToken", type: "string", required: true, description: "Refresh token obtido no login." },
      ],
    },
    responseExample: {
      status: 200,
      body: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
    errors: [{ status: 401, description: "Refresh token inválido ou expirado." }],
  },
  {
    id: "youtube-connect",
    method: "GET",
    path: "/auth/youtube/connect",
    summary: "Iniciar conexão do YouTube",
    description:
      "Gera a URL de autorização do Google para o usuário logado conectar um canal do YouTube. O cliente deve redirecionar o navegador pra essa URL - depois da autorização o Google chama nosso callback e a conexão fica pronta, sem o cliente precisar fazer mais nada.",
    category: "auth",
    auth: "bearer",
    responseExample: {
      status: 200,
      body: { url: "https://accounts.google.com/o/oauth2/v2/auth?client_id=...&scope=..." },
    },
    errors: [AUTH_ERROR],
  },

  // ---------------------------------------------------------------------
  // Usuários
  // ---------------------------------------------------------------------
  {
    id: "create-user",
    method: "POST",
    path: "/users",
    summary: "Criar conta",
    description: "Cadastra um novo usuário. É o único endpoint de usuários que não exige autenticação.",
    category: "users",
    auth: "none",
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "email", type: "string", required: true, description: "Precisa ser um email válido." },
        { name: "name", type: "string", required: false, description: "Até 10 caracteres." },
        { name: "password", type: "string", required: false, description: "Entre 3 e 20 caracteres." },
      ],
    },
    responseExample: {
      status: 201,
      body: {
        id: "b3f1a2c4-1234-4a5b-8c9d-0e1f2a3b4c5d",
        email: "criador@exemplo.com",
        name: "Ana",
        role: "USER",
        createdAt: "2026-09-01T12:00:00.000Z",
      },
    },
    errors: [VALIDATION_ERROR, { status: 409, description: "Já existe uma conta com esse email." }],
  },
  {
    id: "list-users",
    method: "GET",
    path: "/users",
    summary: "Listar usuários",
    description: "Lista todos os usuários cadastrados.",
    category: "users",
    auth: "bearer",
    responseExample: {
      status: 200,
      body: [
        { id: "b3f1a2c4-1234-4a5b-8c9d-0e1f2a3b4c5d", email: "criador@exemplo.com", name: "Ana", role: "USER" },
      ],
    },
    errors: [AUTH_ERROR],
  },
  {
    id: "list-user-emails",
    method: "GET",
    path: "/users/emails",
    summary: "Listar emails",
    description: "Lista só os emails de todos os usuários cadastrados.",
    category: "users",
    auth: "bearer",
    responseExample: { status: 200, body: ["criador@exemplo.com", "outro@exemplo.com"] },
    errors: [AUTH_ERROR],
  },
  {
    id: "get-user-by-email",
    method: "GET",
    path: "/users/email/:email",
    summary: "Buscar usuário por email",
    description: "Retorna os dados de um usuário a partir do email.",
    category: "users",
    auth: "bearer",
    pathParams: [{ name: "email", type: "string", required: true, description: "Email do usuário." }],
    responseExample: {
      status: 200,
      body: { id: "b3f1a2c4-1234-4a5b-8c9d-0e1f2a3b4c5d", email: "criador@exemplo.com", name: "Ana" },
    },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "get-user",
    method: "GET",
    path: "/users/:id",
    summary: "Buscar usuário por id",
    description: "Retorna os dados de um usuário específico.",
    category: "users",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do usuário." }],
    responseExample: {
      status: 200,
      body: { id: "b3f1a2c4-1234-4a5b-8c9d-0e1f2a3b4c5d", email: "criador@exemplo.com", name: "Ana", role: "USER" },
    },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "update-user",
    method: "PATCH",
    path: "/users/:id",
    summary: "Atualizar usuário",
    description: "Atualiza parcialmente os dados de um usuário (mesmos campos do cadastro, todos opcionais).",
    category: "users",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do usuário." }],
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "email", type: "string", required: false, description: "Novo email." },
        { name: "name", type: "string", required: false, description: "Até 10 caracteres." },
        { name: "password", type: "string", required: false, description: "Entre 3 e 20 caracteres." },
      ],
    },
    responseExample: {
      status: 200,
      body: { id: "b3f1a2c4-1234-4a5b-8c9d-0e1f2a3b4c5d", email: "novo@exemplo.com", name: "Ana" },
    },
    errors: [AUTH_ERROR, VALIDATION_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "delete-user",
    method: "DELETE",
    path: "/users/:id",
    summary: "Excluir usuário",
    description: "Remove permanentemente uma conta de usuário.",
    category: "users",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do usuário." }],
    responseExample: { status: 200, body: { message: "Usuário removido com sucesso." } },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "youtube-connection-status",
    method: "GET",
    path: "/users/:id/youtube-connection",
    summary: "Status da conexão com o YouTube",
    description: "Informa se o usuário tem um canal do YouTube conectado no momento.",
    category: "users",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do usuário." }],
    responseExample: {
      status: 200,
      body: {
        connected: true,
        account: { id: "a1b2c3d4-...", platform: "YOUTUBE", tokenExpiry: "2026-09-17T22:00:00.000Z" },
      },
    },
    errors: [AUTH_ERROR],
  },
  {
    id: "youtube-disconnect",
    method: "DELETE",
    path: "/users/:id/youtube-connection",
    summary: "Desconectar YouTube",
    description:
      "Remove a conexão do canal do YouTube do usuário. Isso apaga a credencial guardada no nosso banco - não revoga o acesso automaticamente do lado do Google (o usuário pode revogar manualmente na própria conta Google se quiser).",
    category: "users",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do usuário." }],
    responseExample: { status: 200, body: { message: "Conexão com o YouTube removida com sucesso." } },
    errors: [AUTH_ERROR],
  },

  // ---------------------------------------------------------------------
  // Nichos
  // ---------------------------------------------------------------------
  {
    id: "create-niche",
    method: "POST",
    path: "/niches",
    summary: "Criar nicho",
    description: "Cria um nicho usado pra organizar os posts.",
    category: "niches",
    auth: "bearer",
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "name", type: "string", required: true, description: "Entre 2 e 60 caracteres." },
        { name: "description", type: "string", required: false, description: "Até 255 caracteres." },
        { name: "active", type: "boolean", required: false, description: "Padrão: true." },
      ],
    },
    responseExample: {
      status: 201,
      body: { id: "c1a2b3c4-...", name: "Curiosidades", description: null, active: true },
    },
    errors: [AUTH_ERROR, VALIDATION_ERROR],
  },
  {
    id: "list-niches",
    method: "GET",
    path: "/niches",
    summary: "Listar nichos",
    description: "Lista todos os nichos cadastrados.",
    category: "niches",
    auth: "bearer",
    responseExample: {
      status: 200,
      body: [{ id: "c1a2b3c4-...", name: "Curiosidades", active: true }],
    },
    errors: [AUTH_ERROR],
  },
  {
    id: "get-niche",
    method: "GET",
    path: "/niches/:id",
    summary: "Buscar nicho",
    description: "Retorna um nicho específico.",
    category: "niches",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do nicho." }],
    responseExample: { status: 200, body: { id: "c1a2b3c4-...", name: "Curiosidades", active: true } },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "update-niche",
    method: "PATCH",
    path: "/niches/:id",
    summary: "Atualizar nicho",
    description: "Atualiza parcialmente um nicho (mesmos campos da criação, todos opcionais).",
    category: "niches",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do nicho." }],
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "name", type: "string", required: false, description: "Entre 2 e 60 caracteres." },
        { name: "description", type: "string", required: false, description: "Até 255 caracteres." },
        { name: "active", type: "boolean", required: false, description: "" },
      ],
    },
    responseExample: { status: 200, body: { id: "c1a2b3c4-...", name: "Curiosidades e fatos", active: true } },
    errors: [AUTH_ERROR, VALIDATION_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "delete-niche",
    method: "DELETE",
    path: "/niches/:id",
    summary: "Excluir nicho",
    description: "Remove um nicho.",
    category: "niches",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do nicho." }],
    responseExample: { status: 200, body: { message: "Nicho removido com sucesso." } },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },

  // ---------------------------------------------------------------------
  // Posts e agendamento
  // ---------------------------------------------------------------------
  {
    id: "list-posts",
    method: "GET",
    path: "/posts",
    summary: "Listar posts",
    description: "Lista todos os posts do usuário autenticado (qualquer status).",
    category: "posts",
    auth: "bearer",
    responseExample: {
      status: 200,
      body: [
        {
          id: "d1e2f3a4-...",
          platform: "YOUTUBE",
          title: "Como automatizar sua publicação",
          status: "POSTED",
          scheduledAt: "2026-09-10T13:00:00.000Z",
          postedAt: "2026-09-10T13:00:04.000Z",
        },
      ],
    },
    errors: [AUTH_ERROR],
  },
  {
    id: "posts-overview",
    method: "GET",
    path: "/posts/overview",
    summary: "Resumo de posts",
    description:
      "Retorna um resumo agregado dos posts do usuário (usado pela tela inicial do painel) - opcionalmente filtrado por data.",
    category: "posts",
    auth: "bearer",
    queryParams: [
      { name: "date", type: "string (ISO 8601)", required: false, description: "Filtra o resumo por um dia específico." },
    ],
    responseExample: {
      status: 200,
      body: { scheduled: 3, posted: 12, drafts: 2, failed: 0 },
    },
    errors: [AUTH_ERROR],
  },
  {
    id: "post-analytics",
    method: "GET",
    path: "/posts/:id/analytics",
    summary: "Métricas de um post",
    description: "Retorna o histórico de métricas coletadas (visualizações, curtidas, comentários) de um post publicado.",
    category: "posts",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do post." }],
    responseExample: {
      status: 200,
      body: [{ id: "e1f2...", views: 1240, likes: 87, comments: 12, collectedAt: "2026-09-17T09:00:00.000Z" }],
    },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "list-drafts",
    method: "GET",
    path: "/posts/drafts",
    summary: "Listar rascunhos",
    description: "Lista os posts que ainda estão em rascunho (status DRAFT).",
    category: "posts",
    auth: "bearer",
    responseExample: {
      status: 200,
      body: [{ id: "f1a2...", title: "Sem título", status: "DRAFT", format: "SHORT" }],
    },
    errors: [AUTH_ERROR],
  },
  {
    id: "get-draft",
    method: "GET",
    path: "/posts/:id/draft",
    summary: "Buscar rascunho",
    description: "Retorna um rascunho específico.",
    category: "posts",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do post." }],
    responseExample: {
      status: 200,
      body: { id: "f1a2...", title: "Sem título", status: "DRAFT", format: "SHORT", trimStart: 0, trimEnd: 12.5 },
    },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "get-draft-video",
    method: "GET",
    path: "/posts/:id/draft/video",
    summary: "Baixar vídeo do rascunho",
    description:
      "Retorna o arquivo de vídeo do rascunho (stream binário, não JSON). Usado pelo player do editor de vídeo.",
    category: "posts",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do post." }],
    responseExample: { status: 200, body: "<binário - video/mp4>" },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "get-draft-thumbnail",
    method: "GET",
    path: "/posts/:id/draft/thumbnail",
    summary: "Baixar thumbnail do rascunho",
    description: "Retorna a imagem de thumbnail do rascunho (stream binário, não JSON).",
    category: "posts",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do post." }],
    responseExample: { status: 200, body: "<binário - image/jpeg>" },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "create-draft",
    method: "POST",
    path: "/posts/draft",
    summary: "Criar rascunho",
    description: "Envia um vídeo e cria um novo post em rascunho (status DRAFT).",
    category: "posts",
    auth: "bearer",
    requestBody: {
      contentType: "multipart/form-data",
      fields: [
        { name: "video", type: "file", required: true, description: "Arquivo de vídeo." },
        { name: "title", type: "string", required: false, description: "Até 255 caracteres." },
      ],
    },
    responseExample: { status: 201, body: { id: "f1a2...", title: "Sem título", status: "DRAFT" } },
    errors: [AUTH_ERROR, VALIDATION_ERROR],
  },
  {
    id: "edit-draft",
    method: "PATCH",
    path: "/posts/:id/edit",
    summary: "Editar rascunho",
    description: "Atualiza título, descrição, formato ou o corte (trim) de um rascunho.",
    category: "posts",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do post." }],
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "title", type: "string", required: false, description: "" },
        { name: "description", type: "string", required: false, description: "Até 500 caracteres." },
        { name: "format", type: "\"SHORT\" | \"STANDARD\"", required: false, description: "" },
        { name: "trimStart", type: "number", required: false, description: "Segundos, >= 0." },
        { name: "trimEnd", type: "number", required: false, description: "Segundos, >= 0." },
      ],
    },
    responseExample: { status: 200, body: { id: "f1a2...", format: "SHORT", trimStart: 0, trimEnd: 12.5 } },
    errors: [AUTH_ERROR, VALIDATION_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "upload-thumbnail",
    method: "POST",
    path: "/posts/:id/thumbnail",
    summary: "Enviar thumbnail",
    description: "Envia/substitui a imagem de thumbnail de um rascunho.",
    category: "posts",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do post." }],
    requestBody: {
      contentType: "multipart/form-data",
      fields: [{ name: "thumbnail", type: "file", required: true, description: "Arquivo de imagem." }],
    },
    responseExample: { status: 200, body: { id: "f1a2...", thumbnailUrl: "https://.../thumb.jpg" } },
    errors: [AUTH_ERROR, VALIDATION_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "finalize-draft",
    method: "PATCH",
    path: "/posts/:id/finalize",
    summary: "Finalizar rascunho",
    description:
      "Sai do estado de rascunho e agenda a publicação (status DRAFT -> PENDING). A partir daqui o nicho passa a ser obrigatório.",
    category: "posts",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do post." }],
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "nicheId", type: "string (uuid)", required: true, description: "Nicho do post." },
        { name: "scheduledAt", type: "string (ISO 8601)", required: true, description: "Data/hora da publicação." },
        { name: "title", type: "string", required: false, description: "" },
        { name: "description", type: "string", required: false, description: "" },
      ],
    },
    responseExample: {
      status: 200,
      body: { id: "f1a2...", status: "PENDING", scheduledAt: "2026-09-20T13:00:00.000Z" },
    },
    errors: [AUTH_ERROR, VALIDATION_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "delete-draft",
    method: "DELETE",
    path: "/posts/:id/draft",
    summary: "Excluir rascunho",
    description: "Remove um rascunho e o arquivo de vídeo/thumbnail associado do armazenamento.",
    category: "posts",
    auth: "bearer",
    pathParams: [{ name: "id", type: "string (uuid)", required: true, description: "Id do post." }],
    responseExample: { status: 200, body: { message: "Rascunho removido com sucesso." } },
    errors: [AUTH_ERROR, NOT_FOUND_ERROR],
  },
  {
    id: "import-youtube-url",
    method: "POST",
    path: "/posts/import-youtube-url",
    summary: "Importar vídeo por URL do YouTube",
    description: "Cria um post agendado a partir de uma URL pública de um vídeo já existente no YouTube.",
    category: "posts",
    auth: "bearer",
    requestBody: {
      contentType: "application/json",
      fields: [
        { name: "userId", type: "string (uuid)", required: true, description: "" },
        { name: "nicheId", type: "string (uuid)", required: true, description: "" },
        { name: "youtubeUrl", type: "string (url)", required: true, description: "Até 500 caracteres." },
        { name: "scheduledAt", type: "string (ISO 8601)", required: true, description: "" },
      ],
    },
    responseExample: { status: 201, body: { id: "f1a2...", platform: "YOUTUBE", status: "PENDING" } },
    errors: [AUTH_ERROR, VALIDATION_ERROR],
  },
  {
    id: "upload-video",
    method: "POST",
    path: "/posts/upload-video",
    summary: "Enviar vídeo já agendado",
    description: "Envia um vídeo e já cria o post com nicho e data de publicação definidos (sem passar pelo fluxo de rascunho).",
    category: "posts",
    auth: "bearer",
    requestBody: {
      contentType: "multipart/form-data",
      fields: [
        { name: "video", type: "file", required: true, description: "" },
        { name: "userId", type: "string (uuid)", required: true, description: "" },
        { name: "nicheId", type: "string (uuid)", required: true, description: "" },
        { name: "title", type: "string", required: true, description: "Até 255 caracteres." },
        { name: "description", type: "string", required: false, description: "" },
        { name: "scheduledAt", type: "string (ISO 8601)", required: true, description: "" },
      ],
    },
    responseExample: { status: 201, body: { id: "f1a2...", platform: "YOUTUBE", status: "PENDING" } },
    errors: [AUTH_ERROR, VALIDATION_ERROR],
  },
];

export function getEndpointsByCategory(category: ApiEndpoint["category"]): ApiEndpoint[] {
  return API_ENDPOINTS.filter((endpoint) => endpoint.category === category);
}
