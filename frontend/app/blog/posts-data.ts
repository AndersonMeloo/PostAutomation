// Lista de posts do Blog (as datas ficam aqui - a ORDEM da lista abaixo não
// importa, o export já sai ordenado do mais novo pro mais antigo).
//
// Pra criar um post novo:
// 1. Adicione uma linha abaixo com um "slug" (vira a URL /blog/seu-slug) e a data.
//    Não precisa se preocupar com a posição: quem tiver a data mais recente
//    aparece primeiro automaticamente em "Últimos posts".
// 2. Adicione o título/resumo/texto do post em app/lib/i18n/locales/pt-BR.ts
//    e en-US.ts, dentro de "blog.posts", usando essa MESMA string de slug
//    como chave. É o slug que liga esse arquivo às traduções.
export type BlogPostMeta = {
  slug: string;
  date: string;
};

const rawBlogPosts: BlogPostMeta[] = [
  { slug: "automatize-publicacao-de-videos", date: "2026-08-12" },
  { slug: "agendamento-inteligente", date: "2026-08-20" },
  { slug: "metricas-que-importam", date: "2026-09-02" },
  { slug: "do-rascunho-a-publicacao", date: "2026-09-10" },
];

export const blogPosts: BlogPostMeta[] = [...rawBlogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getBlogPostMeta(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
