"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "../../lib/i18n/locale-context";

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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          {t.blog.backLabel}
        </Link>

        <div className="mt-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {formattedDate}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {translation.title}
          </h1>
        </div>
      </div>

      <div className="aspect-[16/7] w-full rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500" />

      <div className="mt-8 space-y-5">
        {translation.content.map((paragraph, index) => (
          <p key={index} className="leading-7 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
