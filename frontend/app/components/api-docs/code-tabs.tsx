"use client";

import { useState } from "react";
import type { ApiEndpoint } from "./api-data";
import { CODE_LANGUAGES, buildCodeExample, type CodeLanguage } from "./code-examples";
import { CodeBlock } from "./code-block";

export function CodeTabs({ endpoint }: { endpoint: ApiEndpoint }) {
  const [active, setActive] = useState<CodeLanguage>("curl");
  const activeLanguage = CODE_LANGUAGES.find((lang) => lang.id === active) ?? CODE_LANGUAGES[0];

  return (
    <div>
      <div className="flex gap-1 rounded-full bg-slate-900 p-1">
        {CODE_LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            type="button"
            onClick={() => setActive(lang.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              active === lang.id ? "bg-white/15 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="mt-2">
        <CodeBlock code={buildCodeExample(active, endpoint)} language={activeLanguage.prismLanguage} />
      </div>
    </div>
  );
}
