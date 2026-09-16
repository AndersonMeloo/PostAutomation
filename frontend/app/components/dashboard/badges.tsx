import type { VideoFormat } from "../../lib/api";

const FORMAT_LABEL: Record<VideoFormat, string> = {
  SHORT: "Shorts",
  STANDARD: "Padrão",
};

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Em andamento",
  PENDING: "Agendado",
  POSTED: "Publicado",
  FAILED: "Falhou",
};

const STATUS_TONE: Record<string, string> = {
  DRAFT: "",
  PENDING: "border-blue-400/20 bg-blue-500/10 text-blue-200 light:text-blue-700",
  POSTED: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200 light:text-emerald-700",
  FAILED: "border-rose-400/20 bg-rose-500/10 text-rose-200 light:text-rose-700",
};

const BADGE_BASE = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";
const OVERLAY_CLASSES = "border-transparent bg-black/65 text-white backdrop-blur-sm";

type BadgeProps = {
  /** Usado quando o badge fica sobreposto a uma thumbnail/imagem, onde as
   * cores translúcidas do tema (dash-chip / tons semânticos) perdem contraste
   * porque o fundo não é a superfície do card e sim uma imagem qualquer. */
  overlay?: boolean;
};

export function FormatBadge({ format, overlay = false }: BadgeProps & { format: VideoFormat | null }) {
  const label = format ? FORMAT_LABEL[format] : "Formato livre";
  const tone = overlay ? OVERLAY_CLASSES : "dash-chip";

  return <span className={`${BADGE_BASE} ${tone}`}>{label}</span>;
}

export function StatusBadge({ status, overlay = false }: BadgeProps & { status: string }) {
  const label = STATUS_LABEL[status] ?? status;

  if (overlay) {
    return <span className={`${BADGE_BASE} ${OVERLAY_CLASSES}`}>{label}</span>;
  }

  const tone = STATUS_TONE[status] || "dash-chip";
  return <span className={`${BADGE_BASE} ${tone}`}>{label}</span>;
}
