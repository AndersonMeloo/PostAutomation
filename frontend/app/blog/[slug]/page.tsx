import { notFound } from "next/navigation";
import { getBlogPostMeta } from "../posts-data";
import { BlogPostContent } from "./post-content";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const meta = getBlogPostMeta(slug);

  if (!meta) {
    notFound();
  }

  return <BlogPostContent slug={meta.slug} date={meta.date} />;
}
