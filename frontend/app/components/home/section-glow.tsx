type GlowBlob = {
  /** Posição e tamanho do borrão, ex.: "left-[8%] top-0 h-64 w-64". */
  position: string;
  /** Cor de fundo com opacidade baixa, ex.: "bg-violet-200/20". */
  color: string;
};

/**
 * Camada de manchas de cor bem suaves atrás do conteúdo de uma seção, no
 * mesmo estilo já usado no Hero: círculos desfocados com opacidade baixa
 * para dar profundidade sem virar um bloco colorido.
 */
export function SectionGlow({ blobs }: { blobs: GlowBlob[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {blobs.map((blob, index) => (
        <div key={index} className={`absolute rounded-full blur-3xl ${blob.position} ${blob.color}`} />
      ))}
    </div>
  );
}
