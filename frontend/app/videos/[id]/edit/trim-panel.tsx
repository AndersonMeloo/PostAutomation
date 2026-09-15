"use client";

type TrimPanelProps = {
  duration: number;
  trimStart: number;
  trimEnd: number;
  onChangeStart: (value: number) => void;
  onChangeEnd: (value: number) => void;
  onUseCurrentTime: (field: "trimStart" | "trimEnd") => void;
};

export function TrimPanel({
  duration,
  trimStart,
  trimEnd,
  onChangeStart,
  onChangeEnd,
  onUseCurrentTime,
}: TrimPanelProps) {
  return (
    <div className="dashboard-card p-4">
      <p className="premium-kicker text-xs">Corte</p>
      <p className="mt-1 text-xs text-muted">
        Define o trecho a publicar. O arquivo original não é alterado agora — o corte é
        aplicado na hora de gerar o vídeo final.
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-muted">
          Início (segundos)
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              max={duration || undefined}
              step={0.1}
              value={trimStart}
              onChange={(event) => onChangeStart(Number(event.target.value))}
              className="premium-input"
            />
            <button
              type="button"
              onClick={() => onUseCurrentTime("trimStart")}
              className="dash-chip whitespace-nowrap rounded-xl border px-3 text-xs"
            >
              Usar atual
            </button>
          </div>
        </label>

        <label className="grid gap-1 text-sm text-muted">
          Fim (segundos)
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              max={duration || undefined}
              step={0.1}
              value={trimEnd}
              onChange={(event) => onChangeEnd(Number(event.target.value))}
              className="premium-input"
            />
            <button
              type="button"
              onClick={() => onUseCurrentTime("trimEnd")}
              className="dash-chip whitespace-nowrap rounded-xl border px-3 text-xs"
            >
              Usar atual
            </button>
          </div>
        </label>
      </div>

      {duration > 0 ? (
        <p className="mt-2 text-xs text-muted">Duração total: {duration.toFixed(1)}s</p>
      ) : null}
    </div>
  );
}
