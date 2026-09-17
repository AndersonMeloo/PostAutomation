"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "../../lib/i18n/locale-context";
import { ArticleToc } from "./article-toc";

export function BlogPostContent({ slug, date }: { slug: string; date: string }) {
  const t = useTranslations();
  const { locale } = useLocale();
  const translation = t.blog.posts[slug];

  if (!translation) return null;

  const formattedDate = new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const sections = translation.content.map((section, index) => ({
    id: `secao-${index}`,
    heading: section.heading,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          {t.blog.backLabel}
        </Link>

        <div className="mx-auto mt-6 max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {formattedDate}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {translation.title}
          </h1>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
        <article className="mx-auto w-full max-w-3xl space-y-8">
          <div className="aspect-[16/7] w-full rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500" />

          {translation.content.map((section, index) => (
            <section key={index} id={sections[index].id} className="scroll-mt-8">
              <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="leading-7 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        <ArticleToc title={t.blog.tocTitle} sections={sections} />
      </div>
    </div>
  );
}
