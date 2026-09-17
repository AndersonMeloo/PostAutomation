"use client";

import Link from "next/link";
import { useTranslations } from "../lib/i18n/locale-context";
import { blogPosts } from "./posts-data";

export default function BlogIndexPage() {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        {/* Coluna principal */}
        <div>
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500" />

          <div className="mt-8 space-y-5">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{t.blog.pageTitle}</h1>
            {t.blog.intro.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? "text-lg leading-7 text-slate-600" : "leading-7 text-slate-600"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            {t.blog.sidebarTitle}
          </h2>
          <ul className="mt-4 space-y-4">
            {blogPosts.map((post) => {
              const translation = t.blog.posts[post.slug];
              if (!translation) return null;

              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-slate-200 to-slate-300" />
                    <div className="p-4">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600">
                        {translation.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                        {translation.excerpt}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
