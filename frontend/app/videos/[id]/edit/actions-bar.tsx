"use client";

type ActionsBarProps = {
  saving: boolean;
  canFinalize: boolean;
  onSaveAndContinue: () => void;
  onSaveAndExit: () => void;
  onFinalize: () => void;
};

export function ActionsBar({
  saving,
  canFinalize,
  onSaveAndContinue,
  onSaveAndExit,
  onFinalize,
}: ActionsBarProps) {
  return (
    <div className="dashboard-card flex flex-wrap items-center justify-end gap-3 p-4">
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
  );
}
