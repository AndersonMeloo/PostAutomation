"use client";

import { useEffect, useState, type MouseEvent } from "react";

export type TocSection = { id: string; heading: string };

/**
 * Índice lateral do artigo, fixo enquanto o texto rola. O item ativo é
 * calculado por IntersectionObserver, observando quando cada heading
 * cruza uma faixa próxima ao topo da viewport.
 */
export function ArticleToc({ title, sections }: { title: string; sections: TocSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <aside className="hidden lg:sticky lg:top-8 lg:block lg:self-start">
      <div className="home-glass rounded-2xl p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
        <ul className="mt-3 space-y-1 border-l border-slate-200">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => handleClick(event, section.id)}
                  className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-5 transition-colors ${
                    isActive
                      ? "border-indigo-500 font-semibold text-indigo-600"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  {section.heading}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
