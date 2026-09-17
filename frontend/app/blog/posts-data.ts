// Lista de posts do Blog (a "ordem" e as datas ficam aqui).
//
// Pra criar um post novo:
// 1. Adicione uma linha abaixo com um "slug" (vira a URL /blog/seu-slug) e a data.
// 2. Adicione o título/resumo/texto do post em app/lib/i18n/locales/pt-BR.ts
//    e en-US.ts, dentro de "blog.posts", usando essa MESMA string de slug
//    como chave. É o slug que liga esse arquivo às traduções.
export type BlogPostMeta = {
  slug: string;
  date: string;
};

export const blogPosts: BlogPostMeta[] = [
  { slug: "automatize-publicacao-de-videos", date: "2026-08-12" },
  { slug: "agendamento-inteligente", date: "2026-08-20" },
  { slug: "metricas-que-importam", date: "2026-09-02" },
  { slug: "do-rascunho-a-publicacao", date: "2026-09-10" },
];

export function getBlogPostMeta(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
