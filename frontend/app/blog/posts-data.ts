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
