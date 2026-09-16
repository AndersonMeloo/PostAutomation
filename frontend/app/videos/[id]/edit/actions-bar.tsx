"use client";

type ActionsBarProps = {
  saving: boolean;
  canFinalize: boolean;
  onSaveAndContinue: () => void;
  onSaveAndExit: () => void;
  onFinalize: () => void;
  onDelete: () => void;
};

export function ActionsBar({
  saving,
  canFinalize,
  onSaveAndContinue,
  onSaveAndExit,
  onFinalize,
  onDelete,
}: ActionsBarProps) {
  return (
    <div className="dashboard-card flex flex-wrap items-center justify-between gap-3 p-4">
      <button
        type="button"
        onClick={onDelete}
        disabled={saving}
        className="rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-200 light:text-rose-700 transition hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Excluir rascunho
      </button>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSaveAndContinue}
          disabled={saving}
          className="premium-button-secondary px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continuar editando
        </button>
        <button
          type="button"
          onClick={onSaveAndExit}
          disabled={saving}
          className="premium-button-secondary px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          Salvar como em andamento
        </button>
        <button
          type="button"
          onClick={onFinalize}
          disabled={saving || !canFinalize}
          className="premium-button px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          Preparar publicação
        </button>
      </div>
    </div>
  );
}
