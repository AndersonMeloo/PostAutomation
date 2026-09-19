"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard indisponível (ex: contexto não seguro) - falha silenciosa, sem quebrar a página
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-950">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur transition-colors hover:bg-white/20"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "Copiado" : "Copiar"}
      </button>

      <Highlight code={code.trim()} language={language} theme={themes.nightOwl}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} code-scrollbar overflow-x-auto p-5 pr-20 pb-4 text-[13px] leading-6`}
            style={style}
          >
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
